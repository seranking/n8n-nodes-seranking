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
				name: 'Get Overview History',
				value: 'getOverviewHistory',
				description: 'Get historical domain metrics over a date range',
				action: 'Get overview history',
			},
			{
				name: 'Get Keywords',
				value: 'getKeywords',
				description: 'Get keywords for which a domain ranks',
				action: 'Get domain keywords',
			},
			{
				name: 'Get Keywords Comparison',
				value: 'getKeywordsComparison',
				description: 'Compare keyword rankings between two domains',
				action: 'Get keywords comparison',
			},
			{
				name: 'Get Competitors',
				value: 'getCompetitors',
				description: 'Get competitor domains',
				action: 'Get domain competitors',
			},
			{
				name: 'Get Paid Ads for Keyword',
				value: 'getAdsForKeyword',
				description: 'Get domains advertising on a specific keyword',
				action: 'Get paid ads for keyword',
			},
			{
				name: 'Get Paid Ads for Domain',
				value: 'getAdsForDomain',
				description: 'Get keywords a domain is advertising on',
				action: 'Get paid ads for domain',
			},
		],
		default: 'getOverviewWorldwide',
	},
];

export const domainAnalysisFields: INodeProperties[] = [
	// Domain field (for most operations)
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: [
					'getOverviewDb',
					'getOverviewWorldwide',
					'getOverviewHistory',
					'getKeywords',
					'getKeywordsComparison',
					'getCompetitors',
					'getAdsForDomain',
				],
			},
		},
		default: '',
		placeholder: 'example.com',
		description: 'Target domain to analyze (without http:// or www)',
	},
	// Keyword field (for getAdsForKeyword)
	{
		displayName: 'Keyword',
		name: 'keyword',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getAdsForKeyword'],
			},
		},
		default: '',
		placeholder: 'seo tools',
		description: 'Keyword to analyze paid ads for',
	},
	// Compare domain field (for comparison)
	{
		displayName: 'Compare Domain',
		name: 'compareDomain',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getKeywordsComparison'],
			},
		},
		default: '',
		placeholder: 'competitor.com',
		description: 'Competitor domain to compare against',
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
				operation: [
					'getOverviewDb',
					'getOverviewHistory',
					'getKeywords',
					'getKeywordsComparison',
					'getCompetitors',
					'getAdsForKeyword',
					'getAdsForDomain',
				],
			},
		},
		default: 'us',
		placeholder: 'us',
		description: 'Alpha-2 country code for regional database (e.g., us, uk, de, fr, es, it, ca, au, pl)',
	},
	// Type field (for keywords, competitors, and history)
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getKeywords', 'getKeywordsComparison', 'getCompetitors', 'getOverviewHistory'],
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
	// Diff field (for comparison)
	{
		displayName: 'Comparison Mode',
		name: 'diff',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getKeywordsComparison'],
			},
		},
		options: [
			{
				name: 'Common Keywords (A âˆ© B)',
				value: '0',
				description: 'Keywords both domains rank for',
			},
			{
				name: 'Keyword Gap (A - B)',
				value: '1',
				description: 'Keywords primary domain ranks for, but competitor does not',
			},
		],
		default: '0',
		description: 'What keywords to compare',
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
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of results to return (1-1000)',
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
				},
			},
			{
				displayName: 'Columns',
				name: 'cols',
				type: 'string',
				default: '',
				placeholder: 'keyword,position,volume,cpc,url',
				description: 'Comma-separated list of columns to return',
			},
			{
				displayName: 'Order Field',
				name: 'orderField',
				type: 'options',
				options: [
					{ name: 'Traffic', value: 'traffic' },
					{ name: 'Volume', value: 'volume' },
					{ name: 'Position', value: 'position' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'Competition', value: 'competition' },
					{ name: 'KEI', value: 'kei' },
				],
				default: 'traffic',
				description: 'Field to sort results by',
			},
			{
				displayName: 'Order Type',
				name: 'orderType',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				description: 'Order of sorting',
			},
			{
				displayName: 'Position Change',
				name: 'posChange',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Up', value: 'up' },
					{ name: 'Down', value: 'down' },
					{ name: 'New', value: 'new' },
					{ name: 'Lost', value: 'lost' },
					{ name: 'Changed', value: 'diff' },
					{ name: 'Same', value: 'same' },
				],
				default: '',
				description: 'Filter by position changes',
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
		],
	},
	// Additional Fields for getKeywordsComparison
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getKeywordsComparison'],
			},
		},
		options: [
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of results to return (1-1000)',
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
				},
			},
			{
				displayName: 'Columns',
				name: 'cols',
				type: 'string',
				default: '',
				placeholder: 'keyword,volume,position,compare_position',
				description: 'Comma-separated list of columns to return',
			},
			{
				displayName: 'Order Field',
				name: 'orderField',
				type: 'options',
				options: [
					{ name: 'Keyword', value: 'keyword' },
					{ name: 'Volume', value: 'volume' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'Competition', value: 'competition' },
					{ name: 'Difficulty', value: 'difficulty' },
					{ name: 'Position', value: 'position' },
					{ name: 'Price', value: 'price' },
					{ name: 'Traffic', value: 'traffic' },
				],
				default: 'keyword',
				description: 'Field to sort results by',
			},
			{
				displayName: 'Order Type',
				name: 'orderType',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'asc',
				description: 'Order of sorting',
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
	// Additional Fields for getAdsForKeyword
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getAdsForKeyword'],
			},
		},
		options: [
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
				placeholder: '2024-01',
				description: 'Start date for data (YYYY-MM)',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				placeholder: '2024-12',
				description: 'End date for data (YYYY-MM)',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of domains to return (1-100)',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
			},
		],
	},
	// Additional Fields for getAdsForDomain
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getAdsForDomain'],
			},
		},
		options: [
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
				placeholder: '2024-01',
				description: 'Start date for data (YYYY-MM)',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				placeholder: '2024-12',
				description: 'End date for data (YYYY-MM)',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of keywords to return (1-100)',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
			},
		],
	},
];