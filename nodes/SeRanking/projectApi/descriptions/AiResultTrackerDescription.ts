import { INodeProperties } from 'n8n-workflow';

export const aiResultTrackerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
			},
		},
		options: [
			{
				name: 'Add Prompts',
				value: 'addPrompts',
				description: 'Add prompts (keywords) to an LLM engine',
				action: 'Add prompts',
			},
			{
				name: 'Create LLM Engine',
				value: 'createLlmEngine',
				description: 'Add a new LLM engine to a site',
				action: 'Create LLM engine',
			},
			{
				name: 'Delete LLM Engine',
				value: 'deleteLlmEngine',
				description: 'Remove an LLM engine from a site',
				action: 'Delete LLM engine',
			},
			{
				name: 'Delete Prompts',
				value: 'deletePrompts',
				description: 'Delete prompts from an LLM engine',
				action: 'Delete prompts',
			},
			{
				name: 'Get Competitors Breakdown',
				value: 'getCompetitorsBreakdown',
				description: 'Get per-prompt brand and source breakdown for competitors in AI answers',
				action: 'Get competitors breakdown',
			},
			{
				name: 'Get Competitors Check Dates',
				value: 'getCompetitorsCheckDates',
				description: 'Get dates on which a tracked prompt has competitor data',
				action: 'Get competitors check dates',
			},
			{
				name: 'Get Competitors Source Metrics',
				value: 'getCompetitorsSourceMetrics',
				description: 'Get SEO metrics for sources cited in a prompt answer on a specific date',
				action: 'Get competitors source metrics',
			},
			{
				name: 'Get LLM Engine',
				value: 'getLlmEngine',
				description: 'Get details of a specific LLM engine',
				action: 'Get LLM engine',
			},
			{
				name: 'Get LLM Statistics',
				value: 'getLlmStatistics',
				description: 'Get presence and overlap statistics for an LLM engine',
				action: 'Get LLM statistics',
			},
			{
				name: 'Get LLM Status',
				value: 'getLlmStatus',
				description: 'Get tracking status and progress for an LLM engine',
				action: 'Get LLM status',
			},
			{
				name: 'Get Prompt Answer',
				value: 'getPromptAnswer',
				description: 'Get the full AI answer text, sources, brands, and organic URLs for a tracked prompt',
				action: 'Get prompt answer',
			},
			{
				name: 'Get Prompt Rankings',
				value: 'getPromptRankings',
				description: 'Get ranking data for prompts tracked by an LLM engine',
				action: 'Get prompt rankings',
			},
			{
				name: 'Get Site Brand',
				value: 'getSiteBrand',
				description: 'Get the brand configured for a site',
				action: 'Get site brand',
			},
			{
				name: 'Get Sources Recommendations',
				value: 'getSourcesRecommendations',
				description: 'Get recommended source domains to target for AI visibility',
				action: 'Get sources recommendations',
			},
			{
				name: 'Get Sources Summary',
				value: 'getSourcesSummary',
				description: 'Get aggregated source mention opportunities and competitor counts',
				action: 'Get sources summary',
			},
			{
				name: 'List LLM Engines',
				value: 'listLlmEngines',
				description: 'Get all LLM engines configured for a site',
				action: 'List LLM engines',
			},
			{
				name: 'List Prompts',
				value: 'listPrompts',
				description: 'List prompts tracked by an LLM engine',
				action: 'List prompts',
			},
			{
				name: 'List Source Domains',
				value: 'listSourceDomains',
				description: 'List source domains cited in AI answers with coverage and mention metrics',
				action: 'List source domains',
			},
			{
				name: 'List Source Pages',
				value: 'listSourcePages',
				description: 'List individual source URLs cited in AI answers with usage metrics',
				action: 'List source pages',
			},
			{
				name: 'Save Site Brand',
				value: 'saveSiteBrand',
				description: 'Configure or overwrite the brand for a site',
				action: 'Save site brand',
			},
			{
				name: 'Update LLM Engine',
				value: 'updateLlmEngine',
				description: 'Update region or language of an LLM engine',
				action: 'Update LLM engine',
			},
		],
		default: 'getSiteBrand',
	},
];

export const aiResultTrackerFields: INodeProperties[] = [
	// ─── Site ID (shared by all operations) ──────────────────────────────────
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
			},
		},
		default: 0,
		description: 'Unique project (site) ID',
	},

	// ─── LLM Engine ID (shared by many operations) ──────────────────────────
	{
		displayName: 'LLM Engine ID',
		name: 'llmId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: [
					'getLlmEngine',
					'updateLlmEngine',
					'deleteLlmEngine',
					'getLlmStatus',
					'getLlmStatistics',
					'listPrompts',
					'addPrompts',
					'deletePrompts',
					'getPromptRankings',
					'getPromptAnswer',
					'getCompetitorsBreakdown',
					'getCompetitorsCheckDates',
					'getCompetitorsSourceMetrics',
				],
			},
		},
		default: 0,
		description: 'LLM engine ID',
	},

	// ─── SAVE SITE BRAND fields ─────────────────────────────────────────────
	{
		displayName: 'Brand Name',
		name: 'brandName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['saveSiteBrand'],
			},
		},
		default: '',
		placeholder: 'SE Ranking',
		description: 'Brand name to configure (max 255 characters). Shared across all AI search engines.',
	},

	// ─── CREATE LLM ENGINE fields ───────────────────────────────────────────
	{
		displayName: 'Base Name',
		name: 'baseName',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['createLlmEngine'],
			},
		},
		options: [
			{ name: 'ChatGPT', value: 'chatgpt' },
			{ name: 'Gemini', value: 'gemini' },
			{ name: 'Google AI Mode', value: 'google_ai_mode' },
			{ name: 'Google AI Overview', value: 'google_ai_overview' },
			{ name: 'Perplexity', value: 'perplexity' },
		],
		default: 'chatgpt',
		description: 'LLM engine type',
	},
	{
		displayName: 'Country Code',
		name: 'countryCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['createLlmEngine'],
			},
		},
		default: '',
		placeholder: 'us',
		description: 'ISO 3166-1 alpha-2 country code',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['createLlmEngine'],
			},
		},
		options: [
			{
				displayName: 'Region Name',
				name: 'regionName',
				type: 'string',
				default: '',
				description: 'Specific region or locality (must match country for Google engines)',
			},
			{
				displayName: 'Language Code',
				name: 'langCode',
				type: 'string',
				default: '',
				placeholder: 'en',
				description: 'ISO 639-1 language code',
			},
		],
	},

	// ─── UPDATE LLM ENGINE fields ───────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['updateLlmEngine'],
			},
		},
		options: [
			{
				displayName: 'Region Name',
				name: 'regionName',
				type: 'string',
				default: '',
				description: 'New region or locality name. Leave empty to clear.',
			},
			{
				displayName: 'Language Code',
				name: 'langCode',
				type: 'string',
				default: '',
				placeholder: 'en',
				description: 'New language code. Leave empty to clear.',
			},
		],
	},

	// ─── GET LLM STATISTICS optional fields ─────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getLlmStatistics'],
			},
		},
		options: [
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
				placeholder: '2026-01-01',
				description: 'Start date (YYYY-MM-DD). Defaults to current date.',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				placeholder: '2026-01-31',
				description: 'End date (YYYY-MM-DD). Defaults to current date.',
			},
			{
				displayName: 'Top',
				name: 'top',
				type: 'number',
				default: 0,
				description: 'Top N positions to analyze (0=all, 3=top 3, 10=top 10)',
			},
		],
	},

	// ─── LIST PROMPTS optional fields ───────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['listPrompts'],
			},
		},
		options: [
			{
				displayName: 'Group IDs',
				name: 'groupIds',
				type: 'string',
				default: '',
				placeholder: '12,18',
				description: 'Comma-separated prompt group IDs to filter by',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of items per page (1–1000)',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Offset from the beginning of the list',
			},
		],
	},

	// ─── ADD PROMPTS fields ─────────────────────────────────────────────────
	{
		displayName: 'Prompts',
		name: 'prompts',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['addPrompts'],
			},
		},
		default: '',
		placeholder: 'best seo tool,seo rank tracker,website audit tool',
		description: 'Comma-separated list of keyword prompts to add (max 255 chars each)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['addPrompts'],
			},
		},
		options: [
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'number',
				default: 0,
				description: 'Target prompt group ID. Defaults to the site\'s default group.',
			},
		],
	},

	// ─── DELETE PROMPTS fields ──────────────────────────────────────────────
	{
		displayName: 'Keyword-LLM Link IDs',
		name: 'k2siteLlmIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['deletePrompts'],
			},
		},
		default: '',
		placeholder: '1411621,1411624',
		description: 'Comma-separated k2site_llm_id values (get these from List Prompts)',
	},

	// ─── GET PROMPT RANKINGS optional fields ────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getPromptRankings'],
			},
		},
		options: [
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2026-01-01',
				description: 'Start date (YYYY-MM-DD). Defaults to current date.',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2026-01-31',
				description: 'End date (YYYY-MM-DD). Defaults to current date.',
			},
			{
				displayName: 'Group IDs',
				name: 'groupIds',
				type: 'string',
				default: '',
				placeholder: '12,18',
				description: 'Comma-separated prompt group IDs to filter by',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of items per page (1–1000)',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Offset from the beginning of the list',
			},
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'Per Prompt (Default)', value: '' },
					{ name: 'Aggregated by Group', value: 'groups' },
				],
				default: '',
				description: 'Set to "groups" to get aggregated time-series per prompt group (mention_presence/link_presence as percentages) instead of per-prompt rankings',
			},
		],
	},
	// ─── GET PROMPT ANSWER fields ───────────────────────────────────────────
	{
		displayName: 'Keyword-LLM Link ID',
		name: 'k2siteLlmId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getPromptAnswer'],
			},
		},
		default: 0,
		description: 'Value of the <code>k2site_llm_id</code> field from List Prompts',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getPromptAnswer'],
			},
		},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'string',
				default: '',
				placeholder: '2026-04-01',
				description: 'Date of the cached answer (YYYY-MM-DD). Defaults to current date. Full text retained for last 30 days only.',
			},
		],
	},

	// ─── SOURCES SUMMARY / RECOMMENDATIONS optional fields ──────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getSourcesSummary', 'getSourcesRecommendations'],
			},
		},
		options: [
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2026-04-01',
				description: 'Start date (YYYY-MM-DD). Defaults to the last 30 days. Citations can be weeks old — use a wide window (90+ days) if results look empty.',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2026-04-30',
				description: 'End date (YYYY-MM-DD). Cannot exceed the current date.',
			},
			{
				displayName: 'Group IDs',
				name: 'groupIds',
				type: 'string',
				default: '',
				placeholder: '12,18',
				description: 'Comma-separated prompt group IDs to filter by',
			},
			{
				displayName: 'Prompt IDs',
				name: 'promptIds',
				type: 'string',
				default: '',
				placeholder: '2519863,2456998',
				description: 'Comma-separated prompt IDs to filter by',
			},
			{
				displayName: 'Site LLM Engine IDs',
				name: 'siteLlmIds',
				type: 'string',
				default: '',
				placeholder: '221275,224302',
				description: 'Comma-separated LLM engine IDs to filter by. Defaults to all engines of the site.',
			},
		],
	},

	// ─── LIST SOURCE DOMAINS / PAGES optional fields ────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['listSourceDomains'],
			},
		},
		options: [
			{
				displayName: 'Competitor IDs',
				name: 'competitorIds',
				type: 'string',
				default: '',
				placeholder: '101,102',
				description: 'Comma-separated competitor IDs to filter by',
			},
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2026-04-01',
				description: 'Start date (YYYY-MM-DD). Defaults to the last 30 days. Citations can be weeks old — use a wide window (90+ days) if results look empty.',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2026-04-30',
				description: 'End date (YYYY-MM-DD). Cannot exceed the current date.',
			},
			{
				displayName: 'Group IDs',
				name: 'groupIds',
				type: 'string',
				default: '',
				placeholder: '12,18',
				description: 'Comma-separated prompt group IDs to filter by',
			},
			{
				displayName: 'Has Link',
				name: 'hasLink',
				type: 'options',
				options: [
					{ name: 'Any', value: '' },
					{ name: 'With Link', value: '1' },
					{ name: 'Without Link', value: '0' },
				],
				default: '',
				description: 'Filter by whether the source links to your site',
			},
			{
				displayName: 'Is Brand Mentioned',
				name: 'isBrandMentioned',
				type: 'options',
				options: [
					{ name: 'Any', value: '' },
					{ name: 'Mentioned', value: '1' },
					{ name: 'Not Mentioned', value: '0' },
				],
				default: '',
				description: 'Filter by whether your brand is mentioned on the source',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of items per page (1–100)',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Offset from the beginning of the list',
			},
			{
				displayName: 'Prompt IDs',
				name: 'promptIds',
				type: 'string',
				default: '',
				placeholder: '2519863,2456998',
				description: 'Comma-separated prompt IDs to filter by',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Substring match on the source domain',
			},
			{
				displayName: 'Site LLM Engine IDs',
				name: 'siteLlmIds',
				type: 'string',
				default: '',
				placeholder: '221275,224302',
				description: 'Comma-separated LLM engine IDs to filter by. Defaults to all engines of the site.',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'AI Answers Total', value: 'ai_answers_total' },
					{ name: 'Backlinks Total', value: 'backlinks_total' },
					{ name: 'Brand Mentions Total', value: 'brand_mentions_total' },
					{ name: 'Coverage Percent', value: 'coverage_percent' },
					{ name: 'Date', value: 'dt' },
					{ name: 'Domain', value: 'domain' },
					{ name: 'Mention Rate Percent', value: 'mention_rate_percent' },
					{ name: 'Pages Total', value: 'pages_total' },
					{ name: 'Prompts', value: 'prompts' },
					{ name: 'Prompts Total', value: 'prompts_total' },
					{ name: 'Referring Domains Total', value: 'referring_domains_total' },
				],
				default: 'ai_answers_total',
				description: 'Field to sort by',
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				description: 'Sort direction. Defaults to descending.',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['listSourcePages'],
			},
		},
		options: [
			{
				displayName: 'Competitor IDs',
				name: 'competitorIds',
				type: 'string',
				default: '',
				placeholder: '101,102',
				description: 'Comma-separated competitor IDs to filter by',
			},
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2026-04-01',
				description: 'Start date (YYYY-MM-DD). Defaults to the last 30 days. Citations can be weeks old — use a wide window (90+ days) if results look empty.',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2026-04-30',
				description: 'End date (YYYY-MM-DD). Cannot exceed the current date.',
			},
			{
				displayName: 'Domain ID',
				name: 'domainId',
				type: 'number',
				default: 0,
				description: 'Restrict to a single domain\'s pages (domain_id from List Source Domains)',
			},
			{
				displayName: 'Group IDs',
				name: 'groupIds',
				type: 'string',
				default: '',
				placeholder: '12,18',
				description: 'Comma-separated prompt group IDs to filter by',
			},
			{
				displayName: 'Has Link',
				name: 'hasLink',
				type: 'options',
				options: [
					{ name: 'Any', value: '' },
					{ name: 'With Link', value: '1' },
					{ name: 'Without Link', value: '0' },
				],
				default: '',
				description: 'Filter by whether the source page links to your site',
			},
			{
				displayName: 'Is Brand Mentioned',
				name: 'isBrandMentioned',
				type: 'options',
				options: [
					{ name: 'Any', value: '' },
					{ name: 'Mentioned', value: '1' },
					{ name: 'Not Mentioned', value: '0' },
				],
				default: '',
				description: 'Filter by whether your brand is mentioned on the source page',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of items per page (1–100)',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Offset from the beginning of the list',
			},
			{
				displayName: 'Prompt IDs',
				name: 'promptIds',
				type: 'string',
				default: '',
				placeholder: '2519863,2456998',
				description: 'Comma-separated prompt IDs to filter by',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Substring match on the source URL',
			},
			{
				displayName: 'Site LLM Engine IDs',
				name: 'siteLlmIds',
				type: 'string',
				default: '',
				placeholder: '221275,224302',
				description: 'Comma-separated LLM engine IDs to filter by. Defaults to all engines of the site.',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Answers Coverage', value: 'answers_coverage' },
					{ name: 'Brands Number', value: 'brands_num' },
					{ name: 'Competitors Number', value: 'competitors_num' },
					{ name: 'Date', value: 'dt' },
					{ name: 'Has Link', value: 'link' },
					{ name: 'Mention', value: 'mention' },
					{ name: 'Prompt Coverage', value: 'prompt_coverage' },
					{ name: 'Prompts', value: 'prompts' },
					{ name: 'URL', value: 'url' },
					{ name: 'Usage Count', value: 'count_usage' },
				],
				default: 'count_usage',
				description: 'Field to sort by',
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				description: 'Sort direction. Defaults to descending.',
			},
		],
	},

	// ─── COMPETITORS BREAKDOWN fields ───────────────────────────────────────
	{
		displayName: 'Prompt-LLM Link IDs',
		name: 'promptLlmIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getCompetitorsBreakdown'],
			},
		},
		default: '',
		placeholder: '2519863,2456998',
		description: 'Comma-separated prompt_llm_id values from List Prompts (1–50 IDs). Note: prompts × days in range must not exceed 3660.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getCompetitorsBreakdown'],
			},
		},
		options: [
			{
				displayName: 'Compact',
				name: 'compact',
				type: 'boolean',
				default: false,
				description: 'Whether to collapse consecutive days with identical results into date ranges',
			},
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2026-04-01',
				description: 'Start date (YYYY-MM-DD). Defaults to the last 7 days. Range cannot exceed 366 days.',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2026-04-30',
				description: 'End date (YYYY-MM-DD). Cannot exceed the current date.',
			},
			{
				displayName: 'Include Cached Copy URL',
				name: 'includeCachedCopyUrl',
				type: 'boolean',
				default: true,
				description: 'Whether to include cached_copy_url in results. Informational only — the URL points to the legacy api4 host.',
			},
		],
	},

	// ─── COMPETITORS CHECK DATES / SOURCE METRICS fields ────────────────────
	{
		displayName: 'Prompt-LLM Link ID',
		name: 'promptLlmId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getCompetitorsCheckDates', 'getCompetitorsSourceMetrics'],
			},
		},
		default: 0,
		description: 'Single prompt_llm_id value from List Prompts',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getCompetitorsCheckDates'],
			},
		},
		options: [
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2026-04-01',
				description: 'Start date (YYYY-MM-DD). Defaults to the last 30 days. Range cannot exceed 366 days.',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2026-04-30',
				description: 'End date (YYYY-MM-DD). Cannot exceed the current date.',
			},
		],
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getCompetitorsSourceMetrics'],
			},
		},
		default: '',
		placeholder: '2026-04-15',
		description: 'Date to get source metrics for (YYYY-MM-DD). Use Get Competitors Check Dates to find dates with data. An empty items array means no sources were cited that date.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiResultTracker'],
				operation: ['getCompetitorsSourceMetrics'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'Domain (Default)', value: '' },
					{ name: 'URL', value: 'url' },
				],
				default: '',
				description: 'Aggregate metrics per domain (default) or per individual URL',
			},
		],
	},
];
