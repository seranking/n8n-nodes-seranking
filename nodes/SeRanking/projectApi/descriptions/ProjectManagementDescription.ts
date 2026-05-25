import { INodeProperties } from 'n8n-workflow';

// Shared search engine additional fields (used by addSearchEngine and changeSearchEngine)
const searchEngineAdditionalOptions: INodeProperties['options'] = [
	{
		displayName: 'Region ID',
		name: 'regionId',
		type: 'number',
		default: 0,
		description: 'Region ID',
	},
	{
		displayName: 'Region Name',
		name: 'regionName',
		type: 'string',
		default: '',
		description: 'Geographical name (region or city) in English. Only applicable to Google.',
	},
	{
		displayName: 'Language Code',
		name: 'langCode',
		type: 'string',
		default: '',
		placeholder: 'en',
		description: 'Language code (refer to /system/google-langs)',
	},
	{
		displayName: 'Google Maps Mode',
		name: 'mergeMap',
		type: 'options',
		options: [
			{ name: "Don't Include", value: 0, description: 'Do not include Google Maps SERPs' },
			{ name: 'Include', value: 1, description: 'Include Google Maps SERPs' },
			{ name: 'Include and Display Separately', value: 2, description: 'Include and display Maps separately' },
		],
		default: 0,
		description: 'Google Maps SERPs handling mode',
	},
	{
		displayName: 'Business Name',
		name: 'businessName',
		type: 'string',
		default: '',
		description: 'Business name for Google Maps SERPs',
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		default: '',
		description: 'Company phone number for Google Maps SERPs',
	},
	{
		displayName: 'Track Paid Results',
		name: 'paidResults',
		type: 'options',
		options: [
			{ name: 'No', value: 0 },
			{ name: 'Yes', value: 1 },
		],
		default: 0,
		description: 'Track rankings in Google Ads',
	},
	{
		displayName: 'Featured Snippet',
		name: 'featuredSnippet',
		type: 'options',
		options: [
			{ name: 'Exclude', value: 0 },
			{ name: 'Include', value: 1 },
		],
		default: 0,
		description: 'Track Featured Snippet results',
	},
];

export const projectManagementOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
			},
		},
		options: [
			{
				name: 'Add Keywords',
				value: 'addKeywords',
				description: 'Add keywords to a project',
				action: 'Add keywords to project',
			},
			{
				name: 'Add Project',
				value: 'addProject',
				description: 'Create a new project in the account',
				action: 'Add project',
			},
			{
				name: 'Add Search Engine',
				value: 'addSearchEngine',
				description: 'Add a new search engine configuration to a project',
				action: 'Add search engine to project',
			},
			{
				name: 'Change Project Settings',
				value: 'changeProject',
				description: 'Update settings of a project',
				action: 'Change project settings',
			},
			{
				name: 'Change Search Engine',
				value: 'changeSearchEngine',
				description: 'Update a search engine configuration in a project',
				action: 'Change search engine in project',
			},
			{
				name: 'Delete Keywords',
				value: 'deleteKeywords',
				description: 'Delete keywords from a project',
				action: 'Delete keywords',
			},
			{
				name: 'Delete Project',
				value: 'deleteProject',
				description: 'Delete a project from the account',
				action: 'Delete project',
			},
			{
				name: 'Delete Search Engine',
				value: 'deleteSearchEngine',
				description: 'Remove a search engine configuration from a project',
				action: 'Delete search engine from project',
			},
			{
				name: 'Get Ads Chart',
				value: 'getAds',
				description: 'Get advertisement statistics by date',
				action: 'Get ads chart',
			},
			{
				name: 'Get Historical Dates',
				value: 'getHistoricalDates',
				description: 'Get historical ranking check dates',
				action: 'Get historical dates',
			},
			{
				name: 'Get Keyword Statistics',
				value: 'getPositions',
				description: 'Get keyword ranking statistics for a project',
				action: 'Get keyword statistics',
			},
			{
				name: 'Get Project Stats',
				value: 'getStats',
				description: 'Get summary statistics for a project',
				action: 'Get project stats',
			},
			{
				name: 'List Keywords',
				value: 'listKeywords',
				description: 'List all keywords for a project',
				action: 'List keywords',
			},
			{
				name: 'List Projects',
				value: 'listProjects',
				description: 'Get a list of all projects in the account',
				action: 'List all projects',
			},
			{
				name: 'List Search Engines',
				value: 'listSearchEngines',
				description: 'Get search engines configured for a project',
				action: 'List project search engines',
			},
			{
				name: 'Run Position Check',
				value: 'runRecheck',
				description: 'Trigger a ranking position check for keywords',
				action: 'Run position check',
			},
			{
				name: 'Set Manual Position',
				value: 'setManualPosition',
				description: 'Set a ranking position for a keyword on a date',
				action: 'Set manual keyword position',
			},
			{
				name: 'List Check Dates',
				value: 'listCheckDates',
				description: 'Get actual ranking check dates for a project',
				action: 'List check dates',
			},
			{
				name: 'Get Ranking Trends',
				value: 'getRankingTrends',
				description: 'Get ranking trend time series (avg position, visibility, top10)',
				action: 'Get ranking trends',
			},
		],
		default: 'listProjects',
	},
];

export const projectManagementFields: INodeProperties[] = [
	// ─── Site ID (shared by most operations except listProjects, addProject) ─
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: [
					'listSearchEngines',
					'addSearchEngine',
					'changeSearchEngine',
					'deleteSearchEngine',
					'listKeywords',
					'getStats',
					'getPositions',
					'getAds',
					'getHistoricalDates',
					'addKeywords',
					'changeProject',
					'deleteProject',
					'deleteKeywords',
					'setManualPosition',
					'runRecheck',
					'listCheckDates',
					'getRankingTrends',
				],
			},
		},
		default: 0,
		description: 'Unique project (site) ID',
	},

	// ─── Site Engine ID (changeSearchEngine, deleteSearchEngine) ────────────
	{
		displayName: 'Site Engine ID',
		name: 'siteEngineId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['changeSearchEngine', 'deleteSearchEngine'],
			},
		},
		default: 0,
		description: 'Unique ID of the search engine configuration within the project',
	},

	// ─── ADD SEARCH ENGINE fields ───────────────────────────────────────────
	{
		displayName: 'Search Engine ID',
		name: 'searchEngineId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['addSearchEngine'],
			},
		},
		default: 0,
		description: 'Search engine ID (refer to /system/search-engines)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['addSearchEngine'],
			},
		},
		options: searchEngineAdditionalOptions as any,
	},

	// ─── CHANGE SEARCH ENGINE fields ────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['changeSearchEngine'],
			},
		},
		options: searchEngineAdditionalOptions as any,
	},

	// ─── LIST KEYWORDS optional fields ──────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['listKeywords'],
			},
		},
		options: [
			{
				displayName: 'Site Engine ID',
				name: 'siteEngineId',
				type: 'number',
				default: 0,
				description: 'Search engine config ID. If provided, first_check_date is returned.',
			},
		],
	},

	// ─── GET KEYWORD STATISTICS (positions) optional fields ─────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['getPositions'],
			},
		},
		options: [
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2024-01-01',
				description: 'Start date (YYYY-MM-DD). Defaults to one week ago.',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2024-01-07',
				description: 'End date (YYYY-MM-DD). Defaults to today.',
			},
			{
				displayName: 'Site Engine ID',
				name: 'siteEngineId',
				type: 'number',
				default: 0,
				description: 'Search engine config ID. If omitted, all engines are returned.',
			},
			{
				displayName: 'In Top',
				name: 'inTop',
				type: 'number',
				default: 0,
				description: 'Filter by ranking position (e.g. 10 = TOP 10)',
			},
			{
				displayName: 'With Landing Pages',
				name: 'withLandingPages',
				type: 'options',
				options: [
					{ name: 'No', value: 0 },
					{ name: 'Yes', value: 1 },
				],
				default: 0,
				description: 'Include landing page URLs found in SERPs',
			},
			{
				displayName: 'With SERP Features',
				name: 'withSerpFeatures',
				type: 'options',
				options: [
					{ name: 'No', value: 0 },
					{ name: 'Yes', value: 1 },
				],
				default: 0,
				description: 'Include detected SERP features',
			},
		],
	},

	// ─── GET ADS optional fields ────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['getAds'],
			},
		},
		options: [
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2024-01-01',
				description: 'Start date (YYYY-MM-DD)',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2024-01-07',
				description: 'End date (YYYY-MM-DD)',
			},
			{
				displayName: 'Site Engine IDs',
				name: 'siteEngineIds',
				type: 'string',
				default: '',
				placeholder: '1,2',
				description: 'Comma-separated search engine config IDs',
			},
			{
				displayName: 'Keyword IDs',
				name: 'keywordsIds',
				type: 'string',
				default: '',
				placeholder: '1,2,3',
				description: 'Comma-separated keyword IDs',
			},
		],
	},

	// ─── GET HISTORICAL DATES optional fields ───────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['getHistoricalDates'],
			},
		},
		options: [
			{
				displayName: 'Site Engine ID',
				name: 'siteEngineId',
				type: 'number',
				default: 0,
				description: 'Search engine config ID. If omitted, dates for all engines are returned.',
			},
		],
	},

	// ─── ADD KEYWORDS fields ────────────────────────────────────────────────
	{
		displayName: 'Keywords (JSON)',
		name: 'keywordsJson',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['addKeywords'],
			},
		},
		default: '[{"keyword":"example keyword"}]',
		description: 'JSON array of keyword objects. Each: { keyword (required), group_id, target_url, is_strict, comment, site_engine_ids[] }',
	},

	// ─── ADD PROJECT fields ─────────────────────────────────────────────────
	{
		displayName: 'URL',
		name: 'projectUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['addProject'],
			},
		},
		default: '',
		placeholder: 'https://example.com',
		description: 'Website URL for the new project',
	},
	{
		displayName: 'Title',
		name: 'projectTitle',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['addProject'],
			},
		},
		default: '',
		placeholder: 'My SEO Project',
		description: 'Project name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['addProject'],
			},
		},
		options: [
			{
				displayName: 'Depth',
				name: 'depth',
				type: 'options',
				options: [
					{ name: '100', value: 100 },
					{ name: '200', value: 200 },
				],
				default: 100,
				description: 'Ranking collection depth',
			},
			{
				displayName: 'Include Subdomains',
				name: 'subdomainMatch',
				type: 'options',
				options: [
					{ name: 'No', value: 0 },
					{ name: 'Yes', value: 1 },
				],
				default: 0,
			},
			{
				displayName: 'Exact URL Only',
				name: 'exactUrl',
				type: 'options',
				options: [
					{ name: 'No', value: 0 },
					{ name: 'Yes', value: 1 },
				],
				default: 0,
			},
			{
				displayName: 'Check Frequency',
				name: 'checkFreq',
				type: 'options',
				options: [
					{ name: 'Daily', value: 'check_daily' },
					{ name: 'Every 3 Days', value: 'check_1in3' },
					{ name: 'Weekly', value: 'check_weekly' },
					{ name: 'Monthly', value: 'check_monthly' },
					{ name: 'Manual', value: 'manual' },
				],
				default: 'check_daily',
			},
			{
				displayName: 'Check Day',
				name: 'checkDay',
				type: 'number',
				default: 0,
				description: 'Day of week (1-7) for weekly or day of month (1-31) for monthly',
			},
			{
				displayName: 'Group ID',
				name: 'siteGroupId',
				type: 'number',
				default: 0,
				description: 'Project group ID',
			},
			{
				displayName: 'Auto Reports',
				name: 'autoReports',
				type: 'options',
				options: [
					{ name: 'No', value: 0 },
					{ name: 'Yes', value: 1 },
				],
				default: 1,
				description: 'Enable weekly reports',
			},
			{
				displayName: 'Disable Audit',
				name: 'disableAudit',
				type: 'options',
				options: [
					{ name: 'No', value: 0 },
					{ name: 'Yes', value: 1 },
				],
				default: 0,
			},
			{
				displayName: 'Active',
				name: 'isActive',
				type: 'options',
				options: [
					{ name: 'Active', value: 1 },
					{ name: 'Delayed', value: 0 },
				],
				default: 1,
			},
		],
	},

	// ─── CHANGE PROJECT SETTINGS fields ─────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['changeProject'],
			},
		},
		options: [
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'Website URL',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Project name',
			},
			{
				displayName: 'Depth',
				name: 'depth',
				type: 'options',
				options: [
					{ name: '100', value: 100 },
					{ name: '200', value: 200 },
				],
				default: 100,
			},
			{
				displayName: 'Include Subdomains',
				name: 'subdomainMatch',
				type: 'options',
				options: [
					{ name: 'No', value: 0 },
					{ name: 'Yes', value: 1 },
				],
				default: 0,
			},
			{
				displayName: 'Exact URL Only',
				name: 'exactUrl',
				type: 'options',
				options: [
					{ name: 'No', value: 0 },
					{ name: 'Yes', value: 1 },
				],
				default: 0,
			},
			{
				displayName: 'Check Frequency',
				name: 'checkFreq',
				type: 'options',
				options: [
					{ name: 'Daily', value: 'check_daily' },
					{ name: 'Every 3 Days', value: 'check_1in3' },
					{ name: 'Weekly', value: 'check_weekly' },
					{ name: 'Monthly', value: 'check_monthly' },
					{ name: 'Manual', value: 'manual' },
				],
				default: 'check_daily',
			},
			{
				displayName: 'Check Day',
				name: 'checkDay',
				type: 'number',
				default: 0,
				description: 'Day of week (1-7) for weekly or day of month (1-31) for monthly',
			},
			{
				displayName: 'Group ID',
				name: 'siteGroupId',
				type: 'number',
				default: 0,
				description: 'Project group ID',
			},
			{
				displayName: 'Active',
				name: 'isActive',
				type: 'options',
				options: [
					{ name: 'Active', value: 1 },
					{ name: 'Delayed', value: 0 },
				],
				default: 1,
			},
		],
	},

	// ─── DELETE KEYWORDS fields ──────────────────────────────────────────────
	{
		displayName: 'Keyword IDs',
		name: 'keywordIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['deleteKeywords'],
			},
		},
		default: '',
		placeholder: '1,2,3',
		description: 'Comma-separated keyword IDs to delete',
	},

	// ─── SET MANUAL POSITION fields ─────────────────────────────────────────
	{
		displayName: 'Keyword ID',
		name: 'keywordId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['setManualPosition'],
			},
		},
		default: 0,
		description: 'Unique keyword ID',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['setManualPosition'],
			},
		},
		default: '',
		placeholder: '2024-01-01',
		description: 'Date of the ranking record (YYYY-MM-DD)',
	},
	{
		displayName: 'Site Engine ID',
		name: 'manualSiteEngineId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['setManualPosition'],
			},
		},
		default: 0,
		description: 'Search engine configuration ID',
	},
	{
		displayName: 'Position',
		name: 'position',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['setManualPosition'],
			},
		},
		default: 0,
		description: 'Position (0–200). 0 means "not found".',
	},

	// ─── RUN POSITION CHECK fields ──────────────────────────────────────────
	{
		displayName: 'Check Mode',
		name: 'checkMode',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['runRecheck'],
			},
		},
		options: [
			{
				name: 'All Keywords for Engine',
				value: 'byEngine',
				description: 'Recheck all keywords for a specific search engine',
			},
			{
				name: 'Specific Keywords',
				value: 'byKeywords',
				description: 'Recheck specific keyword + engine pairs',
			},
		],
		default: 'byEngine',
	},
	{
		displayName: 'Site Engine ID',
		name: 'recheckSiteEngineId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['runRecheck'],
				checkMode: ['byEngine'],
			},
		},
		default: 0,
		description: 'Search engine configuration ID to recheck all keywords for',
	},
	{
		displayName: 'Keywords (JSON)',
		name: 'recheckKeywords',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['runRecheck'],
				checkMode: ['byKeywords'],
			},
		},
		default: '[{"site_engine_id":1,"keyword_id":2}]',
		description: 'JSON array of objects: { site_engine_id, keyword_id }',
	},

	// ─── List Check Dates ───────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['listCheckDates'],
			},
		},
		options: [
			{
				displayName: 'Site Engine ID',
				name: 'siteEngineId',
				type: 'number',
				default: 0,
				description: 'Limit to a single search engine',
			},
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2026-01-01',
				description: 'Start date (YYYY-MM-DD). Defaults to 7 days ago.',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2026-01-31',
				description: 'End date (YYYY-MM-DD). Defaults to today.',
			},
		],
	},

	// ─── Get Ranking Trends ─────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['projectManagement'],
				operation: ['getRankingTrends'],
			},
		},
		options: [
			{
				displayName: 'Site Engine ID',
				name: 'siteEngineId',
				type: 'number',
				default: 0,
				description: 'Limit to a single search engine (drops the cross-engine average row)',
			},
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2026-01-01',
				description: 'Start date (YYYY-MM-DD). Defaults to 7 days ago.',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2026-01-31',
				description: 'End date (YYYY-MM-DD). Defaults to today.',
			},
			{
				displayName: 'Metric Type',
				name: 'metricType',
				type: 'options',
				options: [
					{ name: 'Average Position', value: 'avg_pos' },
					{ name: 'Visibility (Raw Score)', value: 'visibility' },
					{ name: 'Visibility (%)', value: 'visibility_percent' },
					{ name: 'Top 10 (Count)', value: 'top10' },
					{ name: 'Top 10 (%)', value: 'top10_percent' },
				],
				default: 'avg_pos',
				description: 'Which ranking metric to retrieve',
			},
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'number',
				default: 0,
				description: 'Filter to a keyword group',
			},
			{
				displayName: 'Keyword IDs',
				name: 'keywordsIds',
				type: 'string',
				default: '',
				placeholder: '123,456,789',
				description: 'Comma-separated keyword IDs to filter',
			},
			{
				displayName: 'Tag IDs',
				name: 'tagsIds',
				type: 'string',
				default: '',
				placeholder: '1,2,3',
				description: 'Comma-separated landing-page tag IDs to filter',
			},
		],
	},
];
