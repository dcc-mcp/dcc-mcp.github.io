---
title: 在 Agent 中使用 DCC-MCP
description: 安装 DCC-MCP Skill，通过 CLI 发现类型化工具，并诊断失败调用。
pageClass: route-page
---

# 安装一次，然后描述任务

公开的 [`dcc-mcp` Skill](https://github.com/dcc-mcp/dcc-mcp-agent-plugins/tree/main/plugins/dcc-mcp/skills/dcc-mcp) 保存操作步骤。`dcc-mcp-cli` 负责 Gateway 状态、工具发现、类型化调用、诊断、更新和 Marketplace 安装。

在 Codex、Claude Code、Gemini CLI、GitHub Copilot、Cursor、Windsurf、
OpenCode、Cline、Roo Code、Kiro CLI、Amp 或其他兼容 Agent Skills 的 Host
所使用的工作区运行：

```bash
npx --yes skills@1.5.22 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

用户级安装可追加 `--global`。如果 Host 只在启动时发现 Skill，请开启新会话。
原生插件市场和 Registry 安装方式仍保留在
[`dcc-mcp-agent-plugins` 仓库](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#install)。

## 使用简短提示词

操作步骤已经在 Skill 中，提示词只需描述任务和安全边界：

```text
使用 dcc-mcp Skill 完成<描述 DCC 任务>。安装软件或改变系统状态前先询问我，完成后提供验证证据。
```

## 只安装任务需要的 Skill

| 任务 | Skill |
| --- | --- |
| 操作已连接 DCC、发现工具或搜索扩展 | `dcc-mcp` |
| 创建或现代化完整适配器与运行时 | `dcc-mcp-creator` |
| 创建或改进 DCC 专项 Skill 包 | `dcc-mcp-skills-creator` |

只有任务属于两个开发者路线之一时，才替换通用命令中的 `--skill` 值。

## 搜索、描述并调用

```bash
# 确认 Gateway 和已连接 Host。
dcc-mcp-cli health
dcc-mcp-cli list

# 缩小搜索范围，然后严格遵循返回的 next_step。
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# 使用经过验证的参数执行返回的 tool slug。
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

不要猜测工具名称，也不要一次加载全部后端 Schema。先搜索，再执行 `next_step` 指定的 `load` 或 `describe`。

## 重试前检查 request ID

保留失败调用的 `request_id`，再使用 CLI 内置证据路径：

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

然后通过相同的搜索流程发现 `dcc_feedback__report`。分享前检查并清理报告中的敏感信息；创建外部 Issue 仍需用户授权。

## 参考资料

- [快速开始](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/getting-started)
- [CLI 参考](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/cli-reference)
- [Agent 参考](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [Gateway 诊断](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [技能市场](/zh/marketplace)
- [案例提示词](/zh/showcase)
- [常见 AI + DCC 任务](/zh/use-cases)
- [浏览生态目录](/zh/ecosystem)
