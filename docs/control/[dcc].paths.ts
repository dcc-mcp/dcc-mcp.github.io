import { dccIntegrations, renderControlGuide } from '../.vitepress/dcc-integrations.mts'

export default {
  paths: () => dccIntegrations.map((integration) => ({
    params: {
      dcc: integration.slug,
      title: `How to control ${integration.name} with AI`,
      description: `Use DCC-MCP to control ${integration.name} with an AI agent through typed tools, safe discovery, and result validation.`,
    },
    content: renderControlGuide(integration, 'en'),
  })),
}
