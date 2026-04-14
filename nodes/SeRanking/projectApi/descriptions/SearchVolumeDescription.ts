import { INodeProperties } from 'n8n-workflow';

export const searchVolumeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['searchVolume'],
			},
		},
		options: [
			{
				name: 'Create Volume Check',
				value: 'createVolumeCheck',
				description: 'Submit a request to check keyword search volume',
				action: 'Create volume check',
			},
			{
				name: 'Delete Volume Check',
				value: 'deleteVolumeCheck',
				description: 'Delete a search volume check request',
				action: 'Delete volume check',
			},
			{
				name: 'Get Volume Check Results',
				value: 'getVolumeResults',
				description: 'Get results of a search volume check',
				action: 'Get volume check results',
			},
			{
				name: 'List Volume Checks',
				value: 'listVolumeChecks',
				description: 'Get all search volume check requests',
				action: 'List volume checks',
			},
		],
		default: 'listVolumeChecks',
	},
];

export const searchVolumeFields: INodeProperties[] = [
	// ─── Keywords (createVolumeCheck) ───────────────────────────────────────
	{
		displayName: 'Keywords',
		name: 'keywords',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['searchVolume'],
				operation: ['createVolumeCheck'],
			},
		},
		default: '',
		placeholder: 'keyword1,keyword2',
		description: 'Comma-separated keywords to check search volume for (1 keyword = $0.005, 2-700 = $0.2)',
	},

	// ─── Task ID (getVolumeResults, deleteVolumeCheck) ──────────────────────
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['searchVolume'],
				operation: ['getVolumeResults', 'deleteVolumeCheck'],
			},
		},
		default: 0,
		description: 'Unique search volume check request ID',
	},
];
