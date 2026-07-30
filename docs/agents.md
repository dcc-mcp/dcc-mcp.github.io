---
title: Use DCC-MCP from an agent
description: Install the DCC-MCP Skill, discover typed tools with the CLI, and diagnose failed calls.
pageClass: route-page
---

# Use the Skill and CLI

The public [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp) contains the operating procedure. `dcc-mcp-cli` handles Gateway status, tool discovery, typed calls, diagnostics, updates, and Marketplace installation.

## Give the agent the current documentation

Use this prompt when an agent does not yet know which DCC-MCP project owns the task:

```text
Before changing anything, read https://dcc-mcp.github.io/llms.txt. Use llms-full.txt only if the short file lacks the required detail. Choose one route: use dcc-mcp to operate a connected DCC, dcc-mcp-creator to work on an adapter or service, or dcc-mcp-skills-creator to work on a Skill. Use the Marketplace for packages, the Showcase for examples, and the ecosystem directory to find the owning repository. Discover tools with dcc-mcp-cli and follow next_step. Keep request_id values for diagnosis. Do not install, publish, open an external issue, or change this machine without my permission. First report the chosen route, capability, and next action.
```

## Install only the Skill you need

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

## Search, describe, and call

```bash
# Confirm the gateway and connected hosts.
dcc-mcp-cli health
dcc-mcp-cli list

# Search narrowly, then follow the returned next_step.
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# Execute the returned tool slug with validated arguments.
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

Do not guess tool names or load every backend schema. Search first, then perform the `load` or `describe` step named in `next_step`.

## Use the request ID before retrying

Keep the `request_id` from a failed call. Use the CLI's built-in evidence path:

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

Then discover `dcc_feedback__report` through the same search workflow. Review and redact the report before sharing it. Creating an external issue still requires user authorization.

## Reference

- [Getting started](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started)
- [CLI reference](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)
- [Agent reference](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [Gateway diagnostics](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [Marketplace](/marketplace)
- [Showcase prompts](/showcase)
- [Common AI + DCC tasks](/use-cases)
- [Browse the ecosystem](/ecosystem)
