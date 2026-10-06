---
title: DCC-MCP project directory
description: Find creative applications, workflow Skills, asset providers, generation services, and pipeline tools in DCC-MCP, with project purposes and release status.
pageClass: ecosystem-directory
outline: [2, 2]
---

# Project directory

This directory lists creative tools for AI agents and automation. DCC means digital content creation.
Start with the public [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp)
workflow guide, then choose the adapter or extension for your task.
Each project documents its own installation, compatibility, and application APIs;
Core documents the shared connection and invocation infrastructure.
A typed tool defines its parameters, their types, and its results so a call can be inspected and validated.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>Operate creative software</strong><span>dcc-mcp Skill</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Build an adapter</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Build a Skill</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## Shared infrastructure and pipeline tools

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) — Shared gateway, CLI, MCP/REST runtime, safety, diagnostics, and observability.
- [dcc-mcp-runtime](https://github.com/dcc-mcp/dcc-mcp-runtime) — Shared Python runtime and manifest contract for external DCC-MCP adapters.
- [Marketplace search](/marketplace) — Search the official extension catalog used by `dcc-mcp-cli`; [catalog source](https://github.com/dcc-mcp/marketplace).
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) — Autodesk Flow Production Tracking integration.
- [fpt-cli](https://github.com/dcc-mcp/fpt-cli) — Automation-first Rust CLI for Autodesk Flow Production Tracking.
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) — OpenUSD workflows and interchange Skills.
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) — MaterialX look-development interchange.
- [dcc-lookdev](https://github.com/dcc-mcp/dcc-lookdev) — Standardized cross-DCC PBR look-development workflows.
- [dcc-modeling-spec](https://github.com/dcc-mcp/dcc-modeling-spec) — Host-neutral Modeling Spec v2 gates and review artifacts for Maya, Blender, Houdini, and 3ds Max workflows.
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) — Portable publish manifests for DCC, USD, render farm, and tracking workflows.
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) — Deterministic OpenImageIO and OpenColorIO texture workflows.
- [dcc-itchio](https://github.com/dcc-mcp/dcc-itchio) — Safe itch.io asset acquisition and preview-gated game publishing Skills.
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) — Host-neutral Marketplace Skill for bounded, privacy-safe offline SideFX cache inspection; no adapter or PyPI package.
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) — RenderDoc capture and replay automation.
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) — Tracy frame-profiler capture and analysis.

## DCC and creative application adapters

For natural-language control questions and safe Agent prompts, start with the
[application-specific AI control guides](/use-cases), then use the linked
adapter repository as the source of truth for installation and host details.

The signed remote catalog checked by the official CLI 0.20.39 lists 38 adapter
identifiers. Catalog installation is available for 33; `kdenlive`,
`material-maker`, `powerpoint`, `tiled`, and `wwise` have
`catalog_install_available=false`. A catalog definition or an independent
adapter release does not establish a live host or completed production acceptance.

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) — Autodesk 3ds Max.
- [3D Slicer](https://github.com/dcc-mcp/dcc-mcp-slicer) — Bounded synthetic volumes, material phantoms, and sphere meshes with NRRD/STL export, MRB scene round-trips, camera and slice setup, and PNG previews. Synthetic data only: no patient data, DICOM import, clinical claims, or arbitrary scene loading. Source candidate pinned to Core and server 0.20.41 with native requalification pending; not an adapter identifier in the catalog checked by CLI 0.20.39.
- [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) — Adobe After Effects.
- [AutoCAD](https://github.com/dcc-mcp/dcc-mcp-autocad) — Portable-first DWG automation through COM and headless `accoreconsole.exe`; check the owning repository for current availability and setup.
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) — Blender add-on and embedded server.
- [CapCut](https://github.com/dcc-mcp/dcc-mcp-capcut) — Typed CapCut Desktop adapter using an authenticated local bridge.
- [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) — Typed headless document, primitive, interchange, and render automation.
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) — Live node-contract validation, bounded queue execution and artifact retrieval. The [ComfyUI MCP guide](/control/comfyui) covers local game UI, transparent PNG and Pixal3D/PBR GLB recipes, including source-versus-release availability.
- [Epic Games Launcher and Fab](https://github.com/dcc-mcp/dcc-mcp-epic) — Independently released v0.2.1 ([release source](https://github.com/dcc-mcp/dcc-mcp-epic/tree/1157defe203aab4beaa8f7be56f8063caac2a415)) for installed-engine inventory, project checks, and bounded provider-owned Fab operations; not an adapter identifier in the catalog checked by CLI 0.20.39. Engine installation remains plan-only without a verified native provider; login, CAPTCHA, purchases, and license acceptance remain human-owned. See the [Epic Games control guide](/control/epic-games).
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) — Parametric CAD modeling, topology validation, and mesh interchange.
- [Gaea](https://github.com/dcc-mcp/dcc-mcp-gaea) — Independently released v0.1.1 ([release source](https://github.com/dcc-mcp/dcc-mcp-gaea/tree/b95d3f81b8f883732c73d268658100d09d9cad84)) for typed Build Swarm terrain jobs and output verification; not an adapter identifier in the catalog checked by CLI 0.20.39. Real licensed builds, process-tree cancellation, terrain quality, and Unreal imports remain unverified. See the [Gaea control guide](/control/gaea).
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) — GIMP 3.
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) — Godot Engine and 2D game-authoring Skills.
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) — SideFX Houdini.
- [Illustrator](https://github.com/dcc-mcp/dcc-mcp-illustrator) — Typed Adobe Illustrator documents, vector artwork, official DOM editing, and production export.
- [Inkscape](https://github.com/dcc-mcp/dcc-mcp-inkscape) — Source integration outside the catalog checked by CLI 0.20.39. The cloud MCP production workflow remains blocked by provenance validation; see the [cloud test record](/cloud-agents#cloud-mcp-tests).
- [Katana](https://github.com/dcc-mcp/dcc-mcp-katana) — Foundry Katana.
- [Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive) — Project authoring, MLT rendering, and shared DCC-CUA editor control. The repository has independently released v0.1.1 ([release source](https://github.com/dcc-mcp/dcc-mcp-kdenlive/tree/376c812047b308239174aa1bbb662da1908f829e)); the catalog checked by CLI 0.20.39 lists `kdenlive` at 0.1.0 with `catalog_install_available=false`. This catalog check did not perform live editor or render acceptance. See the [Kdenlive control guide](/control/kdenlive).
- [KiCad](https://github.com/dcc-mcp/dcc-mcp-kicad) — Typed headless KiCad 9 board work through the native `pcbnew` API and `kicad-cli`; it owns an isolated board instead of attaching to PCB Editor or providing IPC/UI control. Source candidate pinned to Core and server 0.20.41 with native requalification pending; no release, and not an adapter identifier in the catalog checked by CLI 0.20.39.
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) — Krita.
- [LiquiGen](https://github.com/dcc-mcp/dcc-mcp-liquigen) — Typed node-graph inspection, bounded simulation controls, VAT export, and Unreal Engine handoff; listed as `liquigen` in the catalog checked by CLI 0.20.39.
- [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) — Foundry Mari projects, geometry, node graphs, look development, and texture export.
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) — Procedural material authoring; the catalog checked by CLI 0.20.39 lists version 0.3.1 with `catalog_install_available=false`.
- [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) — Autodesk Maya.
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) — PBR material authoring, scene inspection, and rendering.
- [Marvelous Designer](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer) — Independently released v0.1.1 ([release source](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer/tree/4d4d289905f82290804b288d03d84d541b01af08)) for typed garment, simulation, save, and export operations; not an adapter identifier in the catalog checked by CLI 0.20.39. Licensed-host, Qt bootstrap, cloth simulation, and engine-handoff acceptance remain outstanding. See the [Marvelous Designer control guide](/control/marvelous-designer).
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) — Autodesk MotionBuilder.
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) — Foundry Nuke.
- [OBS Studio](https://github.com/dcc-mcp/dcc-mcp-obs) — Exact-process scene/source inspection and typed recording control; listed as `obs` in the catalog checked by CLI 0.20.39. Installing the adapter does not install OBS Studio.
- [Office](https://github.com/dcc-mcp/dcc-mcp-office) — Shared `office` application route: office-rpc/1 protocol, C# COM sidecar, Open XML worker, Microsoft Graph connector, and Office-wide Skills. This shared route is separate from the 38 adapter identifiers reported by CLI 0.20.39; application-specific availability remains owned by each adapter.
- [PowerPoint](https://github.com/dcc-mcp/dcc-mcp-powerpoint) — Deck generation from Deck IR through Open XML compile and desktop COM render; the catalog checked by CLI 0.20.39 lists version 0.1.0 with `catalog_install_available=false`.
- [Word](https://github.com/dcc-mcp/dcc-mcp-word) — Word documents, fields, and reflow (planned; the adapter repository is still a placeholder with no release).
- [Excel](https://github.com/dcc-mcp/dcc-mcp-excel) — Workbooks, formulas, charts, and production dashboards (planned; the adapter repository is still a placeholder with no release).
- [Outlook](https://github.com/dcc-mcp/dcc-mcp-outlook) — Mail drafts and calendar — not planned. The earlier Phase 3 plan has been withdrawn: Outlook is reachable only through MAPI/COM, requires an installed Outlook plus interactive first-run consent, and cannot be verified in CI. A Microsoft Graph path would be the precondition for revisiting it.
- [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) — Declarative parametric CAD validation, preview rendering, and mesh export.
- [OpenScreen](https://github.com/dcc-mcp/dcc-mcp-openscreen) — Independently released v0.1.1 ([release source](https://github.com/dcc-mcp/dcc-mcp-openscreen/tree/5a32837d9d1b3bd2aea04bf61e61b4a54bbd5262)) with typed `sources`, `record`, and `export` operations; not an adapter identifier in the catalog checked by CLI 0.20.39. Source tests do not establish live Windows recording acceptance; unsupported window selection remains owned by dcc-cua and ui-control. See the [OpenScreen control guide](/control/openscreen).
- [ParaView](https://github.com/dcc-mcp/dcc-mcp-paraview) — Typed persistent ParaView pipelines: bounded primitives, plane clips and slices, contour extraction, verified dataset export, PVSM state saves, and display-backed PNG previews. Source candidate pinned to Core and server 0.20.41 with native requalification pending; no published release, and not an adapter identifier in the catalog checked by CLI 0.20.39.
- [PhotoCraft](https://github.com/dcc-mcp/dcc-mcp-photocraft) — Experimental typed adapter for the official PhotoCraft 0.2.0 headless engine, owning one stdio process for documents, layers, masks, selections, adjustments, previews, and exports. It bundles no application and opens no desktop window; not an adapter identifier in the catalog checked by CLI 0.20.39.
- [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) — Adobe Photoshop through UXP.
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) — Adobe Premiere Pro.
- [QGIS](https://github.com/dcc-mcp/dcc-mcp-qgis) — Typed QGIS project and vector editing over MCP, from an adapter-owned headless PyQGIS process with an isolated project; it does not attach to a running QGIS desktop session. Source candidate pinned to Core and server 0.20.41 with native revalidation required; no PyPI package or GitHub release, and not an adapter identifier in the catalog checked by CLI 0.20.39.
- [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) — Typed modeling, materials, Tags, scenes, validation, and interchange through an authenticated Ruby bridge.
- [Shōgun](https://github.com/dcc-mcp/dcc-mcp-shogun) — Typed official-SDK tools for Scene objects, attributes, channels, optical cameras, files, Timeline control, and capability-gated Offline processing settings and operations. Discover the live instance's tools before operating.
- [SpeedTree](https://github.com/dcc-mcp/dcc-mcp-speedtree) — Independently released v0.1.1 ([release source](https://github.com/dcc-mcp/dcc-mcp-speedtree/tree/595f0bd308aa0f4f0635a399c2b63bd76f16caf8)) for an exact-instance, official-hook capability bridge; not an adapter identifier in the catalog checked by CLI 0.20.39. A real ST9 handoff verified one palm in Unreal Engine 5.5.4, while collision scale and dynamic wind remain unverified. See the [SpeedTree MCP guide](/control/speedtree).
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) — Adobe Substance 3D Designer.
- [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) — Adobe Substance 3D Painter.
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) — Tiled map editor; the catalog checked by CLI 0.20.39 lists version 0.3.0 with `catalog_install_available=false`.
- [Tracy Profiler](https://github.com/dcc-mcp/dcc-mcp-tracy) — Independently released adapter v0.2.5 ([release source](https://github.com/dcc-mcp/dcc-mcp-tracy/tree/a5e29b7bcef28ccd6a2ee17667dbdbcb7c45b119)) for bounded Tracy capture and offline zone analysis. It is not an adapter identifier in the catalog checked by CLI 0.20.39 and requires an already instrumented target. See the [Tracy control guide](/control/tracy).
- [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) — Derivative TouchDesigner.
- [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) — Unity Editor and game-authoring Skills.
- [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) — Unreal Engine plug-in.
- [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) — Audiokinetic Wwise authoring through typed WAAPI tools; the catalog checked by CLI 0.20.39 lists version 0.1.2 with `catalog_install_available=false`.
- [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) — Maxon ZBrush.

## Specialized Maya Skills

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) — AdvancedSkeleton rigging workflows.
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) — mGear Shifter integration.
- [Procedural architecture](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) — Maya, Bifrost, and Arnold architecture workflows.

## Generation services

For local generation, see the [ComfyUI game-asset workflow](/control/comfyui).

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
- [Poly Pizza](https://github.com/dcc-mcp/dcc-asset-poly-pizza) — Low-poly model search and downloads with asset license and provenance records.

## UI automation and shared runtimes

- [winget-releaser](https://github.com/dcc-mcp/winget-releaser) — Windows Package Manager release automation for application maintainers.
- [Qt Actions](https://github.com/dcc-mcp/dcc-ui-qt-actions) — Reusable typed actions for Qt-based DCC interfaces.
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) — Cross-host window and widget discovery.
- [UI Workflow Memory](https://github.com/dcc-mcp/dcc-ui-workflow-memory) — Verified selectors, recipes, and failure memory.
- [adobepy](https://github.com/dcc-mcp/adobepy) — Shared Adobe desktop communication runtime.

## Organization and discovery surfaces

Additional discovery surfaces are listed below. Check the installed CLI catalog
for availability; a repository or remote connector alone does not establish a
live application instance.

- [Autodesk Product Help](https://developer.api.autodesk.com/knowledge/public/v1/mcp) — Opt-in, external read-only documentation connector identified as `autodesk-help`. It is separate from the 38 adapter identifiers reported by CLI 0.20.39 and is not an application mutation route.

- [Official website source](https://github.com/dcc-mcp/dcc-mcp.github.io) — Shared documentation, GEO metadata, application-control guides, and showcases.
- <a href="https://dcc-mcp.github.io/showcase/" target="_self">Showcase collection</a> — Finished work, reusable prompts, project sources, licensing, and explicit production evidence. [Collection source and contributions](https://github.com/dcc-mcp/showcase). [Adapter examples and prompts](/examples) retain their original evidence scope.
- [Agent plugins](https://github.com/dcc-mcp/dcc-mcp-agent-plugins) — Canonical DCC-MCP Skills and plugin packages for supported agent clients.
- [dcc-cua](https://github.com/dcc-mcp/dcc-cua) — Cross-platform Computer Use Automation runtime used by bounded DCC UI workflows.
- [Organization profile](https://github.com/dcc-mcp/.github) — Shared GitHub profile and community configuration.

> Project availability and installation support can change between catalog revisions. Use `dcc-mcp-cli --json dcc-types` to inspect the current catalog source, adapter versions, and installation flags, and `dcc-mcp-cli marketplace search` for installable extensions.
