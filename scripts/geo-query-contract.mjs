export const expectedFixedQueries = Object.freeze([
  ['"DCC-MCP"', 'en-US', 'US'],
  ['"What is DCC-MCP"', 'en-US', 'US'],
  ['"DCC-MCP 是什么"', 'zh-CN', 'CN'],
  ['"Why DCC-MCP"', 'en-US', 'US'],
  ['AI agent control Maya Blender Houdini typed tools gateway MCP', 'en-US', 'US'],
  ['use AI to control Maya typed tools MCP', 'en-US', 'US'],
  ['用 AI 控制 Maya MCP 类型化工具', 'zh-CN', 'CN'],
  ['"How do I create ten random spheres in Maya?"', 'en-US', 'US'],
  ['"DCC-MCP Marketplace"', 'en-US', 'US'],
  ['"dcc-lookdev-turntable"', 'en-US', 'US'],
  ['"dcc-mcp-maya-procedural-architecture"', 'en-US', 'US'],
  ['"DCC-MCP" Wwise Marmoset Showcase', 'en-US', 'US'],
].map(([query, locale, market]) => Object.freeze({ query, locale, market })))

export const expectedApplications = Object.freeze([
  '3ds Max', 'After Effects', 'Blender', 'Cinema 4D', 'ComfyUI', 'Cache Inspector',
  'Flow Production Tracking', 'FreeCAD', 'GIMP', 'Godot', 'Houdini', 'Illustrator',
  'Katana', 'Krita', 'Mari', 'Marmoset Toolbag', 'Material Maker', 'Maya',
  'MotionBuilder', 'Nuke', 'OpenUSD', 'OpenSCAD', 'Photoshop', 'PowerPoint',
  'Premiere Pro', 'RenderDoc', 'Shōgun', 'SketchUp', 'TouchDesigner',
  'Substance 3D Designer', 'Substance 3D Painter', 'Tiled', 'Unity', 'Tuanjie / 团结',
  'Unreal Engine', 'Wwise', 'ZBrush',
])
