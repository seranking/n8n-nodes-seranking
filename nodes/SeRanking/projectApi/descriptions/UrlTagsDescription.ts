import { INodeProperties } from 'n8n-workflow';

export const urlTagsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['urlTags'],
			},
		},
		options: [
			{
				name: 'Add Tag',
				value: 'addTag',
				description: 'Create a tag and optionally attach to URLs/domains',
				action: 'Add tag',
			},
			{
				name: 'Delete Tag',
				value: 'deleteTag',
				description: 'Delete a tag from a site',
				action: 'Delete tag',
			},
			{
				name: 'List Tags',
				value: 'listTags',
				description: 'List all landing page tags for a site',
				action: 'List tags',
			},
			{
				name: 'Update Tag Assignment',
				value: 'updateAssignment',
				description: 'Assign tags to URLs and/or domains (replaces existing assignments)',
				action: 'Update tag assignment',
			},
		],
		default: 'listTags',
	},
];

export const urlTagsFields: INodeProperties[] = [
	// ─── Site ID (all operations) ───────────────────────────────────────────
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['urlTags'],
			},
		},
		default: 0,
		description: 'Unique project (site) ID',
	},

	// ─── Tag ID (deleteTag) ─────────────────────────────────────────────────
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['urlTags'],
				operation: ['deleteTag'],
			},
		},
		default: 0,
		description: 'Tag ID to delete',
	},

	// ─── ADD TAG fields ─────────────────────────────────────────────────────
	{
		displayName: 'Tag Name',
		name: 'tagName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['urlTags'],
				operation: ['addTag'],
			},
		},
		default: '',
		placeholder: 'my-tag',
		description: 'Name of the tag to create',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['urlTags'],
				operation: ['addTag'],
			},
		},
		options: [
			{
				displayName: 'URLs',
				name: 'urls',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/page1,https://example.com/page2',
				description: 'Comma-separated list of URLs to attach the tag to',
			},
			{
				displayName: 'Domains',
				name: 'domains',
				type: 'string',
				default: '',
				placeholder: 'example.com,test.com',
				description: 'Comma-separated list of domains to attach the tag to',
			},
		],
	},

	// ─── UPDATE ASSIGNMENT fields ───────────────────────────────────────────
	{
		displayName: 'Tag IDs',
		name: 'tagIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['urlTags'],
				operation: ['updateAssignment'],
			},
		},
		default: '',
		placeholder: '1,2,3',
		description: 'Comma-separated tag IDs to assign',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['urlTags'],
				operation: ['updateAssignment'],
			},
		},
		options: [
			{
				displayName: 'URLs',
				name: 'urls',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/page1,https://example.com/page2',
				description: 'Comma-separated list of URLs to update',
			},
			{
				displayName: 'Domains',
				name: 'domains',
				type: 'string',
				default: '',
				placeholder: 'example.com,test.com',
				description: 'Comma-separated list of domains to update',
			},
		],
	},
];
