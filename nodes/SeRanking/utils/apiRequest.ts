import { IExecuteFunctions, NodeOperationError, IHttpRequestOptions, IHttpRequestMethods, sleep } from 'n8n-workflow';

// Unified SE Ranking API base URL (as of 2026-05 — single host for Data API + Project API).
// Data API ops emit paths like /backlinks/..., /ai-search/..., /domain/...
// Project API ops emit paths like /project-management/sites?site_id=..., /project-management/airt/llm?site_id=...
const BASE_URL = 'https://api.seranking.com/v1';
const CREDENTIAL_TYPE = 'seRankingApi';

// Rate limiting variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 300; // 300ms

// A 504 / gateway-timeout is safe to retry for read-only ops: SE Ranking caps heavy
// leaderboard compute at ~60s and 504s, but caches partial progress, so a retry
// completes faster (504 -> ~27s -> sub-second). Incomplete requests don't bill credits.
function isGatewayTimeout(err: any): boolean {
    const code = err?.statusCode ?? err?.response?.status ?? err?.httpCode;
    if (code === 504 || code === '504') return true;
    const msg = String(err?.message || '').toLowerCase();
    return msg.includes('gateway tim') || msg.includes('504');
}

export async function apiRequest(
    this: IExecuteFunctions,
    method: string,
    endpoint: string,
    body: any = {},
    query: any = {},
    itemIndex = 0,
    timeoutMs = 60000,
    retryOn504 = 0
): Promise<any> {
    // Rate limiting: enforce minimum delay between requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
        await sleep(waitTime);
    }
    lastRequestTime = Date.now();

    // Cast method to IHttpRequestMethods early
    const httpMethod = method.toUpperCase() as IHttpRequestMethods;

    const options: IHttpRequestOptions = {
        method: httpMethod,
        timeout: timeoutMs,
        url: '',
    };

    // Check if this is a full URL download (for export download)
    if (query._fullUrl) {
        options.url = endpoint;
        delete query._fullUrl;

        options.returnFullResponse = true;
        options.encoding = 'arraybuffer';
        options.json = false;
    } else {
        options.url = `${BASE_URL}${endpoint}`;
        options.json = true;
    }

    // Add query parameters
    if (Object.keys(query).length > 0) {
        if (query._additionalTargets && Array.isArray(query._additionalTargets)) {
            const additionalTargets = query._additionalTargets;
            delete query._additionalTargets;

            const queryPairs: string[] = [];

            Object.keys(query).forEach(key => {
                queryPairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
            });

            additionalTargets.forEach((target: string) => {
                queryPairs.push(`target=${encodeURIComponent(target)}`);
            });

            options.url += '?' + queryPairs.join('&');
        } else if (query._keywordArray && Array.isArray(query._keywordArray)) {
            const keywords = query._keywordArray;
            delete query._keywordArray;

            const queryPairs: string[] = [];

            Object.keys(query).forEach(key => {
                queryPairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
            });

            keywords.forEach((kw: string) => {
                queryPairs.push(`keyword[]=${encodeURIComponent(kw)}`);
            });

            options.url += '?' + queryPairs.join('&');
        } else {
            options.qs = query;
        }
    }

    // Add body data
    if (method !== 'GET' && body != null && (Array.isArray(body) || Object.keys(body).length > 0)) {
        if (body._fileUpload) {
            // Dependency-free multipart/form-data: build the request body as a Buffer ourselves.
            // (n8n's verified-community-node rules disallow runtime deps such as `form-data`, so we
            // assemble the multipart envelope by hand.) SE Ranking rejects a file part with no
            // filename, so the part is always named. Byte format verified live → 201 {added:N}.
            const f = body._fileUpload;
            const boundary = `----serankingFormBoundary${Date.now().toString(16)}`;
            const preamble = Buffer.from(
                `--${boundary}\r\n` +
                `Content-Disposition: form-data; name="${f.fieldName}"; filename="${f.filename}"\r\n` +
                `Content-Type: ${f.contentType}\r\n\r\n`,
            );
            const epilogue = Buffer.from(`\r\n--${boundary}--\r\n`);
            options.body = Buffer.concat([preamble, f.data, epilogue]);
            options.headers = {
                ...options.headers,
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
            };
            options.json = false;
        } else if (body.keywords && Array.isArray(body.keywords)) {
            // Build proper multipart/form-data for n8n
            // n8n's httpRequest helper expects simple key-value pairs
            const formDataBody: Record<string, any> = {};

            // Add keywords as array - n8n will handle the multipart encoding
            body.keywords.forEach((kw: string, index: number) => {
                formDataBody[`keywords[${index}]`] = kw;
            });

            // Add other fields directly without wrapping
            if (body.cols) {
                formDataBody.cols = body.cols;
            }
            if (body.sort) {
                formDataBody.sort = body.sort;
            }
            if (body.sort_order) {
                formDataBody.sort_order = body.sort_order;
            }

            options.body = formDataBody;
            options.headers = {
                ...options.headers,
                'Content-Type': 'multipart/form-data',
            };
            options.json = false;
        } else {
            options.body = body;
        }
    }

    try {
        let lastError: any;
        for (let attempt = 0; attempt <= retryOn504; attempt++) {
            if (attempt > 0) {
                // Bounded backoff before retrying a gateway timeout (2s, 4s, ...).
                await sleep(2000 * attempt);
            }
            try {
                return await this.helpers.httpRequestWithAuthentication.call(
                    this,
                    CREDENTIAL_TYPE,
                    options,
                );
            } catch (err: any) {
                lastError = err;
                // Opt-in retry (retryOn504 > 0) only — never re-issues a mutating op.
                // Safe because 504s don't bill and the server caches partial compute.
                if (attempt < retryOn504 && isGatewayTimeout(err)) {
                    continue;
                }
                throw err;
            }
        }
        throw lastError;
    } catch (error: any) {
        // Missing credential check
        if (error.message?.includes('does not require credentials') || error.message?.includes('No credentials')) {
            throw new NodeOperationError(
                this.getNode(),
                'SE Ranking API credential not configured',
                {
                    itemIndex,
                    description: 'Click the node, find the "SE Ranking API" credential slot, and create/select your API token. As of 2026-05 a single unified token covers all endpoints.',
                },
            );
        }

        // Enhanced error handling with detailed context
        const errorData = error.response?.body || error.response?.data || {};
        const statusCode = error.statusCode || error.response?.status || 'Unknown';

        // Determine specific error type and provide helpful message
        let errorMessage = 'Unknown error occurred';
        let errorDescription = '';

        if (statusCode === 400) {
            errorMessage = 'Bad Request - Invalid parameters';
            errorDescription = `Check parameter values and required fields. API response: ${JSON.stringify(errorData)}`;
        } else if (statusCode === 401) {
            errorMessage = 'Unauthorized - Invalid API credentials';
            errorDescription = 'Check your API token in credentials. Get token from SE Ranking dashboard';
        } else if (statusCode === 403) {
            errorMessage = 'Forbidden - Access denied';
            errorDescription = 'Your API key does not have permission for this operation';
        } else if (statusCode === 404) {
            errorMessage = 'Not Found - Invalid endpoint or domain';
            errorDescription = 'Domain may not exist in SE Ranking database or export file expired';
        } else if (statusCode === 429) {
            errorMessage = 'Rate Limit Exceeded';
            const retryAfter = error.response?.headers?.['retry-after'] || error.response?.headers?.['Retry-After'] || 60;
            errorDescription = `Too many requests. SE Ranking requires you to wait ${retryAfter} seconds. The node now automatically adds 300ms delay between requests, but SE Ranking may have additional hourly/daily limits.`;
        } else if (statusCode === 500 || statusCode === 502 || statusCode === 503) {
            errorMessage = 'SE Ranking Server Error';
            errorDescription = 'SE Ranking API is experiencing issues. Try again in a few minutes';
        } else if (statusCode === 504) {
            errorMessage = 'Gateway Timeout - Request took too long';
            errorDescription = 'Use a faster endpoint (e.g., Get Worldwide Aggregate instead of Get Overview)';
        } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            errorMessage = 'Connection Failed';
            errorDescription = 'Cannot reach SE Ranking API. Check your internet connection';
        } else if (
            error.code === 'ETIMEDOUT' ||
            error.code === 'ECONNABORTED' ||
            error.message?.includes('timeout') ||
            error.message?.includes('aborted')
        ) {
            errorMessage = 'Request Timeout';
            errorDescription = `The request exceeded the node's ${Math.round(timeoutMs / 1000)}s timeout before SE Ranking responded (the API was reached, not offline). Heavy endpoints such as Get AI Search Leaderboard compute on demand and can take longer the first time a domain is queried; the result is cached afterward. Retry in a moment — a previously-computed domain returns almost instantly. You can also reduce the number of competitors/engines.`;
        } else {
            errorMessage = errorData?.message || errorData?.error || error.message || 'Request failed';
        }


        throw new NodeOperationError(
            this.getNode(),
            `SE Ranking API Error: ${errorMessage}`,
            {
                itemIndex,
                description: errorDescription,
            }
        );
    }
}
