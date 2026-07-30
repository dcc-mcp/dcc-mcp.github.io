---
title: Why DCC-MCP exists
description: The production problems, technical decisions, and boundaries that shaped DCC-MCP.
---

# Why DCC-MCP exists

DCC-MCP grew out of adapter work across real DCC applications. Thread
affinity, instance selection, lifecycle, discovery, and diagnostics kept
reappearing in different hosts. We added shared contracts only after those
problems repeated.

## Start with the production process

An agent uses the process it is given. It does not define that process for the
team.

> Standardize production → turn standards into workflows → package workflows as tools → let agents operate the tools

Define naming, inputs, outputs, checks, ownership, and acceptance criteria.
Connect them into a repeatable workflow, then expose that workflow as a typed
tool. The same tool can be called by people, scripts, CI, or agents.

## Why direct scripts stopped scaling

Asking a model to write and run a `mayapy`, `hython`, or Blender Python script
is useful for exploration. Repeated production work exposed the following
limits:

- the model regenerates similar code on every turn and the result varies;
- DCC APIs often require main-thread execution and application-specific readiness checks;
- several open scenes or application instances make the execution target ambiguous;
- long operations need progress, cancellation, checkpoints, and recovery;
- a successful process exit does not prove that the intended scene or document changed;
- failures are difficult to reproduce without typed inputs, request IDs, logs, and traces.

These problems occurred across adapters, so they belonged in shared
infrastructure.

## Problems and the contracts they produced

| Repeated problem | What we learned | DCC-MCP response |
| --- | --- | --- |
| Models rewrite task logic on every turn | Pipeline knowledge should survive model and prompt changes | Versioned Skills with typed schemas, validation, and reusable tools |
| Every adapter rebuilds transport and lifecycle code | Host integrations need a shared contract | Core runtime, Gateway, CLI, and thin host-owned adapters |
| DCC APIs have thread and readiness constraints | Generic process execution is not enough | Main-thread dispatch, readiness, instance routing, and host execution bridges |
| Large tool catalogs consume context and confuse selection | Agents should discover only what the task needs | Progressive `search -> load/describe -> call` discovery |
| Creative operations can be slow or partially complete | A call needs lifecycle semantics, not only a return value | Async jobs, progress, cancellation, checkpoints, and artefact hand-off |
| Tool use becomes a black box | Production teams need evidence they can inspect | Request IDs, policies, audit records, logs, traces, metrics, health, and replay |
| Existing tools sometimes expose no usable API | UI automation is a fallback, not the foundation | Scoped, policy-checked UI Control with `snapshot -> find -> act -> wait -> verify` |
| Useful workflows must move between people and projects | A script folder is not a distribution model | Marketplace packages, immutable source references, hot reload, and project/team scopes |

## Who owns what

The system separates shared services from host-specific behavior.

| Layer | Responsibility |
| --- | --- |
| Agent interface | MCP and REST endpoints, typed CLI commands, schemas, resources, prompts, and structured results |
| Control plane | Gateway discovery, routing, policy checks, lifecycle management, observability, and multi-instance context |
| DCC runtime | Main-thread dispatch, readiness, jobs, cancellation, checkpoints, and host-safe execution |
| Adapter | Installation, compatibility, host APIs, and application-specific behavior owned by each DCC repository |
| Skill | Tested workflow knowledge, validated arguments, workflow steps, and project or team conventions |

The [Core architecture documentation](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture) is the source of truth for the current contracts. Host-specific installation, compatibility, and troubleshooting remain in each adapter repository.

## CLI, MCP, and REST share one implementation

Shared service code and the typed REST/OpenAPI contract are the implementation.
`dcc-mcp-cli` calls the Gateway REST API. MCP stays small: `search`,
`describe`, `load_skill`, and `call` expose the same workflow to MCP-only
clients. Both routes use the same discovery, validation, routing, policy, and
call services.

| Consumer | Preferred surface | Requires an AI agent |
| --- | --- | --- |
| Artists, TDs, operators, shell scripts, and CI | Typed CLI or REST | No |
| Studio automation and custom applications | REST with generated OpenAPI clients | No |
| MCP-only AI IDEs and assistants | Minimal MCP workflow | Yes |
| Smart workflow canvases and cloud orchestration | REST/OpenAPI integration; MCP when an agent participates | No |

A pipeline can call REST directly, generate clients from `/v1/openapi.json`,
or use the CLI in CI and operations. An agent can reach the same capability
through the thin MCP interface.

An existing OpenAPI 3.x service can also be mounted as MCP tools. It remains a
normal REST service and does not need to be rebuilt around AI.

## Use existing protocols first

MCP is the industry-standard agent entry point, so DCC-MCP uses it instead of inventing a private protocol. REST, Python, C++, HTTP, command ports, native plugins, and official vendor toolsets can sit behind the same control plane.

DCC-MCP does not replace an agent, a DCC API, or a vendor integration. When a
vendor provides a usable native or official MCP capability, the adapter keeps
its names and schemas. DCC-MCP supplies the shared discovery, routing, safety,
lifecycle, distribution, and diagnostics around it.

## Skills store workflow knowledge

A Skill packages a tested workflow as a versioned, typed, and distributable
capability.

The ownership boundary is:

- Core and adapters own connectivity, thread safety, routing, policy, and observability.
- TDs and TAs keep project naming, scene checks, asset preparation, publish gates, export rules, and review hand-offs close to their existing pipeline code.
- Agents select a well-described tool and provide validated arguments instead of inventing the whole workflow again.

This reduces repeated code generation and lets a studio distribute different
capabilities by project, department, or production stage without forking the
control plane.

## Keep failure evidence

Diagnostics start with a `request_id`, the typed tool and arguments, the
selected DCC instance, and the observed result. The Gateway and CLI expose
health, logs, traces, statistics, and structured feedback.

This creates a concrete loop:

1. reproduce the failure against a real host;
2. identify whether Core, an adapter, or a Skill owns it;
3. make the smallest fix at that boundary;
4. validate the same call again;
5. keep the evidence so the next improvement starts from experience, not guesswork.

## Known limits

DCC-MCP does not claim to make every creative application identical.

- Native Skills and APIs remain preferable to UI Control.
- Core does not own host-specific pipeline semantics.
- An adapter cannot promise safe rollback when the host exposes no transaction API.
- Marketplace packages extend the framework; they do not hide Core or adapter defects.
- The project provides infrastructure for agents. It does not prescribe which agent or model you must use.

## What still depends on human judgment

Many production tasks can be standardized, validated, and automated. Aesthetic judgment, art direction, composition, timing, and style are still much harder to express as stable contracts. DCC-MCP does not pretend that infrastructure alone solves them.

DCC-MCP handles the repeatable parts and gives agents controlled access to
real tools. Better perception, reasoning, and creative judgment can use the
same typed tools without rebuilding every DCC integration.

## Continue from here

- [See how an agent uses the system](/agents)
- [Build an adapter, standalone service, or Skill](/developers)
- [Explore the adapters and extensions](/ecosystem)
- [Read the Core technical documentation](https://dcc-mcp.github.io/dcc-mcp-core/)
