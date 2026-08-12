export type DccIntegration = {
  slug: string
  name: string
  repository: string
  dccType?: string
  summaryEn: string
  summaryZh: string
  tasksEn: [string, string, string]
  tasksZh: [string, string, string]
}

export const dccIntegrations: DccIntegration[] = [
  {
    slug: '3ds-max',
    name: '3ds Max',
    repository: 'dcc-mcp-3dsmax',
    dccType: '3dsmax',
    summaryEn: 'inspect scenes and automate modeling, materials, transforms, and render preparation',
    summaryZh: '检查场景，并自动化建模、材质、变换与渲染准备',
    tasksEn: ['inventory scene objects and modifiers', 'create and place editable geometry', 'verify materials, transforms, and render settings'],
    tasksZh: ['盘点场景对象与修改器', '创建并摆放可编辑几何体', '验证材质、变换与渲染设置'],
  },
  {
    slug: 'after-effects',
    name: 'After Effects',
    repository: 'dcc-mcp-aftereffects',
    dccType: 'aftereffects',
    summaryEn: 'inspect projects and automate compositions, layers, keyframes, effects, and previews',
    summaryZh: '检查项目，并自动化合成、图层、关键帧、特效与预览',
    tasksEn: ['inventory compositions and source footage', 'build a bounded motion-graphics treatment', 'validate frame range, missing media, and preview output'],
    tasksZh: ['盘点合成与源素材', '制作范围明确的动态图形效果', '验证帧范围、丢失媒体与预览输出'],
  },
  {
    slug: 'blender',
    name: 'Blender',
    repository: 'dcc-mcp-blender',
    dccType: 'blender',
    summaryEn: 'inspect live scenes and automate objects, modifiers, materials, animation, and rendering',
    summaryZh: '检查在线场景，并自动化对象、修改器、材质、动画与渲染',
    tasksEn: ['inspect collections, objects, and modifiers', 'create a nondestructive modeling change', 'validate object state and a preview render'],
    tasksZh: ['检查集合、对象与修改器', '完成一次非破坏性建模修改', '验证对象状态与预览渲染'],
  },
  {
    slug: 'cinema-4d',
    name: 'Cinema 4D',
    repository: 'dcc-mcp-cinema4d',
    dccType: 'c4d',
    summaryEn: 'inspect durable documents and automate typed primitives, transforms, interchange, and bounded renders',
    summaryZh: '检查持久化文档，并自动化类型化基础体、变换、格式交换与受控渲染',
    tasksEn: ['inspect documents, objects, materials, and runtime capabilities', 'create and transform allowlisted primitives in an atomic document update', 'validate the saved document, render, and supported interchange output'],
    tasksZh: ['检查文档、对象、材质与运行时能力', '通过原子文档更新创建并变换白名单基础体', '验证保存后的文档、渲染与受支持的交换格式输出'],
  },
  {
    slug: 'comfyui',
    name: 'ComfyUI',
    repository: 'dcc-mcp-comfyui',
    dccType: 'comfyui',
    summaryEn: 'validate API-format graphs against live node contracts, run bounded queue jobs, and retrieve artifacts',
    summaryZh: '依据实时节点契约验证 API 格式图，运行受控队列任务并取回产物',
    tasksEn: ['validate node classes, required inputs, and graph references', 'submit and wait for one bounded image workflow', 'query terminal status and retrieve a known output artifact'],
    tasksZh: ['验证节点类型、必需输入与图引用', '提交并等待一个范围明确的图像工作流', '查询终态并取回已知输出产物'],
  },
  {
    slug: 'cache-inspector',
    name: 'Cache Inspector',
    repository: 'dcc-mcp-cache-inspector',
    dccType: 'cache-inspector',
    summaryEn: 'inspect SideFX geo, bgeo, and bgeo.sc caches offline through bounded privacy-safe read-only projections',
    summaryZh: '离线检查 SideFX geo、bgeo 与 bgeo.sc 缓存，并返回有界、隐私安全的只读结构投影',
    tasksEn: ['detect cache format and decode within public size ceilings', 'inspect counts, primitive families, finite bounds, and attribute definitions', 'verify that raw geometry values and the free-form info block are absent'],
    tasksZh: ['识别缓存格式并在公共大小上限内解码', '检查数量、图元家族、有限边界与属性定义', '验证结果不包含原始几何值和自由格式 info 块'],
  },
  {
    slug: 'flow-production-tracking',
    name: 'Flow Production Tracking',
    repository: 'dcc-mcp-fpt',
    dccType: 'shotgrid',
    summaryEn: 'query production entities and safely update approved tasks, notes, versions, and status',
    summaryZh: '查询制片实体，并安全更新已获批准的任务、备注、版本与状态',
    tasksEn: ['find a project, shot, asset, or task', 'summarize linked notes and versions', 'preview and confirm any status-changing write'],
    tasksZh: ['查找项目、镜头、资产或任务', '汇总关联备注与版本', '预览并确认任何状态写入'],
  },
  {
    slug: 'freecad',
    name: 'FreeCAD',
    repository: 'dcc-mcp-freecad',
    dccType: 'freecad',
    summaryEn: 'inspect parametric CAD documents and automate primitives, booleans, topology validation, and mesh interchange',
    summaryZh: '检查参数化 CAD 文档，并自动化基础体、布尔运算、拓扑验证与网格交换',
    tasksEn: ['inspect document objects, shapes, bounds, and physical properties', 'build an editable solid from typed primitives and booleans', 'validate topology and export a verified OBJ or STL'],
    tasksZh: ['检查文档对象、形体、边界与物理属性', '通过类型化基础体与布尔运算构建可编辑实体', '验证拓扑并导出经核验的 OBJ 或 STL'],
  },
  {
    slug: 'gimp',
    name: 'GIMP',
    repository: 'dcc-mcp-gimp',
    dccType: 'gimp',
    summaryEn: 'inspect documents and automate layers, selections, masks, color work, and exports',
    summaryZh: '检查文档，并自动化图层、选区、蒙版、颜色处理与导出',
    tasksEn: ['inspect image dimensions and layer structure', 'apply a reversible retouching pass', 'export a copy without overwriting the source'],
    tasksZh: ['检查图像尺寸与图层结构', '完成一次可撤销修图', '导出副本且不覆盖源文件'],
  },
  {
    slug: 'godot',
    name: 'Godot',
    repository: 'dcc-mcp-godot',
    dccType: 'godot',
    summaryEn: 'inspect projects and automate scenes, nodes, resources, scripts, and playable validation',
    summaryZh: '检查项目，并自动化场景、节点、资源、脚本与可玩性验证',
    tasksEn: ['inventory scenes, nodes, and project settings', 'build one small playable interaction', 'run and verify the win or fail loop'],
    tasksZh: ['盘点场景、节点与项目设置', '构建一个小型可玩交互', '运行并验证胜负循环'],
  },
  {
    slug: 'houdini',
    name: 'Houdini',
    repository: 'dcc-mcp-houdini',
    dccType: 'houdini',
    summaryEn: 'inspect node networks and automate procedural geometry, simulations, caches, and renders',
    summaryZh: '检查节点网络，并自动化程序化几何、模拟、缓存与渲染',
    tasksEn: ['inspect the current node graph and parameters', 'build a minimal procedural or simulation setup', 'validate scale, cache state, and preview output'],
    tasksZh: ['检查当前节点图与参数', '构建最小程序化或模拟设置', '验证比例、缓存状态与预览输出'],
  },
  {
    slug: 'illustrator',
    name: 'Illustrator',
    repository: 'dcc-mcp-illustrator',
    dccType: 'illustrator',
    summaryEn: 'inspect vector documents and automate artboards, layers, paths, text, saves, and production exports',
    summaryZh: '检查矢量文档，并自动化画板、图层、路径、文本、保存与生产导出',
    tasksEn: ['inspect documents, artboards, layers, and page items', 'create or edit typed rectangles, paths, and text through the official DOM', 'validate document state, save an AI copy, and export SVG or PNG'],
    tasksZh: ['检查文档、画板、图层与页面对象', '通过官方 DOM 创建或编辑类型化矩形、路径与文本', '验证文档状态、保存 AI 副本并导出 SVG 或 PNG'],
  },
  {
    slug: 'katana',
    name: 'Katana',
    repository: 'dcc-mcp-katana',
    dccType: 'katana',
    summaryEn: 'inspect node graphs and automate look development, lighting, scene assembly, and render setup',
    summaryZh: '检查节点图，并自动化外观开发、灯光、场景装配与渲染设置',
    tasksEn: ['inspect the scene graph and active node graph', 'apply a bounded look-development change', 'validate assignments and a test render'],
    tasksZh: ['检查场景图与当前节点图', '完成一次范围明确的外观开发修改', '验证分配关系与测试渲染'],
  },
  {
    slug: 'krita',
    name: 'Krita',
    repository: 'dcc-mcp-krita',
    dccType: 'krita',
    summaryEn: 'inspect documents and automate layers, selections, painting operations, and exports',
    summaryZh: '检查文档，并自动化图层、选区、绘画操作与导出',
    tasksEn: ['inspect canvas and layer state', 'make a reversible paint or adjustment pass', 'verify color space and export a copy'],
    tasksZh: ['检查画布与图层状态', '完成一次可撤销绘画或调整', '验证色彩空间并导出副本'],
  },
  {
    slug: 'mari',
    name: 'Mari',
    repository: 'dcc-mcp-mari',
    dccType: 'mari',
    summaryEn: 'inspect projects and automate geometry, channels, node graphs, shaders, images, and texture exports',
    summaryZh: '检查项目，并自动化几何体、通道、节点图、着色器、图像与纹理导出',
    tasksEn: ['inspect the active project, geometry, channels, nodes, shaders, and images', 'make a bounded typed change to geometry, channels, or the node graph', 'validate export items and the resulting texture files'],
    tasksZh: ['检查当前项目、几何体、通道、节点、着色器与图像', '对几何体、通道或节点图完成一次范围明确的类型化修改', '验证导出项与生成的纹理文件'],
  },
  {
    slug: 'marmoset-toolbag',
    name: 'Marmoset Toolbag',
    repository: 'dcc-mcp-marmoset',
    dccType: 'marmoset',
    summaryEn: 'inspect scenes and automate PBR materials, lighting, baking, cameras, and presentation renders',
    summaryZh: '检查场景，并自动化 PBR 材质、灯光、烘焙、摄影机与展示渲染',
    tasksEn: ['inspect meshes, materials, and texture slots', 'build a controlled look-development pass', 'validate maps, lighting, and a turntable render'],
    tasksZh: ['检查网格、材质与贴图槽', '完成一次受控外观开发', '验证贴图、灯光与转台渲染'],
  },
  {
    slug: 'material-maker',
    name: 'Material Maker',
    repository: 'dcc-mcp-material-maker',
    dccType: 'material-maker',
    summaryEn: 'inspect and author procedural material graphs, parameters, and texture outputs',
    summaryZh: '检查并制作程序化材质图、参数与纹理输出',
    tasksEn: ['inspect graph nodes and exposed parameters', 'build one editable procedural material', 'verify seamless outputs and exported maps'],
    tasksZh: ['检查图节点与公开参数', '构建一个可编辑程序化材质', '验证无缝输出与导出贴图'],
  },
  {
    slug: 'maya',
    name: 'Maya',
    repository: 'dcc-mcp-maya',
    dccType: 'maya',
    summaryEn: 'inspect live scenes and automate modeling, rigging, materials, animation, and rendering',
    summaryZh: '检查在线场景，并自动化建模、绑定、材质、动画与渲染',
    tasksEn: ['inspect DAG nodes and scene state', 'create or edit geometry without replacing existing work', 'validate names, transforms, relationships, and output'],
    tasksZh: ['检查 DAG 节点与场景状态', '在不替换现有内容的前提下创建或编辑几何体', '验证名称、变换、关系与输出'],
  },
  {
    slug: 'motionbuilder',
    name: 'MotionBuilder',
    repository: 'dcc-mcp-mobu',
    dccType: 'mobu',
    summaryEn: 'inspect scenes and automate characters, takes, animation data, and motion-editing workflows',
    summaryZh: '检查场景，并自动化角色、Take、动画数据与动作编辑流程',
    tasksEn: ['inspect characters, takes, and active animation', 'apply a bounded motion-editing change', 'validate timing, character mapping, and saved output'],
    tasksZh: ['检查角色、Take 与当前动画', '完成一次范围明确的动作编辑', '验证时序、角色映射与保存结果'],
  },
  {
    slug: 'nuke',
    name: 'Nuke',
    repository: 'dcc-mcp-nuke',
    dccType: 'nuke',
    summaryEn: 'inspect scripts and automate node-based compositing, color, channels, and renders',
    summaryZh: '检查脚本，并自动化节点式合成、色彩、通道与渲染',
    tasksEn: ['inspect the node graph and source metadata', 'build one reversible compositing branch', 'validate frame range, channels, color space, and preview'],
    tasksZh: ['检查节点图与源素材元数据', '构建一个可撤销合成分支', '验证帧范围、通道、色彩空间与预览'],
  },
  {
    slug: 'openusd',
    name: 'OpenUSD',
    repository: 'dcc-mcp-openusd',
    dccType: 'openusd',
    summaryEn: 'inspect stages and automate layers, prims, composition arcs, metadata, and validation',
    summaryZh: '检查 Stage，并自动化 Layer、Prim、组合弧、元数据与验证',
    tasksEn: ['inspect stage layers and prim hierarchy', 'author a bounded non-destructive layer change', 'validate composition, references, and schema state'],
    tasksZh: ['检查 Stage Layer 与 Prim 层级', '在独立 Layer 中完成范围明确的修改', '验证组合、引用与 Schema 状态'],
  },
  {
    slug: 'openscad',
    name: 'OpenSCAD',
    repository: 'dcc-mcp-openscad',
    dccType: 'openscad',
    summaryEn: 'inspect declarative CAD source and automate bounded validation, preview rendering, and mesh export',
    summaryZh: '检查声明式 CAD 源码，并自动化受控验证、预览渲染与网格导出',
    tasksEn: ['inspect source dependencies and runtime capabilities', 'validate one bounded parametric model without arbitrary code execution', 'render a preview and export a verified STL or mesh result'],
    tasksZh: ['检查源码依赖与运行时能力', '在禁止任意代码执行的边界内验证参数化模型', '渲染预览并导出经核验的 STL 或网格结果'],
  },
  {
    slug: 'photoshop',
    name: 'Photoshop',
    repository: 'dcc-mcp-photoshop',
    dccType: 'photoshop',
    summaryEn: 'inspect documents and automate layers, masks, adjustments, retouching, and exports',
    summaryZh: '检查文档，并自动化图层、蒙版、调整、修图与导出',
    tasksEn: ['inspect dimensions, color mode, and layers', 'make a reversible edit with layers or masks', 'export a new file without flattening the source'],
    tasksZh: ['检查尺寸、颜色模式与图层', '使用图层或蒙版完成可撤销编辑', '在不合并源文件的情况下导出新文件'],
  },
  {
    slug: 'premiere-pro',
    name: 'Premiere Pro',
    repository: 'dcc-mcp-premiere',
    dccType: 'premiere',
    summaryEn: 'inspect projects and automate media, sequences, timeline edits, audio, and exports',
    summaryZh: '检查项目，并自动化媒体、Sequence、时间线剪辑、音频与导出',
    tasksEn: ['inventory media and sequence settings', 'assemble one bounded edit without changing source files', 'validate missing media, timing, audio, and preview export'],
    tasksZh: ['盘点媒体与 Sequence 设置', '在不修改源文件的情况下完成一个剪辑段落', '验证丢失媒体、时序、音频与预览导出'],
  },
  {
    slug: 'renderdoc',
    name: 'RenderDoc',
    repository: 'dcc-mcp-renderdoc',
    dccType: 'renderdoc',
    summaryEn: 'inspect graphics captures and automate replay, event, resource, and draw-call analysis',
    summaryZh: '检查图形捕获，并自动化回放、事件、资源与 Draw Call 分析',
    tasksEn: ['open a capture and identify the target frame', 'inspect events, resources, and pipeline state', 'report reproducible evidence without changing the source build'],
    tasksZh: ['打开捕获并定位目标帧', '检查事件、资源与管线状态', '在不修改源构建的情况下报告可复现证据'],
  },
  {
    slug: 'sketchup',
    name: 'SketchUp',
    repository: 'dcc-mcp-sketchup',
    dccType: 'sketchup',
    summaryEn: 'inspect live models and automate typed geometry, materials, Tags, scenes, validation, saves, and interchange',
    summaryZh: '检查在线模型，并自动化类型化几何体、材质、标签、场景、验证、保存与格式交换',
    tasksEn: ['inspect model entities, bounds, materials, Tags, and scenes', 'create grouped boxes or cylinders and assign typed material and organization metadata', 'validate persistent entities, save the SKP model, and export supported interchange'],
    tasksZh: ['检查模型实体、边界、材质、标签与场景', '创建成组的盒体或圆柱体，并分配类型化材质与组织元数据', '验证持久化实体、保存 SKP 模型并导出受支持的交换格式'],
  },
  {
    slug: 'touchdesigner',
    name: 'TouchDesigner',
    repository: 'dcc-mcp-touchdesigner',
    dccType: 'touchdesigner',
    summaryEn: 'inspect and automate operator networks, parameters, TOP capture, and project saves on the host main thread',
    summaryZh: '在宿主主线程中检查并自动化算子网络、参数、TOP 捕获与工程保存',
    tasksEn: ['inspect project state, operator paths, families, and parameters', 'create and connect typed operators, then set and read back bounded parameters', 'capture a TOP to PNG, save a TOE project, and verify returned size and hash metadata'],
    tasksZh: ['检查工程状态、算子路径、家族与参数', '创建并连接类型化算子，再设置并回读范围明确的参数', '将 TOP 捕获为 PNG、保存 TOE 工程并验证返回的大小与哈希元数据'],
  },
  {
    slug: 'substance-3d-designer',
    name: 'Substance 3D Designer',
    repository: 'dcc-mcp-substance3d-designer',
    dccType: 'substance3d_designer',
    summaryEn: 'inspect and automate procedural material graphs, parameters, dependencies, and outputs',
    summaryZh: '检查并自动化程序化材质图、参数、依赖与输出',
    tasksEn: ['inspect graph nodes, packages, and dependencies', 'build one editable material variation', 'validate exposed parameters and rendered outputs'],
    tasksZh: ['检查图节点、Package 与依赖', '构建一个可编辑材质变体', '验证公开参数与渲染输出'],
  },
  {
    slug: 'substance-3d-painter',
    name: 'Substance 3D Painter',
    repository: 'dcc-mcp-substance3d-painter',
    dccType: 'substance3d_painter',
    summaryEn: 'inspect projects and automate texture sets, layers, masks, materials, baking, and export',
    summaryZh: '检查项目，并自动化纹理集、图层、蒙版、材质、烘焙与导出',
    tasksEn: ['inspect texture sets and layer stacks', 'apply a reversible material or mask change', 'validate mesh maps and exported texture channels'],
    tasksZh: ['检查纹理集与图层栈', '完成一次可撤销材质或蒙版修改', '验证 Mesh Map 与导出纹理通道'],
  },
  {
    slug: 'tiled',
    name: 'Tiled',
    repository: 'dcc-mcp-tiled',
    dccType: 'tiled',
    summaryEn: 'inspect and automate tile maps, layers, tilesets, objects, properties, and exports',
    summaryZh: '检查并自动化瓦片地图、图层、Tileset、对象、属性与导出',
    tasksEn: ['inspect map size, layers, and tilesets', 'author one bounded map or object-layer change', 'validate references, properties, and exported data'],
    tasksZh: ['检查地图尺寸、图层与 Tileset', '完成一次范围明确的地图或对象层修改', '验证引用、属性与导出数据'],
  },
  {
    slug: 'unity',
    name: 'Unity',
    repository: 'dcc-mcp-unity',
    dccType: 'unity',
    summaryEn: 'inspect projects and automate scenes, GameObjects, components, assets, tests, and builds',
    summaryZh: '检查项目，并自动化场景、GameObject、组件、资产、测试与构建',
    tasksEn: ['inventory scenes, assets, and project settings', 'build one small playable interaction', 'enter Play Mode and verify behavior before a build'],
    tasksZh: ['盘点场景、资产与项目设置', '构建一个小型可玩交互', '进入 Play Mode 并在构建前验证行为'],
  },
  {
    slug: 'unreal-engine',
    name: 'Unreal Engine',
    repository: 'dcc-mcp-unreal',
    dccType: 'unreal',
    summaryEn: 'inspect projects and automate levels, actors, assets, Blueprints, tests, and packaged builds',
    summaryZh: '检查项目，并自动化关卡、Actor、资产、Blueprint、测试与打包构建',
    tasksEn: ['inventory maps, actors, assets, and project settings', 'build one bounded gameplay or editor workflow', 'run and verify the result before packaging'],
    tasksZh: ['盘点地图、Actor、资产与项目设置', '构建一个范围明确的玩法或编辑器流程', '在打包前运行并验证结果'],
  },
  {
    slug: 'wwise',
    name: 'Wwise',
    repository: 'dcc-mcp-wwise',
    dccType: 'wwise',
    summaryEn: 'inspect Wwise projects and automate audio objects, Events, routing, SoundBanks, and audition',
    summaryZh: '检查 Wwise 项目，并自动化音频对象、Event、路由、SoundBank 与试听',
    tasksEn: ['inspect project hierarchy and audio objects', 'import and organize a bounded set of sounds', 'create Events and verify them through audition'],
    tasksZh: ['检查项目层级与音频对象', '导入并整理范围明确的一组音频', '创建 Event 并通过试听验证'],
  },
  {
    slug: 'zbrush',
    name: 'ZBrush',
    repository: 'dcc-mcp-zbrush',
    dccType: 'zbrush',
    summaryEn: 'inspect documents and automate tools, subtools, sculpting operations, remeshing, and export',
    summaryZh: '检查文档，并自动化 Tool、SubTool、雕刻操作、重拓扑与导出',
    tasksEn: ['inspect active tools, subtools, and mesh state', 'perform one bounded sculpting or remesh operation', 'validate topology, subdivision state, and exported geometry'],
    tasksZh: ['检查当前 Tool、SubTool 与网格状态', '完成一次范围明确的雕刻或重拓扑操作', '验证拓扑、细分状态与导出几何体'],
  },
]

export const releasedIntegrations = dccIntegrations.filter(({ dccType }) => dccType)

const repositoryUrl = (integration: DccIntegration) =>
  `https://github.com/dcc-mcp/${integration.repository}`

export function renderControlGuide(integration: DccIntegration, language: 'en' | 'zh') {
  const released = Boolean(integration.dccType)
  if (language === 'zh') {
    const availability = released
      ? `当前发布目录使用 \`${integration.dccType}\` 作为 Host 标识；实际操作前仍应运行 \`dcc-mcp-cli dcc-types\` 核对本机版本。`
      : '这是公开适配器仓库，但它可能尚未进入当前 CLI 发布目录。先检查适配器 README 与 `dcc-mcp-cli dcc-types`，不要猜测 Host 标识。'
    return `# AI 怎么控制 ${integration.name}？

如果你指的是让兼容 MCP 的 AI Agent 操作正在运行的 ${integration.name}，而不是只让 AI 讲教程或生成一段临时脚本，可以通过 DCC-MCP ${integration.summaryZh}。DCC-MCP 使用可发现的类型化工具、实例路由和结果验证来执行操作。

## AI 可以在 ${integration.name} 中做什么？

- ${integration.tasksZh[0]}。
- ${integration.tasksZh[1]}。
- ${integration.tasksZh[2]}。

能力会随适配器版本与已加载 Skill 改变。先搜索和描述工具，不要根据网页内容猜测当前工具名称。

## 安全操作流程

1. 安装并遵循公开的 [\`dcc-mcp\` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp)。
2. 检查现有 CLI、适配器与在线 Host；安装软件或改变系统状态前先征得同意。
3. 使用 \`health\`、\`dcc-types\` 与 \`list\` 验证 Gateway 和目标实例。
4. 针对 ${integration.name} 的实际任务执行 search 与 describe，并遵循返回的 \`next_step\`。
5. 只执行范围明确的操作，再通过宿主状态、文件、预览、日志或渲染结果验证。

\`\`\`bash
dcc-mcp-cli health
dcc-mcp-cli dcc-types
dcc-mcp-cli list
\`\`\`

## 可复制提示词

\`\`\`text
使用 dcc-mcp Skill 连接我的 ${integration.name}。先检查现有 CLI、适配器和在线实例；安装软件或改变系统状态前必须征得我的同意。搜索并描述与“${integration.tasksZh[1]}”相关的类型化工具，严格遵循返回的 next_step。不得删除、覆盖或发布现有工作。先完成最小可验证修改，再验证 ${integration.tasksZh[2]}，并报告实例、工具、结果与证据路径。
\`\`\`

## 当前可用性与官方来源

${availability}

- [${integration.name} 适配器仓库](${repositoryUrl(integration)})：安装、兼容性、专属能力与排错的事实来源。
- [全部 AI + DCC 控制指南](/zh/use-cases)：返回所有公开应用与流水线集成。
- [Agent 工作流](/zh/agents)：了解通用发现、调用、验证与诊断流程。

本页只维护共享 Agent 工作流和 GEO 入口；Host 专属安装、API 与兼容性细节由适配器仓库维护。
`
  }

  const availability = released
    ? `The current release catalog uses \`${integration.dccType}\` as the host identifier. Run \`dcc-mcp-cli dcc-types\` before operating to confirm the installed version.`
    : 'This is a public adapter repository, but it may not yet be present in the current CLI release catalog. Check its README and `dcc-mcp-cli dcc-types`; do not guess a host identifier.'
  return `# How can an AI agent control ${integration.name}?

If you mean an MCP-compatible AI agent operating a live ${integration.name} session—not merely explaining a tutorial or generating a one-off script—DCC-MCP can ${integration.summaryEn}. DCC-MCP performs work through discoverable typed tools, instance routing, and result validation.

## What can an AI agent do in ${integration.name}?

- ${integration.tasksEn[0]}.
- ${integration.tasksEn[1]}.
- ${integration.tasksEn[2]}.

Capabilities change with the adapter version and loaded Skills. Search and describe tools first instead of guessing current tool names from this page.

## Safe operating flow

1. Install and follow the public [\`dcc-mcp\` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp).
2. Inspect the existing CLI, adapter, and live hosts; obtain consent before installing software or changing system state.
3. Use \`health\`, \`dcc-types\`, and \`list\` to verify the Gateway and target instance.
4. Search and describe tools for the actual ${integration.name} task, then follow every returned \`next_step\`.
5. Make one bounded change and verify it through host state, files, previews, logs, or rendered output.

\`\`\`bash
dcc-mcp-cli health
dcc-mcp-cli dcc-types
dcc-mcp-cli list
\`\`\`

## Copyable prompt

\`\`\`text
Use the dcc-mcp Skill to connect to my ${integration.name} session. Inspect the existing CLI, adapter, and live instance first; ask before installing software or changing system state. Search for and describe typed tools related to "${integration.tasksEn[1]}", then follow every returned next_step. Do not delete, overwrite, or publish existing work. Make the smallest verifiable change, validate ${integration.tasksEn[2]}, and report the instance, tool, result, and evidence path.
\`\`\`

## Current availability and official source

${availability}

- [${integration.name} adapter repository](${repositoryUrl(integration)}): source of truth for installation, compatibility, host-specific capabilities, and troubleshooting.
- [All AI + DCC control guides](/use-cases): return to every public application and pipeline integration.
- [Agent workflow](/agents): shared discovery, call, validation, and diagnostic steps.

This page owns the shared Agent workflow and GEO entry point. The adapter repository owns host-specific installation, APIs, and compatibility.
`
}
