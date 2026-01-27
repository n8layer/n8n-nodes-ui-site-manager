import { INodeProperties } from 'n8n-workflow';

export const hostOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['host'],
			},
		},
		options: [
			{
				name: 'Get Host by ID',
				value: 'getHostById',
				description: 'Get a host by its ID',
				action: 'Get host by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/hosts/{{$parameter.hostId}}',
					},
				},
			},
			{
				name: 'List Hosts',
				value: 'listHosts',
				description: 'List all hosts',
				action: 'List hosts',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/hosts',
					},
				},
			},
		],
		default: 'listHosts',
	},
];

export const hostFields: INodeProperties[] = [
	// Fields for host operations will go here
	{
		displayName: 'Host ID',
		name: 'hostId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['getHostById'],
			},
		},
	},
];
