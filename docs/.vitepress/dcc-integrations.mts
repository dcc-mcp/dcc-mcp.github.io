import dccIntegrationCatalog from './dcc-integrations.json'

export type DccIntegration = {
  slug: string
  name: string
  repository: string
  dccType?: string
  marketplacePackage?: string
  coreApplicationRoute?: string
  summaryEn: string
  summaryZh: string
  tasksEn: string[]
  tasksZh: string[]
  vendorCaseEn?: string
  vendorCaseZh?: string
  availabilityEn?: string
  availabilityZh?: string
  catalogStatusEn?: string
  catalogStatusZh?: string
}

export const dccIntegrations: DccIntegration[] = dccIntegrationCatalog

export const releasedIntegrations = dccIntegrations.filter(({ dccType }) => dccType)

const repositoryUrl = (integration: DccIntegration) =>
  `https://github.com/dcc-mcp/${integration.repository}`

export function renderControlGuide(integration: DccIntegration, language: 'en' | 'zh') {
  const released = Boolean(integration.dccType)
  const routeIdentifier = integration.dccType ?? integration.coreApplicationRoute
  const gameAssets = integration.slug !== 'comfyui' ? '' : language === 'zh'
    ? `## 可以用 ComfyUI MCP 免费生成本地游戏素材吗？

可以。带有 \`comfyui-game-assets\` Skill 的适配器源码支持游戏 UI 插画、图标、透明 PNG 和 GLB 道具。图片方案包括 SD1.5、SDXL、FLUX.2 Klein 4B、Z-Image Turbo、Qwen-Image 2512；BiRefNet 用于去背景；Hunyuan3D 2 输出无贴图形状，TRELLIS.2 和 Pixal3D 输出 PBR 贴图网格。

先让 Agent 检查已装模型和空闲显存，比较两三个合适方案，再由用户选择。已有选择直接沿用。下载模型、升级 ComfyUI 和开始生成都应遵循用户已授权的范围。较小显卡可先比较 SD1.5 草稿方案；权重体积不能作为峰值显存保证。免费本地生成仍需遵守各模型及依赖的许可。

ComfyUI 不在线时，Agent 先说明连接状态，提供启动/配置已有安装或安装缺失组件的具体方案，并等待用户授权。授权后完成配置、连接与工具发现、配方预检及约定的最小验证；已有授权直接沿用。安装成功不等于已生成素材。[安装与授权流程](https://github.com/dcc-mcp/dcc-mcp-comfyui/blob/main/install.md#offline-host-handoff-and-authorization)。

截至 2026-09-05，这批配方已合并到源码，公开包 0.1.4 尚未包含。先发现并描述实时实例的工具，确认能找到 \`comfyui-game-assets\`。节点预检和 CPU 测试不等于 GPU 推理或画质验收；生成后仍需检查透明边缘、文字、拓扑、材质和引擎导入。

- [适配器使用与版本指引](https://github.com/dcc-mcp/dcc-mcp-comfyui/blob/main/README_zh.md)
- [本地方案选择、Pixal3D、安装与 OOM 指引](https://github.com/dcc-mcp/dcc-mcp-comfyui/blob/main/src/dcc_mcp_comfyui/skills/comfyui-game-assets/references/selection-guide.md)
`
    : `## Can ComfyUI MCP generate free local game assets?

Yes. Adapter source with the \`comfyui-game-assets\` Skill supports game UI artwork, icons, transparent PNG assets and GLB props. Image recipes include SD1.5, SDXL, FLUX.2 Klein 4B, Z-Image Turbo and Qwen-Image 2512. BiRefNet removes backgrounds; Hunyuan3D 2 produces untextured shapes; TRELLIS.2 and Pixal3D produce PBR textured meshes.

Have the agent inspect installed models and free VRAM, compare two or three suitable recipes and let the user choose. Reuse an existing choice. Downloads, ComfyUI upgrades and generation should follow the user's authorized scope. For smaller GPUs, compare the SD1.5 draft workflow first; weight size does not guarantee peak memory fit. Local generation remains subject to model and dependency licenses.

If ComfyUI is offline, the agent explains the connection state, offers a concrete startup/configuration or installation plan and waits for authorization. After approval, it completes setup, connection and tool discovery, recipe preflight and the agreed minimal verification. Existing authorization is reused. Installation alone is not asset generation. See the [installation and authorization flow](https://github.com/dcc-mcp/dcc-mcp-comfyui/blob/main/install.md#offline-host-handoff-and-authorization).

As of 2026-09-05, these recipes are merged in source; the published 0.1.4 package predates them. Discover and describe the live instance's tools to confirm \`comfyui-game-assets\` is present. Node preflight and CPU tests do not establish GPU inference or visual quality. Review alpha edges, lettering, topology, materials and engine import after generation.

- [Adapter usage and version guidance](https://github.com/dcc-mcp/dcc-mcp-comfyui)
- [Local recipe selection, Pixal3D, setup and OOM guidance](https://github.com/dcc-mcp/dcc-mcp-comfyui/blob/main/src/dcc_mcp_comfyui/skills/comfyui-game-assets/references/selection-guide.en.md)
`
  if (language === 'zh') {
    const availability = integration.availabilityZh ?? (integration.marketplacePackage
      ? `这是可供不同 DCC 应用使用的 Marketplace Skill，不是独立适配器。使用 \`dcc-mcp-cli marketplace install ${integration.marketplacePackage} --dcc <实际-host> --reload\` 将它安装到具体 DCC；\`any\` 不是安装目录。`
      : released
      ? `当前目录中的适配器标识是 \`${integration.dccType}\`。目录定义不等于 Host 验收；操作前运行 \`dcc-mcp-cli dcc-types\`，确认本机目录状态，再发现并描述实时实例工具。`
      : '这个适配器已有公开仓库，但可能尚未纳入当前 CLI 发布目录。先阅读适配器 README，并运行 `dcc-mcp-cli dcc-types` 查询，不要猜测应用标识。')
    const cliSection = routeIdentifier
      ? `## ${integration.name} MCP 与 ${integration.name} CLI\n\n${integration.name} MCP 接口与 ${integration.name} CLI 工作流共用同一个 DCC-MCP 适配器和工具目录。在命令行中使用 \`dcc-mcp-cli\`，加上 \`--dcc-type ${routeIdentifier}\`，即可将工具搜索限定到 ${integration.name}。工具会声明输入、输出和参数类型，便于调用前校验。\n\n\`\`\`bash\ndcc-mcp-cli search --query "${integration.tasksZh[0]}" --dcc-type ${routeIdentifier}\n\`\`\`\n`
      : ''
    const vendorCase = integration.vendorCaseZh
      ? `## 厂商原生 AI 能力\n\n${integration.vendorCaseZh}\n`
      : ''
    return `# AI 怎么控制 ${integration.name}？

兼容 MCP 的 AI Agent 可以通过 DCC-MCP ${integration.summaryZh}。Agent 先选择正确的应用实例或集成，查找可用工具并读取参数定义，再执行操作、检查结果。这些类型化工具会明确说明输入、输出和参数类型。

${cliSection}
${vendorCase}

${gameAssets}

## AI 可以在 ${integration.name} 中做什么？

- ${integration.tasksZh[0]}。
- ${integration.tasksZh[1]}。
- ${integration.tasksZh[2]}。

可用功能取决于适配器版本和已加载的 Skill。先搜索工具并阅读其说明，不要根据网页内容猜测当前工具名称。

## 安全操作流程

1. 安装并遵循公开的 [\`dcc-mcp\` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp)。
2. 检查现有 CLI、适配器和当前运行的应用；安装软件或改变系统状态前先征得同意。
3. 使用 \`health\`、\`dcc-types\` 与 \`list\` 验证 Gateway 和目标实例。
4. 根据 ${integration.name} 的实际任务搜索工具，用 describe 阅读参数说明，并遵循返回的 \`next_step\`。
5. 只执行范围明确的操作，再检查应用状态、文件、预览、日志或渲染结果。

\`\`\`bash
dcc-mcp-cli health
dcc-mcp-cli dcc-types
dcc-mcp-cli list
\`\`\`

## 可复制提示词

\`\`\`text
使用 dcc-mcp Skill 连接我的 ${integration.name}。先检查现有 CLI、适配器和当前运行的实例；安装软件或改变系统状态前必须征得我的同意。搜索与“${integration.tasksZh[1]}”相关的类型化工具，阅读参数说明，严格遵循返回的 next_step。不得删除、覆盖或发布现有工作。先完成最小可验证修改，再按以下要求检查结果：“${integration.tasksZh[2]}”。报告所用实例、工具、执行结果和证据路径。
\`\`\`

## 当前可用性与官方来源

${availability}

- [${integration.name} ${integration.marketplacePackage ? 'Skill' : '适配器'}仓库](${repositoryUrl(integration)})：查阅安装、兼容性、专属功能与故障排查说明。
- [全部 AI + DCC 控制指南](/zh/use-cases)：返回所有公开应用与流水线集成。
- [Agent 工作流](/zh/agents)：了解通用发现、调用、验证与诊断流程。

本页介绍通用的 Agent 操作流程。各应用的安装、API 与兼容性细节由所属仓库维护。
`
  }

  const availability = integration.availabilityEn ?? (integration.marketplacePackage
    ? `This is a host-neutral Marketplace Skill, not a standalone adapter. Install it into a concrete DCC with \`dcc-mcp-cli marketplace install ${integration.marketplacePackage} --dcc <real-host> --reload\`; \`any\` is not an install directory.`
    : released
    ? `The current catalog lists \`${integration.dccType}\` as the adapter identifier. Catalog definitions do not establish host acceptance; run \`dcc-mcp-cli dcc-types\`, then discover and describe the live instance's tools before operating.`
    : 'This is a public adapter repository, but it may not yet be present in the current CLI release catalog. Check its README and `dcc-mcp-cli dcc-types`; do not guess a host identifier.')
  const cliSection = routeIdentifier
    ? `## ${integration.name} MCP and ${integration.name} CLI\n\nThe ${integration.name} MCP endpoint and ${integration.name} CLI workflow share the same DCC-MCP adapter and tool catalog. Use \`dcc-mcp-cli\` with \`--dcc-type ${routeIdentifier}\` to limit tool searches to ${integration.name}. Tools declare their inputs, outputs, and parameter types so arguments can be checked before a call.\n\n\`\`\`bash\ndcc-mcp-cli search --query "${integration.tasksEn[0]}" --dcc-type ${routeIdentifier}\n\`\`\`\n`
    : ''
  const vendorCase = integration.vendorCaseEn
    ? `## Vendor-native AI capabilities\n\n${integration.vendorCaseEn}\n`
    : ''
  return `# How can an AI agent control ${integration.name}?

An MCP-compatible AI agent can use DCC-MCP to ${integration.summaryEn}. The agent selects the correct application instance or integration, discovers available tools, and reads their parameter definitions before acting and checking the result. These typed tools declare their inputs, outputs, and parameter types.

${cliSection}
${vendorCase}

${gameAssets}

## What can an AI agent do in ${integration.name}?

- ${integration.tasksEn[0]}.
- ${integration.tasksEn[1]}.
- ${integration.tasksEn[2]}.

Capabilities change with the adapter version and loaded Skills. Search and describe tools first instead of guessing current tool names from this page.

## Safe operating flow

1. Install and follow the public [\`dcc-mcp\` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp).
2. Inspect the existing CLI, adapter, and live hosts; obtain consent before installing software or changing system state.
3. Use \`health\`, \`dcc-types\`, and \`list\` to verify the Gateway and target instance.
4. Search and describe tools for the actual ${integration.name} task, then follow every returned \`next_step\`.
5. Make one bounded change and verify it through host state, files, previews, logs, or rendered output.

\`\`\`bash
dcc-mcp-cli health
dcc-mcp-cli dcc-types
dcc-mcp-cli list
\`\`\`

## Copyable prompt

\`\`\`text
Use the dcc-mcp Skill to connect to my ${integration.name} session. Inspect the existing CLI, adapter, and live instance first; ask before installing software or changing system state. Search for and describe typed tools related to "${integration.tasksEn[1]}", then follow every returned next_step. Do not delete, overwrite, or publish existing work. Make the smallest verifiable change, then check the result against this requirement: "${integration.tasksEn[2]}". Report the instance, tool, result, and evidence path.
\`\`\`

## Current availability and official source

${availability}

- [${integration.name} ${integration.marketplacePackage ? 'Skill' : 'adapter'} repository](${repositoryUrl(integration)}): source of truth for installation, compatibility, host-specific capabilities, and troubleshooting.
- [All AI + DCC control guides](/use-cases): return to every public application and pipeline integration.
- [Agent workflow](/agents): shared discovery, call, validation, and diagnostic steps.

This page describes the shared Agent workflow. Each integration's repository owns its installation, API, and compatibility details.
`
}
