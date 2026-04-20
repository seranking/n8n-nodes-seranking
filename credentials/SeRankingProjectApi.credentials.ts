import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SeRankingProjectApi implements ICredentialType {
	name = 'seRankingProjectApi';
	displayName = 'SE Ranking Project API';
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
			description: 'Your SE Ranking Project API token from the API Dashboard',
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
			baseURL: 'https://api4.seranking.com',
			url: '/sites',
			method: 'GET',
		},
	};
}
