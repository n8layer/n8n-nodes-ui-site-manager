import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

import { siteOperations, siteFields } from './descriptions/SiteDescription';
import { hostOperations, hostFields } from './descriptions/HostDescription';

export class UnifiSiteManager implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'UniFi Site Manager',
		name: 'unifiSiteManager',
		icon: 'fa:network-wired',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with UniFi Site Manager API',
		defaults: {
			name: 'UniFi Site Manager',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'unifiSiteManagerApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.ui.com',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Host',
						value: 'host',
					},
					{
						name: 'ISP Metric',
						value: 'ispMetrics',
					},
					{
						name: 'Site',
						value: 'site',
					},
				],
				default: 'site',
			},
			// Operations
			...siteOperations,
			...siteFields,
			...hostOperations,
			...hostFields,
		],
	};
}
