---
title: "Directorio de proyectos DCC-MCP"
description: "Consulta el propósito, el estado y el repositorio de cada adaptador, Skill, proveedor de recursos y servicio de generación."
pageClass: ecosystem-directory
outline: [2, 2]
---

# Directorio de proyectos DCC-MCP

Este directorio enumera herramientas creativas para agentes de AI y sistemas de automatización. DCC se refiere a la creación de contenido digital. Comience con la guía de flujo de trabajo de la habilidad pública [`dcc-mcp`](https://clawhub.ai/loonghao/skills/dcc-mcp). Luego, elija el adaptador o extensión adecuado para su tarea. Cada proyecto describe cómo se instala, cuál es su compatibilidad y las API que utiliza. Core documenta la infraestructura de conexión e invocación compartida. Una herramienta tipo “tipo” define sus parámetros, sus tipos y los resultados obtenidos; de esta manera, se puede inspeccionar y validar las llamadas realizadas.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>Operar con software creativo.</strong><span>Habilidad en dcc-mcp</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Construya un adaptador.</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Construye una habilidad.</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## Infraestructura compartida y herramientas de desarrollo

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) – Puente compartido, interfaz de línea de comandos, entorno de ejecución MCP/REST, funciones de seguridad, diagnóstico y capacidad de observación.
- [dcc-mcp-runtime](https://github.com/dcc-mcp/dcc-mcp-runtime) – Tiempo de ejecución compartido con Python, así como el contrato de manifestación para los adaptadores DCC-MCP externos.
- [Búsqueda en el mercado](/es/marketplace) – Realiza búsquedas en el catálogo oficial de extensiones utilizadas por `dcc-mcp-cli`; [Fuente del catálogo](https://github.com/dcc-mcp/marketplace).
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) – Integración con Autodesk Flow Production Tracking.
- [fpt-cli](https://github.com/dcc-mcp/fpt-cli) – Una interfaz de línea de comandos en Rust que prioriza la automatización, diseñada para el uso en Autodesk Flow Production Tracking.
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) – Flujos de trabajo y intercambio de habilidades relacionadas con OpenUSD.
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) – Intercambio de materiales para el desarrollo de MaterialX.
- [dcc-lookdev](https://github.com/dcc-mcp/dcc-lookdev) – Flujos de trabajo estandarizados para el desarrollo de interfaces PBR en diferentes sistemas de comunicación.
- [dcc-modeling-spec](https://github.com/dcc-mcp/dcc-modeling-spec) – Especificaciones de modelado neutrales para hostes, versión 2. Estas especificaciones se refieren a las puertas y los artefactos necesarios para los flujos de trabajo en Maya, Blender, Houdini y 3ds Max.
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) – Manifiestos de publicación portátiles para DCC, USD, granjas de renderización y flujos de trabajo de seguimiento.
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) – Flujos de trabajo de texturas deterministas utilizando OpenImageIO y OpenColorIO.
- [dcc-itchio](https://github.com/dcc-mcp/dcc-itchio) – Habilidades para la adquisición segura de activos en itch.io y para la publicación de juegos bajo condiciones de previsualización.
- [dcc-media-enhance](https://github.com/dcc-mcp/dcc-media-enhance) – Orquestación en Rust, con enfoque “Agent-first”, para el procesamiento de datos de medios con límites definidos. Utiliza backend’s instalados para el procesamiento y mejora de los datos de medios.
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) – Herramienta de análisis de cachés, independiente del host, y que garantiza la privacidad durante el proceso de análisis. No existe ningún paquete adaptador o disponible en PyPI.
- [mcpcall](https://github.com/dcc-mcp/mcpcall) – Herramienta CLI para listar y llamar a las herramientas del servidor MCP, a través de stdio o Streamable HTTP.
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) – Herramienta para capturar y reproducir automáticamente los documentos que se están generando durante el proceso de renderización.
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) – Captura y análisis de datos por parte de Tracy Frame-Profiler.

## DCC y adaptadores de aplicaciones creativas

Para las preguntas relacionadas con el control en lenguaje natural y para los prompts seguros del agente, se debe comenzar con las [guías de control AI específicas para cada aplicación](/es/use-cases). Luego, se puede utilizar el repositorio de adaptadores vinculado como fuente de información para la instalación y los detalles del host.

El catálogo remoto firmado, verificado por la CLI oficial 0.20.39, enumera 38 identificadores de adaptadores. La instalación del catálogo está disponible para 33 de ellos; `kdenlive`, `material-maker`, `powerpoint`, `tiled` y `wwise` tienen el valor `catalog_install_available=false`. Una definición de catálogo o una versión independiente de adaptador no implica que el host en vivo esté listo para uso o que haya sido aceptado para su uso en producción.

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) – Autodesk 3ds Max.
- [3D Slicer](https://github.com/dcc-mcp/dcc-mcp-slicer) – Volúmenes sintéticos con límites definidos, fantomas de materiales, y mallas de esferas que pueden ser exportadas en formato NRRD/STL. También incluye funcionalidades para el procesamiento de escenas en formato MRB, configuración de cámaras y cortes, así como vista previa en formato PNG. Solo se utilizan datos sintéticos; no se incluyen datos del paciente, importación de archivos DICOM, información clínica o carga de escenas arbitrarias. La fuente de datos está vinculada a Core y al servidor 0.20.41. La requalificación nativa aún está en proceso. No se encuentra ningún identificador de adaptador en el catálogo, según lo verificado por CLI 0.20.39.
- [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) — Adobe After Effects.
- [AutoCAD](https://github.com/dcc-mcp/dcc-mcp-autocad) – Automatización de archivos DWG de forma portátil, a través de COM y el uso de `accoreconsole.exe`. Consulte el repositorio correspondiente para verificar la disponibilidad y las instrucciones de configuración actuales.
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) – Es un complemento para Blender, además de ser un servidor integrado en el programa.
- [CapCut](https://github.com/dcc-mcp/dcc-mcp-capcut) – Se utiliza el adaptador de escritorio de CapCut, mediante una conexión local autenticada.
- [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) – Documento sin formato definido, con funciones de intercambio de datos, automatización de procesos de renderización, etc.
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) – Realiza validación de nodos en tiempo real, ejecución de procesos en colas limitadas y recuperación de artefactos. La [guía de ComfyUI MCP](/es/control/comfyui) aborda temas relacionados con la interfaz de usuario del juego, formatos PNG transparentes, así como archivos GLB generados con Pixal3D/PBR. También se detalla cómo se distribuye el código fuente en comparación con el archivo de salida final.
- [Epic Games Launcher y Fab](https://github.com/dcc-mcp/dcc-mcp-epic) – Se lanzó de forma independiente la versión 0.2.1 ([Fuente del lanzamiento](https://github.com/dcc-mcp/dcc-mcp-epic/tree/1157defe203aab4beaa8f7be56f8063caac2a415)). Esta versión incluye funcionalidades como el inventario de motores instalados, las verificaciones de proyectos, y las operaciones realizadas por los proveedores vinculados a Fab. No se trata de un identificador de adaptador en el catálogo que es verificado por la herramienta CLI 0.20.39. La instalación del motor sigue siendo una opción planificada, sin un proveedor nativo verificado. El inicio de sesión, las compras y la aceptación de licencias siguen siendo funciones manejadas por el usuario humano. Consulte la [guía de control de Epic Games](/es/control/epic-games).
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) – Modelado CAD paramétrico, validación de topologías y intercambio de mallas.
- [Gaea](https://github.com/dcc-mcp/dcc-mcp-gaea) – Versión independiente, v0.1.1 ([Fuente de la versión](https://github.com/dcc-mcp/dcc-mcp-gaea/tree/b95d3f81b8f883732c73d268658100d09d9cad84)). Permite realizar trabajos de construcción en terrenos tipo “Build Swarm” y verificar los resultados obtenidos. No se trata de un identificador de adaptadores, ya que no está registrado en el catálogo verificado por la CLI 0.20.39. Las construcciones con licencia real, la cancelación de árboles de procesos, la calidad del terreno y las importaciones desde Unreal siguen sin estar verificadas. Consulte la [guía de control de Gaea](/es/control/gaea).
- [GameMaker](https://github.com/dcc-mcp/dcc-mcp-gamemaker) – Adaptador para GameMaker. No se trata de un identificador de adaptador en el catálogo revisado por CLI 0.20.39.
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) – GIMP 3.
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) – El Motor de Godot y las habilidades necesarias para crear juegos 2D.
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) – SideFX Houdini.
- [Ilustrador](https://github.com/dcc-mcp/dcc-mcp-illustrator) – Se trata de documentos escritos en Adobe Illustrator, diseños vectoriales, edición oficial de datos DOM, y exportación de productos finales.
- [Inkscape](https://github.com/dcc-mcp/dcc-mcp-inkscape) – La integración de la fuente de datos, fuera del catálogo, no está verificada por CLI 0.20.39. El flujo de trabajo de producción en la nube sigue bloqueado debido a la validación de la procedencia de los datos; véase el [registro de prueba de la nube](/es/cloud-agents#cloud-mcp-tests).
- [Katana](https://github.com/dcc-mcp/dcc-mcp-katana) – Foundry Katana.
- [Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive) — Permite la creación de proyectos, renderización con MLT y control de editor compartido DCC-CUA. El repositorio ha lanzado independientemente la versión 0.1.1 ([fuente del lanzamiento](https://github.com/dcc-mcp/dcc-mcp-kdenlive/tree/376c812047b308239174aa1bbb662da1908f829e)); el catálogo verificado por la CLI 0.20.39 lista `kdenlive` en la versión 0.1.0 con `catalog_install_available=false`. Este verificación del catálogo no incluyó la aceptación del editor o la renderización en tiempo real. Consulte la [guía de control de Kdenlive](/es/control/kdenlive).
- [KiCad](https://github.com/dcc-mcp/dcc-mcp-kicad) – Es una herramienta para crear placas de circuito impreso en KiCad 9, utilizando la API nativa `pcbnew` y `kicad-cli`. Esta herramienta maneja la placa de forma independiente, sin necesidad de conectarse al editor de placas de circuito impreso ni proporcionar control a través de interfaces gráficas. La fuente de código está vinculada a Core y al servidor 0.20.41; se espera que haya una nueva calificación de la herramienta en el futuro. No hay lanzamiento oficial, y no existe ningún identificador de adaptador en el catálogo, según lo confirmado por CLI 0.20.39.
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) – Krita.
- [LiquiGen](https://github.com/dcc-mcp/dcc-mcp-liquigen) — Inspección de grafo de nudos, controles de simulación limitados, exportación de datos VAT y transferencia a Unreal Engine; listado como `liquigen` en el catálogo verificado por CLI 0.20.39.
- [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) – Proyectos de la empresa Foundry, geometría, gráficos de nodos, desarrollo del aspecto visual y exportación de texturas.
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) – Es el proceso de creación de materiales. El catálogo revisado por CLI 0.20.39 indica que la versión disponible es 0.3.1, y que la opción `catalog_install_available=false` está activada.
- [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) – Autodesk Maya.
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) – Creación de materiales PBR, inspección de escenas y renderizado.
- [Marvelous Designer](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer) – Versión independiente, v0.1.1 ([Fuente de la versión](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer/tree/4d4d289905f82290804b288d03d84d541b01af08)). Permite operaciones de tipo “teclado”, simulación, guardado y exportación de datos. No se trata de un identificador de adaptador, como se indica en el catálogo, según lo verificado por CLI 0.20.39. Las funcionalidades como licencia de host, inicio del proceso de simulación de telas y manejo de datos entre diferentes sistemas siguen siendo pendientes de desarrollo. Consulte la [guía de uso de Marvelous Designer](/es/control/marvelous-designer).
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) – Autodesk MotionBuilder.
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) – Foundry Nuke.
- [OBS Studio](https://github.com/dcc-mcp/dcc-mcp-obs) — Control de inspección de escenas y fuentes con procesamiento exacto, y control de grabación por teclado; lista como `obs` en el catálogo verificado con CLI 0.20.39. La instalación del adaptador no incluye la instalación de OBS Studio.
- [Office](https://github.com/dcc-mcp/dcc-mcp-office) — Ruta de aplicación compartida `office`: protocolo office-rpc/1, sidecar C# COM, trabajador Open XML, conector Microsoft Graph y habilidades comunes a toda la suite Office. Esta ruta compartida está separada de los 38 identificadores de adaptadores reportados por CLI 0.20.39; la disponibilidad específica de cada aplicación sigue siendo responsabilidad de cada adaptador.
- [PowerPoint](https://github.com/dcc-mcp/dcc-mcp-powerpoint) – Generación de presentaciones desde Deck IR, mediante la compilación en formato Open XML y la renderización en el entorno de escritorio COM. El catálogo verificado con CLI 0.20.39 indica que la versión es 0.1.0, y que la opción `catalog_install_available=false`.
- [Word](https://github.com/dcc-mcp/dcc-mcp-word) – Documentos en formato Word, campos de datos y mecanismos de reordenación de contenido. Está en fase de desarrollo; el repositorio del adaptador sigue siendo un lugar temporal, sin ningún tipo de lanzamiento oficial.
- [Excel](https://github.com/dcc-mcp/dcc-mcp-excel) – Libros de trabajo, fórmulas, gráficos y paneles de control de producción. Está en proceso de desarrollo; el repositorio del adaptador sigue siendo un lugar temporal, sin ningún lanzamiento definitivo.
- [Outlook](https://github.com/dcc-mcp/dcc-mcp-outlook) – Borradores de correo y calendario (planeado, Fase 3); clasificado como `host_limited`. Se trata de una solución que utiliza Outlook instalado localmente, a través de MAPI/COM. Este sistema requiere el consentimiento del usuario al momento de la primera ejecución. Por lo tanto, no existe una ruta de acceso sin interacción con el usuario. No puede ser verificado en el proceso de prueba, y está exento de las verificaciones necesarias para su implementación. Un enfoque basado en Microsoft Graph sería la condición previa para lograr una ruta de implementación verificable.
- [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) – Herramienta para la validación de diseños CAD paramétricos, renderizado preliminar y exportación de mallas.
- [OpenScreen](https://github.com/dcc-mcp/dcc-mcp-openscreen) – Versión independiente, versión 0.1.1 ([Fuente de la versión](https://github.com/dcc-mcp/dcc-mcp-openscreen/tree/5a32837d9d1b3bd2aea04bf61e61b4a54bbd5262)). Incluye funciones como “`sources`”, “`record`” y “`export`”. No se trata de un identificador de adaptador, sino que forma parte del catálogo de controladores verificado por la CLI 0.20.39. Las pruebas de fuentes no garantizan la compatibilidad con grabaciones en Windows. La selección de ventanas no es compatible con esta versión; esto queda a cargo de dcc-cua y ui-control. Consulte la [guía de uso del controlador OpenScreen](/es/control/openscreen).
- [ParaView](https://github.com/dcc-mcp/dcc-mcp-paraview) – Pipes de ParaView persistentes: primitivas limitadas, clips y cortes de planos, extracción de contornos, exportación de datos verificados, guardado de estados de PVSM, y vistas previas en formato PNG. La fuente de datos está fijada en Core y en el servidor 0.20.41. No hay lanzamiento público del producto; además, no existe ningún identificador de adaptador en el catálogo, como se verifica con la CLI 0.20.39.
- [PhotoCraft](https://github.com/dcc-mcp/dcc-mcp-photocraft) – Es un adaptador experimental para el motor sin pantalla oficial de PhotoCraft 0.2.0. Este adaptador cuenta con un proceso stdio dedicado a la gestión de documentos, capas, máscaras, selecciones, ajustes, vistas previas y exportaciones. No incluye ninguna aplicación adicional y no abre ninguna ventana en el escritorio. No se encuentra entre los adaptadores identificados en el catálogo, según lo verificado por CLI 0.20.39.
- [PdfCraft](https://github.com/dcc-mcp/dcc-mcp-pdfcraft) – Es un adaptador de PdfCraft. No se trata de un identificador de adaptadores, según lo verificado en el catálogo por CLI 0.20.39.
- [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) – Adobe Photoshop, a través de UXP.
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) – Adobe Premiere Pro.
- [QGIS](https://github.com/dcc-mcp/dcc-mcp-qgis) – Proyecto de QGIS con edición de vectores, desarrollado a través de MCP. Se trata de un proceso PyQGIS sin interfaz gráfica, propiedad del adaptador. No se conecta a una sesión de escritorio de QGIS en ejecución. La fuente del código está fijada en la versión 0.20.41; se requiere una revalidación nativa del código. No existe ningún paquete en PyPI ni versión publicada en GitHub. Tampoco hay identificador de adaptador en el catálogo verificado por la CLI 0.20.39.
- [REAPER](https://github.com/dcc-mcp/dcc-mcp-reaper) – Es un adaptador para REAPER DAW. No se trata de un identificador de adaptador, según lo verificado en el catálogo por CLI 0.20.39.
- [RizomUV](https://github.com/dcc-mcp/dcc-mcp-rizomuv) – Proceso de desenrollado y empaquetado de datos UV sin unidad central de control. No se trata de un identificador de adaptador, según lo verificado en el catálogo por CLI 0.20.39.
- [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) – Permite la creación de modelos, la selección de materiales, la asignación de etiquetas, la validación de los datos y la intercambio de información, todo ello a través de una conexión autenticada en Ruby.
- [Shōgun](https://github.com/dcc-mcp/dcc-mcp-shogun) – Herramientas oficiales del SDK para manejar objetos de escena, atributos, canales, cámaras ópticas, archivos, control de la línea de tiempo, así como configuraciones y operaciones relacionadas con el procesamiento en modo offline. Descubre las herramientas disponibles en la versión en vivo antes de comenzar a utilizarlas.
- [SpeedTree](https://github.com/dcc-mcp/dcc-mcp-speedtree) – Versión independiente v0.1.1 ([Fuente de la versión](https://github.com/dcc-mcp/dcc-mcp-speedtree/tree/595f0bd308aa0f4f0635a399c2b63bd76f16caf8)). Ofrece capacidades de conexión entre instancias exactas y enlaces oficiales. No se trata de un identificador de adaptador, como se verifica en el catálogo de CLI 0.20.39. Se ha verificado que funciona correctamente en Unreal Engine 5.5.4. Sin embargo, la escala de colisión y el viento dinámico aún no han sido verificados. Para más información, consulte el [guía de SpeedTree MCP](/es/control/speedtree).
- [DaVinci Resolve](https://github.com/dcc-mcp/dcc-mcp-resolve) – Es un adaptador de DaVinci Resolve para el manejo de proyectos, conjuntos de medios, líneas de tiempo y galerías de imágenes. No se trata de un identificador de adaptador en el catálogo que es verificado por CLI 0.20.39.
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) – Adobe Substance 3D Designer.
- [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) – Adobe Substance 3D Painter.
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) – Editor de mapas Tiled. El catálogo revisado por CLI 0.20.39 indica que la versión disponible es 0.3.0, con el valor `catalog_install_available=false`.
- [Tracy Profiler](https://github.com/dcc-mcp/dcc-mcp-tracy) – Es un adaptador lanzado de forma independiente, versión 0.2.5 ([Fuente del lanzamiento](https://github.com/dcc-mcp/dcc-mcp-tracy/tree/a5e29b7bcef28ccd6a2ee17667dbdbcb7c45b119)). Se utiliza para la captura de datos de forma limitada y para el análisis en zonas fuera de línea. No se trata de un identificador de adaptador en el catálogo de herramientas verificado por CLI 0.20.39. Para utilizarlo, es necesario que el objetivo esté ya equipado con los instrumentos necesarios para el análisis. Consulte la [guía de uso de Tracy Profiler](/es/control/tracy).
- [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) – Una versión derivada de TouchDesigner.
- [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) – Editor de Unity y habilidades para la creación de juegos.
- [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) – Plugin de Unreal Engine.
- [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) – Esquema de creación de contenido en Wwise, utilizando herramientas WAAPI. El catálogo verificado con CLI 0.20.39 indica que la versión utilizada es 0.1.2, con el valor `catalog_install_available=false`.
- [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) – Maxon ZBrush.

## Habilidades especializadas de los mayas

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) – Flujos de trabajo relacionados con el ajuste del esqueleto avanzado.
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) – Integración con mGear Shifter.
- [Arquitectura procedural](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) – Flujos de trabajo de arquitectura en Maya, Bifrost y Arnold.

## Servicios de generación

Para la generación local, consulte el [flujo de trabajo del juego ComfyUI](/es/control/comfyui).

- [Hunyuan 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) – Generación de texto e imágenes en formato 3D.
- [OpenAI Image](https://github.com/dcc-mcp/dcc-ai-openai-image) – Generación y edición de imágenes para los flujos de trabajo de textura en DCC.
- [Tripo 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) – Generación de contenido en formato 3D, utilizando texto, imágenes y vistas múltiples.

## Proveedores de activos

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Extenciones de Blender](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [Medios gratuitos](https://github.com/dcc-mcp/dcc-asset-free-media)
- [Geoespacial](https://github.com/dcc-mcp/dcc-asset-geospatial) · [GlTF Sample Assets](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [Objetos escaneados por Google](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [Kenney](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [Objaverse](https://github.com/dcc-mcp/dcc-asset-objaverse) · [Poly Haven](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [Quaternius](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)
- [Pirate Nation](https://github.com/dcc-mcp/dcc-asset-pirate-nation) – Proveedor de recursos para juegos.
- [Poly Pizza](https://github.com/dcc-mcp/dcc-asset-poly-pizza) – Búsqueda y descarga de modelos de baja poligonal, con licencia de uso y registros de origen de los mismos.

## Automatización de interfaces del usuario y tiempo de ejecución compartido

- [winget-releaser](https://github.com/dcc-mcp/winget-releaser) – Herramienta para automatizar el lanzamiento de paquetes de aplicaciones en Windows, a disposición de los responsables del mantenimiento de las mismas.
- [Qt Actions](https://github.com/dcc-mcp/dcc-ui-qt-actions) – Acciones reutilizables, diseñadas para interfaces de tipo DCC basadas en Qt.
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) – Detección de ventanas y widgets en diferentes hosts.
- [Memoria del flujo de trabajo del UI](https://github.com/dcc-mcp/dcc-ui-workflow-memory) – Seleccionadores verificados, recetas y información sobre posibles fallos.
- [dcc-mcp-filmcraft](https://github.com/dcc-mcp/dcc-mcp-filmcraft) – Integración con Experimental FilmCraft: un SDK de tipo tipo de texto para el mismo editor de documentos WebAssembly.
- [adobepy](https://github.com/dcc-mcp/adobepy) – Plataforma de ejecución compartida para comunicaciones en escritorios de Adobe.

## Organización y superficies de descubrimiento

A continuación, se enumeran las otras opciones disponibles para el descubrimiento de contenido. Compruebe el catálogo de CLI instalado para ver si alguna de estas opciones está disponible. Un repositorio o conector remoto por sí solo no puede establecer una instancia de aplicación en funcionamiento.

- [Autodesk Product Help](https://developer.api.autodesk.com/knowledge/public/v1/mcp) – Es un conector de documentación de tipo “opt-in”, externo y de solo lectura. Se le identifica como “`autodesk-help`”. Está separado de los 38 identificadores de adaptadores reportados por CLI 0.20.39. No constituye una ruta de mutación de aplicaciones.

- [Fuente del sitio web oficial](https://github.com/dcc-mcp/dcc-mcp.github.io) – Documentación compartida, metadatos geográficos, guías de control de aplicaciones y demostraciones de cómo funcionan las cosas.
- <a href="https://dcc-mcp.github.io/showcase/" target="_self">Colección de muestras</a> – Trabajo terminado: prompts reutilizables, fuentes de información para el proyecto, licencias necesarias, y evidencia explícita de la producción del proyecto. [Fuente de la colección y contribuciones](https://github.com/dcc-mcp/showcase). [Ejemplos de adaptadores y prompts](/es/examples) conservan su alcance de evidencia original.
- [Plugins para agentes](https://github.com/dcc-mcp/dcc-mcp-agent-plugins) – Habilidades y paquetes de plugins compatibles con los clientes de agentes.
- [dcc-cua](https://github.com/dcc-mcp/dcc-cua) – Es una plataforma de automatización del uso de computadoras en diferentes plataformas, utilizada en los flujos de trabajo de interfaz de usuario DCC.
- [Perfil de la organización](https://github.com/dcc-mcp/.github) – Perfil compartido en GitHub y configuración de la comunidad.

> La disponibilidad del proyecto y el soporte para su instalación pueden cambiar entre las diferentes revisiones del catálogo. Utilice `dcc-mcp-cli --json dcc-types` para ver la fuente de datos del catálogo actual, las versiones de los adaptadores y las opciones de instalación. También puede utilizar `dcc-mcp-cli marketplace search` para encontrar extensiones que puedan instalarse.
