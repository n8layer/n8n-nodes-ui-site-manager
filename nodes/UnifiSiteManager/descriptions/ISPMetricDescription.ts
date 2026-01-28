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
						qs: {
							beginTimestamp: '={{ $parameter.additionalFields?.beginTimestamp }}',
							endTimestamp: '={{ $parameter.additionalFields?.endTimestamp }}',
							duration: '={{ $parameter.additionalFields?.duration }}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedMetrics: '={{ $parameter.options?.splitIntoItems ? $response.body.data : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedMetrics',
								},
							},
						],
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
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedMetrics: '={{ $parameter.options?.splitIntoItems ? $response.body.data : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedMetrics',
								},
							},
						],
					},
				},
			},
		],
	default: 'getISPMetrics',
	},
];

export const ispMetricsFields: INodeProperties[] = [
	// Common Fields
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{
				name: '5 Minutes',
				value: '5m',
			},
			{
				name: '1 Hour',
				value: '1h',
			},
		],
		default: '5m',
		description: 'Specifies whether metrics are returned using 5-minute or 1-hour intervals',
		required: true,
		displayOptions: {
			show: {
				operation: ['getISPMetrics', 'queryISPMetrics'],
			},
		},
	},

	// Get ISP Metrics Options
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['ispMetrics'],
				operation: ['getISPMetrics'],
			},
		},
		options: [
			{
				displayName: 'Split Into Items',
				name: 'splitIntoItems',
				type: 'boolean',
				default: false,
				description: 'Whether to split each metric into its own item. When enabled, each metric from the data array becomes a separate item for easier processing.',
			},
		],
	},

	// Query ISP Metrics Options
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['ispMetrics'],
				operation: ['queryISPMetrics'],
			},
		},
		options: [
			{
				displayName: 'Split Into Items',
				name: 'splitIntoItems',
				type: 'boolean',
				default: false,
				description: 'Whether to split each metric into its own item. When enabled, each metric from the data array becomes a separate item for easier processing.',
			},
		],
	},

	// Get ISP Metrics Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['getISPMetrics'],
			},
		},
		options: [
			{
				displayName: 'Begin Timestamp',
				name: 'beginTimestamp',
				type: 'string',
				default: '',
				description: 'The earliest timestamp to retrieve data from (RFC3339 format, e.g., 2024-01-01T00:00:00Z)',
			},
			{
				displayName: 'End Timestamp',
				name: 'endTimestamp',
				type: 'string',
				default: '',
				description: 'The latest timestamp to retrieve data up to (RFC3339 format, e.g., 2024-01-01T23:59:59Z)',
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'string',
				default: '',
				description: 'Specifies the time range of metrics to retrieve, starting from when the request is made (e.g., 24h, 7d)',
			},
		],
	},

	// Query ISP Metrics Fields
	{
		displayName: 'Sites',
		name: 'sites',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Site',
		description: 'Sites to query ISP metrics for',
		required: true,
		displayOptions: {
			show: {
				resource: ['ispMetrics'],
				operation: ['queryISPMetrics'],
			},
		},
		options: [
			{
				name: 'siteValues',
				displayName: 'Site',
				values: [
					{
						displayName: 'Host ID',
						name: 'hostId',
						type: 'string',
						default: '',
						required: true,
						description: 'Unique identifier of the host device',
					},
					{
						displayName: 'Site ID',
						name: 'siteId',
						type: 'string',
						default: '',
						required: true,
						description: 'Unique identifier of the site',
					},
					{
						displayName: 'Begin Timestamp',
						name: 'beginTimestamp',
						type: 'string',
						default: '',
						description: 'Starting point for metrics retrieval (RFC3339 format, e.g., 2024-01-01T00:00:00Z)',
					},
					{
						displayName: 'End Timestamp',
						name: 'endTimestamp',
						type: 'string',
						default: '',
						description: 'Ending point for metrics retrieval (RFC3339 format, e.g., 2024-01-01T23:59:59Z)',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'sites',
				value: '={{ $value.siteValues }}',
			},
		},
	},
];
