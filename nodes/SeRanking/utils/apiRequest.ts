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
		timeout: 30000,
	};

	if (Object.keys(query).length > 0) {
		config.params = query;
	}

	if (Object.keys(body).length > 0 && method !== 'GET') {
		config.data = body;
	}

	try {
		const response = await axios(config);
		return response.data;
	} catch (error: any) {
		const errorMessage = error.response?.data?.message ||
							error.response?.data?.error ||
							error.message;
		
		throw new NodeOperationError(
			this.getNode(),
			`SE Ranking API Error: ${errorMessage}`,
			{
				itemIndex,
				description: `Status: ${error.response?.status || 'Unknown'}`,
			}
		);
	}
}