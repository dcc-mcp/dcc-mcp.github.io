---
title: "Desarrollar un adaptador, un servicio o una Skill"
description: "Elige una vía de desarrollo y prueba en local un servicio MCP privado, un adaptador o una Skill especializada."
pageClass: route-page
---

# Desarrollar un adaptador, un servicio o una Skill

Se debe elegir el nivel que será el dueño antes de crear los archivos. DCC-MCP admite adaptadores públicos de DCC, servicios privados que no son de tipo DCC, y paquetes de habilidades específicos. Es suficiente utilizar una carpeta local o un árbol de fuentes interno.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Servicio privado o a medida para el MCP.</strong><span>Utilice dcc-mcp-creator.</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Habilidad para manejar el flujo de trabajo de manera eficiente.</strong><span>Utilice las habilidades-creadoras.</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>Infraestructura compartida</strong><span>Contribuye a Core.</span></a>
</div>

## Elija una de las trayectorias de desarrollo.

| Su necesidad | Ruta |
|---|---|
| Conecte Maya, Blender, Unreal o cualquier otro proceso host. | Utilice `dcc-mcp-creator` para crear o mejorar un adaptador DCC. |
| Exhiba una API interna, una interfaz de línea de comandos, una base de datos de recursos, un centro de renderización o un servicio de revisión. | Use `dcc-mcp-creator` con un ID de servicio personalizado y ``instance_type="standalone"`. No es necesario utilizar un repositorio público. |
| Añada un flujo de trabajo tipo “typed” a un adaptador existente o a un servicio independiente. | Use `dcc-mcp-skills-creator`. No cree ningún otro entorno de ejecución. |
| Cambiar el gateway, el protocolo, la seguridad o el comportamiento entre hosts. | Por favor, envíe el contrato compartido a Core. |

Busque en el [directorio del ecosistema](/es/ecosystem) antes de crear un adaptador público o una habilidad. Las identidades de servicios privados no necesitan tener una entrada en el catálogo público.

## Construya un servicio privado que no sea parte de la red DCC.

Utilice esta ruta para un sistema interno que no sea una aplicación creativa, y que tampoco utilice GitHub. Eche a andar al agente de codificación desde el proyecto privado, y luego utilice este prompt:

```text
Usa dcc-mcp-creator para el servicio y dcc-mcp-skills-creator para los archivos de la Skill. Trabaja únicamente en este proyecto privado. Reutiliza su lenguaje, gestor de paquetes, pruebas, autenticación y prácticas de despliegue. No crees repositorios de GitHub, entradas públicas de catálogo, incidencias externas ni versiones públicas.

Elige un flujo de trabajo real y crea un servicio mínimo con un identificador estable y una Skill de solo lectura con tipos definidos. Usa DccServerBase y DccServerOptions.from_env(..., instance_type="standalone"), omite dcc_pid y, durante el desarrollo, escucha solo en la interfaz de bucle local. Ejecuta directamente las operaciones de servicio, archivos y API. Añade un despachador o un puente solo si debes cruzar un límite de hilo o proceso. Define esquemas de entrada y salida que rechacen campos desconocidos, anotaciones de seguridad, un tiempo de espera máximo, un ejemplo de llamada y errores que indiquen cómo proceder sin revelar datos sensibles. Mantén las credenciales en el sistema de secretos existente.

Ejecuta dcc-mcp-cli lint skills y la prueba mínima del proyecto. Inicia el servicio y muestra su URL /mcp. Con el MCP Inspector oficial, comprueba tools/list, la búsqueda y carga de la Skill exacta, describe, una llamada válida, un error de entrada y el cierre limpio. Repite el flujo con list, load-skill, describe y call de la CLI usando --output toon. Conserva el slug y el request_id devueltos y evita los reintentos a ciegas. Indica los archivos modificados, los resultados y el trabajo pendiente de seguridad y despliegue. Detente antes de publicar o cambiar la infraestructura compartida.
```

Validación requerida:

1. Se están reutilizando las convenciones de proyecto que ya existen.
2. La identificación del servicio personalizado y la razón por la cual el entorno de ejecución es “`standalone`”.
3. Una habilidad validada, y una llamada de solo lectura que tuvo éxito.
4. Un resultado seguro para la entrada inválida.
5. Se mantuvieron las pruebas relacionadas con el cierre limpio de la instalación, así como el camino de entrega privado, que permaneció sin cambios.

### Ejecute el servicio de ejemplo.

El ejemplo completo se encuentra en la ruta [`examples/remote-server`](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server). El nombre de su directorio histórico sigue siendo el mismo. Ahora, el ejemplo funciona como un servicio independiente, y también puede descubrir el directorio de Skills que está incluido en él.

```bash
pip install dcc-mcp-core
dcc-mcp-cli lint skills
python server.py
```

Se espera que la salida inicial incluya una URL como `http://127.0.0.1:8765/mcp`, la identidad personalizada `studio-service`, y el estado de ejecución `standalone`.

### Utilice el Contenedor de Desarrollo.

El ejemplo incluye una configuración de [Contenedor de Desarrollo](https://containers.dev/). Las especificaciones y herramientas de línea de comandos son de código abierto. Por lo tanto, el mismo entorno de Python, Node.js, Core e Inspector funciona en cualquier editor compatible o desde una shell de agente, sin necesidad de tener una cuenta alojada.

Desde la raíz del repositorio central:

```bash
npm install --global @devcontainers/cli
devcontainer up --workspace-folder examples/remote-server
devcontainer exec --workspace-folder examples/remote-server python server.py
```

Utilice un segundo terminal para el control automatizado de humo.

```bash
devcontainer exec --workspace-folder examples/remote-server \
  npx --yes @modelcontextprotocol/inspector@latest --cli \
  http://127.0.0.1:8765/mcp --transport http --method tools/list
```

El laboratorio funciona como un usuario no raíz, y no monta el socket del contenedor host. Las credenciales privadas deben mantenerse fuera de la imagen.

Para el entrenamiento en grupo a través de navegadores, [Educates](https://docs.educates.dev/en/stable/) ofrece sesiones aisladas, pasos escritos en Markdown, terminales y un editor integrado. Se requieren operadores que conozcan Kubernetes, funciones relacionadas con ingresos, identidades, cuotas, imágenes y limpieza de sesiones. Utilice el contenedor de desarrollo local cuando esos servicios compartidos no sean necesarios.

### Prueba con MCP Inspector

Use el [MCP Inspector] oficial. Se ejecuta localmente; no requiere ningún tipo de cuenta alojada. También soporta el protocolo Streamable HTTP. Además, mantiene un servicio privado que no está conectado a Internet público. [MCP Inspector](https://github.com/modelcontextprotocol/inspector)

```bash
npx --yes @modelcontextprotocol/inspector@latest
```

`/mcp` en formato impreso. Busque `hello-world`, cargue el contenido y llame a `hello_world__greet` con `{"name":"Agent"}`. También envíe un nombre vacío y verifique si la respuesta es un error de validación estructurado.

::: warning ¿Por qué utilizar a un inspector local?
Un parque infantil alojado no puede acceder a un servicio de tipo MCP en red interna o en una intranet, sin exponerlo a riesgos. Para sistemas internos, el Inspector de código abierto local es la opción segura para utilizarlo. Nunca exponga el proxy que genera procesos a una red no confiable.
:::

### Verifique a través de la interfaz de línea de comandos.

Utilice la interfaz de línea de comandos después de que el servicio se haya registrado. Guarde el título devuelto por la búsqueda.

```bash
dcc-mcp-cli list --output toon
dcc-mcp-cli load-skill hello-world --dcc-type studio-service --output toon
dcc-mcp-cli describe <tool-slug-returned-by-load> --output toon
dcc-mcp-cli call <tool-slug-returned-by-load> --json '{"name":"Agent"}' --wait --output toon
```

## Cambiar una habilidad sin necesidad de agregar tiempo de ejecución.

Utilice esta instrucción cuando el entorno de ejecución ya exista.

```text
Usa dcc-mcp-skills-creator en el proyecto privado actual. Busca primero las Skills existentes y añade o mejora la que corresponda a este flujo. No crees un adaptador, servicio, repositorio ni paquete público. En SKILL.md, bajo metadata.dcc-mcp.*, declara los esquemas tipados, las anotaciones de seguridad, affinity, timeout, call_examples y next-tools. Implementa un único script de alcance limitado y reutiliza dcc_mcp_core.skills_helper cuando corresponda. Ejecuta dcc-mcp-cli lint sobre el directorio instalable, carga la Skill en el servicio existente y pruébala una vez con datos válidos y otra con datos no válidos. Entrega los resultados y espera mi autorización antes de publicar.
```

Use esta secuencia para realizar las siguientes acciones: **buscar la propiedad existente → esqueletar o editar el código → verificar el código con Lint → volver a cargar los datos → cargar los datos nuevamente → describir los datos obtenidos → ejecutar el código → diagnosticar cualquier problema que pueda surgir**.

## Depure el código sin adivinarlo.

| Síntomas | Luego, verifique lo siguiente: |
|---|---|
| La validación de las habilidades falla. | Por favor, resuelva el problema específico relacionado con `dcc-mcp-cli lint` antes de iniciar la ejecución del programa. |
| El servicio no responde. | Verifique la URL impresa. Luego, realice las solicitudes `GET /v1/healthz` y `GET /v1/readyz`. |
| Faltan habilidades. | Verifique la ruta padre de ese archivo. Luego, ejecute `reload-skills` y busque nuevamente. |
| El herramienta está ausente. | Carga la habilidad que lo posee y sigue el “`next_step`” que se devuelve. |
| La llamada falla. | Mantenga el valor de `request_id`. Ejecute `dcc-mcp-cli doctor` y analice los datos relacionados con las fallas. Luego, corrija el nivel de responsabilidad del layer que está causando el problema. |
| La dependencia privada no está disponible. | Se debe informar al propietario interno y eliminar las pruebas relacionadas con él. No se debe abrir ninguna publicación pública al respecto. |

## Pasar del éxito local a la entrega privada.

Se debe mantener el desarrollo en un entorno loopback. La exposición en el intranet requiere que el operador cuente con un sistema de autenticación TLS, listas de permisos de red/origen, gestión de secretos, almacenamiento de datos para auditorías, y control de desactivación del servicio. Se puede utilizar el mismo framework, archivos, contenedores, registro privado o sistema de implementación interno que ya existen en el proyecto. GitHub es opcional.

Lea más adelante:

- [Flujo de trabajo interno de servicio independiente](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/INTERNAL_SERVICE_WORKFLOW.md)
- [Ejemplo de contenedor de desarrollo abierto](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server/.devcontainer)
- [Flujo de trabajo del adaptador y del servicio](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/ADAPTER_WORKFLOW.md)
- [Sistema de habilidades](https://dcc-mcp.github.io/dcc-mcp-core/guide/skills)
- [Ámbitos de habilidades y políticas](https://dcc-mcp.github.io/dcc-mcp-core/guide/skill-scopes-policies)
- [Despliegue a distancia](https://dcc-mcp.github.io/dcc-mcp-core/guide/remote-server)
- [Arquitectura central](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture)
