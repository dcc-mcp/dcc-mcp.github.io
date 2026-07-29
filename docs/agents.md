---
title: DCC-MCP for Agents
description: Install one Skill and use one CLI to discover, call, diagnose, and improve DCC workflows.
pageClass: route-page
---

# One Skill. One CLI. Every connected DCC.

The default agent entry is the public [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp) plus `dcc-mcp-cli`. The Skill supplies workflow knowledge; the CLI owns gateway lifecycle, structured discovery, typed execution, diagnostics, and updates.

## Install the matching Skill

| Intent | Skill |
| --- | --- |
| Operate a live DCC, discover tools, or search extensions | [`@loonghao/dcc-mcp`](https://clawhub.ai/loonghao/skills/dcc-mcp) |
| Create or modernize a complete adapter/runtime | [`@loonghao/dcc-mcp-creator`](https://clawhub.ai/loonghao/skills/dcc-mcp-creator) |
| Create or improve a DCC-specific Skill package | [`@loonghao/dcc-mcp-skills-creator`](https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator) |

OpenClaw:

```bash
openclaw skills install @loonghao/dcc-mcp
```

ClawHub-compatible agents:

```bash
npx --yes clawhub@0.23.1 install @loonghao/dcc-mcp
```

Start a new agent turn after installation so the runtime can load the Skill.

## Follow the typed workflow

```bash
# Confirm the gateway and connected hosts.
dcc-mcp-cli health
dcc-mcp-cli list

# Search narrowly, then follow the returned next_step.
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# Execute the returned tool slug with validated arguments.
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

Search is the routing contract. Do not guess tool names or load every backend schema into context. Perform the returned targeted load or describe step only when requested.

## Diagnose before retrying

Keep the `request_id` from a failed call. Use the CLI's built-in evidence path:

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

Then discover and call `dcc_feedback__report` through the same search workflow. Review the public-safe issue report before sharing it. Never publish raw evidence or create an external issue without user authorization.

## Detailed references

- [Getting started](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started)
- [CLI reference](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)
- [Agent reference](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [Gateway diagnostics](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [Browse the ecosystem](/ecosystem)
