import { INodeProperties } from 'n8n-workflow';

export const analyticsTrafficOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['analyticsTraffic'],
			},
		},
		options: [
			{
				name: 'Calculate SEO Potential',
				value: 'getSeoPotential',
				description: 'Estimate traffic, cost, and potential leads for a site',
				action: 'Calculate SEO potential',
			},
			{
				name: 'Get Google Search Console Data',
				value: 'getGscData',
				description: 'Get popular queries and performance metrics from Google Search Console',
				action: 'Get Google Search Console data',
			},
		],
		default: 'getGscData',
	},
];

export const analyticsTrafficFields: INodeProperties[] = [
	// ─── Site ID (all operations) ───────────────────────────────────────────
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['analyticsTraffic'],
			},
		},
		default: 0,
		description: 'Unique project (site) ID',
	},

	// ─── SEO Potential additional fields ────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['analyticsTraffic'],
				operation: ['getSeoPotential'],
			},
		},
		options: [
			{
				displayName: 'Top N',
				name: 'topN',
				type: 'number',
				default: 0,
				description: 'Calculate potential traffic assuming all queries reach this TOP position. If omitted, returns current traffic estimate.',
			},
			{
				displayName: 'Lead Price',
				name: 'leadPrice',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0,
				description: 'Estimated income per client',
			},
			{
				displayName: 'Conversion Rate',
				name: 'conversionRate',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0,
				description: 'Conversion rate to sales (%)',
			},
		],
	},
];
