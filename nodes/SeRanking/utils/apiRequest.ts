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
    
    const credentials = await this.getCredentials('seRankingApi');
        
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
        let baseUrl;
        if (endpoint.startsWith('/site-audit/') || endpoint.startsWith('/backlinks/') || endpoint.startsWith('/ai-search/') || endpoint.startsWith('/domain/') || endpoint.startsWith('/keywords/')) {
            baseUrl = 'https://api.seranking.com/v1';
        } else if (credentials.apiType === 'project') {
            // Project API endpoints
            baseUrl = 'https://api4.seranking.com';
        } else {
            // Default to Data API
            baseUrl = 'https://api.seranking.com/v1';
        }
        
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
        } else {
            options.qs = query;
        }
    }

    // Add body data
    if (Object.keys(body).length > 0 && method !== 'GET') {
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
        // Use n8n's httpRequest helper (handles multipart/form-data automatically)
        const response = await this.helpers.httpRequestWithAuthentication.call(
        this,
        'seRankingApi',
        options
        );
        return response;
    } catch (error: any) {
        // Enhanced error handling with detailed context
        const errorData = error.response?.body || error.response?.data || {};
        const statusCode = error.statusCode || error.response?.status || 'Unknown';
        
        // Determine specific error type and provide helpful message
        let errorMessage = 'Unknown error occurred';
        let errorDescription = '';
        
        if (statusCode === 400) {
            errorMessage = 'Bad Request - Invalid parameters';
            errorDescription = 'Check domain format (no http://, www), source code (us, uk, de), and parameter values';
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