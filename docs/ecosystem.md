---
title: DCC-MCP Ecosystem
description: The central directory for DCC-MCP adapters, Skills, asset providers, AI services, and production extensions.
pageClass: ecosystem-directory
outline: [2, 2]
---

# One ecosystem. One front door.

DCC-MCP-Core owns the shared control-plane documentation. Each linked repository owns only its host-specific installation, compatibility, and reference material. Agents should begin with the public [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp), then follow a repository link only when the task requires that adapter or extension.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>Operate DCCs</strong><span>dcc-mcp Skill</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Build an adapter</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Build a Skill</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## Foundation and production

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) — Shared gateway, CLI, MCP/REST runtime, safety, diagnostics, and observability.
- [Marketplace search](/marketplace) — Search the official extension catalog used by `dcc-mcp-cli`; [catalog source](https://github.com/dcc-mcp/marketplace).
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) — Autodesk Flow Production Tracking integration.
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) — OpenUSD workflows and interchange Skills.
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) — MaterialX look-development interchange.
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) — Portable publish manifests for DCC, USD, render farm, and tracking workflows.
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) — Deterministic OpenImageIO and OpenColorIO texture workflows.
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) — Offline Houdini cache inspection.
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) — RenderDoc capture and replay automation.
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) — Tracy frame-profiler capture and analysis.

## DCC and creative application adapters

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) — Autodesk 3ds Max.
- [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) — Adobe After Effects.
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) — Blender add-on and embedded server.
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) — Workflow execution through REST and WebSocket APIs.
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) — GIMP 3.
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) — Godot Engine and 2D game-authoring Skills.
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) — SideFX Houdini.
- [Katana](https://github.com/dcc-mcp/dcc-mcp-katana) — Foundry Katana.
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) — Krita.
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) — Procedural material authoring.
- [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) — Autodesk Maya.
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) — PBR material authoring, scene inspection, and rendering.
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) — Autodesk MotionBuilder.
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) — Foundry Nuke.
- [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) — Adobe Photoshop through UXP.
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) — Adobe Premiere Pro.
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) — Adobe Substance 3D Designer.
- [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) — Adobe Substance 3D Painter.
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) — Tiled map editor.
- [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) — Derivative TouchDesigner.
- [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) — Unity Editor and game-authoring Skills.
- [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) — Unreal Engine plug-in.
- [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) — Audiokinetic Wwise authoring through typed WAAPI tools.
- [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) — Maxon ZBrush.

## Specialized Maya Skills

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) — AdvancedSkeleton rigging workflows.
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) — mGear Shifter integration.
- [Procedural architecture](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) — Maya, Bifrost, and Arnold architecture workflows.

## AI creation services

- [Hunyuan 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) — Text and image to 3D generation.
- [OpenAI Image](https://github.com/dcc-mcp/dcc-ai-openai-image) — Image generation and editing for DCC texture workflows.
- [Tripo 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) — Text, image, and multiview to 3D generation.

## Asset providers

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Blender Extensions](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [Free Media](https://github.com/dcc-mcp/dcc-asset-free-media)
- [Geospatial](https://github.com/dcc-mcp/dcc-asset-geospatial) · [glTF Sample Assets](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [Google Scanned Objects](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [Kenney](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [Objaverse](https://github.com/dcc-mcp/dcc-asset-objaverse) · [Poly Haven](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [Quaternius](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)

## UI intelligence and shared runtimes

- [Qt Actions](https://github.com/dcc-mcp/dcc-ui-qt-actions) — Reusable typed actions for Qt-based DCC interfaces.
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) — Cross-host window and widget discovery.
- [UI Workflow Memory](https://github.com/dcc-mcp/dcc-ui-workflow-memory) — Verified selectors, recipes, and failure memory.
- [adobepy](https://github.com/dcc-mcp/adobepy) — Shared Adobe desktop communication runtime.

> Project availability and installation support can change between releases. Use `dcc-mcp-cli dcc-types` for the release catalog and `dcc-mcp-cli marketplace search` for installable extensions.
