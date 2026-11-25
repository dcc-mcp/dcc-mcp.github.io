from __future__ import annotations

import math
from pathlib import Path

import bpy
from mathutils import Matrix, Vector


SOURCE_DIR = Path(r"F:\github\dcc-mcp.github.io\videos\dcc-mcp-hero-particles\dcc-source")
BLEND_PATH = SOURCE_DIR / "dcc-mcp-stellar-gate.blend"
PREVIEW_PATH = SOURCE_DIR / "dcc-mcp-stellar-gate-pbr-preview.png"
ARMOR_TEXTURE_DIR = SOURCE_DIR / "textures" / "armor-steel"
UV_LAYER = "ArmorUV"
ARMOR_MAP_PATHS = {
    "normal": ARMOR_TEXTURE_DIR / "armor_steel_normal_v3.png",
    "height": ARMOR_TEXTURE_DIR / "armor_steel_height_v3.png",
    "roughness": ARMOR_TEXTURE_DIR / "armor_steel_roughness_v3.png",
    "metallic": ARMOR_TEXTURE_DIR / "armor_steel_metallic_v3.png",
    "ambient_occlusion": ARMOR_TEXTURE_DIR / "armor_steel_ambient_occlusion_v3.png",
    "scratches": ARMOR_TEXTURE_DIR / "armor_steel_scratches_v3.png",
}
ARMOR_HEIGHT_TEXTURE: bpy.types.Texture | None = None
GATE_DEPTH_SCALE = 1.0
GATE_TILT_DEGREES = -20.0
GATE_TILT_PIVOT = Vector((0.0, 3.0, -7.0))
GATE_VERTICAL_OFFSET = Vector((0.0, 0.0, -2.88))
GATE_APERTURE_SOURCE_RADIUS = 3.12
GATE_APERTURE_TARGET_RADIUS = 4.20
GATE_OUTER_RADIUS = 7.0
GATE_TILT_MATRIX = (
    Matrix.Translation(GATE_TILT_PIVOT + GATE_VERTICAL_OFFSET)
    @ Matrix.Rotation(math.radians(GATE_TILT_DEGREES), 4, "X")
    @ Matrix.Translation(-GATE_TILT_PIVOT)
)


def gate_tilt_point(point: tuple[float, float, float]) -> tuple[float, float, float]:
    return tuple(GATE_TILT_MATRIX @ Vector(point))


def gate_radius(name: str, radius: float) -> float:
    if not name.startswith("Gate_"):
        return radius
    if radius <= GATE_APERTURE_SOURCE_RADIUS:
        return radius * GATE_APERTURE_TARGET_RADIUS / GATE_APERTURE_SOURCE_RADIUS
    if radius >= GATE_OUTER_RADIUS:
        return radius
    return GATE_APERTURE_TARGET_RADIUS + (
        (radius - GATE_APERTURE_SOURCE_RADIUS)
        * (GATE_OUTER_RADIUS - GATE_APERTURE_TARGET_RADIUS)
        / (GATE_OUTER_RADIUS - GATE_APERTURE_SOURCE_RADIUS)
    )


assert math.isclose(gate_radius("Gate_Clearance", 3.12), 4.20)
assert math.isclose(gate_radius("Station_Clearance", 3.12), 3.12)


def load_armor_map(channel: str) -> bpy.types.Image:
    image = bpy.data.images.load(str(ARMOR_MAP_PATHS[channel]), check_existing=True)
    image.colorspace_settings.name = "Non-Color"
    return image


def make_material(
    name: str,
    color: tuple[float, float, float, float],
    *,
    metallic: float,
    roughness: float,
    emission: tuple[float, float, float, float] | None = None,
    emission_strength: float = 0.0,
    wear_color: tuple[float, float, float, float] | None = None,
    texture_scale: float = 7.0,
    bump_strength: float = 0.16,
) -> bpy.types.Material:
    material = bpy.data.materials.new(name)
    material.use_nodes = True
    material.diffuse_color = color
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    nodes.clear()

    output = nodes.new("ShaderNodeOutputMaterial")
    shader = nodes.new("ShaderNodeBsdfPrincipled")
    shader.location = (620.0, 20.0)
    output.location = (900.0, 20.0)
    links.new(shader.outputs["BSDF"], output.inputs["Surface"])
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    coat_input = shader.inputs.get("Coat Weight")
    if coat_input is not None:
        coat_input.default_value = 0.08 if metallic > 0.5 else 0.0

    geometry = nodes.new("ShaderNodeNewGeometry")
    geometry.location = (-980.0, -40.0)
    coordinates = nodes.new("ShaderNodeTexCoord")
    coordinates.location = (-980.0, 180.0)
    texture_vector = geometry.outputs.get("Position")
    if texture_vector is None:
        texture_vector = coordinates.outputs["Generated"]
    macro_noise = nodes.new("ShaderNodeTexNoise")
    macro_noise.location = (-760.0, 220.0)
    macro_noise.noise_dimensions = "3D"
    macro_noise.inputs["Scale"].default_value = texture_scale
    macro_noise.inputs["Detail"].default_value = 5.0
    macro_noise.inputs["Roughness"].default_value = 0.72
    links.new(texture_vector, macro_noise.inputs["Vector"])

    base_ramp = nodes.new("ShaderNodeValToRGB")
    base_ramp.location = (-520.0, 260.0)
    base_ramp.color_ramp.elements[0].position = 0.18
    base_ramp.color_ramp.elements[0].color = tuple(max(0.002, component * 0.72) for component in color[:3]) + (1.0,)
    base_ramp.color_ramp.elements[1].position = 0.82
    base_ramp.color_ramp.elements[1].color = tuple(min(1.0, component * 1.18 + 0.006) for component in color[:3]) + (1.0,)
    links.new(macro_noise.outputs["Fac"], base_ramp.inputs["Fac"])

    weather_noise = nodes.new("ShaderNodeTexNoise")
    weather_noise.location = (-520.0, 80.0)
    weather_noise.noise_dimensions = "3D"
    weather_noise.inputs["Scale"].default_value = texture_scale * 0.62
    weather_noise.inputs["Detail"].default_value = 3.0
    weather_noise.inputs["Roughness"].default_value = 0.84
    links.new(texture_vector, weather_noise.inputs["Vector"])
    weather_ramp = nodes.new("ShaderNodeValToRGB")
    weather_ramp.location = (-280.0, 140.0)
    weather_ramp.color_ramp.elements[0].position = 0.28
    weather_ramp.color_ramp.elements[0].color = (0.54, 0.66, 0.82, 1.0)
    weather_ramp.color_ramp.elements[1].position = 0.72
    weather_ramp.color_ramp.elements[1].color = (1.05, 1.02, 0.96, 1.0)
    links.new(weather_noise.outputs["Fac"], weather_ramp.inputs["Fac"])
    weather_mix = nodes.new("ShaderNodeMixRGB")
    weather_mix.location = (-40.0, 260.0)
    weather_mix.blend_type = "MULTIPLY"
    weather_mix.inputs[0].default_value = 0.22
    links.new(base_ramp.outputs["Color"], weather_mix.inputs[1])
    links.new(weather_ramp.outputs["Color"], weather_mix.inputs[2])

    wear_ramp = nodes.new("ShaderNodeValToRGB")
    wear_ramp.location = (-280.0, -20.0)
    wear_ramp.color_ramp.elements[0].position = 0.52
    wear_ramp.color_ramp.elements[1].position = 0.71
    wear_ramp.color_ramp.elements[0].color = (0.0, 0.0, 0.0, 1.0)
    wear_ramp.color_ramp.elements[1].color = (1.0, 1.0, 1.0, 1.0)
    pointiness = geometry.outputs.get("Pointiness")
    if pointiness is not None:
        links.new(pointiness, wear_ramp.inputs["Fac"])

    edge_mix = nodes.new("ShaderNodeMixRGB")
    edge_mix.location = (20.0, 220.0)
    edge_mix.blend_type = "MIX"
    edge_mix.inputs[2].default_value = wear_color or tuple(
        min(1.0, component * 2.2 + 0.035) for component in color[:3]
    ) + (1.0,)
    links.new(weather_mix.outputs["Color"], edge_mix.inputs[1])
    links.new(wear_ramp.outputs["Color"], edge_mix.inputs[0])
    base_color_output = edge_mix.outputs["Color"]

    roughness_ramp = nodes.new("ShaderNodeValToRGB")
    roughness_ramp.location = (-250.0, 430.0)
    roughness_ramp.color_ramp.elements[0].color = (max(0.03, roughness - 0.08),) * 3 + (1.0,)
    roughness_ramp.color_ramp.elements[1].color = (min(0.95, roughness + 0.12),) * 3 + (1.0,)
    links.new(macro_noise.outputs["Fac"], roughness_ramp.inputs["Fac"])

    metallic_ramp = nodes.new("ShaderNodeValToRGB")
    metallic_ramp.location = (-40.0, 560.0)
    metallic_ramp.color_ramp.elements[0].color = (max(0.08, metallic - 0.24),) * 3 + (1.0,)
    metallic_ramp.color_ramp.elements[1].color = (metallic,) * 3 + (1.0,)
    links.new(macro_noise.outputs["Fac"], metallic_ramp.inputs["Fac"])

    micro_noise = nodes.new("ShaderNodeTexNoise")
    micro_noise.location = (-520.0, -300.0)
    micro_noise.noise_dimensions = "3D"
    micro_noise.inputs["Scale"].default_value = texture_scale * 34.0
    micro_noise.inputs["Detail"].default_value = 2.0
    micro_noise.inputs["Roughness"].default_value = 0.78
    links.new(texture_vector, micro_noise.inputs["Vector"])

    bump = nodes.new("ShaderNodeBump")
    bump.location = (280.0, -160.0)
    bump.inputs["Strength"].default_value = bump_strength
    bump.inputs["Distance"].default_value = 0.0025
    links.new(micro_noise.outputs["Fac"], bump.inputs["Height"])
    roughness_output = roughness_ramp.outputs["Color"]
    metallic_output = metallic_ramp.outputs["Color"]
    normal_output = bump.outputs["Normal"]

    has_armor_maps = emission is None and all(path.exists() for path in ARMOR_MAP_PATHS.values())
    if has_armor_maps:
        uv_scale = nodes.new("ShaderNodeVectorMath")
        uv_scale.operation = "SCALE"
        uv_scale.location = (-760.0, -650.0)
        uv_scale.inputs["Scale"].default_value = texture_scale * 0.18
        links.new(coordinates.outputs["UV"], uv_scale.inputs["Vector"])

        def uv_map(channel: str, y: float, vector_socket: bpy.types.NodeSocket | None = None) -> bpy.types.Node:
            image_node = nodes.new("ShaderNodeTexImage")
            image_node.name = f"Armor steel / {channel}"
            image_node.label = f"Armor steel / {channel}"
            image_node.location = (-500.0, y)
            image_node.image = load_armor_map(channel)
            image_node.interpolation = "Linear"
            image_node.extension = "REPEAT"
            image_node.projection = "FLAT"
            links.new(vector_socket or uv_scale.outputs["Vector"], image_node.inputs["Vector"])
            return image_node

        roughness_map = uv_map("roughness", -620.0)
        roughness_mix = nodes.new("ShaderNodeMixRGB")
        roughness_mix.blend_type = "MIX"
        roughness_mix.location = (15.0, 470.0)
        roughness_mix.inputs[0].default_value = 0.62
        links.new(roughness_ramp.outputs["Color"], roughness_mix.inputs[1])
        links.new(roughness_map.outputs["Color"], roughness_mix.inputs[2])
        roughness_output = roughness_mix.outputs["Color"]

        metallic_map = uv_map("metallic", -850.0)
        metallic_mix = nodes.new("ShaderNodeMixRGB")
        metallic_mix.blend_type = "MIX"
        metallic_mix.location = (190.0, 560.0)
        metallic_mix.inputs[0].default_value = 0.24
        links.new(metallic_ramp.outputs["Color"], metallic_mix.inputs[1])
        links.new(metallic_map.outputs["Color"], metallic_mix.inputs[2])
        metallic_output = metallic_mix.outputs["Color"]

        normal_image = uv_map("normal", -1080.0)
        normal_map = nodes.new("ShaderNodeNormalMap")
        normal_map.location = (210.0, -170.0)
        normal_map.space = "TANGENT"
        normal_map.uv_map = UV_LAYER
        normal_map.inputs["Strength"].default_value = 0.50
        links.new(normal_image.outputs["Color"], normal_map.inputs["Color"])

        height_map = uv_map("height", -1300.0)
        texture_bump = nodes.new("ShaderNodeBump")
        texture_bump.location = (430.0, -165.0)
        texture_bump.inputs["Strength"].default_value = 0.18
        texture_bump.inputs["Distance"].default_value = 0.0012
        links.new(height_map.outputs["Color"], texture_bump.inputs["Height"])
        links.new(normal_map.outputs["Normal"], texture_bump.inputs["Normal"])
        scratch_scale = nodes.new("ShaderNodeVectorMath")
        scratch_scale.operation = "SCALE"
        scratch_scale.location = (-720.0, -1680.0)
        scratch_scale.inputs["Scale"].default_value = 3.0
        links.new(uv_scale.outputs["Vector"], scratch_scale.inputs["Vector"])
        scratch_map = uv_map("scratches", -1740.0, scratch_scale.outputs["Vector"])

        scratch_bump = nodes.new("ShaderNodeBump")
        scratch_bump.location = (590.0, -165.0)
        scratch_bump.invert = True
        scratch_bump.inputs["Strength"].default_value = 0.10
        scratch_bump.inputs["Distance"].default_value = 0.00025
        links.new(scratch_map.outputs["Color"], scratch_bump.inputs["Height"])
        links.new(texture_bump.outputs["Normal"], scratch_bump.inputs["Normal"])
        normal_output = scratch_bump.outputs["Normal"]

        scratch_roughness = nodes.new("ShaderNodeMixRGB")
        scratch_roughness.blend_type = "ADD"
        scratch_roughness.location = (360.0, 520.0)
        scratch_roughness.inputs[0].default_value = 0.08
        links.new(roughness_output, scratch_roughness.inputs[1])
        links.new(scratch_map.outputs["Color"], scratch_roughness.inputs[2])
        roughness_output = scratch_roughness.outputs["Color"]

        ao_map = uv_map("ambient_occlusion", -1510.0)
        ao_mix = nodes.new("ShaderNodeMixRGB")
        ao_mix.blend_type = "MULTIPLY"
        ao_mix.location = (230.0, 250.0)
        ao_mix.inputs[0].default_value = 0.28
        links.new(edge_mix.outputs["Color"], ao_mix.inputs[1])
        links.new(ao_map.outputs["Color"], ao_mix.inputs[2])
        base_color_output = ao_mix.outputs["Color"]
        scratch_color = nodes.new("ShaderNodeMixRGB")
        scratch_color.blend_type = "MULTIPLY"
        scratch_color.location = (450.0, 260.0)
        scratch_color.inputs[2].default_value = (0.22, 0.26, 0.31, 1.0)
        links.new(scratch_map.outputs["Color"], scratch_color.inputs[0])
        links.new(base_color_output, scratch_color.inputs[1])
        base_color_output = scratch_color.outputs["Color"]
        material["substance_maps"] = "roughness,metallic,normal,height,ambient_occlusion,scratches"

    links.new(base_color_output, shader.inputs["Base Color"])
    links.new(roughness_output, shader.inputs["Roughness"])
    links.new(metallic_output, shader.inputs["Metallic"])
    links.new(normal_output, shader.inputs["Normal"])

    if emission:
        shader.inputs["Emission Color"].default_value = emission
        shader.inputs["Emission Strength"].default_value = emission_strength
    else:
        material["armor_steel"] = True
    material["pbr_channels"] = (
        "base_color,metallic,roughness,normal,height,ambient_occlusion,scratches,edge_wear"
        if has_armor_maps
        else "procedural_base_color,metallic,roughness,bump,edge_wear"
    )
    return material


def finish_mesh(
    obj: bpy.types.Object,
    material: bpy.types.Material,
    *,
    bevel: float = 0.0,
) -> bpy.types.Object:
    obj.data.materials.append(material)
    for polygon in obj.data.polygons:
        polygon.use_smooth = bevel == 0.0
    if bevel > 0.0:
        modifier = obj.modifiers.new("Edge micro bevel", "BEVEL")
        modifier.width = bevel
        modifier.segments = 2
        modifier.limit_method = "ANGLE"
    obj["edge_bevel_hint"] = bevel
    obj["dcc_mcp_source"] = "blender-procedural-model"
    return obj


def build_dominant_axis_uv(obj: bpy.types.Object) -> None:
    mesh = obj.data
    layer = mesh.uv_layers.get(UV_LAYER) or mesh.uv_layers.new(name=UV_LAYER)
    world = obj.matrix_world
    normal_matrix = world.to_3x3().inverted_safe().transposed()
    world_coords = [world @ vertex.co for vertex in mesh.vertices]

    for polygon in mesh.polygons:
        normal = normal_matrix @ polygon.normal
        axis = max(range(3), key=lambda index: abs(normal[index]))
        sign = -1.0 if normal[axis] < 0.0 else 1.0
        for loop_index in polygon.loop_indices:
            point = world_coords[mesh.loops[loop_index].vertex_index]
            if axis == 0:
                uv = (sign * point.y, point.z)
            elif axis == 1:
                uv = (sign * point.z, point.x)
            else:
                uv = (sign * point.x, point.y)
            layer.data[loop_index].uv = uv

    assert len(layer.data) == len(mesh.loops)


def needs_render_displacement(name: str) -> bool:
    return (
        name.startswith(("Gate_Load_Frame_", "Gate_Service_Ring_", "Gate_Rear_Shell_Core_", "Gate_Rear_Shell_Armor_Cassette_", "Gate_Front_Armor_Cassette_", "Station_Left_Cantilever_Hull_"))
        or (name.startswith("Gate_Outer_Shroud_") and "_Plate_" not in name)
        or name in {"Station_Left_Cantilever_Root", "Station_Deck_Base"}
    )


def add_render_displacement(obj: bpy.types.Object) -> None:
    subdivision = obj.modifiers.new("Armor render subdivision", "SUBSURF")
    subdivision.subdivision_type = "SIMPLE"
    subdivision.levels = 0
    subdivision.render_levels = 1 if len(obj.data.polygons) > 2000 else 2
    subdivision.show_viewport = False

    global ARMOR_HEIGHT_TEXTURE
    if ARMOR_HEIGHT_TEXTURE is None:
        ARMOR_HEIGHT_TEXTURE = bpy.data.textures.new("Armor height displacement", type="IMAGE")
        ARMOR_HEIGHT_TEXTURE.image = load_armor_map("height")

    displacement = obj.modifiers.new("Armor height displacement", "DISPLACE")
    displacement.texture = ARMOR_HEIGHT_TEXTURE
    displacement.texture_coords = "UV"
    displacement.uv_layer = UV_LAYER
    displacement.direction = "NORMAL"
    displacement.mid_level = 0.49343
    displacement.strength = 0.0018
    displacement.show_viewport = False
    obj["render_displacement"] = True


def add_torus(
    name: str,
    major_radius: float,
    minor_radius: float,
    depth: float,
    material: bpy.types.Material,
    *,
    major_segments: int = 256,
    minor_segments: int = 32,
) -> bpy.types.Object:
    major_radius = gate_radius(name, major_radius)
    vertices: list[tuple[float, float, float]] = []
    faces: list[tuple[int, int, int, int]] = []
    for ring_index in range(major_segments):
        ring_angle = math.tau * ring_index / major_segments
        radial_x = math.cos(ring_angle)
        radial_z = math.sin(ring_angle)
        for side_index in range(minor_segments):
            side_angle = math.tau * side_index / minor_segments
            radius = major_radius + minor_radius * math.cos(side_angle)
            vertices.append(
                (
                    radius * radial_x,
                    depth + minor_radius * math.sin(side_angle),
                    radius * radial_z,
                )
            )
            next_ring = ((ring_index + 1) % major_segments) * minor_segments
            current_ring = ring_index * minor_segments
            next_side = (side_index + 1) % minor_segments
            faces.append(
                (
                    current_ring + side_index,
                    next_ring + side_index,
                    next_ring + next_side,
                    current_ring + next_side,
                )
            )
    mesh = bpy.data.meshes.new(f"{name}_Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    return finish_mesh(obj, material)


def add_block(
    name: str,
    angle: float,
    radius: float,
    dimensions: tuple[float, float, float],
    depth: float,
    material: bpy.types.Material,
    *,
    bevel: float = 0.08,
) -> bpy.types.Object:
    radius = gate_radius(name, radius)
    x = radius * math.cos(angle)
    z = radius * math.sin(angle)
    tangent = Vector((-math.sin(angle), 0.0, math.cos(angle)))
    normal = Vector((0.0, 1.0, 0.0))
    radial = Vector((math.cos(angle), 0.0, math.sin(angle)))
    center = Vector((x, depth, z))
    half_tangent, half_depth, half_radial = (value * 0.5 for value in dimensions)
    chamfer = min(bevel, half_tangent * 0.45, half_radial * 0.45)
    profile = (
        (-half_tangent + chamfer, -half_radial),
        (half_tangent - chamfer, -half_radial),
        (half_tangent, -half_radial + chamfer),
        (half_tangent, half_radial - chamfer),
        (half_tangent - chamfer, half_radial),
        (-half_tangent + chamfer, half_radial),
        (-half_tangent, half_radial - chamfer),
        (-half_tangent, -half_radial + chamfer),
    )
    vertices = []
    for depth_sign in (-1.0, 1.0):
        for tangent_offset, radial_offset in profile:
            point = (
                center
                + tangent * tangent_offset
                + normal * half_depth * depth_sign
                + radial * radial_offset
            )
            vertices.append(tuple(point))
    faces = [tuple(range(8)), tuple(range(15, 7, -1))]
    for index in range(8):
        next_index = (index + 1) % 8
        faces.append((index, next_index, 8 + next_index, 8 + index))
    mesh = bpy.data.meshes.new(f"{name}_Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    return finish_mesh(obj, material, bevel=bevel)


def add_box(
    name: str,
    location: tuple[float, float, float],
    dimensions: tuple[float, float, float],
    material: bpy.types.Material,
    *,
    rotation: tuple[float, float, float] = (0.0, 0.0, 0.0),
    bevel: float = 0.08,
) -> bpy.types.Object:
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return finish_mesh(obj, material, bevel=bevel)


def add_beam(
    name: str,
    start: tuple[float, float, float],
    end: tuple[float, float, float],
    depth: float,
    thickness: float,
    material: bpy.types.Material,
    *,
    bevel: float = 0.05,
) -> bpy.types.Object:
    start_point = Vector(start)
    end_point = Vector(end)
    delta = end_point - start_point
    obj = add_box(
        name,
        tuple((start_point + end_point) * 0.5),
        (delta.length, depth, thickness),
        material,
        bevel=bevel,
    )
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = delta.to_track_quat("X", "Z")
    return obj


def add_annular_segment(
    name: str,
    inner_radius: float,
    outer_radius: float,
    start_angle: float,
    end_angle: float,
    front_depth: float,
    back_depth: float,
    material: bpy.types.Material,
    *,
    angular_samples: int = 7,
    bevel: float = 0.025,
) -> bpy.types.Object:
    inner_radius = gate_radius(name, inner_radius)
    outer_radius = gate_radius(name, outer_radius)
    vertices: list[tuple[float, float, float]] = []
    for depth in (front_depth, back_depth):
        for sample_index in range(angular_samples):
            mix = sample_index / (angular_samples - 1)
            angle = start_angle + (end_angle - start_angle) * mix
            for radius in (inner_radius, outer_radius):
                vertices.append(
                    (radius * math.cos(angle), depth, radius * math.sin(angle))
                )

    layer_stride = angular_samples * 2
    faces: list[tuple[int, int, int, int]] = []
    for sample_index in range(angular_samples - 1):
        current = sample_index * 2
        following = current + 2
        faces.append((current, following, following + 1, current + 1))
        faces.append(
            (
                layer_stride + current + 1,
                layer_stride + following + 1,
                layer_stride + following,
                layer_stride + current,
            )
        )
        faces.append(
            (
                current,
                layer_stride + current,
                layer_stride + following,
                following,
            )
        )
        faces.append(
            (
                current + 1,
                following + 1,
                layer_stride + following + 1,
                layer_stride + current + 1,
            )
        )
    faces.append((0, 1, layer_stride + 1, layer_stride))
    last = (angular_samples - 1) * 2
    faces.append((last + 1, last, layer_stride + last, layer_stride + last + 1))

    mesh = bpy.data.meshes.new(f"{name}_Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    return finish_mesh(obj, material, bevel=bevel)


def make_bolt_mesh(
    name: str,
    radius: float,
    depth: float,
    material: bpy.types.Material,
    *,
    segments: int = 12,
) -> bpy.types.Mesh:
    vertices = []
    for y in (-depth * 0.5, depth * 0.5):
        for index in range(segments):
            angle = math.tau * index / segments
            vertices.append((radius * math.cos(angle), y, radius * math.sin(angle)))
    faces = [tuple(range(segments - 1, -1, -1)), tuple(range(segments, segments * 2))]
    for index in range(segments):
        next_index = (index + 1) % segments
        faces.append((index, next_index, segments + next_index, segments + index))
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    mesh.materials.append(material)
    return mesh


def add_bolt_ring(
    name: str,
    mesh: bpy.types.Mesh,
    radius: float,
    depth: float,
    count: int,
    *,
    angle_offset: float = 0.0,
) -> None:
    radius = gate_radius(name, radius)
    for index in range(count):
        angle = math.tau * index / count + angle_offset
        obj = bpy.data.objects.new(f"{name}_{index:02d}", mesh)
        obj.location = (radius * math.cos(angle), depth, radius * math.sin(angle))
        obj["dcc_mcp_source"] = "blender-procedural-model"
        obj["asset_role"] = "stellar-gate-model"
        bpy.context.scene.collection.objects.link(obj)


def add_arc(
    name: str,
    radius: float,
    start_angle: float,
    end_angle: float,
    depth: float,
    material: bpy.types.Material,
    *,
    thickness: float,
    samples: int = 28,
) -> bpy.types.Object:
    radius = gate_radius(name, radius)
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 2
    curve.bevel_depth = thickness
    curve.bevel_resolution = 3
    spline = curve.splines.new("POLY")
    spline.points.add(samples - 1)
    for index, point in enumerate(spline.points):
        t = index / (samples - 1)
        angle = start_angle + (end_angle - start_angle) * t
        point.co = (radius * math.cos(angle), depth, radius * math.sin(angle), 1.0)
    obj = bpy.data.objects.new(name, curve)
    bpy.context.scene.collection.objects.link(obj)
    obj.data.materials.append(material)
    obj["dcc_mcp_source"] = "blender-procedural-model"
    return obj


def point_camera(camera: bpy.types.Object, target: Vector) -> None:
    direction = target - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def add_area_light(
    name: str,
    location: tuple[float, float, float],
    color: tuple[float, float, float],
    energy: float,
    size: float,
) -> bpy.types.Object:
    data = bpy.data.lights.new(name, "AREA")
    data.color = color
    data.energy = energy
    data.shape = "DISK"
    data.size = size
    obj = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(obj)
    obj.location = location
    point_camera(obj, Vector((0.0, 0.0, 0.0)))
    return obj


SOURCE_DIR.mkdir(parents=True, exist_ok=True)
for existing_object in list(bpy.data.objects):
    bpy.data.objects.remove(existing_object, do_unlink=True)
for existing_material in list(bpy.data.materials):
    bpy.data.materials.remove(existing_material)
for data_collection in (
    bpy.data.meshes,
    bpy.data.curves,
    bpy.data.cameras,
    bpy.data.lights,
    bpy.data.textures,
):
    for data_block in list(data_collection):
        if data_block.users == 0:
            data_collection.remove(data_block)
scene = bpy.context.scene
scene.name = "DCC_MCP_Stellar_Gate"

metal_dark = make_material(
    "Gate / Graphite",
    (0.072, 0.090, 0.120, 1.0),
    metallic=0.92,
    roughness=0.36,
    wear_color=(0.22, 0.26, 0.30, 1.0),
    texture_scale=3.2,
    bump_strength=0.08,
)
metal_blue = make_material(
    "Gate / Cold alloy",
    (0.095, 0.140, 0.205, 1.0),
    metallic=0.93,
    roughness=0.29,
    wear_color=(0.26, 0.32, 0.38, 1.0),
    texture_scale=3.8,
    bump_strength=0.07,
)
metal_warm = make_material(
    "Gate / Heated alloy",
    (0.12, 0.045, 0.015, 1.0),
    metallic=0.76,
    roughness=0.43,
    wear_color=(0.58, 0.19, 0.038, 1.0),
    texture_scale=2.8,
    bump_strength=0.09,
)
metal_edge = make_material(
    "Gate / Machined edge",
    (0.18, 0.23, 0.30, 1.0),
    metallic=0.96,
    roughness=0.19,
    wear_color=(0.38, 0.42, 0.46, 1.0),
    texture_scale=4.6,
    bump_strength=0.045,
)
glow_blue = make_material(
    "Gate / Cool conduit",
    (0.008, 0.065, 0.22, 1.0),
    metallic=0.22,
    roughness=0.24,
    emission=(0.01, 0.18, 0.72, 1.0),
    emission_strength=0.9,
    texture_scale=5.0,
    bump_strength=0.04,
)
glow_warm = make_material(
    "Gate / Warm conduit",
    (0.42, 0.045, 0.008, 1.0),
    metallic=0.15,
    roughness=0.24,
    emission=(1.0, 0.075, 0.008, 1.0),
    emission_strength=1.35,
    texture_scale=5.0,
    bump_strength=0.04,
)

# The load path is four overlapping rectangular-section shells, not torus
# tubing. Their assembled envelope stays near the reference's four-metre depth.
structural_rings = (
    ("Gate_Inner_Throat_Frame", 18, 3.52, 4.16, -0.05, 0.78, metal_dark, 0.035),
    ("Gate_Service_Ring_Core", 16, 4.10, 4.92, 0.38, 1.34, metal_blue, 0.045),
    ("Gate_Load_Frame_Core", 12, 4.82, 6.10, 0.88, 1.92, metal_dark, 0.075),
    ("Gate_Rear_Shell_Core", 12, 5.18, 6.88, 1.46, 3.24, metal_dark, 0.085),
)
for name, count, inner, outer, front, back, material, bevel in structural_rings:
    step = math.tau / count
    gap = math.radians(0.32)
    for index in range(count):
        add_annular_segment(
            f"{name}_{index:02d}",
            inner,
            outer,
            index * step + gap,
            (index + 1) * step - gap,
            front,
            back,
            material,
            angular_samples=12,
            bevel=bevel,
        )

# Chamfered sacrificial lip at the front of the aperture. Keep it outside the
# conduit radius so the exploded layers still read when assembled.
for index in range(16):
    step = math.tau / 16.0
    gap = math.radians(0.75 + 0.12 * (index % 3))
    add_annular_segment(
        f"Gate_Aperture_Lip_{index:02d}",
        3.46 + 0.012 * (index % 3),
        3.69 + 0.025 * (index % 2),
        index * step + gap,
        (index + 1) * step - gap,
        -0.48 - 0.025 * (index % 4 == 0),
        -0.12,
        metal_blue if index in {2, 9} else metal_dark,
        angular_samples=8,
        bevel=0.038,
    )

# Only the inner facade remains a regular service ring. The two outer bands are
# grouped into irregular armored cassettes below, leaving real maintenance bays.
inner_panel_count = 30
inner_panel_step = math.tau / inner_panel_count
inner_panel_gap = math.radians(0.54)
inner_panel_phase = math.radians(7.0)
for index in range(inner_panel_count):
    add_annular_segment(
        f"Gate_Tier_2_Panel_{index:02d}",
        3.62,
        4.32,
        index * inner_panel_step + inner_panel_gap + inner_panel_phase,
        (index + 1) * inner_panel_step - inner_panel_gap + inner_panel_phase,
        -0.695 if index % 3 == 0 else -0.66,
        -0.02,
        metal_warm if index % 11 == 0 else metal_blue,
        angular_samples=7,
        bevel=0.018,
    )

# Recessed tracks and narrow conduits keep the cold/warm contrast without
# washing out the panel relief.
add_torus("Gate_Outer_Machined_Rail", 6.10, 0.075, -0.12, metal_edge, major_segments=256, minor_segments=20)
add_torus("Gate_Outer_Cold_Rail", 5.83, 0.042, -0.50, metal_edge, major_segments=256, minor_segments=16)
add_torus("Gate_Mid_Recess_A", 5.03, 0.065, -0.56, metal_warm, major_segments=256, minor_segments=18)
add_torus("Gate_Mid_Recess_B", 4.35, 0.052, -0.58, metal_edge, major_segments=256, minor_segments=16)
add_torus("Gate_Aperture_Lip_Back_Rail", 3.72, 0.075, -0.08, metal_edge, major_segments=256, minor_segments=20)

# The energy conduit is a standalone segmented carrier, not a painted ring.
for index in range(16):
    step = math.tau / 16.0
    gap = math.radians(1.15 + 0.10 * (index % 3))
    add_annular_segment(
        f"Gate_Energy_Conduit_Carrier_{index:02d}",
        3.12,
        3.45,
        index * step + gap,
        (index + 1) * step - gap,
        -0.02,
        0.34,
        metal_blue if index in {2, 9} else metal_dark,
        angular_samples=8,
        bevel=0.026,
    )
for connector_index, degrees in enumerate(range(0, 360, 45)):
    add_block(
        f"Gate_Energy_Conduit_Connector_{connector_index:02d}",
        math.radians(degrees),
        3.30,
        (0.22, 0.54, 0.34),
        0.12,
        metal_edge,
        bevel=0.024,
    )
add_torus("Gate_Energy_Conduit", 3.28, 0.044, -0.08, glow_warm, major_segments=256, minor_segments=16)

# Sparse layer connectors replace more decorative greebles: these are the
# locator pins and hinge housings visible in the exploded assembly.
locator_pin_mesh = make_bolt_mesh("Gate_Service_Locator_Pin_Mesh", 0.075, 1.54, metal_edge, segments=12)
add_bolt_ring(
    "Gate_Service_Ring_Locator_Pin",
    locator_pin_mesh,
    4.46,
    0.88,
    12,
    angle_offset=math.radians(7.0),
)
for connector_index, degrees in enumerate((22, 68, 112, 158, 202, 248, 292, 338)):
    add_block(
        f"Gate_Service_Ring_Hinge_Block_{connector_index:02d}",
        math.radians(degrees),
        4.52,
        (0.42, 0.88, 0.42),
        0.84,
        metal_blue if connector_index in {1, 5} else metal_dark,
        bevel=0.052,
    )
    add_block(
        f"Gate_Load_Frame_Bolted_Flange_{connector_index:02d}",
        math.radians(degrees),
        5.05,
        (0.68, 0.24, 0.58),
        0.42,
        metal_edge if connector_index in {2, 6} else metal_dark,
        bevel=0.045,
    )

# Ten armored cassettes replace the old concentric clock-face bands. Their gaps
# expose the service and load shells, as in the cutaway reference.
armor_zones = (
    (2.0, 27.0, 6.72),
    (39.0, 66.0, 6.82),
    (74.0, 101.0, 6.98),
    (116.0, 143.0, 6.86),
    (153.0, 178.0, 6.70),
    (190.0, 216.0, 6.80),
    (231.0, 257.0, 6.92),
    (267.0, 292.0, 7.00),
    (306.0, 331.0, 6.86),
    (340.0, 358.0, 6.74),
)
for zone_index, (start, end, outer) in enumerate(armor_zones):
    front = -0.40 - 0.05 * (zone_index % 3)
    add_annular_segment(
        f"Gate_Outer_Shroud_{zone_index:02d}",
        5.55,
        outer - 0.16,
        math.radians(start + 0.7),
        math.radians(end - 0.7),
        front,
        1.34 + 0.16 * (zone_index % 2),
        metal_edge if zone_index in {2, 6} else metal_dark,
        angular_samples=16,
        bevel=0.055,
    )
    inner_start = start + 1.0
    inner_span = end - start - 2.0
    inner_breaks = (
        inner_start,
        inner_start + inner_span * (0.34 + 0.03 * (zone_index % 2)),
        inner_start + inner_span * (0.69 - 0.02 * (zone_index % 3)),
        end - 1.0,
    )
    for plate_index in range(3):
        add_annular_segment(
            f"Gate_Front_Armor_Cassette_{zone_index:02d}_Inner_{plate_index}",
            4.40 + 0.025 * ((zone_index + plate_index) % 2),
            5.18 - 0.020 * (plate_index % 2),
            math.radians(inner_breaks[plate_index] + 0.36),
            math.radians(inner_breaks[plate_index + 1] - 0.36),
            -0.70 - 0.035 * (plate_index == 1),
            -0.24,
            metal_blue if (zone_index + plate_index) % 7 == 1 else metal_dark,
            angular_samples=8,
            bevel=0.035,
        )

    outer_start = start + 1.4
    outer_span = end - start - 2.8
    outer_breaks = (
        outer_start,
        outer_start + outer_span * (0.28 + 0.03 * (zone_index % 3)),
        outer_start + outer_span * (0.65 - 0.03 * (zone_index % 2)),
        end - 1.4,
    )
    for plate_index in range(3):
        add_annular_segment(
            f"Gate_Front_Armor_Cassette_{zone_index:02d}_Outer_{plate_index}",
            5.08 + 0.03 * (plate_index % 2),
            outer - 0.05 * ((zone_index + plate_index) % 3),
            math.radians(outer_breaks[plate_index] + 0.42),
            math.radians(outer_breaks[plate_index + 1] - 0.42),
            -0.84 - 0.045 * ((zone_index + plate_index) % 2),
            -0.38,
            metal_edge if (zone_index + plate_index) % 8 == 0 else metal_dark,
            angular_samples=8,
            bevel=0.052,
        )

    add_annular_segment(
        f"Gate_Front_Armor_Cassette_{zone_index:02d}_Cap",
        5.22,
        outer - 0.10,
        math.radians(outer_breaks[1] + 0.8),
        math.radians(outer_breaks[2] - 0.8),
        -0.94,
        -0.84,
        metal_blue if zone_index in {2, 7} else metal_dark,
        angular_samples=8,
        bevel=0.022,
    )

service_bays = ((28.0, 39.0), (101.0, 116.0), (216.0, 231.0), (292.0, 306.0))
for bay_index, (start, end) in enumerate(service_bays):
    add_annular_segment(
        f"Gate_Service_Bay_Recess_{bay_index:02d}",
        4.55,
        6.18,
        math.radians(start + 0.5),
        math.radians(end - 0.5),
        0.02,
        0.92,
        metal_dark,
        angular_samples=8,
        bevel=0.030,
    )
    for frame_index, degrees in enumerate((start + 0.4, end - 0.4)):
        add_block(
            f"Gate_Service_Bay_Frame_{bay_index:02d}_{frame_index}",
            math.radians(degrees),
            5.36,
            (0.24, 1.35, 1.55),
            0.45,
            metal_edge,
            bevel=0.030,
        )
    for rail_index, radius in enumerate((4.78, 5.16, 5.54, 5.92)):
        add_arc(
            f"Gate_Service_Bay_Rail_{bay_index:02d}_{rail_index}",
            radius,
            math.radians(start + 1.0),
            math.radians(end - 1.0),
            -0.08 + 0.045 * (rail_index % 2),
            metal_warm if rail_index == 2 else metal_edge,
            thickness=0.026 if rail_index == 2 else 0.020,
            samples=14,
        )
    add_block(
        f"Gate_Service_Bay_Crossmember_{bay_index:02d}",
        math.radians((start + end) * 0.5),
        5.36,
        (0.34, 0.72, 1.44),
        0.18,
        metal_edge,
        bevel=0.030,
    )

# Full-depth cleats lock the visible cassettes to the load and rear shells.
for cleat_index, degrees in enumerate((14, 55, 92, 134, 174, 214, 254, 296, 336)):
    add_block(
        f"Gate_Load_Frame_Through_Cleat_{cleat_index:02d}",
        math.radians(degrees),
        5.82,
        (0.44, 3.00, 1.72),
        1.35,
        metal_edge if cleat_index in {2, 6} else metal_dark,
        bevel=0.050,
    )

for pod_index, degrees in enumerate((28, 96, 214, 276, 326)):
    add_block(
        f"Gate_Rear_Shell_Service_Pod_{pod_index:02d}",
        math.radians(degrees),
        6.36,
        (0.82 + 0.12 * (pod_index % 2), 1.02, 0.76),
        2.70,
        metal_blue if pod_index == 1 else metal_dark,
        bevel=0.085,
    )

# The rear layer closes as an armored machinery shell with continuous axial
# depth, radial manifolds, and three service rails visible in side view.
for shell_index in range(12):
    step = math.tau / 12.0
    gap = math.radians(0.85 + 0.10 * (shell_index % 3))
    add_annular_segment(
        f"Gate_Rear_Shell_Armor_Cassette_{shell_index:02d}",
        5.20,
        6.92 - 0.08 * (shell_index % 3),
        shell_index * step + gap,
        (shell_index + 1) * step - gap,
        2.72,
        3.68,
        metal_blue if shell_index in {2, 7} else metal_dark,
        angular_samples=12,
        bevel=0.075,
    )
    add_block(
        f"Gate_Rear_Shell_Radial_Manifold_{shell_index:02d}",
        shell_index * step + step * 0.5,
        6.05,
        (0.34, 1.18, 1.42),
        3.08,
        metal_edge if shell_index in {1, 6, 10} else metal_dark,
        bevel=0.050,
    )
for rail_index, radius in enumerate((5.56, 6.02, 6.48)):
    for sector_index, start_degrees in enumerate((6.0, 66.0, 126.0, 186.0, 246.0, 306.0)):
        add_arc(
            f"Gate_Rear_Shell_Service_Rail_{rail_index:02d}_{sector_index:02d}",
            radius,
            math.radians(start_degrees),
            math.radians(start_degrees + 42.0),
            3.72,
            metal_warm if rail_index == 1 and sector_index % 2 == 0 else metal_edge,
            thickness=0.024 + 0.006 * rail_index,
            samples=18,
        )

# The bridge grows from three nested load-frame collars, then extends behind
# the front armor instead of being pasted across the aperture.
for collar_index, (inner, outer, front, back) in enumerate(
    ((5.18, 5.72, 0.26, 1.12), (5.66, 6.18, 0.62, 1.56), (6.08, 6.58, 1.02, 1.92))
):
    add_annular_segment(
        f"Station_Left_Cantilever_Root_Collar_{collar_index:02d}",
        inner,
        outer,
        math.radians(160.0 + collar_index * 2.0),
        math.radians(200.0 - collar_index * 2.0),
        front,
        back,
        metal_blue if collar_index == 1 else metal_dark,
        angular_samples=14,
        bevel=0.060,
    )

# Long armored cantilever with a tapered nose and one coherent hull stack.
bridge_sections = (
    (-9.75, 0.62, -0.10, 1.18, 2.15, 1.35),
    (-8.55, 0.70, -0.05, 1.22, 2.35, 1.50),
    (-7.35, 0.82, 0.03, 1.18, 2.55, 1.72),
    (-6.15, 0.96, 0.13, 1.24, 2.85, 2.05),
)
for section_index, (x, y, z, width, depth, height) in enumerate(bridge_sections):
    add_box(
        f"Station_Left_Cantilever_Hull_{section_index:02d}",
        (x, y, z),
        (width, depth, height),
        metal_dark,
        bevel=0.10,
    )
    add_box(
        f"Station_Left_Cantilever_Roof_{section_index:02d}",
        (x, y, z + height * 0.5 + 0.06),
        (width * 0.92, depth * 0.82, 0.12),
        metal_blue if section_index in {1, 3} else metal_edge,
        bevel=0.035,
    )
add_box("Station_Left_Cantilever_Dorsal_Housing", (-7.91, 0.74, 0.69), (1.10, 1.54, 0.24), metal_dark, bevel=0.05)
add_box("Station_Left_Cantilever_Dorsal_Rail", (-7.91, -0.06, 0.75), (0.18, 0.10, 0.82), metal_edge, bevel=0.020)
add_box("Station_Left_Cantilever_Nose", (-10.45, 0.55, -0.17), (0.42, 1.82, 0.86), metal_edge, bevel=0.06)
add_box("Station_Left_Cantilever_Root", (-6.10, 1.05, -0.07), (1.70, 3.20, 2.60), metal_dark, bevel=0.11)
for flange_index, degrees in enumerate((168.0, 180.0, 192.0)):
    add_block(
        f"Station_Left_Cantilever_Load_Flange_{flange_index:02d}",
        math.radians(degrees),
        6.00,
        (0.82, 1.24, 0.72),
        1.10 + 0.10 * (flange_index % 2),
        metal_edge if flange_index == 1 else metal_dark,
        bevel=0.075,
    )
for rib_index, x in enumerate((-9.93, -8.73, -7.53, -6.33)):
    add_box(
        f"Station_Left_Cantilever_Armor_Seam_{rib_index:02d}",
        (x, -0.54, -0.10 + 0.04 * (rib_index % 2)),
        (0.14, 0.08, 1.02 - 0.08 * (rib_index % 3)),
        metal_dark if rib_index % 2 else metal_edge,
        bevel=0.018,
    )
for panel_index, x in enumerate((-9.63, -8.43, -7.23, -6.07)):
    add_box(
        f"Station_Left_Cantilever_Side_Plate_{panel_index:02d}",
        (x, -0.50, -0.07),
        (0.68, 0.10, 0.60 if panel_index % 3 else 0.72),
        metal_edge if panel_index in {0, 3} else metal_blue,
        bevel=0.025,
    )
add_beam("Station_Left_Cantilever_Truss_A", (-10.25, 0.10, -0.77), (-5.85, 0.10, -1.13), 0.22, 0.20, metal_edge, bevel=0.024)
add_beam("Station_Left_Cantilever_Truss_B", (-10.10, 1.36, -0.85), (-5.80, 1.36, -1.25), 0.22, 0.20, metal_edge, bevel=0.024)
for lamp_index in range(12):
    add_box(
        f"Station_Left_Cantilever_Lamp_{lamp_index:02d}",
        (-10.20 + lamp_index * 0.36, -0.56, -0.65 + 0.018 * (lamp_index % 2)),
        (0.14, 0.05, 0.04),
        glow_warm,
        bevel=0.008,
    )

# Broad paired landing braces carry the load frame into explicit deck anchors.
lower_braces = (
    ((-8.35, 0.20, -6.95), (-4.95, 0.20, -3.70)),
    ((-6.90, 1.50, -6.95), (-4.25, 1.50, -4.10)),
    ((-5.45, 2.80, -6.95), (-3.55, 2.80, -4.45)),
    ((8.35, 0.20, -6.95), (4.95, 0.20, -3.70)),
    ((6.90, 1.50, -6.95), (4.25, 1.50, -4.10)),
    ((5.45, 2.80, -6.95), (3.55, 2.80, -4.45)),
)
for brace_index, (start, end) in enumerate(lower_braces):
    tier = brace_index % 3
    tilted_end = gate_tilt_point(end)
    add_beam(
        f"Station_Landing_Brace_{brace_index:02d}",
        start,
        tilted_end,
        (1.45, 0.72, 0.54)[tier],
        (1.05, 0.46, 0.32)[tier],
        metal_dark,
        bevel=0.055,
    )
    add_beam(
        f"Station_Landing_Brace_Inset_{brace_index:02d}",
        (start[0] + (0.42 if start[0] < 0 else -0.42), start[1] - 0.42, start[2] + 0.14),
        (
            tilted_end[0] + (-0.20 if tilted_end[0] < 0 else 0.20),
            tilted_end[1] - 0.42,
            tilted_end[2] - 0.10,
        ),
        0.24,
        0.18,
        metal_blue,
        bevel=0.018,
    )
    add_beam(
        f"Station_Landing_Base_Rail_{brace_index:02d}",
        start,
        (end[0], start[1], start[2]),
        (0.72, 0.58, 0.46)[tier],
        (0.38, 0.32, 0.26)[tier],
        metal_dark,
        bevel=0.040,
    )
for foot_index, (start, _) in enumerate(lower_braces):
    x, y, _ = start
    add_box(
        f"Station_Deck_Anchor_{foot_index:02d}",
        (x, y, -6.88),
        (1.80, 2.20, 0.50),
        metal_dark,
        bevel=0.065,
    )

for side, start_degrees, end_degrees, x in (
    ("Left", 214.0, 234.0, -6.65),
    ("Right", 306.0, 326.0, 6.65),
):
    add_annular_segment(
        f"Station_Landing_Root_{side}",
        5.25,
        6.70,
        math.radians(start_degrees),
        math.radians(end_degrees),
        -0.05,
        2.65,
        metal_dark,
        angular_samples=12,
        bevel=0.085,
    )
    add_annular_segment(
        f"Station_Landing_Root_Face_{side}",
        5.40,
        6.58,
        math.radians(start_degrees + 1.2),
        math.radians(end_degrees - 1.2),
        -0.22,
        -0.03,
        metal_blue,
        angular_samples=10,
        bevel=0.040,
    )
    add_box(
        f"Station_Deck_Anchor_Platform_{side}",
        (x, 1.20, -6.92),
        (4.20, 3.70, 0.62),
        metal_blue,
        bevel=0.10,
    )

# Foreground deck and stepped threshold anchor the portal to the floor plane.
add_box("Station_Deck_Base", (0.0, 1.0, -7.26), (18.0, 6.0, 0.42), metal_dark, bevel=0.08)
add_box("Station_Approach_Deck", (0.0, -7.0, -7.26), (8.0, 10.0, 0.42), metal_dark, bevel=0.08)
for panel_index in range(4):
    add_box(
        f"Station_Approach_Deck_Panel_{panel_index:02d}",
        (0.0, -10.75 + panel_index * 2.50, -7.00 + 0.02 * (panel_index % 2)),
        (7.55, 2.24, 0.12),
        metal_edge if panel_index == 3 else metal_dark,
        bevel=0.025,
    )
for row in range(4):
    for column in range(8):
        add_box(
            f"Station_Deck_Panel_{row:02d}_{column:02d}",
            (-7.70 + column * 2.20, -1.25 + row * 1.45, -7.00 + 0.025 * ((row + column) % 2)),
            (2.00, 1.20, 0.12),
            metal_edge if (row + column) % 7 == 0 else metal_dark,
            bevel=0.025,
        )

# Four broad foreground tiers rise into one large horizontal portal platform.
platform_base_z = -7.05
platform_top_z = -6.20
platform_front_y = -9.50
platform_back_y = 4.10
tier_count = 4
tier_run = 1.0
for tier_index in range(tier_count):
    tier_top_z = -6.90 + (platform_top_z + 6.90) * (tier_index + 1) / tier_count
    tier_width = 7.20 - tier_index * 0.40
    add_box(
        f"Station_Portal_Tier_{tier_index:02d}",
        (
            0.0,
            platform_front_y - tier_run * (tier_count - tier_index - 0.5),
            (platform_base_z + tier_top_z) * 0.5,
        ),
        (tier_width, tier_run + 0.08, tier_top_z - platform_base_z),
        metal_edge if tier_index in {0, tier_count - 1} else metal_dark,
        bevel=0.055,
    )
add_box(
    "Station_Portal_Platform",
    (0.0, (platform_front_y + platform_back_y) * 0.5, (platform_base_z + platform_top_z) * 0.5),
    (6.00, platform_back_y - platform_front_y, platform_top_z - platform_base_z),
    metal_dark,
    bevel=0.075,
)
platform_panel_count = 6
platform_panel_length = (platform_back_y - platform_front_y) / platform_panel_count
for panel_index in range(platform_panel_count):
    add_box(
        f"Station_Portal_Platform_Panel_{panel_index:02d}",
        (0.0, platform_front_y + platform_panel_length * (panel_index + 0.5), platform_top_z + 0.035),
        (5.62, platform_panel_length - 0.12, 0.07),
        metal_edge if panel_index in {0, platform_panel_count - 1} else metal_blue,
        bevel=0.025,
    )

# Three independently readable liner stages replace the old single sidewall.
# Their staggered seams and depth gaps follow the generated exploded assembly.
throat_layers = (
    ("Front_Liner", 24, 3.34, 3.72, -0.12, 0.72, 0.70),
    ("Maintenance_Liner", 20, 3.26, 3.54, 0.65, 1.75, 0.92),
    ("Rear_Lock_Frame", 16, 3.18, 3.42, 1.65, 3.20, 1.10),
)
for layer_index, (layer_name, count, inner, outer, front, back, gap_degrees) in enumerate(throat_layers):
    step = math.tau / count
    gap = math.radians(gap_degrees)
    for index in range(count):
        if layer_index == 1 and index % 9 == 4:
            continue
        add_annular_segment(
            f"Gate_Inner_Throat_{layer_name}_{index:02d}",
            inner + 0.025 * (index % 2),
            outer - 0.020 * (index % 3),
            index * step + gap,
            (index + 1) * step - gap,
            front + 0.025 * (index % 3),
            back - 0.035 * (index % 2),
            metal_edge if (index + layer_index) % 7 == 0 else (metal_blue if layer_index == 1 else metal_dark),
            angular_samples=7,
            bevel=0.020 if layer_index < 2 else 0.032,
        )

# Longitudinal service ribs and separate front/rear locks make the inward
# tunnel depth visible instead of reading as a painted black aperture.
for index in range(16):
    angle = math.tau * index / 16.0 + math.radians(2.0)
    add_block(
        f"Gate_Inner_Throat_Service_Rib_{index:02d}",
        angle,
        3.38,
        (0.16, 3.00, 0.22 + 0.04 * (index % 3)),
        1.35,
        metal_edge if index % 4 == 0 else metal_dark,
        bevel=0.018,
    )
for index in range(12):
    angle = math.tau * index / 12.0 + math.radians(5.0)
    add_block(
        f"Gate_Blast_Shutter_Rail_Lock_{index:02d}",
        angle,
        3.62,
        (0.30, 0.48, 0.34),
        -0.16,
        metal_edge,
        bevel=0.035,
    )
    add_block(
        f"Gate_Rear_Lock_Housing_{index:02d}",
        angle + math.radians(1.8),
        3.26,
        (0.40, 0.72, 0.42),
        2.72,
        metal_blue if index % 5 == 0 else metal_dark,
        bevel=0.052,
    )
for index in range(12):
    start = math.radians(index * 30.0 + 4.0)
    add_arc(
        f"Gate_Inner_Throat_Cable_Duct_{index:02d}",
        3.26 + 0.035 * (index % 2),
        start,
        start + math.radians(18.0),
        0.62 + 0.72 * (index % 2),
        metal_warm if index % 4 == 0 else metal_edge,
        thickness=0.018,
        samples=18,
    )

# Short exposed cable runs and vent banks supply a second, smaller detail scale.
for cable_index in range(24):
    start = math.radians(4.0 + cable_index * 15.0)
    radius = 5.16 + 0.18 * (cable_index % 3)
    add_arc(
        f"Gate_Service_Cable_{cable_index:02d}",
        radius,
        start,
        start + math.radians(5.5 + cable_index % 4),
        -0.56 - 0.025 * (cable_index % 2),
        metal_warm if cable_index % 8 == 0 else metal_edge,
        thickness=0.014 + 0.003 * (cable_index % 3),
        samples=12,
    )

for bank_index, degrees in enumerate((18, 52, 96, 138, 208, 244, 304, 338)):
    for slot_index in range(4):
        add_block(
            f"Gate_Vent_{bank_index:02d}_{slot_index}",
            math.radians(degrees + (slot_index - 1.5) * 1.2),
            5.52,
            (0.055, 0.09, 0.34),
            -0.62,
            metal_edge,
            bevel=0.009,
        )

# Fine facade ribs, inset plates and fasteners remain readable in the hero crop.
for index in range(36):
    if index % 9 == 4:
        continue
    angle = math.tau * index / 36.0 + math.radians(1.0 + (index % 3) * 0.35)
    add_block(
        f"Gate_Facade_Rib_{index:02d}",
        angle,
        5.42,
        (0.13 + 0.04 * (index % 4 == 0), 0.24, 0.56 + 0.10 * (index % 5 == 0)),
        -0.60 - 0.04 * (index % 4 == 0),
        metal_edge if index % 9 else metal_warm,
        bevel=0.022,
    )

for index in range(16):
    if index % 7 == 5:
        continue
    angle = math.tau * index / 16.0 + math.radians((index % 3) * 0.8)
    add_block(
        f"Gate_Inner_Tooth_{index:02d}",
        angle,
        3.78,
        (0.16 + 0.055 * (index % 3), 0.34, 0.26 + 0.08 * (index % 2)),
        -0.48 - 0.04 * (index % 4 == 0),
        metal_blue if index % 7 else metal_warm,
        bevel=0.025,
    )

for index in range(18):
    start = math.radians(7.0 + index * 20.0)
    add_arc(
        f"Gate_Cold_Slit_{index:02d}",
        5.68,
        start,
        start + math.radians(9.0),
        -0.56,
        glow_blue,
        thickness=0.022,
        samples=18,
    )
    if index % 3 == 0:
        add_arc(
            f"Gate_Warm_Slit_{index:02d}",
            4.72,
            start + math.radians(4.0),
            start + math.radians(10.0),
            -0.54,
            glow_warm,
            thickness=0.025,
            samples=14,
        )

for index in range(10):
    angle = math.tau * index / 10.0 + math.radians(8.0)
    add_block(
        f"Gate_Lock_Housing_{index:02d}",
        angle,
        5.94,
        (0.54, 1.24, 0.68),
        -0.18,
        metal_dark,
        bevel=0.08,
    )
    add_block(
        f"Gate_Lock_Core_{index:02d}",
        angle,
        5.62,
        (0.20, 0.14, 0.24),
        -0.60,
        glow_warm if index in {0, 1, 7, 8, 9} else glow_blue,
        bevel=0.028,
    )

bolt_mesh = make_bolt_mesh("Gate_Bolt_Mesh", 0.045, 0.12, metal_edge, segments=12)
warm_bolt_mesh = make_bolt_mesh("Gate_Warm_Bolt_Mesh", 0.05, 0.13, metal_warm, segments=12)
add_bolt_ring("Gate_Inner_Bolt", bolt_mesh, 4.16, -0.58, 48)
add_bolt_ring("Gate_Outer_Bolt", bolt_mesh, 5.76, -0.50, 32, angle_offset=math.radians(2.5))
add_bolt_ring("Gate_Warm_Bolt", warm_bolt_mesh, 4.78, -0.54, 18, angle_offset=math.radians(5.0))

for obj in scene.objects:
    if obj.type in {"MESH", "CURVE"}:
        obj.location.y *= GATE_DEPTH_SCALE
        obj.scale.y *= GATE_DEPTH_SCALE
        obj["asset_role"] = "stellar-gate-model"

assembly_layers = (
    (
        "01_FRONT_ARMOR",
        (
            "Gate_Tier_",
            "Gate_Outer_Shroud_",
            "Gate_Front_Armor_Cassette_",
            "Gate_Outer_Machined_Rail",
            "Gate_Outer_Cold_Rail",
            "Gate_Mid_Recess_",
            "Gate_Vent_",
            "Gate_Facade_Rib_",
            "Gate_Cold_Slit_",
            "Gate_Warm_Slit_",
            "Gate_Lock_",
            "Gate_Inner_Bolt",
            "Gate_Outer_Bolt",
            "Gate_Warm_Bolt",
        ),
    ),
    ("02_APERTURE_LIP", ("Gate_Aperture_Lip_", "Gate_Inner_Tooth_")),
    ("03_ENERGY_CONDUIT", ("Gate_Energy_Conduit",)),
    ("04_INNER_THROAT", ("Gate_Inner_Throat_", "Gate_Blast_Shutter_", "Gate_Rear_Lock_")),
    ("05_SERVICE_RING", ("Gate_Service_Ring_", "Gate_Service_Bay_", "Gate_Service_Cable_")),
    ("06_LOAD_FRAME", ("Gate_Load_Frame_",)),
    ("07_REAR_SHELL", ("Gate_Rear_Shell_",)),
    ("LEFT_BRIDGE", ("Station_Left_Cantilever_",)),
    ("LOWER_SUPPORT", ("Station_Landing_",)),
    (
        "DECK_ANCHOR",
        (
            "Station_Deck_Anchor_",
            "Station_Deck_Base",
            "Station_Deck_Panel_",
            "Station_Approach_Deck",
            "Station_Portal_",
        ),
    ),
)
for obj in scene.objects:
    if obj.type not in {"MESH", "CURVE"}:
        continue
    for layer_name, prefixes in assembly_layers:
        if obj.name.startswith(prefixes):
            obj["assembly_layer"] = layer_name
            break

tilt_root = bpy.data.objects.new("Gate_Tilt_Root", None)
scene.collection.objects.link(tilt_root)
tilt_root.location = GATE_TILT_PIVOT + GATE_VERTICAL_OFFSET
for obj in list(scene.objects):
    follows_gate = (
        obj.name.startswith("Gate_")
        or obj.name.startswith("Station_Left_Cantilever_")
        or obj.name.startswith("Station_Landing_Root_")
    )
    if obj.type not in {"MESH", "CURVE"} or not follows_gate:
        continue
    world_matrix = obj.matrix_world.copy()
    obj.parent = tilt_root
    obj.matrix_parent_inverse = Matrix.Identity(4)
    obj.matrix_basis = Matrix.Translation(-GATE_TILT_PIVOT) @ world_matrix
tilt_root.rotation_euler.x = math.radians(GATE_TILT_DEGREES)
tilt_root["tilt_degrees"] = GATE_TILT_DEGREES
tilt_root["pivot"] = tuple(GATE_TILT_PIVOT)
tilt_root["vertical_offset"] = tuple(GATE_VERTICAL_OFFSET)

assert math.isclose(math.degrees(tilt_root.rotation_euler.x), GATE_TILT_DEGREES, abs_tol=0.01)
assert len([obj for obj in scene.objects if obj.name.startswith("Station_Portal_Tier_")]) == tier_count

bpy.context.view_layer.update()
seen_meshes: set[int] = set()
for obj in scene.objects:
    if obj.type != "MESH" or not any(
        material and material.get("armor_steel") for material in obj.data.materials
    ):
        continue
    mesh_key = obj.data.as_pointer()
    if mesh_key not in seen_meshes:
        build_dominant_axis_uv(obj)
        seen_meshes.add(mesh_key)
    if all(path.exists() for path in ARMOR_MAP_PATHS.values()) and needs_render_displacement(obj.name):
        add_render_displacement(obj)

camera_data = bpy.data.cameras.new("Gate_Camera")
camera = bpy.data.objects.new("Gate_Camera", camera_data)
bpy.context.scene.collection.objects.link(camera)
camera.location = (5.8, -13.0, -5.00)
camera_data.lens = 28.0
camera_data.shift_x = -0.220
camera_data.shift_y = -0.035
point_camera(camera, Vector(gate_tilt_point((0.0, 0.0, 1.0))))
scene.camera = camera

add_area_light("Gate_Key_Cold", (-7.0, -10.0, 7.5), (0.12, 0.34, 1.0), 720.0, 6.0)
add_area_light("Gate_Fill_Warm", (8.0, -8.0, -3.5), (1.0, 0.18, 0.045), 480.0, 5.0)
add_area_light("Gate_Rim", (1.0, 2.0, 8.0), (0.20, 0.42, 1.0), 900.0, 4.0)
add_area_light("Gate_Front_Softbox", (-12.0, -20.0, 1.5), (0.72, 0.82, 1.0), 1050.0, 10.0)
add_area_light("Gate_Deck_Softbox", (0.0, -8.0, 4.0), (0.65, 0.74, 0.88), 480.0, 9.0)
bridge_key = add_area_light("Gate_Bridge_Cold", (-11.0, -15.0, 0.5), (0.10, 0.32, 1.0), 680.0, 5.0)
point_camera(bridge_key, Vector(gate_tilt_point((-4.8, 0.0, -1.0))))

scene.render.engine = "CYCLES"
scene.cycles.samples = 128
scene.cycles.use_adaptive_sampling = True
scene.cycles.adaptive_threshold = 0.015
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 6
scene.cycles.diffuse_bounces = 2
scene.cycles.glossy_bounces = 4
scene.cycles.transmission_bounces = 2
scene.cycles.transparent_max_bounces = 4
scene.render.resolution_x = 1600
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.film_transparent = True
scene.render.filepath = str(PREVIEW_PATH)
scene.render.image_settings.color_depth = "16"
scene.view_settings.look = "AgX - Medium High Contrast"
scene.world.color = (0.002, 0.004, 0.012)
scene["dcc_mcp_pipeline"] = "Blender reference-aligned stellar gate model"
scene["reference_frame"] = "dcc-mcp-hero-stargate-v2-source.png"
scene["camera_target_normalized"] = "0.73,0.50"

bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH))

BUILD_RESULT = {
    "blend": str(BLEND_PATH),
    "modeled_objects": len([obj for obj in scene.objects if obj.type in {"MESH", "CURVE"}]),
}
