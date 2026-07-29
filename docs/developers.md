---
title: Build with DCC-MCP
description: Choose the correct DCC-MCP extension boundary before creating an adapter, Skill package, or shared Core capability.
pageClass: route-page
---

# Extend the ecosystem at the right boundary.

Start by searching the [ecosystem directory](/ecosystem). Reuse an existing adapter or Skill when it already owns the workflow.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>New DCC adapter</strong><span>Use dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Focused workflow Skill</strong><span>Use skills-creator</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>Shared infrastructure</strong><span>Contribute to Core</span></a>
</div>

## Create an adapter

Use [`dcc-mcp-creator`](https://clawhub.ai/loonghao/skills/dcc-mcp-creator) when the work requires a new host process, dispatcher bridge, readiness contract, resources, installation lifecycle, or gateway registration. It routes implementation against the shared Core contracts and cross-DCC validation expectations.

Read next:

- [Adapter runtime contracts](https://dcc-mcp.github.io/dcc-mcp-core/guide/adapter-runtime-contracts)
- [Adapter installation lifecycle](https://dcc-mcp.github.io/dcc-mcp-core/guide/adapter-install-lifecycle)
- [Host adapter guide](https://dcc-mcp.github.io/dcc-mcp-core/guide/host-adapter)

## Create a specialized Skill

Use [`dcc-mcp-skills-creator`](https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator) when an adapter already exists and the missing capability is a focused agent workflow, schema, script, or extension package. The Skill covers authoring, validation, reflection, and publishing boundaries.

Read next:

- [Skills system](https://dcc-mcp.github.io/dcc-mcp-core/guide/skills)
- [Skill scopes and policies](https://dcc-mcp.github.io/dcc-mcp-core/guide/skill-scopes-policies)
- [Marketplace](https://github.com/dcc-mcp/marketplace)

## Change Core only for shared contracts

Core is the reusable control plane: gateway, CLI, MCP/REST runtime, discovery, safety, observability, persistence, and cross-host contracts. Host-specific business logic belongs in an adapter or Skill package.

- [Core architecture](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture)
- [Python API](https://dcc-mcp.github.io/dcc-mcp-core/api/models)
- [Core repository](https://github.com/dcc-mcp/dcc-mcp-core)
