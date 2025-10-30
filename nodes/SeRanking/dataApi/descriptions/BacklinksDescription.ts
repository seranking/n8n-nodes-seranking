import { INodeProperties } from 'n8n-workflow';

export const backlinksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['backlinks'],
			},
		},
		options: [
			{
				name: 'Get Summary',
				value: 'getSummary',
				description: 'Get extended backlink statistics (total links, domains, etc)',
				action: 'Get backlinks summary',
			},
			{
				name: 'Get Metrics',
				value: 'getMetrics',
				description: 'Get key backlink metrics for one or more targets',
				action: 'Get backlink metrics',
			},
			{
				name: 'Get All Backlinks',
				value: 'getAll',
				description: 'Get detailed list of backlinks (supports sorting/pagination)',
				action: 'Get all backlinks',
			},
			{
				name: 'Get Raw Backlinks',
				value: 'getRaw',
				description: 'Stream backlinks in batches (cursor-based for large datasets)',
				action: 'Get raw backlinks',
			},
			{
				name: 'Get Count',
				value: 'getCount',
				description: 'Get total number of backlinks to a target',
				action: 'Get backlinks count',
			},
			{
				name: 'Export Backlinks',
				value: 'export',
				description: 'Bulk export all backlinks (for large-scale retrieval)',
				action: 'Export backlinks',
			},
			{
				name: 'Check Export Status',
				value: 'exportStatus',
				description: 'Check status of bulk export job',
				action: 'Check export status',
			},
			{
				name: 'Download Export Data',
				value: 'exportDownload',
				description: 'Download completed export data',
				action: 'Download export data',
			},
			{
				name: 'Get History',
				value: 'getHistory',
				description: 'Get backlinks found or lost in a date range',
				action: 'Get backlinks history',
			},
			{
				name: 'Get History Count',
				value: 'getHistoryCount',
				description: 'Get daily counts of new/lost backlinks over a date range',
				action: 'Get backlinks history count',
			},
			{
				name: 'Get Cumulative History',
				value: 'getCumulativeHistory',
				description: 'Get daily total of live backlinks over a date range',
				action: 'Get cumulative backlinks history',
			},
			{
				name: 'Get Anchors',
				value: 'getAnchors',
				description: 'Get anchor texts of backlinks pointing to the target',
				action: 'Get anchor texts',
			},
			{
				name: 'Get Referring Domains',
				value: 'getRefDomains',
				description: 'Get list of domains linking to the target',
				action: 'Get referring domains',
			},
			{
				name: 'Get Referring Domains Count',
				value: 'getRefDomainsCount',
				description: 'Get number of unique referring domains',
				action: 'Get referring domains count',
			},
			{
				name: 'Get Referring Domains History',
				value: 'getRefDomainsHistory',
				description: 'Get referring domains with new/lost links in a date range',
				action: 'Get referring domains history',
			},
			{
				name: 'Get Referring Domains History Count',
				value: 'getRefDomainsHistoryCount',
				description: 'Get count of referring domains with link changes',
				action: 'Get referring domains history count',
			},
			{
				name: 'Get Referring IPs',
				value: 'getReferringIps',
				description: 'Get IPv4 addresses of sites linking to the target',
				action: 'Get referring IPs',
			},
			{
				name: 'Get Referring IPs Count',
				value: 'getReferringIpsCount',
				description: 'Get number of unique IP addresses linking to the target',
				action: 'Get referring IPs count',
			},
			{
				name: 'Get Referring Subnets Count',
				value: 'getReferringSubnetsCount',
				description: 'Get number of unique /24 IP subnets linking to the target',
				action: 'Get referring subnets count',
			},
			{
				name: 'Get Indexed Pages',
				value: 'getIndexedPages',
				description: 'Get pages indexed or found by the backlink crawler',
				action: 'Get indexed pages',
			},
			{
				name: 'Get Authority',
				value: 'getAuthority',
				description: 'Get InLink Rank (page authority) and Domain InLink Rank',
				action: 'Get authority metrics',
			},
			{
				name: 'Get Domain Authority',
				value: 'getDomainAuthority',
				description: 'Get Domain InLink Rank for the target domain',
				action: 'Get domain authority',
			},
			{
				name: 'Get Domain Authority Distribution',
				value: 'getDomainAuthorityDistribution',
				description: 'Get distribution of domain authority scores among linking domains',
				action: 'Get domain authority distribution',
			},
			{
				name: 'Get Page Authority',
				value: 'getPageAuthority',
				description: 'Get InLink Rank (authority) for the target URL',
				action: 'Get page authority',
			},
			{
				name: 'Get Page Authority History',
				value: 'getPageAuthorityHistory',
				description: 'Get historical InLink Rank values for the target URL',
				action: 'Get page authority history',
			},
		],
		default: 'getSummary',
	},
];

export const backlinksFields: INodeProperties[] = [
	// Target field (for single-target operations - NOT for exportDownload or exportStatus)
	{
		displayName: 'Target',
		name: 'target',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: [
					'getSummary',
					'getAll',
					'getRaw',
					'getCount',
					'export',
					'getHistory',
					'getHistoryCount',
					'getCumulativeHistory',
					'getAnchors',
					'getRefDomains',
					'getRefDomainsCount',
					'getRefDomainsHistory',
					'getRefDomainsHistoryCount',
					'getReferringIps',
					'getReferringIpsCount',
					'getReferringSubnetsCount',
					'getIndexedPages',
					'getAuthority',
					'getDomainAuthority',
					'getDomainAuthorityDistribution',
					'getPageAuthority',
					'getPageAuthorityHistory',
				],
			},
		},
		default: '',
		placeholder: 'example.com or https://example.com/page',
		description: 'Target domain or URL to analyze',
	},
	// Targets field (for getMetrics - supports multiple)
	{
		displayName: 'Targets',
		name: 'targets',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getMetrics'],
			},
		},
		default: '',
		placeholder: 'example.com\nhttps://example.com/page\ncompetitor.com',
		description: 'Target domains or URLs to analyze (one per line)',
	},
	// Task ID field (for exportStatus)
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['exportStatus'],
			},
		},
		default: '',
		placeholder: 'd1d2bb44-6c66-4791-a634-26103551e2da',
		description: 'Task ID returned from the export operation',
	},
	// Export URL field (ONLY for exportDownload)
	{
		displayName: 'Export URL',
		name: 'exportUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['exportDownload'],
			},
		},
		default: '',
		placeholder: 'https://api.seranking.com/export/c/seranking.com',
		description: 'Full export URL from the export status response',
	},
	// Mode field (for getSummary)
	{
		displayName: 'Mode',
		name: 'mode',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getSummary'],
			},
		},
		options: [
			{
				name: 'Base Domain',
				value: 'as_root',
				description: 'Aggregate by registrable domain, includes all subdomains',
			},
			{
				name: 'Domain',
				value: 'as_subdomain',
				description: 'Exact host only, no subdomain aggregation',
			},
			{
				name: 'URL',
				value: 'one_unit',
				description: 'Exact URL including path and query',
			},
		],
		default: 'as_root',
		description: 'Analysis scope for the target (mapped to SE Ranking: domain/host/url)',
	},
	// Date range fields (for history operations)
	{
		displayName: 'Date From',
		name: 'dateFrom',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: [
					'getHistory',
					'getHistoryCount',
					'getCumulativeHistory',
					'getRefDomainsHistory',
					'getRefDomainsHistoryCount',
					'getPageAuthorityHistory',
				],
			},
		},
		default: '',
		placeholder: '2024-01-01',
		description: 'Start date in YYYY-MM-DD format',
	},
	{
		displayName: 'Date To',
		name: 'dateTo',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: [
					'getHistory',
					'getHistoryCount',
					'getCumulativeHistory',
					'getRefDomainsHistory',
					'getRefDomainsHistoryCount',
					'getPageAuthorityHistory',
				],
			},
		},
		default: '',
		placeholder: '2024-12-31',
		description: 'End date in YYYY-MM-DD format',
	},
	// Additional Fields for getSummary
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getSummary'],
			},
		},
		options: [
			{
				displayName: 'Historical',
				name: 'historical',
				type: 'boolean',
				default: false,
				description: 'Whether to include historical data',
			},
		],
	},
	// Additional Fields for getAll
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'Domain (Root + Subdomains)', value: 'as_root' },
					{ name: 'Host (Specific Subdomain)', value: 'as_subdomain' },
					{ name: 'URL (Exact URL)', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope (mapped to SE Ranking: domain/host/url)',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of backlinks to return',
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
				description: 'Number of results to skip',
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'First Seen', value: 'first_seen' },
					{ name: 'Last Seen', value: 'last_seen' },
					{ name: 'Domain InLink Rank', value: 'domain_inlink_rank' },
					{ name: 'InLink Rank', value: 'inlink_rank' },
					{ name: 'Anchor Text', value: 'anchor' },
				],
				default: 'first_seen',
				description: 'Field to sort by',
			},
			{
				displayName: 'Sort Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				description: 'Sort order',
			},
			{
				displayName: 'Link Type',
				name: 'linkType',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Dofollow', value: 'dofollow' },
					{ name: 'Nofollow', value: 'nofollow' },
				],
				default: 'all',
				description: 'Filter by link type',
			},
			{
				displayName: 'Link Status',
				name: 'linkStatus',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Live', value: 'live' },
					{ name: 'Lost', value: 'lost' },
				],
				default: 'live',
				description: 'Filter by link status',
			},
		],
	},
	// Additional Fields for getRaw (cursor-based)
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getRaw'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 1000,
				description: 'Number of backlinks per batch',
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
			},
			{
				displayName: 'Cursor',
				name: 'cursor',
				type: 'string',
				default: '',
				description: 'Cursor for pagination (from previous response)',
			},
			{
				displayName: 'Link Type',
				name: 'linkType',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Dofollow', value: 'dofollow' },
					{ name: 'Nofollow', value: 'nofollow' },
				],
				default: 'all',
				description: 'Filter by link type',
			},
		],
	},
	// Additional Fields for export
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['export'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
			{
				displayName: 'Link Type',
				name: 'linkType',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Dofollow', value: 'dofollow' },
					{ name: 'Nofollow', value: 'nofollow' },
				],
				default: 'all',
				description: 'Filter by link type',
			},
			{
				displayName: 'Link Status',
				name: 'linkStatus',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Live', value: 'live' },
					{ name: 'Lost', value: 'lost' },
				],
				default: 'live',
				description: 'Filter by link status',
			},
		],
	},
	// Additional Fields for getHistory
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getHistory'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
			{
				displayName: 'Event Type',
				name: 'eventType',
				type: 'options',
				options: [
					{ name: 'New', value: 'new' },
					{ name: 'Lost', value: 'lost' },
				],
				default: 'new',
				description: 'Type of events to retrieve',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of results',
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
				description: 'Number of results to skip',
			},
		],
	},
	// Additional Fields for getAnchors
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getAnchors'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of anchors',
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
				description: 'Number of results to skip',
			},
		],
	},
	// Additional Fields for getRefDomains
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getRefDomains'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of domains',
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
				description: 'Number of results to skip',
			},
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Domain InLink Rank', value: 'domain_inlink_rank' },
					{ name: 'First Seen', value: 'first_seen' },
					{ name: 'Backlinks Count', value: 'backlinks_count' },
				],
				default: 'domain_inlink_rank',
				description: 'Field to sort by',
			},
			{
				displayName: 'Sort Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				description: 'Sort order',
			},
		],
	},
	// Additional Fields for getRefDomainsHistory
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getRefDomainsHistory'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
			{
				displayName: 'Event Type',
				name: 'eventType',
				type: 'options',
				options: [
					{ name: 'New', value: 'new' },
					{ name: 'Lost', value: 'lost' },
				],
				default: 'new',
				description: 'Type of events to retrieve',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of domains',
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
				description: 'Number of results to skip',
			},
		],
	},
	// Additional Fields for getReferringIps
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getReferringIps'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of IPs',
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
				description: 'Number of results to skip',
			},
		],
	},
	// Additional Fields for getIndexedPages
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getIndexedPages'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum number of pages',
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
				description: 'Number of results to skip',
			},
		],
	},
	// Additional Fields for count operations
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: [
					'getCount',
					'getRefDomainsCount',
					'getReferringIpsCount',
					'getReferringSubnetsCount',
				],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
		],
	},
	// Additional Fields for history count operations
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getHistoryCount', 'getRefDomainsHistoryCount'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
		],
	},
	// Additional Fields for getCumulativeHistory
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinks'],
				operation: ['getCumulativeHistory'],
			},
		},
		options: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'As Root', value: 'as_root' },
					{ name: 'As Subdomain', value: 'as_subdomain' },
					{ name: 'One Unit', value: 'one_unit' },
				],
				default: 'as_root',
				description: 'Analysis scope',
			},
		],
	},
];