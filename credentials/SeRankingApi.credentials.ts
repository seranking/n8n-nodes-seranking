import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SeRankingApi implements ICredentialType {
	name = 'seRankingApi';
	displayName = 'SE Ranking API';
	documentationUrl = 'https://seranking.com/api-google-organic.html';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token (Data API)',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Token for Data API — domain analysis, keywords, backlinks, SERP, etc.',
		},
		{
			displayName: 'API Token (Project API)',
			name: 'projectApiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Token for Project API — project management, competitors, audit, etc. Leave empty if not using Project API resources.',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.seranking.com/v1',
			url: '/account/subscription',
			method: 'GET',
			headers: {
				'Authorization': '=Token {{$credentials.apiToken}}',
			},
		},
	};
}