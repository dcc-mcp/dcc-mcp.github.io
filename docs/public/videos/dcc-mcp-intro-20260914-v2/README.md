# DCC-MCP: Skills + MCP, explained

A 63-second introduction in Chinese and English. The homepage uses the matching
language's landscape edition with native playback controls. Captions are visible
in the video; optional WebVTT tracks are available without enabling themselves by
default. The homepage also includes the complete narration transcript.

## Files

- `intro.zh.mp4` and `intro.en.mp4`: landscape editions, with AI male narration
  and same-language captions.
- `poster.zh.webp` and `poster.en.webp`: stills from the corresponding finished film.
- `captions.zh.vtt` and `captions.en.vtt`: narration captions authored through the
  Kdenlive adapter.

## Production and sources

Produced with [DCC-MCP Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive).
Eight new ImageGen concept illustrations form one miniature science workshop:
paper manuals, ceramic workpieces, and cobalt-blue mechanical arms on warm white.
Remotion provides the motion graphics and typography. Kdenlive assembles the
visuals, narration, original generated music, and sound effects.

The narration uses AI male voices: Yunxi in Chinese and Guy in English. The
DCC-MCP lockup is reused intact from the website brand assets. The illustrations
are identified as AI concept visuals in the video and on the homepage.

The explanation covers reusable skills, MCP tool connections, relevant tool
discovery, Rust routing with Python host scripts, permissions and audit records,
the skill marketplace, and shared team workflows. The implementation sources are
[DCC-MCP Core](https://github.com/dcc-mcp/dcc-mcp-core) and the project's
[skill marketplace](https://dcc-mcp.github.io/marketplace).

Token efficiency and interpreter overhead are explained through their mechanisms;
the film does not present numerical performance comparisons or benchmark results.

## Media record

The MP4 files are web derivatives of the final Kdenlive landscape exports:
1920 × 1080, 30 fps, H.264 `yuv420p`, BT.709, stereo AAC at 48 kHz, and fast-start
MP4 layout. Each film has 1,890 frames (63 seconds); its container duration is
63.018 seconds including the encoded audio tail. Each poster is a 1920 × 1080
frame from its corresponding finished film.

Each language has 25 WebVTT cues matching the narration. WebVTT files use UTF-8
with LF line endings so their hashes remain stable across checkouts.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `captions.en.vtt` | 1,690 | `bd1713657392e005410799238140fd1790a606e7882787462f9334916f4f23f2` |
| `captions.zh.vtt` | 1,690 | `be654c5ccc76080f22fa3c0741755043e0caf7e8dbe21b48c23d2bdcbcea3340` |
| `intro.en.mp4` | 6,057,693 | `f51ce5182e5cca3a1069af1bfbc942c6673e91b77d754aa6e1d3d7e036643eca` |
| `intro.zh.mp4` | 6,035,680 | `57545a8a9c6aef6d731ccb611170663f25bd02f404f58312f9cc22e6a85c44c1` |
| `poster.en.webp` | 119,938 | `44fd8751270e219ff0fb21e7f735bc8866236766172fe7fbc2d29518f79c88b8` |
| `poster.zh.webp` | 121,366 | `cf4f327a133a09804827fe3b8e3bcc3aee9782c9e8762a2505cf2b9fd3026f29` |
