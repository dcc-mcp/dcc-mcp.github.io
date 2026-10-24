---
layout: home
title: DCC-MCP
description: 用 AI 操作 Maya、Blender、3ds Max 等创意软件，完成建模、材质、动画和渲染任务。DCC-MCP 提供 MCP、命令行和 REST 接口。
---


<div class="home-proof" aria-label="DCC-MCP 平台摘要">
  <span><strong>公开</strong> Agent Skill</span>
  <span><strong>参数校验</strong> CLI</span>
  <span><strong>MCP + REST</strong> 接口</span>
  <span><strong>50+</strong> 个公开项目</span>
</div>

<CollectionMasonry locale="zh" />

<section class="creation-method" aria-labelledby="creation-method-title">
  <h2 id="creation-method-title">好作品，有方法。<br>让方法，能够复用。</h2>
  <ol>
    <li><strong>描述创作意图。</strong><p>把任务交给 Agent，用 Skill 记录你的工作方法。</p></li>
    <li><strong>进入真实工具。</strong><p>通过类型化 MCP、CLI 或 REST 接口，连接应用原生能力。</p></li>
    <li><strong>留下创作证据。</strong><p>交付可编辑工程、输出与验证记录，明确每一步的边界。</p></li>
  </ol>
</section>

<HomeIntroVideo locale="zh" />

<div id="install-prompt" class="install-intro">
  <p class="home-kicker">配置</p>
  <h2>安装一次，然后描述任务。</h2>
  <p>DCC 指数字内容创作（Digital Content Creation）。安装 dcc-mcp Skill 工作流指南后，支持 Agent Skills 的 AI 客户端就能按统一流程连接和使用这些软件。</p>
</div>

```bash
npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

```text
使用 dcc-mcp Skill 为这台机器上的创意应用配置 DCC-MCP。安装软件或改变系统状态前先询问我，完成后提供验证证据。
```

<p class="install-note">请在 Agent 的工作目录运行命令；如需供当前用户的所有项目使用，可追加 <code>--global</code>。<a href="/zh/agents">查看支持的 AI 客户端</a>或<a href="/zh/use-cases">选择一个任务 →</a></p>

<section class="home-marketplace-section" aria-labelledby="cloud-agents-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">云 AGENT</p>
      <h2 id="cloud-agents-title">让创作，跨过工作站。</h2>
    </div>
    <div>
      <p>先盘点可用软件，选择 MCP 或 CLI 连接方式，并保留工程文件与验证记录。选择环境前，对照平台官方接口、带日期的 DCC 实测、安装前提与部署限制。</p>
      <p><a href="/zh/cloud-agents">云 Agent 与 DCC-MCP →</a></p>
    </div>
  </div>
</section>

<section class="home-marketplace-section" aria-labelledby="mcp-cli-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">MCP + CLI</p>
      <h2 id="mcp-cli-title">一种方法，多种接口。</h2>
    </div>
    <div>
      <p>Maya MCP、3ds Max MCP 和 Blender MCP 都提供类型化工具：每个工具明确规定参数、参数类型和返回结果，调用前可查询和校验。MCP（模型上下文协议）与 <code>dcc-mcp-cli</code> 共用这些工具；要使用 Maya CLI 或 Blender CLI，只需在命令中指定对应应用标识。</p>
      <p><a href="/zh/control/maya">Maya MCP 与 Maya CLI</a> · <a href="/zh/control/3ds-max">3ds Max MCP 与 3ds Max CLI</a> · <a href="/zh/control/blender">Blender MCP 与 Blender CLI</a></p>
    </div>
  </div>
</section>

<section class="home-marketplace-section" aria-labelledby="vendor-ai-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">厂商原生 AI</p>
      <h2 id="vendor-ai-title">顺着应用的原生能力创作。</h2>
    </div>
    <div>
      <p><strong>Unreal Engine 官方 MCP：</strong><a href="https://github.com/dcc-mcp/dcc-mcp-unreal/blob/main/src/dcc_mcp_unreal/skills/unreal-official-mcp/SKILL.md">Unreal Skill</a> 启用并接入 Epic 官方工具集，保留原有工具名称和参数定义。</p>
      <p><strong>Unity 与团结 AI：</strong><a href="https://github.com/dcc-mcp/dcc-mcp-unity/blob/main/src/dcc_mcp_unity/skills/unity-tuanjie-ai/SKILL.md">Unity Skill</a> 先查询 Codely CustomTool 工具目录，再调用本次查询确认可用的工具；登录、积分、下载和任务恢复仍由团结软件包处理。</p>
      <p>Agent 控制指南：<a href="/zh/control/unity">Unity 与团结 AI</a> · <a href="/zh/control/unreal-engine">Unreal Engine</a> · <a href="/zh/control/godot">Godot</a></p>
    </div>
  </div>
</section>

<section class="integrations-section" aria-labelledby="integrations-title">
  <div class="integrations-heading">
    <div>
      <p class="home-kicker">官方集成</p>
      <h2 id="integrations-title">熟悉的工具，连成工作流。</h2>
    </div>
    <p><code>dcc-mcp-cli 0.20.39 dcc-types</code> 在已验证的签名目录中列出 38 个适配器标识：33 个有目录安装制品，5 个尚无。46 份指南还涵盖 Office、目录外 6 个已独立发布的集成和 1 个 Marketplace Skill。<a href="/catalog/core-v0.20.39-dcc-types.json">查看版本化证据</a>。目录定义不代表已完成 Host 或工具执行验收。可选的 <code>autodesk-help</code> 是外部只读连接器。</p>
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
    <a href="https://github.com/dcc-mcp/dcc-mcp-shogun"><img class="dcc-logo-white" src="/dcc-logos/shogun.svg" alt="Shōgun 集成使用的 Vicon 字标"><span>Shōgun</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-touchdesigner"><img src="/dcc-logos/touchdesigner-reference.svg" alt="用于 TouchDesigner 集成的原创算子网络图形"><span>TouchDesigner</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-fpt"><img src="/dcc-logos/shotgrid.png" alt="Flow Production Tracking logo"><span>Flow Production Tracking</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-substance3d-designer"><img src="/dcc-logos/substance3d-designer.svg" alt="Substance 3D Designer logo"><span>Substance Designer</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-substance3d-painter"><img src="/dcc-logos/substance3d-painter.svg" alt="Substance 3D Painter logo"><span>Substance Painter</span></a>
    <a class="dcc-tile-featured" href="https://github.com/dcc-mcp/dcc-mcp-wwise"><img src="/dcc-logos/wwise.png" alt="Wwise logo"><span>Wwise</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-zbrush"><img src="/dcc-logos/zbrush.png" alt="ZBrush logo"><span>ZBrush</span></a>
  </div>
  <a class="integrations-more" href="/zh/use-cases">查看各应用的 AI 控制指南 →</a>
</section>

<section class="home-marketplace-section" aria-labelledby="home-marketplace-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">能力市场</p>
      <h2 id="home-marketplace-title">把好用的工作流，交给下一次创作。</h2>
    </div>
    <div>
      <p>查找工作流 Skills、资产来源、生成服务和工作室扩展。展示素材均来自软件包指定的固定源码版本。</p>
      <a href="/zh/marketplace">搜索技能市场 →</a>
    </div>
  </div>
  <MarketplaceSearch preview />
</section>
