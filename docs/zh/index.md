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
  <h2>安装一次，然后描述任务。</h2>
  <p>同一份持续维护的 Skill 可用于主流兼容 Agent Skills 的 Host。</p>
</div>

```bash
npx --yes skills@1.5.22 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

```text
使用 dcc-mcp Skill 为这台机器上的创意应用配置 DCC-MCP。安装软件或改变系统状态前先询问我，完成后提供验证证据。
```

<p class="install-note">请在 Agent 工作区运行命令；用户级安装可追加 <code>--global</code>。<a href="/zh/agents">查看全部 Agent Host</a>或<a href="/zh/use-cases">选择一个任务 →</a></p>

<section class="integrations-section" aria-labelledby="integrations-title">
  <div class="integrations-heading">
    <div>
      <p class="home-kicker">官方集成</p>
      <h2 id="integrations-title">34 个已发布适配器标识。</h2>
    </div>
    <p>当前发布目录提供 34 个适配器标识。下方卡片展示代表性集成；使用 <code>dcc-mcp-cli dcc-types</code> 查询完整的当前可安装列表。</p>
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
  <a class="integrations-more" href="/zh/use-cases">查看 AI 如何控制全部集成 →</a>
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
    <a class="showcase-card showcase-wide" href="/zh/showcase#openscad-parametric-pipeline">
      <img src="/showcase/openscad-parametric-pipeline.webp" alt="OpenSCAD 支架经 FreeCAD 验证并导入 Blender 与 Godot" loading="lazy">
      <span><small>OPENSCAD → FREECAD → BLENDER / GODOT</small><strong>参数化 CAD 到经验证的游戏资产</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/zh/showcase#cinema4d-typed-scene">
      <img src="/showcase/cinema4d-typed-scene.webp" alt="Cinema 4D 类型化基础体完成装配、验证与渲染" loading="lazy">
      <span><small>CINEMA 4D</small><strong>类型化场景自动化</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#comfyui-typed-workflow">
      <img src="/showcase/comfyui-typed-workflow.webp" alt="ComfyUI 图依据实时节点契约完成验证、执行与产物交付" loading="lazy">
      <span><small>COMFYUI</small><strong>验证、执行、交付</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#illustrator-typed-vector-workflow">
      <img src="/showcase/illustrator-typed-vector-workflow.webp" alt="Illustrator 文档经过检查、类型化矢量编辑与生产导出验证" loading="lazy">
      <span><small>ILLUSTRATOR</small><strong>类型化矢量创建与导出</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/zh/showcase#sketchup-typed-modeling">
      <img src="/showcase/sketchup-typed-modeling.webp" alt="SketchUp 模型经过检查、类型化建模、组织、验证与导出" loading="lazy">
      <span><small>SKETCHUP</small><strong>类型化模型到经验证的格式交换</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#touchdesigner-typed-operator-workflow">
      <img src="/showcase/touchdesigner-typed-operator-workflow.webp" alt="类型化算子请求经主线程图执行后生成可验证的工程与 PNG 产物" loading="lazy">
      <span><small>TOUCHDESIGNER</small><strong>类型化算子图到经验证产物</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#cache-inspection-workflow">
      <img src="/showcase/cache-inspection-workflow.webp" alt="压缩几何缓存在有界解码后生成隐私安全的数量、边界与属性摘要" loading="lazy">
      <span><small>CACHE INSPECTOR</small><strong>有界缓存到隐私安全结构摘要</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#shogun-typed-mocap-workflow">
      <img src="/showcase/shogun-typed-mocap-workflow.webp" alt="通过有界的 Shōgun 类型化工具检查与处理动作捕捉场景数据" loading="lazy">
      <span><small>SHŌGUN</small><strong>带能力门控的类型化动作捕捉</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/zh/showcase#tiled-typed-map-workflow">
      <img src="/showcase/tiled-typed-map-workflow.webp" alt="通过类型化工具制作 Tiled 地图数据并验证持久化 TMJ 产物" loading="lazy">
      <span><small>TILED</small><strong>类型化地图制作与验证</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#material-maker-typed-material-workflow">
      <img src="/showcase/material-maker-typed-material-workflow.webp" alt="检查并验证 Material Maker PTEX 后执行原生纹理导出" loading="lazy">
      <span><small>MATERIAL MAKER</small><strong>有界 PTEX 到纹理导出</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#krita-typed-paint-workflow">
      <img src="/showcase/krita-typed-paint-workflow.webp" alt="通过类型化文档与绘画图层工具制作 Krita 分层画布" loading="lazy">
      <span><small>KRITA</small><strong>类型化分层文档制作</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/zh/showcase#gimp-typed-image-workflow">
      <img src="/showcase/gimp-typed-image-workflow.webp" alt="通过固定类型化桥接制作 GIMP 图像与图层并导出 XCF 与 PNG" loading="lazy">
      <span><small>GIMP</small><strong>类型化图层到经验证导出</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#katana-typed-lookdev-workflow">
      <img src="/showcase/katana-typed-lookdev-workflow.webp" alt="通过类型化主线程操作创建并连接 Katana 节点图" loading="lazy">
      <span><small>KATANA</small><strong>类型化节点图到持久化工程</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#premiere-typed-edit-workflow">
      <img src="/showcase/premiere-typed-edit-workflow.webp" alt="通过类型化工具操作 Premiere Pro 媒体、Sequence、时间线、Marker 与导出队列" loading="lazy">
      <span><small>PREMIERE PRO</small><strong>类型化剪辑到导出队列</strong><em>→</em></span>
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
