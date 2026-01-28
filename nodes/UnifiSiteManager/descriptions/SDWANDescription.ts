import { INodeProperties } from 'n8n-workflow';

export const sdwanOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sdwan'],
			},
		},
		options: [
			{
				name: 'Get SD-WAN Config by ID',
				value: 'getSDWANConfigById',
				description: 'Get a SD-WAN configuration by its ID',
				action: 'Get SD-WAN config by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/sd-wan-configs/{{$parameter.configId}}',
					},
				},
			},
			{
				name: 'Get SD-WAN Config Status',
				value: 'getSDWANConfigStatus',
				description: 'Get the status of a SD-WAN configuration by its ID',
				action: 'Get SD-WAN config status',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/sd-wan-configs/{{$parameter.configId}}/status',
					},
				},
			},
			{
				name: 'List SD-WAN Configs',
				value: 'listSDWANConfigs',
				description: 'List all SD-WAN configurations',
				action: 'List SD-WAN configs',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/sd-wan-configs',
					},
				},
			},
		],
		default: 'listSDWANConfigs',
	},
];

export const sdwanFields: INodeProperties[] = [
	// Config ID Field (used by getSDWANConfigById and getSDWANConfigStatus)
	{
		displayName: 'Config ID',
		name: 'configId',
		type: 'string',
		required: true,
		default: '',
		description: 'Unique identifier of the SD-WAN configuration',
		displayOptions: {
			show: {
				operation: ['getSDWANConfigById', 'getSDWANConfigStatus'],
			},
		},
	},
];
