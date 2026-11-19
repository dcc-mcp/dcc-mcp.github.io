# Minimal website release, 2026-11-17

The release is based on main commit `eee4030586a55ed6e3b09d7cf8b43aa4731bec26`. It integrates the approved minimal homepage from the older local workspace while preserving current onboarding and discovery contracts.

## Design and content

- Neutral light/dark surfaces, shared typography, sparse primary navigation, and official theme-aware Core Admin UI lockups.
- Independently written English/Chinese pipeline messaging, rotating application names, an accessible neutral application marquee, and the existing ZBrush/Maya handoff evidence.
- Three original ImageGen game-world, film/VFX, and character-production concepts. Original PNGs, prompts, web derivatives, and ownership are recorded in the brand and showcase-media indexes. Both languages distinguish the concepts from software captures.
- The immutable canonical Showcase inventory remains unchanged: 16 cases and four manifest-listed browser demos at `090d62743778b6fd0cd8bd085af4522e9caee2ff`. Public links fully navigate to the separate Showcase project; website-owned images stay in `/showcase-media/`.
- Existing native Skills CLI, Codex, and Claude Code installation commands, 46 integration guides, cloud workflows, vendor-native AI links, role illustrations, and workflow films remain accessible. Extended demonstrations use native disclosures to keep the default page compact.

## Validation

- Node 24 production build, repository validation, and the complete existing GEO/contract suite pass. Validation covers 112 localized pages, 46 bilingual control guides, current structured identities, installation commands, schema provenance, and discovery links.
- `npm run showcase:check` verifies the complete pinned inventory, source lock, and four demo entries.
- A generated-output audit checked 5,476 internal links and anchors across 117 HTML files with zero failures. Separate Showcase and Core project namespaces were treated as independent sites.
- Responsive fixture: `node scripts/responsive-qa.mjs 5176`, then open `http://127.0.0.1:5176/__qa` using the project DCC-CUA route. Nine true CSS viewport sizes cover 320 through 1440 pixels, including portrait, landscape, tablet, folded-size, and expanded-size layouts. Fourteen route templates are checked in both languages and appearances. Homepage checks expand the integration directory, setup details, and demonstrations before measuring.
- Final matrix: **504 cases, zero layout failures, zero pending catalogs**. Checks include horizontal overflow after scrollbar reservation, key element bounds, control-text clipping, and safe-area viewport metadata. The local report is `.codex-tmp/responsive-report.json`.
- Manual DCC-CUA review used provider `dcc-cua`, runtime `1.19.4`, PID `113204`, HWND `55447710`: narrow Chinese dark homepage, English light desktop image tabs and resulting media, Chinese dark 390px native installation cards, English dark collection, a 16-to-four-case demo filter, and 768px full-screen navigation.
- An inherited navigation overflow at 768px and 844px was corrected by switching the existing full-screen menu on before desktop navigation fits. The final primary navigation contains three destinations plus the resource menu, retaining every destination.
- Physical hinges, viewport segments, and iOS/Android hardware were not emulated or device-tested. Folded/expanded labels describe viewport dimensions. Browser-provided safe-area insets are supported without claiming real-device acceptance.

The original working tree and unrelated local media were preserved. The release is prepared in an isolated worktree; no production merge or publication is part of this acceptance.

## Follow-up copy, layout, and GEO review, 2026-11-19

- Reworked the bilingual homepage promise around a complete thought. English now reads “Connect your pipeline to Maya.” and Chinese now reads “让工作流连接 Maya 等软件。” The supporting copy names production, review, delivery, existing tools, and human handoffs.
- Tightened the pipeline, showcase, integration, marketplace, setup, and footer language so English and Chinese describe the same workflow. The three homepage concepts now use clearer game-world, film/VFX, and character-asset production language while preserving the explicit AI-concept disclosure.
- Added a production-area map for game development, film/VFX, 3D/look development, audio, and MCP/REST/CLI retrieval in both `llms.txt` variants. Corrected the official Showcase links to the separate `/showcase/` project and kept adapter examples under `/examples`.
- Expanded homepage metadata with descriptive titles, theme colors, social descriptions, image alt metadata, Organization ownership, SoftwareApplication features, and the digital-content-creation workflow category.
- Rebuilt and rechecked the site after the follow-up. The 504-case responsive matrix remained at zero failures and zero pending catalogs. Physical fold hinges and device-specific segment APIs remain outside the verification scope.
