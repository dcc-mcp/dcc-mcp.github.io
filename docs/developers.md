---
title: Develop adapters, services, and Skills
description: Choose the owning layer, run the local examples, and validate an adapter, standalone service, or Skill.
pageClass: route-page
---

# Develop an adapter, service, or Skill

Choose the owning layer before creating files. DCC-MCP supports public DCC
adapters, private non-DCC services, and focused Skill packages. A local folder
or internal source tree is enough.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Private or custom MCP service</strong><span>Use dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Focused workflow Skill</strong><span>Use skills-creator</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>Shared infrastructure</strong><span>Contribute to Core</span></a>
</div>

## Choose one development track

| Your need | Route |
|---|---|
| Connect Maya, Blender, Unreal, or another host process | Use `dcc-mcp-creator` to create or improve a DCC adapter. |
| Expose an internal API, CLI, asset database, render farm, or review service | Use `dcc-mcp-creator` with a custom service id and `instance_type="standalone"`. No public repository is required. |
| Add a typed workflow to an existing adapter or standalone service | Use `dcc-mcp-skills-creator`; do not create another runtime. |
| Change gateway, CLI, protocol, safety, or cross-host behavior | Contribute the shared contract to Core. |

Search the [ecosystem directory](/ecosystem) before creating a public adapter
or Skill. Private service identities do not need a public catalog entry.

## Build a private non-DCC service

Use this route for an internal system that is not a creative application and
may not use GitHub. Run the coding agent from the private project, then use this
prompt:

```text
Use dcc-mcp-creator for the runtime and dcc-mcp-skills-creator for Skill files. Work only in my current private or internal project. Do not create a GitHub repository, public catalog entry, external issue, or public release. First inspect and reuse this project's language, package manager, test command, authentication, and deployment conventions.

Build the smallest useful non-DCC MCP vertical slice: one stable custom service id, DccServerBase plus DccServerOptions.from_env(..., instance_type="standalone"), no dcc_pid, loopback-only development, and one typed read-only Skill around a real local workflow. Keep ordinary service, file, and API work on inline execution; add a dispatcher or bridge only if a real thread or process boundary requires it. Declare closed input/output schemas, all safety annotations, a bounded timeout, one call example, and actionable redacted errors. Keep credentials in the existing secret boundary.

Validate with dcc-mcp-cli lint skills and the smallest repository-native test. Start the service, print its resolved /mcp URL, and verify tools/list, exact Skill discovery and load, describe, one valid call, one invalid-input error, and clean shutdown. Use the official open-source MCP Inspector locally, then repeat the agent path with dcc-mcp-cli list/load-skill/describe/call using --output toon. Preserve the returned slug and request_id; do not guess or blindly retry. Report files changed, exact validation evidence, remaining security/deployment work, and stop before publishing or changing shared infrastructure.
```

Required validation:

1. The existing project conventions it is reusing.
2. The custom service id and why the runtime is `standalone`.
3. One validated Skill and one successful read-only call.
4. One safe invalid-input result.
5. Clean shutdown evidence and the private delivery path left untouched.

### Run the example service

The complete Core example lives at
[`examples/remote-server`](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server).
Its historical directory name is stable; the example now starts as a
loopback, standalone service and discovers its bundled Skill directory.

```bash
pip install dcc-mcp-core
dcc-mcp-cli lint skills
python server.py
```

Expected startup output includes a URL such as
`http://127.0.0.1:8765/mcp`, the custom identity `studio-service`, and the
runtime lifetime `standalone`.

### Use the Development Container

The example includes a [Development Container](https://containers.dev/)
configuration. The specification and reference CLI are open source, so the
same Python, Node.js, Core, and Inspector environment works in a compatible
editor or from an agent shell without a hosted account.

From the Core repository root:

```bash
npm install --global @devcontainers/cli
devcontainer up --workspace-folder examples/remote-server
devcontainer exec --workspace-folder examples/remote-server python server.py
```

Use a second terminal for an automated Inspector smoke:

```bash
devcontainer exec --workspace-folder examples/remote-server \
  npx --yes @modelcontextprotocol/inspector@latest --cli \
  http://127.0.0.1:8765/mcp --transport http --method tools/list
```

The lab runs as a non-root user and does not mount the host container socket.
Keep private credentials outside the image.

For browser-based group training, [Educates](https://docs.educates.dev/en/stable/)
provides isolated sessions, Markdown steps, terminals, and an embedded editor.
It requires operators for Kubernetes, ingress, identity, quotas, images, and
session cleanup. Use the local Dev Container when those shared services are not
needed.

### Test with MCP Inspector

Use the official [MCP Inspector](https://github.com/modelcontextprotocol/inspector).
It runs locally, needs no hosted account, supports Streamable HTTP, and keeps a
private loopback service off the public internet:

```bash
npx --yes @modelcontextprotocol/inspector@latest
```

Connect to the printed `/mcp` URL. Search for `hello-world`, load it, and
call `hello_world__greet` with `{"name":"Agent"}`. Also send an empty name and
confirm the response is a structured validation error.

::: warning Why use a local Inspector?
A hosted playground cannot reach a loopback or intranet MCP service without
exposing it. For internal systems, the local open-source Inspector is the safe
"play now" path. Never expose its process-spawning proxy to an untrusted
network.
:::

### Verify through the CLI

Use the CLI after the service registers. Keep the slug returned by search:

```bash
dcc-mcp-cli list --output toon
dcc-mcp-cli load-skill hello-world --dcc-type studio-service --output toon
dcc-mcp-cli describe <tool-slug-returned-by-load> --output toon
dcc-mcp-cli call <tool-slug-returned-by-load> --json '{"name":"Agent"}' --wait --output toon
```

## Change a Skill without adding a runtime

Use this prompt when the runtime already exists:

```text
Use dcc-mcp-skills-creator in the current private project. Do not create a new adapter, service, repository, or public package. Search the existing Skills first, then add or improve the smallest owning Skill for this workflow. Keep SKILL.md metadata under metadata.dcc-mcp.*, declare typed schemas, all safety annotations, affinity, timeout, call_examples, and next-tools, and implement one bounded script using dcc_mcp_core.skills_helper where it already covers the need. Run dcc-mcp-cli lint against the installable Skill directory, load it through the existing runtime, call it once successfully and once with invalid input, and report evidence. Do not publish without permission.
```

Use this sequence: **search existing ownership → scaffold or edit → lint →
reload → load → describe → call → diagnose**.

## Debug without guessing

| Symptom | Next check |
|---|---|
| Skill validation fails | Fix the exact `dcc-mcp-cli lint` issue before starting a runtime. |
| Service does not answer | Check the printed URL, then `GET /v1/healthz` and `GET /v1/readyz`. |
| Skill is absent | Verify its parent path, run `reload-skills`, then search again. |
| Tool is absent | Load the owning Skill and follow its returned `next_step`. |
| Call fails | Keep `request_id`, run `dcc-mcp-cli doctor` and scoped failure stats, then fix the owning layer. |
| Private dependency is unavailable | Report the internal owner and redacted evidence; do not open a public issue. |

## Move from local success to private delivery

Keep development on loopback. Intranet exposure needs operator-owned TLS,
authentication, network/origin allow-lists, secret management, audit retention,
and shutdown ownership. Reuse the project's existing wheel, archive, container,
Rez, private registry, or internal deployment system. GitHub is optional.

Read next:

- [Internal standalone service workflow](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/INTERNAL_SERVICE_WORKFLOW.md)
- [Open Dev Container example](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server/.devcontainer)
- [Adapter and service workflow](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/ADAPTER_WORKFLOW.md)
- [Skills system](https://dcc-mcp.github.io/dcc-mcp-core/guide/skills)
- [Skill scopes and policies](https://dcc-mcp.github.io/dcc-mcp-core/guide/skill-scopes-policies)
- [Remote deployment](https://dcc-mcp.github.io/dcc-mcp-core/guide/remote-server)
- [Core architecture](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture)
