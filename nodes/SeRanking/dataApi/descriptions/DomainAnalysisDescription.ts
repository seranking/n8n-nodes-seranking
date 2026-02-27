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
				name: 'Get Worldwide Aggregate for URL',
				value: 'getWorldwideAggregateUrl',
				description: "Aggregate a specific URL's global search performance statistics for both organic and paid traffic",
				action: 'Get worldwide aggregate for URL',
			},
			{
				name: 'Get Domain Pages',
				value: 'getDomainPages',
				description: 'Get a filterable list of pages for a domain with their keyword performance metrics',
				action: 'Get domain pages',
			},
			{
				name: 'Get Domain Subdomains',
				value: 'getDomainSubdomains',
				description: 'Get a list of subdomains for a domain with their traffic and keyword metrics',
				action: 'Get domain subdomains',
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
	// ─── Domain field (shared by most operations) ──────────────────────────────
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

	// ─── GET WORLDWIDE AGGREGATE FOR URL ───────────────────────────────────────
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getWorldwideAggregateUrl'],
			},
		},
		default: '',
		placeholder: 'https://example.com/page.html',
		description: 'The specific URL to analyze (full URL including https://)',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getWorldwideAggregateUrl'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'multiOptions',
				options: [
					{ name: 'Keywords', value: 'keywords' },
					{ name: 'Price', value: 'price' },
					{ name: 'Traffic', value: 'traffic' },
				],
				default: ['price', 'traffic', 'keywords'],
				description: 'Fields to include in the response',
			},
		],
	},

	// ─── GET DOMAIN PAGES ──────────────────────────────────────────────────────
	{
		displayName: 'Target',
		name: 'target',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getDomainPages'],
			},
		},
		default: '',
		placeholder: 'example.com',
		description: 'The domain to analyze (without http/https)',
	},
	{
		displayName: 'Source (Country Code)',
		name: 'source',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getDomainPages'],
			},
		},
		default: 'us',
		placeholder: 'us',
		description: 'Regional database code (e.g., us, uk, de, fr, es, it, ca, au, pl)',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getDomainPages'],
			},
		},
		options: [
			{ name: 'Organic', value: 'organic' },
			{ name: 'Advertising (Paid)', value: 'adv' },
		],
		default: 'organic',
		description: 'Type of search data to retrieve',
	},
	{
		// FIX: was 'additionalOptions' — renamed to 'additionalFields' so execution
		// can read it with getNodeParameter('additionalFields', ...).
		// FIX: all inner field names changed to camelCase to match execution code.
		// FIX: scope moved from top-level param into this collection.
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getDomainPages'],
			},
		},
		options: [
			{
				displayName: 'Scope',
				name: 'scope',
				type: 'options',
				options: [
					{ name: 'Base Domain', value: 'base_domain' },
					{ name: 'Domain', value: 'domain' },
					{ name: 'URL', value: 'url' },
				],
				default: 'base_domain',
				description: 'Scope of the analysis',
			},
			{
				displayName: 'Order Field',
				name: 'orderField',
				type: 'options',
				options: [
					{ name: 'Keywords Count', value: 'keywords_count' },
					{ name: 'Traffic Sum', value: 'traffic_sum' },
					{ name: 'Traffic Percent', value: 'traffic_percent' },
					{ name: 'Price Sum', value: 'price_sum' },
				],
				default: 'keywords_count',
				description: 'Field to order results by',
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
				description: 'Sort order direction',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip (for pagination)',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of results (max 1000)',
			},
			{
				displayName: 'URL Filter',
				name: 'filterDomainUrl',
				type: 'string',
				default: '',
				placeholder: '/blog/',
				description: 'Filter pages by URL pattern',
			},
			{
				displayName: 'Traffic Percent From',
				name: 'filterTrafficPercentFrom',
				type: 'number',
				default: 0,
				description: 'Minimum traffic percentage (0–100)',
			},
			{
				displayName: 'Traffic Percent To',
				name: 'filterTrafficPercentTo',
				type: 'number',
				default: 100,
				description: 'Maximum traffic percentage (0–100)',
			},
			{
				displayName: 'Keywords Count From',
				name: 'filterKeywordsCountFrom',
				type: 'number',
				default: 0,
				description: 'Minimum number of keywords',
			},
			{
				displayName: 'Keywords Count To',
				name: 'filterKeywordsCountTo',
				type: 'number',
				default: 0,
				description: 'Maximum number of keywords (0 = no limit)',
			},
			{
				displayName: 'Traffic Sum From',
				name: 'filterTrafficSumFrom',
				type: 'number',
				default: 0,
				description: 'Minimum total traffic',
			},
			{
				displayName: 'Traffic Sum To',
				name: 'filterTrafficSumTo',
				type: 'number',
				default: 0,
				description: 'Maximum total traffic (0 = no limit)',
			},
			{
				displayName: 'Price Sum From',
				name: 'filterPriceSumFrom',
				type: 'number',
				default: 0,
				description: 'Minimum traffic value (PPC equivalent)',
			},
			{
				displayName: 'Price Sum To',
				name: 'filterPriceSumTo',
				type: 'number',
				default: 0,
				description: 'Maximum traffic value (PPC equivalent, 0 = no limit)',
			},
		],
	},

	// ─── GET DOMAIN SUBDOMAINS ─────────────────────────────────────────────────
	{
		displayName: 'Target',
		name: 'target',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getDomainSubdomains'],
			},
		},
		default: '',
		placeholder: 'example.com',
		description: 'The base domain to analyze (without http/https)',
	},
	{
		displayName: 'Source (Country Code)',
		name: 'source',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getDomainSubdomains'],
			},
		},
		default: 'us',
		placeholder: 'us',
		description: 'Regional database code (e.g., us, uk, de, fr, es, it, ca, au, pl)',
	},
	{
		displayName: 'Scope',
		name: 'scope',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getDomainSubdomains'],
			},
		},
		options: [
			{
				name: 'Base Domain',
				value: 'base_domain',
				description: 'Aggregate subdomains under the registrable domain',
			},
			{
				name: 'Domain',
				value: 'domain',
				description: 'Aggregate subdomains under the specified host',
			},
		],
		default: 'base_domain',
		description: 'Scope of the subdomain analysis',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getDomainSubdomains'],
			},
		},
		options: [
			{ name: 'Organic', value: 'organic' },
			{ name: 'Advertising (Paid)', value: 'adv' },
		],
		default: 'organic',
		description: 'Type of search data to retrieve',
	},
	{
		// FIX: was 'additionalOptions' — renamed to 'additionalFields'.
		// FIX: all inner field names changed to camelCase to match execution code.
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['domainAnalysis'],
				operation: ['getDomainSubdomains'],
			},
		},
		options: [
			{
				displayName: 'Order Field',
				name: 'orderField',
				type: 'options',
				options: [
					{ name: 'Keywords Count', value: 'keywords_count' },
					{ name: 'Traffic Sum', value: 'traffic_sum' },
					{ name: 'Traffic Percent', value: 'traffic_percent' },
					{ name: 'Price Sum', value: 'price_sum' },
				],
				default: 'keywords_count',
				description: 'Field to order results by',
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
				description: 'Sort order direction',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip (for pagination)',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of results (max 1000)',
			},
			{
				displayName: 'Subdomain Filter',
				name: 'filterDomainUrl',
				type: 'string',
				default: '',
				placeholder: 'blog',
				description: 'Filter subdomains by text pattern',
			},
			{
				displayName: 'Traffic Percent From',
				name: 'filterTrafficPercentFrom',
				type: 'number',
				default: 0,
				description: 'Minimum traffic percentage (0–100)',
			},
			{
				displayName: 'Traffic Percent To',
				name: 'filterTrafficPercentTo',
				type: 'number',
				default: 100,
				description: 'Maximum traffic percentage (0–100)',
			},
			{
				displayName: 'Keywords Count From',
				name: 'filterKeywordsCountFrom',
				type: 'number',
				default: 0,
				description: 'Minimum number of keywords',
			},
			{
				displayName: 'Keywords Count To',
				name: 'filterKeywordsCountTo',
				type: 'number',
				default: 0,
				description: 'Maximum number of keywords (0 = no limit)',
			},
			{
				displayName: 'Traffic Sum From',
				name: 'filterTrafficSumFrom',
				type: 'number',
				default: 0,
				description: 'Minimum estimated monthly traffic',
			},
			{
				displayName: 'Traffic Sum To',
				name: 'filterTrafficSumTo',
				type: 'number',
				default: 0,
				description: 'Maximum estimated monthly traffic (0 = no limit)',
			},
			{
				displayName: 'Price Sum From',
				name: 'filterPriceSumFrom',
				type: 'number',
				default: 0,
				description: 'Minimum traffic value (PPC equivalent)',
			},
			{
				displayName: 'Price Sum To',
				name: 'filterPriceSumTo',
				type: 'number',
				default: 0,
				description: 'Maximum traffic value (PPC equivalent, 0 = no limit)',
			},
		],
	},

	// ─── Keyword field (getAdsForKeyword) ──────────────────────────────────────
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

	// ─── Compare domain (getKeywordsComparison) ────────────────────────────────
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

	// ─── Source field (regional operations) ───────────────────────────────────
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

	// ─── Type field (keywords, competitors, history) ───────────────────────────
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
			{ name: 'Organic', value: 'organic', description: 'Organic search results' },
			{ name: 'Paid (Ads)', value: 'adv', description: 'Paid advertising results' },
		],
		default: 'organic',
		description: 'Type of search results to analyze',
	},

	// ─── Comparison mode (getKeywordsComparison) ───────────────────────────────
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
				name: 'Common Keywords (A ∩ B)',
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

	// ─── Additional Fields: getOverviewDb ─────────────────────────────────────
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

	// ─── Additional Fields: getOverviewWorldwide ───────────────────────────────
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

	// ─── Additional Fields: getKeywords (EXPANDED) ────────────────────────────
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
			// ── Pagination & display ──
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of results to return (1–1000)',
				typeOptions: { minValue: 1, maxValue: 1000 },
			},
			{
				displayName: 'Include Subdomains',
				name: 'withSubdomains',
				type: 'boolean',
				default: true,
				description: 'Whether to include keywords ranking for subdomains',
			},
			{
				displayName: 'Columns',
				name: 'cols',
				type: 'string',
				default: '',
				placeholder: 'keyword,position,volume,url,difficulty',
				description: 'Comma-separated list of columns to return (leave empty for defaults)',
			},
			// ── Sorting ──
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
				description: 'Sort order direction',
			},
			// ── Position change filter ──
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
				description: 'Filter by position change vs. the previous period',
			},
			// ── Volume ──
			{
				displayName: 'Volume From',
				name: 'volumeFrom',
				type: 'number',
				default: 0,
				description: 'Minimum monthly search volume',
			},
			{
				displayName: 'Volume To',
				name: 'volumeTo',
				type: 'number',
				default: 0,
				description: 'Maximum monthly search volume (0 = no limit)',
			},
			// ── Traffic ──
			{
				displayName: 'Traffic From',
				name: 'trafficFrom',
				type: 'number',
				default: 0,
				description: 'Minimum estimated monthly traffic',
			},
			{
				displayName: 'Traffic To',
				name: 'trafficTo',
				type: 'number',
				default: 0,
				description: 'Maximum estimated monthly traffic (0 = no limit)',
			},
			// ── Traffic percent ──
			{
				displayName: 'Traffic Percent From',
				name: 'trafficPercentFrom',
				type: 'number',
				default: 0,
				description: 'Minimum traffic share percentage',
			},
			{
				displayName: 'Traffic Percent To',
				name: 'trafficPercentTo',
				type: 'number',
				default: 0,
				description: 'Maximum traffic share percentage (0 = no limit)',
			},
			// ── Position ──
			{
				displayName: 'Position From',
				name: 'positionFrom',
				type: 'number',
				default: 1,
				description: 'Minimum ranking position',
				typeOptions: { minValue: 1, maxValue: 100 },
			},
			{
				displayName: 'Position To',
				name: 'positionTo',
				type: 'number',
				default: 100,
				description: 'Maximum ranking position',
				typeOptions: { minValue: 1, maxValue: 100 },
			},
			// ── Keyword word count ──
			{
				displayName: 'Keyword Word Count From',
				name: 'keywordCountFrom',
				type: 'number',
				default: 0,
				description: 'Minimum number of words in a keyword phrase',
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Keyword Word Count To',
				name: 'keywordCountTo',
				type: 'number',
				default: 0,
				description: 'Maximum number of words in a keyword phrase (0 = no limit)',
			},
			// ── Character count ──
			{
				displayName: 'Characters Count From',
				name: 'charactersCountFrom',
				type: 'number',
				default: 0,
				description: 'Minimum character length of keyword phrases',
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Characters Count To',
				name: 'charactersCountTo',
				type: 'number',
				default: 0,
				description: 'Maximum character length of keyword phrases (0 = no limit)',
			},
			// ── CPC ──
			{
				displayName: 'CPC From',
				name: 'cpcFrom',
				type: 'number',
				default: 0,
				description: 'Minimum cost per click',
			},
			{
				displayName: 'CPC To',
				name: 'cpcTo',
				type: 'number',
				default: 0,
				description: 'Maximum cost per click (0 = no limit)',
			},
			// ── Price ──
			{
				displayName: 'Price From',
				name: 'priceFrom',
				type: 'number',
				default: 0,
				description: 'Minimum keyword price value',
			},
			{
				displayName: 'Price To',
				name: 'priceTo',
				type: 'number',
				default: 0,
				description: 'Maximum keyword price value (0 = no limit)',
			},
			// ── Competition ──
			{
				displayName: 'Competition From',
				name: 'competitionFrom',
				type: 'number',
				default: 0,
				description: 'Minimum competition score (0.0–1.0)',
				typeOptions: { minValue: 0, maxValue: 1, numberPrecision: 2 },
			},
			{
				displayName: 'Competition To',
				name: 'competitionTo',
				type: 'number',
				default: 1,
				description: 'Maximum competition score (0.0–1.0)',
				typeOptions: { minValue: 0, maxValue: 1, numberPrecision: 2 },
			},
			// ── Difficulty ──
			{
				displayName: 'Difficulty From',
				name: 'difficultyFrom',
				type: 'number',
				default: 0,
				description: 'Minimum keyword difficulty score (0–100)',
				typeOptions: { minValue: 0, maxValue: 100 },
			},
			{
				displayName: 'Difficulty To',
				name: 'difficultyTo',
				type: 'number',
				default: 100,
				description: 'Maximum keyword difficulty score (0–100)',
				typeOptions: { minValue: 0, maxValue: 100 },
			},
			// ── SERP features ──
			{
				displayName: 'SERP Features',
				name: 'serpFeatures',
				type: 'string',
				default: '',
				placeholder: 'featured_snippet,local_pack,sitelinks',
				description:
					'Comma-separated list of SERP feature codes to filter by (e.g., featured_snippet, local_pack, sitelinks). See SE Ranking docs for all accepted values.',
			},
			// ── Search intents ──
			{
				displayName: 'Search Intents',
				name: 'intents',
				type: 'multiOptions',
				options: [
					{ name: 'Informational (I)', value: 'I' },
					{ name: 'Navigational (N)', value: 'N' },
					{ name: 'Transactional (T)', value: 'T' },
					{ name: 'Commercial (C)', value: 'C' },
					{ name: 'Local (L)', value: 'L' },
				],
				default: [],
				description: 'Filter keywords by search intent',
			},
		],
	},

	// ─── Additional Fields: getKeywordsComparison ─────────────────────────────
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
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of results to return (1–1000)',
				typeOptions: { minValue: 1, maxValue: 1000 },
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
				description: 'Sort order direction',
			},
		],
	},

	// ─── Additional Fields: getCompetitors ────────────────────────────────────
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

	// ─── Additional Fields: getAdsForKeyword ──────────────────────────────────
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
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of domains to return (1–100)',
				typeOptions: { minValue: 1, maxValue: 100 },
			},
		],
	},

	// ─── Additional Fields: getAdsForDomain ───────────────────────────────────
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
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of keywords to return (1–100)',
				typeOptions: { minValue: 1, maxValue: 100 },
			},
		],
	},
];