export const expectedGuideIdentities = Object.freeze([
  ['3ds-max', '3ds Max', 'dcc-mcp-3dsmax', '3dsmax', null],
  ['after-effects', 'After Effects', 'dcc-mcp-aftereffects', 'aftereffects', null],
  ['blender', 'Blender', 'dcc-mcp-blender', 'blender', null],
  ['cache-inspector', 'Cache Inspector', 'dcc-mcp-cache-inspector', null, 'dcc-mcp-cache-inspector'],
  ['cinema-4d', 'Cinema 4D', 'dcc-mcp-cinema4d', 'c4d', null],
  ['comfyui', 'ComfyUI', 'dcc-mcp-comfyui', 'comfyui', null],
  ['flow-production-tracking', 'Flow Production Tracking', 'dcc-mcp-fpt', 'shotgrid', null],
  ['freecad', 'FreeCAD', 'dcc-mcp-freecad', 'freecad', null],
  ['gimp', 'GIMP', 'dcc-mcp-gimp', 'gimp', null],
  ['godot', 'Godot', 'dcc-mcp-godot', 'godot', null],
  ['houdini', 'Houdini', 'dcc-mcp-houdini', 'houdini', null],
  ['illustrator', 'Illustrator', 'dcc-mcp-illustrator', 'illustrator', null],
  ['katana', 'Katana', 'dcc-mcp-katana', 'katana', null],
  ['krita', 'Krita', 'dcc-mcp-krita', 'krita', null],
  ['mari', 'Mari', 'dcc-mcp-mari', 'mari', null],
  ['marmoset-toolbag', 'Marmoset Toolbag', 'dcc-mcp-marmoset', 'marmoset', null],
  ['material-maker', 'Material Maker', 'dcc-mcp-material-maker', 'material-maker', null],
  ['maya', 'Maya', 'dcc-mcp-maya', 'maya', null],
  ['motionbuilder', 'MotionBuilder', 'dcc-mcp-mobu', 'mobu', null],
  ['nuke', 'Nuke', 'dcc-mcp-nuke', 'nuke', null],
  ['openscad', 'OpenSCAD', 'dcc-mcp-openscad', 'openscad', null],
  ['openusd', 'OpenUSD', 'dcc-mcp-openusd', 'openusd', null],
  ['photoshop', 'Photoshop', 'dcc-mcp-photoshop', 'photoshop', null],
  ['powerpoint', 'PowerPoint', 'dcc-mcp-powerpoint', 'powerpoint', null],
  ['premiere-pro', 'Premiere Pro', 'dcc-mcp-premiere', 'premiere', null],
  ['renderdoc', 'RenderDoc', 'dcc-mcp-renderdoc', 'renderdoc', null],
  ['shogun', 'Shōgun', 'dcc-mcp-shogun', 'shogun', null],
  ['sketchup', 'SketchUp', 'dcc-mcp-sketchup', 'sketchup', null],
  ['substance-3d-designer', 'Substance 3D Designer', 'dcc-mcp-substance3d-designer', 'substance3d_designer', null],
  ['substance-3d-painter', 'Substance 3D Painter', 'dcc-mcp-substance3d-painter', 'substance3d_painter', null],
  ['tiled', 'Tiled', 'dcc-mcp-tiled', 'tiled', null],
  ['touchdesigner', 'TouchDesigner', 'dcc-mcp-touchdesigner', 'touchdesigner', null],
  ['unity', 'Unity', 'dcc-mcp-unity', 'unity', null],
  ['unreal-engine', 'Unreal Engine', 'dcc-mcp-unreal', 'unreal', null],
  ['wwise', 'Wwise', 'dcc-mcp-wwise', 'wwise', null],
  ['zbrush', 'ZBrush', 'dcc-mcp-zbrush', 'zbrush', null],
].map(([slug, name, repository, dccType, marketplacePackage]) => Object.freeze({
  slug,
  name,
  repository,
  dccType,
  marketplacePackage,
})))

// Frozen from the official `dcc-mcp-cli 0.20.21 dcc-types` release catalog.
export const expectedReleasedDccTypes = Object.freeze(
  expectedGuideIdentities.flatMap(({ dccType }) => dccType ? [dccType] : []).sort(),
)

export const guideIdentityKey = ({ slug, name, repository, dccType, marketplacePackage }) => (
  `${slug}|${name}|${repository}|dccType=${dccType ?? '-'}|marketplacePackage=${marketplacePackage ?? '-'}`
)
