import { INodeProperties } from 'n8n-workflow';

export const keywordGroupsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['keywordGroups'],
			},
		},
		options: [
			{
				name: 'Add Group',
				value: 'addGroup',
				description: 'Create a new keyword group for a project',
				action: 'Add keyword group',
			},
			{
				name: 'Delete Group',
				value: 'deleteGroup',
				description: 'Delete a keyword group',
				action: 'Delete keyword group',
			},
			{
				name: 'List Groups',
				value: 'listGroups',
				description: 'List all keyword groups for a project',
				action: 'List keyword groups',
			},
			{
				name: 'Move Keywords',
				value: 'moveKeywords',
				description: 'Move keywords to another group',
				action: 'Move keywords to group',
			},
			{
				name: 'Rename Group',
				value: 'renameGroup',
				description: 'Rename an existing keyword group',
				action: 'Rename keyword group',
			},
		],
		default: 'listGroups',
	},
];

export const keywordGroupsFields: INodeProperties[] = [
	// ─── Site ID (addGroup, listGroups) ──────────────────────────────────────
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['keywordGroups'],
				operation: ['addGroup', 'listGroups'],
			},
		},
		default: 0,
		description: 'Unique project (site) ID',
	},

	// ─── Group ID (moveKeywords, renameGroup, deleteGroup) ──────────────────
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['keywordGroups'],
				operation: ['moveKeywords', 'renameGroup', 'deleteGroup'],
			},
		},
		default: 0,
		description: 'Keyword group ID',
	},

	// ─── Group Name (addGroup) ──────────────────────────────────────────────
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keywordGroups'],
				operation: ['addGroup'],
			},
		},
		default: '',
		placeholder: 'My Keyword Group',
		description: 'Name of the keyword group to create',
	},

	// ─── New Group Name (renameGroup) ───────────────────────────────────────
	{
		displayName: 'New Group Name',
		name: 'groupName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keywordGroups'],
				operation: ['renameGroup'],
			},
		},
		default: '',
		placeholder: 'Updated Group Name',
		description: 'New name for the keyword group',
	},

	// ─── Keyword IDs (moveKeywords) ─────────────────────────────────────────
	{
		displayName: 'Keyword IDs',
		name: 'keywordIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keywordGroups'],
				operation: ['moveKeywords'],
			},
		},
		default: '',
		placeholder: '1,2,3,4,5',
		description: 'Comma-separated list of keyword IDs to move',
	},
];
