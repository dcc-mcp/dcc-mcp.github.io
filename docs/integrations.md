---
title: DCC MCP Integrations | Maya MCP, Blender MCP & More
description: Official DCC-MCP integrations for Maya MCP, Blender MCP, Houdini MCP, 3ds Max MCP, Substance Painter MCP, SP MCP, and other creative software.
pageClass: integrations-page
outline: [2, 3]
---

# DCC MCP integrations

DCC-MCP connects AI agents to the digital content creation software your team already uses. This directory maps each supported application to its official adapter repository and the common search terms people use, including **Maya MCP**, **Blender MCP**, **Houdini MCP**, **3ds Max MCP**, **Substance Painter MCP**, and **SP MCP**.

Use the [official Skill](https://clawhub.ai/loonghao/skills/dcc-mcp) to operate a connected DCC, the [Skill Marketplace](/marketplace) to find workflow extensions, and [`dcc-mcp-cli dcc-types`](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference) to inspect the live release catalog.

## Official DCC MCP directory

The table below shows selected integrations. The Core 0.20.39 catalog lists 38 adapter identifiers, including Wwise. A repository in the broader [ecosystem directory](/ecosystem) may be experimental or independent until it appears in `dcc-mcp-cli dcc-types`.

| Application | Common search terms | Official integration |
| --- | --- | --- |
| 3ds Max | 3ds Max MCP, 3dsmax MCP | [dcc-mcp-3dsmax](https://github.com/dcc-mcp/dcc-mcp-3dsmax) |
| After Effects | After Effects MCP, AE MCP | [dcc-mcp-aftereffects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) |
| Blender | Blender MCP | [dcc-mcp-blender](https://github.com/dcc-mcp/dcc-mcp-blender) |
| Godot | Godot MCP | [dcc-mcp-godot](https://github.com/dcc-mcp/dcc-mcp-godot) |
| Houdini | Houdini MCP | [dcc-mcp-houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) |
| Katana | Katana MCP | [dcc-mcp-katana](https://github.com/dcc-mcp/dcc-mcp-katana) |
| Maya | Maya MCP, Autodesk Maya MCP | [dcc-mcp-maya](https://github.com/dcc-mcp/dcc-mcp-maya) |
| Marmoset Toolbag | Marmoset MCP, Toolbag MCP | [dcc-mcp-marmoset](https://github.com/dcc-mcp/dcc-mcp-marmoset) |
| MotionBuilder | MotionBuilder MCP, MoBu MCP | [dcc-mcp-mobu](https://github.com/dcc-mcp/dcc-mcp-mobu) |
| Nuke | Nuke MCP | [dcc-mcp-nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) |
| OpenUSD | OpenUSD MCP, USD MCP | [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) |
| Photoshop | Photoshop MCP, Adobe Photoshop MCP | [dcc-mcp-photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) |
| Premiere Pro | Premiere MCP, Premiere Pro MCP | [dcc-mcp-premiere](https://github.com/dcc-mcp/dcc-mcp-premiere) |
| RenderDoc | RenderDoc MCP | [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) |
| Flow Production Tracking | ShotGrid MCP, Flow Production Tracking MCP | [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) |
| Substance 3D Designer | Substance Designer MCP, SD MCP | [dcc-mcp-substance3d-designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) |
| Substance 3D Painter | Substance 3D Painter MCP, Substance Painter MCP, SP MCP | [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) |
| Unity | Unity MCP | [dcc-mcp-unity](https://github.com/dcc-mcp/dcc-mcp-unity) |
| Unreal Engine | Unreal MCP, Unreal Engine MCP | [dcc-mcp-unreal](https://github.com/dcc-mcp/dcc-mcp-unreal) |
| Wwise | Wwise MCP, audio MCP | [dcc-mcp-wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) |
| ZBrush | ZBrush MCP | [dcc-mcp-zbrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) |

## Common DCC MCP searches

### Is there a Maya MCP?

Yes. The official [Maya MCP integration](https://github.com/dcc-mcp/dcc-mcp-maya) connects Autodesk Maya to the DCC-MCP Gateway. Use the typed search and call flow to discover the tools available in the connected Maya instance.

### Is there a Blender MCP?

Yes. The official [Blender MCP integration](https://github.com/dcc-mcp/dcc-mcp-blender) connects Blender to the same Gateway and supports the shared DCC-MCP discovery, validation, and workflow contracts.

### Is there a Houdini MCP?

Yes. The official [Houdini MCP integration](https://github.com/dcc-mcp/dcc-mcp-houdini) provides the repository and host-specific implementation for SideFX Houdini.

### What does SP MCP mean?

**SP MCP** is a common abbreviation for **Substance Painter MCP**. The official name is **Substance 3D Painter MCP**, provided by [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter). Use that repository and the DCC-MCP Marketplace when you need texture-painting workflows.

### How do I find a DCC MCP tool?

Install the public DCC-MCP Skill, confirm the Gateway with `dcc-mcp-cli health`, narrow discovery with `dcc-mcp-cli search --query <intent> --dcc-type <host>`, then follow the returned `next_step`. Read the host-specific adapter repository for installation and compatibility details.

## Continue

- [Use DCC-MCP from an agent](/agents)
- [Search the Skill Marketplace](/marketplace)
- [Understand the production model](/why-dcc-mcp)
- [Browse the full ecosystem](/ecosystem)
