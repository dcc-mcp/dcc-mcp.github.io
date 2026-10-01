---
layout: home
title: DCC-MCP
description: Use AI to operate Maya, Blender, 3ds Max, and other creative software for modeling, materials, animation, and rendering through MCP, CLI, and REST interfaces.

hero:
  name: DCC-MCP
  text: Let AI work in creative software.
  tagline: Give AI assistants that can use tools (agents) access to Maya, Blender, Houdini, Unreal Engine, Photoshop, and other applications for modeling, materials, animation, and rendering.
  image:
    src: /brand/dcc-mcp-logo-admin-light.png
    alt: DCC-MCP
  actions:
    - theme: brand
      text: Set up DCC-MCP
      link: /#install-prompt
    - theme: alt
      text: Browse projects
      link: /ecosystem
---

<div class="home-proof" aria-label="DCC-MCP platform summary">
  <span><strong>Public</strong> Agent Skill</span>
  <span><strong>Typed</strong> CLI</span>
  <span><strong>MCP + REST</strong> endpoints</span>
  <span><strong>50+</strong> public projects</span>
</div>

<section class="home-marketplace-section" aria-labelledby="showcase-collection-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">SHOWCASE</p>
      <h2 id="showcase-collection-title">DCC-MCP Showcase collection</h2>
    </div>
    <div>
      <p>Explore the official collection: finished work, reusable prompts, tool-call evidence, source projects, and per-asset licensing. Each case states what was verified and whether it was reproduced.</p>
      <p><a href="https://dcc-mcp.github.io/showcase/" target="_self">Open the Showcase collection →</a> · <a href="/examples">Browse adapter examples and prompts</a></p>
    </div>
  </div>
</section>

<HomeIntroVideo locale="en" />

<div id="install-prompt" class="install-intro">
  <p class="home-kicker">SETUP</p>
  <h2>Install once. Then describe the task.</h2>
  <p>DCC means digital content creation. Install the dcc-mcp Skill workflow guide so an AI client that supports Agent Skills can connect to and use these applications through a shared workflow.</p>
</div>

```bash
npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

```text
Use the dcc-mcp Skill to set up DCC-MCP for the creative applications on this machine. Ask before installing or changing system state, and finish with verification evidence.
```

<p class="install-note">Run the command from your Agent workspace; use <code>--global</code> for user-level installation. <a href="/agents">See all Agent hosts</a> or <a href="/use-cases">choose a task →</a></p>

<section class="home-marketplace-section" aria-labelledby="mcp-cli-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">MCP + CLI</p>
      <h2 id="mcp-cli-title">Use the same tools through MCP or the command line.</h2>
    </div>
    <div>
      <p>Maya MCP, 3ds Max MCP, and Blender MCP expose typed tools: each tool defines its parameters, their types, and its results so calls can be inspected and validated. MCP (Model Context Protocol) and <code>dcc-mcp-cli</code> use these same tools. For a Maya CLI or Blender CLI workflow, select the application by its identifier.</p>
      <p><a href="/control/maya">Maya MCP and Maya CLI</a> · <a href="/control/3ds-max">3ds Max MCP and 3ds Max CLI</a> · <a href="/control/blender">Blender MCP and Blender CLI</a></p>
    </div>
  </div>
</section>

<section class="home-marketplace-section" aria-labelledby="vendor-ai-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">VENDOR-NATIVE AI</p>
      <h2 id="vendor-ai-title">Reuse official capabilities inside one workflow.</h2>
    </div>
    <div>
      <p><strong>Unreal Engine official MCP:</strong> the <a href="https://github.com/dcc-mcp/dcc-mcp-unreal/blob/main/src/dcc_mcp_unreal/skills/unreal-official-mcp/SKILL.md">Unreal Skill</a> enables and bridges Epic's official toolsets without renaming their tools or schemas.</p>
      <p><strong>Unity and Tuanjie AI:</strong> the <a href="https://github.com/dcc-mcp/dcc-mcp-unity/blob/main/src/dcc_mcp_unity/skills/unity-tuanjie-ai/SKILL.md">Unity Skill</a> inspects the native Codely CustomTool catalog before executing a freshly returned tool; Tuanjie still owns sign-in, credits, downloads, and task recovery.</p>
      <p>Agent-control guides: <a href="/control/unity">Unity and Tuanjie AI</a> · <a href="/control/unreal-engine">Unreal Engine</a> · <a href="/control/godot">Godot</a></p>
    </div>
  </div>
</section>

<section class="integrations-section" aria-labelledby="integrations-title">
  <div class="integrations-heading">
    <div>
      <p class="home-kicker">OFFICIAL INTEGRATIONS</p>
      <h2 id="integrations-title">38 catalog identifiers and 46 public guides.</h2>
    </div>
    <p><code>dcc-mcp-cli 0.20.38 dcc-types</code> lists 38 adapter-backed identifiers in the verified signed catalog: 33 have catalog installation artifacts; five do not. The 46 guides also cover Office, six independently released integrations outside this catalog, and one Marketplace Skill. <a href="/catalog/core-v0.20.38-dcc-types.json">Read the versioned evidence</a>. Catalog definitions do not establish live-host or tool-execution acceptance. The opt-in <code>autodesk-help</code> connector is external and read-only.</p>
  </div>
  <div class="dcc-grid">
    <a href="https://github.com/dcc-mcp/dcc-mcp-3dsmax"><img src="/dcc-logos/3dsmax.png" alt="3ds Max logo"><span>3ds Max</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-aftereffects"><img src="/dcc-logos/aftereffects.svg" alt="After Effects logo"><span>After Effects</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-blender"><img src="/dcc-logos/blender.svg" alt="Blender logo"><span>Blender</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-cinema4d"><img src="/dcc-logos/cinema4d.png" alt="Cinema 4D logo"><span>Cinema 4D</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-comfyui"><img src="/dcc-logos/comfyui.svg" alt="ComfyUI logo"><span>ComfyUI</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-freecad"><img src="/dcc-logos/freecad.png" alt="FreeCAD logo"><span>FreeCAD</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-godot"><img src="/dcc-logos/godot.svg" alt="Godot logo"><span>Godot</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-unreal"><img class="dcc-logo-invert-dark" src="/dcc-logos/unreal.svg" alt="Unreal Engine logo"><span>Unreal Engine</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-unity"><img src="/dcc-logos/unity.png" alt="Unity logo"><span>Unity</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-houdini"><img src="/dcc-logos/houdini.svg" alt="Houdini logo"><span>Houdini</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-illustrator"><img src="/dcc-logos/illustrator.svg" alt="Illustrator logo"><span>Illustrator</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-katana"><img src="/dcc-logos/katana.png" alt="Katana logo"><span>Katana</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-maya"><img src="/dcc-logos/maya.svg" alt="Maya logo"><span>Maya</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-marmoset"><img src="/dcc-logos/marmoset.png" alt="Marmoset Toolbag logo"><span>Marmoset</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-mari"><img class="dcc-logo-white" src="/dcc-logos/mari.svg" alt="Mari logo"><span>Mari</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-mobu"><img src="/dcc-logos/motionbuilder.png" alt="MotionBuilder logo"><span>MotionBuilder</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-nuke"><img src="/dcc-logos/nuke.png" alt="Nuke logo"><span>Nuke</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-openusd"><img src="/dcc-logos/openusd.svg" alt="OpenUSD logo"><span>OpenUSD</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-openscad"><img src="/dcc-logos/openscad.png" alt="OpenSCAD logo"><span>OpenSCAD</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-photoshop"><img src="/dcc-logos/photoshop.png" alt="Photoshop logo"><span>Photoshop</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-premiere"><img src="/dcc-logos/premiere.svg" alt="Premiere Pro logo"><span>Premiere Pro</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-renderdoc"><img src="/dcc-logos/renderdoc.svg" alt="RenderDoc logo"><span>RenderDoc</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-sketchup"><img src="/dcc-logos/sketchup.svg" alt="SketchUp logo"><span>SketchUp</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-shogun"><img class="dcc-logo-white" src="/dcc-logos/shogun.svg" alt="Vicon wordmark used for the Shōgun integration"><span>Shōgun</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-touchdesigner"><img src="/dcc-logos/touchdesigner-reference.svg" alt="Original operator-network motif for the TouchDesigner integration"><span>TouchDesigner</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-fpt"><img src="/dcc-logos/shotgrid.png" alt="Flow Production Tracking logo"><span>Flow Production Tracking</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-substance3d-designer"><img src="/dcc-logos/substance3d-designer.svg" alt="Substance 3D Designer logo"><span>Substance Designer</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-substance3d-painter"><img src="/dcc-logos/substance3d-painter.svg" alt="Substance 3D Painter logo"><span>Substance Painter</span></a>
    <a class="dcc-tile-featured" href="https://github.com/dcc-mcp/dcc-mcp-wwise"><img src="/dcc-logos/wwise.png" alt="Wwise logo"><span>Wwise</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-zbrush"><img src="/dcc-logos/zbrush.png" alt="ZBrush logo"><span>ZBrush</span></a>
  </div>
  <a class="integrations-more" href="/use-cases">See how AI controls every integration →</a>
</section>

<section class="home-marketplace-section" aria-labelledby="home-marketplace-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">CAPABILITY MARKETPLACE</p>
      <h2 id="home-marketplace-title">Find optional packages.</h2>
    </div>
    <div>
      <p>Search Skills, asset providers, services, and studio integrations. Showcase media is resolved from each package's pinned source revision.</p>
      <a href="/marketplace">Search the Marketplace →</a>
    </div>
  </div>
  <MarketplaceSearch preview />
</section>

<section class="showcase-section">
  <div class="showcase-heading">
    <p class="home-kicker">EXAMPLES</p>
    <h2>Outputs, sources, and validation records.</h2>
    <p>Explore modeling, material, animation, and asset workflows, with links to their tools, source projects, and verification records.</p>
  </div>
  <div class="showcase-grid">
    <a class="showcase-card showcase-wide showcase-media-contain" href="/examples#blender-designer-crate">
      <img src="/showcase-media/crate-render.png" alt="Weathered wooden crate rendered in Blender with Substance 3D Designer materials" loading="lazy">
      <span><small>BLENDER + SUBSTANCE 3D DESIGNER</small><strong>Weathered crate lookdev</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow showcase-media-contain" href="/examples#blender-designer-crate">
      <img src="/showcase-media/crate-uv-checker.png" alt="The same crate with its UV checker rendered in Blender" loading="lazy">
      <span><small>UV COORDINATES + CHECKER</small><strong>Inspect the model UVs</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-blender">
      <img src="/showcase-media/blender-lookdev.webp" alt="Procedural galaxy rendered in Blender" loading="lazy">
      <span><small>BLENDER</small><strong>Procedural galaxy</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow showcase-logo" href="/examples/wwise">
      <img src="/brand/dcc-mcp-wwise-dark.svg" alt="Wwise sound effects and background music showcase" loading="lazy">
      <span><small>WWISE</small><strong>Interactive audio</strong><em>▶</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-marmoset">
      <img src="/showcase-media/marmoset-pbr-lookdev.webp" alt="CC0 PBR material reconstructed and rendered in Marmoset Toolbag" loading="lazy">
      <span><small>MARMOSET</small><strong>CC0 PBR lookdev</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-mcp-houdini">
      <img src="/showcase-media/houdini-portal.png" alt="Procedural portal particles created in Houdini" loading="lazy">
      <span><small>HOUDINI</small><strong>Portal particles</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#openscad-parametric-pipeline">
      <img src="/showcase-media/openscad-parametric-pipeline.webp" alt="OpenSCAD bracket validated in FreeCAD and imported into Blender and Godot" loading="lazy">
      <span><small>OPENSCAD → FREECAD → BLENDER / GODOT</small><strong>Parametric CAD to verified game asset</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/examples#cinema4d-typed-scene">
      <img src="/showcase-media/cinema4d-typed-scene.webp" alt="Typed Cinema 4D primitives assembled, validated, and rendered" loading="lazy">
      <span><small>CINEMA 4D</small><strong>Build, check, and render a scene</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#comfyui-typed-workflow">
      <img src="/showcase-media/comfyui-typed-workflow.webp" alt="ComfyUI graph validated against live node contracts, executed, and delivered as an artifact" loading="lazy">
      <span><small>COMFYUI</small><strong>Validate, execute, deliver</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#illustrator-typed-vector-workflow">
      <img src="/showcase-media/illustrator-typed-vector-workflow.webp" alt="Illustrator documents inspected, edited through typed vector tools, and verified through production exports" loading="lazy">
      <span><small>ILLUSTRATOR</small><strong>Create and export vector artwork</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/examples#sketchup-typed-modeling">
      <img src="/showcase-media/sketchup-typed-modeling.webp" alt="SketchUp models inspected, built with typed geometry, organized, validated, and exported" loading="lazy">
      <span><small>SKETCHUP</small><strong>Model, validate, and export</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#touchdesigner-typed-operator-workflow">
      <img src="/showcase-media/touchdesigner-typed-operator-workflow.webp" alt="Typed operator requests flow through a main-thread graph into verified project and PNG artifacts" loading="lazy">
      <span><small>TOUCHDESIGNER</small><strong>Build an operator graph and verify outputs</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#cache-inspection-workflow">
      <img src="/showcase-media/cache-inspection-workflow.webp" alt="Compressed geometry cache decoded within bounded limits into privacy-safe counts, bounds, and attribute summaries" loading="lazy">
      <span><small>CACHE INSPECTOR</small><strong>Inspect cache structure while protecting raw data</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#shogun-typed-mocap-workflow">
      <img src="/showcase-media/shogun-typed-mocap-workflow.webp" alt="Motion-capture scene data inspected and processed through bounded typed Shōgun tools" loading="lazy">
      <span><small>SHŌGUN</small><strong>Check capabilities, then process motion capture</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/examples#tiled-typed-map-workflow">
      <img src="/showcase-media/tiled-typed-map-workflow.webp" alt="Tiled map data authored through typed tools and validated as a durable TMJ artifact" loading="lazy">
      <span><small>TILED</small><strong>Create and validate game maps</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#material-maker-typed-material-workflow">
      <img src="/showcase-media/material-maker-typed-material-workflow.webp" alt="Material Maker PTEX inspected and validated within defined limits before native texture export" loading="lazy">
      <span><small>MATERIAL MAKER</small><strong>Check PTEX materials and export textures</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#krita-typed-paint-workflow">
      <img src="/showcase-media/krita-typed-paint-workflow.webp" alt="Krita layered canvas authored through typed document and paint-layer tools" loading="lazy">
      <span><small>KRITA</small><strong>Create an editable layered canvas</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/examples#gimp-typed-image-workflow">
      <img src="/showcase-media/gimp-typed-image-workflow.webp" alt="GIMP image and layers authored through a fixed typed bridge and exported to XCF and PNG" loading="lazy">
      <span><small>GIMP</small><strong>Edit layers and verify exports</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#katana-typed-lookdev-workflow">
      <img src="/showcase-media/katana-typed-lookdev-workflow.webp" alt="Katana node graph created and connected through typed main-thread operations" loading="lazy">
      <span><small>KATANA</small><strong>Build a node graph and save the project</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#premiere-typed-edit-workflow">
      <img src="/showcase-media/premiere-typed-edit-workflow.webp" alt="Premiere Pro media, sequence, timeline, marker, and export queue operated through typed tools" loading="lazy">
      <span><small>PREMIERE PRO</small><strong>Edit a sequence and queue its export</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-ai-hunyuan3d">
      <img src="/showcase-media/hunyuan3d.webp" alt="Prompt to generated 3D lantern asset workflow" loading="lazy">
      <span><small>AI + 3D</small><strong>Prompt to asset</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-asset-geospatial">
      <img src="/showcase-media/geospatial-city.webp" alt="Geospatial data converted into a procedural city" loading="lazy">
      <span><small>GEOSPATIAL</small><strong>Data to city</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture">
      <img src="/showcase-media/maya-architecture.jpg" alt="Procedural residential architecture variations rendered in Maya" loading="lazy">
      <span><small>MAYA + BIFROST</small><strong>Procedural architecture</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-asset-kenney">
      <img src="/showcase-media/kenney-assets.webp" alt="Game asset discovery, unpacking, and level building workflow" loading="lazy">
      <span><small>GAME ASSETS</small><strong>Browse to build</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/examples#zbrush-fantasy-dragon">
      <img src="/showcase-media/zbrush-fantasy-dragon.png" alt="Fantasy Dragon remeshed from five million faces to a 115K PolyFrame mesh in ZBrush" loading="lazy">
      <span><small>ZBRUSH → MAYA</small><strong>5M import → 115K PolyFrame</strong><em>→</em></span>
    </a>
  </div>
  <a class="showcase-more" href="https://dcc-mcp.github.io/showcase/" target="_self">Open the Showcase collection →</a>
  <a class="showcase-more" href="/examples">Browse adapter examples and prompts →</a>
</section>
