import { INodeProperties } from 'n8n-workflow';

export const accountSystemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['accountSystem'],
			},
		},
		options: [
			{
				name: 'Get Account Balance',
				value: 'getBalance',
				description: 'Get the current balance and currency of the account',
				action: 'Get account balance',
			},
			{
				name: 'Get Subscription Data',
				value: 'getSubscription',
				description: 'Get subscription information of the account',
				action: 'Get subscription data',
			},
			{
				name: 'Get User Profile',
				value: 'getProfile',
				description: 'Get profile information of the account',
				action: 'Get user profile',
			},
		],
		default: 'getBalance',
	},
];

export const accountSystemFields: INodeProperties[] = [];
