---
title: Cloud agents and DCC-MCP
description: Choose a cloud or workstation workflow for DCC-MCP using dated software tests, platform interfaces, installation prerequisites, and deployment limits.
pageClass: route-page
---

# Cloud agents and DCC-MCP

Choose a cloud or workstation workflow for DCC-MCP using dated software tests, platform interfaces, installation prerequisites, and deployment limits.

**DCC-MCP connects an AI agent to creative applications through typed tools, MCP, and `dcc-mcp-cli`.** A cloud agent can inspect a document, make a bounded edit, export an asset, and verify the result when its environment has the application, a working adapter, and an authorized connection. A shell-capable agent can use the CLI and HTTP gateway without an MCP settings screen.

This guide considers **OpenAI dots**, **Grok Bot**, **Meta Muse** (the personal agent), and **Manus Cue**. It records platform documentation separately from tests in one dots cloud computer used for Lightbox work. Lightbox is the development and deployment context here; DCC-MCP supplies the application integration. Results from this computer do not establish support across all accounts, images, or platforms. These are independent integrations, with no claim of platform partnership.

## Evidence levels {#evidence-levels}

Evidence reviewed **2026-10-01 UTC**. An installed application, a CLI catalog entry, and a working MCP tool call are different observations.

| Label | What the evidence establishes |
| --- | --- |
| **MCP tested** | A specified adapter and connection completed a named workflow in the stated environment. Experimental versions and unpublished patches remain explicit. |
| **Native only** | The application produced an artifact or passed a small API check using its own CLI/API. No DCC-MCP acceptance is implied. |
| **Official interface available; DCC untested** | Platform documentation describes an interface that could carry an integration. This is a feasibility assessment, not a tested DCC workflow. |
| **Not confirmed** | The required interface or application behavior has not been established. |

An incomplete or rejected MCP workflow is reported as a gap, even if an intermediate file was written. Adapter repositories own their installation and version support; this page summarizes cloud workflow evidence.

## Platform interfaces {#platform-interfaces}

| Platform and environment | Official interface and possible route | Software / adapter / workflow evidence | Unconfirmed or untested |
| --- | --- | --- | --- |
| **OpenAI dots** cloud computer or an authorized personal computer | Cloud computer, browser, files and apps; plugins and authorized personal-computer tasks. See [computers and apps](https://learn.chatgpt.com/docs/dots/computers-and-apps) and [plugins](https://learn.chatgpt.com/docs/plugins). | The specific dots Linux computer below has native software tests and bounded adapter experiments. Adapter versions and routes are recorded per software row. | The docs do not specify a universal cloud OS, DCC inventory, or adapter compatibility. Personal-computer tasks require the connected computer online and its ChatGPT app open. |
| **Grok Bot** hosted Linux computer | [Computer, shell and desktop tools](https://docs.x.ai/grok-bot/computer-and-apps); [Linux identity/access](https://docs.x.ai/grok-bot/identity-and-access); [Custom MCP Remote HTTPS and Command](https://docs.x.ai/grok-bot/team-bots#plugins). CLI + HTTP is a possible shell route. | **Official interface available; DCC untested.** Software version: untested. Adapter: none tested. No DCC workflow completed here. | Command MCP support does not verify a DCC stdio connection. Command-secret restrictions and team visibility apply. Remote access needs protected TLS/auth at the edge. |
| **Meta Muse**, personal-agent Linux VM | [Muse personal agent](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) and [its Debian runtime and API/CLI connectors](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse). A CLI/API integration is a plausible route, inferred from those interfaces. | **Official interface available; DCC untested.** Software version: untested. Adapter: none tested. No DCC workflow completed here. | Native MCP, general DCC GUI control and software-installation scope are not confirmed by these sources. Muse Code is a separate product. Runtime and connector permissions still apply. |
| **Manus Cue**, independent personal-agent app | [The Cue section of Introducing Manus 2.0](https://manus.im/blog/introducing-manus-2-0) describes an independent mobile/desktop app and each agent's own computer. | **Not confirmed.** OS/software: unconfirmed. Adapter/connection: none tested. No DCC workflow completed here. | Cue-specific shell, MCP, custom connectors and arbitrary DCC software are unconfirmed. Manus Studio capabilities are not evidence for Cue. |

## Cloud software inventory {#cloud-software-inventory}

The observed dots cloud computer ran **Debian 13.6, x86_64**, with a working managed GUI. An empty shell `DISPLAY` did not mean that the managed desktop was absent. This is a dated inventory of that computer, not a preinstallation promise. In these native inventory checks, no adapter was used; the initial environment had no DCC-MCP packages.

| Platform / software version | Adapter / connection used | Native workflow and evidence | Remaining limits |
| --- | --- | --- | --- |
| dots Debian 13.6 x86_64 / Inkscape **1.4** | None / native CLI and managed GUI | SVG query and PNG export; welcome GUI observed. **Native only.** | Native extension action and DCC-MCP production workflow require separate checks below. |
| dots Debian 13.6 x86_64 / FreeCAD **1.0.0** | None / system Python + Part API | Created FCStd and STEP artifacts. **Native only.** | A contaminated environment crashed; a clean environment restored execution. Adapter result validation is a separate check. |
| dots Debian 13.6 x86_64 / GIMP **3.0.4** | None / native batch API | Batch document creation. **Native only.** | Adapter startup, tool calls and export/readback acceptance untested. |
| dots Debian 13.6 x86_64 / OpenSCAD **2021.01** | None / native CLI | Generated STL. **Native only.** | Adapter acceptance is separate from command-line rendering. |
| dots Debian 13.6 x86_64 / Blender **4.3.2** | None / native background execution | Saved blend, exported GLB and completed CPU render with denoising disabled. **Native only.** | Below adapter support floor **4.5**; OIDN and Draco unavailable. This does not expand supported Blender versions. |
| dots Debian 13.6 x86_64 / Godot **4.6.3** | None / native headless CLI | Headless execution. **Native only.** | Editor and adapter workflows untested. |
| dots Debian 13.6 x86_64 / FFmpeg **7.1.5** | None / native CLI | Produced MP4. **Native only.** | No DCC-MCP adapter tested. |
| dots Debian 13.6 x86_64 / ImageMagick (**version not recorded**) | None / native CLI | Produced PNG. **Native only.** | Record the version before claiming a reproducible adapter workflow. |
| dots Debian 13.6 x86_64 / CadQuery **2.7** | None / Python API | Small API check. **Native only.** | Full modeling/export and adapter workflow untested. |
| dots Debian 13.6 x86_64 / KiCad **9.0.2** | None / Python API | Small API check. **Native only.** | PCB editing/export and adapter workflow untested. |
| dots Debian 13.6 x86_64 / ParaView **5.13.2** | None / Python API | Small API check. **Native only.** | Visualization/export and adapter workflow untested. |
| dots Debian 13.6 x86_64 / QGIS **3.40.6** | None / Python API | Small API check. **Native only.** | Project/export and adapter workflow untested. |
| dots Debian 13.6 x86_64 / LibreOfficeDev **26.8 alpha** | None / native CLI | DOCX-to-PDF experiment. **Native only; experimental.** | Alpha build; no production or adapter acceptance claim. |
| dots Debian 13.6 x86_64 / Kdenlive **24.12.3** | None / version/help CLI | Executable responded to version/help. **Not confirmed** for rendering. | No render or adapter workflow tested. |
| dots Debian 13.6 x86_64 / Slicer (**version not established**) | None / application entry point | Entry point found; headless attempt failed. **Not confirmed.** | Native execution and adapter integration remain unresolved. |

## Cloud MCP tests {#cloud-mcp-tests}

The following bounded experiments were frozen by the cloud test worker on **2026-10-01 UTC**: two MCP closed loops passed after local patches, one Blender compatibility experiment passed below its support floor, and one Inkscape production workflow remained blocked. Website builds and browser checks on PC8 are separate documentation validation. These rows are not a general support certification. The [public evidence summary](/cloud-evidence/2026-10-01.json) records the supplied results and local patch identities; it contains no patch payloads, credentials, or private download links.

| Platform / software | Adapter / release or source / connection | Workflow and observed evidence | Untested or blocked |
| --- | --- | --- | --- |
| dots / Debian 13.6 x86_64 / Blender **4.3.2** | `dcc-mcp-blender` published **0.2.12** + Core **0.20.39** / real MCP | Initialize, list/load, new scene, create object, save blend, clear scene, reopen, inspect scene and GLB export passed. **MCP tested; compatibility experiment.** | Below [official Blender support floor 4.5](https://github.com/dcc-mcp/dcc-mcp-blender). Arbitrary scripting disabled; Draco explicitly disabled. Full Blender 4.3 support, GUI and render-through-MCP not established. |
| dots / Debian 13.6 x86_64 / FreeCAD **1.0.0** | [`dcc-mcp-freecad`](https://github.com/dcc-mcp/dcc-mcp-freecad) / unpublished local patch `f761672f62ab8d0d1ae3d77a6379249e307eeff1` / real MCP + Core **0.20.39** | Create, save, reopen, export and independent readback passed after fixing the list-valued `verified` versus Core boolean result mismatch. **MCP tested with a local patch.** 138 tests passed, including 3 real-host tests, plus Ruff. | **Patch not released; no remote PR.** A successful native write alone had failed MCP job validation before the fix. The local commit is an evidence identity, not an available published release. |
| dots / Debian 13.6 x86_64 / Inkscape **1.4** | [`dcc-mcp-inkscape`](https://github.com/dcc-mcp/dcc-mcp-inkscape) / source `9769234` / MCP discovery; GUI + temporary `inkex` dependencies for the native action | Discovery/capabilities were readable. Headless execution lacked the native extension action. GUI generation wrote native SVG, but Linux GLib double-fork parent PID 1 failed provenance validation. **MCP production workflow incomplete.** | Linux source integration gap; do not relax provenance checks or claim production acceptance. The SVG intermediate does not establish a successful MCP production job. |
| dots / Debian 13.6 x86_64 / OpenSCAD **2021.01** | [`dcc-mcp-openscad`](https://github.com/dcc-mcp/dcc-mcp-openscad) base **0.2.1** + unpublished local patch `799fc2af97d13365613545347e4d4817e9f75b48` / real MCP + Core **0.20.39** | Version discovery, new-session reopen/inspection, parameter compilation, binary/ASCII STL export and independent readback passed after the `verified` boolean fix. Readback found **12 triangles, 7200 mm³**; safety rejection checks passed. **MCP tested with a local patch.** 129 unit tests passed, 4 Windows-only tests skipped; 2 native tests passed. | **Patch not released.** PNG failed with the shell DISPLAY/OpenGL path. SCAD source was created as local text: the adapter has no authoring API, so this is not from-scratch modeling through MCP. |

## Choose a connection {#choose-a-connection}

1. **Application in the agent's cloud computer:** use a supported local adapter and the CLI, or the environment's MCP client. Verify the exact application and adapter versions first. Native APIs are useful for discovering an integration candidate; typed adapter acceptance comes next.
2. **Application on an authorized workstation:** keep the DCC endpoint on loopback and connect through an approved computer connection or protected gateway. The cloud agent needs access to the intended project and artifact paths, and the workstation must remain available.
3. **Shell-capable agent:** use `dcc-mcp-cli` for inventory, narrow tool discovery and calls. A native MCP configuration UI is optional. Command MCP and the CLI are separate interfaces; Core's `translate` bridges **stdio → HTTP**, and client Command support does not prove a DCC stdio workflow.

For cross-network use, provide **TLS and authentication at a front proxy or dedicated OAuth gateway**, restrict access and keep the DCC bound to loopback. In [Core 0.20.39's auth contract](https://github.com/dcc-mcp/dcc-mcp-core/blob/v0.20.39/docs/guide/remote-server.md#auth), native `McpHttpServer` request-level Bearer/OAuth/CIMD enforcement is still planned. `ApiKeyConfig` and `OAuthConfig` helpers are not a runtime security boundary. A plain endpoint must not be treated as an authenticated public service.

## Installation prerequisites {#prerequisites}

- Permission to install or update software in the chosen environment; an available target application and any required license. A DCC-MCP plugin does not bundle the application, its license, or a public multi-tenant endpoint.
- An application version within the owning adapter's supported range, required native libraries and a verified official adapter or explicitly recorded source patch.
- A compatible CLI/MCP connection, a ready live instance and an authorized project directory. GUI-dependent tools also need the platform's managed desktop or supported display service.
- For remote use, reachable approved TLS/auth infrastructure and secrets managed by the operator. This guide does not provision a public endpoint or credentials.

Follow the [shared agent setup](/agents) and [adapter directory](/ecosystem). Installation instructions and host-specific troubleshooting remain in the adapter repository.

## A workflow with verification {#verified-workflow}

Start with a task-owned document and one bounded operation. For example, inspect a CAD part, make a dimension change, save it, reopen it and verify the dimension before exporting STEP. This is an acceptance pattern; the matrix above states which experiments actually passed.

```bash
# After approved setup, inspect the current environment and live instances.
dcc-mcp-cli doctor
dcc-mcp-cli list

# Only continue when a ready instance for the intended application exists.
dcc-mcp-cli search --query "inspect document" --dcc-type freecad

# Follow the returned next_step and exact schema; do not invent a tool slug.
```

Stop if inventory is empty or the instance is not ready. Keep the application/adapter/Core versions, connection route, source commit for patches, request/job IDs and artifact checks. A save or export should be verified by reopening the native document or independently inspecting the output. Preserve a failed job's ID before diagnosing it; do not blindly replay a mutation.

```text
Use the dcc-mcp Skill to inspect the task-owned document in the selected cloud computer or authorized workstation. Check versions and readiness, use typed tools for one bounded change, save and reopen the result, and verify the exported artifact. Ask before installing software or changing system state. Report the connection route, evidence and remaining limits.
```

## FAQ {#faq}

### Does this mean all four platforms support every DCC?

No. Platform interfaces, installed software and adapter acceptance are separate. Grok Bot and Muse have documented integration paths but no DCC tests here; Cue's required interfaces remain unconfirmed. Even a passing test applies only to its recorded versions and workflow.

### Can I use DCC-MCP without a native MCP settings screen?

Yes, when the agent has authorized shell access, a working `dcc-mcp-cli` and a reachable local or protected HTTP gateway. Check that the platform permits the required execution and connection. A shell alone does not install or license the application.

### Why can native execution pass while MCP fails?

A native command can create a file while adapter dispatch, result validation, job tracking or source-provenance checks fail. FreeCAD and Inkscape above expose these different boundaries. Treat the adapter's failure as unresolved until the typed workflow and artifact readback both pass.

### Can a cloud agent work with my licensed desktop DCC?

An authorized personal-computer connection or protected gateway may provide that route. Confirm access, supported versions, paths, workstation availability and licensing with the operator; the platform docs do not certify every desktop DCC.

### Will this page guarantee AI-search visibility?

No. [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) calls for normal discoverable, readable content and structured data matching visible facts; it requires no special AI file or schema and guarantees no indexing or display. [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots) distinguishes search crawling from training crawling. This guide preserves the site's existing crawler policies.
