import { INodeProperties } from 'n8n-workflow';

export const backlinkCheckerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
			},
		},
		options: [
			{
				name: 'Add Backlink',
				value: 'addBacklink',
				description: 'Add a single backlink to monitor',
				action: 'Add backlink',
			},
			{
				name: 'Add Disavowed Backlinks',
				value: 'addDisavowed',
				description: 'Add backlink URLs to the disavow list',
				action: 'Add disavowed backlinks',
			},
			{
				name: 'Create Backlink Group',
				value: 'createGroup',
				description: 'Create a new backlink group',
				action: 'Create backlink group',
			},
			{
				name: 'Delete Backlink Group',
				value: 'deleteGroup',
				description: 'Delete a backlink group',
				action: 'Delete backlink group',
			},
			{
				name: 'Delete Backlinks',
				value: 'deleteBacklinks',
				description: 'Delete multiple backlinks',
				action: 'Delete backlinks',
			},
			{
				name: 'Delete Disavowed Backlink',
				value: 'deleteDisavowed',
				description: 'Delete a disavowed backlink',
				action: 'Delete disavowed backlink',
			},
			{
				name: 'Get Backlink Statistics',
				value: 'getStats',
				description: 'Get backlink statistics for a site',
				action: 'Get backlink statistics',
			},
			{
				name: 'Get GSC Import Status',
				value: 'getGscImportStatus',
				description: 'Get status of a Google Search Console backlink import',
				action: 'Get GSC import status',
			},
			{
				name: 'Import Backlinks List',
				value: 'importList',
				description: 'Import a list of backlink URLs',
				action: 'Import backlinks list',
			},
			{
				name: 'List Backlink Groups',
				value: 'listGroups',
				description: 'Get all backlink groups for a site',
				action: 'List backlink groups',
			},
			{
				name: 'List Backlinks',
				value: 'listBacklinks',
				description: 'Get backlinks for a site',
				action: 'List backlinks',
			},
			{
				name: 'List Disavowed Backlinks',
				value: 'listDisavowed',
				description: 'Get disavowed backlinks for a site',
				action: 'List disavowed backlinks',
			},
			{
				name: 'Move Backlinks to Group',
				value: 'moveToGroup',
				description: 'Move backlinks to a specific group',
				action: 'Move backlinks to group',
			},
			{
				name: 'Recheck Backlinks',
				value: 'recheckBacklinks',
				description: 'Trigger a recheck of specific backlinks',
				action: 'Recheck backlinks',
			},
			{
				name: 'Rename Backlink Group',
				value: 'renameGroup',
				description: 'Rename a backlink group',
				action: 'Rename backlink group',
			},
			{
				name: 'Start GSC Import',
				value: 'startGscImport',
				description: 'Start importing backlinks from Google Search Console',
				action: 'Start GSC import',
			},
			{
				name: 'Update Import Settings',
				value: 'updateImportSettings',
				description: 'Enable or disable automatic GSC import',
				action: 'Update import settings',
			},
		],
		default: 'listBacklinks',
	},
];

export const backlinkCheckerFields: INodeProperties[] = [
	// ─── Site ID (all operations) ───────────────────────────────────────────
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
			},
		},
		default: 0,
		description: 'Unique website ID',
	},

	// ─── List Backlinks additional fields ───────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['listBacklinks'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of backlinks to return (max 1000)',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of backlinks to skip',
			},
		],
	},

	// ─── Add Backlink fields ────────────────────────────────────────────────
	{
		displayName: 'Backlink URL',
		name: 'backlinkUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['addBacklink'],
			},
		},
		default: '',
		placeholder: 'https://example.com/link',
		description: 'URL of the backlink to add',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['addBacklink'],
			},
		},
		options: [
			{
				displayName: 'Price',
				name: 'price',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0,
				description: 'Backlink price',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				placeholder: 'USD',
				description: 'Currency code (ISO 4217)',
			},
			{
				displayName: 'Charge Period',
				name: 'chargePeriod',
				type: 'options',
				options: [
					{ name: 'One Time', value: 'onetime' },
					{ name: 'Monthly', value: 'monthly' },
					{ name: 'Quarterly', value: 'quarterly' },
					{ name: '6 Months', value: '6months' },
					{ name: 'Yearly', value: 'year' },
				],
				default: 'onetime',
				description: 'Charging period',
			},
			{
				displayName: 'Charge Start',
				name: 'chargeStart',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Payment start date',
			},
		],
	},

	// ─── Import Backlinks List fields ───────────────────────────────────────
	{
		displayName: 'Backlink URLs',
		name: 'backlinkUrls',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['importList'],
			},
		},
		default: '',
		placeholder: 'https://example.com/link1,https://example.com/link2',
		description: 'Comma-separated list of backlink URLs to import',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['importList'],
			},
		},
		options: [
			{
				displayName: 'Price',
				name: 'price',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0,
				description: 'Backlink price',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				placeholder: 'USD',
				description: 'Currency code (ISO 4217)',
			},
			{
				displayName: 'Charge Period',
				name: 'chargePeriod',
				type: 'options',
				options: [
					{ name: 'One Time', value: 'onetime' },
					{ name: 'Monthly', value: 'monthly' },
					{ name: 'Quarterly', value: 'quarterly' },
					{ name: '6 Months', value: '6months' },
					{ name: 'Yearly', value: 'year' },
				],
				default: 'onetime',
				description: 'Charging period',
			},
			{
				displayName: 'Charge Start',
				name: 'chargeStart',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Payment start date',
			},
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'number',
				default: 0,
				description: 'Backlink group ID',
			},
			{
				displayName: 'Manager',
				name: 'manager',
				type: 'string',
				default: '',
				description: 'Manager name associated with the backlinks',
			},
		],
	},

	// ─── Update Import Settings fields ──────────────────────────────────────
	{
		displayName: 'GSC Auto Import',
		name: 'gscAutoimport',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['updateImportSettings'],
			},
		},
		default: false,
		description: 'Whether to enable automatic import from Google Search Console',
	},

	// ─── GSC Import Status fields ───────────────────────────────────────────
	{
		displayName: 'Import Token',
		name: 'importToken',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['getGscImportStatus'],
			},
		},
		default: '',
		description: 'Import task token returned from Start GSC Import',
	},

	// ─── Delete Backlinks fields ────────────────────────────────────────────
	{
		displayName: 'Backlink IDs',
		name: 'backlinkIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['deleteBacklinks'],
			},
		},
		default: '',
		placeholder: '1,2,3',
		description: 'Comma-separated backlink IDs to delete',
	},

	// ─── Recheck Backlinks fields ───────────────────────────────────────────
	{
		displayName: 'Backlink IDs',
		name: 'backlinkIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['recheckBacklinks'],
			},
		},
		default: '',
		placeholder: '1,2,3',
		description: 'Comma-separated backlink IDs to recheck',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['recheckBacklinks'],
			},
		},
		options: [
			{
				displayName: 'Recheck Type',
				name: 'recheckType',
				type: 'options',
				options: [
					{ name: 'Status', value: 'status' },
					{ name: 'Index', value: 'index' },
				],
				default: 'status',
				description: 'Type of recheck to perform',
			},
		],
	},

	// ─── List Disavowed additional fields ───────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['listDisavowed'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of disavowed backlinks to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Offset for pagination',
			},
		],
	},

	// ─── Add Disavowed fields ───────────────────────────────────────────────
	{
		displayName: 'Disavow URLs',
		name: 'disavowUrls',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['addDisavowed'],
			},
		},
		default: '',
		placeholder: 'https://spam.com/link1,https://spam.com/link2',
		description: 'Comma-separated backlink URLs to disavow',
	},

	// ─── Delete Disavowed fields ────────────────────────────────────────────
	{
		displayName: 'Disavowed Backlink ID',
		name: 'disavowId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['deleteDisavowed'],
			},
		},
		default: 0,
		description: 'ID of the disavowed backlink to delete',
	},

	// ─── Create Group fields ────────────────────────────────────────────────
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['createGroup'],
			},
		},
		default: '',
		description: 'Name of the backlink group to create',
	},

	// ─── Delete Group fields ────────────────────────────────────────────────
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['deleteGroup'],
			},
		},
		default: 0,
		description: 'Backlink group ID to delete',
	},

	// ─── Rename Group fields ────────────────────────────────────────────────
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['renameGroup'],
			},
		},
		default: 0,
		description: 'Backlink group ID to rename',
	},
	{
		displayName: 'New Group Name',
		name: 'newGroupName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['renameGroup'],
			},
		},
		default: '',
		description: 'New name for the backlink group',
	},

	// ─── Move to Group fields ───────────────────────────────────────────────
	{
		displayName: 'Target Group ID',
		name: 'targetGroupId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['moveToGroup'],
			},
		},
		default: 0,
		description: 'Destination backlink group ID to move backlinks/groups into',
	},
	{
		displayName: 'Backlink IDs',
		name: 'backlinkIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['moveToGroup'],
			},
		},
		default: '',
		placeholder: '1,2,3',
		description: 'Comma-separated backlink IDs to move. At least one of Backlink IDs or Group IDs must be provided.',
	},
	{
		displayName: 'Group IDs',
		name: 'groupIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['backlinkChecker'],
				operation: ['moveToGroup'],
			},
		},
		default: '',
		placeholder: '1,2,3',
		description: 'Comma-separated backlink group IDs to move. At least one of Backlink IDs or Group IDs must be provided.',
	},
];
