import { INodeProperties } from 'n8n-workflow';

export const projectGroupsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['projectGroups'],
			},
		},
		options: [
			{
				name: 'Add Group',
				value: 'addGroup',
				description: 'Add a new project group to the account',
				action: 'Add project group',
			},
			{
				name: 'Rename Group',
				value: 'renameGroup',
				description: 'Rename an existing project group',
				action: 'Rename project group',
			},
			{
				name: 'Delete Group',
				value: 'deleteGroup',
				description: 'Delete a project group from the account',
				action: 'Delete project group',
			},
			{
				name: 'List Groups',
				value: 'listGroups',
				description: 'List all project groups in the account',
				action: 'List project groups',
			},
			{
				name: 'Move Projects to Group',
				value: 'moveProjects',
				description: 'Transfer projects from one group to another',
				action: 'Move projects to group',
			},
		],
		default: 'listGroups',
	},
];

export const projectGroupsFields: INodeProperties[] = [
	// ─── Group Name (addGroup) ──────────────────────────────────────────────
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectGroups'],
				operation: ['addGroup'],
			},
		},
		default: '',
		placeholder: 'My Project Group',
		description: 'Name of the project group',
	},

	// ─── New Group Name (renameGroup) ───────────────────────────────────────
	{
		displayName: 'New Group Name',
		name: 'groupName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectGroups'],
				operation: ['renameGroup'],
			},
		},
		default: '',
		placeholder: 'My Renamed Group',
		description: 'New name for the project group',
	},

	// ─── Group ID (shared by renameGroup and deleteGroup) ────────────────────
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectGroups'],
				operation: ['renameGroup', 'deleteGroup', 'moveProjects'],
			},
		},
		default: 0,
		description: 'ID of the project group',
	},

	// ─── Site IDs (moveProjects) ────────────────────────────────────────────
	{
		displayName: 'Site IDs',
		name: 'siteIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectGroups'],
				operation: ['moveProjects'],
			},
		},
		default: '',
		placeholder: '1,2,3,4,5',
		description: 'Comma-separated list of project (site) IDs to move',
	},
];
