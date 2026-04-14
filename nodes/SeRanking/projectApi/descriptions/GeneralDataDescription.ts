import { INodeProperties } from 'n8n-workflow';

export const generalDataOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['generalData'],
			},
		},
		options: [
			{
				name: 'Get Keyword Search Volume',
				value: 'getKeywordVolume',
				description: 'Get search volume data for keywords in a specific region',
				action: 'Get keyword search volume',
			},
			{
				name: 'List Languages for Google',
				value: 'listGoogleLangs',
				description: 'Get a list of supported languages for Google',
				action: 'List languages for Google',
			},
			{
				name: 'List Search Engines',
				value: 'listSearchEngines',
				description: 'Get a list of available search engines with regions',
				action: 'List search engines',
			},
			{
				name: 'List Volume Regions',
				value: 'listVolumeRegions',
				description: 'Get all regions where keyword search volume checks are available',
				action: 'List volume regions',
			},
		],
		default: 'listSearchEngines',
	},
];

export const generalDataFields: INodeProperties[] = [
	// ─── Get Keyword Volume fields ──────────────────────────────────────────
	{
		displayName: 'Region ID',
		name: 'regionId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['generalData'],
				operation: ['getKeywordVolume'],
			},
		},
		default: 0,
		description: 'Region ID (use "List Volume Regions" to get available IDs)',
	},
	{
		displayName: 'Keywords',
		name: 'keywords',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['generalData'],
				operation: ['getKeywordVolume'],
			},
		},
		default: '',
		placeholder: 'keyword1,keyword2,keyword3',
		description: 'Comma-separated list of keywords (max 10)',
	},
];
