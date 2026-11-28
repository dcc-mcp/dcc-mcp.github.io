---
title: "Instalación y primera conexión del agente"
description: "Instala la Skill dcc-mcp, verifica la conexión con la aplicación y consulta los argumentos de las herramientas. Aprende a diagnosticar llamadas fallidas."
pageClass: route-page
---

# Instalación y primera conexión del agente

La [Skill pública `dcc-mcp`](https://github.com/dcc-mcp/dcc-mcp-agent-plugins/tree/main/plugins/dcc-mcp/skills/dcc-mcp) describe el procedimiento que sigue el agente. Con `dcc-mcp-cli` puedes comprobar el Gateway, descubrir herramientas, realizar llamadas tipadas, diagnosticar fallos, actualizar componentes e instalar paquetes del Marketplace.

Para la primera conexión necesitas la CLI, el Gateway y el adaptador de la aplicación. Sigue la [guía de inicio rápido](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started) para comprobar qué componentes tienes y añadir los que falten.

Ejecuta el siguiente comando en el espacio de trabajo de Codex, Claude Code, Gemini CLI, GitHub Copilot, Cursor, Windsurf, OpenCode, Cline, Roo Code, Kiro CLI, Amp u otro agente compatible con Agent Skills.

```bash
npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

Use el parámetro `--global` para realizar la instalación a nivel de usuario. Inicie una nueva sesión del agente, siempre que el host descubra las habilidades solo al inicio.

La sección de instalación de la página principal cuenta con el mismo selector de comandos para los siguientes programas: Codex, Claude Code, Cursor, Gemini CLI, GitHub Copilot, Windsurf, OpenCode, Cline, Roo Code, Kiro, Amp, CodeBuddy, OpenHands, Continue, Replit, OpenClaw y WorkBuddy.

El paquete npm es opcional. Se puede utilizar cuando un host o el flujo de trabajo del equipo necesita contar con los componentes necesarios a través de `node_modules`. Esto ocurre, por ejemplo, en configuraciones donde los componentes son gestionados por el paquete, o en entornos sin conexión a Internet.

```bash
npm install @dcc-mcp/skills
```

## Mercados de complementos nativos

Use los mercados de host nativo cuando Codex o Claude Code los ofrezcan. Estos comandos instalan la misma versión canonical de `dcc-mcp`, desde el repositorio [`dcc-mcp-agent-plugins`](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#install).

### Codex

```bash
codex plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins
codex plugin add dcc-mcp@dcc-mcp
```

### Claude Code

```text
/plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins
/plugin install dcc-mcp@dcc-mcp
```

Otras opciones de instalación de plugins y registros nativos se encuentran documentadas en el repositorio oficial.

## Comprobar la primera conexión

```text
Conecta con Blender e indica el nombre del archivo de la escena abierta, sus colecciones y el número de objetos. Conserva la escena sin cambios e identifica la instancia y la herramienta utilizadas.
```

## Agentes en la nube y DCC-MCP

Consulte [Cloud agents and DCC-MCP](/es/cloud-agents) para obtener información sobre las interfaces de la plataforma, el inventario de software en la nube y las pruebas de los flujos de trabajo con versiones específicas. Un agente de shell puede utilizar la interfaz de comandos y el puerto HTTP. Sin embargo, cada aplicación, adaptador y flujo de trabajo aún necesita ser validado en el entorno de destino. Es importante mantener los servicios DCC en un entorno de loopback, y utilizar TLS y autenticación para el acceso entre redes diferentes. El complemento no incluye el software DCC o sus licencias.

## Mantenga actualizados los conocimientos técnicos y las herramientas de línea de comandos.

Utilice el actualizador que corresponde a cada instalación. Los agentes Skills instalados desde GitHub utilizan el archivo de bloqueo “`skills`”.

```bash
# Update managed copies in this workspace.
npx --yes skills@1.5.23 update -p -y

# Update managed user-level copies.
npx --yes skills@1.5.23 update -g -y
```

Verifique el DCC-MCP CLI por separado. Luego, aplique la actualización verificada solo con el consentimiento de las partes involucradas.

```bash
dcc-mcp-cli update check
dcc-mcp-cli update apply
```

OpenClaw y las instalaciones directas de ClawHub utilizan sus propias fuentes de registro y comandos de actualización. Consulte [Mantener las habilidades instaladas actualizadas](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#keep-installed-skills-current). No agregue el parámetro `--force` a las actualizaciones automáticas; las habilidades fijas o modificadas localmente deben detenerse para ser revisadas.

## Utilice un prompt breve.

La habilidad implica el seguimiento de ciertos procedimientos. Por lo tanto, el prompt solo necesita indicar la tarea que se debe realizar y los límites de seguridad relacionados con ella.

```text
Utilice la habilidad dcc-mcp para <describir la tarea DCC>. Pregunte antes de instalar o cambiar el estado del sistema. Finalice con pruebas que demuestren que se ha cumplido con las instrucciones.
```

## Instale solo las habilidades que realmente necesita.

| Intentar. | Habilidad |
| --- | --- |
| Opere con un DCC en vivo, descubra herramientas o busque extensiones adecuadas. | `dcc-mcp` |
| Cree o modernice un adaptador/entorno completo. | `dcc-mcp-creator` |
| Cree o mejore un paquete de habilidades específico para DCC. | `dcc-mcp-skills-creator` |

Solo reemplace el valor `--skill` en la orden universal cuando la tarea corresponda a una de las dos rutas de desarrollo disponibles.

## Buscar, describir y llamar.

```bash
# Confirm the gateway and connected hosts.
dcc-mcp-cli health
dcc-mcp-cli list

# Search narrowly, then follow the returned next_step.
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# Execute the returned tool slug with validated arguments.
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

No adivinen los nombres de las herramientas, ni carguen todos los esquemas de backend. Busquen primero, y luego realicen la acción `load` o `describe` en el paso indicado en `next_step`.

## Utilice el ID de la solicitud antes de intentar nuevamente.

Guarde el `request_id` obtenido en el caso de una llamada fallida. Utilice la ruta de evidencia integrada en la CLI para obtener esa información.

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

Luego, descubre el archivo `dcc_feedback__report` mediante el mismo proceso de búsqueda. Revisa y edita el informe antes de compartirlo. Crear un problema externo sigue requiriendo la autorización del usuario.

## Referencia

- [Comienzo](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started)
- [Referencia CLI](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)
- [Referencia del agente](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [Diagnósticos de Gateway](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [Mercado](/es/marketplace)
- [Preguntas para mostrar los productos/servicios](/es/examples)
- [Tareas comunes de IA y DCC](/es/use-cases)
- [Navegue por el ecosistema.](/es/ecosystem)
