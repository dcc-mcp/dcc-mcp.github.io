---
title: "Adapter, Dienste und Skills entwickeln"
description: "Wähle den passenden Entwicklungsweg und teste einen privaten MCP-Dienst, einen Adapter oder einen spezialisierten Skill lokal."
pageClass: route-page
---

# Adapter, Dienste und Skills entwickeln

Wählen Sie die zuständige Schicht vor dem Erstellen der Dateien aus. DCC-MCP unterstützt öffentliche DCC-Adapter, private, nicht-DCC-basierte Dienste sowie spezielle Skill-Pakete. Es reicht aus, wenn es sich um eine lokale Ordnerstruktur oder eine interne Quellstruktur handelt.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Privater oder auf individuelle Anforderungen zugeschnittener MCP-Dienst</strong><span>Verwenden Sie dcc-mcp-creator.</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Fokussierter Arbeitsablauf – Fähigkeit</strong><span>Verwenden Sie die Fähigkeiten, die der „Skill-Creator“ bietet.</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>Gemeinsame Infrastruktur</strong><span>Beitrag leisten zur Kernfunktionen des Systems</span></a>
</div>

## Wählen Sie eine Entwicklungsroute aus.

| Ihre Bedürfnisse | Route |
|---|---|
| Verbinden Sie Maya, Blender, Unreal oder ein anderes Hostprozess. | Verwenden Sie `dcc-mcp-creator`, um einen DCC-Adapter zu erstellen oder zu verbessern. |
| Präsentieren Sie eine interne API, eine Benutzeroberfläche für die Kommandozeile, eine Datenbank mit Assets, eine Anlage zur Erstellung von Inhalten oder eine Dienstleistung zur Überprüfung der Ergebnisse. | Verwenden Sie `dcc-mcp-creator` mit einer benutzerdefinierten Service-ID sowie `instance_type="standalone"`. Es ist keine öffentliche Repository erforderlich. |
| Fügen Sie ein typisiertes Arbeitsprozessmodell zu einem bestehenden Adapter oder eigenständigen Dienst hinzu. | Verwenden Sie „`dcc-mcp-skills-creator`“. Erstellen Sie keine weitere Laufzeitumgebung. |
| Ändern des Gateways, des CLI, des Protokolls, der Sicherheit oder des Verhaltens zwischen den Hosts. | Bringen Sie den gemeinsamen Vertrag zu Core hinzu. |

Suchen Sie im [Ekosystem-Verzeichnis](/de/ecosystem) nach Informationen bezüglich der Public-Adapter oder Skills. Privatdienste benötigen keine Einträge im öffentlichen Katalog.

## Erstellen Sie einen privaten, nicht-DCC-basierten Dienst.

Verwenden Sie diesen Weg für ein internes System, das keine kreative Anwendung ist und wahrscheinlich auch nicht auf GitHub läuft. Führen Sie den Codierungsprozess aus, indem Sie den Code aus dem privaten Projekt verwenden. Verwenden Sie anschließend diesen Anweisungen zur Ausführung des Codes.

```text
Verwende dcc-mcp-creator für die Laufzeit und dcc-mcp-skills-creator für die Skill-Dateien. Arbeite ausschließlich im aktuellen privaten Projekt. Übernimm Sprache, Paketverwaltung, Tests, Authentifizierung und Bereitstellung aus dem Projekt. Erstelle weder ein GitHub-Repository noch einen öffentlichen Katalogeintrag, ein externes Ticket oder ein öffentliches Release.

Implementiere für einen tatsächlichen internen Arbeitsablauf einen kleinen Dienst mit stabiler Kennung und einem typisierten, lesenden Skill. Verwende DccServerBase und DccServerOptions.from_env(..., instance_type="standalone") ohne dcc_pid. Binde den Dienst in der Entwicklung ausschließlich an die Loopback-Schnittstelle. Führe Dienst-, Datei- und API-Aufrufe direkt aus. Ergänze einen Dispatcher oder eine Brücke nur beim Wechsel zwischen Threads oder Prozessen. Definiere geschlossene Ein- und Ausgabeschemas, alle Sicherheitsannotationen, ein Zeitlimit, einen Beispielaufruf und verständliche Fehlermeldungen ohne vertrauliche Daten. Bewahre Zugangsdaten in der bestehenden Geheimnisverwaltung auf.

Führe dcc-mcp-cli lint skills und den kleinsten passenden Projekttest aus. Starte den Dienst und gib seine tatsächliche /mcp-URL aus. Prüfe mit dem offiziellen MCP Inspector tools/list, die gezielte Suche und das Laden des Skills, describe, einen gültigen Aufruf, einen Eingabefehler und das saubere Beenden. Wiederhole den Ablauf in der CLI mit list, load-skill, describe und call sowie --output toon. Halte den zurückgegebenen slug und die request_id fest. Vermeide Vermutungen und blinde Wiederholungen. Nenne geänderte Dateien, Prüfergebnisse und offene Sicherheits- und Bereitstellungsaufgaben. Halte vor einer Veröffentlichung oder Änderung der gemeinsamen Infrastruktur an.
```

Erforderliche Validierung:

1. Die bestehenden Projektkonventionen werden weiterhin verwendet.
2. Die benutzerdefinierte Dienstkennung und der Grund für den Laufzeitmodus `standalone`.
3. Eine valideierte Fähigkeit – und eine erfolgreiche, ausschließlich zur Lesung dienende Anrufanlage.
4. Eine sichere Lösung für den Fall von ungültigen Eingaben.
5. Die Beweise für eine saubere Schließung sowie der privaten Lieferweg blieben unberührt.

### Führen Sie den Beispieldienst aus.

Das vollständige Beispiel befindet sich unter [`examples/remote-server`](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server). Der Name des Verzeichnisses bleibt gleich; das Beispiel startet nun als ein selbstständiges, loopback-fähiges Service. Zudem entdeckt das Beispiel das zugehörige Skill-Verzeichnis.

```bash
pip install dcc-mcp-core
dcc-mcp-cli lint skills
python server.py
```

Erwartete Ausgabe beim Start umfasst eine URL wie `http://127.0.0.1:8765/mcp`, die benutzerdefinierte Identität `studio-service` und die Laufzeitphase `standalone`.

### Verwenden Sie den Entwicklungscontainer.

Das Beispiel beinhaltet eine Konfiguration eines [Entwicklungscontainers](https://containers.dev/). Die Spezifikationen und Referenz-Programmiererklärungen sind Open Source. Somit kann dieselbe Python-, Node.js-, Core- sowie Inspector-Umgebung in einem kompatiblen Editor oder über eine Agent-Shell verwendet werden – ohne dass eine eigene Hosting-Kontrolle erforderlich ist.

Aus dem Wurzelverzeichnis des Core-Repositories:

```bash
npm install --global @devcontainers/cli
devcontainer up --workspace-folder examples/remote-server
devcontainer exec --workspace-folder examples/remote-server python server.py
```

Verwenden Sie einen zweiten Terminal für den automatisierten Inspektor zur Erkennung von Rauch.

```bash
devcontainer exec --workspace-folder examples/remote-server \
  npx --yes @modelcontextprotocol/inspector@latest --cli \
  http://127.0.0.1:8765/mcp --transport http --method tools/list
```

Das Labor funktioniert unter dem Namen eines nicht-roten Benutzers. Zudem wird das Host-Container-Socket nicht angelegt. Die privaten Zugangsdaten sollten außerhalb der Image gespeichert werden.

Für gruppenbasierte Trainings im Browser-Format bietet [Educates](https://docs.educates.dev/en/stable/) isolierte Sitzungen, Schritt-für-Schritt-Anleitungen in Markdown-Format, Terminalfunktionen sowie einen eingebetteten Editor. Dazu sind auch Operatorn für Kubernetes, Ingress, Identität, Quoten, Images sowie die Reinigung der Sitzungen erforderlich. Wenn diese gemeinsam genutzten Dienste nicht benötigt werden, kann man den lokalen Dev-Container verwenden.

### Testen mit MCP Inspector

Verwenden Sie den offiziellen [MCP Inspector](https://github.com/modelcontextprotocol/inspector). Er läuft lokal ab, erfordert keine Hosting-Konten. Er unterstützt Streamable HTTP und schützt außerdem einen privaten Loopback-Dienst vor dem öffentlichen Internet.

```bash
npx --yes @modelcontextprotocol/inspector@latest
```

Verbinden Sie sich mit der gedruckten URL `/mcp`. Suchen Sie nach „`hello-world`“, laden Sie diese Seite und rufen Sie anschließend `hello_world__greet` auf, wobei als Parameter „`{"name":"Agent"}`“ angegeben wird. Senden Sie außerdem einen leeren Namen und überprüfen Sie, ob es sich um ein strukturiertes Validierungsfehler handelt.

::: warning Warum sollte man einen örtlichen Inspektor nutzen?
Ein Hosted-Playground kann keine Loopback- oder Intranet-MCP-Dienste erreichen, ohne dabei seine Sicherheit zu gefährden. Für interne Systeme ist der lokale Open-Source-Inspector der sicherste Weg, um die Dienste zu nutzen. Verwenden Sie niemals einen Proxy, der Prozesse erstellt, in einem unzuverlässigen Netzwerk.
:::

### Überprüfen Sie das mithilfe der CLI.

Verwenden Sie die CLI, nachdem die Dienstverwaltung registriert wurde. Halten Sie den zurückgegebenen Schlüsselwert bei.

```bash
dcc-mcp-cli list --output toon
dcc-mcp-cli load-skill hello-world --dcc-type studio-service --output toon
dcc-mcp-cli describe <tool-slug-returned-by-load> --output toon
dcc-mcp-cli call <tool-slug-returned-by-load> --json '{"name":"Agent"}' --wait --output toon
```

## Eine Fähigkeit ändern, ohne dabei die Laufzeit zu verändern.

Verwenden Sie diesen Anweisungsblock, wenn das Laufzeitverhalten bereits existiert.

```text
Verwende dcc-mcp-skills-creator im aktuellen privaten Projekt. Suche zunächst nach vorhandenen Skills und ergänze oder verbessere den für diesen Ablauf zuständigen Skill. Erstelle keinen neuen Adapter, Dienst, kein Repository und kein öffentliches Paket. Deklariere in SKILL.md unter metadata.dcc-mcp.* typisierte Schemas, Sicherheitsannotationen, affinity, timeout, call_examples und next-tools. Implementiere ein klar begrenztes Skript und nutze dcc_mcp_core.skills_helper für bereits abgedeckte Funktionen. Prüfe das installierbare Verzeichnis mit dcc-mcp-cli lint, lade den Skill in der vorhandenen Laufzeit und teste je einen gültigen und ungültigen Aufruf. Berichte die Ergebnisse und hole vor der Veröffentlichung meine Zustimmung ein.
```

Verwenden Sie diese Abfolge: **Suchen nach bestehenden Eigentumsrechten → Erstellen oder bearbeiten → Überprüfen auf Fehler → Neuladen → Laden der Daten → Beschreibung der Daten → Ausführen des Codes → Diagnose**.

## Fehler beheben – ohne Vermutungen anstellen.

| Symptom | Nächster Check |
|---|---|
| Die Überprüfung der Fähigkeiten scheitert. | Bei der Ausführung des Programms muss zuerst das genaue Problem mit `dcc-mcp-cli lint` behoben werden. |
| Der Service antwortet nicht. | Überprüfen Sie die ausgedruckte URL. Anschließend versuchen Sie, mit den Befehlen `GET /v1/healthz` und `GET /v1/readyz` eine Verbindung herzustellen. |
| Fähigkeiten fehlen. | Überprüfen Sie den jeweiligen Elternpfad. Führen Sie anschließend `reload-skills` aus, und suchen Sie erneut. |
| Das Werkzeug fehlt. | Laden Sie die zugehörige Fähigkeit herunter und folgen Sie dem zurückgegebenen `next_step`. |
| Anrufversuch fehlschlägt. | Behalten Sie `request_id` bei, führen Sie `dcc-mcp-cli doctor` aus und überprüfen Sie die Statistiken bezüglich der Fehler. Anschließend müssen Sie die zuständige Schicht korrigieren. |
| Private Abhängigkeit ist nicht verfügbar. | Berichten Sie über den internen Eigentümer sowie die entzifferten Beweise. Öffnen Sie keine öffentliche Anfrage. |

## Vom lokalen Erfolg zur privaten Lieferung übergehen.

Die Entwicklung sollte weiterhin auf dem Loopback-Server stattfinden. Die Veröffentlichung im Intranet erfordert eine Authentifizierung durch den Betreiber, Netzwerk-/Quellenlisten, die Verwaltung von Geheimnissen, die Aufbewahrung von Audit-Daten sowie die Kontrolle über den Schalter. Nutzen Sie das bestehende Projektverzeichnis, Archivsystem, Container, private Registry oder interne Entwicklungsumgebungen. GitHub ist optional.

Lesen Sie weiter:

- [Internes, eigenständiges Service-Workshop-Modell](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/INTERNAL_SERVICE_WORKFLOW.md)
- [Beispiel für offene Dev-Container](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server/.devcontainer)
- [Adapter und Service-Workshop](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/ADAPTER_WORKFLOW.md)
- [Fähigkeitssystem](https://dcc-mcp.github.io/dcc-mcp-core/guide/skills)
- [Fähigkeitsbereiche und Richtlinien](https://dcc-mcp.github.io/dcc-mcp-core/guide/skill-scopes-policies)
- [Ferner Ausführung](https://dcc-mcp.github.io/dcc-mcp-core/guide/remote-server)
- [Kernsystemarchitektur](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture)
