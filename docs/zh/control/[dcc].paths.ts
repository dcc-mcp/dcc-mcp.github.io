import { dccIntegrations, renderControlGuide } from '../../.vitepress/dcc-integrations.mts'

export default {
  paths: () => dccIntegrations.map((integration) => ({
    params: {
      dcc: integration.slug,
      title: `如何用 AI 控制 ${integration.name}`,
      description: `通过 DCC-MCP 的类型化工具、安全发现与结果验证，让 AI Agent 控制 ${integration.name}。`,
    },
    content: renderControlGuide(integration, 'zh'),
  })),
}
