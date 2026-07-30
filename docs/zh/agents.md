---
title: 在 Agent 中使用 DCC-MCP
description: 安装 DCC-MCP Skill，通过 CLI 发现类型化工具，并诊断失败调用。
pageClass: route-page
---

# 使用 Skill 与 CLI

公开的 [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp) 保存操作步骤。`dcc-mcp-cli` 负责 Gateway 状态、工具发现、类型化调用、诊断、更新和 Marketplace 安装。

## 把当前文档交给 Agent

Agent 还不清楚任务归属时，使用下面的提示词：

```text
修改任何内容前，先阅读 https://dcc-mcp.github.io/zh/llms.txt；短文件没有所需信息时再阅读 llms-full.txt。只选择一条路线：用 dcc-mcp 操作已连接 DCC，用 dcc-mcp-creator 处理适配器或服务，用 dcc-mcp-skills-creator 处理 Skill。软件包查 Marketplace，案例查 Showcase，仓库归属查生态目录。使用 dcc-mcp-cli 发现工具并遵循 next_step。保留 request_id 用于诊断。未经我允许，不得安装、发布、创建外部 Issue 或改变这台机器。先报告所选路线、能力和下一项操作。
```

## 只安装任务需要的 Skill

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
