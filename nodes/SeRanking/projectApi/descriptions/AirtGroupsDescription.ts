import { INodeProperties } from 'n8n-workflow';

export const airtGroupsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['airtGroups'],
			},
		},
		options: [
			{
				name: 'Change Group Order',
				value: 'changeGroupOrder',
				description: 'Move a group to a new position in the site group order',
				action: 'Change prompt group order',
			},
			{
				name: 'Create Prompt Group',
				value: 'createPromptGroup',
				description: 'Create a new prompt group for a site',
				action: 'Create prompt group',
			},
			{
				name: 'Delete All Prompts in Group',
				value: 'deleteAllPromptsInGroup',
				description: 'Remove every prompt currently assigned to the group (group itself is kept)',
				action: 'Delete all prompts in group',
			},
			{
				name: 'Delete Prompt Group',
				value: 'deletePromptGroup',
				description: 'Delete a prompt group; its prompts move to the default group',
				action: 'Delete prompt group',
			},
			{
				name: 'List Prompt Groups',
				value: 'listPromptGroups',
				description: 'List prompt groups for a site, optionally filtered by LLM engine',
				action: 'List prompt groups',
			},
			{
				name: 'Move All Prompts Between Groups',
				value: 'moveAllPromptsBetweenGroups',
				description: 'Move every prompt from one group to another',
				action: 'Move all prompts between groups',
			},
			{
				name: 'Move Prompts to Group',
				value: 'movePromptsToGroup',
				description: 'Move a specific set of prompts into a target group',
				action: 'Move prompts to group',
			},
			{
				name: 'Rename Prompt Group',
				value: 'renamePromptGroup',
				description: 'Update the name of an existing prompt group',
				action: 'Rename prompt group',
			},
		],
		default: 'listPromptGroups',
	},
];

export const airtGroupsFields: INodeProperties[] = [
	// ─── Site ID (all operations) ──────────────────────────────────────────
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['airtGroups'],
			},
		},
		default: 0,
		description: 'Unique project (site) ID',
	},

	// ─── Group ID (single-group ops) ───────────────────────────────────────
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['airtGroups'],
				operation: [
					'renamePromptGroup',
					'deletePromptGroup',
					'changeGroupOrder',
					'deleteAllPromptsInGroup',
					'movePromptsToGroup',
				],
			},
		},
		default: 0,
		description: 'Prompt group ID',
	},

	// ─── Group Name (createPromptGroup) ────────────────────────────────────
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['airtGroups'],
				operation: ['createPromptGroup'],
			},
		},
		default: '',
		placeholder: 'Brand queries',
		description: 'Non-empty, max 255 characters, unique within the site',
	},

	// ─── New Group Name (renamePromptGroup) ────────────────────────────────
	{
		displayName: 'New Group Name',
		name: 'groupName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['airtGroups'],
				operation: ['renamePromptGroup'],
			},
		},
		default: '',
		placeholder: 'Updated group name',
		description: 'New name for the prompt group; non-empty, max 255 characters',
	},

	// ─── Change Group Order: Place Before ──────────────────────────────────
	{
		displayName: 'Place Before Group ID',
		name: 'beforeId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['airtGroups'],
				operation: ['changeGroupOrder'],
			},
		},
		default: 0,
		description: 'Place the group immediately before this neighbour. Provide exactly ONE of Before or After — leave the other at 0',
	},
	{
		displayName: 'Place After Group ID',
		name: 'afterId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['airtGroups'],
				operation: ['changeGroupOrder'],
			},
		},
		default: 0,
		description: 'Place the group immediately after this neighbour. Provide exactly ONE of Before or After — leave the other at 0',
	},

	// ─── Move Prompts: k2site_llm_ids ──────────────────────────────────────
	{
		displayName: 'Keyword-LLM Link IDs',
		name: 'k2siteLlmIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['airtGroups'],
				operation: ['movePromptsToGroup'],
			},
		},
		default: '',
		placeholder: '2164555,2164556,2164557',
		description: 'Comma-separated list of integer k2site_llm_id values (from List Prompts)',
	},

	// ─── Move All Prompts Between Groups ───────────────────────────────────
	{
		displayName: 'Source Group ID',
		name: 'fromGroupId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['airtGroups'],
				operation: ['moveAllPromptsBetweenGroups'],
			},
		},
		default: 0,
		description: 'Group whose prompts will be moved',
	},
	{
		displayName: 'Target Group ID',
		name: 'toGroupId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['airtGroups'],
				operation: ['moveAllPromptsBetweenGroups'],
			},
		},
		default: 0,
		description: 'Destination group; must differ from Source Group ID',
	},

	// ─── List Prompt Groups: optional filters ──────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['airtGroups'],
				operation: ['listPromptGroups'],
			},
		},
		options: [
			{
				displayName: 'Include Prompt Counts',
				name: 'keysCount',
				type: 'boolean',
				default: false,
				description: 'Whether to include keys_count on every group',
			},
			{
				displayName: 'Filter by Site LLM IDs',
				name: 'siteLlmIds',
				type: 'string',
				default: '',
				placeholder: '1130467,1130468',
				description: 'Comma-separated list of site_llm_id values to filter groups by',
			},
		],
	},
];
