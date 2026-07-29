---
title: 使用 DCC-MCP 开发
description: 在创建适配器、专项 Skill 或共享 Core 能力前，先选择正确的 DCC-MCP 扩展边界。
pageClass: route-page
---

# 在正确的边界扩展生态。

先搜索[生态目录](/zh/ecosystem)。如果已有适配器或 Skill 负责该工作流，优先复用。

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>新建 DCC 适配器</strong><span>使用 dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>创建专项工作流 Skill</strong><span>使用 skills-creator</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>共享基础设施</strong><span>贡献到 Core</span></a>
</div>

## 创建适配器

当工作涉及新的 Host 进程、Dispatcher Bridge、Readiness 契约、Resources、安装生命周期或 Gateway 注册时，使用 [`dcc-mcp-creator`](https://clawhub.ai/loonghao/skills/dcc-mcp-creator)。它会将实现路由到共享 Core 契约与跨 DCC 验证要求。

继续阅读：

- [适配器运行时契约](https://dcc-mcp.github.io/dcc-mcp-core/guide/adapter-runtime-contracts)
- [适配器安装生命周期](https://dcc-mcp.github.io/dcc-mcp-core/guide/adapter-install-lifecycle)
- [Host 适配器指南](https://dcc-mcp.github.io/dcc-mcp-core/guide/host-adapter)

## 创建专项 Skill

当适配器已经存在，而缺少的是专门的 Agent 工作流、Schema、脚本或扩展包时，使用 [`dcc-mcp-skills-creator`](https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator)。它覆盖创作、验证、反思与发布边界。

继续阅读：

- [Skills 系统](https://dcc-mcp.github.io/dcc-mcp-core/guide/skills)
- [Skill Scope 与策略](https://dcc-mcp.github.io/dcc-mcp-core/guide/skill-scopes-policies)
- [Marketplace](/zh/marketplace)

## 仅为共享契约修改 Core

Core 是可复用控制平面：Gateway、CLI、MCP/REST 运行时、发现、安全、可观测性、持久化和跨 Host 契约。Host 专属业务逻辑应留在适配器或 Skill 包中。

- [Core 架构](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture)
- [Python API](https://dcc-mcp.github.io/dcc-mcp-core/api/models)
- [Core 仓库](https://github.com/dcc-mcp/dcc-mcp-core)
