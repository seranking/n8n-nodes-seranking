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
	// Source field (for all operations)
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
	// Keywords field (for exportMetrics)
	{
		displayName: 'Keywords',
		name: 'keywords',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
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
	// Keyword field (for single keyword operations)
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
	// Additional Fields for exportMetrics
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
				description: 'Order of sorting',
			},
		],
	},
	// Additional Fields for keyword suggestion operations
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['keywordResearch'],
				operation: ['getSimilar', 'getRelated', 'getQuestions'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of keywords to return',
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
				description: 'Order of sorting',
			},
			{
				displayName: 'Include History Trend',
				name: 'historyTrend',
				type: 'boolean',
				default: false,
				description: 'Whether to include 12 months of historical search volume data',
			},
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
			{
				displayName: 'Difficulty From',
				name: 'difficultyFrom',
				type: 'number',
				default: 0,
				description: 'Minimum keyword difficulty score (0-100)',
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
			},
			{
				displayName: 'Difficulty To',
				name: 'difficultyTo',
				type: 'number',
				default: 100,
				description: 'Maximum keyword difficulty score (0-100)',
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
			},
			{
				displayName: 'CPC From',
				name: 'cpcFrom',
				type: 'number',
				default: 0,
				description: 'Minimum cost per click filter',
			},
			{
				displayName: 'CPC To',
				name: 'cpcTo',
				type: 'number',
				default: 0,
				description: 'Maximum cost per click filter (0 = no limit)',
			},
			{
				displayName: 'Competition From',
				name: 'competitionFrom',
				type: 'number',
				default: 0,
				description: 'Minimum competition score (0.0-1.0)',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					numberPrecision: 2,
				},
			},
			{
				displayName: 'Competition To',
				name: 'competitionTo',
				type: 'number',
				default: 1,
				description: 'Maximum competition score (0.0-1.0)',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					numberPrecision: 2,
				},
			},
		],
	},
	// Additional Fields for getLongtail
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
];