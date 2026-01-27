import { INodeProperties } from 'n8n-workflow';

export const siteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['site'],
			},
		},
		options: [
			{
				name: 'List Devices',
				value: 'listDevices',
				description: 'List all devices',
				action: 'List devices',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/devices',
					},
				},
			},
			{
				name: 'List Sites',
				value: 'listSites',
				description: 'List all sites',
				action: 'List sites',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/sites',
					},
				},
			},
		],
		default: 'listSites',
	},
];

export const siteFields: INodeProperties[] = [
	// Fields for site operations will go here
];
