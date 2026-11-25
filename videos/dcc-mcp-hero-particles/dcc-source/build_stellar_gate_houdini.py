from __future__ import annotations

import json
import math
from pathlib import Path

import hou


SOURCE_DIR = Path(__file__).resolve().parent
RODIN_DIR = SOURCE_DIR / "rodin"
FBX_PATH = RODIN_DIR / "lod_basic_pbr.fbx"
TEXTURE_PATHS = {
    "base_color": RODIN_DIR / "texture_diffuse.png",
    "roughness": RODIN_DIR / "texture_roughness.png",
    "metalness": RODIN_DIR / "texture_metallic.png",
    "normal": RODIN_DIR / "texture_normal.png",
    "micro_height": SOURCE_DIR / "textures" / "armor-steel" / "armor_steel_height_v3.png",
}
RENDER_DIR = SOURCE_DIR.parent / "renders"
LOOKDEV_PREVIEW_PATH = RENDER_DIR / "dcc-mcp-stellar-gate-lookdev-preview.png"
FX_PREVIEW_PATH = RENDER_DIR / "dcc-mcp-stellar-gate-lookdev-fx-preview.png"
MODEL_SCALE = 0.1084
PORTAL_CENTER = (0.0, 0.0, 6.0)
FRAME_RANGE = (1, 180)


def set_parm(node: hou.Node, name: str, value) -> bool:
    if isinstance(value, (list, tuple)):
        parm_tuple = node.parmTuple(name)
        if parm_tuple is not None:
            parm_tuple.set(value)
            return True
    parm = node.parm(name)
    if parm is not None:
        parm.set(value)
        return True
    parm_tuple = node.parmTuple(name)
    if parm_tuple is not None:
        parm_tuple.set(value)
        return True
    return False


def set_first_parm(node: hou.Node, names: tuple[str, ...], value) -> str | None:
    for name in names:
        if set_parm(node, name, value):
            return name
    return None


def clean_child(parent: hou.Node, name: str) -> None:
    existing = parent.node(name)
    if existing is not None:
        existing.destroy()


def create_node(parent: hou.Node, node_type: str, name: str) -> hou.Node:
    clean_child(parent, name)
    node = parent.createNode(node_type, name)
    node.setUserData("dcc_mcp_owned", "stellar-gate-lookdev-fx")
    return node


def connect_named(
    target: hou.Node,
    input_name: str,
    source: hou.Node,
    source_output_name: str | None = None,
) -> None:
    input_names = tuple(target.inputNames())
    if input_name not in input_names:
        raise RuntimeError(f"{target.path()} has no input named {input_name!r}: {input_names}")
    output_index = 0
    if source_output_name is not None:
        output_names = tuple(source.outputNames())
        if source_output_name not in output_names:
            raise RuntimeError(
                f"{source.path()} has no output named {source_output_name!r}: {output_names}"
            )
        output_index = output_names.index(source_output_name)
    target.setInput(input_names.index(input_name), source, output_index)


def create_image(
    parent: hou.Node,
    name: str,
    path: Path,
    signature: str,
    colorspace: str,
) -> hou.Node:
    image = create_node(parent, "mtlximage", name)
    set_parm(image, "signature", signature)
    set_first_parm(image, ("file", "filename"), path.as_posix())
    set_first_parm(image, ("filecolorspace", "colorspace"), colorspace)
    return image


def create_surface_material(
    parent: hou.Node,
    name: str,
    color: tuple[float, float, float],
    emission: float = 0.0,
) -> hou.Node:
    surface = create_node(parent, "mtlxstandard_surface", f"{name}_SURFACE")
    set_parm(surface, "base", 0.18 if emission else 1.0)
    set_parm(surface, "base_color", color)
    set_parm(surface, "metalness", 0.35 if emission else 0.0)
    set_parm(surface, "specular_roughness", 0.28 if emission else 0.5)
    if emission:
        set_parm(surface, "emission", emission)
        set_parm(surface, "emission_color", color)

    material = create_node(parent, "mtlxsurfacematerial", f"{name}_MATERIAL")
    connect_named(material, "surfaceshader", surface)
    try:
        material.setMaterialFlag(True)
    except hou.OperationFailed:
        pass
    return material


def build_gunmetal_material(mat: hou.Node) -> hou.Node:
    for node in tuple(mat.children()):
        if node.name().startswith("RODIN_GUNMETAL"):
            node.destroy()

    surface = create_node(mat, "mtlxstandard_surface", "RODIN_GUNMETAL_SURFACE")
    set_parm(surface, "base", 1.0)
    set_parm(surface, "base_color", (0.24, 0.31, 0.40))
    set_parm(surface, "metalness", 0.82)
    set_parm(surface, "specular", 1.0)
    set_parm(surface, "specular_roughness", 0.48)
    set_parm(surface, "coat", 0.14)
    set_parm(surface, "coat_roughness", 0.32)

    base_image = create_image(
        mat,
        "RODIN_GUNMETAL_BASE_COLOR",
        TEXTURE_PATHS["base_color"],
        "color3",
        "srgb_texture",
    )
    base_mix = create_node(mat, "mtlxmix", "RODIN_GUNMETAL_BASE_MIX")
    set_parm(base_mix, "signature", "color3")
    set_parm(base_mix, "bg_color3", (0.24, 0.31, 0.40))
    set_parm(base_mix, "mix", 0.28)
    connect_named(base_mix, "fg", base_image)
    connect_named(surface, "base_color", base_mix)

    rough_image = create_image(
        mat,
        "RODIN_GUNMETAL_ROUGHNESS",
        TEXTURE_PATHS["roughness"],
        "float",
        "raw",
    )
    rough_range = create_node(mat, "mtlxrange", "RODIN_GUNMETAL_ROUGHNESS_REMAP")
    set_parm(rough_range, "signature", "float")
    set_parm(rough_range, "inlow", 0.86)
    set_parm(rough_range, "inhigh", 0.95)
    set_parm(rough_range, "outlow", 0.28)
    set_parm(rough_range, "outhigh", 0.62)
    set_parm(rough_range, "doclamp", 1)
    connect_named(rough_range, "in", rough_image)
    connect_named(surface, "specular_roughness", rough_range)

    metal_image = create_image(
        mat,
        "RODIN_GUNMETAL_METALNESS",
        TEXTURE_PATHS["metalness"],
        "float",
        "raw",
    )
    metal_range = create_node(mat, "mtlxrange", "RODIN_GUNMETAL_METALNESS_REMAP")
    set_parm(metal_range, "signature", "float")
    set_parm(metal_range, "inlow", 0.05)
    set_parm(metal_range, "inhigh", 0.15)
    set_parm(metal_range, "outlow", 0.72)
    set_parm(metal_range, "outhigh", 0.96)
    set_parm(metal_range, "doclamp", 1)
    connect_named(metal_range, "in", metal_image)
    connect_named(surface, "metalness", metal_range)

    normal_image = create_image(
        mat,
        "RODIN_GUNMETAL_NORMAL",
        TEXTURE_PATHS["normal"],
        "vector3",
        "raw",
    )
    normal_map = create_node(mat, "mtlxnormalmap", "RODIN_GUNMETAL_NORMALMAP")
    set_parm(normal_map, "scale", 0.72)
    connect_named(normal_map, "in", normal_image)

    texcoord = create_node(mat, "mtlxtexcoord", "RODIN_GUNMETAL_MICRO_UV")
    set_parm(texcoord, "signature", "vector2")
    uv_scale = create_node(mat, "mtlxmultiply", "RODIN_GUNMETAL_MICRO_UV_SCALE")
    set_parm(uv_scale, "signature", "vector2")
    set_parm(uv_scale, "in2_vector2", (12.0, 12.0))
    connect_named(uv_scale, "in1", texcoord)
    height_image = create_image(
        mat,
        "RODIN_GUNMETAL_MICRO_HEIGHT",
        TEXTURE_PATHS["micro_height"],
        "float",
        "raw",
    )
    connect_named(height_image, "texcoord", uv_scale)
    bump = create_node(mat, "mtlxbump", "RODIN_GUNMETAL_MICRO_BUMP")
    set_parm(bump, "scale", 0.035)
    connect_named(bump, "height", height_image)
    if "normal" in tuple(bump.inputNames()):
        connect_named(bump, "normal", normal_map)
    connect_named(surface, "normal", bump)

    material = create_node(mat, "mtlxsurfacematerial", "RODIN_GUNMETAL_MATERIAL")
    connect_named(material, "surfaceshader", surface)
    try:
        material.setMaterialFlag(True)
    except hou.OperationFailed:
        pass
    mat.layoutChildren()
    return material


def isolate_lod(
    source: hou.Node,
    parent: hou.Node,
    lod_name: str,
    output_name: str,
) -> hou.Node:
    blast = create_node(parent, "blast", f"isolate_{lod_name.lower()}")
    blast.setInput(0, source)
    set_parm(blast, "group", f"@name={lod_name}")
    set_parm(blast, "negate", 1)

    transform = create_node(parent, "xform", f"orient_{lod_name.lower()}")
    transform.setInput(0, blast)
    # FBX Y-up to Houdini Z-up (+90), retaining the reference's -20-degree lean.
    set_parm(transform, "r", (70.0, 0.0, 0.0))
    set_parm(transform, "s", (MODEL_SCALE, MODEL_SCALE, MODEL_SCALE))
    set_parm(transform, "t", (0.061, 0.0, 0.0))

    output = create_node(parent, "null", output_name)
    output.setInput(0, transform)
    output.setColor(hou.Color((0.10, 0.44, 0.95)))
    return output


def build_model(obj: hou.Node, material: hou.Node) -> tuple[hou.Node, hou.Node, hou.Node, dict]:
    model = obj.node("RODIN_STARGATE_LOOKDEV") or obj.node("rodin_stargate_9a980791")
    if model is None:
        model = obj.createNode("geo", "RODIN_STARGATE_LOOKDEV")
    else:
        model.setName("RODIN_STARGATE_LOOKDEV", unique_name=False)
    model.setUserData("dcc_mcp_owned", "stellar-gate-lookdev-fx")
    model.setColor(hou.Color((0.10, 0.28, 0.68)))
    model.setComment("Rodin LOD0 render / LOD2 lookdev / LOD4 FX proxy")
    model.setGenericFlag(hou.nodeFlag.DisplayComment, True)

    for child in tuple(model.children()):
        child.destroy()
    source = model.createNode("file", "import_rodin_pbr")
    source.setUserData("dcc_mcp_owned", "stellar-gate-lookdev-fx")
    set_first_parm(source, ("file", "file1"), FBX_PATH.as_posix())
    source.cook(force=True)

    geometry = source.geometry()
    name_attrib = geometry.findPrimAttrib("name")
    if name_attrib is None:
        raise RuntimeError("Rodin FBX is missing the primitive name attribute")
    available_names = tuple(name_attrib.strings())
    expected_names = {f"model_LOD{index}" for index in range(5)}
    missing_names = expected_names.difference(available_names)
    if missing_names:
        raise RuntimeError(
            f"Rodin FBX LOD names changed; missing={sorted(missing_names)}, "
            f"available={sorted(available_names)}"
        )

    render_output = isolate_lod(source, model, "model_LOD0", "OUT_RENDER_LOD0")
    lookdev_output = isolate_lod(source, model, "model_LOD2", "OUT_LOOKDEV_LOD2")
    proxy_output = isolate_lod(source, model, "model_LOD4", "OUT_FX_PROXY_LOD4")
    render_output.setRenderFlag(True)
    render_output.setDisplayFlag(False)
    lookdev_output.setDisplayFlag(True)
    lookdev_output.setRenderFlag(False)
    proxy_output.setDisplayFlag(False)
    proxy_output.setRenderFlag(False)

    set_first_parm(model, ("shop_materialpath", "material"), material.path())
    model.setDisplayFlag(True)
    model.layoutChildren()

    counts = {}
    for label, node in (
        ("render_lod0", render_output),
        ("lookdev_lod2", lookdev_output),
        ("fx_proxy_lod4", proxy_output),
    ):
        node.cook(force=True)
        counts[label] = int(node.geometry().intrinsicValue("primitivecount"))
    expected_counts = {
        "render_lod0": 999_996,
        "lookdev_lod2": 249_998,
        "fx_proxy_lod4": 62_498,
    }
    if counts != expected_counts:
        raise RuntimeError(f"Rodin LOD isolation failed: expected={expected_counts}, actual={counts}")
    return model, render_output, proxy_output, counts


def particle_code(cool_material: str, warm_material: str) -> str:
    return f'''import math
import hou

node = hou.pwd()
geo = node.geometry()
geo.clear()
cd = geo.addAttrib(hou.attribType.Point, "Cd", (1.0, 1.0, 1.0))
alpha = geo.addAttrib(hou.attribType.Point, "Alpha", 1.0)
width = geo.addAttrib(hou.attribType.Point, "width", 0.025)
pid = geo.addAttrib(hou.attribType.Point, "id", 0)
family = geo.addAttrib(hou.attribType.Prim, "stream_family", "cool")
material = geo.addAttrib(hou.attribType.Prim, "shop_materialpath", "{cool_material}")
warm_group = geo.createPrimGroup("warm_streams")
cool_group = geo.createPrimGroup("cool_streams")

frame = float(hou.frame())
time = ((frame - 1.0) % 180.0) / 180.0
stream_count = 144
trail_samples = 9

def hash01(value):
    return (math.sin(value * 12.9898 + 78.233) * 43758.5453) % 1.0

for stream_id in range(stream_count):
    offset = hash01(stream_id + 1.0)
    life = (time + offset) % 1.0
    base_angle = math.tau * ((stream_id * 0.61803398875) % 1.0)
    is_warm = stream_id % 5 == 0 or stream_id % 17 == 0
    curve = geo.createPolygon()
    curve.setIsClosed(False)
    curve.setAttribValue(family, "warm" if is_warm else "cool")
    curve.setAttribValue(material, "{warm_material}" if is_warm else "{cool_material}")
    (warm_group if is_warm else cool_group).add(curve)

    for sample_index in range(trail_samples - 1, -1, -1):
        sample_life = max(0.0, life - sample_index * 0.014)
        suction = sample_life ** 1.28
        radius = 0.24 + 8.0 * ((1.0 - suction) ** 0.72)
        angle = base_angle + 7.6 * (sample_life ** 1.34)
        angle += 0.14 * math.sin(stream_id * 0.73 + sample_life * 18.0)
        x = {PORTAL_CENTER[0]} + radius * math.cos(angle)
        z = {PORTAL_CENTER[2]} + radius * 0.70 * math.sin(angle)
        y = -4.6 * (1.0 - suction) + 1.15 * suction
        y += 0.18 * math.sin(base_angle * 3.0 + sample_life * 11.0) * (1.0 - sample_life)

        point = geo.createPoint()
        point.setPosition(hou.Vector3(x, y, z))
        tail = 1.0 - sample_index / float(trail_samples)
        if is_warm:
            color = (1.0, 0.20, 0.025)
        else:
            color = (0.035, 0.28, 1.0)
        point.setAttribValue(cd, color)
        point.setAttribValue(alpha, max(0.025, tail ** 1.7) * min(1.0, life * 12.0 + 0.1))
        point.setAttribValue(width, 0.008 + 0.028 * tail * (0.55 + 0.45 * sample_life))
        point.setAttribValue(pid, stream_id)
        curve.addVertex(point)
'''


def volume_code() -> str:
    return f'''import math
import hou

node = hou.pwd()
geo = node.geometry()
geo.clear()
density = geo.addAttrib(hou.attribType.Point, "density", 0.0)
pscale = geo.addAttrib(hou.attribType.Point, "pscale", 0.08)
cd = geo.addAttrib(hou.attribType.Point, "Cd", (0.05, 0.18, 0.55))
frame = float(hou.frame())
time = ((frame - 1.0) % 180.0) / 180.0

for index in range(4500):
    seed = (index * 0.61803398875) % 1.0
    life = (time * 0.72 + seed) % 1.0
    suction = life ** 1.35
    radius = 0.38 + 6.3 * ((1.0 - suction) ** 0.76)
    angle = math.tau * seed + 5.8 * suction
    angle += 0.32 * math.sin(index * 0.019 + life * 9.0)
    x = {PORTAL_CENTER[0]} + radius * math.cos(angle)
    z = {PORTAL_CENTER[2]} + radius * 0.68 * math.sin(angle)
    y = -2.4 * (1.0 - suction) + 0.72 * suction
    point = geo.createPoint()
    point.setPosition(hou.Vector3(x, y, z))
    edge = max(0.0, 1.0 - abs(life - 0.55) / 0.55)
    point.setAttribValue(density, 0.11 + 0.42 * edge)
    point.setAttribValue(pscale, 0.055 + 0.12 * (1.0 - suction))
    warm = index % 13 == 0
    point.setAttribValue(cd, (0.85, 0.08, 0.015) if warm else (0.025, 0.12, 0.65))
'''


def build_fx(obj: hou.Node, mat: hou.Node) -> tuple[hou.Node, hou.Node, dict]:
    cool_material = create_surface_material(
        mat, "STELLAR_GATE_FX_COOL", (0.025, 0.28, 1.0), emission=3.2
    )
    warm_material = create_surface_material(
        mat, "STELLAR_GATE_FX_WARM", (1.0, 0.16, 0.018), emission=4.0
    )

    particle_geo = create_node(obj, "geo", "STELLAR_GATE_FX_PARTICLES")
    for child in tuple(particle_geo.children()):
        child.destroy()
    particle_solve = particle_geo.createNode("python", "solve_inward_streams")
    particle_solve.setUserData("dcc_mcp_owned", "stellar-gate-lookdev-fx")
    set_parm(
        particle_solve,
        "python",
        particle_code(cool_material.path(), warm_material.path()),
    )
    particle_out = particle_geo.createNode("null", "OUT_PARTICLE_TRAILS")
    particle_out.setInput(0, particle_solve)
    particle_out.setDisplayFlag(True)
    particle_out.setRenderFlag(True)
    particle_geo.setColor(hou.Color((0.10, 0.34, 0.95)))
    particle_geo.setComment("Deterministic inward cool/warm curve trails")
    particle_geo.setGenericFlag(hou.nodeFlag.DisplayComment, True)

    volume_geo = create_node(obj, "geo", "STELLAR_GATE_FX_VOLUME")
    for child in tuple(volume_geo.children()):
        child.destroy()
    volume_points = volume_geo.createNode("python", "seed_inward_volume")
    volume_points.setUserData("dcc_mcp_owned", "stellar-gate-lookdev-fx")
    set_parm(volume_points, "python", volume_code())
    raster = volume_geo.createNode("volumerasterizeattributes", "rasterize_density")
    raster.setInput(0, volume_points)
    set_parm(raster, "attributes", "density Cd")
    set_parm(raster, "voxelsize", 0.11)
    volume_out = volume_geo.createNode("null", "OUT_INWARD_VOLUME")
    volume_out.setInput(0, raster)
    volume_out.setDisplayFlag(True)
    volume_out.setRenderFlag(True)
    volume_geo.setColor(hou.Color((0.84, 0.18, 0.05)))
    volume_geo.setComment("Low-resolution inward density layer for FX look approval")
    volume_geo.setGenericFlag(hou.nodeFlag.DisplayComment, True)

    try:
        volume_material = create_node(mat, "pyroshader", "STELLAR_GATE_FX_VOLUME_MATERIAL")
        set_first_parm(volume_material, ("densityscale", "smokedensity"), 0.55)
        set_first_parm(volume_material, ("smokecolor", "smokecolorr"), (0.035, 0.12, 0.48))
        set_first_parm(volume_geo, ("shop_materialpath", "material"), volume_material.path())
    except hou.OperationFailed:
        volume_material = None

    particle_geo.layoutChildren()
    volume_geo.layoutChildren()
    particle_out.cook(force=True)
    volume_out.cook(force=True)
    stats = {
        "particle_points": int(particle_out.geometry().intrinsicValue("pointcount")),
        "particle_curves": int(particle_out.geometry().intrinsicValue("primitivecount")),
        "volume_primitives": int(volume_out.geometry().intrinsicValue("primitivecount")),
        "volume_material": volume_material.path() if volume_material else None,
    }
    return particle_geo, volume_geo, stats


def build_camera_and_lights(obj: hou.Node) -> tuple[hou.Node, list[hou.Node]]:
    target = create_node(obj, "null", "RODIN_STELLAR_GATE_CAMERA_TARGET")
    set_parm(target, "t", (-2.8, 1.7785, 4.8864))
    target.setDisplayFlag(False)

    camera = create_node(obj, "cam", "RODIN_STELLAR_GATE_CAMERA")
    set_parm(camera, "t", (10.6, -23.5, 1.20))
    set_parm(camera, "focal", 28.0)
    set_parm(camera, "resx", 1600)
    set_parm(camera, "resy", 900)
    set_parm(camera, "winx", -0.216)
    set_parm(camera, "winy", 0.129)
    set_parm(camera, "vm_bgenable", 1)
    set_parm(
        camera,
        "vm_background",
        (SOURCE_DIR.parents[2] / "docs/public/brand/dcc-mcp-hero-stargate-v2-source.png").as_posix(),
    )
    set_parm(camera, "lookatpath", target.path())
    set_parm(camera, "lookup", "on")

    lights = []
    light_specs = (
        ("RODIN_LOOKDEV_KEY_WARM", (7.0, -7.0, 12.5), (1.0, 0.32, 0.10), 5.2),
        ("RODIN_LOOKDEV_FILL_COOL", (-8.0, -4.0, 8.0), (0.12, 0.34, 1.0), 4.2),
        ("RODIN_LOOKDEV_RIM_COOL", (3.0, 6.0, 12.0), (0.20, 0.48, 1.0), 5.5),
        ("RODIN_LOOKDEV_FRONT_NEUTRAL", (0.0, -12.0, 6.0), (0.52, 0.62, 0.78), 3.8),
    )
    for name, position, color, exposure in light_specs:
        light = create_node(obj, "hlight::2.0", name)
        set_parm(light, "t", position)
        set_first_parm(light, ("light_color", "lightcolor"), color)
        set_first_parm(light, ("light_exposure", "exposure"), exposure)
        set_first_parm(light, ("light_intensity", "intensity"), 1.0)
        set_first_parm(light, ("light_type", "type"), "point")
        lights.append(light)
    return camera, lights


def build_preview_rop(
    camera: hou.Node,
    node_name: str,
    output_path: Path,
    exclude_objects: str = "",
) -> hou.Node:
    out = hou.node("/out")
    if out is None:
        raise RuntimeError("Missing /out network")
    rop = create_node(out, "opengl", node_name)
    set_parm(rop, "camera", camera.path())
    set_parm(rop, "trange", 0)
    set_parm(rop, "f1", 46)
    set_parm(rop, "f2", 46)
    set_parm(rop, "res1", 1600)
    set_parm(rop, "res2", 900)
    set_first_parm(rop, ("picture", "sopoutput", "output"), output_path.as_posix())
    set_parm(rop, "vobjects", "*")
    set_parm(rop, "excludeobjects", exclude_objects)
    set_first_parm(rop, ("transparent", "alpha"), 0)
    return rop


def main() -> dict:
    missing = [str(path) for path in (FBX_PATH, *TEXTURE_PATHS.values()) if not path.exists()]
    if missing:
        raise FileNotFoundError(f"Missing Rodin lookdev inputs: {missing}")
    RENDER_DIR.mkdir(parents=True, exist_ok=True)

    obj = hou.node("/obj")
    mat = hou.node("/mat")
    if obj is None or mat is None:
        raise RuntimeError("Houdini scene is missing /obj or /mat")

    for legacy_path in ("/obj/STELLAR_GATE_MODEL", "/obj/STELLAR_GATE_PARTICLE_SOLVE"):
        legacy = hou.node(legacy_path)
        if legacy is not None:
            legacy.setDisplayFlag(False)

    gunmetal = build_gunmetal_material(mat)
    model, render_output, proxy_output, lod_counts = build_model(obj, gunmetal)
    particles, volume, fx_stats = build_fx(obj, mat)
    camera, lights = build_camera_and_lights(obj)
    lookdev_rop = build_preview_rop(
        camera,
        "RODIN_STELLAR_GATE_LOOKDEV_PREVIEW",
        LOOKDEV_PREVIEW_PATH,
        "STELLAR_GATE_FX_*",
    )
    fx_rop = build_preview_rop(
        camera,
        "RODIN_STELLAR_GATE_FX_PREVIEW",
        FX_PREVIEW_PATH,
    )

    hou.setFps(30.0)
    hou.playbar.setFrameRange(*FRAME_RANGE)
    hou.playbar.setPlaybackRange(*FRAME_RANGE)
    hou.setFrame(46)
    obj.layoutChildren()
    hou.node("/out").layoutChildren()

    result = {
        "model": model.path(),
        "render_output": render_output.path(),
        "fx_proxy": proxy_output.path(),
        "material": gunmetal.path(),
        "particles": particles.path(),
        "volume": volume.path(),
        "camera": camera.path(),
        "lights": [light.path() for light in lights],
        "lookdev_preview_rop": lookdev_rop.path(),
        "lookdev_preview_path": str(LOOKDEV_PREVIEW_PATH),
        "fx_preview_rop": fx_rop.path(),
        "fx_preview_path": str(FX_PREVIEW_PATH),
        "frame_range": list(FRAME_RANGE),
        "lod_counts": lod_counts,
        "fx_stats": fx_stats,
    }
    print(json.dumps(result, indent=2, sort_keys=True))
    return result


BUILD_RESULT = main()
