---
title: Use DCC-MCP from an agent
description: Install the DCC-MCP Skill, discover typed tools with the CLI, and diagnose failed calls.
pageClass: route-page
---

# Install once, then describe the task

The public [`dcc-mcp` Skill](https://github.com/dcc-mcp/dcc-mcp-agent-plugins/tree/main/plugins/dcc-mcp/skills/dcc-mcp) contains the operating procedure. `dcc-mcp-cli` handles Gateway status, tool discovery, typed calls, diagnostics, updates, and Marketplace installation.

Run this from the workspace used by Codex, Claude Code, Gemini CLI, GitHub
Copilot, Cursor, Windsurf, OpenCode, Cline, Roo Code, Kiro CLI, Amp, or another
Agent Skills-compatible host:

```bash
npx --yes skills@1.5.22 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

Use `--global` for a user-level installation. Start a new agent session if the
host discovers Skills only at startup. Native plugin and registry installation
options remain available in the
[`dcc-mcp-agent-plugins` repository](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#install).

## Use a short prompt

The Skill carries the procedure, so the prompt only needs the task and its
safety boundary:

```text
Use the dcc-mcp Skill to <describe the DCC task>. Ask before installing or changing system state, and finish with verification evidence.
```

## Install only the Skill you need

| Intent | Skill |
| --- | --- |
| Operate a live DCC, discover tools, or search extensions | `dcc-mcp` |
| Create or modernize a complete adapter/runtime | `dcc-mcp-creator` |
| Create or improve a DCC-specific Skill package | `dcc-mcp-skills-creator` |

Replace the `--skill` value in the universal command only when the task matches
one of the two developer routes.

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
