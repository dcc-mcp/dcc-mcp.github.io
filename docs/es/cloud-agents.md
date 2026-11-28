---
title: "Agentes en la nube y DCC-MCP"
description: "Compara interfaces, pruebas fechadas y requisitos de instalación antes de elegir un equipo local o una máquina en la nube."
pageClass: route-page
---

# Agentes en la nube y DCC-MCP

Se debe elegir un flujo de trabajo basado en la nube o en una estación de trabajo, utilizando software con pruebas realizadas a lo largo del tiempo, interfaces de la plataforma, requisitos de instalación y limitaciones de despliegue.

DCC-MCP conecta a un agente de AI con aplicaciones creativas, a través de herramientas de escritura automática, MCP y `dcc-mcp-cli`. Un agente en la nube puede inspeccionar un documento, realizar ediciones limitadas, exportar recursos y verificar el resultado, siempre que su entorno cuente con la aplicación adecuada, un adaptador funcional y una conexión autorizada. Un agente capaz de utilizar shells puede utilizar la interfaz de comandos y el puerto HTTP, sin necesidad de utilizar la pantalla de configuración de MCP.

Esta guía aborda los conceptos relacionados con **OpenAI Dots**, **Grok Bot**, **Meta Muse** (el agente personal) y **Manus Cue**. Se registra la documentación de las plataformas de forma separada, junto con los resultados de las pruebas realizadas en un ordenador conectado a la nube utilizado para el desarrollo de Lightbox. Lightbox es el entorno de desarrollo y implementación; DCC-MCP se encarga de la integración de las aplicaciones. Los resultados obtenidos de este ordenador no garantizan soporte en todas las cuentas, imágenes o plataformas. Se trata de integraciones independientes, sin ninguna relación con las plataformas en sí.

## Niveles de evidencia {#evidence-levels}

Las pruebas analizadas corresponden al **2026-10-01 UTC**. Una aplicación instalada, una entrada en el catálogo de la interfaz de línea de comandos y una llamada a una herramienta MCP que funciona son observaciones diferentes.

| Etiquetas | Lo que las pruebas demuestran es: |
| --- | --- |
| **MCP probado** | Un adaptador y una conexión específicos completaron un flujo de trabajo designado en el entorno mencionado. Las versiones experimentales y los parches no publicados siguen siendo explícitos. |
| Solo en idioma nativo. | La aplicación generó un artefacto o pasó una pequeña verificación a través de su propia interfaz CLI/API. No se implica que la aplicación sea aceptada por DCC-MCP. |
| La interfaz oficial está disponible; DCC no ha sido probado aún. | La documentación de la plataforma describe una interfaz que podría ser utilizada para llevar a cabo una integración. Se trata de una evaluación de viabilidad, no de un flujo de trabajo DCC ya probado. |
| **No confirmado** | La interfaz o el comportamiento de la aplicación necesarios aún no se han establecido. |

Un flujo de trabajo MCP incompleto o rechazado se considera como un “gap”, incluso si se ha generado un archivo intermedio. Los repositorios de adaptadores son responsables de gestionar la instalación y el soporte de su versión. Esta página resume las pruebas relacionadas con el flujo de trabajo en la nube.

## Interfazes de plataformas {#platform-interfaces}

| Plataforma y entorno | Interfaz oficial y posibles rutas | Software / adaptadores / evidencia relacionada con el flujo de trabajo | No confirmado ni verificado. |
| --- | --- | --- | --- |
| Los “OpenAI Dots” pueden estar en una computadora en la nube, o bien en una computadora personal autorizada. | Computadoras en la nube, navegadores, archivos y aplicaciones; complementos y tareas personales que se pueden realizar en el ordenador. Consulte [Computadoras y aplicaciones](https://learn.chatgpt.com/docs/dots/computers-and-apps) y [Complementos](https://learn.chatgpt.com/docs/plugins). | La computadora Linux que se muestra a continuación cuenta con pruebas de software nativas y experimentos con adaptadores limitados. Las versiones y rutas de los adaptadores se registran por cada fila de software. | Los documentos no especifican ningún sistema operativo universal para la nube, ni tampoco la compatibilidad con el inventario de DCC o con los adaptadores. Las tareas realizadas en computadoras personales requieren que la computadora esté conectada y que la aplicación ChatGPT esté abierta. |
| Grok Bot alojaba ordenadores con sistema operativo Linux. | [Herramientas de computadora, shell y escritorio](https://docs.x.ai/grok-bot/computer-and-apps); [Identidad/acceso en Linux](https://docs.x.ai/grok-bot/identity-and-access); [Comando remoto HTTPS y comandos personalizados para MCP](https://docs.x.ai/grok-bot/team-bots#plugins). La combinación de CLI y HTTP puede ser una opción válida como ruta de acceso al shell. | La interfaz oficial está disponible; el DCC no ha sido probado. Versión del software: no probada. Adaptador: no probado. No se ha completado ningún proceso de trabajo relacionado con DCC aquí. | El soporte de Command MCP no verifica la conexión de tipo DCC stdio. Se aplican las restricciones relacionadas con los secretos de comando y la visibilidad del equipo. El acceso remoto requiere un protocolo TLS/Auth protegido en el nivel de extremo. |
| **Meta Muse**, máquina virtual personal con agente de Linux. | [Agente personal del museo](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) y [sus conectores de runtime de Debian, así como de API/CLI](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse). La integración de CLI/API es una opción viable, según se infiere a partir de esas interfaces. | La interfaz oficial está disponible; el DCC no ha sido probado. Versión del software: no probada. Adaptador: no probado. No se ha completado ningún proceso de trabajo relacionado con DCC aquí. | No se ha confirmado que las capacidades de control gráfico del DCC, ni el alcance de la instalación del software, sean compatibles con el MCP nativo. Muse Code es un producto independiente. Las permisos relacionados con el tiempo de ejecución y los conectores siguen siendo válidos. |
| **Manus Cue**, aplicación independiente de agentes personales. | [La sección Cue de Introducing Manus 2.0 describe una aplicación móvil/desktops independiente y el ordenador personal de cada agente.](https://manus.im/blog/introducing-manus-2-0) | No está confirmado. OS/software: no se ha confirmado. Adaptador/conexión: no se ha probado. No se ha completado ningún flujo de trabajo relacionado con DCC aquí. | Las conexiones específicas para Cue, los conectores personalizados y el software DCC son elementos que aún no han sido confirmados. Las capacidades de Manus Studio no constituyen una prueba válida para Cue. |

## Inventario de software en la nube {#cloud-software-inventory}

El ordenador en el que se observaron los puntos, ejecutaba **Debian 13.6, x86_64**. Tenía una interfaz gráfica de usuario funcional. El hecho de que no hubiera ningún shell con la cadena `DISPLAY` no significa que la pantalla de escritorio no estuviera disponible. Este es un inventario antiguo de ese ordenador, y no representa una promesa de que el ordenador estará preparado para su uso inmediato. En estas comprobaciones de inventario, no se utilizó ningún adaptador; además, el entorno inicial no contenía paquetes relacionados con DCC-MCP.

| Versión de la plataforma/software | Adaptador/conexión utilizado | Flujo de trabajo nativo y evidencia | Límites restantes |
| --- | --- | --- | --- |
| Puntos de inserción en Debian 13.6 x86_64 / Inkscape **1.4** | Ninguno / Interfaz de línea de comandos nativa y interfaz gráfica gestionada | Búsqueda en formato SVG y exportación en formato PNG; se observa un interfaz gráfico. **Solo funciona en el formato nativo.** | Las acciones de extensión nativa y el flujo de trabajo de producción de DCC-MCP requieren verificaciones separadas. |
| Puntos de configuración de Debian 13.6 x86_64 / FreeCAD **1.0.0** | Ninguno / Sistema: Python + API de la parte correspondiente. | Se crearon artefactos de tipo FCStd y STEP. **Solo nativos.** | Un entorno contaminado se derrumbó; un entorno limpio, en cambio, permitió la continuación de las operaciones. La validación del resultado del adaptador es una verificación independiente. |
| Puntos de configuración de Debian 13.6 x86_64 / GIMP **3.0.4** | Ninguno / API de lote nativo | Creación de documentos por lotes. **Solo compatible con el formato nativo.** | La inicialización del adaptador, las llamadas a los herramientas y la aceptación de datos para su exportación/lectura no han sido probadas. |
| Puntos de referencia de Debian 13.6 x86_64 / OpenSCAD **2021.01** | Ninguno / nativo de la interfaz de línea de comandos | Se genera un archivo STL. **Solo compatible con el formato nativo.** | La aceptación del adaptador está separada de la renderización en línea de comandos. |
| Puntos de configuración de Debian 13.6 x86_64 / Blender **4.3.2** | Ninguna ejecución con contexto nativo. | Se ha guardado la mezcla de imágenes, se ha exportado el archivo GLB, y se ha completado el proceso de renderizado en la CPU, con la función de eliminación de ruido desactivada. **Solo en formato nativo.** | La capacidad de soporte del adaptador está limitada a **4.5**; OIDN y Draco no están disponibles. Esto no amplía el número de versiones de Blender que son compatibles con este adaptador. |
| Puntos de configuración de Debian 13.6 x86_64 / Godot **4.6.3** | Ninguno / Interfaz de línea de comandos nativa y sin soporte para cabezas. | Ejecución sin cabeza. **Solo en el entorno nativo.** | Los flujos de trabajo de edición y adaptación no han sido probados. |
| Puntos de configuración de Debian 13.6 x86_64 / FFmpeg **7.1.5** | Ninguno / nativo de la interfaz de línea de comandos | Se ha producido en formato MP4. **Solo en formato nativo.** | No se ha probado el adaptador DCC-MCP. |
| Puntos de texto en Debian 13.6 x86_64 / ImageMagick (**Versión no registrada**) | Ninguno / nativo de la interfaz de línea de comandos | Se trata de un archivo producido en formato PNG. **Solo es compatible con el formato nativo.** | Guarde esa versión antes de reclamar un flujo de trabajo reproducible para el adaptador. |
| Puntos de Debian 13.6 x86_64 / CadQuery **2.7** | Ninguno / API de Python | Pequeña verificación de API. **Solo disponible en formato nativo.** | El flujo de trabajo completo de modelado/exportación y adaptación no ha sido probado. |
| Puntos de referencia en Debian 13.6, sistema operativo x86_64 / KiCad 9.0.2 | Ninguno / API de Python | Pequeña verificación de API. **Solo disponible en formato nativo.** | El flujo de trabajo relacionado con la edición/exportación de PCBs y el adaptador aún no ha sido probado. |
| Puntos de configuración para Debian 13.6 x86_64 / ParaView **5.13.2** | Ninguno / API de Python | Pequeña verificación de API. **Solo disponible en formato nativo.** | El flujo de trabajo de visualización/exportación y el adaptador aún no han sido probados. |
| Puntos de referencia en Debian 13.6 x86_64 / QGIS **3.40.6** | Ninguno / API de Python | Pequeña verificación de API. **Solo disponible en formato nativo.** | El flujo de trabajo del proyecto/exportación y el adaptador aún no han sido probados. |
| Puntos de Debian 13.6 x86_64 / LibreOfficeDev **26.8 alpha** | Ninguno / nativo de la interfaz de línea de comandos | Experimento de conversión de DOCX a PDF. **Solo nativo; experimental.** | Versión Alpha; no existe ninguna cláusula de aceptación para la producción o para el uso como adaptador. |
| Puntos de control en Debian 13.6 x86_64 / Kdenlive **24.12.3** | Ninguna / Versión/ Ayuda en la interfaz de línea de comandos | El ejecutable respondió a la solicitud de versión/ayuda. **No está confirmado** para su renderizado. | No se ha probado el flujo de trabajo del renderizador o del adaptador. |
| Puntos de Debian 13.6 x86_64 / Slicer (**Versión no establecida**) | Ninguno / Punto de entrada para la aplicación | Se encontró un punto de entrada; la tentativa sin cabezal falló. **No está confirmado.** | La ejecución nativa y la integración con el adaptador siguen sin resolverse. |

## Pruebas de Cloud MCP {#cloud-mcp-tests}

Los siguientes experimentos se bloquearon por el trabajador encargado de las pruebas en **2026-10-01 UTC**: dos ciclos de desarrollo cerrados que no pudieron completarse después de aplicar los parches locales; un experimento relacionado con la compatibilidad con Blender no logró superar los límites de soporte; y un flujo de trabajo de producción en Inkscape permaneció bloqueado. Las compilaciones del sitio web y las verificaciones en el navegador en PC8 son documentación separada. Estas filas no representan una certificación de soporte general. El [resumen de pruebas públicas](/cloud-evidence/2026-10-01.json) registra los resultados obtenidos y las identidades de los parches aplicados; no contiene ningún archivo de parche, credenciales ni enlaces de descarga privados.

| Plataforma / Software | Adaptador / liberación o fuente / conexión | Flujo de trabajo y evidencia observada | No probado o bloqueado |
| --- | --- | --- | --- |
| dots / Debian 13.6 x86_64 / Blender **4.3.2** | `dcc-mcp-blender` publicó la versión **0.2.12**. Además, cuenta con la versión **0.20.39** de Core. También es compatible con el motor MCP real. | Inicialización, lista/carga de objetos, creación de nuevas escenas, guardado de datos, limpieza de la escena, reabertura de la escena, inspección de la escena y exportación a formato GLB. **MCP probado; experimentos de compatibilidad.** | Debajo de [soporte oficial de Blender 4.5](https://github.com/dcc-mcp/dcc-mcp-blender). La escritura de scripts es deshabilitada; Draco la ha deshabilitado explícitamente. No existe soporte completo para Blender 4.3. Tampoco está establecido el uso de la interfaz gráfica y la renderización a través de MCP. |
| dots / Debian 13.6 x86_64 / FreeCAD **1.0.0** | [`dcc-mcp-freecad`](https://github.com/dcc-mcp/dcc-mcp-freecad) / Parche local no publicado: `f761672f62ab8d0d1ae3d77a6379249e307eeff1` / Versión real de MCP + Core: **0.20.39** | Tras corregir `verified` para devolver el booleano que espera Core en lugar de una lista, se verificaron la creación, el guardado, la reapertura, la exportación y la lectura independiente del archivo. **MCP se probó con un parche local.** Pasaron las 138 pruebas, incluidas tres en la aplicación real, y la comprobación con Ruff. | El parche no ha sido lanzado; no existe ningún pull request remoto relacionado con él. Solo el éxito de la escritura nativa no fue suficiente para validar el trabajo realizado por el MCP antes de que se realizara la corrección. La confirmación local es simplemente una prueba de identidad, pero no constituye un lanzamiento publicado oficial. |
| dots / Debian 13.6 x86_64 / Inkscape **1.4** | [`dcc-mcp-inkscape`](https://github.com/dcc-mcp/dcc-mcp-inkscape) / Fuente: `9769234` / Descubrimiento de MCP; GUI + dependencias temporales de `inkex` para la acción nativa. | Las capacidades y los datos relacionados con el descubrimiento eran legibles. Sin embargo, la ejecución sin controlador presentaba problemas relacionados con las acciones nativas. La generación de la interfaz gráfica se realizaba en formato SVG nativo. Pero en Linux, el proceso de validación de la procedencia del archivo PID 1 falló. **El flujo de trabajo de producción de MCP está incompleto.** | Hay una brecha en la integración del código fuente de Linux. No se deben relajar los controles de origen ni afirmar que la producción está completamente aceptada. El proceso intermedio SVG no permite llevar a cabo una producción exitosa de MCP. |
| dots / Debian 13.6 x86_64 / OpenSCAD **2021.01** | [`dcc-mcp-openscad`](https://github.com/dcc-mcp/dcc-mcp-openscad) está basado en la versión **0.2.1**. También incluye un parche local no publicado: `799fc2af97d13365613545347e4d4817e9f75b48`. Además, incluye la versión real de MCP y Core: **0.20.39**. | Descubrimiento de versiones, reabertura/inspección de nuevas sesiones, compilación de parámetros, exportación de datos en formato binario/ASCII, y lectura de datos después de que se realice la corrección booleana “`verified`”. Se encontraron **12 triángulos, 7200 mm³** de datos. Las verificaciones de seguridad pasaron. **MCP se probó con un parche local.** Se pasaron 129 pruebas unitarias; 4 pruebas únicamente para Windows se omitieron; 2 pruebas nativas también pasaron. | El parche no se ha lanzado. Se produjo un error relacionado con la ruta de acceso a DISPLAY/OpenGL. La fuente de SCAD se creó como texto local. El adaptador no tiene una API de edición, por lo que esto no representa un modelo creado desde cero mediante MCP. |

## Elija una conexión. {#choose-a-connection}

1. **Aplicación en el ordenador en la nube del agente:** Utilice un adaptador local compatible y la interfaz de línea de comandos, o bien el cliente MCP del entorno. Verifique primero las versiones exactas de la aplicación y del adaptador. Las API nativas son útiles para descubrir posibles candidatos para la integración; a continuación, se procede a la aceptación del adaptador.
2. **Aplicación en una estación de trabajo autorizada:** Es necesario mantener el punto final de DCC en modo loopback y conectarlo a través de una conexión computacional aprobada o un gateway protegido. El agente en la nube necesita acceder a los caminos de los proyectos y los artefactos correspondientes. Además, la estación de trabajo debe permanecer disponible.
3. **Agente capaz de usar Shell:** Se puede utilizar `dcc-mcp-cli` para realizar inventarios, detectar herramientas y realizar llamadas. Una interfaz de configuración nativa de MCP es opcional. La interfaz Command MCP y la CLI son interfaces separadas. Las puentes `translate` de Core conectan **stdio → HTTP**, y el soporte para clientes Command no permite un flujo de trabajo en stdio DCC.

Para conectar redes distintas, configura **TLS y autenticación en un proxy frontal o en una pasarela OAuth dedicada**. Restringe el acceso y mantén el DCC en la interfaz de bucle local. Según el [contrato de autenticación de Core 0.20.39](https://github.com/dcc-mcp/dcc-mcp-core/blob/v0.20.39/docs/guide/remote-server.md#auth), la validación de Bearer/OAuth/CIMD por solicitud en `McpHttpServer` está prevista para el futuro. `ApiKeyConfig` y `OAuthConfig` no protegen por sí solos el servicio en ejecución. No expongas un endpoint sin protección como servicio público autenticado.

## Requisitos de instalación {#prerequisites}

- Se necesita permiso para instalar o actualizar el software en el entorno seleccionado. También se requiere una aplicación disponible y cualquier licencia necesaria. Un complemento DCC-MCP no incluye la aplicación, su licencia, ni un punto de acceso público para múltiples usuarios.
- Se trata de una versión de la aplicación que se encuentra dentro del rango de soporte del adaptador correspondiente. Para que esta versión funcione, son necesarias las bibliotecas nativas, además de un adaptador oficial verificado o una actualización de código fuente que esté registrada de manera explícita.
- Se requiere una conexión CLI/MCP compatible, una instancia en vivo disponible y un directorio de proyectos autorizado. Los herramientas que dependen del GUI también necesitan el servicio de escritorio gestionado por la plataforma o un servicio de visualización compatible.
- Para uso remoto, se requiere una infraestructura TLS/auth aprobada y secretos gestionados por el operador. Esta guía no proporciona ningún endpoint público ni credenciales.

Siga las instrucciones de configuración del [agente compartido](/es/agents) y el [directorio de adaptadores](/es/ecosystem). Las instrucciones de instalación y las soluciones a problemas específicos de cada host se encuentran en el repositorio de adaptadores.

## Un flujo de trabajo que incluye verificaciones. {#verified-workflow}

Comience con un documento asignado a una tarea, y también con una operación relacionada con esa tarea. Por ejemplo, inspeccionar una pieza CAD, realizar un cambio en las dimensiones de la pieza, guardarla, volver a abrirla y verificar las dimensiones antes de exportarla en formato STEP. Este es un patrón de aceptación; la matriz anterior indica qué experimentos realmente fueron exitosos.

```bash
# After approved setup, inspect the current environment and live instances.
dcc-mcp-cli doctor
dcc-mcp-cli list

# Only continue when a ready instance for the intended application exists.
dcc-mcp-cli search --query "inspect document" --dcc-type freecad

# Follow the returned next_step and exact schema; do not invent a tool slug.
```

Deje de ejecutar la aplicación si el inventario está vacío o si la instancia no está lista para ser utilizada. Es necesario mantener las versiones de la aplicación, del adaptador y del núcleo, así como las rutas de conexión, los commits de fuente para las actualizaciones, las ID de las solicitudes/trabajos y las verificaciones de los artefactos. Se debe verificar que el archivo guardado o exportado sea válido, volviendo a abrir el documento correspondiente o inspeccionando independientemente el resultado. Es importante conservar la ID del trabajo que falló antes de intentar diagnosticar el problema; no se debe reproducir ciegamente una mutación.

```text
Utilice la habilidad dcc-mcp para examinar el documento asociado a la tarea en el ordenador en la nube o en la estación de trabajo autorizada. Verifique las versiones y el estado de preparación del documento. Utilice herramientas de escritura para realizar cambios necesarios. Guarde el resultado y vuelva a abrirlo. Verifique también el archivo exportado. Informe antes de instalar software o cambiar el estado del sistema. Indique la ruta de conexión, las pruebas disponibles y los límites restantes.
```

## Preguntas frecuentes {#faq}

### ¿Esto significa que las cuatro plataformas son compatibles con todos los protocolos de comunicación DCC?

No. Las interfaces con las plataformas, el software instalado y la aceptación de los adaptadores son cosas separadas. Grok Bot y Muse han documentado los caminos de integración, pero no hay pruebas de DCC en este caso. Las interfaces requeridas por Cue aún no han sido confirmadas. Incluso una prueba superficial solo aplica a sus versiones grabadas y al flujo de trabajo.

### ¿Puedo utilizar DCC-MCP sin tener una pantalla de configuración nativa para el MCP?

Sí, cuando el agente ha autorizado el acceso a la shell, es necesario que exista un `dcc-mcp-cli` funcional, además de un gateway local o un gateway HTTP protegido. Es importante verificar que la plataforma permita la ejecución y conexión requeridas. La shell por sí sola no permite la instalación o licenciamiento de la aplicación.

### ¿Por qué la ejecución nativa puede tener éxito, mientras que el MCP falla?

Un comando nativo puede crear un archivo, incluso cuando los intentos de despacho por parte del adaptador, la validación de resultados, el seguimiento de trabajos o las verificaciones de origen del archivo fallan. FreeCAD e Inkscape, por su parte, exponen estos diferentes límites. Se debe tratar el fracaso del adaptador como algo no resuelto, hasta que tanto el flujo de trabajo como los resultados obtenidos sean válidos.

### ¿Puede un agente de nubes funcionar junto con mi escritorio DCC, que ya está licenciado?

Una conexión autorizada a través de un ordenador personal, o un gateway protegido, puede proporcionar ese enlace. Es necesario confirmar el acceso, las versiones compatibles, los caminos de conexión, la disponibilidad de las estaciones de trabajo y las condiciones de licencia con el operador. Los documentos de la plataforma no certifican todos los escritorios DCC.

### ¿Garantizará esta página una visibilidad adecuada para la búsqueda con AI?

No. La guía de búsqueda de la IA de Google [[Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)] exige que el contenido sea de fácil descubrimiento y lectura, y que los datos estructurados sean visibles. No se requiere ningún archivo especial de AI ni esquemas especiales para que el contenido funcione correctamente. Además, no garantiza ningún tipo de indexación o visualización del contenido. La documentación del rastreador de OpenAI [[OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots)] distingue entre el rastreo para fines de búsqueda y el rastreo para entrenamiento. Esta guía respeta las políticas de rastreo existentes en el sitio.
