---
title: "Agenten einrichten und die erste Verbindung prüfen"
description: "Installiere den Skill dcc-mcp, prüfe die Verbindung zur Anwendung und lies die Werkzeugparameter. Bei fehlgeschlagenen Aufrufen helfen die Diagnosebefehle."
pageClass: route-page
---

# Agenten einrichten und die erste Verbindung prüfen

Der [öffentliche Skill `dcc-mcp`](https://github.com/dcc-mcp/dcc-mcp-agent-plugins/tree/main/plugins/dcc-mcp/skills/dcc-mcp) beschreibt das Vorgehen für den Agenten. Mit `dcc-mcp-cli` prüfst du das Gateway, suchst Werkzeuge, führst typisierte Aufrufe aus, diagnostizierst Fehler, aktualisierst Komponenten und installierst Pakete aus dem Marktplatz.

Für die erste Verbindung brauchst du die CLI, das Gateway und den Adapter der Zielanwendung. Prüfe anhand der [Schnellstartanleitung](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started), was bereits installiert ist, und ergänze fehlende Komponenten.

Führe den folgenden Befehl im Arbeitsverzeichnis von Codex, Claude Code, Gemini CLI, GitHub Copilot, Cursor, Windsurf, OpenCode, Cline, Roo Code, Kiro CLI, Amp oder einem anderen mit Agent Skills kompatiblen Agenten aus.

```bash
npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

Verwenden Sie den Parameter `--global`, um eine Installation auf Benutzerebene durchzuführen. Starten Sie eine neue Agent-Sitzung, wenn der Host die Skills nur bei der Startaufrufung entdeckt.

Die Sektion zur Installation der Homepage enthält denselben Auswahlmöglichkeiten für die folgenden Tools: Codex, Claude Code, Cursor, Gemini CLI, GitHub Copilot, Windsurf, OpenCode, Cline, Roo Code, Kiro, Amp, CodeBuddy, OpenHands, Continue, Replit, OpenClaw und WorkBuddy.

Das npm-Paket ist optional. Nutzen Sie es, wenn ein Host oder ein Team von Lieferanten die Fähigkeiten über `node_modules` bereitstellen. Dies gilt beispielsweise in einer durch Pakete verwalteten oder offline betriebenen Umgebung.

```bash
npm install @dcc-mcp/skills
```

## Native Plugin-Märkte

Verwenden Sie einen host-nativeen Marktplatz, wenn Codex oder Claude Code einen anbieten. Diese Befehle installieren die gleiche kanonische `dcc-mcp` Fähigkeit aus dem [`dcc-mcp-agent-plugins` Repository](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#install).

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

Weitere Möglichkeiten zur Installation von nativen Plugins und der Registry sind im offiziellen Repository dokumentiert.

## Die erste Verbindung prüfen

```text
Verbinde dich mit Blender. Ermittle den Dateinamen der geöffneten Szene, ihre Collections und die Anzahl der Objekte. Lass die Szene unverändert und nenne die verwendete Instanz und das Werkzeug.
```

## Cloud-Agenten und DCC-MCP

Weitere Informationen zu den plattformübergreifenden Schnittstellen, zur Liste der Cloud-Software sowie zu den versionsgesicherten Arbeitsabläufen finden Sie in [Cloud Agents and DCC-MCP](/de/cloud-agents). Ein Shell-Agent kann die CLI sowie den HTTP-Gateway nutzen. Jede Anwendung, jedes Adapter-Element und jeder Arbeitsablauf muss jedoch noch im Zielumfeld validiert werden. Die DCC-Dienste sollten auf einem Loopback-Netzwerk betrieben werden. Für den Zugriff über verschiedene Netzwerke sollten TLS und Authentifizierung verwendet werden. Das Plugin enthält weder die Ziel-DCC-Software noch deren Lizenzen.

## Bewahren Sie die aktuellen Versionen der Fähigkeiten sowie des CLI auf.

Verwenden Sie den Updater, der für jede Installation verwendet wird. Die von GitHub heruntergeladenen Agent Skills verwenden das `skills`-Lockfile.

```bash
# Update managed copies in this workspace.
npx --yes skills@1.5.23 update -p -y

# Update managed user-level copies.
npx --yes skills@1.5.23 update -g -y
```

Überprüfen Sie den DCC-MCP CLI separat. Wenden Sie die geprüfte Aktualisierung nur mit Zustimmung an.

```bash
dcc-mcp-cli update check
dcc-mcp-cli update apply
```

OpenClaw und direkt über ClawHub installierte Skills verwenden die für sie hinterlegte Quelle und den zugehörigen Update-Befehl. Siehe [Installierte Skills aktualisieren](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#keep-installed-skills-current). Nutze `--force` nicht für unbeaufsichtigte Updates. Prüfe festgeschriebene oder lokal geänderte Skills vor dem Aktualisieren.

## Verwenden Sie eine kurze Anweisung.

Die Fähigkeit beinhaltet auch die entsprechenden Verfahren. Deshalb benötigt der Anweisung nur die Aufgabe sowie deren Sicherheitsgrenzen.

```text
Verwenden Sie die Fähigkeit „dcc-mcp“, um die Aufgabe zu beschreiben. Fragen Sie davor ab, den Systemzustand zu ändern. Beenden Sie den Vorgang mit einer Überprüfung der Ergebnisse.
```

## Installieren Sie nur die Fähigkeiten, die Sie tatsächlich benötigen.

| Beabsichtigung/Intent | Fähigkeiten |
| --- | --- |
| Führen Sie einen aktiven DCC-Code aus, entdecken Sie verschiedene Tools oder suchen Sie nach Erweiterungen. | `dcc-mcp` |
| Erstellen oder modernisieren Sie einen vollständigen Adapter/Umgebungsrahmen. | `dcc-mcp-creator` |
| Erstellen oder verbessern eines für DCC spezifischen Fähigkeitspakets. | `dcc-mcp-skills-creator` |

Ändere den Wert von `--skill` im allgemeinen Installationsbefehl nur für einen der beiden beschriebenen Entwicklungswege.

## Suchen, beschreiben und nennen.

```bash
# Confirm the gateway and connected hosts.
dcc-mcp-cli health
dcc-mcp-cli list

# Search narrowly, then follow the returned next_step.
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# Execute the returned tool slug with validated arguments.
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

Geben Sie keine Namen der Tools an, und laden Sie auch keine Backend-Schemata herunter. Suchen Sie zunächst nach den relevanten Informationen, bevor Sie die Schritte „`load`“ oder „`describe`“ ausführen. Diese Schritte finden sich in `next_step`.

## Verwenden Sie die Request-ID, bevor Sie erneut versuchen.

Behalten Sie den `request_id` aus dem fehlgeschlagenen Aufruf bei. Verwenden Sie den integrierten Weg zur Abfrage der Daten im CLI.

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

Entdecken Sie anschließend den Inhalt von `dcc_feedback__report` durch denselben Suchprozess. Überprüfen und redigieren Sie den Bericht vor dem Verbreiten des Inhalts. Die Erstellung einer externen Anfrage erfordert weiterhin die Autorisierung des Benutzers.

## Referenzen

- [Anfang machen](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started)
- [CLI-Referenz](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)
- [Referenz auf den Agenten](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [Gateway-Diagnostik](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [Marktplatz](/de/marketplace)
- [Anweisungen zur Präsentation](/de/examples)
- [Gemeinsame Aufgaben der KI und DCC](/de/use-cases)
- [Besichtigen Sie das Ökosystem.](/de/ecosystem)
