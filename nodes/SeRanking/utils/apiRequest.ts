import { IExecuteFunctions, NodeOperationError, IHttpRequestOptions, IHttpRequestMethods } from 'n8n-workflow';

export async function apiRequest(
    this: IExecuteFunctions,
    method: string,
    endpoint: string,
    body: any = {},
    query: any = {},
    itemIndex: number = 0
): Promise<any> {
    const credentials = await this.getCredentials('seRankingApi');
    
    // Cast method to IHttpRequestMethods early
    const httpMethod = method.toUpperCase() as IHttpRequestMethods;
    
    const options: IHttpRequestOptions = {
        method: httpMethod,
        timeout: 120000,
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
        
        options.headers = {
            'Authorization': `Token ${credentials.apiToken}`,
        };
        
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
            // n8n's httpRequest supports FormData-like structure
            // Build multipart form data body as object with special structure
            const formDataBody: Record<string, any> = {};
            
            // For arrays, n8n expects each value to be added separately
            // The helper will automatically convert this to multipart/form-data
            body.keywords.forEach((kw: string, index: number) => {
                formDataBody[`keywords[${index}]`] = {
                    value: `"${kw}"`,
                    options: {
                        contentType: 'text/plain',
                    },
                };
            });
            
            // Add other fields with proper structure
            if (body.cols) {
                formDataBody.cols = {
                    value: `"${body.cols}"`,
                    options: {
                        contentType: 'text/plain',
                    },
                };
            }
            if (body.sort) {
                formDataBody.sort = {
                    value: `"${body.sort}"`,
                    options: {
                        contentType: 'text/plain',
                    },
                };
            }
            if (body.sort_order) {
                formDataBody.sort_order = {
                    value: `"${body.sort_order}"`,
                    options: {
                        contentType: 'text/plain',
                    },
                };
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
        const response = await this.helpers.httpRequest(options);
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
            errorDescription = 'Too many requests. Add delays between requests or reduce batch size';
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
            errorDescription = 'Request exceeded 120 seconds. Try with fewer items or use a faster operation';
        } else {
            errorMessage = errorData?.message || errorData?.error || error.message || 'Request failed';
        }
        
        console.error('SE Ranking API Error:', {
            status: statusCode,
            message: errorMessage,
            url: options.url,
            method: options.method,
            params: options.qs,
            itemIndex,
            errorData,
        });
        
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