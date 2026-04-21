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
];
