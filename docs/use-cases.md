---
title: AI control for Maya, Blender, and game creation
description: Direct answers and copyable agent prompts for controlling Maya or Blender with AI, creating random spheres in Maya, and making a game.
pageClass: route-page
---

# Common AI + DCC tasks

DCC-MCP is the typed control plane between an agent and creative software. For these tasks, start with the public [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp); it teaches the agent to discover the right tool instead of inventing scripts or guessing tool names.

## How do I control Maya with AI?

Install the `dcc-mcp` Agent Skill, connect the official [Maya adapter](https://github.com/dcc-mcp/dcc-mcp-maya), and use `dcc-mcp-cli` to discover and call typed Maya tools. The agent should inspect the machine first and ask before installing the CLI or adapter.

```text
Set up DCC-MCP so you can control Maya on this machine. Install and follow the public @loonghao/dcc-mcp Skill. Inspect the current CLI and Maya adapter first; ask before installing or changing system state. Open or detect Maya, verify the gateway and live Maya instance, perform one read-only search and describe flow, then report the connected instance, available capability, and next safe Maya action. Do not modify my current scene during setup.
```

Useful evidence:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Maya scene" --dcc-type maya
```

## How do I control Blender with AI?

Use the same Skill and CLI with the official [Blender adapter](https://github.com/dcc-mcp/dcc-mcp-blender). DCC-MCP keeps the workflow consistent while Blender owns its host-specific installation and typed tools.

```text
Set up DCC-MCP so you can control Blender on this machine. Install and follow the public @loonghao/dcc-mcp Skill. Inspect the current CLI and Blender adapter first; ask before installing or changing system state. Open or detect Blender, verify the gateway and live Blender instance, perform one read-only search and describe flow, then report the connected instance, available capability, and next safe Blender action. Do not modify my current scene during setup.
```

Useful evidence:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Blender scene" --dcc-type blender
```

## How do I create ten random spheres in Maya?

Give the result you want to the Agent Skill. It will search the live Maya tool catalog, follow the returned `next_step`, call typed tools, and validate the scene. The prompt should define randomness, bounds, naming, and acceptance instead of prescribing an unverified tool slug.

```text
Use the dcc-mcp Skill to connect to my live Maya instance. In a new group named ai_random_spheres, create exactly 10 polygon spheres with deterministic seed 42. Give each sphere a unique name and place it at a random position inside X -10..10, Y 0..10, Z -10..10 while avoiding visible intersections. Do not delete or replace existing scene content. Discover the typed Maya tools first, follow every returned next_step, then validate the final sphere count, names, transforms, and group membership. Show me the evidence and do not save the scene unless I ask.
```

## I want to make a game. Where do I start?

Start with the smallest playable loop, then choose the connected engine: [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal), [Unity](https://github.com/dcc-mcp/dcc-mcp-unity), or [Godot](https://github.com/dcc-mcp/dcc-mcp-godot). Use the [Marketplace](/marketplace) for optional, license-aware assets and the [Showcase](/showcase) for proven prompt patterns.

```text
Help me make a small playable game with DCC-MCP. First ask me for the engine (Unreal, Unity, or Godot), target platform, visual style, and one-sentence playable loop. Reduce the idea to one level and one win or fail condition. Inventory the connected DCCs and engine, discover typed tools, and inspect the official Marketplace for any license-safe assets we need. Ask before installing packages, downloading assets, or changing system state. Build the smallest playable slice, run it, validate controls and the win/fail loop, capture evidence, and report the project and packaged-build paths. Do not claim completion without a runnable build.
```

## Why use DCC-MCP instead of asking for a script?

Typed discovery, validated arguments, instance routing, audit evidence, diagnostics, and consent boundaries are reusable across agents. The agent can change; the production contract stays stable. See [For Agents](/agents) for the complete workflow and failure-reporting rules.
