import { INodeProperties } from 'n8n-workflow';

export const keywordResearchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['keywordResearch'],
			},
		},
		options: [
			{
				name: 'Export Metrics',
				value: 'exportMetrics',
				description: 'Get volume, CPC, competition, and difficulty for multiple keywords',
				action: 'Export keyword metrics',
			},
			{
				name: 'Get Similar Keywords',
				value: 'getSimilar',
				description: 'Find semantically similar keywords',
				action: 'Get similar keywords',
			},
			{
				name: 'Get Related Keywords',
				value: 'getRelated',
				description: 'Find topically related keywords with overlapping URLs',
				action: 'Get related keywords',
			},
			{
				name: 'Get Question Keywords',
				value: 'getQuestions',
				description: 'Find question-based keywords',
				action: 'Get question keywords',
			},
			{
				name: 'Get Longtail Keywords',
				value: 'getLongtail',
				description: 'Find long-tail keyword variations',
				action: 'Get longtail keywords',
			},
		],
		default: 'exportMetrics',
	},
];

export const keywordResearchFields: INodeProperties[] = [
	// ─── Source field (shared by all operations) ───────────────────────────────
	{
		displayName: 'Source',
		name: 'source',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keywordResearch'],
			},
		},
		default: 'us',
		placeholder: 'us',
		description: 'Alpha-2 country code for regional database (e.g., us, uk, de, fr, es, it, ca, au, pl)',
	},

	// ─── Keywords field (exportMetrics) ───────────────────────────────────────
	{
		displayName: 'Keywords',
		name: 'keywords',
		type: 'string',
		typeOptions: { rows: 5 },
		required: true,
		displayOptions: {
			show: {
				resource: ['keywordResearch'],
				operation: ['exportMetrics'],
			},
		},
		default: '',
		placeholder: 'seo tools\nkeyword research\nbacklink checker',
		description: 'List of keywords to analyze (one per line or comma-separated)',
	},

	// ─── Seed keyword (getSimilar, getRelated, getQuestions, getLongtail) ──────
	{
		displayName: 'Keyword',
		name: 'keyword',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keywordResearch'],
				operation: ['getSimilar', 'getRelated', 'getQuestions', 'getLongtail'],
			},
		},
		default: '',
		placeholder: 'seo tools',
		description: 'Seed keyword to find suggestions for',
	},

	// ─── Additional Fields: exportMetrics ─────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['keywordResearch'],
				operation: ['exportMetrics'],
			},
		},
		options: [
			{
				displayName: 'Columns',
				name: 'cols',
				type: 'multiOptions',
				options: [
					{ name: 'Keyword', value: 'keyword' },
					{ name: 'Volume', value: 'volume' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'Competition', value: 'competition' },
					{ name: 'Difficulty', value: 'difficulty' },
					{ name: 'History Trend', value: 'history_trend' },
				],
				default: ['keyword', 'volume', 'cpc', 'competition', 'difficulty'],
				description: 'Data columns to return for each keyword',
			},
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Keyword', value: 'keyword' },
					{ name: 'Volume', value: 'volume' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'Competition', value: 'competition' },
					{ name: 'Difficulty', value: 'difficulty' },
				],
				default: 'volume',
				description: 'Field to sort results by',
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
				description: 'Sort order direction',
			},
		],
	},

	// ─── Additional Fields: getSimilar & getRelated (EXPANDED) ────────────────
	// Both endpoints share identical filter surface area per the API docs.
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['keywordResearch'],
				operation: ['getSimilar', 'getRelated'],
			},
		},
		options: [
			// ── Pagination ────────────────────────────────────────────────────
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of keywords to return',
				typeOptions: { minValue: 1, maxValue: 1000 },
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip for pagination',
				typeOptions: { minValue: 0 },
			},
			// ── Sorting ───────────────────────────────────────────────────────
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Keyword', value: 'keyword' },
					{ name: 'Volume', value: 'volume' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'Competition', value: 'competition' },
					{ name: 'Difficulty', value: 'difficulty' },
				],
				default: 'volume',
				description: 'Field to sort results by',
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
				description: 'Sort order direction',
			},
			// ── History ───────────────────────────────────────────────────────
			{
				displayName: 'Include History Trend',
				name: 'historyTrend',
				type: 'boolean',
				default: false,
				description: 'Whether to include 12 months of historical search volume data',
			},
			// ── Volume ────────────────────────────────────────────────────────
			{
				displayName: 'Volume From',
				name: 'volumeFrom',
				type: 'number',
				default: 0,
				description: 'Minimum monthly search volume filter',
			},
			{
				displayName: 'Volume To',
				name: 'volumeTo',
				type: 'number',
				default: 0,
				description: 'Maximum monthly search volume filter (0 = no limit)',
			},
			// ── Difficulty ────────────────────────────────────────────────────
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
			// ── CPC ───────────────────────────────────────────────────────────
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
			// ── Competition ───────────────────────────────────────────────────
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
			// ── Keyword word count ────────────────────────────────────────────
			{
				displayName: 'Keyword Word Count From',
				name: 'keywordCountFrom',
				type: 'number',
				default: 0,
				description: 'Minimum number of words in the keyword',
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Keyword Word Count To',
				name: 'keywordCountTo',
				type: 'number',
				default: 0,
				description: 'Maximum number of words in the keyword (0 = no limit)',
			},
			// ── Character count ───────────────────────────────────────────────
			{
				displayName: 'Characters Count From',
				name: 'charactersCountFrom',
				type: 'number',
				default: 0,
				description: 'Minimum character length of the keyword',
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Characters Count To',
				name: 'charactersCountTo',
				type: 'number',
				default: 0,
				description: 'Maximum character length of the keyword (0 = no limit)',
			},
			// ── SERP features ─────────────────────────────────────────────────
			{
				displayName: 'SERP Features',
				name: 'serpFeatures',
				type: 'string',
				default: '',
				placeholder: 'sge,images,top_stories',
				description:
					'Comma-separated list of SERP feature codes to filter by (e.g., sge, images, top_stories). See SE Ranking docs for all accepted values.',
			},
			// ── Search intents ────────────────────────────────────────────────
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
			// ── Keyword include/exclude patterns ──────────────────────────────
			{
				displayName: 'Include Keywords Containing',
				name: 'multiKeywordIncluded',
				type: 'string',
				default: '',
				placeholder: 'best, top, review',
				description:
					'Comma-separated list of words that must appear in returned keywords (each word treated as a "contains" match)',
			},
			{
				displayName: 'Exclude Keywords Containing',
				name: 'multiKeywordExcluded',
				type: 'string',
				default: '',
				placeholder: 'free, cheap',
				description:
					'Comma-separated list of words that must NOT appear in returned keywords (each word treated as a "contains" match)',
			},
		],
	},

	// ─── Additional Fields: getQuestions (EXPANDED) ───────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['keywordResearch'],
				operation: ['getQuestions'],
			},
		},
		options: [
			// ── Pagination ────────────────────────────────────────────────────
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of keywords to return',
				typeOptions: { minValue: 1, maxValue: 1000 },
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip for pagination',
				typeOptions: { minValue: 0 },
			},
			// ── Sorting ───────────────────────────────────────────────────────
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Keyword', value: 'keyword' },
					{ name: 'Volume', value: 'volume' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'Competition', value: 'competition' },
					{ name: 'Difficulty', value: 'difficulty' },
				],
				default: 'volume',
				description: 'Field to sort results by',
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
				description: 'Sort order direction',
			},
			// ── History ───────────────────────────────────────────────────────
			{
				displayName: 'Include History Trend',
				name: 'historyTrend',
				type: 'boolean',
				default: false,
				description: 'Whether to include 12 months of historical search volume data',
			},
			// ── Volume ────────────────────────────────────────────────────────
			{
				displayName: 'Volume From',
				name: 'volumeFrom',
				type: 'number',
				default: 0,
				description: 'Minimum monthly search volume filter',
			},
			{
				displayName: 'Volume To',
				name: 'volumeTo',
				type: 'number',
				default: 0,
				description: 'Maximum monthly search volume filter (0 = no limit)',
			},
			// ── Difficulty ────────────────────────────────────────────────────
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
			// ── CPC ───────────────────────────────────────────────────────────
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
			// ── Competition ───────────────────────────────────────────────────
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
			// ── Keyword word count ────────────────────────────────────────────
			{
				displayName: 'Keyword Word Count From',
				name: 'keywordCountFrom',
				type: 'number',
				default: 0,
				description: 'Minimum number of words in the keyword',
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Keyword Word Count To',
				name: 'keywordCountTo',
				type: 'number',
				default: 0,
				description: 'Maximum number of words in the keyword (0 = no limit)',
			},
			// ── Character count ───────────────────────────────────────────────
			{
				displayName: 'Characters Count From',
				name: 'charactersCountFrom',
				type: 'number',
				default: 0,
				description: 'Minimum character length of the keyword',
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Characters Count To',
				name: 'charactersCountTo',
				type: 'number',
				default: 0,
				description: 'Maximum character length of the keyword (0 = no limit)',
			},
			// ── SERP features ─────────────────────────────────────────────────
			{
				displayName: 'SERP Features',
				name: 'serpFeatures',
				type: 'string',
				default: '',
				placeholder: 'sge,images,top_stories',
				description:
					'Comma-separated list of SERP feature codes to filter by (e.g., sge, images, top_stories). See SE Ranking docs for all accepted values.',
			},
			// ── Search intents ────────────────────────────────────────────────
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
			// ── Keyword include/exclude patterns ──────────────────────────────
			{
				displayName: 'Include Keywords Containing',
				name: 'multiKeywordIncluded',
				type: 'string',
				default: '',
				placeholder: 'how, what, why',
				description:
					'Comma-separated list of words that must appear in returned keywords (each word treated as a "contains" match)',
			},
			{
				displayName: 'Exclude Keywords Containing',
				name: 'multiKeywordExcluded',
				type: 'string',
				default: '',
				placeholder: 'free, cheap',
				description:
					'Comma-separated list of words that must NOT appear in returned keywords (each word treated as a "contains" match)',
			},
		],
	},

	// ─── Additional Fields: getLongtail ───────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['keywordResearch'],
				operation: ['getLongtail'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of keywords to return',
				typeOptions: { minValue: 1, maxValue: 1000 },
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip for pagination',
				typeOptions: { minValue: 0 },
			},
		],
	},
];