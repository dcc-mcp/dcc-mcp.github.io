---
title: "Cloud-Agenten und DCC-MCP"
description: "Vergleiche Schnittstellen, datierte Tests und Installationsvoraussetzungen, bevor du eine Cloud-Maschine oder Workstation auswählst."
pageClass: route-page
---

# Cloud-Agenten und DCC-MCP

Wählen Sie für DCC-MCP einen Cloud- oder Workstation-Workshop aus – unter Berücksichtigung der aktuellen Softwaretests, der Plattforminterferenzen, der Installationsvoraussetzungen sowie der Einsatzbeschränkungen.

DCC-MCP verbindet einen AI-Agenten mit kreativen Anwendungen durch eingesetzte Tools, MCP sowie `dcc-mcp-cli`. Ein Cloud-Agent kann Dokumente überprüfen, Änderungen vornehmen, Ressourcen exportieren und das Ergebnis überprüfen – vorausgesetzt, seine Umgebung verfügt über die entsprechenden Anwendungen, einen funktionierenden Adapter sowie eine autorisierte Verbindung. Ein Agent, der auch über eine Shell-Überwachung verfügt, kann den CLI-Client sowie den HTTP-Gateway ohne die Nutzung von MCP-Einstellungen verwenden.

Dieser Leitfaden behandelt die „OpenAI-Dot“-Plattformen, „Grok Bot“, „Meta Muse“ (den persönlichen Agenten) sowie „Manus Cue“. Die Dokumentationen dieser Plattformen werden getrennt von den Testdaten gespeichert. Dieser Computer wird für die Entwicklung und Bereitstellung von Lightbox verwendet. DCC-MCP stellt die Integration der Anwendungen sicher. Die Ergebnisse dieses Computers zeigen keine Unterstützung für alle Accounts, Bilder oder Plattformen. Es handelt sich dabei um unabhängige Integrationen – es gibt keine Aussage bezüglich einer Partnerschaft mit einer bestimmten Plattform.

## Stufen der Beweislage {#evidence-levels}

Die überprüften Beweise stammen vom **2026-10-01 UTC**. Eine installierte Anwendung, eine Eintragung im CLI-Katalog sowie eine funktionierende Anweisung des MCP-Tools sind unterschiedliche Beobachtungen.

| Etikett/Bezeichnung | Was die Beweise aussagen… |
| --- | --- |
| MCP wurde getestet. | Ein bestimmter Adapter sowie eine Verbindung haben in der angegebenen Umgebung einen bestimmten Arbeitsablauf abgeschlossen. Experimentelle Versionen sowie noch nicht veröffentlichte Patches bleiben weiterhin explizit angegeben. |
| Nur in der Originalsprache. | Die Anwendung erzeugte ein „Artefakt“ oder bestand mit Hilfe ihrer eigenen CLI/API in einer kleinen Überprüfung. Es wird jedoch keine Zustimmung der DCC-MCP vorausgesetzt. |
| Die offizielle Schnittstelle ist verfügbar. Die Funktionalität von DCC wurde bisher nicht getestet. | In der Plattformdokumentation wird eine Schnittstelle beschrieben, die eine Integration ermöglichen könnte. Es handelt sich dabei um eine Machbarkeitsbewertung – keine getestete DCC-Arbeitsweise. |
| **Nicht bestätigt** | Die erforderliche Schnittstelle oder das entsprechende Verhalten der Anwendung wurde noch nicht definiert. |

Ein unvollständiger oder abgelehnter MCP-Worksflow wird als „Lücke“ gemeldet – auch dann, wenn ein Zwischendatei erstellt wurde. Die Adapter-Repositories sind für die Installation sowie die Unterstützung der jeweiligen Versionen verantwortlich. Diese Seite fasst die Ergebnisse des Cloud-Worksflows zusammen.

## Plattform-APIs {#platform-interfaces}

| Plattform und Umgebung | Offizielle Schnittstelle und mögliche Route | Software/Adapter/Beweisstücke bezüglich des Arbeitsablaufs | Nicht bestätigt oder nicht getestet |
| --- | --- | --- | --- |
| OpenAI-Dots: Ein Cloud-Computer oder ein autorisierter persönlicher Computer. | Cloud-Computer, Browser, Dateien und Apps; Plugins sowie autorisierte Aufgaben für den persönlichen Computer. Weitere Informationen finden Sie unter [Computers und Apps](https://learn.chatgpt.com/docs/dots/computers-and-apps) sowie [Plugins](https://learn.chatgpt.com/docs/plugins). | Der untenstehende Linux-Computer verfügt über native Softwaretests sowie begrenzte Adapter-Experimente. Die Versionen der Adapters und die dazugehörigen Routen werden für jede Softwarezeile aufgezeichnet. | In den Dokumenten wird keine universelle Cloud-OS, kein DCC-Inventar oder eine Kompatibilität mit Adaptern angegeben. Für Aufgaben auf dem persönlichen Computer ist es notwendig, dass der angeschlossene Computer online ist und die ChatGPT-Anwendung geöffnet ist. |
| Grok Bot verfügt über einen Linux-Computer als Host. | [Computer, Shells und Desktop-Tools](https://docs.x.ai/grok-bot/computer-and-apps); [Linux-Identitäten/Zugriffen](https://docs.x.ai/grok-bot/identity-and-access); [Benutzerdefinierte MCP-Remote-HTTPS-Verbindungen und Befehle](https://docs.x.ai/grok-bot/team-bots#plugins). CLI + HTTP ist eine mögliche Lösung für die Shell-Verbindung. | Die offizielle Schnittstelle ist verfügbar. Die Funktionalität von DCC wurde bisher nicht getestet. Die Softwareversion ist ebenfalls ungetestet. Der Adapter wurde ebenfalls nicht getestet. Es wurde keine DCC-Arbeitsweise durchgeführt. | Die Unterstützung durch den Command MCP verifiziert keine Standard-DCC-Verbindung. Es gelten die Beschränkungen bezüglich des Command-Secret sowie die Vorgaben bezüglich der Team-Sichtbarkeit. Die Fernzugriffsmöglichkeiten erfordern eine geschützte TLS/Auth-Verbindung am Edge. |
| **Meta Muse**, eine persönliche Linux-VM als Agent | [Muse als persönlicher Agent](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) sowie die Verbindungen von Muse zum Debian-Ökosystem und zu APIs/CLI-Schnittstellen (https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse). Eine Integration über CLI/APIs ist eine mögliche Lösung, wie aus diesen Schnittstellen hervorgeht. | Die offizielle Schnittstelle ist verfügbar. Die Funktionalität von DCC wurde bisher nicht getestet. Die Softwareversion ist ebenfalls ungetestet. Der Adapter wurde ebenfalls nicht getestet. Es wurde keine DCC-Arbeitsweise durchgeführt. | Die Fähigkeiten des nativempc-Moduls, die allgemeine Bedienung über das GUI sowie die Möglichkeit der Softwareinstallation wurden von diesen Quellen nicht bestätigt. Muse Code ist ein separates Produkt. Die Ressourcen für die Laufzeitumgebung sowie die Zugangsberechte zur Verbindung mit anderen Systemen gelten weiterhin. |
| **Manus Cue** – eine unabhängige App für persönliche Beratungen. | [Der Abschnitt „Cue“ in „Introducing Manus 2.0“ beschreibt eine unabhängige mobile/Desktop-App sowie den eigenen Computer jedes Agents.](https://manus.im/blog/introducing-manus-2-0) | Nicht bestätigt. OS/Software: Nicht bestätigt. Adapter/Konnektierung: Nicht getestet. Kein DCC-Worksflow wurde hier durchgeführt. | Cue-spezifische Schalen, MCP-Konnektoren sowie beliebige DCC-Software sind noch nicht bestätigt. Die Fähigkeiten von Manus Studio sind keine Beweise für die Verwendung von Cue. |

## Cloud-Softwareinventar {#cloud-software-inventory}

Der beobachtete Computer verwendete **Debian 13.6, x86_64**. Die grafische Benutzeroberfläche funktionierte einwandfrei. Das Fehlen einer „`DISPLAY`“-Variable bedeutet nicht, dass die grafische Oberfläche des Computers nicht vorhanden war. Dies ist eine ältere Liste der Spezifikationen dieses Computers – keine garantierten Eigenschaften vor der Installation. Bei diesen Überprüfungen wurde kein Adapter verwendet. Die ursprüngliche Umgebung enthielt keine DCC-MCP-Pakete.

| Plattform/Software-Version | Verwendeter Adapter/Konnektor | Natives Workflow und Beweise | Verbleibende Grenzen |
| --- | --- | --- | --- |
| Punkte – Debian 13.6 x86_64 / Inkscape **1.4** | Keine / native CLI-Programmierung und verwaltete GUI-Technologie | SVG-Abfragen und PNG-Export – herzlich willkommen. Es wird eine grafische Benutzeroberfläche unterstützt. **Nur native Funktionen.** | Die native Erweiterungsaktivität sowie der Produktionsablauf von DCC-MCP erfordern separate Überprüfungen. |
| Punkte: Debian 13.6 x86_64 / FreeCAD **1.0.0** | Keine / System: Python + Part API | Es wurden die FCStd- und STEP-Artefakte erstellt. **Nur für die native Version.** | Eine kontaminierte Umgebung brach zusammen; eine saubere Umgebung wiederherstellte die Ausführung der Prozesse. Die Validierung der Ergebnisse des Adapters ist eine separate Überprüfung. |
| Punkte: Debian 13.6 x86_64 / GIMP **3.0.4** | Keine / native Batch-API | Erstellung von Dokumenten in Batch-Version. **Nur native Funktionen.** | Die Startphase des Adapters, die Anrufe der Tools sowie die Akzeptanz der Ausgabe/Inbeschreibung sind noch nicht getestet. |
| Punkte: Debian 13.6 x86_64 / OpenSCAD **2021.01** | Keine / Natives CLI | Erstellter STL-Code. **Nur für native Anwendungen geeignet.** | Die Akzeptanz des Adapters ist von der Ausgabe über die Kommandozeile getrennt. |
| Punkte: Debian 13.6 x86_64 / Blender **4.3.2** | Keine Ausführung mit nativem Hintergrund. | Die gesicherte Mischung wurde exportiert als GLB-Datei. Die CPU-Animation ist abgeschlossen – dabei wurde die Unschärfeentfernung deaktiviert. **Nur native Version.** | Unterhalb des Adapters gibt es keine Unterstützung mehr – **4,5**. OIDN und Draco sind nicht verfügbar. Dies bedeutet, dass keine der unterstützten Versionen von Blender verwendet werden kann. |
| Punkte: Debian 13.6 x86_64 / Godot **4.6.3** | Kein / native, headless CLI | Hohlmäßige Hinrichtung. **Nur native Lösungen möglich.** | Die Arbeitsabläufe für den Editor und die Anpassungen wurden noch nicht getestet. |
| Punkte: Debian 13.6 x86_64 / FFmpeg **7.1.5** | Keine / Natives CLI | Erstellt in MP4-Format. **Nur native Formate.** | Kein DCC-MCP-Adapter wurde getestet. |
| Punkte – Debian 13.6 x86_64 / ImageMagick (**Version nicht aufgeführt**) | Keine / Natives CLI | Erstellt in PNG-Format. **Nur native Format.** | Notieren Sie die ursprüngliche Version, bevor Sie einen reproduzierbaren Adapter-Workshop durchführen. |
| Punkte: Debian 13.6 x86_64 / CadQuery **2.7** | Keine / Python API | Kleine API-Überprüfungen. **Nur für native Anwendungen geeignet.** | Das vollständige Modellieren/Exportieren sowie der Ablauf des Adapters wurden noch nicht getestet. |
| Punkte: Debian 13.6 x86_64 / KiCad **9.0.2** | Keine / Python API | Kleine API-Überprüfungen. **Nur für native Anwendungen geeignet.** | Die Bearbeitung/Export von PCB-Daten sowie der Ablauf des Adapters wurden noch nicht getestet. |
| Punkte: Debian 13.6 x86_64 / ParaView **5.13.2** | Keine / Python API | Kleine API-Überprüfungen. **Nur für native Anwendungen geeignet.** | Die Visualisierung/Exportfunktionen sowie der Ablauf des Prozesses mit dem Adapter sind noch nicht getestet. |
| Punkte: Debian 13.6 x86_64 / QGIS **3.40.6** | Keine / Python API | Kleine API-Überprüfungen. **Nur für native Anwendungen geeignet.** | Das Projekt-/Export-Verfahren sowie der Ablauf des Adapters wurden noch nicht getestet. |
| Punkte: Debian 13.6 x86_64 / LibreOfficeDev **26.8 Alpha** | Keine / Natives CLI | Experimentelle Umwandlung von DOCX-Dateien in PDF-Dateien. **Nur native Umwandlung; experimentell.** | Alpha-Version – keine Anforderungen bezüglich der Produktionsqualität oder der Akzeptanz durch die Adapters. |
| Punkte: Debian 13.6 x86_64 / Kdenlive **24.12.3** | Keine / Version/Help-CLI | Die Executable antwortete auf die Anfrage „version/help“. **Nicht bestätigt** bezüglich der Anzeige dieser Informationen. | Es wurde kein Workflow für die Umwandlung in eine verfügbare Form getestet. |
| Punkte: Debian 13.6 x86_64 / Slicer (**Version nicht ermittelt**) | Kein / Anwendungspunkt | Eingangspunkt gefunden. Der Versuch ohne Anfang und Ende scheiterte. **Nicht bestätigt.** | Die native Ausführung sowie die Integration mit dem Adapter bleiben weiterhin ungelöst. |

## Cloud MCP-Tests {#cloud-mcp-tests}

Die folgenden „gebundenen Experimente“ wurden vom Testarbeiter am **2026-10-01 UTC** abgeschlossen: Zwei MCP-Schleifen konnten nach der Anpassung der lokalen Parameter abgeschlossen werden. Ein Experiment bezüglich der Kompatibilität mit Blender konnte nicht abgeschlossen werden, da die Anforderungen nicht erfüllt wurden. Ein weiterer Versuch bezüglich des Produktionsablaufs in Inkscape blieb ebenfalls blockiert. Die Ergebnisse der Website-Tests sowie die Überprüfungen auf dem PC8 werden in einer separaten Dokumentation festgehalten. Diese Daten sind keine allgemeine Zertifizierungsergebnisse. Der [öffentliche Beweisbericht](/cloud-evidence/2026-10-01.json) enthält die bereitgestellten Ergebnisse sowie die Identitäten der lokalen Anpassungen. Der Bericht enthält keine Patchnachrichten, keine Zugangsdaten oder private Download-Links.

| Plattformen / Software | Adapter/Entkopplung oder Quelle/Verbindung | Workflow und beobachtete Beweise | Nicht getestet oder blockiert |
| --- | --- | --- | --- |
| dots / Debian 13.6 x86_64 / Blender **4.3.2** | „`dcc-mcp-blender`“ wurde mit der Version **0.2.12** veröffentlicht. Zudem wird die Core-Version **0.20.39** verwendet. Es handelt sich dabei um eine reale Version von MCP. | Initialisierung, Listung/Load von Objekten, Erstellung einer neuen Szene, Speicherung von Blendenwerten, Bereinigung der Szene, Wiederöffnung der Szene, Überprüfung der Szene sowie Export in GLB-Format. **MCP-getestet; Kompatibilitätsprüfung.** | Unter [offiziellem Support für Blender 4.5](https://github.com/dcc-mcp/dcc-mcp-blender). Arbiträre Skripte sind deaktiviert; Draco hat dies explizit deaktiviert. Vollständiger Support für Blender 4.3 ist nicht gegeben – auch die GUI sowie die Möglichkeit, durch MCP zu rendern, sind nicht verfügbar. |
| dots / Debian 13.6 x86_64 / FreeCAD **1.0.0** | [`dcc-mcp-freecad`](https://github.com/dcc-mcp/dcc-mcp-freecad) / Unveröffentlichte lokale Patches: `f761672f62ab8d0d1ae3d77a6379249e307eeff1` / Echt MCP + Core **0.20.39** | Es werden Listenwerte mit dem Schlüsselwort „`verified`“ erstellt, gespeichert, wieder geöffnet und exportiert. Zudem kann man die Ergebnisse nach der Behebung des Problems unabhängig überprüfen. **MCP wurde mit einer lokalen Patchnummer getestet.** 138 Tests wurden erfolgreich abgeschlossen – darunter 3 Tests auf dem echten Host sowie ein Test mit Ruff. | Der Patch wurde noch nicht veröffentlicht – es gibt keine entfernbare Version des Patches. Ein erfolgreicher Schreibvorgang in der native Sprache war zwar möglich, doch die Validierung des MCP-Jobs war vor der Behebung noch nicht abgeschlossen. Die lokale Commit-Datei ist daher nur ein Beweis dafür, dass der Patch tatsächlich implementiert wurde – aber es handelt sich dabei nicht um eine veröffentlichte Version des Patches. |
| dots / Debian 13.6 x86_64 / Inkscape **1.4** | [`dcc-mcp-inkscape`](https://github.com/dcc-mcp/dcc-mcp-inkscape) / Quelle: `9769234` / Entdeckung von MCP-Elementen; grafische Benutzeroberfläche sowie vorübergehende Abhängigkeiten von `inkex` für die native Funktionen. | Die Entdeckungen/Leistungen waren lesbar. Die „headless“-Ausführung verfügte nicht über die entsprechenden native Erweiterungsmöglichkeiten. Die Erstellung der GUI erfolgte in Form von nativem SVG-Format. Allerdings konnte die Validierung der Herkunft der Daten für den Linux-GLib-Doppelfork-Fehler nicht erfolgen. **Das Produktionsprozessmodell von MCP ist noch nicht vollständig ausgearbeitet.** | Es gibt ein Problem bei der Integration des Linux-Quellcodes. Man sollte die Überprüfungen der Herkunft nicht vernachlässigen – auch nicht die Überprüfungen bezüglich der Produktionsqualität. Der SVG-Intervallstabak stellt keine erfolgreiche Produktionseinheit dar. |
| dots / Debian 13.6 x86_64 / OpenSCAD **2021.01** | [`dcc-mcp-openscad`](https://github.com/dcc-mcp/dcc-mcp-openscad) auf Basis von **0.2.1**, mit unveröffentlichtem lokalem Patch `799fc2af97d13365613545347e4d4817e9f75b48`; getestet mit MCP und Core **0.20.39** | Versionserkennung, Wiederöffnung/Inspektion neuer Sitzungen, Kompilierung von Parametern, Export in Binär- und ASCII-Format sowie unabhängige Readbacks wurden nach der „`verified`“-Boolean-Fixierung durchgeführt. Es wurden **12 Dreiecke mit einer Fläche von 7200 mm³** gefunden; die Sicherheitsprüfungen wurden erfolgreich abgeschlossen. **MCP wurde mit einer lokalen Patches testiert.** 129 Unitests wurden erfolgreich abgeschlossen, 4 Tests, die nur für Windows gültig sind, wurden übersprungen. 2 native Tests wurden ebenfalls erfolgreich abgeschlossen. | Der Patch wurde nicht veröffentlicht. PNG-Dateien konnten nicht geladen werden, da der Pfad zur Shell-DISPLAY/OpenGL-Abteilung nicht korrekt war. Die SCAD-Quelldateien wurden als lokale Texte erstellt. Der Adapter verfügt über keine eigene Authoring-API – daher handelt es sich dabei nicht um eine von vorneherein erstellte Modellierung mithilfe von MCP. |

## Wählen Sie eine Verbindung aus. {#choose-a-connection}

1. **Anwendung auf dem Cloud-Computer des Agents:** Verwenden Sie einen unterstützten lokalen Adapter sowie die CLI oder den MCP-Client der jeweiligen Umgebung. Überprüfen Sie zunächst die genauen Versionen der Anwendung und des Adapters. Nativ API’s sind nützlich, um einen geeigneten Integrationskandidaten zu finden. Anschließend kann man den Adapter über die Typisierungsmethode akzeptieren.
2. **Anwendung auf einer autorisierten Arbeitsstation:** Der DCC-Sender sollte auf „Loopback“-Modus eingestellt werden. Die Verbindung sollte über eine genehmigte Computerverbindung oder einen geschützten Gateway hergestellt werden. Der Cloud-Agent benötigt Zugang zu den gewünschten Projekt- und Artefaktpfaden. Die Arbeitsstation muss dabei weiterhin verfügbar bleiben.
3. **Agent mit Shell-Funktionen:** Verwenden Sie `dcc-mcp-cli` für die Inventarisierung, die Erkennung von Tools sowie die Ausführung von Befehlen. Eine native Konfigurationsoberfläche von MCP ist optional. Die Command-MCP- und CLI sind separate Schnittstellen. Core’s `translate`-Funktionen wandeln Daten vom Standard-Format in das HTTP-Format um. Die Unterstützung für Client-Befehle zeigt nicht, dass es eine Möglichkeit gibt, Daten über die Standard-Schnittstelle zu übertragen.

Richte für Verbindungen über Netzwerkgrenzen **TLS und Authentifizierung an einem vorgeschalteten Proxy oder einem eigenen OAuth-Gateway** ein. Beschränke den Zugriff und binde den DCC-Dienst ausschließlich an die Loopback-Schnittstelle. Laut [Authentifizierungsvertrag von Core 0.20.39](https://github.com/dcc-mcp/dcc-mcp-core/blob/v0.20.39/docs/guide/remote-server.md#auth) ist eine native Prüfung von Bearer/OAuth/CIMD pro Anfrage in `McpHttpServer` erst geplant. `ApiKeyConfig` und `OAuthConfig` schützen den laufenden Dienst für sich genommen nicht. Stelle einen ungeschützten Endpunkt nicht als authentifizierten öffentlichen Dienst bereit.

## Voraussetzungen für die Installation {#prerequisites}

- Es ist erlaubt, Software in der gewählten Umgebung zu installieren oder zu aktualisieren. Es müssen eine verfügbare Zielanwendung sowie alle erforderlichen Lizenzen vorhanden sein. Ein DCC-MCP-Plugin enthält weder die Anwendung selbst, noch ihre Lizenz oder einen öffentlichen Endpunkt für mehrere Nutzer.
- Es handelt sich um eine Anwendungsversion, die innerhalb des unterstützten Bereichs des zugehörigen Adapters liegt. Dazu sind native Bibliotheken erforderlich sowie ein offizieller Adapter, der überprüft wurde, oder eine explizit registrierte Quellcode-Änderung.
- Es muss eine kompatible CLI/MCP-Verbindung vorhanden sein, außerdem muss es eine bereitgestellte Live-Instanz sowie ein autorisierter Projektverzeichnis geben. Tools, die auf der grafischen Benutzeroberfläche basieren, benötigen zudem den verwalteten Desktop oder die unterstützte Anzeige-Dienstleistung der Plattform.
- Für den Einsatz aus der Ferne sind eine zugelassene TLS/Auth-Infrastruktur sowie Geheimnisse, die vom Operator verwaltet werden, erforderlich. Diese Anleitung enthält keine Anweisungen zur Konfiguration eines öffentlichen Endpunkts oder zur Bereitstellung von Zugangsdaten.

Folgen Sie den Anleitungen zur Einrichtung des [gemeinsamen Agenten](/de/agents) sowie der [Adapter-Verzeichnisstruktur](/de/ecosystem). Die Installationsanweisungen sowie Lösungen für Probleme, die bei Hosts auftreten, finden Sie im Adapter-Repository.

## Ein Workflow mit Überprüfungselementen {#verified-workflow}

Beginnen Sie mit einem Dokument, das einer bestimmten Aufgabe zugeordnet ist, sowie mit einer bestimmten Operation. Beispielsweise: Überprüfen Sie ein CAD-Teil, vornehmen Sie eine Abweichung in den Abmessungen, speichern Sie das Ergebnis, öffnen Sie das Dokument erneut und überprüfen Sie die Abmessungen noch einmal, bevor Sie das Dokument als STEP-Datei exportieren. Das ist ein Verfahrensmuster – die obige Tabelle zeigt an, welche Experimente tatsächlich erfolgreich waren.

```bash
# After approved setup, inspect the current environment and live instances.
dcc-mcp-cli doctor
dcc-mcp-cli list

# Only continue when a ready instance for the intended application exists.
dcc-mcp-cli search --query "inspect document" --dcc-type freecad

# Follow the returned next_step and exact schema; do not invent a tool slug.
```

Hören Sie auf, wenn das Inventar leer ist oder die Instanz nicht bereit ist. Bewahren Sie die Versionen der Anwendung/Adapter/Zentrale, die Verbindungsroute, die Quellcode-Änderungen, die IDs der Anfragen/Jobeingaben sowie die Ergebnisse der Tests auf. Eine Speicherung oder Export sollte durch erneutes Öffnen des nativem Dokuments oder durch eine unabhängige Überprüfung der Ausgabe bestätigt werden. Bewahren Sie die ID des fehlgeschlagenen Jobs auf, bevor Sie versuchen, den Fehler zu beheben. Versuchen Sie nicht blind, die Änderungen erneut umzusetzen.

```text
Verwenden Sie die dcc-mcp-Funktion, um den von der Aufgabe betreuten Dokumenten auf dem ausgewählten Cloud-Computer oder autorisierten Arbeitsplatz einen Überblick zu geben. Überprüfen Sie die Versionen sowie die Bereitschaft des Dokuments. Verwenden Sie dazu geschriebene Tools für eine einzige Änderung. Speichern Sie das Ergebnis und öffnen Sie es erneut. Überprüfen Sie außerdem das exportierte Ergebnis. Bitten Sie vor der Installation von Software oder der Änderung des Systemzustands um Erlaubnis. Berichten Sie über die Verbindungsroute, die Beweise sowie die noch bestehenden Einschränkungen.
```

## Häufig gestellte Fragen {#faq}

### Heißt das, dass alle vier Plattformen jeden DCC-Standard unterstützen?

Nein. Die Schnittstellen zwischen den Plattformen, die installierte Software sowie die Akzeptanz der Adapter sind getrennte Elemente. Grok Bot und Muse haben zwar Integrationstests durchgeführt, aber es gibt keine DCC-Tests hier. Die erforderlichen Schnittstellen von Cue sind noch nicht bestätigt. Selbst ein erfolgreicher Test gilt nur für die aufgezeichneten Versionen sowie den Arbeitsablauf von Cue.

### Kann ich DCC-MCP verwenden, ohne eine native Einstellungsoberfläche für MCP?

Ja, wenn der Agent den Zugriff über die Shell ermöglicht hat, dann muss es eine funktionierende `dcc-mcp-cli` sowie einen erreichbaren lokalen oder geschützten HTTP-Gateway geben. Überprüfen Sie außerdem, ob die Plattform die erforderlichen Funktionen und Verbindungen zulässt. Eine Shell allein reicht nicht aus, um die Anwendung zu installieren oder zu lizenzieren.

### Warum kann die native Ausführung erfolgen, während die MCP-Funktion fehlschlägt?

Ein native Kommando kann einen Datei-Datei erstellen, wenn die Abwicklung durch den Adapter, die Validierung der Ergebnisse, die Verfolgung der Arbeitsabläufe oder die Überprüfung der Quellen nicht erfolgreich sind. FreeCAD und Inkscape zeigen diese verschiedenen Grenzen auf. Man sollte das Scheitern des Adapters als ungelöst betrachten, bis sowohl der Workflow als auch die Ergebnisse erfolgreich abgeschlossen sind.

### Kann ein Cloud-Agent mit meinem lizenzierten Desktop-DCC-System zusammenarbeiten?

Eine autorisierte Verbindung über einen persönlichen Computer oder ein geschütztes Gateway kann diese Route ermöglichen. Bitte stellen Sie mit dem Betreiber sicher, dass der Zugang möglich ist, dass die unterstützten Versionen vorhanden sind, dass die Arbeitsplätze verfügbar sind und dass die Lizenzbedingungen erfüllt werden. Die Dokumentation der Plattform besagt nicht, dass alle Desktop-DCCs kompatibel sind.

### Garantiert diese Seite eine gute Sichtbarkeit bei der Nutzung von künstlicher Intelligenz für die Suche?

Nein. Die Anweisungen von [Google’s AI Search Guidance](https://developers.google.com/search/docs/appearance/ai-features) besagen, dass normal lesbare und strukturierte Inhalte erforderlich sind. Es werden keine speziellen AI-Dateien oder Schemas benötigt. Zudem wird keine Indexierung oder Anzeige der Inhalte gewährleistet. Die Dokumentation von [OpenAI’s Crawler](https://developers.openai.com/api/docs/bots) unterscheidet zwischen Suchcrawling und Trainingscrawling. Diese Anweisungen bewahren die bestehenden Richtlinien des Sites für das Crawling bei.
