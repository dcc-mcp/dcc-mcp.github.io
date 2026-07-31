---
layout: home
title: DCC-MCP
description: Connect creative applications through a shared Gateway, typed CLI, MCP, and REST.

hero:
  name: DCC-MCP
  text: Connect agents to creative software.
  tagline: Use the Gateway and typed tools to work with Maya, Blender, Houdini, Unreal, Photoshop, and other applications in the pipeline.
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

<div id="install-prompt" class="install-intro">
  <p class="home-kicker">SETUP</p>
  <h2>Copy this prompt into your agent.</h2>
  <p>The agent will follow the maintained Skill, check the CLI and adapters, and ask before installing software or changing system state.</p>
</div>

```text
Set up DCC-MCP on this machine for agent-driven creative workflows.

1. Install @loonghao/dcc-mcp from ClawHub and follow that Skill exactly. If the
   new Skill is not available in this turn, stop and ask me to start a new turn.
2. Verify dcc-mcp-cli. If it is missing, explain the official installer and ask
   for permission before running it. Then run update check, health, dcc-types,
   and list.
3. Detect the creative applications I use. Propose only matching official
   adapters, and ask before installing software or changing system state.
4. Verify gateway readiness and one safe search → load/describe → call path
   without modifying my current scene or document.
5. Preserve request IDs. On failure, use doctor, failure-filtered stats, and the
   discovered dcc_feedback__report workflow; never publish evidence or create an
   external issue without my approval.
6. If a new adapter is required, route through @loonghao/dcc-mcp-creator. If a
   focused workflow Skill is required, route through
   @loonghao/dcc-mcp-skills-creator.
7. Finish with installed versions, connected instances, validation evidence,
   and any action still required from me.
```

<p class="install-note">The Skill contains the current setup procedure. <a href="/agents">Read the agent guide</a> or <a href="/use-cases">choose a task →</a></p>

<section class="integrations-section" aria-labelledby="integrations-title">
  <div class="integrations-heading">
    <div>
      <p class="home-kicker">OFFICIAL INTEGRATIONS</p>
      <h2 id="integrations-title">20 released adapters, plus Wwise.</h2>
    </div>
    <p>The release catalog exposes 20 adapter identifiers. Wwise also has a public adapter and showcase; run <code>dcc-mcp-cli dcc-types</code> for the current installable list.</p>
  </div>
  <div class="dcc-grid">
    <a href="https://github.com/dcc-mcp/dcc-mcp-3dsmax"><img src="/dcc-logos/3dsmax.png" alt="3ds Max logo"><span>3ds Max</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-aftereffects"><img src="/dcc-logos/aftereffects.svg" alt="After Effects logo"><span>After Effects</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-blender"><img src="/dcc-logos/blender.svg" alt="Blender logo"><span>Blender</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-godot"><img src="/dcc-logos/godot.svg" alt="Godot logo"><span>Godot</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-unreal"><img class="dcc-logo-invert-dark" src="/dcc-logos/unreal.svg" alt="Unreal Engine logo"><span>Unreal Engine</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-unity"><img src="/dcc-logos/unity.png" alt="Unity logo"><span>Unity</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-houdini"><img src="/dcc-logos/houdini.svg" alt="Houdini logo"><span>Houdini</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-katana"><img src="/dcc-logos/katana.png" alt="Katana logo"><span>Katana</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-maya"><img src="/dcc-logos/maya.svg" alt="Maya logo"><span>Maya</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-marmoset"><img src="/dcc-logos/marmoset.png" alt="Marmoset Toolbag logo"><span>Marmoset</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-mobu"><img src="/dcc-logos/motionbuilder.png" alt="MotionBuilder logo"><span>MotionBuilder</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-nuke"><img src="/dcc-logos/nuke.png" alt="Nuke logo"><span>Nuke</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-openusd"><img src="/dcc-logos/openusd.svg" alt="OpenUSD logo"><span>OpenUSD</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-photoshop"><img src="/dcc-logos/photoshop.png" alt="Photoshop logo"><span>Photoshop</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-premiere"><img src="/dcc-logos/premiere.svg" alt="Premiere Pro logo"><span>Premiere Pro</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-renderdoc"><img src="/dcc-logos/renderdoc.svg" alt="RenderDoc logo"><span>RenderDoc</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-fpt"><img src="/dcc-logos/shotgrid.png" alt="Flow Production Tracking logo"><span>Flow Production Tracking</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-substance3d-designer"><img src="/dcc-logos/substance3d-designer.svg" alt="Substance 3D Designer logo"><span>Substance Designer</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-substance3d-painter"><img src="/dcc-logos/substance3d-painter.svg" alt="Substance 3D Painter logo"><span>Substance Painter</span></a>
    <a class="dcc-tile-dark" href="https://github.com/dcc-mcp/dcc-mcp-wwise"><img src="/dcc-logos/wwise.png" alt="Wwise logo"><span>Wwise</span></a>
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
    <p>Examples from adapters, procedural tools, asset providers, and external services.</p>
  </div>
  <div class="showcase-grid">
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-blender">
      <img src="/showcase/blender-lookdev.webp" alt="Procedural galaxy rendered in Blender" loading="lazy">
      <span><small>BLENDER</small><strong>Procedural galaxy</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow showcase-logo" href="/showcase/wwise">
      <img src="/brand/dcc-mcp-wwise-dark.svg" alt="Wwise sound effects and background music showcase" loading="lazy">
      <span><small>WWISE</small><strong>Interactive audio</strong><em>▶</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-marmoset">
      <img src="/showcase/marmoset-pbr-lookdev.webp" alt="CC0 PBR material reconstructed and rendered in Marmoset Toolbag" loading="lazy">
      <span><small>MARMOSET</small><strong>CC0 PBR lookdev</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-mcp-houdini">
      <img src="/showcase/houdini-portal.png" alt="Procedural portal particles created in Houdini" loading="lazy">
      <span><small>HOUDINI</small><strong>Portal particles</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-ai-hunyuan3d">
      <img src="/showcase/hunyuan3d.webp" alt="Prompt to generated 3D lantern asset workflow" loading="lazy">
      <span><small>AI + 3D</small><strong>Prompt to asset</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-asset-geospatial">
      <img src="/showcase/geospatial-city.webp" alt="Geospatial data converted into a procedural city" loading="lazy">
      <span><small>GEOSPATIAL</small><strong>Data to city</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture">
      <img src="/showcase/maya-architecture.jpg" alt="Procedural residential architecture variations rendered in Maya" loading="lazy">
      <span><small>MAYA + BIFROST</small><strong>Procedural architecture</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-asset-kenney">
      <img src="/showcase/kenney-assets.webp" alt="Game asset discovery, unpacking, and level building workflow" loading="lazy">
      <span><small>GAME ASSETS</small><strong>Browse to build</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/showcase#zbrush-fantasy-dragon">
      <img src="/showcase/zbrush-fantasy-dragon.png" alt="Fantasy Dragon remeshed from five million faces to a 115K PolyFrame mesh in ZBrush" loading="lazy">
      <span><small>ZBRUSH → MAYA</small><strong>5M import → 115K PolyFrame</strong><em>→</em></span>
    </a>
  </div>
  <a class="showcase-more" href="/showcase">View all examples and prompts →</a>
</section>
