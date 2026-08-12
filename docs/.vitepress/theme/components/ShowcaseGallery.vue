<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

type Copy = { label: string; title: string; prompt: string }
type Showcase = {
  id: string
  image: string
  source: string
  en: Copy
  zh: Copy
}

const { lang } = useData()
const copied = ref('')
const isZh = computed(() => lang.value.startsWith('zh'))

const showcases: Showcase[] = [
  {
    id: 'blender-lookdev',
    image: '/showcase/blender-lookdev.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-blender',
    en: {
      label: 'BLENDER · PROCEDURAL LOOKDEV',
      title: 'Spiral galaxy scene in Blender',
      prompt: 'Use the dcc-mcp Skill to connect to Blender. Discover the typed procedural modeling, material, lighting, and render tools needed to create a spiral galaxy in a new collection. Work non-destructively, render a preview, validate the scene, and report the tool calls and output path. Ask before installing anything.',
    },
    zh: {
      label: 'BLENDER · 程序化视觉开发',
      title: 'Blender 螺旋星系场景',
      prompt: '使用 dcc-mcp Skill 连接 Blender。搜索创建螺旋星系所需的类型化程序化建模、材质、灯光和渲染工具，在新 Collection 中非破坏性构建，渲染预览并验证场景，最后报告工具调用与输出路径。安装任何内容前先征得我的同意。',
    },
  },
  {
    id: 'marmoset-lookdev',
    image: '/showcase/marmoset-pbr-lookdev.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-marmoset',
    en: {
      label: 'MARMOSET · PBR LOOKDEV',
      title: 'CC0 PBR material in Toolbag',
      prompt: 'Use the dcc-mcp Skill to connect to Marmoset Toolbag. Inspect the runtime and discover the typed marmoset-scene, marmoset-lookdev, and marmoset-diagnostics tools. Ask before downloading an asset; use an explicit CC0 source and preserve provenance. Import the model, assign Albedo, Normal, Roughness, Metalness, and Occlusion maps, frame the exact object, validate that no texture references are missing, save the .tbscene, render a 16:9 image, and report the scene, render, and source paths.',
    },
    zh: {
      label: 'MARMOSET · PBR 材质',
      title: 'Toolbag 中的 CC0 PBR 材质',
      prompt: '使用 dcc-mcp Skill 连接 Marmoset Toolbag。先检查运行时，再搜索类型化的 marmoset-scene、marmoset-lookdev 和 marmoset-diagnostics 工具。下载资产前先征得我的同意；使用许可证明确的 CC0 来源并保留溯源信息。导入模型，绑定 Albedo、Normal、Roughness、Metalness 和 Occlusion 贴图，精确框选目标对象，验证没有丢失贴图引用，保存 .tbscene，渲染 16:9 图片，并报告场景、渲染与来源路径。',
    },
  },
  {
    id: 'wwise-audio',
    image: '/brand/dcc-mcp-wwise-dark.svg',
    source: 'https://github.com/dcc-mcp/dcc-mcp-wwise',
    en: {
      label: 'WWISE · INTERACTIVE AUDIO',
      title: 'Wwise sound effects and loop',
      prompt: 'Use the dcc-mcp Skill to connect to Wwise. Work in a local scratch project, discover the typed Wwise project and audio tools, create one UI sound, one impact sound, and a short looping background track, import and organize them, create play Events, preview every result, and report validation evidence. Do not publish the scratch Wwise project.',
    },
    zh: {
      label: 'WWISE · 交互音频',
      title: 'Wwise 音效与循环音乐',
      prompt: '使用 dcc-mcp Skill 连接 Wwise。在本地临时工程中搜索并使用类型化的 Wwise 项目与音频工具，制作一个 UI 音效、一个冲击音效和一段可循环背景音乐，完成导入、整理、Play Event 创建与逐项试听，并报告验证证据。不要发布临时 Wwise 工程。',
    },
  },
  {
    id: 'houdini-portal',
    image: '/showcase/houdini-portal.png',
    source: 'https://github.com/dcc-mcp/dcc-mcp-houdini',
    en: {
      label: 'HOUDINI · FX',
      title: 'Houdini procedural portal',
      prompt: 'Use the dcc-mcp Skill to connect to Houdini. Discover the typed SOP, POP, material, and preview tools for a procedural energy portal. Build it in a new isolated network, keep parameters editable, cache only when needed, render a preview, and report validation evidence.',
    },
    zh: {
      label: 'HOUDINI · 特效',
      title: 'Houdini 程序化能量门',
      prompt: '使用 dcc-mcp Skill 连接 Houdini。搜索程序化能量门所需的类型化 SOP、POP、材质和预览工具，在新的独立网络中构建并保持参数可编辑，仅在需要时缓存，渲染预览并报告验证证据。',
    },
  },
  {
    id: 'openscad-parametric-pipeline',
    image: '/showcase/openscad-parametric-pipeline.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-openscad',
    en: {
      label: 'OPENSCAD → FREECAD → BLENDER / GODOT',
      title: 'Parametric bracket to verified game asset',
      prompt: 'Use the dcc-mcp Skill to validate a parametric bracket through OpenSCAD, FreeCAD, Blender, and Godot. Work only in a new bounded scratch root. In OpenSCAD, inspect the source, validate the model, render a preview, and export STL while recording dimensions, topology metrics, and hashes. Import the STL into FreeCAD, verify points, facets, volume, and exact bounds, then export OBJ. Import the OBJ into Blender, verify mesh counts, export GLB, and load it into Godot. Run the Godot scene and prove that a visible MeshInstance3D is present. Report every durable file and validation result.',
    },
    zh: {
      label: 'OPENSCAD → FREECAD → BLENDER / GODOT',
      title: '参数化支架到经验证的游戏资产',
      prompt: '使用 dcc-mcp Skill，通过 OpenSCAD、FreeCAD、Blender 与 Godot 验证一个参数化支架。所有文件只能写入新的受控临时根目录。先在 OpenSCAD 中检查源码、验证模型、渲染预览并导出 STL，同时记录尺寸、拓扑指标与哈希；再把 STL 导入 FreeCAD，核对点数、面数、体积和精确边界后导出 OBJ；将 OBJ 导入 Blender，核对网格数量并导出 GLB；最后在 Godot 中载入并运行场景，证明存在可见的 MeshInstance3D。报告所有持久化文件和验证结果。',
    },
  },
  {
    id: 'freecad-game-ready-pipeline',
    image: '/showcase/freecad-game-ready-pipeline.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-freecad',
    en: {
      label: 'FREECAD · CAD INTERCHANGE',
      title: 'Editable CAD to validated realtime mesh',
      prompt: 'Use the dcc-mcp Skill to connect to FreeCAD. Create a new durable FCStd document in an approved output root, build an editable solid from typed primitives and booleans, and preserve the parametric source. Inspect the resulting objects and validate shape validity, topology counts, volume, and bounds. Export an OBJ or STL, import it into Blender, verify the mesh, export GLB, and load the GLB into Godot for a visible runtime check. Report the document, interchange files, object metrics, and hashes.',
    },
    zh: {
      label: 'FREECAD · CAD 格式交换',
      title: '可编辑 CAD 到经验证的实时网格',
      prompt: '使用 dcc-mcp Skill 连接 FreeCAD。在获准的输出根目录中创建新的持久化 FCStd 文档，通过类型化基础体与布尔运算构建可编辑实体，并保留参数化源文件。检查生成的对象，验证形体有效性、拓扑数量、体积与边界；导出 OBJ 或 STL，导入 Blender 核对网格后再导出 GLB，并在 Godot 中完成可见性运行验证。报告文档、交换文件、对象指标与哈希。',
    },
  },
  {
    id: 'cinema4d-typed-scene',
    image: '/showcase/cinema4d-typed-scene.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-cinema4d',
    en: {
      label: 'CINEMA 4D · TYPED AUTOMATION',
      title: 'Typed primitives to validated render',
      prompt: 'Use the dcc-mcp Skill with the locally licensed Cinema 4D runtime. Start with get_status and get_capabilities, then create a durable C4D document in an allowed output root. Add only supported typed primitives, give every object a unique name, apply bounded transforms, inspect the saved document, and validate it. Render a 16:9 PNG and export OBJ or another interchange format only when the runtime reports support. Report object counts, output sizes, hashes, and any format-specific limitation. Do not execute arbitrary Python or publish local installation details.',
    },
    zh: {
      label: 'CINEMA 4D · 类型化自动化',
      title: '类型化基础体到经验证的渲染',
      prompt: '使用 dcc-mcp Skill 连接本机已授权的 Cinema 4D 运行时。先调用 get_status 与 get_capabilities，再在允许的输出根目录中创建持久化 C4D 文档。只添加运行时支持的类型化基础体，为每个对象使用唯一名称，执行范围明确的变换，检查并验证保存后的文档；渲染一张 16:9 PNG，并且仅在运行时明确支持时导出 OBJ 或其他交换格式。报告对象数量、输出大小、哈希与格式限制。不得执行任意 Python，也不要发布本地安装细节。',
    },
  },
  {
    id: 'comfyui-typed-workflow',
    image: '/showcase/comfyui-typed-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-comfyui',
    en: {
      label: 'COMFYUI · TYPED WORKFLOW EXECUTION',
      title: 'Live graph contract to delivered artifact',
      prompt: 'Use the dcc-mcp Skill to connect to the local ComfyUI adapter. Discover the four typed comfyui-workflow tools, then validate a small API-format graph against the running node registry before submitting it. Execute one bounded EmptyImage to ImageInvert to SaveImage workflow, wait for terminal status, query normalized outputs, and retrieve the known artifact URL. Report the prompt ID, node count, status, artifact metadata, file size, and hash without exposing local filesystem paths.',
    },
    zh: {
      label: 'COMFYUI · 类型化工作流执行',
      title: '实时图契约到可交付产物',
      prompt: '使用 dcc-mcp Skill 连接本机 ComfyUI 适配器。先发现 comfyui-workflow 的 4 个类型化工具，再依据运行中的节点注册表验证一个小型 API 格式图后提交。执行一个范围明确的 EmptyImage → ImageInvert → SaveImage 工作流，等待终态，查询规范化输出并取得已知产物 URL。报告 prompt ID、节点数、状态、产物元数据、文件大小与哈希，不得暴露本地文件系统路径。',
    },
  },
  {
    id: 'illustrator-typed-vector-workflow',
    image: '/showcase/illustrator-typed-vector-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-illustrator',
    en: {
      label: 'ILLUSTRATOR · TYPED VECTOR AUTOMATION',
      title: 'Structured document to verified production export',
      prompt: 'Use the dcc-mcp Skill to connect to Illustrator. Start with status and document inspection, then create a new bounded RGB document. Build a small composition with only typed rectangle, path, and text tools through the official DOM; use clear object names and preserve editability. Inspect artboards, layers, and page-item counts, save an AI copy in an approved output root, and export SVG or PNG. Report document metrics, durable paths, sizes, and hashes. Do not execute arbitrary ExtendScript.',
    },
    zh: {
      label: 'ILLUSTRATOR · 类型化矢量自动化',
      title: '结构化文档到经验证的生产导出',
      prompt: '使用 dcc-mcp Skill 连接 Illustrator。先检查运行状态与当前文档，再创建新的受控 RGB 文档；仅通过官方 DOM 的类型化矩形、路径与文本工具构建一个小型构图，使用清晰的对象名称并保持可编辑性。检查画板、图层与页面对象数量，在获准的输出根目录中保存 AI 副本并导出 SVG 或 PNG。报告文档指标、持久化路径、文件大小与哈希。不得执行任意 ExtendScript。',
    },
  },
  {
    id: 'sketchup-typed-modeling',
    image: '/showcase/sketchup-typed-modeling.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-sketchup',
    en: {
      label: 'SKETCHUP · TYPED MODELING',
      title: 'Live model to validated interchange',
      prompt: 'Use the dcc-mcp Skill to connect to a live SketchUp model. Start with status, model inspection, and entity listing. Create one grouped box and one grouped cylinder with typed dimensions, assign a named material and Tag, and save a camera scene. Validate persistent entity state and model integrity, save an SKP copy in an approved output root, and export one runtime-supported interchange format such as DAE. Report entity counts, bounds, output paths, sizes, and hashes. Do not execute arbitrary Ruby.',
    },
    zh: {
      label: 'SKETCHUP · 类型化建模',
      title: '在线模型到经验证的格式交换',
      prompt: '使用 dcc-mcp Skill 连接在线 SketchUp 模型。先检查运行状态、模型和实体列表；按类型化尺寸创建一个成组盒体与一个成组圆柱体，分配具名材质与标签，并保存一个相机场景。验证持久化实体状态和模型完整性，在获准的输出根目录中保存 SKP 副本，并导出一种运行时支持的交换格式，例如 DAE。报告实体数量、边界、输出路径、文件大小与哈希。不得执行任意 Ruby。',
    },
  },
  {
    id: 'touchdesigner-typed-operator-workflow',
    image: '/showcase/touchdesigner-typed-operator-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-touchdesigner',
    en: {
      label: 'TOUCHDESIGNER · TYPED OPERATOR WORKFLOW',
      title: 'Typed graph to verified project and image artifacts',
      prompt: 'Use the dcc-mcp Skill to connect to one live TouchDesigner instance. Start with project inspection and a bounded operator listing. Create two supported typed operators under an explicit COMP, connect their exact connectors, set one allowlisted parameter, and read it back. Capture the resulting TOP to a PNG path in an approved output root and save a TOE copy with overwrite protection. Report operator paths, parameter values, image dimensions, file sizes, and SHA-256 hashes. Delete only the temporary operator you created, and do not execute arbitrary Python.',
    },
    zh: {
      label: 'TOUCHDESIGNER · 类型化算子工作流',
      title: '类型化节点图到经验证的工程与图像产物',
      prompt: '使用 dcc-mcp Skill 连接一个在线 TouchDesigner 实例。先检查工程信息并执行范围明确的算子列表查询；在显式 COMP 下创建两个受支持的类型化算子，连接它们的精确端口，设置一个白名单参数并回读。将结果 TOP 捕获到获准输出根目录中的 PNG，并使用覆盖保护保存 TOE 副本。报告算子路径、参数值、图像尺寸、文件大小与 SHA-256 哈希；只删除本次创建的临时算子，不得执行任意 Python。',
    },
  },
  {
    id: 'cache-inspection-workflow',
    image: '/showcase/cache-inspection-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-cache-inspector',
    en: {
      label: 'CACHE INSPECTOR · BOUNDED READ-ONLY ANALYSIS',
      title: 'Compressed geometry cache to privacy-safe structure',
      prompt: 'Use the dcc-mcp Skill to install the host-neutral dcc-mcp-cache-inspector Marketplace Skill into the concrete adapter that owns this workflow, then discover and load cache-inspection. Inspect one caller-approved .bgeo or .bgeo.sc file with the default 512 MiB input and decoded-data ceilings. Report recognized format and version, point, vertex, and primitive counts, primitive families, finite bounds when supported, and attribute owner, name, storage, tuple size, and element count. Call list_attributes for the schema-only projection. Confirm that the free-form info block and raw geometry values are absent. Do not launch Houdini, evaluate code, mutate the cache, or raise the public limits.',
    },
    zh: {
      label: 'CACHE INSPECTOR · 有界只读分析',
      title: '压缩几何缓存到隐私安全的结构摘要',
      prompt: '使用 dcc-mcp Skill 将 Host-neutral 的 dcc-mcp-cache-inspector Marketplace Skill 安装到当前工作流所属的具体适配器，再发现并加载 cache-inspection。在默认 512 MiB 输入与解码上限内检查一个调用方批准的 .bgeo 或 .bgeo.sc 文件。报告识别出的格式与版本、点/顶点/图元数量、图元家族、支持编码下的有限边界，以及属性的 owner、名称、存储类型、元组大小与元素数量；再调用 list_attributes 获取仅含结构的投影。确认结果不包含自由格式 info 块和原始几何值。不得启动 Houdini、执行代码、修改缓存或提高公共上限。',
    },
  },
  {
    id: 'shogun-typed-mocap-workflow',
    image: '/showcase/shogun-typed-mocap-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-shogun',
    en: {
      label: 'SHŌGUN · TYPED MOTION CAPTURE',
      title: '36 official-SDK tools for capability-verified mocap work',
      prompt: 'Use the dcc-mcp Skill to connect to one explicit Vicon Shōgun Post instance and load the 36 typed tools. Start with scene, object, selection, and timeline inspection; report subjects, markers, skeletons, trajectories, object hierarchy and transforms, frame rate, current frame, play and animation ranges, and selected time ranges. Before any mutation, probe the exact Scene, Timeline, or Offline SDK command and treat a bounded ControlError as an unsupported host capability. If supported, make only one explicit selection/display, current-frame/selected-range processing, ROM-label, calibration, or QuickPost operation, validate the resulting state, and save to a new approved path. Do not run arbitrary HSL or Python, expose raw channel writes, or overwrite the source scene.',
    },
    zh: {
      label: 'SHŌGUN · 类型化动作捕捉',
      title: '36 个官方 SDK 工具完成经能力验证的动捕工作',
      prompt: '使用 dcc-mcp Skill 连接一个明确指定的 Vicon Shōgun Post 实例，并加载 36 个类型化工具。先检查场景、对象、选择集与时间线，再报告角色、Marker、骨架、轨迹、对象层级与变换、帧率、当前帧、播放/动画范围和所选时间范围。任何修改前都要探测准确的 Scene、Timeline 或 Offline SDK 命令，并将有界 ControlError 视为宿主不支持该能力。若宿主支持，只执行一个明确的选择/显示、当前帧/所选范围处理、ROM 标记、校准或 QuickPost 操作，验证结果状态，并保存到新的获准路径。不得执行任意 HSL 或 Python、开放原始 Channel 写入或覆盖源场景。',
    },
  },
  {
    id: 'tiled-typed-map-workflow',
    image: '/showcase/tiled-typed-map-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-tiled',
    en: {
      label: 'TILED · TYPED MAP AUTHORING',
      title: 'Bounded map data to validated TMJ artifact',
      prompt: 'Use the dcc-mcp Skill to connect to the Tiled adapter and work only inside a new approved workspace root. Check the detected Tiled runtime, create a small orthogonal map with explicit tile size and dimensions, create or attach one tileset, paint a bounded rectangle of tile GIDs, add an object layer with a named spawn point, and save the TMJ. Inspect and validate the final map, then report layer, tileset, object, and non-empty tile counts plus the durable output path and hash. Use only the fixed typed driver; do not evaluate caller-provided JavaScript.',
    },
    zh: {
      label: 'TILED · 类型化地图制作',
      title: '受控地图数据到经验证的 TMJ 产物',
      prompt: '使用 dcc-mcp Skill 连接 Tiled 适配器，并且只在新的获准工作区根目录中操作。检查检测到的 Tiled 运行时，创建一个明确指定瓦片尺寸与地图尺寸的小型正交地图，创建或绑定一个 Tileset，在有限矩形中绘制 tile GID，添加带具名出生点的对象层并保存 TMJ。检查并验证最终地图，报告图层、Tileset、对象与非空瓦片数量，以及持久化输出路径和哈希。只使用固定类型化驱动，不得执行调用方提供的 JavaScript。',
    },
  },
  {
    id: 'material-maker-typed-material-workflow',
    image: '/showcase/material-maker-typed-material-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-material-maker',
    en: {
      label: 'MATERIAL MAKER · BOUNDED PTEX PIPELINE',
      title: 'Native material source to validated texture export',
      prompt: 'Use the dcc-mcp Skill with the standalone Material Maker adapter. Inspect one caller-approved .ptex project inside an approved workspace root, report its format version, graph resource path, parameter schema, and declared output definitions, and validate references and supported property types. If the official Material Maker CLI is available, export the project to a new output directory without overwriting existing files and report the exact produced files, sizes, and hashes. Interactive graph authoring is outside this adapter, so do not claim to create or edit nodes.',
    },
    zh: {
      label: 'MATERIAL MAKER · 有界 PTEX 管线',
      title: '原生材质源到经验证的纹理导出',
      prompt: '使用 dcc-mcp Skill 连接独立的 Material Maker 适配器。在获准工作区根目录内检查一个调用方批准的 .ptex 工程，报告格式版本、图资源路径、参数结构与声明的输出定义，并验证引用和受支持的属性类型。如果存在官方 Material Maker CLI，则将工程导出到新的输出目录且不得覆盖现有文件，并报告实际生成文件、大小与哈希。交互式节点图制作不在该适配器范围内，不得声称创建或编辑了节点。',
    },
  },
  {
    id: 'krita-typed-paint-workflow',
    image: '/showcase/krita-typed-paint-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-krita',
    en: {
      label: 'KRITA · TYPED DOCUMENT AUTHORING',
      title: 'Layered canvas to verified native and export copies',
      prompt: 'Use the dcc-mcp Skill to connect to one live Krita instance. Inspect the bridge and open documents, create a small bounded document, add two clearly named paint layers, fill typed-color rectangles, and read back document and layer state. Save an editable KRA copy and export a PNG into an approved output root without overwriting existing files. Report dimensions, color model, layer order and properties, output sizes, and hashes. Do not execute arbitrary Python, action IDs, or destructive flattening without explicit confirmation.',
    },
    zh: {
      label: 'KRITA · 类型化文档制作',
      title: '分层画布到经验证的原生与导出副本',
      prompt: '使用 dcc-mcp Skill 连接一个在线 Krita 实例。检查桥接与打开的文档，创建一个范围明确的小型文档，添加两个清晰命名的绘画图层，填充类型化颜色矩形，并回读文档与图层状态。在获准输出根目录中保存可编辑 KRA 副本并导出 PNG，且不得覆盖现有文件。报告尺寸、颜色模型、图层顺序与属性、输出大小和哈希。不得执行任意 Python、Action ID，也不得在未明确确认时破坏性合并图层。',
    },
  },
  {
    id: 'gimp-typed-image-workflow',
    image: '/showcase/gimp-typed-image-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-gimp',
    en: {
      label: 'GIMP · TYPED IMAGE AUTHORING',
      title: 'Layered image to verified XCF and PNG artifacts',
      prompt: 'Use the dcc-mcp Skill to connect to one live GIMP 3 instance. Inspect the authenticated bridge and open images, create a small bounded RGB image, add clearly named layers, fill them with typed RGBA colors, change one layer property, and read the state back. Save an editable XCF copy and export a PNG into an approved output root without overwriting existing files. Report dimensions, layer order and properties, output sizes, and hashes. Do not execute arbitrary Python or PDB procedure names, and do not flatten or discard changes without explicit typed confirmation.',
    },
    zh: {
      label: 'GIMP · 类型化图像制作',
      title: '分层图像到经验证的 XCF 与 PNG 产物',
      prompt: '使用 dcc-mcp Skill 连接一个在线 GIMP 3 实例。检查已认证桥接与打开的图像，创建一个范围明确的小型 RGB 图像，添加清晰命名的图层，用类型化 RGBA 颜色填充，修改一个图层属性并回读状态。在获准输出根目录中保存可编辑 XCF 副本并导出 PNG，且不得覆盖现有文件。报告尺寸、图层顺序与属性、输出大小和哈希。不得执行任意 Python 或 PDB 过程名，也不得在未明确类型化确认时合并图层或丢弃修改。',
    },
  },
  {
    id: 'katana-typed-lookdev-workflow',
    image: '/showcase/katana-typed-lookdev-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-katana',
    en: {
      label: 'KATANA · TYPED NODE GRAPH',
      title: 'Main-thread node authoring to durable project',
      prompt: 'Use the dcc-mcp Skill to connect to one live Katana instance. Inspect the current node graph, create a small isolated PrimitiveCreate and Merge network with unique names, add and connect only explicit ports, set and read back one typed parameter, position the nodes, and set a bounded timeline range. Inspect the resulting graph and save a new .katana project in an approved output root. Report node types, connections, parameter value, timeline, output size, and hash. Do not execute arbitrary Python or delete pre-existing nodes.',
    },
    zh: {
      label: 'KATANA · 类型化节点图',
      title: '主线程节点制作到持久化工程',
      prompt: '使用 dcc-mcp Skill 连接一个在线 Katana 实例。检查当前节点图，使用唯一名称创建一个隔离的小型 PrimitiveCreate 与 Merge 网络，只添加并连接明确端口，设置并回读一个类型化参数，摆放节点并设置有限时间线范围。检查最终节点图，并在获准输出根目录中保存新的 .katana 工程。报告节点类型、连接、参数值、时间线、输出大小与哈希。不得执行任意 Python，也不得删除已有节点。',
    },
  },
  {
    id: 'premiere-typed-edit-workflow',
    image: '/showcase/premiere-typed-edit-workflow.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-premiere',
    en: {
      label: 'PREMIERE PRO · TYPED EDITING',
      title: 'Approved media to inspected timeline and queued export',
      prompt: 'Use the dcc-mcp Skill to connect to one live Premiere Pro project. Inspect project and sequence state, create a clearly named bin, import only caller-approved media, create a sequence, insert one project item at an explicit time, add a named marker, and inspect the timeline readback. Save a project copy in an approved output root. If a compatible encoder preset is reported, queue one sequence export and report the returned job identifier; otherwise export one frame. Report item, track, clip, and marker counts plus durable output metadata. Do not claim a queued render completed without terminal evidence.',
    },
    zh: {
      label: 'PREMIERE PRO · 类型化剪辑',
      title: '获准媒体到经检查的时间线与导出队列',
      prompt: '使用 dcc-mcp Skill 连接一个在线 Premiere Pro 工程。检查工程与 Sequence 状态，创建一个清晰命名的 Bin，只导入调用方批准的媒体，创建 Sequence，在明确时间点插入一个项目项，添加具名 Marker 并回读检查时间线。在获准输出根目录中保存工程副本。如果运行时报告兼容的 Encoder 预设，则排队一次 Sequence 导出并报告返回的任务标识；否则导出一帧。报告项目项、轨道、Clip 与 Marker 数量及持久化输出元数据。没有终态证据时不得声称队列渲染已完成。',
    },
  },
  {
    id: 'hunyuan3d',
    image: '/showcase/hunyuan3d.webp',
    source: 'https://github.com/dcc-mcp/dcc-ai-hunyuan3d',
    en: {
      label: 'HUNYUAN3D · AI SERVICE',
      title: '3D lantern generated with Hunyuan3D',
      prompt: 'Inspect the official Marketplace package dcc-ai-hunyuan3d. Ask before installing it or calling a remote service. Generate a 3D lantern from my description, import it into the selected DCC, validate geometry and materials, and report provenance and output files.',
    },
    zh: {
      label: '混元 3D · AI 服务',
      title: '混元 3D 生成的灯笼模型',
      prompt: '检查官方 Marketplace 软件包 dcc-ai-hunyuan3d。安装或调用远程服务前先征得我的同意。根据我的描述生成可用于生产的 3D 灯笼，导入所选 DCC，验证几何体和材质，并报告来源与输出文件。',
    },
  },
  {
    id: 'geospatial-city',
    image: '/showcase/geospatial-city.webp',
    source: 'https://github.com/dcc-mcp/dcc-asset-geospatial',
    en: {
      label: 'GEOSPATIAL · ASSET PROVIDER',
      title: 'Geospatial city scene',
      prompt: 'Inspect the official Marketplace package dcc-asset-geospatial and ask before installing or downloading data. Use a bounded area I provide, preserve CRS and source provenance, create a city layout in my selected DCC, validate object counts and scale, and report the resulting scene path.',
    },
    zh: {
      label: '地理空间 · 资产提供方',
      title: '地理数据生成的城市场景',
      prompt: '检查官方 Marketplace 软件包 dcc-asset-geospatial，安装或下载数据前先征得我的同意。使用我提供的有限区域，保留坐标系与数据来源，在所选 DCC 中创建城市布局，验证对象数量和比例，并报告场景输出路径。',
    },
  },
  {
    id: 'maya-architecture',
    image: '/showcase/maya-architecture.jpg',
    source: 'https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture',
    en: {
      label: 'MAYA · SPECIALIZED SKILL',
      title: 'Maya architectural variations',
      prompt: 'Inspect the official Marketplace package dcc-mcp-maya-procedural-architecture and ask before installing it. In a new Maya scene or namespace, create three editable architectural variations from one brief, render a contact sheet, validate scene structure, and report the selected parameters.',
    },
    zh: {
      label: 'MAYA · 专项 SKILL',
      title: 'Maya 程序化建筑方案',
      prompt: '检查官方 Marketplace 软件包 dcc-mcp-maya-procedural-architecture，安装前先征得我的同意。在新的 Maya 场景或 Namespace 中，根据同一需求创建三个可编辑建筑方案，渲染联系表，验证场景结构并报告所选参数。',
    },
  },
  {
    id: 'kenney-assets',
    image: '/showcase/kenney-assets.webp',
    source: 'https://github.com/dcc-mcp/dcc-asset-kenney',
    en: {
      label: 'KENNEY · ASSET PROVIDER',
      title: 'Kenney assets in a playable scene',
      prompt: 'Inspect the official Marketplace package dcc-asset-kenney and ask before installing or downloading assets. Find a coherent pack, preserve license and source provenance, assemble a small playable level in my selected DCC or game engine, validate missing references, and report output paths.',
    },
    zh: {
      label: 'KENNEY · 资产提供方',
      title: 'Kenney 资产关卡',
      prompt: '检查官方 Marketplace 软件包 dcc-asset-kenney，安装或下载资产前先征得我的同意。选择风格统一的资产包，保留许可证和来源信息，在所选 DCC 或游戏引擎中组装一个小型可玩关卡，检查丢失引用并报告输出路径。',
    },
  },
  {
    id: 'zbrush-fantasy-dragon',
    image: '/showcase/zbrush-fantasy-dragon.png',
    source: 'https://github.com/dcc-mcp/dcc-mcp-zbrush',
    en: {
      label: 'ZBRUSH · HIGH-POLY INTERCHANGE',
      title: 'Five-million-face Dragon remeshed to a 115K PolyFrame mesh',
      prompt: 'Use the dcc-mcp Skill to connect to ZBrush. Ask before downloading the Artec 3D Fantasy Dragon and preserve its CC BY 4.0 attribution. Import it quietly and verify 2,499,970 points and 5,000,000 faces. Confirm the Dragon bake is rejected because it has no UVs, then verify normal and displacement baking on a UV test mesh. Duplicate the Dragon, ZRemesh it to 115,364 faces, enable PolyFrame, turn its head toward the camera, capture scoped visual evidence, and export the active remesh as OBJ with its hash. Serialize SDK mutations and do not retry while the host is still busy.',
    },
    zh: {
      label: 'ZBRUSH · 高面数交换',
      title: '将 500 万面 Dragon 重拓扑为 11.5 万面 PolyFrame 网格',
      prompt: '使用 dcc-mcp Skill 连接 ZBrush。下载 Artec 3D Fantasy Dragon 前先征得我的同意，并保留 CC BY 4.0 署名。静默导入并核对 2,499,970 个点、5,000,000 个面；确认 Dragon 因缺少 UV 被拒绝烘焙，再用带 UV 的测试网格验证法线与置换烘焙。复制 Dragon，ZRemesh 到 115,364 面，开启 PolyFrame，把龙头转向镜头并采集限定窗口证据，最后导出当前重拓扑网格并报告哈希。所有 SDK 修改必须串行，主机繁忙时不得重复提交。',
    },
  },
  {
    id: 'zbrush-maya-roundtrip',
    image: '/showcase/zbrush-maya-fantasy-dragon.png',
    source: 'https://github.com/dcc-mcp/dcc-mcp-maya',
    en: {
      label: 'ZBRUSH → MAYA · CROSS-DCC',
      title: 'Five million faces reduced to a verified 115K Maya wireframe',
      prompt: 'Continue a ZBrush-to-Maya validation with the exported Fantasy Dragon OBJ. Use typed Maya tools to verify the 2,499,970-vertex / 5,000,000-face source, then import its ZRemesh into a namespace and verify exactly 115,336 vertices and 115,364 faces. Frame the Dragon, enable wireframe-on-shaded, save the Maya scene, and use project UI Control only for scoped viewport evidence when playblast is unavailable. Do not leave test fixtures in the final scene.',
    },
    zh: {
      label: 'ZBRUSH → MAYA · 跨软件联调',
      title: '将 500 万面 Dragon 化简为经验证的 11.5 万面 Maya 布线',
      prompt: '继续验证从 ZBrush 导出的 Fantasy Dragon OBJ。先使用 Maya 类型化工具核对原始模型的 2,499,970 个顶点和 5,000,000 个面，再把 ZRemesh 导入独立 Namespace，并严格核对 115,336 个顶点和 115,364 个面。框选 Dragon、开启着色表面布线并保存 Maya 场景；仅当 viewport playblast 不可用时，才使用项目 UI Control 采集限定窗口证据。最终场景不得残留测试夹具。',
    },
  },
]

async function copyPrompt(item: Showcase) {
  await navigator.clipboard.writeText((isZh.value ? item.zh : item.en).prompt)
  copied.value = item.id
  window.setTimeout(() => { copied.value = '' }, 1600)
}
</script>

<template>
  <div class="showcase-gallery">
    <article v-for="item in showcases" :id="item.id" :key="item.id" class="showcase-prompt-card">
      <a class="showcase-prompt-media" :href="item.source" target="_blank" rel="noreferrer">
        <img :src="item.image" :alt="(isZh ? item.zh : item.en).title">
        <span>{{ (isZh ? item.zh : item.en).label }}</span>
      </a>
      <div class="showcase-prompt-body">
        <h2>{{ (isZh ? item.zh : item.en).title }}</h2>
        <div class="showcase-prompt-copy">
          <small>{{ isZh ? '复制提示词' : 'COPY PROMPT' }}</small>
          <p>{{ (isZh ? item.zh : item.en).prompt }}</p>
          <button type="button" @click="copyPrompt(item)">
            {{ copied === item.id ? (isZh ? '已复制' : 'Copied') : (isZh ? '复制提示词' : 'Copy prompt') }}
          </button>
        </div>
      </div>
    </article>
  </div>
</template>
