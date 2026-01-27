import {
	IAuthenticateGeneric,
	Icon,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UnifiSiteManagerApi implements ICredentialType {
	name = 'unifiSiteManagerApi';
	displayName = 'UniFi Site Manager API';
	icon = 'file:UnifiSiteManager.svg' as Icon;
	documentationUrl = 'https://developer.ui.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			required: true,
			description: 'Your UniFi Site Manager API key',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};
}
