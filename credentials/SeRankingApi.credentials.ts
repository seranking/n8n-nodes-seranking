import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SeRankingApi implements ICredentialType {
	name = 'seRankingApi';
	displayName = 'SE Ranking API';
	documentationUrl = 'https://seranking.com/api/';

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
			description: 'Your SE Ranking API token from the API Dashboard. As of 2026-05 a single unified token authenticates both Data API and Project API endpoints.',
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
			baseURL: 'https://api.seranking.com/v1',
			url: '/account/subscription',
			method: 'GET',
		},
	};
}
