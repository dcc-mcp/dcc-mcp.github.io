---
layout: home
title: DCC-MCP
description: Use AI to operate Maya, Blender, 3ds Max, and other creative software for modeling, materials, animation, and rendering through MCP, CLI, and REST interfaces.
---


<div class="home-proof" aria-label="DCC-MCP platform summary">
  <span><strong>Public</strong> Agent Skill</span>
  <span><strong>Typed</strong> CLI</span>
  <span><strong>MCP + REST</strong> endpoints</span>
  <span><strong>50+</strong> public projects</span>
</div>

<CollectionMasonry locale="en" />

<section class="creation-method" aria-labelledby="creation-method-title">
  <h2 id="creation-method-title">Good work has a method.<br>Make yours repeatable.</h2>
  <ol>
    <li><strong>Describe the intent.</strong><p>Give your Agent a task and the Skill that captures your working method.</p></li>
    <li><strong>Work in the real tool.</strong><p>Connect to native application tools through typed MCP, CLI or REST interfaces.</p></li>
    <li><strong>Keep the evidence.</strong><p>Deliver editable projects, outputs and verification records. Make the limits visible.</p></li>
  </ol>
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

<section class="home-marketplace-section" aria-labelledby="cloud-agents-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">CLOUD AGENTS</p>
      <h2 id="cloud-agents-title">Your next workstation can be anywhere.</h2>
    </div>
    <div>
      <p>Inspect the available software, choose an MCP or CLI connection, and keep the project files and verification records. Compare documented platform interfaces, dated DCC tests, installation prerequisites, and deployment limits before choosing a host.</p>
      <p><a href="/cloud-agents">Cloud agents and DCC-MCP →</a></p>
    </div>
  </div>
</section>

<section class="home-marketplace-section" aria-labelledby="mcp-cli-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">MCP + CLI</p>
      <h2 id="mcp-cli-title">One method. Every interface.</h2>
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
      <h2 id="vendor-ai-title">Let the application lead.</h2>
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
      <h2 id="integrations-title">Your tools. One connected workflow.</h2>
    </div>
    <p><code>dcc-mcp-cli 0.20.39 dcc-types</code> lists 38 adapter-backed identifiers in the verified signed catalog: 33 have catalog installation artifacts; five do not. The 46 guides also cover Office, six independently released integrations outside this catalog, and one Marketplace Skill. <a href="/catalog/core-v0.20.39-dcc-types.json">Read the versioned evidence</a>. Catalog definitions do not establish live-host or tool-execution acceptance. The opt-in <code>autodesk-help</code> connector is external and read-only.</p>
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
      <h2 id="home-marketplace-title">Make a good workflow repeatable.</h2>
    </div>
    <div>
      <p>Search Skills, asset providers, services, and studio integrations. Showcase media is resolved from each package's pinned source revision.</p>
      <a href="/marketplace">Search the Marketplace →</a>
    </div>
  </div>
  <MarketplaceSearch preview />
</section>
