import { INodeProperties } from 'n8n-workflow';

export const subAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
			},
		},
		options: [
			{
				name: 'Create Sub-Account',
				value: 'createSubAccount',
				description: 'Create a new sub-account',
				action: 'Create sub-account',
			},
			{
				name: 'Delete Sub-Account',
				value: 'deleteSubAccount',
				description: 'Delete a sub-account',
				action: 'Delete sub-account',
			},
			{
				name: 'Get Sub-Account Details',
				value: 'getSubAccount',
				description: 'Get extended information about a sub-account',
				action: 'Get sub-account details',
			},
			{
				name: 'List Owned Projects',
				value: 'listOwnedSites',
				description: 'Get website IDs owned by a sub-account',
				action: 'List owned projects',
			},
			{
				name: 'List Shared Projects',
				value: 'listSharedSites',
				description: 'Get website IDs shared with a sub-account',
				action: 'List shared projects',
			},
			{
				name: 'List Sub-Accounts',
				value: 'listSubAccounts',
				description: 'Get all sub-accounts',
				action: 'List sub-accounts',
			},
			{
				name: 'Share Projects',
				value: 'shareProjects',
				description: 'Share websites with a sub-account',
				action: 'Share projects',
			},
			{
				name: 'Update Sub-Account',
				value: 'updateSubAccount',
				description: 'Update an existing sub-account',
				action: 'Update sub-account',
			},
		],
		default: 'listSubAccounts',
	},
];

export const subAccountFields: INodeProperties[] = [
	// ─── Sub-Account ID (most operations) ──────────────────────────────────
	{
		displayName: 'Sub-Account ID',
		name: 'subAccountId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['getSubAccount', 'deleteSubAccount', 'updateSubAccount', 'listSharedSites', 'listOwnedSites', 'shareProjects'],
			},
		},
		default: 0,
		description: 'Unique sub-account ID',
	},

	// ─── List Sub-Accounts additional fields ───────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['listSubAccounts'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Number of records per page',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of records to skip for pagination',
			},
		],
	},

	// ─── Create Sub-Account fields ─────────────────────────────────────────
	{
		displayName: 'Email',
		name: 'accountEmail',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		placeholder: 'user@example.com',
		description: 'Sub-account email address',
	},
	{
		displayName: 'First Name',
		name: 'accountFirstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'Sub-account first name',
	},
	{
		displayName: 'Password',
		name: 'accountPassword',
		type: 'string',
		typeOptions: { password: true },
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'Sub-account password',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		options: [
			{
				displayName: 'Last Name',
				name: 'accountLastName',
				type: 'string',
				default: '',
				description: 'Sub-account last name',
			},
			{
				displayName: 'Language',
				name: 'accountLang',
				type: 'string',
				default: '',
				placeholder: 'en',
				description: 'Account language (ISO 639-1 alpha-2)',
			},
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'options',
				options: [
					{ name: 'User', value: 'user' },
					{ name: 'Client', value: 'client' },
				],
				default: 'user',
				description: 'Sub-account type',
			},
			{
				displayName: 'Balance Limit Period',
				name: 'balancePeriod',
				type: 'options',
				options: [
					{ name: 'Day', value: 'day' },
					{ name: 'Week', value: 'week' },
					{ name: 'Month', value: 'month' },
				],
				default: 'day',
				description: 'Limit period for balance',
			},
			{
				displayName: 'Balance Limit Amount',
				name: 'balanceAmount',
				type: 'number',
				default: 0,
				description: 'Monetary limit value',
			},
			{
				displayName: 'Access Permissions',
				name: 'access',
				type: 'string',
				default: '',
				placeholder: 'add_website,audit_settings,report_manual',
				description: 'Comma-separated permission codes',
			},
		],
	},

	// ─── Update Sub-Account fields ─────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['updateSubAccount'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'accountEmail',
				type: 'string',
				default: '',
				description: 'Sub-account email',
			},
			{
				displayName: 'First Name',
				name: 'accountFirstName',
				type: 'string',
				default: '',
				description: 'Sub-account first name',
			},
			{
				displayName: 'Last Name',
				name: 'accountLastName',
				type: 'string',
				default: '',
				description: 'Sub-account last name',
			},
			{
				displayName: 'Password',
				name: 'accountPassword',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Sub-account password',
			},
			{
				displayName: 'Language',
				name: 'accountLang',
				type: 'string',
				default: '',
				placeholder: 'en',
				description: 'Account language (ISO 639-1 alpha-2)',
			},
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'options',
				options: [
					{ name: 'User', value: 'user' },
					{ name: 'Client', value: 'client' },
				],
				default: 'user',
				description: 'Sub-account type',
			},
			{
				displayName: 'Balance Limit Period',
				name: 'balancePeriod',
				type: 'options',
				options: [
					{ name: 'Day', value: 'day' },
					{ name: 'Week', value: 'week' },
					{ name: 'Month', value: 'month' },
				],
				default: 'day',
				description: 'Limit period for balance',
			},
			{
				displayName: 'Balance Limit Amount',
				name: 'balanceAmount',
				type: 'number',
				default: 0,
				description: 'Monetary limit value',
			},
			{
				displayName: 'Access Permissions',
				name: 'access',
				type: 'string',
				default: '',
				placeholder: 'add_website,audit_settings,report_manual',
				description: 'Comma-separated permission codes (replaces existing permissions)',
			},
		],
	},

	// ─── Share Projects fields ──────────────────────────────────────────────
	{
		displayName: 'Site IDs',
		name: 'siteIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['shareProjects'],
			},
		},
		default: '',
		placeholder: '39,42,55',
		description: 'Comma-separated website IDs to share with the sub-account',
	},
];
