import { dccIntegrations, renderControlGuide } from '../.vitepress/dcc-integrations.mts'

export default {
  paths: () => dccIntegrations.map((integration) => ({
    params: {
      dcc: integration.slug,
      title: integration.dccType ? `${integration.name} MCP and CLI — control ${integration.name} with AI` : `How to control ${integration.name} with AI`,
      description: integration.dccType ? `Use the DCC-MCP ${integration.name} MCP adapter and dcc-mcp-cli to control ${integration.name} through typed tools, safe discovery, and result validation.` : `Use DCC-MCP to control ${integration.name} with an AI agent through typed tools, safe discovery, and result validation.`,
    },
    content: renderControlGuide(integration, 'en'),
  })),
}
