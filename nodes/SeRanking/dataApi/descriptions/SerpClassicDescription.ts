import { INodeProperties } from 'n8n-workflow';

export const serpClassicOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
			},
		},
		options: [
			{
				name: 'Add Tasks',
				value: 'addTasks',
				description: 'Create SERP tasks for keywords (returns task IDs)',
				action: 'Add SERP tasks',
			},
			{
				name: 'Get Results (standard)',
				value: 'getResults',
				description: 'Get status or standard SERP results for a task',
				action: 'Get SERP results',
			},
			{
				name: 'List Tasks',
				value: 'listTasks',
				description: 'List recent SERP tasks (last 24 hours)',
				action: 'List SERP tasks',
			},
			{
				name: 'Get Advanced Results',
				value: 'getAdvancedResults',
				description: 'Retrieve advanced (detailed) SERP results',
				action: 'Get advanced SERP results',
			},
			{
				name: 'Get Locations',
				value: 'getLocations',
				description: 'Get available location IDs for SERP queries',
				action: 'Get SERP locations',
			},
		],
		default: 'addTasks',
	},
];

export const serpClassicFields: INodeProperties[] = [
	// Add Tasks
	{
		displayName: 'Search Engine',
		name: 'searchEngine',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['addTasks'],
			},
		},
		default: 'google',
		placeholder: 'google',
		description:
			'Search engine name (e.g., google, bing). See "Supported Engine IDs by Country" in docs — classic uses engine names like "google".',
	},
	{
		displayName: 'Device',
		name: 'device',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['addTasks'],
			},
		},
		options: [
			{ name: 'Desktop', value: 'desktop' },
			{ name: 'Mobile', value: 'mobile' },
			{ name: 'Tablet', value: 'tablet' },
		],
		default: 'desktop',
		description: 'Search device type (desktop, mobile, tablet).',
	},
	{
		displayName: 'Language Code',
		name: 'languageCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['addTasks'],
			},
		},
		default: 'en',
		placeholder: 'en',
		description: 'Language code for the search results (e.g., en, fr).',
	},
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['addTasks'],
			},
		},
		default: 0,
		placeholder: '31808',
		description:
			'Location identifier (integer) — retrieve IDs from the Get Locations endpoint.',
	},
	{
		displayName: 'Keywords',
		name: 'keywords',
		type: 'string',
		typeOptions: {
			rows: 6,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['addTasks'],
			},
		},
		default: '',
		placeholder: 'avocado\ninterstellar',
		description: 'Keywords — one per line or comma-separated. Max 1,000 keywords; each ≤ 255 chars.',
	},
	{
		displayName: 'Optional: Tag',
		name: 'tag',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['addTasks'],
			},
		},
		default: '',
		placeholder: 'campaign-1',
		description: 'Optional: tag to group tasks.',
	},
	// Pingback (webhook)
	{
		displayName: 'Pingback URL',
		name: 'pingbackUrl',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['addTasks'],
			},
		},
		default: '',
		placeholder: 'https://your-n8n.com/webhook/serp-callback?id=$id&tag=$tag',
		description:
			'Optional: URL to receive GET notification when task completes. Use $id and $tag as placeholders. System substitutes actual values upon completion.',
	},

	// Get Results (standard)
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['getResults'],
			},
		},
		default: '',
		placeholder: '14',
		description: 'Task ID returned by Add Tasks. Example: 14',
	},

	// List Tasks (no params required in API, but allow optional filters)
	{
		displayName: 'List Filters',
		name: 'listFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['listTasks'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Max tasks to return (UI-level).',
				typeOptions: { minValue: 1, maxValue: 1000 },
			},
		],
	},

	// Get Advanced Results
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['getAdvancedResults'],
			},
		},
		default: '',
		placeholder: '14',
		description:
			'Task ID to fetch advanced results for. The advanced results endpoint expects a single task_id parameter.',
	},

	// Get Locations
	{
		displayName: 'Country Code',
		name: 'countryCode',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['getLocations'],
			},
		},
		default: '',
		placeholder: 'US',
		description: 'Filter by country code (optional).',
	},
	{
		displayName: 'Query (city / name)',
		name: 'q',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['serpClassic'],
				operation: ['getLocations'],
			},
		},
		default: '',
		placeholder: 'New York',
		description: 'Partial match parameter for location name (optional).',
	},
];
