---
title: DCC MCP 集成目录 | Maya MCP、Blender MCP、SP MCP
description: DCC-MCP 官方集成目录，覆盖 Maya MCP、Blender MCP、Houdini MCP、3ds Max MCP、Substance Painter MCP、SP MCP 及更多创意软件。
pageClass: integrations-page
outline: [2, 3]
---

# DCC MCP 集成目录

DCC-MCP 把 Agent 接入团队已经在用的数字内容创作软件。本目录将每个支持的软件、官方适配器仓库和常见搜索词对应起来，包括 **Maya MCP**、**Blender MCP**、**Houdini MCP**、**3ds Max MCP**、**Substance Painter MCP** 与 **SP MCP**。

使用[公开 Skill](https://clawhub.ai/loonghao/skills/dcc-mcp)操作已连接的 DCC，在[Skill 商城](/zh/marketplace)搜索工作流扩展，并通过 [`dcc-mcp-cli dcc-types`](https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/cli-reference)查看实时发布目录。

## 官方 DCC MCP 目录

下表列出部分集成。Core 0.20.39 目录收录了 38 个适配器标识，其中包括 Wwise。更广泛的[生态目录](/zh/ecosystem)中可能包含实验性或独立仓库，只有出现在 `dcc-mcp-cli dcc-types` 后才属于当前发布集成。

| 软件 | 常见搜索词 | 官方集成 |
| --- | --- | --- |
| 3ds Max | 3ds Max MCP、3dsmax MCP | [dcc-mcp-3dsmax](https://github.com/dcc-mcp/dcc-mcp-3dsmax) |
| After Effects | After Effects MCP、AE MCP | [dcc-mcp-aftereffects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) |
| Blender | Blender MCP | [dcc-mcp-blender](https://github.com/dcc-mcp/dcc-mcp-blender) |
| Godot | Godot MCP | [dcc-mcp-godot](https://github.com/dcc-mcp/dcc-mcp-godot) |
| Houdini | Houdini MCP | [dcc-mcp-houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) |
| Katana | Katana MCP | [dcc-mcp-katana](https://github.com/dcc-mcp/dcc-mcp-katana) |
| Maya | Maya MCP、Autodesk Maya MCP | [dcc-mcp-maya](https://github.com/dcc-mcp/dcc-mcp-maya) |
| Marmoset Toolbag | Marmoset MCP、Toolbag MCP | [dcc-mcp-marmoset](https://github.com/dcc-mcp/dcc-mcp-marmoset) |
| MotionBuilder | MotionBuilder MCP、MoBu MCP | [dcc-mcp-mobu](https://github.com/dcc-mcp/dcc-mcp-mobu) |
| Nuke | Nuke MCP | [dcc-mcp-nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) |
| OpenUSD | OpenUSD MCP、USD MCP | [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) |
| Photoshop | Photoshop MCP、Adobe Photoshop MCP | [dcc-mcp-photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) |
| Premiere Pro | Premiere MCP、Premiere Pro MCP | [dcc-mcp-premiere](https://github.com/dcc-mcp/dcc-mcp-premiere) |
| RenderDoc | RenderDoc MCP | [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) |
| Flow Production Tracking | ShotGrid MCP、Flow Production Tracking MCP | [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) |
| Substance 3D Designer | Substance Designer MCP、SD MCP | [dcc-mcp-substance3d-designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) |
| Substance 3D Painter | Substance 3D Painter MCP、Substance Painter MCP、SP MCP | [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) |
| Unity | Unity MCP | [dcc-mcp-unity](https://github.com/dcc-mcp/dcc-mcp-unity) |
| Unreal Engine | Unreal MCP、Unreal Engine MCP | [dcc-mcp-unreal](https://github.com/dcc-mcp/dcc-mcp-unreal) |
| Wwise | Wwise MCP、audio MCP | [dcc-mcp-wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) |
| ZBrush | ZBrush MCP | [dcc-mcp-zbrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) |

## 常见 DCC MCP 搜索

### 有 Maya MCP 吗？

有。官方 [Maya MCP 集成](https://github.com/dcc-mcp/dcc-mcp-maya)将 Autodesk Maya 连接到 DCC-MCP Gateway。连接 Maya 实例后，使用类型化搜索与调用流程发现可用工具。

### 有 Blender MCP 吗？

有。官方 [Blender MCP 集成](https://github.com/dcc-mcp/dcc-mcp-blender)将 Blender 连接到同一个 Gateway，并遵循统一的发现、验证和工作流契约。

### 有 Houdini MCP 吗？

有。官方 [Houdini MCP 集成](https://github.com/dcc-mcp/dcc-mcp-houdini)提供 SideFX Houdini 的仓库与 Host 专属实现。

### SP MCP 是什么？

**SP MCP** 通常是 **Substance Painter MCP** 的简称，官方名称是 **Substance 3D Painter MCP**，由 [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) 提供。需要纹理绘制工作流时，应从该仓库和 DCC-MCP Skill 商城开始查找。

### 如何找到 DCC MCP 工具？

安装公开 DCC-MCP Skill，使用 `dcc-mcp-cli health` 确认 Gateway，用 `dcc-mcp-cli search --query <intent> --dcc-type <host>` 缩小范围，再严格遵循返回的 `next_step`。安装与兼容性细节请阅读对应的 Host 适配器仓库。

## 继续了解

- [在 Agent 中使用 DCC-MCP](/zh/agents)
- [搜索 Skill 商城](/zh/marketplace)
- [理解生产方法](/zh/why-dcc-mcp)
- [浏览完整生态](/zh/ecosystem)
