---
title: DCC-MCP 项目目录
description: DCC-MCP 适配器、Skills、资产提供方、生成服务与 Pipeline 扩展目录。
pageClass: ecosystem-directory
outline: [2, 2]
---

# 项目目录

Core 记录共享控制平面；各仓库记录自己的安装、兼容性和 Host 专属 API。
先加载公开 [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp)，
任务需要时再进入对应适配器或扩展仓库。

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>操作 DCC</strong><span>dcc-mcp Skill</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>构建适配器</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>构建 Skill</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## 共享基础设施与 Pipeline 工具

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) — 共享 Gateway、CLI、MCP/REST 运行时、安全、诊断与可观测性。
- [Marketplace 搜索](/zh/marketplace) — 搜索 `dcc-mcp-cli` 使用的官方扩展目录；[目录源仓库](https://github.com/dcc-mcp/marketplace)。
- [Flow Production Tracking](https://github.com/dcc-mcp/dcc-mcp-fpt) · [OpenUSD](https://github.com/dcc-mcp/dcc-mcp-openusd) · [MaterialX](https://github.com/dcc-mcp/dcc-materialx)
- [Pipeline Publish](https://github.com/dcc-mcp/dcc-pipeline-publish) · [Texture Pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) · [Cache Inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector)（Host-neutral Marketplace Skill，无适配器与 PyPI 包）
- [RenderDoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) · [Tracy](https://github.com/dcc-mcp/dcc-mcp-tracy)

## DCC 与创意应用适配器

自然语言控制问题和安全 Agent 提示词先从[逐应用 AI 控制指南](/zh/use-cases)
开始；安装和 Host 专属细节仍以对应适配器仓库为事实来源。

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) · [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) · [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) · [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) · [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui)
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) · [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) · [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) · [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) · [Illustrator](https://github.com/dcc-mcp/dcc-mcp-illustrator) · [Katana](https://github.com/dcc-mcp/dcc-mcp-katana)
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) · [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) · [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) · [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) · [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) · [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu)
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) · [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) · [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) · [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) · [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) · [Shōgun](https://github.com/dcc-mcp/dcc-mcp-shogun)
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) · [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter)
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) · [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) · [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) · [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) · [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) · [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush)

## Maya 专项 Skills

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) — AdvancedSkeleton 绑定工作流。
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) — mGear Shifter 集成。
- [程序化建筑](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) — Maya、Bifrost 与 Arnold 建筑工作流。

## 生成服务

- [Hunyuan 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) — 文本或图片生成 3D。
- [OpenAI Image](https://github.com/dcc-mcp/dcc-ai-openai-image) — 为 DCC 纹理工作流生成与编辑图片。
- [Tripo 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) — 文本、图片与多视图生成 3D。

## 资产提供方

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Blender Extensions](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [Free Media](https://github.com/dcc-mcp/dcc-asset-free-media)
- [Geospatial](https://github.com/dcc-mcp/dcc-asset-geospatial) · [glTF Sample Assets](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [Google Scanned Objects](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [Kenney](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [Objaverse](https://github.com/dcc-mcp/dcc-asset-objaverse) · [Poly Haven](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [Quaternius](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)

## UI 自动化与共享运行时

- [Qt Actions](https://github.com/dcc-mcp/dcc-ui-qt-actions) — Qt DCC 的可复用类型化 UI 动作。
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) — 跨 Host 窗口与控件发现。
- [UI Workflow Memory](https://github.com/dcc-mcp/dcc-ui-workflow-memory) — 已验证的 Selector、Recipe 与失败记忆。
- [adobepy](https://github.com/dcc-mcp/adobepy) — Adobe 桌面通信共享运行时。

> 项目可用性和安装支持会随版本变化。使用 `dcc-mcp-cli dcc-types` 查询发布目录，使用 `dcc-mcp-cli marketplace search` 查询可安装扩展。
