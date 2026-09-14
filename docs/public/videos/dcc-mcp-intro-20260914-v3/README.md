# DCC-MCP: AI that works inside creative tools

Each language has a **30-second overview** and a **50-second explanation**.
The homepage uses the matching language's landscape videos with native controls,
metadata-only preload, optional WebVTT tracks and a full narration transcript.
Captions are already visible in each film; the optional subtitle track is not
enabled by default, avoiding duplicate captions.

## The two cuts

- `short.zh.mp4` and `short.en.mp4`: an existing headphone model receives a metal
  finish and a preview render, introducing DCC-MCP and reusable Skills.
- `explainer.zh.mp4` and `explainer.en.mp4`: the same example explains Skills plus
  MCP, relevant tool instructions, Rust routing, permissions, audit and team reuse.
- Matching `.webp` files are stills from the corresponding finished films.
- Matching `.vtt` files use UTF-8 and LF line endings.

Produced through [DCC-MCP Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive),
with Remotion motion graphics, AI male narration (Chinese Yunxi and English Guy),
and original synthesized music and sound effects. The production uses the
official DCC-MCP lockup intact.

The software imagery is **AI-generated interface reconstruction and workflow
illustration**, not live footage or evidence of those depicted software actions.
The [five original images and prompts](../../brand/dcc-mcp-workflow-20260914-v3/README.md)
are preserved separately. Product capability claims are supported by
[DCC-MCP Core](https://github.com/dcc-mcp/dcc-mcp-core/blob/9130601d421c793dc2b0d49331f33ca0f522528d/README.md)
and the [Blender adapter](https://github.com/dcc-mcp/dcc-mcp-blender/blob/9a74660e121f7320591880579684d40204ebcfeb/README.md).
No token-saving percentage or end-to-end Rust/Python speed comparison is claimed.

## References and attribution

The Blender layout reference is by the **Blender Documentation Team**, from the
[Blender Manual — Window System Introduction](https://docs.blender.org/manual/en/latest/interface/window_system/introduction.html).
The [original image](https://docs.blender.org/manual/en/latest/_images/interface_window-system_introduction_default-screen.png)
is provided under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/),
as described in the [Blender Manual copyright page](https://docs.blender.org/manual/en/latest/copyright.html).
ImageGen reconstructed neutral dark interface colours, replaced the cube with an
original headphone illustration, and created matching material, preview and batch
states. These five reference-derived interface illustrations are also provided
under CC BY-SA 4.0. Existing application marks and third-party trademarks remain
their owners' property and imply no endorsement.

The Kdenlive layout uses the [unchanged project-owner screenshot](https://github.com/dcc-mcp/dcc-mcp-kdenlive/blob/db719e633cc0b344281d5761e05b13659e7d0663/docs/showcase/kdenlive-solar-system.png),
supplied for public showcase use. ImageGen replaced the Solar System content with
the headphone project, removed the floating connection HUD, and rebalanced the
panels for landscape framing. The DCC-MCP logo is used separately and unchanged;
it is not generated or relicensed as part of these interface illustrations.

## Media record

Web derivatives use 1920 × 1080, 30 fps, H.264 `yuv420p`, BT.709, stereo 48 kHz
AAC and fast-start MP4 layout. The short picture contains 900 frames and the
explanation contains 1,500 frames. AAC encoder padding may make the container
slightly longer than the exact 30-second or 50-second picture.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| [short.zh.mp4](short.zh.mp4) | 2,935,114 | `e9c908f42df3843387785c6f091138427b2b427128dd132b28814553484b39ff` |
| [short.zh.webp](short.zh.webp) | 75,988 | `44da83fec57e38f6b5ef1063f09e6cf0d0cc3af951031e774cc27faa8165dead` |
| [short.zh.vtt](short.zh.vtt) | 770 | `3223ecac6fe9c1bda77d958aa1348b59bd82e5bad87671c02b9bd56746f99da8` |
| [short.en.mp4](short.en.mp4) | 2,887,438 | `127060fe83ae418106dc2a8b753d09ff691919d3764e7a6790c518f0704d6cc4` |
| [short.en.webp](short.en.webp) | 70,446 | `c2a1294fe597fde1ead51f04ef615972bb4a06b7e43ca6c94d733f76cbcc4c18` |
| [short.en.vtt](short.en.vtt) | 763 | `c8e3f17b772e0be7d62feaed27327d2d14cb28c766654a71625f15befb876007` |
| [explainer.zh.mp4](explainer.zh.mp4) | 4,674,033 | `1b4df11657132ef0e5ab943018595a1d12cf3a89a5d3e3bb7d2bdce6b301a597` |
| [explainer.zh.webp](explainer.zh.webp) | 71,796 | `e5b850f421f9d9f2c5bb328c31b6be80bedc33039e92a5dd052c041db509fb57` |
| [explainer.zh.vtt](explainer.zh.vtt) | 1,433 | `669f3004a348d73e61da4f63f5cf81bdbc2268ae3bae5a7ad7a6b1160fe38968` |
| [explainer.en.mp4](explainer.en.mp4) | 4,623,866 | `87f060df3df558a0c08578e7264fd88d9dc2b73710af546e886b3b477b885271` |
| [explainer.en.webp](explainer.en.webp) | 78,468 | `52ce60ae55c06d00c4edcbb9e1b357cbcc9bc3471875427bc473fb83c1700fcf` |
| [explainer.en.vtt](explainer.en.vtt) | 1,234 | `724c89199434d86bdd6e450ec1ca824d857ee8b7910c20d5c18dd8b17ed85975` |
