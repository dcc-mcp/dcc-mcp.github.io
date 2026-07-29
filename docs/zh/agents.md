---
title: Agent 使用 DCC-MCP
description: 安装一个 Skill，使用一套 CLI 发现、调用、诊断并持续改进 DCC 工作流。
pageClass: route-page
---

# 一个 Skill。一套 CLI。连接所有 DCC。

Agent 的默认入口是公开的 [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp) 与 `dcc-mcp-cli`。Skill 提供工作流知识；CLI 负责 Gateway 生命周期、结构化发现、类型化执行、诊断与更新。

## 把项目地图交给你的 Agent

开始 DCC-MCP 任务前，把下面这段提示词直接交给 Agent：

```text
行动前先了解 DCC-MCP 生态。首先阅读 https://dcc-mcp.github.io/zh/llms.txt，只有需要更多细节时才阅读 https://dcc-mcp.github.io/zh/llms-full.txt。将我的需求准确路由到一条路径：用 dcc-mcp 操作在线 DCC，用 dcc-mcp-creator 创建或现代化适配器，或用 dcc-mcp-skills-creator 创建专项工作流 Skill。使用 https://dcc-mcp.github.io/zh/marketplace 发现可安装能力，使用 https://dcc-mcp.github.io/zh/showcase 参考经过验证的提示词模式，使用 https://dcc-mcp.github.io/zh/ecosystem 确认仓库归属。优先使用类型化 dcc-mcp-cli 发现能力，并严格遵循返回的 next_step。重试前从 request_id 开始诊断，清理敏感证据；未经我明确许可，不得安装、发布、创建外部 Bug 或改变我的机器。先返回项目路由、准备使用的能力和下一步准确且安全的操作。
```

## 安装匹配任务的 Skill

| 任务 | Skill |
| --- | --- |
| 操作已连接 DCC、发现工具或搜索扩展 | [`@loonghao/dcc-mcp`](https://clawhub.ai/loonghao/skills/dcc-mcp) |
| 创建或现代化完整适配器与运行时 | [`@loonghao/dcc-mcp-creator`](https://clawhub.ai/loonghao/skills/dcc-mcp-creator) |
| 创建或改进 DCC 专项 Skill 包 | [`@loonghao/dcc-mcp-skills-creator`](https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator) |

OpenClaw：

```bash
openclaw skills install @loonghao/dcc-mcp
```

兼容 ClawHub 的 Agent：

```bash
npx --yes clawhub@0.23.1 install @loonghao/dcc-mcp
```

安装后开启一个新会话，让运行时加载 Skill。

## 遵循类型化工作流

```bash
# 确认 Gateway 和已连接 Host。
dcc-mcp-cli health
dcc-mcp-cli list

# 缩小搜索范围，然后严格遵循返回的 next_step。
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# 使用经过验证的参数执行返回的 tool slug。
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

搜索结果是路由契约。不要猜测工具名称，也不要一次把所有后端 Schema 加载进上下文。只有返回结果明确要求时，才执行对应的 load 或 describe。

## 重试前先诊断

保留失败调用的 `request_id`，再使用 CLI 内置证据路径：

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

然后通过相同的搜索工作流发现并调用 `dcc_feedback__report`。分享前检查公开安全的 Issue 报告；未经用户授权，不得发布原始证据或创建外部 Issue。

## 详细参考

- [快速开始](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/getting-started)
- [CLI 参考](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/cli-reference)
- [Agent 参考](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [Gateway 诊断](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [技能市场](/zh/marketplace)
- [案例提示词](/zh/showcase)
- [浏览生态目录](/zh/ecosystem)
