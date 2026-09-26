import { dccIntegrations, renderControlGuide } from '../../.vitepress/dcc-integrations.mts'

export default {
  paths: () => dccIntegrations.map((integration) => ({
    params: {
      dcc: integration.slug,
      title: integration.dccType || integration.coreApplicationRoute ? `${integration.name} MCP 与 CLI — 用 AI 控制 ${integration.name}` : `如何用 AI 控制 ${integration.name}`,
      description: integration.slug === 'comfyui'
        ? '使用 ComfyUI MCP 选择本地游戏 UI、透明 PNG 和 PBR GLB 配方，包括 Pixal3D；提供硬件指引、节点检查与产物交付。'
        : integration.dccType || integration.coreApplicationRoute ? `通过 ${integration.name} MCP 适配器和 dcc-mcp-cli，让 AI Agent 操作 ${integration.name}：先查找工具和检查参数，再执行任务、验证结果。` : `通过 DCC-MCP 让 AI Agent 操作 ${integration.name}：先查找工具和检查参数，再执行任务、验证结果。`,
    },
    content: renderControlGuide(integration, 'zh'),
  })),
}
