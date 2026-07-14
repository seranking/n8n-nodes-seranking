import { INodeProperties } from 'n8n-workflow';

// SE Visible API — /v1/se-visible/... on the unified host, same seRankingApi credential.
// ⚠️ API access is a separate backend entitlement: a key valid for Data + Project API
// still gets 401 {"message":"Unauthenticated."} until SE Ranking enables SE Visible
// for the account. Rate limit is 1 request/second (handled in apiRequest).

const MODEL_TYPE_OPTIONS = [
	{ name: 'ChatGPT', value: 'chatgpt' },
	{ name: 'Google AI Mode', value: 'google_ai_mode' },
	{ name: 'Google AI Overview', value: 'google_ai_overview' },
	{ name: 'Google Gemini', value: 'google_gemini' },
	{ name: 'Perplexity', value: 'perplexity' },
];

const SENTIMENT_OPTIONS = [
	{ name: 'Negative', value: 'negative' },
	{ name: 'Neutral', value: 'neutral' },
	{ name: 'Positive', value: 'positive' },
];

export const seVisibleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
			},
		},
		options: [
			{
				name: 'Add Aliases to Brand',
				value: 'addBrandAliases',
				description: 'Add alternative names to a tracked brand',
				action: 'Add aliases to brand',
			},
			{
				name: 'Create Competitor Brand',
				value: 'createBrand',
				description: 'Add a competitor brand to track in the project',
				action: 'Create competitor brand',
			},
			{
				name: 'Create Project',
				value: 'createProject',
				description: 'Create an SE Visible project (async — poll Get Project Details for processing status)',
				action: 'Create project',
			},
			{
				name: 'Create Prompts',
				value: 'createPrompts',
				description: 'Add prompts to a topic (they start processing against the project\'s models)',
				action: 'Create prompts',
			},
			{
				name: 'Create Topics',
				value: 'createTopics',
				description: 'Add topics to a project',
				action: 'Create topics',
			},
			{
				name: 'Delete Brand',
				value: 'deleteBrand',
				description: 'Remove a tracked competitor brand (the primary brand cannot be deleted)',
				action: 'Delete brand',
			},
			{
				name: 'Delete Project',
				value: 'deleteProject',
				description: 'Soft-delete a project (restorable)',
				action: 'Delete project',
			},
			{
				name: 'Delete Prompts',
				value: 'deletePrompts',
				description: 'Bulk-delete prompts from a project',
				action: 'Delete prompts',
			},
			{
				name: 'Delete Topic',
				value: 'deleteTopic',
				description: 'Delete a topic AND all prompts grouped under it',
				action: 'Delete topic',
			},
			{
				name: 'Download Raw Response',
				value: 'downloadRawResponse',
				description: 'Download the raw LLM response dump (HTML) for a prompt result',
				action: 'Download raw response',
			},
			{
				name: 'Get Aggregated Brand Metrics',
				value: 'getBrandMetrics',
				description: 'Get brand visibility metrics grouped by dimensions (table data)',
				action: 'Get aggregated brand metrics',
			},
			{
				name: 'Get Project Details',
				value: 'getProjectDetails',
				description: 'Get project metadata, processing status, topics, and check dates',
				action: 'Get project details',
			},
			{
				name: 'Get Project Sources',
				value: 'getProjectSources',
				description: 'Get the domains or URLs AI models cited across the project',
				action: 'Get project sources',
			},
			{
				name: 'Get Prompt Details',
				value: 'getPromptDetails',
				description: 'Get a single prompt\'s text, topic, and parse status',
				action: 'Get prompt details',
			},
			{
				name: 'Get Prompt Result Details',
				value: 'getPromptResultDetails',
				description: 'Get one result\'s full text, source URLs, and mentioned brands',
				action: 'Get prompt result details',
			},
			{
				name: 'Get Prompt Results',
				value: 'getPromptResults',
				description: 'List results for a prompt — one per model run',
				action: 'Get prompt results',
			},
			{
				name: 'Get Subscription',
				value: 'getSubscription',
				description: 'Get SE Visible plan and usage limits (projects, prompts, seats)',
				action: 'Get subscription',
			},
			{
				name: 'List Mentioned Brands',
				value: 'listMentionedBrands',
				description: 'List brands detected in AI answers (competitor discovery)',
				action: 'List mentioned brands',
			},
			{
				name: 'List Projects',
				value: 'listProjects',
				description: 'List all SE Visible projects in the account',
				action: 'List projects',
			},
			{
				name: 'List Prompts',
				value: 'listPrompts',
				description: 'List prompts (or topics with aggregated metrics) with visibility data',
				action: 'List prompts',
			},
			{
				name: 'List Tracked Brands',
				value: 'listTrackedBrands',
				description: 'List brands tracked in the project (primary brand first)',
				action: 'List tracked brands',
			},
			{
				name: 'Move Prompts',
				value: 'movePrompts',
				description: 'Move prompts to another topic (atomic, same project only)',
				action: 'Move prompts',
			},
			{
				name: 'Update Brand',
				value: 'updateBrand',
				description: 'Update a tracked brand\'s domain and/or aliases',
				action: 'Update brand',
			},
			{
				name: 'Update Topic Title',
				value: 'updateTopic',
				description: 'Rename a topic (the default topic cannot be updated)',
				action: 'Update topic title',
			},
		],
		default: 'listProjects',
	},
];

export const seVisibleFields: INodeProperties[] = [
	// ─── Project ID (shared by all project-scoped operations) ────────────────
	{
		displayName: 'Project Name or ID',
		name: 'sevProjectId',
		type: 'options',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getSevProjects',
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: [
					'addBrandAliases',
					'createBrand',
					'createPrompts',
					'createTopics',
					'deleteBrand',
					'deleteProject',
					'deletePrompts',
					'deleteTopic',
					'downloadRawResponse',
					'getBrandMetrics',
					'getProjectDetails',
					'getProjectSources',
					'getPromptDetails',
					'getPromptResultDetails',
					'getPromptResults',
					'listMentionedBrands',
					'listPrompts',
					'listTrackedBrands',
					'movePrompts',
					'updateBrand',
					'updateTopic',
				],
			},
		},
		default: '',
		description: 'SE Visible project. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ─── Brand ID (shared) ───────────────────────────────────────────────────
	{
		displayName: 'Brand Name or ID',
		name: 'sevBrandId',
		type: 'options',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getSevBrands',
			loadOptionsDependsOn: ['sevProjectId'],
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['addBrandAliases', 'deleteBrand', 'updateBrand'],
			},
		},
		default: '',
		description: 'Tracked brand. Set the Project first; the dropdown populates from its brands. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ─── Topic ID (shared) ───────────────────────────────────────────────────
	{
		displayName: 'Topic Name or ID',
		name: 'sevTopicId',
		type: 'options',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getSevTopics',
			loadOptionsDependsOn: ['sevProjectId'],
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createPrompts', 'deleteTopic', 'updateTopic'],
			},
		},
		default: '',
		description: 'Topic within the project. Set the Project first; the dropdown populates from its topics. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Target Topic Name or ID',
		name: 'sevTargetTopicId',
		type: 'options',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getSevTopics',
			loadOptionsDependsOn: ['sevProjectId'],
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['movePrompts'],
			},
		},
		default: '',
		description: 'Topic to move the prompts into (must belong to the same project). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ─── Prompt / Result IDs (shared) ────────────────────────────────────────
	{
		displayName: 'Prompt ID',
		name: 'sevPromptId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['downloadRawResponse', 'getPromptDetails', 'getPromptResultDetails', 'getPromptResults'],
			},
		},
		default: 0,
		description: 'Prompt ID (from List Prompts)',
	},
	{
		displayName: 'Result ID',
		name: 'sevResultId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['downloadRawResponse', 'getPromptResultDetails'],
			},
		},
		default: 0,
		description: 'Result ID (from Get Prompt Results)',
	},

	// ─── Required date range (metrics / prompts / results / sources) ────────
	{
		displayName: 'Date From',
		name: 'dateFrom',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['getBrandMetrics', 'getProjectSources', 'getPromptResults', 'listPrompts'],
			},
		},
		default: '',
		description: 'Base period start. Serialized as YYYY-MM-DD.',
	},
	{
		displayName: 'Date To',
		name: 'dateTo',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['getBrandMetrics', 'getProjectSources', 'getPromptResults', 'listPrompts'],
			},
		},
		default: '',
		description: 'Base period end. Serialized as YYYY-MM-DD.',
	},

	// ─── CREATE PROJECT fields ───────────────────────────────────────────────
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createProject'],
			},
		},
		default: '',
		placeholder: 'example.com',
		description: 'Domain the project tracks',
	},
	{
		displayName: 'Country Code',
		name: 'countryCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createProject'],
			},
		},
		default: '',
		placeholder: 'us',
		description: 'ISO 3166-1 alpha-2 country code (must be from the SE Visible reference list)',
	},
	{
		displayName: 'Language Code',
		name: 'langCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createProject'],
			},
		},
		default: '',
		placeholder: 'en',
		description: 'ISO 639-1 language code (must be from the SE Visible reference list)',
	},
	{
		displayName: 'Brand Names',
		name: 'brandNames',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createProject'],
			},
		},
		default: '',
		placeholder: 'SE Ranking',
		description: 'Brand names to track — one per line, at least one. The response returns only the new project ID; processing is asynchronous (poll Get Project Details).',
	},
	{
		displayName: 'Topics',
		name: 'topics',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createProject'],
			},
		},
		default: '',
		placeholder: 'rank tracking',
		description: 'Topics to create — one per line, at least one',
	},

	// ─── CREATE COMPETITOR BRAND fields ──────────────────────────────────────
	{
		displayName: 'Title',
		name: 'brandTitle',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createBrand'],
			},
		},
		default: '',
		description: 'Brand name (unique within the project, max 500 characters)',
	},
	{
		displayName: 'Brand Domain',
		name: 'brandDomain',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createBrand'],
			},
		},
		default: '',
		placeholder: 'competitor.com',
		description: 'Domain of the competitor brand',
	},
	{
		displayName: 'Aliases',
		name: 'brandAliases',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createBrand'],
			},
		},
		default: '',
		description: 'Alternative brand names — one per line, each max 500 characters (optional)',
	},

	// ─── ADD ALIASES fields ──────────────────────────────────────────────────
	{
		displayName: 'Aliases',
		name: 'aliases',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['addBrandAliases'],
			},
		},
		default: '',
		description: 'Aliases to add — one per line, at least one, each max 500 characters, unique within the brand',
	},

	// ─── UPDATE BRAND fields ─────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['updateBrand'],
			},
		},
		options: [
			{
				displayName: 'Aliases',
				name: 'aliases',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'One per line. REPLACES all existing aliases; leave the value empty to clear them.',
			},
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				placeholder: 'competitor.com',
				description: 'New domain for the brand',
			},
		],
	},

	// ─── CREATE / UPDATE TOPICS fields ───────────────────────────────────────
	{
		displayName: 'Titles',
		name: 'topicTitles',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createTopics'],
			},
		},
		default: '',
		description: 'Topic titles to create — one per line, at least one non-empty',
	},
	{
		displayName: 'Title',
		name: 'topicTitle',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['updateTopic'],
			},
		},
		default: '',
		description: 'New topic title (max 500 characters). The default topic cannot be updated.',
	},

	// ─── CREATE PROMPTS fields ───────────────────────────────────────────────
	{
		displayName: 'Prompts',
		name: 'prompts',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['createPrompts'],
			},
		},
		default: '',
		placeholder: 'best seo tool for agencies',
		description: 'Prompts to add — one per line. New prompts need processing time before results populate.',
	},

	// ─── DELETE PROMPTS fields ───────────────────────────────────────────────
	{
		displayName: 'Prompt IDs',
		name: 'promptIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['deletePrompts'],
			},
		},
		default: '',
		placeholder: '101,102,103',
		description: 'Comma-separated prompt IDs to delete (bulk)',
	},

	// ─── MOVE PROMPTS fields ─────────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['movePrompts'],
			},
		},
		options: [
			{
				displayName: 'Prompt IDs',
				name: 'promptIds',
				type: 'string',
				default: '',
				placeholder: '101,102',
				description: 'Comma-separated prompt IDs to move. At least one of Prompt IDs / Source Topic IDs is required; the result is deduplicated.',
			},
			{
				displayName: 'Source Topic IDs',
				name: 'topicIds',
				type: 'string',
				default: '',
				placeholder: '11,12',
				description: 'Comma-separated topic IDs whose prompts all move. At least one of Prompt IDs / Source Topic IDs is required.',
			},
		],
	},

	// ─── GET AGGREGATED BRAND METRICS fields ─────────────────────────────────
	{
		displayName: 'Dimensions',
		name: 'dimensions',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['getBrandMetrics'],
			},
		},
		options: [
			{ name: 'Brand', value: 'brand_id' },
			{ name: 'Prompt', value: 'prompt_id' },
			{ name: 'Topic', value: 'topic_id' },
		],
		default: [],
		description: 'Row grouping, 1–3 without duplicates. The LAST dimension is the pivot; with 2+ dimensions rows gain {pivotId}_{metric} keys.',
	},
	{
		displayName: 'Metrics',
		name: 'metrics',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['getBrandMetrics'],
			},
		},
		options: [
			{ name: 'Average Position', value: 'avg_position' },
			{ name: 'Negative %', value: 'negative_pct' },
			{ name: 'Neutral %', value: 'neutral_pct' },
			{ name: 'Positive %', value: 'positive_pct' },
			{ name: 'Rank', value: 'rank' },
			{ name: 'Sentiment Score', value: 'sentiment_score' },
			{ name: 'Share of Voice', value: 'share_of_voice' },
			{ name: 'Total All Mentions', value: 'total_all_mentions' },
			{ name: 'Total Mentions', value: 'total_mentions' },
			{ name: 'Total Response Count', value: 'total_response_count' },
			{ name: 'Unique Brands Count', value: 'unique_brands_count' },
			{ name: 'Visibility Score', value: 'visibility_score' },
		],
		default: [],
		description: 'Metric columns, 1–5',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['getBrandMetrics'],
			},
		},
		options: [
			{
				displayName: 'Compare Date From',
				name: 'compareFrom',
				type: 'dateTime',
				default: '',
				description: 'Compare period start (enables compare mode; set Compare Date To as well)',
			},
			{
				displayName: 'Compare Date To',
				name: 'compareTo',
				type: 'dateTime',
				default: '',
				description: 'Compare period end',
			},
			{
				displayName: 'Country Codes',
				name: 'countryCodes',
				type: 'string',
				default: '',
				placeholder: 'us,de',
				description: 'Comma-separated ISO 3166-1 alpha-2 country codes to filter by',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Number of rows per page (default 50)',
			},
			{
				displayName: 'Model Types',
				name: 'modelTypes',
				type: 'multiOptions',
				options: MODEL_TYPE_OPTIONS,
				default: [],
				description: 'AI models to filter by',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Rows to skip',
			},
			{
				displayName: 'Sentiments',
				name: 'sentiments',
				type: 'multiOptions',
				options: SENTIMENT_OPTIONS,
				default: [],
				description: 'Sentiments to filter by',
			},
			{
				displayName: 'Sort Field',
				name: 'sortField',
				type: 'string',
				default: '',
				placeholder: 'visibility_score',
				description: 'Metric name, or a pivot expression like metric[dimension=value]',
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
				description: 'Sort direction',
			},
			{
				displayName: 'Topic IDs',
				name: 'topicIds',
				type: 'string',
				default: '',
				placeholder: '11,12',
				description: 'Comma-separated topic IDs to filter by',
			},
			{
				displayName: 'Tracked Brand IDs',
				name: 'trackedBrandIds',
				type: 'string',
				default: '',
				placeholder: '5,6',
				description: 'Comma-separated tracked brand IDs to filter by',
			},
		],
	},

	// ─── LIST PROMPTS fields ─────────────────────────────────────────────────
	{
		displayName: 'Group Mode',
		name: 'groupMode',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['listPrompts'],
			},
		},
		options: [
			{ name: 'Prompt', value: 'prompt' },
			{ name: 'Topic', value: 'topic' },
		],
		default: 'prompt',
		description: 'Return individual prompts, or topics with aggregated metrics (different response shapes)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['listPrompts'],
			},
		},
		options: [
			{
				displayName: 'Country Codes',
				name: 'countryCodes',
				type: 'string',
				default: '',
				placeholder: 'us,de',
				description: 'Comma-separated ISO 3166-1 alpha-2 country codes to filter by',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 1000,
				description: 'Number of rows per page (default 1000)',
			},
			{
				displayName: 'Model Types',
				name: 'modelTypes',
				type: 'multiOptions',
				options: MODEL_TYPE_OPTIONS,
				default: [],
				description: 'AI models to filter by',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Rows to skip',
			},
			{
				displayName: 'Search Query',
				name: 'searchQuery',
				type: 'string',
				default: '',
				description: 'Substring filter on prompt text',
			},
			{
				displayName: 'Sentiments',
				name: 'sentiments',
				type: 'multiOptions',
				options: SENTIMENT_OPTIONS,
				default: [],
				description: 'Sentiments to filter by',
			},
			{
				displayName: 'Sort Field',
				name: 'sortField',
				type: 'options',
				options: [
					{ name: 'Average Position', value: 'avg_position' },
					{ name: 'Mentions', value: 'mentions' },
					{ name: 'Sentiments', value: 'sentiments' },
					{ name: 'Visibility', value: 'visibility' },
				],
				default: 'visibility',
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
				description: 'Sort direction',
			},
			{
				displayName: 'Topic IDs',
				name: 'topicIds',
				type: 'string',
				default: '',
				placeholder: '11,12',
				description: 'Comma-separated topic IDs to filter by',
			},
			{
				displayName: 'Tracked Brand IDs',
				name: 'trackedBrandIds',
				type: 'string',
				default: '',
				placeholder: '5,6',
				description: 'Comma-separated tracked brand IDs to filter by',
			},
		],
	},

	// ─── GET PROMPT RESULTS fields ───────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['getPromptResults'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 1000,
				description: 'Number of rows per page (default 1000)',
			},
			{
				displayName: 'Model Types',
				name: 'modelTypes',
				type: 'multiOptions',
				options: MODEL_TYPE_OPTIONS,
				default: [],
				description: 'AI models to filter by',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Rows to skip',
			},
			{
				displayName: 'Sentiments',
				name: 'sentiments',
				type: 'multiOptions',
				options: SENTIMENT_OPTIONS,
				default: [],
				description: 'Sentiments to filter by',
			},
			{
				displayName: 'Topic IDs',
				name: 'topicIds',
				type: 'string',
				default: '',
				placeholder: '11,12',
				description: 'Comma-separated topic IDs to filter by',
			},
			{
				displayName: 'Tracked Brand IDs',
				name: 'trackedBrandIds',
				type: 'string',
				default: '',
				placeholder: '5,6',
				description: 'Comma-separated tracked brand IDs to filter by',
			},
		],
	},

	// ─── GET PROJECT SOURCES fields ──────────────────────────────────────────
	{
		displayName: 'Source Type',
		name: 'sourceType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['getProjectSources'],
			},
		},
		options: [
			{ name: 'Domain', value: 'domain' },
			{ name: 'URL', value: 'url' },
		],
		default: 'domain',
		description: 'One row per cited domain, or one per cited page. Also gates which Sort Field values are valid.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['seVisible'],
				operation: ['getProjectSources'],
			},
		},
		options: [
			{
				displayName: 'Brand IDs',
				name: 'brandIds',
				type: 'string',
				default: '',
				placeholder: '5,6',
				description: 'Comma-separated brand IDs (used with Brand Match Mode)',
			},
			{
				displayName: 'Brand Match Mode',
				name: 'brandMatchMode',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Any', value: 'any' },
				],
				default: 'any',
				description: 'Whether a source must cite all of the Brand IDs or any of them',
			},
			{
				displayName: 'Competitors Count From',
				name: 'competitorsCountFrom',
				type: 'number',
				default: 0,
				description: 'Minimum competitor brands on the source',
			},
			{
				displayName: 'Competitors Count To',
				name: 'competitorsCountTo',
				type: 'number',
				default: 0,
				description: 'Maximum competitor brands on the source',
			},
			{
				displayName: 'Country Codes',
				name: 'countryCodes',
				type: 'string',
				default: '',
				placeholder: 'us,de',
				description: 'Comma-separated ISO 3166-1 alpha-2 country codes to filter by',
			},
			{
				displayName: 'Domain ID',
				name: 'domainId',
				type: 'number',
				default: 0,
				description: 'Restrict to a single domain ID',
			},
			{
				displayName: 'Is My Brand Mentioned',
				name: 'isMyBrandMentions',
				type: 'options',
				options: [
					{ name: 'Any', value: '' },
					{ name: 'Mentioned (1)', value: '1' },
					{ name: 'Not Available (-1)', value: '-1' },
					{ name: 'Not Mentioned (0)', value: '0' },
				],
				default: '',
				description: 'Filter by whether the primary brand is mentioned on the source (integer flag, not boolean)',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 1000,
				description: 'Number of rows per page (default 1000, max 10000)',
			},
			{
				displayName: 'Model Types',
				name: 'modelTypes',
				type: 'multiOptions',
				options: MODEL_TYPE_OPTIONS,
				default: [],
				description: 'AI models to filter by',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Rows to skip',
			},
			{
				displayName: 'Prompt IDs',
				name: 'promptIds',
				type: 'string',
				default: '',
				placeholder: '101,102',
				description: 'Comma-separated prompt IDs to filter by',
			},
			{
				displayName: 'Search Query',
				name: 'searchQuery',
				type: 'string',
				default: '',
				description: 'Substring filter on the source domain or URL',
			},
			{
				displayName: 'Sentiments',
				name: 'sentiments',
				type: 'multiOptions',
				options: SENTIMENT_OPTIONS,
				default: [],
				description: 'Sentiments to filter by',
			},
			{
				displayName: 'Sort Field',
				name: 'sortField',
				type: 'string',
				default: '',
				placeholder: 'ai_answers_count',
				description: 'Valid values depend on Source Type. Domain: ai_answers_count, pages, coverage, prompts_count, mention_rate, my_brand_mentions_count, competitors_count, first_seen, last_seen. URL: ai_answers_count, coverage, prompts_count, competitors_count, my_brand_mentions, gap_score, first_seen, last_seen, last_check_date. A cross-type value returns 422.',
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
				description: 'Sort direction',
			},
			{
				displayName: 'Topic IDs',
				name: 'topicIds',
				type: 'string',
				default: '',
				placeholder: '11,12',
				description: 'Comma-separated topic IDs to filter by',
			},
			{
				displayName: 'Tracked Brand IDs',
				name: 'trackedBrandIds',
				type: 'string',
				default: '',
				placeholder: '5,6',
				description: 'Comma-separated tracked brand IDs to filter by',
			},
			{
				displayName: 'URL Types',
				name: 'types',
				type: 'multiOptions',
				options: [
					{ name: 'App', value: 'app' },
					{ name: 'Blog', value: 'blog' },
					{ name: 'Documentation', value: 'documentation' },
					{ name: 'Educational', value: 'educational' },
					{ name: 'File', value: 'file' },
					{ name: 'Forum', value: 'forum' },
					{ name: 'Homepage', value: 'homepage' },
					{ name: 'Job', value: 'job' },
					{ name: 'Local', value: 'local' },
					{ name: 'News', value: 'news' },
					{ name: 'Other', value: 'other' },
					{ name: 'Product', value: 'product' },
					{ name: 'Q&A', value: 'q&a' },
					{ name: 'Search', value: 'search' },
					{ name: 'Social', value: 'social' },
					{ name: 'Video', value: 'video' },
					{ name: 'Wiki', value: 'wiki' },
				],
				default: [],
				description: 'URL categories to filter by',
			},
		],
	},
];
