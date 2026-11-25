---
workflow: motion-graphics
flow: automation
storyboard: no
message: "Creative software signals converge into one shared DCC-MCP gateway"
destination: website-hero
aspect: 1920x1080
length: 6s
---

## Intent

A seamless, unnarrated particle overlay for the DCC-MCP homepage hero. Fine
cold-blue and warm-orange signals travel toward the existing stargate so the
gateway feels active, precise, and cinematic without competing with the copy.

## Assets

- `../../docs/public/brand/dcc-mcp-hero-stargate-v2-source.png` — geometry and palette reference only; the rendered overlay remains independently compositable.

## Customizations

- Deterministic inward particle paths with a readable peak around the portal.
- A clean loop: the final frame resolves to the same visual state as the first.
- Dark/transparent-feeling output intended for `screen` blending over the hero.

## Notes

- No narration, text, UI, or sound.
- Preserve the existing hero layout and cold/warm palette.
- Use frame-driven, seek-safe motion; no clocks, random runtime state, or infinite render-critical timelines.
