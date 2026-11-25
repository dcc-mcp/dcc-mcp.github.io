# Stellar gate modeling references

Generated with the built-in image generation workflow on 2026-08-01 from
`docs/public/brand/dcc-mcp-hero-stargate-v2-source.png`. These boards are
modeling guides; the Blender scene remains the geometry source of truth.

| Board | Modeling use |
| --- | --- |
| `dcc-mcp-stellar-gate-multiview-v1.png` | Locks silhouette, overall proportions, 2.5-3 m body depth, bridge and supports. |
| `dcc-mcp-stellar-gate-structure-details-v1.png` | Defines the inner throat, armor stack, service ring, bridge root and deck anchor. |
| `dcc-mcp-stellar-gate-topology-wireframe-v1.png` | Guides quad flow, bevel support loops and modular ownership. |
| `dcc-mcp-stellar-gate-exploded-assembly-v1.png` | Defines front-to-back assembly order and attachment hierarchy. |

## Design locks

- One consistent station-scale gate across every board.
- A deep, layered inner throat rather than a flat aperture.
- Asymmetric macro armor over a continuous load-bearing ring.
- A structurally integrated left bridge and broad lower supports.
- Aged blue-black armor steel with recessed warm conduits; no portal FX in the model references.

## Build order

1. Primary load frame and aperture proportions.
2. Inner throat liners, rail, service ring and rear shell.
3. Bridge, lower supports and deck anchors.
4. Modular armor skins and secondary machinery.
5. UVs, bevels, PBR wear and final camera alignment.

Prompt set: consistent multi-view model sheet; radial cutaway and construction
details; subdivision-ready wireframe topology; front-to-back exploded assembly.
All prompts require an aged, buildable hard-surface asset and prohibit clean
factory metal, flat ring graphics, regular toy-like gear teeth and portal FX.
