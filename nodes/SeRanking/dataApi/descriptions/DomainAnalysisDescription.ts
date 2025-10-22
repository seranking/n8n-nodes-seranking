import { INodeProperties } from 'n8n-workflow';

export const domainAnalysisOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
			},
		},
		options: [
			{
				name: 'Get Regional Database Overview',
				value: 'getOverviewDb',
				description: 'Get detailed statistics for a specific regional database (FAST)',
				action: 'Get regional database overview',
			},
			{
				name: 'Get Worldwide Aggregate',
				value: 'getOverviewWorldwide',
				description: 'Get worldwide aggregate statistics for a domain (RECOMMENDED)',
				action: 'Get worldwide aggregate statistics',
			},
			{
				name: 'Get Keywords',
				value: 'getKeywords',
				description: 'Get keywords for which a domain ranks',
				action: 'Get domain keywords',
			},
			{
				name: 'Get Competitors',
				value: 'getCompetitors',
				description: 'Get competitor domains',
				action: 'Get domain competitors',
			},
		],
		default: 'getOverviewWorldwide',
	},
];

export const domainAnalysisFields: INodeProperties[] = [
	// Domain field (for all operations)
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
			},
		},
		default: '',
		placeholder: 'example.com',
		description: 'Target domain to analyze (without http:// or www)',
	},
	// Source field (for regional operations)
	{
		displayName: 'Source',
		name: 'source',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getOverviewDb', 'getKeywords', 'getCompetitors'],
			},
		},
		default: 'us',
		placeholder: 'us',
		description: 'Alpha-2 country code for regional database (e.g., us, uk, de, fr, es, it, ca, au, pl)',
	},
	// Type field (for keywords and competitors)
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getKeywords', 'getCompetitors'],
			},
		},
		options: [
			{
				name: 'Organic',
				value: 'organic',
				description: 'Organic search results',
			},
			{
				name: 'Paid (Ads)',
				value: 'adv',
				description: 'Paid advertising results',
			},
		],
		default: 'organic',
		description: 'Type of search results to analyze',
	},
	// Additional Fields for getOverviewDb
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getOverviewDb'],
			},
		},
		options: [
			{
				displayName: 'Include Subdomains',
				name: 'withSubdomains',
				type: 'boolean',
				default: true,
				description: 'Whether to include subdomains in the analysis',
			},
		],
	},
	// Additional Fields for getOverviewWorldwide
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getOverviewWorldwide'],
			},
		},
		options: [
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'options',
				options: [
					{ name: 'USD - US Dollar', value: 'USD' },
					{ name: 'EUR - Euro', value: 'EUR' },
					{ name: 'GBP - British Pound', value: 'GBP' },
					{ name: 'AUD - Australian Dollar', value: 'AUD' },
					{ name: 'CAD - Canadian Dollar', value: 'CAD' },
					{ name: 'JPY - Japanese Yen', value: 'JPY' },
					{ name: 'PLN - Polish Zloty', value: 'PLN' },
				],
				default: 'USD',
				description: 'Currency for monetary values',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'multiOptions',
				options: [
					{ name: 'Price', value: 'price' },
					{ name: 'Traffic', value: 'traffic' },
					{ name: 'Keywords', value: 'keywords' },
					{ name: 'Position Differences', value: 'positions_diff' },
					{ name: 'Position Tops', value: 'positions_tops' },
				],
				default: ['price', 'traffic', 'keywords'],
				description: 'Data fields to include in response',
			},
			{
				displayName: 'Show Zones List',
				name: 'showZonesList',
				type: 'boolean',
				default: false,
				description: 'Whether to include detailed breakdown for each regional zone',
			},
		],
	},
	// Additional Fields for getKeywords
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getKeywords'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of results to return',
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip for pagination',
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'Include Subdomains',
				name: 'withSubdomains',
				type: 'boolean',
				default: true,
				description: 'Whether to include subdomains in the analysis',
			},
			{
				displayName: 'Columns',
				name: 'cols',
				type: 'multiOptions',
				options: [
					{ name: 'Keyword', value: 'keyword' },
					{ name: 'Position', value: 'position' },
					{ name: 'Previous Position', value: 'prev_pos' },
					{ name: 'Volume', value: 'volume' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'Competition', value: 'competition' },
					{ name: 'URL', value: 'url' },
					{ name: 'KEI', value: 'kei' },
					{ name: 'Total Sites', value: 'total_sites' },
					{ name: 'Traffic', value: 'traffic' },
					{ name: 'Traffic Percent', value: 'traffic_percent' },
					{ name: 'Price', value: 'price' },
				],
				default: ['keyword', 'position', 'volume', 'cpc', 'url'],
				description: 'Columns to return in the response',
			},
			{
				displayName: 'Order By',
				name: 'orderField',
				type: 'options',
				options: [
					{ name: 'Keyword', value: 'keyword' },
					{ name: 'Position', value: 'position' },
					{ name: 'Volume', value: 'volume' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'Traffic', value: 'traffic' },
					{ name: 'Price', value: 'price' },
				],
				default: 'position',
				description: 'Field to sort results by',
			},
			{
				displayName: 'Sort Order',
				name: 'orderType',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'asc',
				description: 'Order of sorting',
			},
			{
				displayName: 'Volume From',
				name: 'volumeFrom',
				type: 'number',
				default: 0,
				description: 'Minimum search volume filter',
			},
			{
				displayName: 'Volume To',
				name: 'volumeTo',
				type: 'number',
				default: 0,
				description: 'Maximum search volume filter (0 = no limit)',
			},
			{
				displayName: 'Position From',
				name: 'positionFrom',
				type: 'number',
				default: 1,
				description: 'Minimum position filter',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
			},
			{
				displayName: 'Position To',
				name: 'positionTo',
				type: 'number',
				default: 100,
				description: 'Maximum position filter',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
			},
			{
				displayName: 'CPC From',
				name: 'cpcFrom',
				type: 'number',
				default: 0,
				description: 'Minimum CPC filter',
			},
			{
				displayName: 'CPC To',
				name: 'cpcTo',
				type: 'number',
				default: 0,
				description: 'Maximum CPC filter (0 = no limit)',
			},
		],
	},
	// Additional Fields for getCompetitors
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getCompetitors'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of competitors to return (max 500)',
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
			},
			{
				displayName: 'Include Statistics',
				name: 'stats',
				type: 'boolean',
				default: true,
				description: 'Whether to include detailed statistics for each competitor',
			},
			{
				displayName: 'Exclude Leaders',
				name: 'excludeLeaders',
				type: 'boolean',
				default: false,
				description: 'Whether to exclude major industry leaders from results',
			},
		],
	},
];