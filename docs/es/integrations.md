---
title: "Integraciones con aplicaciones de creación"
description: "Encuentra el adaptador MCP, el identificador de la CLI y el repositorio oficial de tu aplicación de creación."
pageClass: integrations-page
outline: [2, 3]
---

# Integraciones con aplicaciones de creación

DCC-MCP conecta a los agentes de IA con el software de creación de contenido digital que su equipo ya utiliza. Este directorio asigna cada aplicación compatible a su repositorio de adaptadores oficial, así como a los términos de búsqueda comunes que utilizan las personas, entre ellos **Maya MCP**, **Blender MCP**, **Houdini MCP**, **3ds Max MCP**, **Substance Painter MCP** y **SP MCP**.

Utilice la [página oficial](https://clawhub.ai/loonghao/skills/dcc-mcp) para operar un DCC conectado. Utilice el [Skill Marketplace](/es/marketplace) para encontrar extensiones para el flujo de trabajo. Además, utilice [`dcc-mcp-cli dcc-types`](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference) para examinar el catálogo de versiones disponibles en tiempo real.

## Directorio oficial de DCC MCP

La tabla recoge una selección de integraciones. El catálogo de Core 0.20.39 incluye 38 identificadores de adaptadores, entre ellos Wwise. Consulta el catálogo instalado con `dcc-mcp-cli dcc-types`. [Directorio de proyectos DCC-MCP](/es/ecosystem)

| Aplicación | Términos de búsqueda comunes | Integración oficial |
| --- | --- | --- |
| 3ds Max | 3ds Max MCP, 3dsmax MCP | [dcc-mcp-3dsmax](https://github.com/dcc-mcp/dcc-mcp-3dsmax) |
| After Effects | After Effects MCP, AE MCP | [dcc-mcp-aftereffects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) |
| Blender | Blender MCP | [dcc-mcp-blender](https://github.com/dcc-mcp/dcc-mcp-blender) |
| Godot | Godot MCP | [dcc-mcp-godot](https://github.com/dcc-mcp/dcc-mcp-godot) |
| Houdini | Houdini MCP | [dcc-mcp-houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) |
| Katana | Katana MCP | [dcc-mcp-katana](https://github.com/dcc-mcp/dcc-mcp-katana) |
| Maya | Maya MCP, Autodesk Maya MCP | [dcc-mcp-maya](https://github.com/dcc-mcp/dcc-mcp-maya) |
| Marmoset Toolbag | Marmoset MCP, Toolbag MCP | [dcc-mcp-marmoset](https://github.com/dcc-mcp/dcc-mcp-marmoset) |
| MotionBuilder | MotionBuilder MCP, MoBu MCP | [dcc-mcp-mobu](https://github.com/dcc-mcp/dcc-mcp-mobu) |
| Nuke | Nuke MCP | [dcc-mcp-nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) |
| OpenUSD | OpenUSD MCP, USD MCP | [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) |
| Photoshop | Photoshop MCP, Adobe Photoshop MCP | [dcc-mcp-photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) |
| Premiere Pro | Premiere MCP, Premiere Pro MCP | [dcc-mcp-premiere](https://github.com/dcc-mcp/dcc-mcp-premiere) |
| RenderDoc | RenderDoc MCP | [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) |
| Flow Production Tracking | ShotGrid MCP, Flow Production Tracking MCP | [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) |
| Substance 3D Designer | Substance Designer MCP, SD MCP | [dcc-mcp-substance3d-designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) |
| Substance 3D Painter | Substance 3D Painter MCP, Substance Painter MCP, SP MCP | [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) |
| Unity | Unity MCP | [dcc-mcp-unity](https://github.com/dcc-mcp/dcc-mcp-unity) |
| Unreal Engine | Unreal MCP, Unreal Engine MCP | [dcc-mcp-unreal](https://github.com/dcc-mcp/dcc-mcp-unreal) |
| Wwise | Wwise MCP, audio MCP | [dcc-mcp-wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) |
| ZBrush | ZBrush MCP | [dcc-mcp-zbrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) |

## Búsquedas comunes de DCC MCP

### ¿Existe un título de MCP de los Maya?

Sí. La integración oficial [Maya MCP](https://github.com/dcc-mcp/dcc-mcp-maya) conecta Autodesk Maya con el DCC-MCP Gateway. Utilice la búsqueda de texto y el flujo de llamadas para descubrir las herramientas disponibles en la instancia de Maya conectada.

### ¿Existe un Blender MCP?

Si. La integración oficial de [Blender con DCC-MCP](https://github.com/dcc-mcp/dcc-mcp-blender) conecta Blender al mismo Gateway y admite el uso compartido de contratos de descubrimiento, validación y flujo de trabajo en DCC-MCP.

### ¿Existe un Houdini MCP?

Sí. La integración oficial [Houdini MCP](https://github.com/dcc-mcp/dcc-mcp-houdini) proporciona el repositorio y la implementación específica del host para SideFX Houdini.

### ¿Qué significa SP MCP?

**SP MCP** es una abreviatura común para **Substance Painter MCP**. El nombre oficial es **Substance 3D Painter MCP**, proporcionado por el repositorio [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter). Utilice ese repositorio y el DCC-MCP Marketplace cuando necesite trabajar con procesos de pintura de texturas.

### ¿Cómo puedo encontrar una herramienta DCC MCP?

Instala la Skill pública de DCC-MCP y comprueba el Gateway con `dcc-mcp-cli health`. Limita la búsqueda con `dcc-mcp-cli search --query <intent> --dcc-type <host>` y sigue el `next_step` devuelto. Consulta en el repositorio del adaptador los requisitos de instalación y compatibilidad.

## Continúe.

- [Utilice DCC-MCP desde un agente.](/es/agents)
- [Busque en el mercado de habilidades.](/es/marketplace)
- [Entienda el modelo de producción.](/es/why-dcc-mcp)
- [Navegue por todo el ecosistema completo.](/es/ecosystem)
