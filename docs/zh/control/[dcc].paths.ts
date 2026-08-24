import { dccIntegrations, renderControlGuide } from '../../.vitepress/dcc-integrations.mts'

export default {
  paths: () => dccIntegrations.map((integration) => ({
    params: {
      dcc: integration.slug,
      title: integration.dccType ? `${integration.name} MCP 与 CLI — 用 AI 控制 ${integration.name}` : `如何用 AI 控制 ${integration.name}`,
      description: integration.dccType ? `通过 DCC-MCP ${integration.name} MCP 适配器和 dcc-mcp-cli，使用类型化工具、安全发现与结果验证控制 ${integration.name}。` : `通过 DCC-MCP 的类型化工具、安全发现与结果验证，让 AI Agent 控制 ${integration.name}。`,
    },
    content: renderControlGuide(integration, 'zh'),
  })),
}
