import { INodeProperties } from 'n8n-workflow';

export const ispMetricsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ispMetrics'],
			},
		},
		options: [
			{
				name: 'Get ISP Metrics',
				value: 'getISPMetrics',
				description: 'Retrieves ISP metrics data for all sites linked to the UI account\'s API key. 5-minute interval metrics are available for at least 24 hours, and 1-hour interval metrics are available for at least 30 days.',
				action: 'Get ISP metrics',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/isp-metrics/{{$parameter.type}}',
					},
				},
			},
			{
				name: 'Query ISP Metrics',
				value: 'queryISPMetrics',
				description: 'Retrieves ISP metrics data based on specific query parameters. 5-minute interval metrics are available for at least 24 hours, and 1-hour interval metrics are available for at least 30 days.',
				action: 'Query ISP metrics',
				routing: {
					request: {
						method: 'POST',
						url: '=/v1/isp-metrics/{{$parameter.type}}/query',
					},
				},
			},
		],
	default: 'getISPMetrics',
	},
];

export const ispMetricsFields: INodeProperties[] = [
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		default: '5min',
		description: 'Specifies whether metrics are returned using `5m` or `1h` intervals',
		required: true,
		displayOptions: {
			show: {
				operation: ['getISPMetrics'],
			},
		},
	},
];
