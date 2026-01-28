# n8n-nodes-ui-site-manager

This is an n8n community node. It lets you use UniFi Site Manager in your n8n workflows.

UniFi Site Manager is Ubiquiti's cloud-based management platform that provides centralized management and monitoring of UniFi network devices, sites, and infrastructure across multiple locations.

This node provides comprehensive operations for managing sites, hosts, devices, ISP metrics, and SD-WAN configurations through the UniFi Site Manager API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[API Version](#api-version)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Community node package name: `@n8layer/n8n-nodes-ui-site-manager`

## Operations

This node supports the following operations based on the UniFi Site Manager API v1.0.0:

### Site
- **List Sites**: Retrieve a list of all sites with optional pagination support
  - Optional parameters: pageSize, nextToken
- **List Devices**: Retrieve a list of UniFi devices managed by hosts
  - Optional parameters: hostIds (comma-separated), time (RFC3339 format), pageSize, nextToken

### Host
- **List Hosts**: Retrieve a list of all hosts in your deployment
  - Optional parameters: pageSize, nextToken
- **Get Host by ID**: Get detailed information about a specific host by its unique identifier
  - Required parameter: hostId

### ISP Metric
- **Get ISP Metrics**: Retrieve ISP metrics data for all sites linked to the API key
  - Required parameter: type (5m for 5-minute intervals or 1h for 1-hour intervals)
  - Optional parameters: beginTimestamp (RFC3339), endTimestamp (RFC3339), duration (e.g., 24h, 7d)
  - 5-minute interval metrics are available for at least 24 hours
  - 1-hour interval metrics are available for at least 30 days
- **Query ISP Metrics**: Retrieve ISP metrics data based on specific query parameters
  - Required parameter: type (5m or 1h)
  - Required body parameter: sites (JSON array with hostId, siteId, and optional timestamps)

### SD-WAN
- **List SD-WAN Configs**: Retrieve a list of all SD-WAN configurations
- **Get SD-WAN Config by ID**: Get detailed information about a specific SD-WAN configuration
  - Required parameter: configId
- **Get SD-WAN Config Status**: Get the current status of a specific SD-WAN configuration
  - Required parameter: configId

## Credentials

To use this node, you'll need to set up API credentials with UniFi. Here's how:

1. **Access your UI.com account**:
   - Log in to your [UI.com account](https://account.ui.com/)
   - Navigate to **API Settings** or **Developer Console**

2. **Generate API Token**:
   - Create a new API token with appropriate permissions
   - Copy the generated token securely

3. **In n8n**:
   - Create new credentials for "UniFi Site Manager API"
   - Enter the API Token from your UI.com account
   - The Base URL will default to: `https://api.ui.com`
   - Save the credentials

**Note**: Ensure your API token has the necessary permissions to access the resources and operations you intend to use. The API uses X-API-KEY header authentication.

## Compatibility

This node is compatible with n8n version 1.82.0 and above.

## API Version

This node is built for **UniFi Site Manager API v1.0.0**.

The API base URL is: `https://api.ui.com`

All endpoints use the `/v1/` prefix.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [UniFi](https://ui.com/)
* [UniFi Site Manager API Documentation](https://developer.ui.com/site-manager-api/)
* [Get ISP Metrics Documentation](https://developer.ui.com/site-manager-api/get-isp-metrics)
* [Query ISP Metrics Documentation](https://developer.ui.com/site-manager-api/queryispmetrics/)
* [UI.com Account Management](https://account.ui.com/)


