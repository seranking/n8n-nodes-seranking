import {
	IAuthenticateGeneric,
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
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your SE Ranking API token from the API Dashboard',
		},
		{
			displayName: 'API Type',
			name: 'apiType',
			type: 'options',
			options: [
				{
					name: 'Data API',
					value: 'data',
					description: 'Used for positions, rankings, keyword data.',
				},
				{
					name: 'Project API',
					value: 'project',
					description: 'Used for managing sites, accounts, etc.',
				},
			],
			default: 'data',
			description: 'Choose which SE Ranking API you want to connect to',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Token {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiType === "project" ? "https://api4.seranking.com" : "https://api.seranking.com/v1"}}',
			url: '={{$credentials.apiType === "project" ? "/sites" : "/account/subscription"}}',
			method: 'GET',
		},
	};
}