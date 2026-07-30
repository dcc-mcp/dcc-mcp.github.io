---
layout: home
title: DCC-MCP
description: 通过共享 Gateway、类型化 CLI、MCP 与 REST 连接创意应用。

hero:
  name: DCC-MCP
  text: 让 Agent 使用创意软件。
  tagline: 通过共享 Gateway 和类型化工具连接 Maya、Blender、Houdini、Unreal、Photoshop 与制作管线中的其他应用。
  image:
    src: /brand/dcc-mcp-logo-admin-light.png
    alt: DCC-MCP
  actions:
    - theme: brand
      text: 配置 DCC-MCP
      link: /zh/#install-prompt
    - theme: alt
      text: 浏览项目
      link: /zh/ecosystem
---

<div class="home-proof" aria-label="DCC-MCP 平台摘要">
  <span><strong>公开</strong> Agent Skill</span>
  <span><strong>类型化</strong> CLI</span>
  <span><strong>MCP + REST</strong> 接口</span>
  <span><strong>50+</strong> 个公开项目</span>
</div>

<div id="install-prompt" class="install-intro">
  <p class="home-kicker">配置</p>
  <h2>把这段提示词复制给 Agent。</h2>
  <p>Agent 会按 Skill 中维护的步骤检查 CLI 和适配器；安装软件或改变系统状态前会先询问你。</p>
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

<p class="install-note">Skill 中保存了当前配置步骤。<a href="/zh/agents">阅读 Agent 指南</a>或<a href="/zh/use-cases">选择一个任务 →</a></p>

<section class="integrations-section" aria-labelledby="integrations-title">
  <div class="integrations-heading">
    <div>
      <p class="home-kicker">官方集成</p>
      <h2 id="integrations-title">20 个已发布适配器，另有 Wwise。</h2>
    </div>
    <p>当前发布目录提供 20 个适配器标识；Wwise 另有公开适配器与案例。使用 <code>dcc-mcp-cli dcc-types</code> 查询当前可安装列表。</p>
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
  <a class="integrations-more" href="/zh/ecosystem">打开项目目录 →</a>
</section>

<section class="home-marketplace-section" aria-labelledby="home-marketplace-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">能力市场</p>
      <h2 id="home-marketplace-title">查找可选软件包。</h2>
    </div>
    <div>
      <p>搜索 Skills、资产提供方、服务与工作室集成。展示素材从软件包固定的源码版本读取。</p>
      <a href="/zh/marketplace">搜索技能市场 →</a>
    </div>
  </div>
  <MarketplaceSearch preview />
</section>

<section class="showcase-section">
  <div class="showcase-heading">
    <p class="home-kicker">案例</p>
    <h2>结果、来源与验证记录。</h2>
    <p>这里收录适配器、程序化工具、资产提供方和外部服务的使用结果。</p>
  </div>
  <div class="showcase-grid">
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-blender">
      <img src="/showcase/blender-lookdev.webp" alt="Blender 程序化星系渲染" loading="lazy">
      <span><small>BLENDER</small><strong>程序化星系</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow showcase-logo" href="/zh/showcase/wwise">
      <img src="/brand/dcc-mcp-wwise-dark.svg" alt="Wwise 音效与背景音乐案例" loading="lazy">
      <span><small>WWISE</small><strong>交互音频</strong><em>▶</em></span>
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
    <a class="showcase-card showcase-wide" href="/zh/showcase#zbrush-fantasy-dragon">
      <img src="/showcase/zbrush-fantasy-dragon.png" alt="Fantasy Dragon 在 ZBrush 中从 500 万面重拓扑为 11.5 万面 PolyFrame 网格" loading="lazy">
      <span><small>ZBRUSH → MAYA</small><strong>500 万面导入 → 11.5 万面布线</strong><em>→</em></span>
    </a>
  </div>
  <a class="showcase-more" href="/zh/showcase">查看全部案例与提示词 →</a>
</section>
