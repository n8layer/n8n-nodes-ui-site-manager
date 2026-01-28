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
						qs: {
							pageSize: '={{ $parameter.additionalFields?.pageSize }}',
							nextToken: '={{ $parameter.additionalFields?.nextToken }}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedHosts: '={{ $parameter.options?.splitIntoItems ? $response.body.data : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedHosts',
								},
							},
						],
					},
				},
			},
		],
		default: 'listHosts',
	},
];

export const hostFields: INodeProperties[] = [
	// Get Host by ID Fields
	{
		displayName: 'Host ID',
		name: 'hostId',
		type: 'string',
		required: true,
		default: '',
		description: 'Unique identifier of the host device',
		displayOptions: {
			show: {
				operation: ['getHostById'],
			},
		},
	},

	// List Hosts Options
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['host'],
				operation: ['listHosts'],
			},
		},
		options: [
			{
				displayName: 'Split Into Items',
				name: 'splitIntoItems',
				type: 'boolean',
				default: false,
				description: 'Whether to split each host into its own item. When enabled, each host from the data array becomes a separate item for easier processing.',
			},
		],
	},

	// List Hosts Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['listHosts'],
			},
		},
		options: [
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'string',
				default: '',
				description: 'Number of items to return per page',
			},
			{
				displayName: 'Next Token',
				name: 'nextToken',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Token for pagination to retrieve the next set of results',
			},
		],
	},
];
