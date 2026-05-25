import { INodeProperties } from 'n8n-workflow';

export const websiteAuditOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
			},
		},
		options: [
			{
				name: 'Create Audit',
				value: 'createAudit',
				description: 'Launch a website audit',
				action: 'Create audit',
			},
			{
				name: 'Delete Audit',
				value: 'deleteAudit',
				description: 'Delete an audit',
				action: 'Delete audit',
			},
			{
				name: 'Get All Issues for URL',
				value: 'getIssues',
				description: 'Get all issues found for a specific URL',
				action: 'Get all issues for URL',
			},
			{
				name: 'Get All Links',
				value: 'getLinks',
				description: 'Get all links found during the audit',
				action: 'Get all links',
			},
			{
				name: 'Get Audit History',
				value: 'getHistory',
				description: 'Get historical audit data for a specific date',
				action: 'Get audit history',
			},
			{
				name: 'Get Audit Pages by Issue',
				value: 'getPagesByIssue',
				description: 'Get pages affected by a specific issue',
				action: 'Get audit pages by issue',
			},
			{
				name: 'Get Audit Report',
				value: 'getReport',
				description: 'Get the full audit report',
				action: 'Get audit report',
			},
			{
				name: 'Get Audit Status',
				value: 'getStatus',
				description: 'Get the current status of an audit',
				action: 'Get audit status',
			},
			{
				name: 'Get Crawled Pages',
				value: 'getPages',
				description: 'Get all crawled pages from an audit',
				action: 'Get crawled pages',
			},
			{
				name: 'List Audits',
				value: 'listAudits',
				description: 'Get a list of all audits',
				action: 'List audits',
			},
			{
				name: 'Recheck Audit',
				value: 'recheckAudit',
				description: 'Recheck an existing audit',
				action: 'Recheck audit',
			},
			{
				name: 'Update Audit Title',
				value: 'updateTitle',
				description: 'Update the title of an audit',
				action: 'Update audit title',
			},
			{
				name: 'Get Audit Settings',
				value: 'getAuditSettings',
				description: 'Get the full configuration of an audit',
				action: 'Get audit settings',
			},
			{
				name: 'Update Audit Settings',
				value: 'updateAuditSettings',
				description: 'Partially update audit configuration',
				action: 'Update audit settings',
			},
			{
				name: 'Reset Audit Settings',
				value: 'resetAuditSettings',
				description: 'Restore all audit settings to defaults',
				action: 'Reset audit settings',
			},
			{
				name: 'List Audit Sitemaps',
				value: 'listAuditSitemaps',
				description: 'List configured sitemaps for an audit',
				action: 'List audit sitemaps',
			},
			{
				name: 'Add Audit Sitemap',
				value: 'addAuditSitemap',
				description: 'Register a sitemap URL as a crawl source',
				action: 'Add audit sitemap',
			},
			{
				name: 'Delete Audit Sitemap',
				value: 'deleteAuditSitemap',
				description: 'Remove a sitemap from crawl sources',
				action: 'Delete audit sitemap',
			},
			{
				name: 'List Audit Source Pages',
				value: 'listAuditSourcePages',
				description: 'List uploaded custom page lists',
				action: 'List audit source pages',
			},
			{
				name: 'Delete Audit Source Pages',
				value: 'deleteAuditSourcePages',
				description: 'Remove an uploaded custom page list',
				action: 'Delete audit source pages',
			},
		],
		default: 'listAudits',
	},
];

export const websiteAuditFields: INodeProperties[] = [
	// ─── Audit ID (most operations) ─────────────────────────────────────────
	{
		displayName: 'Audit ID',
		name: 'auditId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['getStatus', 'getReport', 'getPages', 'getPagesByIssue', 'getIssues', 'getLinks', 'getHistory', 'updateTitle', 'deleteAudit', 'recheckAudit', 'getAuditSettings', 'updateAuditSettings', 'resetAuditSettings', 'listAuditSitemaps', 'addAuditSitemap', 'deleteAuditSitemap', 'listAuditSourcePages', 'deleteAuditSourcePages'],
			},
		},
		default: 0,
		description: 'Unique audit ID',
	},

	// ─── Create Audit fields ────────────────────────────────────────────────
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['createAudit'],
			},
		},
		default: '',
		placeholder: 'example.com',
		description: 'Domain to be audited',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['createAudit'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Custom title of the audit report (max 300 characters)',
			},
			{
				displayName: 'Settings (JSON)',
				name: 'settingsJson',
				type: 'json',
				default: '{}',
				description: 'Audit settings as JSON object (source_site, source_sitemap, check_robots, max_pages, csr, etc.)',
			},
		],
	},

	// ─── List Audits additional fields ──────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['listAudits'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of audits to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of audits to skip',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Filter audits by matching title or URL',
			},
			{
				displayName: 'Date Start',
				name: 'dateStart',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Start date for filtering audits',
			},
			{
				displayName: 'Date End',
				name: 'dateEnd',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'End date for filtering audits',
			},
		],
	},

	// ─── Get Pages additional fields ────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['getPages'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of pages to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of pages to skip',
			},
		],
	},

	// ─── Get Pages by Issue fields ──────────────────────────────────────────
	{
		displayName: 'Issue Code Name or ID',
		name: 'issueCode',
		type: 'options',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getAuditIssueCodes',
			loadOptionsDependsOn: ['auditId'],
		},
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['getPagesByIssue'],
			},
		},
		default: '',
		description: 'Issue code from the audit report. Set the Audit ID first; the dropdown will populate from the audit\'s issue codes. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['getPagesByIssue'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of URLs to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of URLs to skip',
			},
		],
	},

	// ─── Get Issues for URL fields ─────────────────────────────────────────
	{
		displayName: 'URL ID',
		name: 'urlId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['getIssues'],
			},
		},
		default: 0,
		description: 'Unique page ID. Either URL ID or URL must be provided.',
	},
	{
		displayName: 'URL',
		name: 'pageUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['getIssues'],
			},
		},
		default: '',
		description: 'Full page URL. Either URL ID or URL must be provided.',
	},

	// ─── Get Links additional fields ────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['getLinks'],
			},
		},
		options: [
			{
				displayName: 'Page Type',
				name: 'pageType',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Internal', value: 'internal' },
					{ name: 'External', value: 'external' },
				],
				default: 'all',
				description: 'Filter links by type',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of links to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of links to skip',
			},
			{
				displayName: 'Filter (JSON)',
				name: 'filterJson',
				type: 'json',
				default: '[]',
				description: 'Array of filter objects, e.g. [{"param":"status","value":"broken"}]',
			},
		],
	},

	// ─── Get History fields ─────────────────────────────────────────────────
	{
		displayName: 'Date',
		name: 'historyDate',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['getHistory'],
			},
		},
		default: '',
		placeholder: 'YYYY-MM-DD',
		description: 'The specific date of the historical audit to retrieve',
	},

	// ─── Update Title fields ────────────────────────────────────────────────
	{
		displayName: 'New Title',
		name: 'newTitle',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['updateTitle'],
			},
		},
		default: '',
		description: 'New title for the audit report (max 300 characters)',
	},

	// ─── Update Audit Settings ──────────────────────────────────────────
	{
		displayName: 'Settings JSON',
		name: 'settingsJson',
		type: 'string',
		typeOptions: { rows: 5 },
		required: true,
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['updateAuditSettings'],
			},
		},
		default: '{}',
		description: 'JSON object of settings to update (partial update — only send changed fields). E.g. {"max_pages": 5000, "schedule_type": "week"}',
	},

	// ─── Add Audit Sitemap ──────────────────────────────────────────────
	{
		displayName: 'Sitemap URL',
		name: 'sitemapUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['addAuditSitemap'],
			},
		},
		default: '',
		placeholder: 'https://example.com/sitemap.xml',
		description: 'Absolute URL of the sitemap to register as a crawl source',
	},

	// ─── Delete Audit Sitemap ───────────────────────────────────────────
	{
		displayName: 'Sitemap ID',
		name: 'sitemapId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['deleteAuditSitemap'],
			},
		},
		default: 0,
		description: 'ID of the sitemap to remove (from List Audit Sitemaps)',
	},

	// ─── Delete Audit Source Pages ──────────────────────────────────────
	{
		displayName: 'Source Pages List ID',
		name: 'sourcePagesListId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['websiteAuditProject'],
				operation: ['deleteAuditSourcePages'],
			},
		},
		default: '',
		description: 'ID of the uploaded page list to remove (from List Audit Source Pages)',
	},
];
