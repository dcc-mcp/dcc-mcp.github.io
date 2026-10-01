---
title: DCC-MCP 项目目录
description: 查找 DCC-MCP 支持的创作软件、工作流 Skills、资产来源、生成服务和制作管线工具，并了解各项目的用途与发布状态。
pageClass: ecosystem-directory
outline: [2, 2]
---

# 项目目录

这里收录供 AI 智能体（Agent）和自动化程序使用的创作工具。DCC 指数字内容创作（Digital Content Creation）。
先加载公开的 [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp) 工作流指南，再按任务选择适配器或扩展。
各项目仓库负责说明安装、兼容性和应用 API；Core 文档说明共享的连接和调用机制。
下文的“类型化工具”指明确规定了参数、参数类型和返回结果的工具，调用前可以查询和校验。

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>操作创作软件</strong><span>dcc-mcp Skill</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>开发适配器</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>开发 Skill</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## 共享基础设施与 Pipeline 工具

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) — 提供共享网关、CLI、MCP/REST 接口，以及安全检查、诊断和运行状态监测。
- [dcc-mcp-runtime](https://github.com/dcc-mcp/dcc-mcp-runtime) — 为外部 DCC-MCP 适配器提供共享 Python 运行时与 Manifest 契约。
- [Marketplace 搜索](/zh/marketplace) — 搜索 `dcc-mcp-cli` 使用的官方扩展目录；[目录源仓库](https://github.com/dcc-mcp/marketplace)。
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) — 接入 Autodesk Flow Production Tracking。
- [fpt-cli](https://github.com/dcc-mcp/fpt-cli) — 面向 Autodesk Flow Production Tracking 自动化的 Rust 命令行工具。
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) — OpenUSD 工作流与格式交换 Skills。
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) — 通过 MaterialX 交换材质和视觉开发数据。
- [dcc-lookdev](https://github.com/dcc-mcp/dcc-lookdev) — 标准化的跨应用 PBR 材质与视觉开发流程。
- [dcc-modeling-spec](https://github.com/dcc-mcp/dcc-modeling-spec) — 基于 Modeling Spec v2，为 Maya、Blender、Houdini 和 3ds Max 提供不依赖单一应用的建模检查规则与评审文件。
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) — 为 DCC、USD、渲染农场和制作跟踪流程提供通用发布清单。
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) — 使用 OpenImageIO 和 OpenColorIO 处理纹理，确保相同输入得到一致结果。
- [dcc-itchio](https://github.com/dcc-mcp/dcc-itchio) — 安全获取 itch.io 资产，并在预览检查通过后发布游戏的 Skills。
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) — 离线检查 SideFX 缓存，在限制读取范围的同时保护原始数据隐私。它是不依赖特定应用的 Marketplace Skill，不提供适配器或 PyPI 包。
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) — 自动执行 RenderDoc 帧捕获和回放。
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) — 使用 Tracy 捕获和分析帧性能数据。

## DCC 与创意应用适配器

想了解 AI 如何操作某个应用，可先阅读[按应用整理的控制指南](/zh/use-cases)，其中提供任务说明和可直接使用的 Agent 提示词。
安装方法、兼容性和应用 API 以对应适配器仓库为准。

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) — Autodesk 3ds Max。
- [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) — Adobe After Effects。
- [AutoCAD](https://github.com/dcc-mcp/dcc-mcp-autocad) — 通过 COM 与无界面的 `accoreconsole.exe` 自动处理 DWG，优先提供可移植工作流；当前可用功能与安装方式以所属仓库为准。
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) — Blender 插件与内嵌服务。
- [CapCut](https://github.com/dcc-mcp/dcc-mcp-capcut) — 通过经身份验证的本地通信桥接，用类型化工具操作 CapCut 桌面版。
- [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) — 通过类型化工具在无界面模式下处理文档、基础几何体、格式交换和渲染。
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) — 根据运行中的节点定义校验工作流，在限定范围内执行队列任务并获取输出文件。[ComfyUI MCP 指南](/zh/control/comfyui) 包含游戏 UI、透明 PNG 和 Pixal3D/PBR GLB 工作流，并分别说明源码和发布包支持的功能。
- [Epic Games Launcher 与 Fab](https://github.com/dcc-mcp/dcc-mcp-epic) — 源码预览项目，用于查询已安装的引擎、检查项目，并通过 Fab 提供的接口执行指定范围内的操作。尚无 tag 或 GitHub Release，未列入 Core 0.20.25 发布目录。参见 [Epic Games 控制指南](/zh/control/epic-games)。
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) — 参数化 CAD 建模、拓扑验证和网格格式交换。
- [Gaea](https://github.com/dcc-mcp/dcc-mcp-gaea) — 源码预览项目，通过类型化工具提交 Build Swarm 地形任务并检查输出。尚无 tag 或 GitHub Release，未列入 Core 0.20.25 发布目录；使用正版授权运行地形构建和导入 Unreal 的流程尚未完成验证。参见 [Gaea 控制指南](/zh/control/gaea)。
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) — GIMP 3。
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) — Godot 引擎与 2D 游戏制作 Skills。
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) — SideFX Houdini。
- [Illustrator](https://github.com/dcc-mcp/dcc-mcp-illustrator) — 通过类型化工具和官方 DOM 接口处理文档、编辑矢量图形并导出制作文件。
- [Katana](https://github.com/dcc-mcp/dcc-mcp-katana) — Foundry Katana。
- [Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive) — 制作 Kdenlive 工程、通过 MLT 渲染，并使用 DCC-CUA 操作编辑器。
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) — Krita。
- [LiquiGen](https://github.com/dcc-mcp/dcc-mcp-liquigen) — 通过类型化工具检查节点网络，在指定范围内运行模拟，导出 VAT 并交给 Unreal Engine 使用；已作为 `liquigen` 列入 Core 0.20.25 发布目录。
- [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) — 处理 Foundry Mari 工程、几何体、节点网络、材质与纹理导出。
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) — 制作程序化材质。
- [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) — Autodesk Maya。
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) — 制作 PBR 材质、检查场景并渲染。
- [Marvelous Designer](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer) — 源码预览项目，通过类型化工具处理服装、模拟、保存和导出。尚无 tag 或 GitHub Release，未列入 Core 0.20.25 发布目录；正版授权应用中的实际验收尚未完成。参见 [Marvelous Designer 控制指南](/zh/control/marvelous-designer)。
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) — Autodesk MotionBuilder。
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) — Foundry Nuke。
- [OBS Studio](https://github.com/dcc-mcp/dcc-mcp-obs) — 绑定指定进程，检查场景和来源，并通过类型化工具控制录制；已作为 `obs` 列入 Core 0.20.25 发布目录。安装适配器不会安装 OBS Studio 本体。
- [Office](https://github.com/dcc-mcp/dcc-mcp-office) — Office 共用基础组件，包括 office-rpc/1 协议、C# COM 辅助进程、Open XML 处理程序、Microsoft Graph 连接器和通用 Skills。
- [PowerPoint](https://github.com/dcc-mcp/dcc-mcp-powerpoint) — 将 Deck IR 编译为 Open XML 演示文稿，再通过桌面 COM 接口渲染。
- [Word](https://github.com/dcc-mcp/dcc-mcp-word) — 文档、域和重排版功能（计划于第二阶段实现）。
- [Excel](https://github.com/dcc-mcp/dcc-mcp-excel) — 工作簿、公式、图表和制作看板（计划于第二阶段实现）。
- [Outlook](https://github.com/dcc-mcp/dcc-mcp-outlook) — 邮件草稿和日历（计划于第三阶段实现）。
- [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) — 验证声明式参数化 CAD 模型、渲染预览并导出网格。
- [OpenScreen](https://github.com/dcc-mcp/dcc-mcp-openscreen) — 源码预览项目，提供 `sources`、`record` 和 `export` 类型化操作。尚无 tag 或 GitHub Release，未列入 Core 0.20.25 发布目录；源码测试通过不代表已完成 Windows 实际录制验收。参见 [OpenScreen 控制指南](/zh/control/openscreen)。
- [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) — 通过 UXP 接入 Adobe Photoshop。
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) — Adobe Premiere Pro。
- [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) — 通过经过身份验证的 Ruby 桥接和类型化工具完成建模、材质、标签、场景、验证和格式交换操作。
- [Shōgun](https://github.com/dcc-mcp/dcc-mcp-shogun) — 0.4.0 提供 48 个基于官方 SDK 的类型化工具，可检查场景对象、属性、通道、光学相机和文件，控制时间线；执行离线处理或修改其设置前，会先检查应用是否支持对应功能。
- [SpeedTree](https://github.com/dcc-mcp/dcc-mcp-speedtree) — 源码预览项目，绑定指定实例，通过官方 Hook 接口调用应用报告的可用功能。尚无 tag 或 GitHub Release，未列入 Core 0.20.25 发布目录。一次实际 ST9 交接已在 Unreal Engine 5.5.4 中验证一棵棕榈树；碰撞比例和动态风仍未验收。参见 [SpeedTree MCP 指南](/zh/control/speedtree)。
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) — Adobe Substance 3D Designer。
- [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) — Adobe Substance 3D Painter。
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) — Tiled 地图编辑器。
- [Tracy Profiler](https://github.com/dcc-mcp/dcc-mcp-tracy) — 已独立发布 v0.2.5，用于在指定范围内捕获 Tracy 数据，并离线分析 Zone。它未列入 Core 0.20.25 的应用路由，且要求目标程序事先集成 Tracy 的性能监测代码。参见 [Tracy 控制指南](/zh/control/tracy)。
- [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) — Derivative TouchDesigner。
- [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) — Unity 编辑器与游戏制作 Skills。
- [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) — Unreal Engine 插件。
- [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) — 通过类型化 WAAPI 工具使用 Audiokinetic Wwise 制作音频。
- [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) — Maxon ZBrush。

## Maya 专项 Skills

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) — AdvancedSkeleton 绑定工作流。
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) — mGear Shifter 集成。
- [程序化建筑](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) — Maya、Bifrost 与 Arnold 建筑工作流。

## 生成服务

本地生成可参见 [ComfyUI 游戏素材工作流](/zh/control/comfyui)，其中分别说明源码和发布包支持的功能。

- [Hunyuan 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) — 根据文字或图片生成 3D 模型。
- [OpenAI Image](https://github.com/dcc-mcp/dcc-ai-openai-image) — 为 DCC 纹理工作流生成和编辑图片。
- [Tripo 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) — 根据文字、图片或多视图生成 3D 模型。

## 资产提供方

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Blender Extensions](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [Free Media](https://github.com/dcc-mcp/dcc-asset-free-media)
- [Geospatial](https://github.com/dcc-mcp/dcc-asset-geospatial) · [glTF Sample Assets](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [Google Scanned Objects](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [Kenney](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [Objaverse](https://github.com/dcc-mcp/dcc-asset-objaverse) · [Poly Haven](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [Quaternius](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)
- [Pirate Nation](https://github.com/dcc-mcp/dcc-asset-pirate-nation) — 接入游戏资产来源。
- [Poly Pizza](https://github.com/dcc-mcp/dcc-asset-poly-pizza) — 搜索和下载 Poly Pizza 低多边形模型，并保留其授权信息和来源记录。

## UI 自动化与共享运行时

- [winget-releaser](https://github.com/dcc-mcp/winget-releaser) — 为应用维护者自动处理 Windows Package Manager 发布。
- [Qt Actions](https://github.com/dcc-mcp/dcc-ui-qt-actions) — 为基于 Qt 的 DCC 界面提供可复用的类型化操作。
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) — 查找不同应用中的窗口和控件。
- [UI Workflow Memory](https://github.com/dcc-mcp/dcc-ui-workflow-memory) — 保存验证过的控件定位方式、操作流程和失败记录。
- [adobepy](https://github.com/dcc-mcp/adobepy) — Adobe 桌面应用共用的通信运行时。

## 组织与发现入口

以下入口补充外部只读连接器和项目文档。请通过已安装的 CLI 目录确认可用性；
有公开仓库或远程连接器，不代表本机已有可调用的应用实例。

- [Autodesk Product Help](https://developer.api.autodesk.com/knowledge/public/v1/mcp) — Core 0.20.25 提供的可选外部文档连接器，标识为 `autodesk-help`。它只支持查询，不是 DCC 适配器，也不能修改应用内容。

- [官网源码](https://github.com/dcc-mcp/dcc-mcp.github.io) — 共享文档、AI 搜索优化（GEO）元数据、各应用的控制指南和案例。
- <a href="https://dcc-mcp.github.io/showcase/" target="_self">Showcase 作品合集</a> — 成品、可复用提示词、工程来源、各项许可与明确的制作证据。[合集源码与贡献入口](https://github.com/dcc-mcp/showcase)。[适配器案例与提示词](/zh/examples) 保留原有验证范围。
- [Agent 插件](https://github.com/dcc-mcp/dcc-mcp-agent-plugins) — 为支持的 AI 客户端维护官方 DCC-MCP Skills 和插件包。
- [dcc-cua](https://github.com/dcc-mcp/dcc-cua) — 跨平台的计算机操作自动化运行时，用于在限定范围内操作 DCC 界面。
- [组织主页配置](https://github.com/dcc-mcp/.github) — GitHub 组织主页和共享社区配置。

> 项目可用性和安装支持会随版本变化。使用 `dcc-mcp-cli dcc-types` 查询发布目录，使用 `dcc-mcp-cli marketplace search` 查询可安装扩展。
