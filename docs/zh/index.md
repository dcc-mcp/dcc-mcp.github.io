---
layout: home
title: DCC-MCP
description: 用 AI 操作 Maya、Blender、3ds Max 等创意软件，完成建模、材质、动画和渲染任务。DCC-MCP 提供 MCP、命令行和 REST 接口。

hero:
  name: DCC-MCP
  text: 让 AI 操作创意软件。
  tagline: 让 AI 智能体（Agent）在 Maya、Blender、Houdini、Unreal Engine、Photoshop 等软件中完成建模、材质、动画和渲染任务。
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
  <span><strong>参数校验</strong> CLI</span>
  <span><strong>MCP + REST</strong> 接口</span>
  <span><strong>50+</strong> 个公开项目</span>
</div>

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

<section class="home-marketplace-section" aria-labelledby="mcp-cli-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">MCP + CLI</p>
      <h2 id="mcp-cli-title">通过 MCP 或命令行，调用同一套工具。</h2>
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
      <h2 id="vendor-ai-title">在同一工作流中复用官方能力。</h2>
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
      <h2 id="integrations-title">37 条已发布适配器路由，45 份公开指南。</h2>
    </div>
    <p><code>dcc-mcp-cli 0.20.25 dcc-types</code> 列出 37 个已发布的适配器标识。指南还收录了 Office 共享应用入口、独立发布的 Tracy、5 个源码预览项目和 1 个 Marketplace Skill。可选的 <code>autodesk-help</code> 仅连接外部文档供查询，不属于 DCC 适配器，也不能修改应用内容。</p>
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
      <h2 id="home-marketplace-title">查找可选软件包。</h2>
    </div>
    <div>
      <p>查找工作流 Skills、资产来源、生成服务和工作室扩展。展示素材均来自软件包指定的固定源码版本。</p>
      <a href="/zh/marketplace">搜索技能市场 →</a>
    </div>
  </div>
  <MarketplaceSearch preview />
</section>

<section class="showcase-section">
  <div class="showcase-heading">
    <p class="home-kicker">案例</p>
    <h2>结果、来源与验证记录。</h2>
    <p>查看建模、材质、动画和资产处理案例，并追溯所用工具、项目来源和验证记录。</p>
  </div>
  <div class="showcase-grid">
    <a class="showcase-card showcase-wide showcase-media-contain" href="/zh/showcase#blender-designer-crate">
      <img src="/showcase/crate-render.png" alt="使用 Substance 3D Designer 材质在 Blender 中渲染的旧木箱" loading="lazy">
      <span><small>BLENDER + SUBSTANCE 3D DESIGNER</small><strong>旧木箱材质与视觉开发</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow showcase-media-contain" href="/zh/showcase#blender-designer-crate">
      <img src="/showcase/crate-uv-checker.png" alt="同一个木箱模型在 Blender 中的 UV 棋盘格渲染" loading="lazy">
      <span><small>UV 坐标 + 棋盘格</small><strong>查看模型 UV</strong><em>→</em></span>
    </a>
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
      <span><small>OPENSCAD → FREECAD → BLENDER / GODOT</small><strong>将 CAD 模型转换为游戏资产并验证</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/zh/showcase#cinema4d-typed-scene">
      <img src="/showcase/cinema4d-typed-scene.webp" alt="通过参数明确的工具在 Cinema 4D 中搭建基础几何体、验证场景并渲染" loading="lazy">
      <span><small>CINEMA 4D</small><strong>自动搭建、检查并渲染场景</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#comfyui-typed-workflow">
      <img src="/showcase/comfyui-typed-workflow.webp" alt="根据运行中的节点定义检查 ComfyUI 工作流，执行后获取输出文件" loading="lazy">
      <span><small>COMFYUI</small><strong>验证、执行、交付</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#illustrator-typed-vector-workflow">
      <img src="/showcase/illustrator-typed-vector-workflow.webp" alt="检查 Illustrator 文档，通过类型化工具编辑矢量图形并验证导出结果" loading="lazy">
      <span><small>ILLUSTRATOR</small><strong>创建矢量图形并导出</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/zh/showcase#sketchup-typed-modeling">
      <img src="/showcase/sketchup-typed-modeling.webp" alt="通过类型化工具创建和整理 SketchUp 模型，检查模型并导出交换格式" loading="lazy">
      <span><small>SKETCHUP</small><strong>建模、检查并导出</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#touchdesigner-typed-operator-workflow">
      <img src="/showcase/touchdesigner-typed-operator-workflow.webp" alt="在 TouchDesigner 主线程中通过类型化工具连接算子，保存工程和 PNG 并验证结果" loading="lazy">
      <span><small>TOUCHDESIGNER</small><strong>搭建算子网络，保存并验证输出</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#cache-inspection-workflow">
      <img src="/showcase/cache-inspection-workflow.webp" alt="在限制解码范围的前提下检查压缩几何缓存，只输出保护隐私的数量、包围盒和属性摘要" loading="lazy">
      <span><small>CACHE INSPECTOR</small><strong>检查缓存结构，保护原始数据</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#shogun-typed-mocap-workflow">
      <img src="/showcase/shogun-typed-mocap-workflow.webp" alt="确认 Shōgun 支持所需操作后，通过类型化工具在指定范围内检查和处理动作捕捉数据" loading="lazy">
      <span><small>SHŌGUN</small><strong>确认可用功能，再处理动作捕捉数据</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/zh/showcase#tiled-typed-map-workflow">
      <img src="/showcase/tiled-typed-map-workflow.webp" alt="通过类型化工具制作 Tiled 地图，保存为 TMJ 文件并验证" loading="lazy">
      <span><small>TILED</small><strong>制作并验证游戏地图</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#material-maker-typed-material-workflow">
      <img src="/showcase/material-maker-typed-material-workflow.webp" alt="在限定范围内检查并验证 Material Maker PTEX，再执行原生纹理导出" loading="lazy">
      <span><small>MATERIAL MAKER</small><strong>检查 PTEX 材质并导出纹理</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#krita-typed-paint-workflow">
      <img src="/showcase/krita-typed-paint-workflow.webp" alt="通过类型化文档与绘画图层工具制作 Krita 分层画布" loading="lazy">
      <span><small>KRITA</small><strong>创建可编辑的分层画布</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="/zh/showcase#gimp-typed-image-workflow">
      <img src="/showcase/gimp-typed-image-workflow.webp" alt="通过预定义的类型化接口编辑 GIMP 图像和图层，导出 XCF 与 PNG 并验证结果" loading="lazy">
      <span><small>GIMP</small><strong>编辑图层并验证导出结果</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#katana-typed-lookdev-workflow">
      <img src="/showcase/katana-typed-lookdev-workflow.webp" alt="通过类型化主线程操作创建并连接 Katana 节点图" loading="lazy">
      <span><small>KATANA</small><strong>搭建节点网络并保存工程</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#premiere-typed-edit-workflow">
      <img src="/showcase/premiere-typed-edit-workflow.webp" alt="通过类型化工具整理 Premiere Pro 媒体、序列、时间线和标记，并管理导出队列" loading="lazy">
      <span><small>PREMIERE PRO</small><strong>完成剪辑并加入导出队列</strong><em>→</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-ai-hunyuan3d">
      <img src="/showcase/hunyuan3d.webp" alt="从提示词生成 3D 灯笼资产" loading="lazy">
      <span><small>AI + 3D</small><strong>用文字描述生成 3D 资产</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-asset-geospatial">
      <img src="/showcase/geospatial-city.webp" alt="地理数据生成程序化城市" loading="lazy">
      <span><small>GEOSPATIAL</small><strong>根据地理数据生成城市</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture">
      <img src="/showcase/maya-architecture.jpg" alt="Maya 程序化住宅建筑变体" loading="lazy">
      <span><small>MAYA + BIFROST</small><strong>程序化建筑</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-narrow" href="https://github.com/dcc-mcp/dcc-asset-kenney">
      <img src="/showcase/kenney-assets.webp" alt="游戏资产发现、解包与关卡搭建" loading="lazy">
      <span><small>GAME ASSETS</small><strong>查找资产并搭建关卡</strong><em>↗</em></span>
    </a>
    <a class="showcase-card showcase-wide" href="/zh/showcase#zbrush-fantasy-dragon">
      <img src="/showcase/zbrush-fantasy-dragon.png" alt="Fantasy Dragon 在 ZBrush 中从 500 万面重拓扑为 11.5 万面 PolyFrame 网格" loading="lazy">
      <span><small>ZBRUSH → MAYA</small><strong>500 万面导入 → 11.5 万面布线</strong><em>→</em></span>
    </a>
  </div>
  <a class="showcase-more" href="/zh/showcase">查看全部案例与提示词 →</a>
</section>
