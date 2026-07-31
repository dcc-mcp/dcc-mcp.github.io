---
title: How to control Maya, Houdini, Blender, creative apps, and game engines with AI
description: Direct DCC-MCP answers and safe Agent workflows for every public creative application and pipeline integration.
pageClass: route-page
---

<script setup>
import DccControlGuideIndex from './.vitepress/theme/components/DccControlGuideIndex.vue'
</script>

# Control creative applications with AI

These examples use the public [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp) and `dcc-mcp-cli`. The prompts describe the required result and checks; the agent discovers the tool names from the connected host.

If you mean an AI agent operating a live creative application—not a tutorial chatbot or an application's built-in generative feature—start with the application-specific answer below. Each guide links to the owning adapter repository for installation, compatibility, and host-specific details.

## How do I control each DCC with AI?

<DccControlGuideIndex language="en" />

## Maya connection example

Install the `dcc-mcp` Skill and connect the [Maya adapter](https://github.com/dcc-mcp/dcc-mcp-maya). Check the existing installation before adding the CLI or adapter.

```text
Set up DCC-MCP so you can control Maya on this machine. Install and follow the public @loonghao/dcc-mcp Skill. Inspect the current CLI and Maya adapter first; ask before installing or changing system state. Open or detect Maya, verify the gateway and live Maya instance, perform one read-only search and describe flow, then report the connected instance, available capability, and next safe Maya action. Do not modify my current scene during setup.
```

Check the connection with:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Maya scene" --dcc-type maya
```

## Blender connection example

Use the same Skill and CLI with the [Blender adapter](https://github.com/dcc-mcp/dcc-mcp-blender). Installation and Blender-specific tools remain in that repository.

```text
Set up DCC-MCP so you can control Blender on this machine. Install and follow the public @loonghao/dcc-mcp Skill. Inspect the current CLI and Blender adapter first; ask before installing or changing system state. Open or detect Blender, verify the gateway and live Blender instance, perform one read-only search and describe flow, then report the connected instance, available capability, and next safe Blender action. Do not modify my current scene during setup.
```

Check the connection with:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Blender scene" --dcc-type blender
```

## How do I create ten random spheres in Maya?

Describe the result rather than a guessed tool name. Include the random seed, bounds, naming, and checks.

```text
Use the dcc-mcp Skill to connect to my live Maya instance. In a new group named ai_random_spheres, create exactly 10 polygon spheres with deterministic seed 42. Give each sphere a unique name and place it at a random position inside X -10..10, Y 0..10, Z -10..10 while avoiding visible intersections. Do not delete or replace existing scene content. Discover the typed Maya tools first, follow every returned next_step, then validate the final sphere count, names, transforms, and group membership. Show me the evidence and do not save the scene unless I ask.
```

## I want to make a game. Where do I start?

Define one playable loop, then choose [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal), [Unity](https://github.com/dcc-mcp/dcc-mcp-unity), or [Godot](https://github.com/dcc-mcp/dcc-mcp-godot). Use the [Marketplace](/marketplace) for optional assets and check each license before use. The [Showcase](/showcase) contains example prompts.

```text
Help me make a small playable game with DCC-MCP. First ask me for the engine (Unreal, Unity, or Godot), target platform, visual style, and one-sentence playable loop. Reduce the idea to one level and one win or fail condition. Inventory the connected DCCs and engine, discover typed tools, and inspect the official Marketplace for any license-safe assets we need. Ask before installing packages, downloading assets, or changing system state. Build the smallest playable slice, run it, validate controls and the win/fail loop, capture evidence, and report the project and packaged-build paths. Do not claim completion without a runnable build.
```

## How do I edit photos with AI?

Use the [Photoshop adapter](https://github.com/dcc-mcp/dcc-mcp-photoshop) for retouching, color correction, masks, layers, and export. State what must change, what must remain unchanged, and the required output format.

```text
Use the dcc-mcp Skill to connect to Photoshop and help me edit this image. First ask what must change, what must remain untouched, the reference look, and the delivery format. Preserve the original document, use new layers, adjustment layers, masks, or Smart Objects where supported, and never flatten or overwrite the source without my approval. Discover the typed Photoshop tools, make a bounded first pass, compare the result with the brief, validate dimensions, color mode, layer structure, and missing assets, then export to a new path only after I approve the preview.
```

## How do I edit or composite a film with AI?

Use [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) for timeline editing, [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) for motion graphics and layer-based shot work, and [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) for node-based compositing. Keep the task in the application that owns the workflow.

```text
Use the dcc-mcp Skill to help me edit or composite this film. First ask whether the task is timeline editing in Premiere, motion graphics or layer compositing in After Effects, or node compositing in Nuke. Inventory the source media and confirm resolution, frame rate, color space, audio requirements, and delivery target. Preserve source files, create a new project, sequence, or comp, discover typed tools, complete one representative shot or sequence, render a preview, check missing media and frame range, and report the project and preview paths. Ask before installing codecs or plugins, relinking media, or starting a final render.
```

## How do I create visual effects with AI?

Use [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) for procedural geometry and simulation, Nuke or After Effects for shot compositing, and [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) for real-time effects. Identify the owning application before building a test shot.

```text
Use the dcc-mcp Skill to help me create a visual effect. First ask for the shot brief, reference, duration, camera, delivery format, and whether the effect belongs in Houdini simulation, Nuke or After Effects compositing, or Unreal real-time VFX. Inventory connected hosts, discover typed tools, and propose the smallest representative setup. Keep controls editable, preserve source plates and scenes, cache or render only when needed, produce a preview, validate timing, scale, color space, and missing dependencies, and report the scene, cache, and preview paths. Ask before downloading assets, installing plugins, or starting an expensive simulation or final render.
```

## Why use DCC-MCP instead of asking for a script?

Scripts remain useful for one-off work. DCC-MCP adds typed discovery, argument validation, instance routing, request IDs, and diagnostics when the same workflow must be repeated. See [For Agents](/agents) for the operating steps.
