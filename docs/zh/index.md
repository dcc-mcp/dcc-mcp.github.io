---
layout: home
title: DCC-MCP
description: 通过一个 Agent Skill、一套类型化 CLI 和共享的生产级控制平面操作创意软件。

hero:
  name: DCC-MCP
  text: 创意工具，一个 Agent 接口。
  tagline: 通过共享控制平面发现并安全操作 Maya、Blender、Houdini、Unreal、Photoshop 与完整制作管线。
  image:
    src: /brand/dcc-mcp-logo-admin-light.png
    alt: DCC-MCP
  actions:
    - theme: brand
      text: 从 Skill 开始
      link: /zh/#install-prompt
    - theme: alt
      text: 浏览生态
      link: /zh/ecosystem
---

<div class="home-proof" aria-label="DCC-MCP 平台摘要">
  <span><strong>一个</strong> Agent Skill</span>
  <span><strong>一套</strong>类型化 CLI</span>
  <span><strong>MCP + REST</strong> 同时提供</span>
  <span><strong>50+</strong> 个公开项目</span>
</div>

<div id="install-prompt" class="install-intro">
  <p class="home-kicker">一段提示词完成接入</p>
  <h2>把下面内容交给你的 Agent。</h2>
  <p>它会安装正确的 Skill，连接 CLI 与适配器，验证 Gateway，并在每个会改变系统状态的边界先征得你的同意。</p>
</div>

```text
请在这台机器上配置 DCC-MCP，用于 Agent 驱动的创意工作流。

1. 从 ClawHub 安装 @loonghao/dcc-mcp，并严格遵循该 Skill。如果本轮还不能
   使用新安装的 Skill，请停止并提醒我开启一个新会话。
2. 验证 dcc-mcp-cli。如果尚未安装，先解释官方安装方式并获得我的许可；然后
   依次运行 update check、health、dcc-types 和 list。
3. 检测我使用的创意软件，只建议匹配的官方适配器；安装软件或改变系统状态前
   必须先征得我的同意。
4. 验证 Gateway 就绪状态，并完成一次安全的 search → load/describe → call，
   不得修改我当前的场景或文档。
5. 保留 request_id。失败时使用 doctor、按失败筛选的 stats，以及搜索发现的
   dcc_feedback__report；未经我批准，不得公开证据或创建外部 Issue。
6. 如需新建适配器，使用 @loonghao/dcc-mcp-creator；如需创建专项工作流 Skill，
   使用 @loonghao/dcc-mcp-skills-creator。
7. 最后报告已安装版本、已连接实例、验证证据，以及仍需我处理的事项。
```

<p class="install-note">只需粘贴一次，Agent Skill 会提供持续维护的工作流。<a href="/zh/agents">阅读 Agent 指南</a>或<a href="/zh/use-cases">从常见任务开始 →</a></p>

<section class="integrations-section" aria-labelledby="integrations-title">
  <div class="integrations-heading">
    <div>
      <p class="home-kicker">官方集成</p>
      <h2 id="integrations-title">20 款创意工具，一个接口。</h2>
    </div>
    <p>DCC-MCP 生态的官方适配器；使用 <code>dcc-mcp-cli dcc-types</code> 查询当前可安装版本。</p>
  </div>
  <div class="dcc-grid">
    <a href="https://github.com/dcc-mcp/dcc-mcp-3dsmax"><img src="/dcc-logos/3dsmax.png" alt="3ds Max logo"><span>3ds Max</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-aftereffects"><img src="/dcc-logos/aftereffects.svg" alt="After Effects logo"><span>After Effects</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-blender"><img src="/dcc-logos/blender.svg" alt="Blender logo"><span>Blender</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-godot"><img src="/dcc-logos/godot.svg" alt="Godot logo"><span>Godot</span></a>
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
    <a href="https://github.com/dcc-mcp/dcc-mcp-unity"><img src="/dcc-logos/unity.png" alt="Unity logo"><span>Unity</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-unreal"><img src="/dcc-logos/unreal.svg" alt="Unreal Engine logo"><span>Unreal Engine</span></a>
    <a href="https://github.com/dcc-mcp/dcc-mcp-zbrush"><img src="/dcc-logos/zbrush.png" alt="ZBrush logo"><span>ZBrush</span></a>
  </div>
  <a class="integrations-more" href="/zh/ecosystem">查看所有适配器与扩展 →</a>
</section>

<section class="home-marketplace-section" aria-labelledby="home-marketplace-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">能力市场</p>
      <h2 id="home-marketplace-title">按需添加工作流。</h2>
    </div>
    <div>
      <p>发现官方 Skills、资产提供方、AI 服务与工作室集成，并查看固定到源码版本的可视化成果。</p>
      <a href="/zh/marketplace">浏览完整技能市场 →</a>
    </div>
  </div>
  <ClientOnly>
    <MarketplaceSearch preview />
  </ClientOnly>
</section>

<section class="showcase-section">
  <div class="showcase-heading">
    <p class="home-kicker">使用 DCC-MCP 构建</p>
    <h2>从意图到生产产出。</h2>
    <p>来自生态适配器、AI 服务、程序化系统与资产提供方的真实工作流。</p>
  </div>
  <div class="showcase-grid">
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-blender">
      <img src="/showcase/blender-lookdev.webp" alt="Blender 程序化星系渲染" loading="lazy">
      <span><small>BLENDER</small><strong>程序化星系</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-marmoset">
      <img src="/showcase/marmoset-pbr-lookdev.webp" alt="在 Marmoset Toolbag 中还原并渲染 CC0 PBR 材质" loading="lazy">
      <span><small>MARMOSET</small><strong>CC0 PBR 材质还原</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-mcp-houdini">
      <img src="/showcase/houdini-portal.png" alt="Houdini 程序化传送门粒子" loading="lazy">
      <span><small>HOUDINI</small><strong>传送门粒子</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-ai-hunyuan3d">
      <img src="/showcase/hunyuan3d.webp" alt="从提示词生成 3D 灯笼资产" loading="lazy">
      <span><small>AI + 3D</small><strong>提示词到资产</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-asset-geospatial">
      <img src="/showcase/geospatial-city.webp" alt="地理数据生成程序化城市" loading="lazy">
      <span><small>GEOSPATIAL</small><strong>数据到城市</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture">
      <img src="/showcase/maya-architecture.jpg" alt="Maya 程序化住宅建筑变体" loading="lazy">
      <span><small>MAYA + BIFROST</small><strong>程序化建筑</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-asset-kenney">
      <img src="/showcase/kenney-assets.webp" alt="游戏资产发现、解包与关卡搭建" loading="lazy">
      <span><small>GAME ASSETS</small><strong>从浏览到构建</strong><em>↗</em></span>
    </a>
  </div>
  <a class="showcase-more" href="/zh/showcase">打开案例画廊并复制提示词 →</a>
</section>
