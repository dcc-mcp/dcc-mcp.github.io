---
title: "Por qué existe DCC-MCP"
description: "Conoce los problemas de producción que motivaron DCC-MCP y las responsabilidades del núcleo, los adaptadores y las Skills."
---

# Por qué existe DCC-MCP

## ¿Qué es DCC-MCP?

DCC-MCP es un conjunto de herramientas de código abierto que conecta a los agentes de IA con los software de creación creativa. Un agente de IA es una herramienta de inteligencia artificial que puede llamar a otros programas para que realicen ciertas tareas. DCC se refiere a la creación de contenido digital; entre las aplicaciones que se pueden utilizar con DCC están Maya, Blender, Houdini y Photoshop.

Los agentes y la automatización pueden utilizar estos herramientas para la modelación, los materiales, la animación y el renderizado. Una herramienta de tipo “tipo” define sus parámetros, sus tipos y los resultados obtenidos; de esta manera, se puede inspeccionar y validar dichos resultados.

El MCP (Model Context Protocol), las API REST y `dcc-mcp-cli` comparten herramientas para el descubrimiento de contenidos, la validación de datos, la selección de instancias, las políticas de seguridad y la verificación de resultados. El núcleo proporciona esta infraestructura compartida; los adaptadores conectan cada aplicación, mientras que las Skills proporcionan guías de flujo de trabajo reutilizables.

DCC-MCP surgió a partir del trabajo en adaptadores para aplicaciones DCC reales. La afinidad de hilos, la selección de instancias, el ciclo de vida, el proceso de descubrimiento y los métodos de diagnóstico volvían a aparecer en diferentes hosts. Agregamos los contratos compartidos solo después de que esos problemas se repitieran.

## Comience con el proceso de producción.

Un agente utiliza el proceso que se le ha asignado. No define ese proceso para el equipo.

> Estandarizar la producción → convertir los estándares en flujos de trabajo → empaquetar los flujos de trabajo como herramientas → permitir que los agentes utilicen estas herramientas para realizar sus tareas.

Defina los criterios de nombres, entradas, salidas, verificaciones, propiedad y aceptación. Conecte estos elementos en un flujo de trabajo reproducible. Luego, presente ese flujo de trabajo como una herramienta de uso intuitivo. La misma herramienta puede ser utilizada por personas, scripts, CI o agentes.

## ¿Por qué los scripts directos dejaron de escalar?

Pedir a un modelo que escriba y ejecute un script de Python, como `mayapy`, `hython` o Blender, es útil para la exploración. El trabajo de producción repetido reveló los siguientes limitaciones:

- El modelo regenera código similar en cada turno, pero el resultado varía.
- Las API de DCC suelen requerir que la ejecución se realice en el hilo principal, además de contar con verificaciones específicas para la aplicación.
- Varias escenas abiertas o instancias de aplicaciones pueden hacer que el objetivo de ejecución sea ambiguo.
- Las operaciones prolongadas requieren progreso, cancelaciones, puntos de control y recuperación.
- Un exitoso proceso de salida no demuestra que la escena o documento deseado haya cambiado.
- Las fallas son difíciles de reproducir sin contar con datos tipados, identificadores de solicitudes, registros y otros informes relevantes.

Estos problemas ocurrieron en todos los adaptadores. Por lo tanto, pertenecían a una infraestructura compartida.

## Los problemas y los contratos que generaron

| Problemas recurrentes | Lo que aprendimos | Respuesta de DCC-MCP |
| --- | --- | --- |
| Los modelos reescriben la lógica de la tarea en cada turno. | El conocimiento relacionado con el “ Pipeline” debe poder sobrevivir a los cambios en los modelos y en los prompts. | Habilidades con versiones, esquemas tipificados, validación y herramientas reutilizables. |
| Cada adaptador reconstruye el código relacionado con el transporte y el ciclo de vida del software. | Las integraciones de host requieren un contrato compartido. | Ejecución central, Gateway, interfaz de línea de comandos y adaptadores propios de los hosts. |
| Las API de DCC tienen restricciones relacionadas con los hilos y la disponibilidad del sistema. | La ejecución de procesos genéricos no es suficiente. | Envió de hilos principales, preparación, enrutamiento de instancias y ejecución en hosts. |
| Los catálogos de herramientas grandes consumen mucho espacio y confunden la selección de los productos adecuados. | Los agentes deben descubrir solo aquello que sea necesario para cumplir con la tarea. | `search -> load/describe -> call` |
| Las operaciones creativas pueden ser lentas o estar incompletas en cierta medida. | Un llamado a una función necesita tener semántica de ciclo de vida, no solo un valor de retorno. | Trabajos asincrónicos, progreso, cancelación, puntos de control y transferencia de responsabilidades. |
| El uso de herramientas se convierte en algo desconocido, como si fuera una “caja negra”. | Los equipos de producción necesitan pruebas que puedan inspeccionar. | IDs de solicitudes, políticas, registros de auditoría, logs, rastros, métricas, estado de salud y posibilidades de reproducción. |
| A veces, las herramientas existentes no proporcionan una API útil para su uso. | La automatización del interfaz del usuario es una opción de respaldo, no el fundamento para el desarrollo de aplicaciones. | DCC-CUA / Control de UI vinculado a un proceso y ventana específicos, con operaciones limitadas al área, verificaciones de políticas y `snapshot -> find -> act -> wait -> verify` |
| Los flujos de trabajo útiles deben moverse entre personas y proyectos. | Una carpeta de scripts no constituye un modelo de distribución. | Paquetes de mercado, referencias de fuente inmutables, actualización rápida, y ámbitos de proyecto/equipo. |

## ¿Quién posee qué?

El sistema separa los servicios compartidos del comportamiento específico de cada host.

| Capa | Responsabilidad |
| --- | --- |
| Interfaz de agente | Puntos finales de tipo MCP y REST, comandos CLI, esquemas, recursos, promptes y resultados estructurados. |
| Plano de control | Descarga, enrutamiento, verificación de políticas, gestión del ciclo de vida, capacidad de observación y contexto de múltiples instancias. |
| Tiempo de ejecución DCC | Distribución de hilos principales, estado de preparación, tareas a realizar, cancelaciones, puntos de control y ejecución segura para el host. |
| Adaptador | La instalación, la compatibilidad, las API del host y el comportamiento específico de cada aplicación son características que pertenecen a cada repositorio DCC. |
| Habilidad | Se verifica el conocimiento sobre los flujos de trabajo, se validan los argumentos presentados, se analizan las etapas del flujo de trabajo, y se evalúan las convenciones relacionadas con el proyecto o el equipo en cuestión. |

La [documentación de la arquitectura básica](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture) es la fuente de información fiable para los contratos actuales. La instalación específica para cada host, la compatibilidad y las soluciones a problemas relacionados con cada adaptador siguen estando en los repositorios correspondientes.

## CLI, MCP y REST comparten una misma implementación.

El código de servicio compartido y el contrato de REST/OpenAPI son las herramientas de implementación. `dcc-mcp-cli` llama a la API REST del gateway. MCP se mantiene simple: `search`, `describe`, `load_skill` y `call` son funciones que permiten que los clientes que solo utilizan MCP puedan acceder al mismo flujo de trabajo. Ambas rutas utilizan los mismos servicios de descubrimiento, validación, enrutamiento, políticas y llamadas.

| Consumidores | Superficie preferida | Requiere la intervención de un agente de inteligencia artificial. |
| --- | --- | --- |
| Artistas, operadores, scripts de shell y CI | CLI tipo teclado o REST | No. |
| Automatización de estudios y aplicaciones personalizadas | Descansar, con los clientes OpenAPI generados. | No. |
| IDE y asistentes de AI que solo utilizan tecnologías de tipo MCP. | Flujo de trabajo mínimo de MCP | Sí. |
| Pantallas de flujo de trabajo inteligente y orquestación en la nube | Integración con REST/OpenAPI; MCP cuando un agente participa. | No. |

Un canal de transmisión puede llamar directamente a REST, generar clientes a partir de `/v1/openapi.json`, o utilizar la interfaz CLI en procesos de integración y operaciones. Un agente también puede acceder a las mismas capacidades a través de la sencilla interfaz MCP.

Un servicio OpenAPI 3.x ya existente también puede ser utilizado como herramientas MCP. Se mantiene siendo un servicio REST normal, y no es necesario reconstruirlo en torno a la inteligencia artificial.

## Utilice primero los protocolos existentes.

MCP es el punto de entrada estándar en la industria para agentes. Por eso, DCC-MCP utiliza este punto de entrada en lugar de crear un protocolo privado. REST, Python, C++, HTTP, puertos de comando, complementos nativos y herramientas oficiales de los proveedores pueden operar detrás del mismo plano de control.

DCC-MCP no reemplaza a un agente, una API de DCC o una integración con un proveedor. Cuando un proveedor proporciona una capacidad nativa o oficial de MCP, el adaptador mantiene sus nombres y esquemas. DCC-MCP, por su parte, proporciona funcionalidades de descubrimiento compartido, enrutamiento, seguridad, ciclo de vida, distribución y diagnóstico relacionadas con dicha capacidad.

## Conocimiento sobre el flujo de trabajo del almacén de habilidades

Un “Skill” representa un flujo de trabajo probado, que se presenta como una capacidad versiónada, tipoabilizada y distribuible.

El límite de propiedad es:

- Los núcleos y los adaptadores son responsables de la conectividad, la seguridad de los hilos de procesamiento, el enrutamiento de datos, las políticas de acceso y la capacidad de observación de los datos.
- Los TDs y TAs mantienen las funciones relacionadas con la denominación de proyectos, las comprobaciones de escenas, la preparación de activos, los puntos de publicación, las reglas de exportación y la transferencia de responsabilidades, todo esto dentro del mismo flujo de trabajo que ya existente.
- Los agentes seleccionan una herramienta que esté bien descrita y utilizan argumentos validados en lugar de tener que inventar todo el proceso de trabajo desde cero.

Esto reduce la generación repetida de código, y permite que un estudio pueda distribuir diferentes capacidades según el proyecto, el departamento o la etapa de producción, sin necesidad de modificar el plan de control.

## Guarde las pruebas de los fracasos.

El diagnóstico comienza con un `request_id`, el tipo de herramienta y los argumentos utilizados, la instancia DCC seleccionada, y el resultado observado. El Gateway y la CLI proporcionan información sobre el estado del sistema, los registros, las estadísticas y los comentarios estructurados.

Esto crea un bucle concreto:

1. Reproduce el fallo contra un huésped real.
2. Identificar si Core, un adaptador o una habilidad es el propietario de ese elemento.
3. Realizar la menor corrección posible en ese límite.
4. Validear la misma llamada una vez más.
5. Se deben conservar las pruebas, de modo que cualquier mejora futura se base en la experiencia, y no en conjeturas.

## Límites conocidos

DCC-MCP no pretende que cada aplicación creativa sea idéntica a la otra.

- Las habilidades nativas y las API siguen siendo las más recomendables en comparación con DCC-CUA/UI Control. Este último requiere que se vinculen procesos y ventanas de manera precisa.
- Core no posee semántica de pipelines específicas para cada host.
- Un adaptador no puede garantizar una recuperación segura cuando el host no proporciona ninguna API de transacciones.
- Los paquetes de Marketplace amplían el framework; no ocultan los defectos del Core o del adaptador.
- El proyecto proporciona la infraestructura necesaria para los agentes. No determina qué agente o modelo se debe utilizar.

## Lo que aún depende del juicio humano…

Muchas tareas de producción pueden ser estandarizadas, validadas y automatizadas. Sin embargo, el juicio estético, la dirección artística, la composición, el tiempo y el estilo siguen siendo aspectos difíciles de expresar en forma de contratos estables. DCC-MCP no pretende que la infraestructura sea suficiente para resolver todos estos problemas.

DCC-MCP se encarga de las partes que pueden repetirse, y proporciona a los agentes acceso controlado a las herramientas necesarias. Una mejor percepción, razonamiento y juicio creativo permiten utilizar las mismas herramientas, sin tener que reinventar cada integración de DCC.

## Continúe desde aquí.

- [Ve cómo un agente utiliza el sistema.](/es/agents)
- [Construya un adaptador, un servicio independiente o una habilidad.](/es/developers)
- [Explora los adaptadores y extensiones.](/es/ecosystem)
- [Lea la documentación técnica de base.](https://dcc-mcp.github.io/dcc-mcp-core/)

## Enlaces oficiales

- [Sitio web de DCC-MCP](https://dcc-mcp.github.io/es/)
- [Organización GitHub](https://github.com/dcc-mcp)
- [Canal de YouTube](https://www.youtube.com/@dcc-mcp)
- [Galería de muestras](https://dcc-mcp.github.io/showcase/)
