import { dccIntegrations, renderControlGuide } from '../.vitepress/dcc-integrations.mts'

export default {
  paths: () => dccIntegrations.map((integration) => ({
    params: {
      dcc: integration.slug,
      title: integration.dccType ? `${integration.name} MCP and CLI — control ${integration.name} with AI` : `How to control ${integration.name} with AI`,
      description: integration.slug === 'comfyui'
        ? 'Use ComfyUI MCP to choose local game UI, transparent PNG and PBR GLB recipes, including Pixal3D, with hardware guidance, node checks and artifact delivery.'
        : integration.dccType ? `Use the DCC-MCP ${integration.name} MCP adapter and dcc-mcp-cli to control ${integration.name} through typed tools, safe discovery, and result validation.` : `Use DCC-MCP to control ${integration.name} with an AI agent through typed tools, safe discovery, and result validation.`,
    },
    content: renderControlGuide(integration, 'en'),
  })),
}
