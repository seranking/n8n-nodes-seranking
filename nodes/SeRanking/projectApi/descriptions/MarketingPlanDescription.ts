import { INodeProperties } from 'n8n-workflow';

export const marketingPlanOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
			},
		},
		options: [
			{
				name: 'Add Task',
				value: 'addTask',
				description: 'Create a new custom task in the marketing plan',
				action: 'Add task',
			},
			{
				name: 'Delete Task',
				value: 'deleteTask',
				description: 'Delete a custom task from the marketing plan',
				action: 'Delete task',
			},
			{
				name: 'List Plan Items',
				value: 'listPlanItems',
				description: 'Get marketing plan sections, items, and notes',
				action: 'List plan items',
			},
			{
				name: 'Set Task Status',
				value: 'setTaskStatus',
				description: 'Update the completion status of a task',
				action: 'Set task status',
			},
			{
				name: 'Update Task',
				value: 'updateTask',
				description: 'Update the name and description of a task',
				action: 'Update task',
			},
		],
		default: 'listPlanItems',
	},
];

export const marketingPlanFields: INodeProperties[] = [
	// ─── Site ID (all operations) ───────────────────────────────────────────
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
			},
		},
		default: 0,
		description: 'Unique site ID',
	},

	// ─── Add Task fields ───────────────────────────────────────────────────
	{
		displayName: 'Task Title',
		name: 'taskTitle',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
				operation: ['addTask'],
			},
		},
		default: '',
		description: 'Name of the task',
	},
	{
		displayName: 'Task Description',
		name: 'taskText',
		type: 'string',
		required: true,
		typeOptions: { rows: 4 },
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
				operation: ['addTask'],
			},
		},
		default: '',
		description: 'Description of the task',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
				operation: ['addTask'],
			},
		},
		options: [
			{
				displayName: 'For All Projects',
				name: 'forAll',
				type: 'boolean',
				default: false,
				description: 'Whether the task applies to all projects',
			},
		],
	},

	// ─── Update Task fields ────────────────────────────────────────────────
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
				operation: ['updateTask', 'setTaskStatus'],
			},
		},
		default: '',
		description: 'Unique task ID',
	},
	{
		displayName: 'Task Title',
		name: 'taskTitle',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
				operation: ['updateTask'],
			},
		},
		default: '',
		description: 'Updated task name',
	},
	{
		displayName: 'Task Description',
		name: 'taskText',
		type: 'string',
		required: true,
		typeOptions: { rows: 4 },
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
				operation: ['updateTask'],
			},
		},
		default: '',
		description: 'Updated task description',
	},

	// ─── Set Task Status fields ────────────────────────────────────────────
	{
		displayName: 'Checked',
		name: 'checked',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
				operation: ['setTaskStatus'],
			},
		},
		default: false,
		description: 'Whether the task is completed',
	},

	// ─── Delete Task fields ────────────────────────────────────────────────
	{
		displayName: 'Task ID',
		name: 'deleteTaskId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['marketingPlan'],
				operation: ['deleteTask'],
			},
		},
		default: 0,
		description: 'ID of the custom task to delete (only tasks created via Add Task can be deleted)',
	},
];
