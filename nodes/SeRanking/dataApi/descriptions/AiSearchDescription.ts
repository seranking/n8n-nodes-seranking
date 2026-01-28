import { INodeProperties } from 'n8n-workflow';

export const aiSearchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['aiSearch'],
			},
		},
		options: [
			{
				name: 'Get Overview',
				value: 'getOverview',
				description: 'Get LLM visibility metrics for a domain',
				action: 'Get AI search overview',
			},
			{
				name: 'Discover Brand',
				value: 'discoverBrand',
				description: 'Identify brand name for a domain',
				action: 'Discover brand name',
			},
			{
				name: 'Get Prompts by Target',
				value: 'getPromptsByTarget',
				description: 'Get prompts mentioning target domain',
				action: 'Get prompts by target',
			},
			{
				name: 'Get Prompts by Brand',
				value: 'getPromptsByBrand',
				description: 'Get prompts mentioning brand name',
				action: 'Get prompts by brand',
			},
			{
				name: 'Get Leaderboard',
				value: 'getLeaderboard',
				description: 'Compare domain performance against competitors across LLMs',
				action: 'Get AI search leaderboard',
			},
		],
		default: 'getOverview',
	},
];

export const aiSearchFields: INodeProperties[] = [
	// Domain field (for target-based operations)
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getOverview', 'discoverBrand', 'getPromptsByTarget'],
			},
		},
		default: '',
		placeholder: 'example.com',
		description: 'Target domain to analyze (without http:// or www)',
	},
	// Brand name field
	{
		displayName: 'Brand Name',
		name: 'brandName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getPromptsByBrand'],
			},
		},
		default: '',
		placeholder: 'Brand Name',
		description: 'Brand name to search for in LLM results',
	},
	// Engine field (required for overview and prompts operations)
	{
		displayName: 'Engine',
		name: 'engine',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getOverview', 'getPromptsByTarget', 'getPromptsByBrand'],
			},
		},
		options: [
			{
				name: 'AI Overview',
				value: 'ai-overview',
				description: 'Google AI Overview results',
			},
			{
				name: 'ChatGPT',
				value: 'chatgpt',
				description: 'OpenAI ChatGPT results',
			},
			{
				name: 'Perplexity',
				value: 'perplexity',
				description: 'Perplexity AI results',
			},
			{
				name: 'Gemini',
				value: 'gemini',
				description: 'Google Gemini results',
			},
			{
				name: 'AI Mode',
				value: 'ai-mode',
				description: 'AI Mode results',
			},
		],
		default: 'chatgpt',
		description: 'The LLM engine to query',
	},
	// Source field (country code - required for all operations)
	{
		displayName: 'Source',
		name: 'source',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiSearch'],
			},
		},
		default: 'us',
		placeholder: 'us',
		description: 'Alpha-2 country code for regional prompt database (e.g., us, uk, de, fr, es, it, ca, au, pl)',
	},
	// Scope field (optional but recommended)
	{
		displayName: 'Scope',
		name: 'scope',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getOverview', 'discoverBrand', 'getPromptsByTarget'],
			},
		},
		options: [
			{
				name: 'Base Domain',
				value: 'base_domain',
				description: 'Aggregate by registrable domain, includes all subdomains',
			},
			{
				name: 'Domain',
				value: 'domain',
				description: 'Exact host only, no subdomain aggregation',
			},
			{
				name: 'URL',
				value: 'url',
				description: 'Exact URL including path and query',
			},
		],
		default: 'base_domain',
		description: 'Scope of analysis - base_domain is recommended for most use cases',
	},
	// Additional options for prompts operations
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getPromptsByTarget', 'getPromptsByBrand'],
			},
		},
		options: [
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'options',
				options: [
					{
						name: 'Volume',
						value: 'volume',
						description: 'Sort by search volume',
					},
					{
						name: 'Type',
						value: 'type',
						description: 'Sort by appearance type (Link, Brand, etc.)',
					},
					{
						name: 'Snippet Length',
						value: 'snippet_length',
						description: 'Sort by length of the LLM snippet',
					},
				],
				default: 'volume',
				description: 'Field to sort results by',
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{
						name: 'Descending',
						value: 'desc',
						description: 'Highest to lowest',
					},
					{
						name: 'Ascending',
						value: 'asc',
						description: 'Lowest to highest',
					},
				],
				default: 'desc',
				description: 'Order of sorting',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of results to return per page (max 1000)',
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
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

		],
	},
	// ========== LEADERBOARD FIELDS ==========
	{
		displayName: 'Primary Target',
		name: 'primaryTarget',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getLeaderboard'],
			},
		},
		default: '',
		placeholder: 'seranking.com',
		description: 'Your domain to analyze',
	},
	{
		displayName: 'Primary Brand',
		name: 'primaryBrand',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getLeaderboard'],
			},
		},
		default: '',
		placeholder: 'SE Ranking',
		description: 'Brand name for your primary target',
	},
	{
		displayName: 'Competitors',
		name: 'competitors',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Competitor',
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getLeaderboard'],
			},
		},
		options: [
			{
				name: 'competitorValues',
				displayName: 'Competitor',
				values: [
					{
						displayName: 'Target Domain',
						name: 'target',
						type: 'string',
						default: '',
						placeholder: 'semrush.com',
						description: 'Competitor domain',
					},
					{
						displayName: 'Brand Name',
						name: 'brand',
						type: 'string',
						default: '',
						placeholder: 'Semrush',
						description: 'Competitor brand name',
					},
				],
			},
		],
		description: 'Add competitor domains and brands to compare against',
	},
	{
		displayName: 'Scope',
		name: 'leaderboardScope',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getLeaderboard'],
			},
		},
		options: [
			{
				name: 'Base Domain',
				value: 'base_domain',
				description: 'Aggregate by registrable domain',
			},
			{
				name: 'Exact URL',
				value: 'exact_url',
				description: 'Exact URL matching',
			},
		],
		default: 'base_domain',
		description: 'Scope of analysis',
	},
	{
		displayName: 'AI Engines',
		name: 'engines',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiSearch'],
				operation: ['getLeaderboard'],
			},
		},
		options: [
			{
				name: 'AI Overview (Google)',
				value: 'ai-overview',
			},
			{
				name: 'ChatGPT',
				value: 'chatgpt',
			},
			{
				name: 'Perplexity',
				value: 'perplexity',
			},
			{
				name: 'Gemini',
				value: 'gemini',
			},
			{
				name: 'AI Mode',
				value: 'ai-mode',
			},
		],
		default: ['ai-overview', 'chatgpt', 'perplexity'],
		description: 'LLM engines to compare across',
	},
];