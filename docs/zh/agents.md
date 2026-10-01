---
title: 在 Agent 中使用 DCC-MCP
description: 安装 DCC-MCP Skill，通过 CLI 发现类型化工具，并诊断失败调用。
pageClass: route-page
---

# 安装一次，然后描述任务

公开的 [`dcc-mcp` Skill](https://github.com/dcc-mcp/dcc-mcp-agent-plugins/tree/main/plugins/dcc-mcp/skills/dcc-mcp) 为 Agent 提供操作指南。`dcc-mcp-cli` 用于检查 Gateway 状态、查找和调用工具、排查故障、更新软件，以及安装 Marketplace 扩展。

首次使用还需要配置 CLI、Gateway 和目标应用的适配器。具体步骤见
[快速开始](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/getting-started)；先检查机器上已有的安装，再补齐缺少的组件。

在 Agent 客户端当前打开的工作区中运行以下命令。支持 Codex、Claude Code、
Gemini CLI、GitHub Copilot、Cursor、Windsurf、OpenCode、Cline、Roo Code、
Kiro CLI、Amp 等兼容 Agent Skills 的客户端：

```bash
npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

用户级安装可追加 `--global`。如果客户端只在启动时读取 Skill，请开启新会话。
原生插件市场和 Registry 安装方式仍保留在
[`dcc-mcp-agent-plugins` 仓库](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#install)。

## 云 Agent 与 DCC-MCP

[云 Agent 与 DCC-MCP](/zh/cloud-agents) 汇总官方平台接口说明、云端软件盘点和逐版本工作流证据。
具备 shell 的 Agent 可以使用 CLI 与 HTTP Gateway；每个应用、适配器和工作流仍需在目标环境中验证。
DCC 服务保持监听 loopback；跨网络访问时，在 Gateway 前部署 TLS 与认证层。
插件不包含目标 DCC 软件及其许可证。

## 更新 Skill 与 CLI

由原安装工具负责更新。通过 GitHub 安装的 Agent Skills 使用 `skills`
锁文件：

```bash
# 更新当前工作区中受管理的副本。
npx --yes skills@1.5.23 update -p -y

# 更新用户级受管理副本。
npx --yes skills@1.5.23 update -g -y
```

DCC-MCP CLI 需要单独检查；确认后再应用经过验证的更新：

```bash
dcc-mcp-cli update check
dcc-mcp-cli update apply
```

OpenClaw 与 ClawHub 直接安装会记录各自的来源和更新方式，详见
[更新已安装 Skill](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#keep-installed-skills-current)。
无人值守更新不要追加 `--force`；如果 Skill 被固定版本或有本地修改，应停下检查。

## 使用简短提示词

操作步骤已经在 Skill 中，提示词只需描述任务和安全边界：

```text
使用 dcc-mcp Skill 完成<描述 DCC 任务>。安装软件或改变系统状态前先询问我，完成后提供验证证据。
```

## 只安装任务需要的 Skill

| 任务 | Skill |
| --- | --- |
| 操作已连接 DCC、发现工具或搜索扩展 | `dcc-mcp` |
| 开发或改进适配器及其运行环境 | `dcc-mcp-creator` |
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
- [案例提示词](/zh/examples)
- [常见 AI + DCC 任务](/zh/use-cases)
- [浏览生态目录](/zh/ecosystem)
