---
title: 云 Agent 与 DCC-MCP
description: 根据软件实测、平台接口、安装前提与部署限制，选择 DCC-MCP 的云电脑或工作站工作流。
pageClass: route-page
---

# 云 Agent 与 DCC-MCP

根据软件实测、平台接口、安装前提与部署限制，选择 DCC-MCP 的云电脑或工作站工作流。

**DCC-MCP 通过类型化工具、MCP 和 `dcc-mcp-cli`，连接 AI Agent 与创作软件。** 当环境具备目标软件、可用适配器和授权连接时，云 Agent 可以检查文档、执行有边界的修改、导出资产并验证结果。具备 shell 的 Agent 可通过 CLI 和 HTTP 网关操作，不必依赖 MCP 设置界面。

本页考察 **OpenAI dots**、**Grok Bot**、**Meta Muse**（个人 Agent）和 **Manus Cue**，将平台文档与用于 Lightbox 工作的一台 dots 云电脑实测分开记录。Lightbox 是这里的开发与部署背景，DCC-MCP 提供应用集成。该电脑的结果不能代表所有账号、系统镜像或平台的支持情况。这些是独立集成，不表示与平台有官方合作关系。

## 证据等级 {#evidence-levels}

证据核验日期：**2026-10-01 UTC**。软件已安装、CLI 目录有条目、MCP 工具调用成功，是不同的观察结果。

| 标签 | 能证明什么 |
| --- | --- |
| **MCP 实测（MCP tested）** | 指定适配器和连接在所列环境完成了具体工作流；实验版本和未发布补丁仍须明确标注。 |
| **仅原生验证（Native only）** | 软件通过自身 CLI/API 生成了产物或完成轻量 API 检查，不表示 DCC-MCP 验收通过。 |
| **官方接口可用，DCC 未测** | 官方文档描述了可能承载集成的接口；这是可行性判断，不是 DCC 工作流实测。 |
| **尚未确认（Not confirmed）** | 尚未证实所需接口或应用行为。 |

MCP 工作流未完成或被拒绝，即使中间步骤写出了文件，也记录为缺口。安装和版本支持由适配器仓库负责，本页汇总云工作流证据。

## 平台接口 {#platform-interfaces}

| 平台与环境 | 官方接口及可能的连接路径 | 软件 / 适配器 / 工作流证据 | 未确认或未测项 |
| --- | --- | --- | --- |
| **OpenAI dots** 云电脑或授权个人电脑 | 云电脑、浏览器、文件和应用；插件及授权个人电脑任务。参见[电脑与应用](https://learn.chatgpt.com/docs/dots/computers-and-apps)和[插件](https://learn.chatgpt.com/docs/plugins)。 | 下述特定 dots Linux 电脑有原生软件验证及有边界的适配器实验。适配器版本与连接按软件逐项记录。 | 文档未承诺统一云 OS、预装 DCC 清单或适配器兼容性。个人电脑任务要求电脑在线，ChatGPT app 保持打开。 |
| **Grok Bot** 托管 Linux 电脑 | [电脑、shell 与桌面工具](https://docs.x.ai/grok-bot/computer-and-apps)、[Linux 身份与访问](https://docs.x.ai/grok-bot/identity-and-access)、[Custom MCP Remote HTTPS 和 Command](https://docs.x.ai/grok-bot/team-bots#plugins)。CLI + HTTP 是可能的 shell 路径。 | **官方接口可用，DCC 未测。** 软件版本未测，适配器未测，此处没有完成 DCC 工作流。 | Command MCP 支持不等于 DCC stdio 验收。仍受 Command 密钥限制和团队可见性规则约束。远程访问需要前置 TLS/auth。 |
| **Meta Muse**，个人 Agent 的 Linux VM | [Muse 个人 Agent](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)与[Debian runtime、API/CLI connector](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse)。根据这些接口推断，CLI/API 集成可能可行。 | **官方接口可用，DCC 未测。** 软件版本未测，适配器未测，此处没有完成 DCC 工作流。 | 这些资料未确认原生 MCP、通用 DCC GUI 操作或软件安装范围。Muse Code 是不同产品。runtime 和 connector 权限仍适用。 |
| **Manus Cue**，独立个人 Agent app | [Introducing Manus 2.0 的 Cue 段](https://manus.im/blog/introducing-manus-2-0)描述了独立手机/桌面 app 和每个 Agent 自有的电脑。 | **尚未确认。** OS/软件未确认；适配器/连接未测；此处没有完成 DCC 工作流。 | Cue 专属 shell、MCP、自定义 connector 和任意 DCC 软件未确认。Manus Studio 的能力不能作为 Cue 的证据。 |

## 云电脑软件清单 {#cloud-software-inventory}

实测 dots 云电脑运行 **Debian 13.6、x86_64**，托管 GUI 可用。shell 的 `DISPLAY` 为空，不代表托管桌面不存在。这是该电脑在核验时的清单，不是预装承诺。以下原生盘点未使用适配器；初始环境没有 DCC-MCP 包。

| 平台 / 软件版本 | 使用的适配器 / 连接 | 原生工作流与证据 | 仍有限制 |
| --- | --- | --- | --- |
| dots Debian 13.6 x86_64 / Inkscape **1.4** | 无 / 原生 CLI 与托管 GUI | SVG query、PNG 导出，观察到欢迎 GUI。**仅原生验证。** | 原生 extension action 和 DCC-MCP 制作流程需单独验证，见下表。 |
| dots Debian 13.6 x86_64 / FreeCAD **1.0.0** | 无 / 系统 Python + Part API | 生成 FCStd、STEP 产物。**仅原生验证。** | 受污染环境发生崩溃，干净环境恢复；适配器结果验证需另外检查。 |
| dots Debian 13.6 x86_64 / GIMP **3.0.4** | 无 / 原生 batch API | batch 创建文档。**仅原生验证。** | 适配器启动、调用及导出/回读未验收。 |
| dots Debian 13.6 x86_64 / OpenSCAD **2021.01** | 无 / 原生 CLI | 生成 STL。**仅原生验证。** | 命令行渲染与适配器验收是不同检查。 |
| dots Debian 13.6 x86_64 / Blender **4.3.2** | 无 / 原生后台执行 | 保存 blend、导出 GLB，关闭 denoise 后 CPU 渲染成功。**仅原生验证。** | 低于适配器支持线 **4.5**，缺 OIDN 和 Draco；不能据此扩大 Blender 支持范围。 |
| dots Debian 13.6 x86_64 / Godot **4.6.3** | 无 / 原生 headless CLI | headless 执行。**仅原生验证。** | editor 和适配器工作流未测。 |
| dots Debian 13.6 x86_64 / FFmpeg **7.1.5** | 无 / 原生 CLI | 生成 MP4。**仅原生验证。** | 未测试 DCC-MCP 适配器。 |
| dots Debian 13.6 x86_64 / ImageMagick（**版本未记录**） | 无 / 原生 CLI | 生成 PNG。**仅原生验证。** | 宣称可复现适配器工作流前，需记录版本。 |
| dots Debian 13.6 x86_64 / CadQuery **2.7** | 无 / Python API | 轻量 API 检查。**仅原生验证。** | 完整建模/导出和适配器工作流未测。 |
| dots Debian 13.6 x86_64 / KiCad **9.0.2** | 无 / Python API | 轻量 API 检查。**仅原生验证。** | PCB 编辑/导出和适配器工作流未测。 |
| dots Debian 13.6 x86_64 / ParaView **5.13.2** | 无 / Python API | 轻量 API 检查。**仅原生验证。** | 可视化/导出和适配器工作流未测。 |
| dots Debian 13.6 x86_64 / QGIS **3.40.6** | 无 / Python API | 轻量 API 检查。**仅原生验证。** | 项目/导出和适配器工作流未测。 |
| dots Debian 13.6 x86_64 / LibreOfficeDev **26.8 alpha** | 无 / 原生 CLI | DOCX 转 PDF 实验。**仅原生验证，实验性。** | alpha 版本；未宣称生产或适配器验收。 |
| dots Debian 13.6 x86_64 / Kdenlive **24.12.3** | 无 / version/help CLI | 可执行程序响应 version/help。渲染**尚未确认**。 | 未测 render 或适配器工作流。 |
| dots Debian 13.6 x86_64 / Slicer（**版本未确定**） | 无 / 应用入口 | 找到入口；headless 尝试失败。**尚未确认。** | 原生运行和适配器集成仍未解决。 |

## 云 MCP 实测 {#cloud-mcp-tests}

以下有边界实验已由云测试 worker 于 **2026-10-01 UTC** 冻结：两个工作流在本地修复后完成 MCP 闭环，一个 Blender 兼容性实验在低于支持线的版本通过，一个 Inkscape 制作工作流仍受阻。PC8 的官网构建和浏览器检查只验证文档，这些行不代表通用支持认证。[公开证据摘要](/cloud-evidence/2026-10-01.json)记录已提供的结果和本地补丁标识，不包含补丁内容、凭据或私有下载链接。

| 平台 / 软件 | 适配器 / 发布或源码 / 连接 | 工作流及实测证据 | 未测或受阻项 |
| --- | --- | --- | --- |
| dots / Debian 13.6 x86_64 / Blender **4.3.2** | `dcc-mcp-blender` 已发布 **0.2.12** + Core **0.20.39** / 真实 MCP | initialize、list/load、新建场景、创建对象、保存 blend、清空、重开、检查场景、GLB 导出通过。**MCP 实测，兼容性实验。** | 低于[官方 Blender 支持线 4.5](https://github.com/dcc-mcp/dcc-mcp-blender)。关闭任意脚本通道，显式关闭 Draco。未确认完整 Blender 4.3 支持、GUI 或通过 MCP 渲染。 |
| dots / Debian 13.6 x86_64 / FreeCAD **1.0.0** | [`dcc-mcp-freecad`](https://github.com/dcc-mcp/dcc-mcp-freecad) / 未发布本地补丁 `f761672f62ab8d0d1ae3d77a6379249e307eeff1` / 真实 MCP + Core **0.20.39** | 修复列表型 `verified` 与 Core 布尔结果契约冲突后，创建、保存、重开、导出和独立回读通过。**本地补丁下 MCP 实测。** 138 tests 通过（含 3 项真实宿主测试），Ruff 通过。 | **补丁未发布，无远端 PR。** 修复前原生写入成功仍未通过 MCP job 验证。本地 commit 是证据标识，不是可获得的已发布版本。 |
| dots / Debian 13.6 x86_64 / Inkscape **1.4** | [`dcc-mcp-inkscape`](https://github.com/dcc-mcp/dcc-mcp-inkscape) / 源码 `9769234` / MCP 发现；原生 action 使用 GUI + 临时 `inkex` 依赖 | 可读取 discovery/capabilities；headless 缺原生 extension action；GUI 生成原生 SVG，但 Linux GLib 双 fork 的 parent PID 1 未通过来源验证。**MCP 制作工作流未完成。** | Linux 源码集成缺口；不能放宽来源检查或宣称制作验收通过。中间 SVG 不代表 MCP 制作 job 成功。 |
| dots / Debian 13.6 x86_64 / OpenSCAD **2021.01** | [`dcc-mcp-openscad`](https://github.com/dcc-mcp/dcc-mcp-openscad) 基线 **0.2.1** + 未发布本地补丁 `799fc2af97d13365613545347e4d4817e9f75b48` / 真实 MCP + Core **0.20.39** | 修复 `verified` 布尔封装后，版本发现、新 session 重开/检查、参数 compile、binary/ASCII STL 导出与独立回读通过。回读 **12 triangles、7200 mm³**，安全拒绝检查通过。**本地补丁下 MCP 实测。** 129 unit tests 通过、4 Windows-only skip，另 2 native tests 通过。 | **补丁未发布。** shell DISPLAY/OpenGL 路径下 PNG 失败。SCAD 源为本地文本创建，适配器没有 authoring API，不能称为通过 MCP 从零建模。 |

## 选择连接方式 {#choose-a-connection}

1. **软件位于 Agent 云电脑：**使用受支持的本地适配器和 CLI，或环境的 MCP 客户端。先核对软件及适配器的精确版本。原生 API 有助于识别集成候选，随后需要类型化适配器验收。
2. **软件位于授权工作站：**DCC endpoint 保持 loopback，通过已批准的电脑连接或受保护网关访问。云 Agent 需要目标项目和产物路径的权限，工作站须保持可用。
3. **Agent 具备 shell：**通过 `dcc-mcp-cli` 完成 inventory、窄范围工具发现和调用；原生 MCP 设置界面不是前提。Command MCP 与 CLI 是不同接口；Core 的 `translate` 是 **stdio → HTTP** 桥接，客户端支持 Command 不等于 DCC stdio 工作流通过。

跨网络使用必须在**前置代理或专用 OAuth 网关提供 TLS 与认证**、限制访问，并让 DCC 绑定 loopback。[Core 0.20.39 的 auth 契约](https://github.com/dcc-mcp/dcc-mcp-core/blob/v0.20.39/docs/guide/remote-server.md#auth)明确：原生 `McpHttpServer` 请求级 Bearer/OAuth/CIMD enforcement 仍在计划中，`ApiKeyConfig` 和 `OAuthConfig` helpers 不是 runtime 安全边界。不能把普通 endpoint 当作已认证的公开服务。

## 安装前提 {#prerequisites}

- 所选环境允许安装或更新软件，目标软件及必要许可证可用。DCC-MCP 插件不包含软件本体、许可证或公开多租户 endpoint。
- 软件版本在适配器支持范围内，原生依赖齐全，使用核验过的官方适配器或明确记录的源码补丁。
- CLI/MCP 连接兼容，live instance 已 ready，项目目录已授权。依赖 GUI 的工具还需平台托管桌面或受支持 display 服务。
- 远程场景需要可达、获准的 TLS/auth 基础设施和由操作者管理的密钥。本页不部署公网 endpoint 或凭据。

参见[通用 Agent 安装指南](/zh/agents)与[适配器目录](/zh/ecosystem)。安装步骤及宿主特定排查仍由适配器仓库维护。

## 带验证的工作流 {#verified-workflow}

从任务专属文档和一个有边界操作开始。例如检查 CAD 零件、修改尺寸、保存、重新打开并核对尺寸，再导出 STEP。这是验收模式；哪些实验确实通过，以上表格已逐项说明。

```bash
# 完成授权安装后，检查当前环境及 live instance。
dcc-mcp-cli doctor
dcc-mcp-cli list

# 仅当目标软件有 ready instance 时继续。
dcc-mcp-cli search --query "inspect document" --dcc-type freecad

# 遵循返回的 next_step 和精确 schema，不猜测 tool slug。
```

inventory 为空或 instance 未 ready 时停止。保留软件/适配器/Core 版本、连接方式、补丁 source commit、request/job ID 和产物检查。保存或导出后，重新打开原生文档或独立检查产物。诊断前保留失败 job 的 ID，不要盲目重放修改。

```text
使用 dcc-mcp Skill，在选定云电脑或授权工作站检查任务专属文档。核对版本与 readiness，以类型化工具完成一个有边界修改，保存并重开结果，验证导出产物。安装软件或修改系统状态前先确认。报告连接方式、验证证据与仍有限制。
```

## 常见问题 {#faq}

### 四个平台是否都支持所有 DCC？

不是。平台接口、预装软件和适配器验收是不同事实。Grok Bot 与 Muse 有已记录的集成接口，但此处没有 DCC 实测；Cue 的所需接口仍未确认。通过的测试也仅适用于记录中的版本和工作流。

### 没有原生 MCP 设置界面，也能使用 DCC-MCP 吗？

可以，前提是 Agent 有授权 shell、可用 `dcc-mcp-cli`，以及可达的本地或受保护 HTTP 网关。还需核对平台是否允许相应执行与连接。具备 shell 本身不会安装软件或授予许可证。

### 为什么原生命令成功，MCP 仍可能失败？

原生命令可能写出文件，但适配器 dispatch、结果验证、job tracking 或来源检查仍可能失败。上面的 FreeCAD 与 Inkscape 就涉及不同边界。类型化工作流和产物回读都通过后，才能认定问题已解决。

### 云 Agent 能使用我有许可证的桌面 DCC 吗？

授权个人电脑连接或受保护网关可能提供此路径。需与操作者核对权限、受支持版本、路径、工作站在线状态与许可证；平台文档没有认证每一种桌面 DCC。

### 此页面会保证 AI 搜索收录或展示吗？

不会。[Google 的 AI 搜索指南](https://developers.google.com/search/docs/appearance/ai-features)要求正常可发现、可读的内容，结构化数据与可见事实一致；不要求特殊 AI 文件或 schema，也不保证收录或展示。[OpenAI crawler 文档](https://developers.openai.com/api/docs/bots)区分搜索抓取与训练抓取。本页保留网站既有 crawler 策略。
