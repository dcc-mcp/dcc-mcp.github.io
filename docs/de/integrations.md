---
title: "Integrationen für Kreativsoftware"
description: "Finde MCP-Adapter, CLI-Kennung und offizielles Repository für dein Kreativprogramm."
pageClass: integrations-page
outline: [2, 3]
---

# Integrationen für Kreativsoftware

DCC-MCP verbindet AI-Agenten mit dem digitalen Content-Entwicklungsprogramm, das Ihr Team bereits verwendet. Dieser Verzeichnisbaum weist jedem unterstützten Programm den entsprechenden Adapter-Repository zu sowie die gängigen Suchbegriffe, die von den Menschen verwendet werden. Dazu gehören **Maya MCP**, **Blender MCP**, **Houdini MCP**, **3ds Max MCP**, **Substance Painter MCP** und **SP MCP**.

Verwenden Sie die [offizielle Website](https://clawhub.ai/loonghao/skills/dcc-mcp), um einen verbundenen DCC zu bedienen. Nutzen Sie außerdem die [Skill Marketplace](/de/marketplace), um Erweiterungen für Ihr Arbeitsprozessmodell zu finden. Zudem können Sie mit [`dcc-mcp-cli dcc-types`](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference) den aktuellen Katalog der verfügbaren Funktionen überprüfen.

## Offizielle Liste der DCC MCP-Mitglieder

Die Tabelle zeigt eine Auswahl von Integrationen. Der Katalog von Core 0.20.39 enthält 38 Adapterkennungen, darunter Wwise. Prüfe den installierten Katalog mit `dcc-mcp-cli dcc-types`. [DCC-MCP-Projektverzeichnis](/de/ecosystem)

| Anwendung | Häufige Suchbegriffe | Offizielle Integration |
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

## Häufige Suchanfragen nach DCC MCP

### Gibt es einen „Maya MCP“?

Ja. Die offizielle [Maya MCP Integration](https://github.com/dcc-mcp/dcc-mcp-maya) verbindet Autodesk Maya mit dem DCC-MCP Gateway. Nutzen Sie die eingegebenen Suchfunktionen und die Anruffluss, um die in der verbundenen Maya-Instanz verfügbaren Tools zu entdecken.

### Gibt es einen Blender MCP?

Ja. Die offizielle [Integration von Blender mit MCP](https://github.com/dcc-mcp/dcc-mcp-blender) verbindet Blender mit dem gleichen Gateway und unterstützt die gemeinsame Erkennung, Validierung sowie Arbeitsablaufverträbe im Bereich DCC-MCP.

### Gibt es einen Houdini-MCP?

Ja. Die offizielle Integration von SideFX Houdini mit [Houdini MCP](https://github.com/dcc-mcp/dcc-mcp-houdini) stellt einen Repositorien- und Host-spezifischen Implementierungsansatz bereit.

### Was bedeutet SP MCP?

„SP MCP“ ist eine gebräuchliche Abkürzung für „Substance Painter MCP“. Der offizielle Name lautet „Substance 3D Painter MCP“. Diesen Namen stellt das Repository [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) bereit. Nutzen Sie dieses Repository sowie den DCC-MCP Marketplace, wenn Sie Workflows zur Erstellung von Texturen benötigen.

### Wie finde ich ein Tool für DCC MCP?

Installiere den öffentlichen DCC-MCP-Skill, prüfe das Gateway mit `dcc-mcp-cli health` und grenze die Suche mit `dcc-mcp-cli search --query <intent> --dcc-type <host>` ein. Folge dem zurückgegebenen `next_step`. Installation und Kompatibilität beschreibt das Repository des jeweiligen Adapters.

## Fahren Sie fort.

- [Verwenden Sie DCC-MCP von einem Agenten.](/de/agents)
- [Suchen Sie im Skill Marketplace nach passenden Lösungen.](/de/marketplace)
- [Verstehen Sie das Produktionsmodell.](/de/why-dcc-mcp)
- [Betrachten Sie das gesamte Ökosystem.](/de/ecosystem)
