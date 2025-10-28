import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';

export async function apiRequest(
	this: IExecuteFunctions,
	method: string,
	endpoint: string,
	body: any = {},
	query: any = {},
	itemIndex: number = 0
): Promise<any> {
	const credentials = await this.getCredentials('seRankingApi');
	
	const options: any = {
		method,
		timeout: 120000,
	};

	// Check if this is a full URL download (for export download)
	if (query._fullUrl) {
		// Use the endpoint as the full URL
		options.url = endpoint;
		delete query._fullUrl;
		
		// Export download URLs are pre-authenticated, no token needed
		// The URL itself contains authorization
		// Don't add Authorization header for downloads
		
		// Downloads return binary data (gzipped CSV), not JSON
		options.encoding = null; // Return binary buffer
		options.json = false;
	} else {
		// Normal API request - build URL with base and add auth
		const baseUrl = credentials.apiType === 'project'
			? 'https://api4.seranking.com'
			: 'https://api.seranking.com/v1';
		options.url = `${baseUrl}${endpoint}`;
		
		// Add authorization header for regular API calls
		options.headers = {
			'Authorization': `Token ${credentials.apiToken}`,
		};
		
		// Regular API calls expect JSON
		options.json = true;
	}

	// Add query parameters
	if (Object.keys(query).length > 0) {
		// Handle special case for multiple targets (SE Ranking backlinks/metrics endpoint)
		if (query._additionalTargets && Array.isArray(query._additionalTargets)) {
			const additionalTargets = query._additionalTargets;
			delete query._additionalTargets;
			
			// Build query string manually to support multiple 'target' parameters
			const queryPairs: string[] = [];
			
			// Add regular params first
			Object.keys(query).forEach(key => {
				queryPairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
			});
			
			// Add additional targets as separate 'target' parameters
			additionalTargets.forEach((target: string) => {
				queryPairs.push(`target=${encodeURIComponent(target)}`);
			});
			
			// Append to URL manually
			options.url += '?' + queryPairs.join('&');
		} else {
			options.qs = query;
		}
	}

	// Add body data
	if (Object.keys(body).length > 0 && method !== 'GET') {
		// For POST requests with keywords array, send as multipart/form-data
		if (body.keywords && Array.isArray(body.keywords)) {
			// Use FormData for multipart/form-data (like curl --form)
			const FormData = require('form-data');
			const formData = new FormData();
			
			// Add each keyword as keywords[] WITH quotes (SE Ranking requirement)
			body.keywords.forEach((kw: string) => {
				formData.append('keywords[]', `"${kw}"`);
			});
			
			// Add optional fields WITH quotes
			if (body.cols) formData.append('cols', `"${body.cols}"`);
			if (body.sort) formData.append('sort', `"${body.sort}"`);
			if (body.sort_order) formData.append('sort_order', `"${body.sort_order}"`);
			
			// n8n will automatically set content-type with boundary when body is FormData
			options.body = formData;
			options.json = false; // Don't JSON encode FormData
		} else {
			options.body = body;
		}
	}

	try {
		// Use n8n's httpRequest helper (handles FormData properly)
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
		
		// Log detailed error for debugging
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