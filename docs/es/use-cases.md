---
title: "Controlar aplicaciones de creación con IA"
description: "Consulta tareas e instrucciones por aplicación para descubrir herramientas, realizar una operación y verificar el resultado."
pageClass: route-page
---

<script setup>
import entries from "../.vitepress/i18n/es/integrations.json"
import labels from "../.vitepress/i18n/es/guide.json"
import DccControlGuideIndex from '../.vitepress/theme/components/DccControlGuideIndex.vue'
</script>

# Controlar aplicaciones de creación con IA

Estos ejemplos utilizan la herramienta pública [`dcc-mcp`](https://clawhub.ai/loonghao/skills/dcc-mcp) y `dcc-mcp-cli`. Las instrucciones describen el resultado deseado y los controles que deben realizarse. El agente descubre los nombres de las herramientas a partir del host conectado.

Para que un agente de IA pueda operar una aplicación creativa en funcionamiento, basta con seguir el guía que se proporciona a continuación, que detalla las tareas y el flujo de trabajo necesario para su operación. Cada guía también incluye un enlace al repositorio del adaptador correspondiente, el cual se encarga de mantener la instalación, la compatibilidad y los detalles específicos de la aplicación.

## ¿Cómo puedo controlar cada uno de los DCCs mediante la inteligencia artificial?

<DccControlGuideIndex language="es" :entries="entries" :labels="labels" />

## Ejemplo de conexión con Maya

Instale la habilidad `dcc-mcp` y conecte el [adaptador de Maya](https://github.com/dcc-mcp/dcc-mcp-maya). Verifique la instalación existente antes de agregar el CLI o el adaptador.

```text
Configura DCC-MCP de tal manera que puedas controlar Maya en esta máquina. Instala y sigue las instrucciones proporcionadas en el canal de @loonghao/dcc-mcp. Primero, verifica el CLI actual y el adaptador de Maya. Pregunta antes de instalar o cambiar el estado del sistema. Abre o detecta Maya, verifica el gateway y la instancia de Maya en vivo. Realiza una búsqueda de solo lectura y describe el flujo de trabajo. Luego, informa sobre la instancia conectada, las capacidades disponibles y las próximas acciones seguras que se pueden llevar a cabo con Maya. No modifiques la escena actual durante el proceso de configuración.
```

Verifique la conexión con:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Maya scene" --dcc-type maya
```

## Ejemplo de conexión con el mezclador

Utilice la misma habilidad y interfaz de línea de comandos con el [adaptador de Blender](https://github.com/dcc-mcp/dcc-mcp-blender). La instalación y las herramientas específicas de Blender permanecen en ese repositorio.

```text
Configura DCC-MCP de tal manera que puedas controlar Blender en esta máquina. Instala y sigue las instrucciones proporcionadas en el canal @loonghao/dcc-mcp. Primero, verifica el CLI actual y el adaptador para Blender. Pregunta antes de instalar o cambiar el estado del sistema. Abre o detecta Blender, verifica el gateway y la instancia activa de Blender. Realiza una búsqueda de solo lectura y describe el flujo de trabajo. Luego, informa sobre la instancia conectada, las capacidades disponibles y la siguiente acción segura que se puede realizar con Blender. No modifiques la escena actual durante el proceso de configuración.
```

Verifique la conexión con:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Blender scene" --dcc-type blender
```

## ¿Cómo puedo crear diez esferas aleatorias en Maya?

Describe el resultado, en lugar de nombrar un “herramienta” a partir de una suposición. Incluye la semilla aleatoria, los límites, el proceso de nombrado y las verificaciones necesarias.

```text
Utilice la habilidad dcc-mcp para conectarse a mi instancia en Maya en vivo. En un nuevo grupo llamado ai_random_spheres, cree exactamente 10 esferas poligonales con el semilla determinista 42. Dale a cada esfera un nombre único y colócala en una posición aleatoria dentro de los límites X -10..10, Y 0..10, Z -10..10, evitando intersecciones visibles. No elimine ni reemplace el contenido existente de la escena. Descubre las herramientas de Maya primero, sigue cada next_step que se devuelva, luego verifica el número final de esferas, los nombres, las transformaciones y la pertenencia al grupo. Muéstrame las pruebas y no guarde la escena a menos que me lo pida.
```

## Quiero crear un juego. ¿Por dónde debo comenzar?

Defina una bucle jugable. Luego, elija entre [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal), [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) o [Godot](https://github.com/dcc-mcp/dcc-mcp-godot). Utilice el [Marketplace](/es/marketplace) para obtener recursos opcionales. Verifique cada licencia antes de su uso. El [Showcase](/es/examples) contiene ejemplos de prompts que pueden servir como referencia.

```text
Ayúdame a crear un juego pequeño que sea jugable con DCC-MCP. Primero, pídele que me indique el motor utilizado (Unreal, Unity o Godot), la plataforma objetivo, el estilo visual y una secuencia de control para el juego. Reduce la idea a un nivel básico: un solo nivel y una única condición de ganancia o fracaso. Recoja los DCCs conectados y el motor utilizado; descubra las herramientas disponibles y busque en el Marketplace cualquier recurso necesario para el juego. Pregunte antes de instalar paquetes, descargar recursos o cambiar el estado del sistema. Construya la versión más simple del juego, ejecúela, verifique los controles y la secuencia de control, capture los resultados y informe sobre el proyecto y las rutas de compilación. No declare que el proyecto está completo sin haberlo probado en una versión jugable.
```

## ¿Cómo edito fotos con la ayuda de la IA?

Utilice el [adaptador de Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) para realizar retoques, corrección de colores, creación de mallas, manipulación de capas y exportación de imágenes. Indique qué elementos deben cambiar, qué elementos deben permanecer sin cambios, y el formato de salida requerido.

```text
Utilice la habilidad “dcc-mcp” para conectarse a Photoshop y ayúdeme a editar esta imagen. Primero, indique qué elementos deben cambiarse, qué elementos deben permanecer sin cambios, el aspecto de referencia y el formato de presentación. Preserve el documento original; utilice nuevos layers, capas de ajuste, máscaras o objetos inteligentes cuando sea posible. Nunca aplaste ni sobreescriba el archivo original sin mi aprobación. Descubra las herramientas de Photoshop, realice un primer paso de edición y compare el resultado con lo indicado en el brief. Verifique las dimensiones, el modo de color, la estructura de los layers y los recursos que faltan. Luego, exporte la imagen a un nuevo formato, pero solo después de que yo apruebe la vista previa.
```

## ¿Cómo puedo editar o compor una película utilizando la inteligencia artificial?

Utilice [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) para la edición en la línea de tiempo, [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) para gráficos en movimiento y trabajo con capas, y [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) para el compositing basado en nodos. Mantenga la tarea dentro de la aplicación que maneja el flujo de trabajo.

```text
Utilice la habilidad “dcc-mcp” para ayudarme a editar o compor esta película. Primero, determine si se trata de edición de líneas de tiempo en Premiere, gráficos en movimiento o compositing de capas en After Effects, o compositing de nodos en Nuke. Identifique los medios de origen y confirme la resolución, la frecuencia de imagen, el espacio de color, los requisitos de audio y el destino de entrega. Preserve los archivos de origen, cree un nuevo proyecto, secuencia o compositing. Descubra las herramientas disponibles, complete una toma o secuencia representativa, renderice una vista previa, verifique los medios faltantes y el rango de imágenes. Informe sobre los caminos del proyecto y de la vista previa. Pregunte antes de instalar códecs o plugins, vincular nuevamente los medios o iniciar el render final.
```

## ¿Cómo puedo crear efectos visuales utilizando la IA?

Use [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) para la geometría procedural y la simulación. Utilice Nuke o After Effects para el compositing de las imágenes. Por último, use [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) para los efectos en tiempo real. Identifique la aplicación responsable de cada función antes de crear una prueba de la imagen final.

```text
Utilice la habilidad “dcc-mcp” para ayudarme a crear un efecto visual. Primero, solicite información sobre el tipo de efecto, su duración, la cámara utilizada, el formato de presentación, y si el efecto debe ser procesado en Houdini, Nuke, After Effects Compositing o en Unreal Engine para efectos en tiempo real. Identifique los hostes conectados, descubra las herramientas disponibles y proponga el ajuste más adecuado para el efecto. Mantenga los controles editables, conserve las placas de origen y las escenas, y realice el render solo cuando sea necesario. Produca una vista previa, verifique los tiempos, las escalas, el espacio de color y cualquier dependencia que pueda faltar. Informe sobre la ruta de acceso a la escena, al caché y a la vista previa. Pregunte antes de descargar recursos, instalar plugins o iniciar un proceso de renderizado complejo.
```

## ¿Por qué utilizar DCC-MCP en lugar de solicitar un script?

Los scripts siguen siendo útiles para trabajos puntuales. DCC-MCP incluye funciones como el análisis de datos, la validación de argumentos, la dirección de solicitudes, las identificaciones de las solicitudes, y herramientas de diagnóstico, cuando es necesario repetir el mismo flujo de trabajo. Para conocer los pasos de operación, consulte [Para Agentes](/es/agents).
