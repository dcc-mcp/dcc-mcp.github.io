---
title: DCC-MCP project directory
description: Directory of DCC-MCP adapters, Skills, asset providers, generation services, and pipeline extensions.
pageClass: ecosystem-directory
outline: [2, 2]
---

# Project directory

Core documents the shared control plane. Each linked repository documents its
own installation, compatibility, and host-specific API. Start with the public
[`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp), then open an
adapter or extension repository when the task needs it.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>Operate DCCs</strong><span>dcc-mcp Skill</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Build an adapter</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Build a Skill</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## Shared infrastructure and pipeline tools

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) — Shared gateway, CLI, MCP/REST runtime, safety, diagnostics, and observability.
- [Marketplace search](/marketplace) — Search the official extension catalog used by `dcc-mcp-cli`; [catalog source](https://github.com/dcc-mcp/marketplace).
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) — Autodesk Flow Production Tracking integration.
- [fpt-cli](https://github.com/dcc-mcp/fpt-cli) — Automation-first Rust CLI for Autodesk Flow Production Tracking.
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) — OpenUSD workflows and interchange Skills.
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) — MaterialX look-development interchange.
- [dcc-lookdev](https://github.com/dcc-mcp/dcc-lookdev) — Standardized cross-DCC PBR look-development workflows.
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) — Portable publish manifests for DCC, USD, render farm, and tracking workflows.
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) — Deterministic OpenImageIO and OpenColorIO texture workflows.
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) — Host-neutral Marketplace Skill for bounded, privacy-safe offline SideFX cache inspection; no adapter or PyPI package.
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) — RenderDoc capture and replay automation.
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) — Tracy frame-profiler capture and analysis.

## DCC and creative application adapters

For natural-language control questions and safe Agent prompts, start with the
[application-specific AI control guides](/use-cases), then use the linked
adapter repository as the source of truth for installation and host details.

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) — Autodesk 3ds Max.
- [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) — Adobe After Effects.
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) — Blender add-on and embedded server.
- [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) — Typed headless document, primitive, interchange, and render automation.
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) — Live node-contract validation, bounded queue execution, normalized job status, and artifact retrieval through the local REST API.
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) — Parametric CAD modeling, topology validation, and mesh interchange.
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) — GIMP 3.
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) — Godot Engine and 2D game-authoring Skills.
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) — SideFX Houdini.
- [Illustrator](https://github.com/dcc-mcp/dcc-mcp-illustrator) — Typed Adobe Illustrator documents, vector artwork, official DOM editing, and production export.
- [Katana](https://github.com/dcc-mcp/dcc-mcp-katana) — Foundry Katana.
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) — Krita.
- [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) — Foundry Mari projects, geometry, node graphs, look development, and texture export.
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) — Procedural material authoring.
- [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) — Autodesk Maya.
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) — PBR material authoring, scene inspection, and rendering.
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) — Autodesk MotionBuilder.
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) — Foundry Nuke.
- [Office](https://github.com/dcc-mcp/dcc-mcp-office) — Shared office core: office-rpc/1 protocol, C# COM sidecar, Open XML worker, Microsoft Graph connector, and Office-wide Skills.
- [PowerPoint](https://github.com/dcc-mcp/dcc-mcp-powerpoint) — Deck generation from Deck IR through Open XML compile and desktop COM render.
- [Word](https://github.com/dcc-mcp/dcc-mcp-word) — Word documents, fields, and reflow (planned, Phase 2).
- [Excel](https://github.com/dcc-mcp/dcc-mcp-excel) — Workbooks, formulas, charts, and production dashboards (planned, Phase 2).
- [Outlook](https://github.com/dcc-mcp/dcc-mcp-outlook) — Mail drafts and calendar (planned, Phase 3).
- [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) — Declarative parametric CAD validation, preview rendering, and mesh export.
- [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) — Adobe Photoshop through UXP.
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) — Adobe Premiere Pro.
- [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) — Typed modeling, materials, Tags, scenes, validation, and interchange through an authenticated Ruby bridge.
- [Shōgun](https://github.com/dcc-mcp/dcc-mcp-shogun) — 48 typed official-SDK tools for Scene objects, attributes, channels, optical cameras, files, Timeline control, and capability-gated Offline processing settings and operations.
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

## Generation services

- [Hunyuan 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) — Text and image to 3D generation.
- [OpenAI Image](https://github.com/dcc-mcp/dcc-ai-openai-image) — Image generation and editing for DCC texture workflows.
- [Tripo 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) — Text, image, and multiview to 3D generation.

## Asset providers

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Blender Extensions](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [Free Media](https://github.com/dcc-mcp/dcc-asset-free-media)
- [Geospatial](https://github.com/dcc-mcp/dcc-asset-geospatial) · [glTF Sample Assets](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [Google Scanned Objects](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [Kenney](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [Objaverse](https://github.com/dcc-mcp/dcc-asset-objaverse) · [Poly Haven](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [Quaternius](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)
- [Pirate Nation](https://github.com/dcc-mcp/dcc-asset-pirate-nation) — Game asset provider integration.

## UI automation and shared runtimes

- [Qt Actions](https://github.com/dcc-mcp/dcc-ui-qt-actions) — Reusable typed actions for Qt-based DCC interfaces.
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) — Cross-host window and widget discovery.
- [UI Workflow Memory](https://github.com/dcc-mcp/dcc-ui-workflow-memory) — Verified selectors, recipes, and failure memory.
- [adobepy](https://github.com/dcc-mcp/adobepy) — Shared Adobe desktop communication runtime.

## Organization and discovery surfaces

- [Official website source](https://github.com/dcc-mcp/dcc-mcp.github.io) — Shared documentation, GEO metadata, application-control guides, and showcases.
- [Agent plugins](https://github.com/dcc-mcp/dcc-mcp-agent-plugins) — Canonical DCC-MCP Skills and plugin packages for supported agent clients.
- [dcc-cua](https://github.com/dcc-mcp/dcc-cua) — Cross-platform Computer Use Automation runtime used by bounded DCC UI workflows.
- [Organization profile](https://github.com/dcc-mcp/.github) — Shared GitHub profile and community configuration.

> Project availability and installation support can change between releases. Use `dcc-mcp-cli dcc-types` for the release catalog and `dcc-mcp-cli marketplace search` for installable extensions.
