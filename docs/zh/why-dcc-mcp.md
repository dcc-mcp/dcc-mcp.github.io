---
title: 为什么是 DCC-MCP
description: DCC-MCP 在真实 DCC 接入中形成的技术决策、架构边界与实践经验。
---

# 为什么是 DCC-MCP

DCC-MCP 来自真实 DCC 应用的接入工作。主线程、实例选择、生命周期、能力
发现和诊断等问题在不同 Host 中反复出现。确认问题具有共性后，我们才把
对应能力加入共享契约。

## 先整理生产流程

Agent 使用团队提供的流程，但不能替团队定义流程。

> 生产标准化 → 标准流程化 → 流程工具化 → Agent 操作工具

先明确命名、输入、输出、检查项、所有权和验收标准，再把它们连接成可重复
流程，最后封装成类型化工具。人、脚本、CI 和 Agent 都可以调用同一套能力。

## 临时脚本为什么无法规模化

让模型临时编写并执行 `mayapy`、`hython` 或 Blender Python 适合探索。
进入持续使用后，会遇到这些限制：

- 模型每轮重新生成相似代码，结果会发生变化；
- DCC API 往往要求主线程执行，还需要应用专属的 readiness 检查；
- 同时打开多个场景或应用实例时，执行目标并不明确；
- 长任务需要进度、取消、checkpoint 和恢复；
- 进程成功退出，不代表目标场景或文档真的发生了预期变化；
- 没有类型化输入、request ID、日志和 trace，失败很难复现。

这些问题横跨多个 adapter，因此需要由共享基础设施处理。

## 问题与对应契约

| 反复遇到的问题 | 我们得到的经验 | DCC-MCP 的应对 |
| --- | --- | --- |
| 模型每轮重写任务逻辑 | Pipeline 经验应该独立于模型和提示词长期存在 | 有版本、有类型 schema、可校验的 Skills 与复用工具 |
| 每个 adapter 都重做通信和生命周期 | Host 接入需要共享契约 | Core runtime、Gateway、CLI 和保持精简的 Host adapter |
| DCC API 有主线程与 readiness 限制 | 通用进程执行远远不够 | 主线程调度、readiness、实例路由与 Host execution bridge |
| 工具目录过大会占用上下文并干扰选择 | Agent 只应发现当前任务需要的能力 | 渐进式 `search -> load/describe -> call` |
| 创作任务耗时长，也可能只完成一部分 | 调用需要完整生命周期，而不只是返回值 | 异步 job、进度、取消、checkpoint 与 artefact 交接 |
| Agent 调用容易成为黑盒 | 生产团队需要可检查的证据 | request ID、策略、审计、日志、trace、指标、health 与 replay |
| 旧工具有时没有可用 API | UI 自动化只能作为兜底，不能成为基础 | 有作用域、经过策略检查的 UI Control，以及 `snapshot -> find -> act -> wait -> verify` |
| 有价值的工作流需要跨人员和项目流转 | 一个脚本目录不是分发体系 | Marketplace 包、不可变源码引用、hot reload 与项目/团队作用域 |

## 各层负责什么

系统把共享服务与 Host 专属行为分开。

| 层次 | 职责 |
| --- | --- |
| Agent 接口 | MCP/REST endpoint、类型化 CLI 命令、schema、resource、prompt 与结构化结果 |
| 控制面 | Gateway 发现与路由、策略检查、生命周期、可观测性和多实例上下文 |
| DCC 运行时 | 主线程调度、readiness、job、取消、checkpoint 与 Host 安全执行 |
| Adapter | 由各 DCC 仓库维护安装、兼容性、Host API 和应用专属行为 |
| Skill | 已验证的生产经验、参数校验、工作流步骤与项目/团队约定 |

[Core 架构文档](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/architecture) 是当前共享契约的事实来源。Host 专属的安装、兼容性和排错仍由对应 adapter 仓库维护。

## CLI、MCP 与 REST 共用一套实现

实现中心是共享服务代码与类型化 REST/OpenAPI 契约。`dcc-mcp-cli` 调用
Gateway REST API；MCP 只保留 `search`、`describe`、`load_skill` 和
`call`，为仅支持 MCP 的客户端提供同一套工作流。两条路径复用相同的发现、
校验、路由、策略和调用服务。

| 使用方 | 推荐入口 | 是否需要 AI Agent |
| --- | --- | --- |
| 艺术家、TD、运维、Shell 脚本与 CI | 类型化 CLI 或 REST | 不需要 |
| 工作室自动化与自研应用 | REST 与 OpenAPI 生成客户端 | 不需要 |
| 仅支持 MCP 的 AI IDE 与助手 | 最小 MCP 工作流 | 需要 |
| 智能工作流画布与云端编排平台 | REST/OpenAPI；有 Agent 参与时再使用 MCP | 不需要 |

没有 AI Agent 时，Pipeline 可以直接调用 REST API、从
`/v1/openapi.json` 生成客户端，或在 CI 与运维中使用 CLI。有 Agent 时，
再通过精简的 MCP 接口调用相同能力。

团队已有的 OpenAPI 3.x 服务也可以挂载为 MCP tools。原服务仍是普通
REST 服务，不需要围绕 AI 重写。

## 优先复用现有协议

MCP 是行业标准的 Agent 接口，所以 DCC-MCP 直接复用它，而不是发明一套只有自己能用的私有协议。REST、Python、C++、HTTP、command port、原生插件和厂商官方 toolset，都可以接入同一个控制面。

DCC-MCP 不替代 Agent、DCC API 或厂商集成。厂商已有可用的原生能力或
官方 MCP 时，adapter 保留其名称与 schema。DCC-MCP 负责周边仍缺少的
发现、路由、安全、生命周期、分发和诊断。

## Skill 保存工作流经验

Skill 把经过验证的工作流封装成有版本、有类型、可测试、可分发的能力。

所有权边界如下：

- Core 和 adapter 负责连接、线程安全、路由、策略与可观测性；
- TD/TA 可以让项目命名、场景检查、资产准备、发布卡点、导出规范和审核交接继续贴近团队已有的 pipeline 代码；
- Agent 选择说明清楚的工具并填写经过校验的参数，不再每次从零发明整套流程。

它减少重复生成代码，也让工作室可以按项目、部门或制作阶段分发不同能力，
不需要 fork 控制面。

## 保留失败证据

诊断从 `request_id`、类型化工具及参数、目标 DCC 实例和实际结果开始。
Gateway 与 CLI 提供 health、日志、trace、统计和结构化反馈。

由此形成一个具体的闭环：

1. 在真实 Host 中复现问题；
2. 判断问题属于 Core、adapter 还是 Skill；
3. 在对应边界做最小修复；
4. 重新验证同一个调用；
5. 保留证据，让下一次改进从经验开始，而不是从猜测开始。

## 已知边界

DCC-MCP 不会声称所有创意应用都能变得完全一样。

- 原生 Skill 和 API 始终优先于 UI Control。
- Core 不负责 Host 专属的 pipeline 语义。
- Host 没有事务 API 时，adapter 不能承诺安全回滚。
- Marketplace 扩展用于增加能力，不用于掩盖 Core 或 adapter 缺陷。
- 项目为 Agent 提供基础设施，但不规定必须使用哪个 Agent 或模型。

## 仍然依赖人的判断

很多生产任务可以标准化、验证和自动执行，但审美判断、艺术指导、构图、
节奏和风格取舍仍很难表达成稳定契约。

DCC-MCP 先处理可重复部分，并让 Agent 在约束内使用真实工具。模型的感知、
推理和创意判断改进后，可以继续使用同一批类型化工具，不需要重建每个 DCC
集成。

## 继续了解

- [查看 Agent 如何使用这套系统](/zh/agents)
- [开发 adapter、standalone 服务或 Skill](/zh/developers)
- [浏览所有适配器与扩展](/zh/ecosystem)
- [阅读 Core 技术文档](https://dcc-mcp.github.io/dcc-mcp-core/zh/)
