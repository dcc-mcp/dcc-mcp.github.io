# AGENTS.md

This repository is the official website and shared documentation front door for the DCC-MCP organization.

## Ownership boundary

- Keep shared onboarding, Agent workflows, developer routing, ecosystem discovery, GEO metadata, and public showcases here.
- Keep host-specific installation, compatibility, troubleshooting, and API details in the owning adapter or extension repository. Link to that source instead of duplicating it.
- Treat `dcc-mcp-core` as shared control-plane infrastructure, not as the website or an Agent product.

## Brand and assets

- Preserve original generated source images in `docs/public/brand/` and record derivatives in its `README.md`.
- Do not overwrite the authoritative Core README logo. Website variants must remain separate assets.
- Showcase media must link back to its owning DCC-MCP repository and be recorded in `docs/public/showcase/README.md`.

## Validation

Run `npm run docs:build` before opening a pull request. Visually verify the homepage at desktop and mobile widths whenever layout, brand, prompt, or showcase content changes.

## Git

Use Conventional Commits and the identity `loonghao <hal.long@outlook.com>`. Do not add AI-attribution footers. Rebase on the latest `main` before merge and keep history linear.
