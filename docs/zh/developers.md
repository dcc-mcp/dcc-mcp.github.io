---
title: 使用 DCC-MCP 开发 MCP 服务与 Skills
description: 把一条经过验证的路径交给 Agent，让它开发、试玩、调试并在内部交付自定义 MCP 服务或 DCC-MCP Skill。
pageClass: route-page
---

# 让 Agent 开发自定义 MCP 服务或 Skill。

先确认工作流归属，再选择仓库模板。DCC-MCP 同时支持公开 DCC 适配器、
内部非 DCC 服务和专项 Skill 包；一个本地目录或内部源码树就足够。

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>内部或自定义 MCP 服务</strong><span>使用 dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>专项工作流 Skill</strong><span>使用 skills-creator</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>共享基础设施</strong><span>贡献到 Core</span></a>
</div>

## 选择一条开发路线

| 你的需求 | 路线 |
|---|---|
| 连接 Maya、Blender、Unreal 或其他 Host 进程 | 使用 `dcc-mcp-creator` 创建或改进 DCC 适配器。 |
| 暴露内部 API、CLI、资产库、农场或评审服务 | 使用 `dcc-mcp-creator`，采用自定义服务 ID 与 `instance_type="standalone"`；不要求公开仓库。 |
| 给已有适配器或 standalone 服务增加类型化工作流 | 使用 `dcc-mcp-skills-creator`，不要再建一套运行时。 |
| 修改 Gateway、CLI、协议、安全或跨 Host 行为 | 把共享契约贡献到 Core。 |

创建公开适配器或 Skill 前先搜索[生态目录](/zh/ecosystem)。内部服务 ID
不需要写入公开 Catalog。

## 五分钟 Agent 实验：内部非 DCC 服务

这条路线适用于不属于创意软件、也可能不使用 GitHub 的内部系统。让
Agent 的工作目录指向你的内部项目，然后粘贴下面的提示词：

```text
运行时使用 dcc-mcp-creator，Skill 文件使用 dcc-mcp-skills-creator。只在我当前的私有或内部项目中工作，不要创建 GitHub 仓库、公开 Catalog 条目、外部 Issue 或公开 Release。先检查并复用项目已有的语言、包管理器、测试命令、鉴权和部署约定。

实现最小可用的非 DCC MCP 垂直切片：一个稳定的自定义服务 ID；使用 DccServerBase 与 DccServerOptions.from_env(..., instance_type="standalone")；不设置 dcc_pid；开发阶段只监听 loopback；围绕一个真实本地工作流提供一个类型化只读 Skill。普通服务、文件和 API 操作保持 inline execution；只有存在真实线程或进程边界时才增加 Dispatcher 或 Bridge。声明封闭的输入/输出 Schema、全部安全注解、有限超时、一个 call example，以及可执行且已清理敏感信息的错误。凭据必须保留在项目现有 Secret 边界中。

使用 dcc-mcp-cli lint skills 和项目原生的最小测试完成验证。启动服务并输出解析后的 /mcp URL；验证 tools/list、精确的 Skill 发现与 load、describe、一次合法调用、一次非法输入错误和干净退出。先使用官方开源 MCP Inspector 在本机验证，再通过 dcc-mcp-cli list/load-skill/describe/call 与 --output toon 重复 Agent 路径。保留返回的 slug 和 request_id，不要猜测或盲目重试。报告修改文件、准确验证证据、剩余安全/部署工作；发布或修改共享基础设施前停止。
```

Agent 在宣布完成前应返回以下检查点：

1. 它复用了哪些现有项目约定。
2. 自定义服务 ID，以及运行时为何是 `standalone`。
3. 一个通过验证的 Skill 和一次成功的只读调用。
4. 一次安全的非法输入结果。
5. 干净退出证据，并确认没有改动内部交付路径。

### 运行本地服务

Core 提供了完整示例：
[`examples/remote-server`](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server)。
目录名为保持链接稳定而保留；示例现在默认启动为 loopback standalone
服务，并自动发现它随附的 Skill 目录。

```bash
pip install dcc-mcp-core
dcc-mcp-cli lint skills
python server.py
```

预期启动输出包含类似 `http://127.0.0.1:8765/mcp` 的 URL、自定义标识
`studio-service` 和运行时生命周期 `standalone`。

### 在免费开源沙箱中试玩

使用官方 [MCP Inspector](https://github.com/modelcontextprotocol/inspector)。
它在本机运行，无需托管账号，支持 Streamable HTTP，也不需要把内部
loopback 服务暴露到公网：

```bash
npx --yes @modelcontextprotocol/inspector@latest
```

连接启动输出中的 `/mcp` URL。搜索 `hello-world` 并加载，然后用
`{"name":"Agent"}` 调用 `hello_world__greet`。再传一次空名称，确认返回的
是结构化验证错误。

::: warning 为什么不推荐公网浏览器 Playground？
托管 Playground 无法直接访问 loopback 或内部 MCP 服务，除非先把服务
暴露出去。对于内部系统，本地开源 Inspector 才是安全的“立即试玩”路径。
绝不能把它具备进程启动能力的 Proxy 暴露到不可信网络。
:::

### 验证 Agent 路径

服务完成注册后使用 CLI，并保留 search 返回的 slug：

```bash
dcc-mcp-cli list --output toon
dcc-mcp-cli load-skill hello-world --dcc-type studio-service --output toon
dcc-mcp-cli describe <tool-slug-returned-by-load> --output toon
dcc-mcp-cli call <tool-slug-returned-by-load> --json '{"name":"Agent"}' --wait --output toon
```

## 五分钟 Agent 实验：只修改 Skill

运行时已经存在时，使用这段提示词：

```text
在当前内部项目中使用 dcc-mcp-skills-creator。不要新建适配器、服务、仓库或公开包。先搜索已有 Skills，再为该工作流添加或改进最小的归属 Skill。所有 SKILL.md 扩展元数据都放在 metadata.dcc-mcp.* 下；声明类型化 Schema、全部安全注解、affinity、timeout、call_examples 和 next-tools；已有 dcc_mcp_core.skills_helper 能覆盖需求时，使用它实现一个有限且类型化的脚本。对实际可安装 Skill 目录运行 dcc-mcp-cli lint，通过现有运行时加载并分别做一次成功调用和一次非法输入调用，然后报告证据。未经允许不要发布。
```

创作循环保持简短：**搜索已有归属 → scaffold 或编辑 → lint → reload →
load → describe → call → diagnose**。

## 不要靠猜测调试

| 现象 | 下一项检查 |
|---|---|
| Skill 校验失败 | 启动运行时前先修复 `dcc-mcp-cli lint` 的准确问题。 |
| 服务没有响应 | 检查输出 URL，然后访问 `GET /v1/healthz` 与 `GET /v1/readyz`。 |
| 找不到 Skill | 核对父级路径，执行 `reload-skills`，再重新搜索。 |
| 找不到工具 | 加载所属 Skill，并遵循返回的 `next_step`。 |
| 调用失败 | 保留 `request_id`，运行 `dcc-mcp-cli doctor` 与限定范围的失败统计，再修复归属层。 |
| 内部依赖不可用 | 报告内部 Owner 和已清理的证据，不要创建公开 Issue。 |

## 从本地成功走向内部交付

开发阶段保持 loopback。暴露到内网前必须具备运维方负责的 TLS、鉴权、
网络/Origin Allow-list、Secret 管理、审计保留和退出所有权。复用项目已有
的 Wheel、归档、容器、Rez、私有 Registry 或内部部署系统；GitHub 是可选项。

继续阅读：

- [内部 standalone 服务工作流](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/INTERNAL_SERVICE_WORKFLOW.md)
- [适配器与服务工作流](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/ADAPTER_WORKFLOW.md)
- [Skills 系统](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/skills)
- [Skill Scope 与策略](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/skill-scopes-policies)
- [远程部署](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/remote-server)
- [Core 架构](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/architecture)
