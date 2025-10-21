import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import axios, { AxiosRequestConfig } from 'axios';

export async function apiRequest(
	this: IExecuteFunctions,
	method: string,
	endpoint: string,
	body: any = {},
	query: any = {},
	itemIndex: number = 0
): Promise<any> {
	const credentials = await this.getCredentials('seRankingApi');
	const baseUrl = credentials.apiType === 'project'
		? 'https://api4.seranking.com'
		: 'https://api.seranking.com/v1';

	const config: AxiosRequestConfig = {
		method,
		url: `${baseUrl}${endpoint}`,
		headers: {
			'Authorization': `Token ${credentials.apiToken}`,
			'Content-Type': 'application/json',
		},
		timeout: 120000, // Increased to 120 seconds for slow endpoints
	};

	// Add query parameters
	if (Object.keys(query).length > 0) {
		config.params = query;
	}

	// Add body data
	if (Object.keys(body).length > 0 && method !== 'GET') {
		// For POST requests with keywords array, send as form data
		if (body.keywords && Array.isArray(body.keywords)) {
			const formData = new URLSearchParams();
			
			// Add each keyword as keywords[]
			body.keywords.forEach((kw: string) => {
				formData.append('keywords[]', kw);
			});
			
			// Add optional fields
			if (body.cols) formData.append('cols', body.cols);
			if (body.sort) formData.append('sort', body.sort);
			if (body.sort_order) formData.append('sort_order', body.sort_order);
			
			config.data = formData.toString();
			if (config.headers) {
				config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			}
		} else {
			config.data = body;
		}
	}

	try {
		const response = await axios(config);
		return response.data;
	} catch (error: any) {
		// Enhanced error logging
		const errorData = error.response?.data;
		const errorMessage = errorData?.message ||
							errorData?.error ||
							error.message;
		
		// Log full error details for debugging
		if (process.env.NODE_ENV !== 'production') {
			console.error('SE Ranking API Error Details:', {
				status: error.response?.status,
				statusText: error.response?.statusText,
				data: errorData,
				url: config.url,
				params: config.params,
				method: config.method,
				body: config.data,
			});
		}
		
		throw new NodeOperationError(
			this.getNode(),
			`SE Ranking API Error: ${errorMessage}`,
			{
				itemIndex,
				description: `Status: ${error.response?.status || 'Unknown'} - Check your domain, source code, and API credentials`,
			}
		);
	}
}