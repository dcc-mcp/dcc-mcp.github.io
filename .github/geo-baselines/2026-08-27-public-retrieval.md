# DCC-MCP public retrieval baseline — 2026-08-27

This is a public search-retrieval baseline, not a direct answer-engine score. No ranking outcome is promised.

## Method

- Observation window: 2026-08-27 11:10:59 Asia/Shanghai (2026-08-27T03:10:59Z)
- Provider: Microsoft Bing
- Engine/interface: Bing Web Search RSS (`https://www.bing.com/search?format=rss`)
- English route locale/search market: `en` / `US` (the Bing request maps `en` to provider locale `en-US`)
- Chinese locale/market: `zh-CN` / `CN`
- Ranking window: first qualifying DCC-MCP result in the top 10 RSS items
- First party: a byte-for-byte WHATWG-normalized HTTPS URL on the frozen ASCII host allowlist, with no credentials, port, query, fragment, encoded alias, path alias, or trailing slash on non-root routes. GitHub accepts only exact lowercase `github.com/dcc-mcp/<frozen-repository>` repository roots; PyPI accepts only exact lowercase `pypi.org/project/<package>` project roots. Application results must match the owning guide identity and exact `en` or `zh-CN` route locale
- Canonical: only `dcc-mcp.github.io` on an approved public route; application results must use that application's exact localized `/control/<slug>` route. Official GitHub and PyPI URLs are first-party but never canonical
- `NO_HIT`: no qualifying result in the top 10; rank, title, and URL are explicitly absent
- Reproduction command: `node scripts/measure-public-retrieval.mjs --scope all`
- Query-plan check: `node scripts/measure-public-retrieval.mjs --scope all --plan` emits 12 fixed and 74 bilingual application-control records across 37 applications
- Live reproduction verification: 2026-08-27 11:41–11:42 Asia/Shanghai emitted 123 records (12 fixed, 74 broad application, 37 miss diagnostics), with `0` first-party and `0` canonical hits

The engine frequently reinterpreted unbranded terms such as `DCC` and `control`. Unrelated results were not counted as DCC-MCP hits.

## Fixed 12-query baseline

| # | Provider | Engine | Locale | Exact query | Rank | Title | URL | First-party | Canonical |
| ---: | --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | Microsoft Bing | Bing Web Search RSS | en | `"DCC-MCP"` | NO_HIT | — | — | false | false |
| 2 | Microsoft Bing | Bing Web Search RSS | en | `"What is DCC-MCP"` | NO_HIT | — | — | false | false |
| 3 | Microsoft Bing | Bing Web Search RSS | zh-CN | `"DCC-MCP 是什么"` | NO_HIT | — | — | false | false |
| 4 | Microsoft Bing | Bing Web Search RSS | en | `"Why DCC-MCP"` | NO_HIT | — | — | false | false |
| 5 | Microsoft Bing | Bing Web Search RSS | en | `AI agent control Maya Blender Houdini typed tools gateway MCP` | NO_HIT | — | — | false | false |
| 6 | Microsoft Bing | Bing Web Search RSS | en | `use AI to control Maya typed tools MCP` | NO_HIT | — | — | false | false |
| 7 | Microsoft Bing | Bing Web Search RSS | zh-CN | `用 AI 控制 Maya MCP 类型化工具` | NO_HIT | — | — | false | false |
| 8 | Microsoft Bing | Bing Web Search RSS | en | `"How do I create ten random spheres in Maya?"` | NO_HIT | — | — | false | false |
| 9 | Microsoft Bing | Bing Web Search RSS | en | `"DCC-MCP Marketplace"` | NO_HIT | — | — | false | false |
| 10 | Microsoft Bing | Bing Web Search RSS | en | `"dcc-lookdev-turntable"` | NO_HIT | — | — | false | false |
| 11 | Microsoft Bing | Bing Web Search RSS | en | `"dcc-mcp-maya-procedural-architecture"` | NO_HIT | — | — | false | false |
| 12 | Microsoft Bing | Bing Web Search RSS | en | `"DCC-MCP" Wwise Marmoset Showcase` | NO_HIT | — | — | false | false |

Score: first-party top 5 `0/12`, first-party top 10 `0/12`, canonical top 5 `0/12`, canonical top 10 `0/12`.

## English application-control baseline

| Provider | Engine | Locale | Exact query | Rank | Title | URL | First-party | Canonical |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| Microsoft Bing | Bing Web Search RSS | en | `how to control 3ds Max with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control After Effects with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Blender with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Cinema 4D with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control ComfyUI with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Cache Inspector with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Flow Production Tracking with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control FreeCAD with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control GIMP with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Godot with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Houdini with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Illustrator with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Katana with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Krita with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Mari with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Marmoset Toolbag with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Material Maker with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Maya with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control MotionBuilder with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Nuke with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control OpenUSD with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control OpenSCAD with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Photoshop with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control PowerPoint with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Premiere Pro with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control RenderDoc with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Shōgun with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control SketchUp with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control TouchDesigner with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Substance 3D Designer with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Substance 3D Painter with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Tiled with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Unity with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Tuanjie / 团结 with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Unreal Engine with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control Wwise with AI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | en | `how to control ZBrush with AI` | NO_HIT | — | — | false | false |

English score: first-party/canonical top 10 `0/37`.

## Chinese application-control baseline

| Provider | Engine | Locale | Exact query | Rank | Title | URL | First-party | Canonical |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 3ds Max` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 After Effects` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Blender` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Cinema 4D` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 ComfyUI` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Cache Inspector` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Flow Production Tracking` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 FreeCAD` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 GIMP` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Godot` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Houdini` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Illustrator` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Katana` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Krita` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Mari` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Marmoset Toolbag` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Material Maker` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Maya` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 MotionBuilder` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Nuke` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 OpenUSD` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 OpenSCAD` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Photoshop` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 PowerPoint` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Premiere Pro` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 RenderDoc` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Shōgun` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 SketchUp` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 TouchDesigner` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Substance 3D Designer` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Substance 3D Painter` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Tiled` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Unity` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Tuanjie / 团结` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Unreal Engine` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 Wwise` | NO_HIT | — | — | false | false |
| Microsoft Bing | Bing Web Search RSS | zh-CN | `AI 怎么控制 ZBrush` | NO_HIT | — | — | false | false |

Chinese score: first-party/canonical top 10 `0/37`.

## Branded diagnostics and crawlability

Because all broad application queries missed, the exact diagnostic `"<application>" MCP "DCC-MCP"` was run for all 37 applications with Microsoft Bing / Bing Web Search RSS / route locale `en` and provider locale `en-US`. No qualifying result appeared in the top 10. The reproduction script runs the same diagnostic only when either broad application query misses.

- Bot/path probe: 42/42 usable `200` responses across GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Googlebot, and bingbot on representative English and Chinese homepage/control routes.
- Built HTML: canonical and `en`, `zh-CN`, and `x-default` alternates were present without JavaScript.
- Live release reconciliation before editing: CLI `dcc-types` 35, website released identifiers 34; PowerPoint was the missing website entity.
- Marketplace: 40/40 live entries carried immutable `source.ref` values.
- Organization inventory: 79 active repositories.

## Immutable retest gates

The fixed calendar anchor is 2026-08-28. If PR deployment has not occurred by a gate, record `NOT_DEPLOYED` and do not shift the date or attribute the result to indexing latency.

| Gate | Date (Asia/Shanghai) | Commands | Acceptance metrics |
| --- | --- | --- | --- |
| Day 0 | 2026-08-28 | `npm ci`; `npm run docs:build`; `node scripts/test-validate-released-hosts.mjs`; `node scripts/measure-public-retrieval.mjs --scope all > retrieval-2026-08-28.ndjson`; fetch `/`, `/zh/`, `/control/powerpoint`, `/zh/control/powerpoint`, `/robots.txt`, `/sitemap.xml`, and all four llms files | Exact 35-host set, no duplicates/missing/extra; 36 bilingual guides validate; 90 localized pages; 86 planned broad-query records plus diagnostics only for misses; representative live routes and metadata return usable `200` HTML |
| Day 7 | 2026-09-04 | `node scripts/measure-public-retrieval.mjs --scope all > retrieval-2026-09-04.ndjson` | 12/12 fixed and 74/74 bilingual application records present with provider, engine, locale, rank/title/URL or explicit null; compare first-party and canonical top-5/top-10 counts without a ranking promise |
| Day 14 | 2026-09-11 | `node scripts/measure-public-retrieval.mjs --scope all > retrieval-2026-09-11.ndjson` | Rerun every miss and its branded diagnostic; classify built-in AI/tutorial ambiguity separately from Agent-control hits; do not count uncited answer-engine output |
| Day 30 | 2026-09-27 | `node scripts/measure-public-retrieval.mjs --scope all > retrieval-2026-09-27.ndjson`; `npm run docs:build` | Full fixed/application delta by locale; exact 35-host/36-guide contract remains green; content or authority work proposed only for persistent measured blockers |

External repository metadata and indexing services remain outside this delivery and were not changed.
