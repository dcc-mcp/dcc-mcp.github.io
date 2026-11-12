# Creative crew characters

Five illustrative workflow roles adapted from the original Bot set in the Monica Agent Team sharing project on 2026-11-12. The geometry and animation sequence were authored with AI assistance for DCC-MCP contributors. These are original shapes, not copies of upstream character presets.

| Website asset | Source role | Motif |
| --- | --- | --- |
| `planner` | task-planning | Speech bubble and antenna |
| `maker` | scene-creation | Clapperboard |
| `lookdev` | materials-lighting | Gear |
| `reviewer` | result-checking | Shield |
| `producer` | delivery | Magnifying glass |

Each role includes its source geometry JSON, a transparent 256 × 256 PNG and a 27-frame GIF with a 3.24-second loop. PNG/GIF files are unchanged raster bytes, renamed for the website. The neutral JSON IDs describe the geometry and do not imply a rerender with new motion seeds. `source-manifest.json` records authorship, source filenames, dimensions, sizes and SHA-256 digests.

The source set used [open-bot-avatar 0.2.1](https://github.com/DominikScholz/open-bot-avatar) to render SVG frames, then ImageMagick to rasterize them. The original character geometry, sequence and packaged artwork use the MIT license in `LICENSE.txt`. The renderer's MIT notice, Copyright 2026 Dominik Scholz, is preserved in `open-bot-avatar-LICENSE.txt`.

The homepage uses static images by default. A visitor can animate the selected character; pausing replaces the GIF with its PNG. A reduced-motion preference disables animation. The shared loop is decorative, not a live Agent status indicator or a set of task-specific state animations. The characters leave the official DCC-MCP logo unchanged.
