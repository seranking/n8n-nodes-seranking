import { IExecuteFunctions, NodeOperationError, IHttpRequestOptions, IHttpRequestMethods, sleep } from 'n8n-workflow';

// Rate limiting variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 300; // 300ms 

export async function apiRequest(
    this: IExecuteFunctions,
    method: string,
    endpoint: string,
    body: any = {},
    query: any = {},
    itemIndex = 0
): Promise<any> {
    // Rate limiting: enforce minimum delay between requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
        await sleep(waitTime);
    }
    lastRequestTime = Date.now();
    
    // Resource-based API routing
    const DATA_API_RESOURCES = new Set([
        'aiSearch',
        'backlinks',
        'domainAnalysis',
        'keywordResearch',
        'serpClassic',
        'websiteAudit',
    ]);

    let resource: string;
    try {
        resource = this.getNodeParameter('resource', itemIndex) as string;
    } catch {
        resource = '';
    }

    const isDataApi = DATA_API_RESOURCES.has(resource);
    const credentialType = isDataApi ? 'seRankingApi' : 'seRankingProjectApi';

    // Cast method to IHttpRequestMethods early
    const httpMethod = method.toUpperCase() as IHttpRequestMethods;

    const options: IHttpRequestOptions = {
        method: httpMethod,
        timeout: 60000,
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
        const baseUrl = isDataApi
            ? 'https://api.seranking.com/v1'
            : 'https://api4.seranking.com';

        options.url = `${baseUrl}${endpoint}`;
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
        if (body.keywords && Array.isArray(body.keywords)) {
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
        const response = await this.helpers.httpRequestWithAuthentication.call(
            this,
            credentialType,
            options,
        );
        return response;
    } catch (error: any) {
        // Missing credential check
        if (error.message?.includes('does not require credentials') || error.message?.includes('No credentials')) {
            const missingCred = isDataApi
                ? 'SE Ranking API credential not configured'
                : 'SE Ranking Project API credential not configured';
            const missingDesc = isDataApi
                ? 'This resource requires the SE Ranking API credential. Click the node, find the "SE Ranking API" credential slot, and create/select your Data API token.'
                : 'This resource requires the SE Ranking Project API credential. Click the node, find the "SE Ranking Project API" credential slot, and create/select your Project API token.';
            throw new NodeOperationError(
                this.getNode(),
                missingCred,
                {
                    itemIndex,
                    description: missingDesc,
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
        } else if (error.code === 'ETIMEDOUT' || error.message?.includes('timeout')) {
            errorMessage = 'Request Timeout';
            errorDescription = 'Request exceeded 60 seconds. Try with fewer items or use a faster operation';
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