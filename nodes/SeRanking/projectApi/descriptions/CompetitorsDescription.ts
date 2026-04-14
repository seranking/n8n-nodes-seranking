import { INodeProperties } from 'n8n-workflow';

export const competitorsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['competitors'],
			},
		},
		options: [
			{
				name: 'Add Competitor',
				value: 'addCompetitor',
				description: 'Add a competitor website to a project',
				action: 'Add competitor',
			},
			{
				name: 'Delete Competitor',
				value: 'deleteCompetitor',
				description: 'Remove a competitor from a project',
				action: 'Delete competitor',
			},
			{
				name: 'Get All Competitors',
				value: 'getAllCompetitors',
				description: 'Get domains ranked in TOP 10 for tracked keywords',
				action: 'Get all competitors',
			},
			{
				name: 'Get Keyword Positions',
				value: 'getPositions',
				description: 'Get ranking statistics for competitor keywords',
				action: 'Get competitor keyword positions',
			},
			{
				name: 'Get TOP 10 Results',
				value: 'getTop10',
				description: 'Get TOP 10 ranking results for a keyword',
				action: 'Get TOP 10 results',
			},
			{
				name: 'Get TOP 100 Results',
				value: 'getTop100',
				description: 'Get up to TOP 100 results for a keyword',
				action: 'Get TOP 100 results',
			},
			{
				name: 'List Competitors',
				value: 'listCompetitors',
				description: 'List competitors added to a project',
				action: 'List competitors',
			},
		],
		default: 'listCompetitors',
	},
];

export const competitorsFields: INodeProperties[] = [
	// ─── Site ID (addCompetitor, listCompetitors, getTop10, getTop100, getAllCompetitors) ─
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['competitors'],
				operation: ['addCompetitor', 'listCompetitors', 'getTop10', 'getTop100', 'getAllCompetitors'],
			},
		},
		default: 0,
		description: 'Unique project (site) ID',
	},

	// ─── Competitor ID (getPositions, deleteCompetitor) ─────────────────────
	{
		displayName: 'Competitor ID',
		name: 'competitorId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['competitors'],
				operation: ['getPositions', 'deleteCompetitor'],
			},
		},
		default: 0,
		description: 'Competitor ID',
	},

	// ─── ADD COMPETITOR fields ──────────────────────────────────────────────
	{
		displayName: 'URL',
		name: 'competitorUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['competitors'],
				operation: ['addCompetitor'],
			},
		},
		default: '',
		placeholder: 'https://competitor.com',
		description: 'Competitor website URL',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['competitors'],
				operation: ['addCompetitor'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Competitor website name. If not specified, the URL is used.',
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
				description: 'Whether to include subdomains',
			},
		],
	},

	// ─── GET POSITIONS optional fields ──────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['competitors'],
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
				description: 'Start date (YYYY-MM-DD). Defaults to one week before today.',
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
				description: 'Search engine configuration ID. If not specified, all engines are included.',
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
				description: 'Whether to include SERP features',
			},
		],
	},

	// ─── TOP 10 / TOP 100 shared required fields ────────────────────────────
	{
		displayName: 'Date',
		name: 'date',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['competitors'],
				operation: ['getTop10', 'getTop100', 'getAllCompetitors'],
			},
		},
		default: '',
		placeholder: '2024-01-01',
		description: 'Date for results (YYYY-MM-DD)',
	},
	{
		displayName: 'Site Engine ID',
		name: 'siteEngineId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['competitors'],
				operation: ['getTop10', 'getTop100', 'getAllCompetitors'],
			},
		},
		default: 0,
		description: 'Search engine configuration ID',
	},

	// ─── Keyword ID (getTop10, getTop100) ───────────────────────────────────
	{
		displayName: 'Keyword ID',
		name: 'keywordId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['competitors'],
				operation: ['getTop10', 'getTop100'],
			},
		},
		default: 0,
		description: 'Unique keyword ID',
	},

	// ─── TOP 100 optional fields ────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['competitors'],
				operation: ['getTop100'],
			},
		},
		options: [
			{
				displayName: 'Top',
				name: 'top',
				type: 'number',
				default: 100,
				description: 'Maximum position (0–100)',
			},
		],
	},

	// ─── GET ALL COMPETITORS optional fields ────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['competitors'],
				operation: ['getAllCompetitors'],
			},
		},
		options: [
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'number',
				default: 0,
				description: 'Keyword group ID',
			},
			{
				displayName: 'Tag IDs',
				name: 'tags',
				type: 'string',
				default: '',
				placeholder: '1,2,3',
				description: 'Comma-separated keyword tag IDs',
			},
		],
	},
];
