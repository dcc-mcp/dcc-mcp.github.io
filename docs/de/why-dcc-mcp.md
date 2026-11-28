---
title: "Warum es DCC-MCP gibt"
description: "Erfahre, welche Produktionsprobleme zu DCC-MCP geführt haben und welche Aufgaben Core, Adapter und Skills übernehmen."
---

# Warum es DCC-MCP gibt

## Was ist DCC-MCP?

DCC-MCP ist ein Open-Source-Toolset, das AI-Agenten mit kreativem Software-Equipment verbindet. Ein AI-Agent ist ein Assistent, der in der Lage ist, verschiedene Tools heranzuziehen, um Aufgaben zu erledigen. DCC steht für die Erstellung von digitalen Inhalten. Zu den verwendeten Tools gehören Maya, Blender, Houdini und Photoshop.

Agenten und Automatisierungstechnologien können diese Tools für die Modellierung, das Erstellen von Animationen sowie die Rendering-Operationen nutzen. Ein eingesetztes Tool definiert seine Parameter, deren Typen sowie die Ergebnisse. Dadurch kann eine Ausführung des Tools überprüft und validiert werden.

MCP (Model Context Protocol), REST-APIs sowie `dcc-mcp-cli` nutzen eine gemeinsame Infrastruktur für die Erkennung von Tools, die Validierung von Daten, die Auswahl von Instanzen, die Festlegung von Sicherheitsrichtlinien sowie die Überprüfung der Ergebnisse. Die Core-Teilnehmer stellen diese gemeinsame Infrastruktur bereit. Die Adapters verbinden jede Anwendung miteinander, und die Skills bieten wiederverwendbare Arbeitsabläufe an.

DCC-MCP entstand aus der Arbeit an Adaptern für echte DCC-Anwendungen. Themen wie Thread-Affinität, Auswahl der Instanzen, Lebenszyklus, Erkennung und Diagnose tauchten immer wieder in verschiedenen Hosts auf. Wir fügten gemeinsame Ressourcen hinzu – erst nachdem diese Probleme erneut auftraten.

## Beginnen Sie mit dem Produktionsprozess.

Ein Agent nutzt den von ihm erhaltenen Prozess. Er definiert diesen Prozess nicht für das Team.

> Standardisieren die Produktion – verwandeln Standards in Arbeitsabläufe – packen die Arbeitsabläufe als Tools zusammen – lassen die Agenten diese Tools nutzen.

Definieren Sie die Eigenschaften wie Namensgebung, Eingaben, Ausgaben, Überprüfungen, Besitzverhältnisse sowie Akzeptanzkriterien. Verbinden Sie diese Elemente zu einem wiederholbaren Arbeitsablauf. Anschließend können diese Arbeitsabläufe als typisierte Tools genutzt werden. Dasselbe Tool kann von Menschen, Skripten, CI-Systemen oder Agenten verwendet werden.

## Warum hören die direkten Skripte auf, weiterhin Skalierbar zu sein?

Es ist nützlich, einen Modellierer dazu zu bitten, eine `mayapy`, `hython` oder eine Python-Datei in Blender zu schreiben und auszuführen. Wiederholte Produktionsarbeiten haben die folgenden Grenzen aufgezeigt:

- Das Modell generiert auf jeder Runde ähnlichen Code – doch das Ergebnis variiert dabei.
- DCC-APIs erfordern in der Regel die Ausführung im Hauptthread sowie die Durchführung von Prüfungen, die auf die spezifischen Anforderungen der Anwendung abzielen.
- Mehrere offene Szenen oder Anwendungsinstantane führen dazu, dass das Ziel der Ausführung unklar wird.
- Lange Operationen erfordern Fortschritt, Abbruch, Checkpoints sowie eine Wiederherstellung des normalen Zustands.
- Ein erfolgreicher Abschluss des Prozesses beweist nicht, dass die gewünschte Szene oder der gewünschte Dokument wegen irgendwelcher Umstände geändert wurden.
- Fehler lassen sich nur schwer nachvollziehen, wenn man keine eingescannten Daten, keine Anfragen, keine Protokolle oder andere Hinweise hat.

Diese Probleme traten bei allen Adaptern auf. Deshalb gehörten sie zur gemeinsamen Infrastruktur.

## Probleme und die Verträge, die daraus entstanden sind

| Wiederkehrendes Problem | Was wir gelernt haben | Antwort von DCC-MCP: |
| --- | --- | --- |
| Die Modelle ändern die Logik der Aufgabe bei jeder Runde. | Das Wissen, das in einem „Pipeline“ gespeichert wird, sollte auch bei Änderungen der Modelle und Anweisungen erhalten bleiben. | Versionierte Fähigkeiten, mit eingescannten Schemen, Validierungen sowie wiederverwendbaren Werkzeugen. |
| Jeder Adapter erstellt neu den Transport- und Lebenszyklus-Code. | Host-Integrationen benötigen einen gemeinsamen Vertrag. | Core-Runtime, Gateway, CLI sowie die von den Thin-Host-Adaptern verwendeten Adapter. |
| Die DCC-APIs haben Einschränkungen bezüglich der Anzahl von Threads sowie der Bereitschaft des Systems. | Die einfache Ausführung von Prozessen reicht nicht aus. | Main-Thread-Dispatition, Bereitschaft, Instanzverkehr sowie Host-Execution-Brücken |
| Große Werkzeugkataloge fressen viel Platz und verwirren die Auswahlmöglichkeiten. | Die Agenten sollten nur das herausfinden, was die Aufgabe erfordert. | Progressive `search -> load/describe -> call` Entdeckung |
| Kreative Prozesse können langsam verlaufen oder nur teilweise abgeschlossen werden. | Ein Aufruf benötigt Lebenszyklus-Semantik – nicht nur eine Rückgabewert. | Asynchrone Aufgaben, Fortschritte, Abbruch, Checkpoints sowie die Übertragung von Aufgaben an andere Personen. |
| Die Nutzung von Werkzeugen wird zu etwas, das nicht mehr verständlich ist – also zu einer „schwarzen Box“. | Die Produktionsteams benötigen Beweise, die sie überprüfen können. | Anfragen, Richtlinien, Überwachungsdaten, Protokolle, Metriken, Gesundheitsstatus sowie Wiederholungen |
| Es gibt auch Tools, die keine verwendbaren API’s liefern. | UI-Automatisierung ist eine Notlösung – sie darstellt keine Grundlage für die Entwicklung von Produkten. | DCC-CUA / Eine Benutzeroberfläche, die an eine bestimmte Prozess- und Fensterstruktur gebunden ist, mit eingeschränkten Operationen, Prüfungen von Richtlinien und der `snapshot -> find -> act -> wait -> verify` |
| Nützliche Arbeitsabläufe müssen zwischen Menschen und Projekten hin- und herbewegen. | Eine Script-Folder ist kein Verteilungsmodell. | Marktplatz-Pakete, unveränderliche Quellreferenzen, Hot-Reload-Funktionen sowie Projekt-/Team-Scope-Einstellungen |

## Wer besitzt was?

Das System trennt die gemeinsam genutzten Dienste vom Verhalten der einzelnen Hosts.

| Schicht | Verantwortung |
| --- | --- |
| Agent-Antwortinterface | MCP- und REST-Antwortpunkte, eingegebene CLI-Befehle, Schemata, Ressourcen, Hilfsanweisungen sowie strukturierte Ergebnisse. |
| Steuerplattform | Gateway-Entdeckung, Routing, Prüfung von Richtlinien, Verwaltung des Lebenszyklus, Observabilität sowie Verarbeitung von Mehrfachinstanzen. |
| Laufzeit von DCC: | Ausführung der Hauptaufgaben, Bereitschaft der Prozesse, Abbrüche, Checkpoints sowie eine ausführbare Lösung für den Host. |
| Adapter | Die Installation, Kompatibilität, die APIs der Hosts sowie das Verhalten der Anwendungen, das jeweils in den DCC-Repositories liegt. |
| Fähigkeiten | Überprüft werden die Kenntnisse bezüglich des Workflows, die Argumente, die einzelnen Schritte des Workflows sowie die Konventionen innerhalb des Projekts oder der Teamstruktur. |

Die [Kernarchitektur-Dokumentation](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture) ist die zuverlässige Quelle für die aktuellen Verträge. Die Installationen, die Kompatibilität sowie die Behebung von Problemen bezüglich der jeweiligen Hosts bleiben in den jeweiligen Adapter-Repositories erhalten.

## CLI, MCP und REST teilen eine einzige Implementierung.

Der gemeinsame Service-Code sowie der eingegebenen REST/OpenAPI-Contract bilden die Implementierung. `dcc-mcp-cli` ruft die Gateway-REST-API auf. MCP ist übersichtlich gehalten: `search`, `describe`, `load_skill` und `call` bieten denselben Workflow für Kunden, die nur mit MCP arbeiten. Beide Wege nutzen dieselben Dienste für die Erkennung, Validierung, Routing sowie die Ausführung von Aufrufen.

| Verbraucher | Bevorzugte Oberfläche | Erfordert die Nutzung eines KI-Agenten. |
| --- | --- | --- |
| Künstler, TDs, Operator, Shell-Skripte und CI | Tipp-gedruckte CLI oder REST-Antworten | Nein. |
| Studio-Automatisierung und benutzerdefinierte Anwendungen | Rasten Sie mit den generierten OpenAPI-Klienten. | Nein. |
| AI-Entwicklungsumgebungen und Assistenten, die ausschließlich auf MCP basieren. | Minimales MCP-Werkzeugablauf | Ja. |
| Smart-Worksflows und Cloud-Orchestrierung | Integration mit REST/OpenAPI; MCP, wenn ein Agent beteiligt ist. | Nein. |

Eine Pipeline kann direkt auf REST anwenden, Clients aus `/v1/openapi.json` generieren oder die CLI bei der Integration und Betriebssituationen verwenden. Ein Agent kann dieselben Fähigkeiten über die einfache MCP-Schnittstelle erreichen.

Eine bereits existierende OpenAPI 3.x-Dienstleistung kann ebenfalls als MCP-Tools verwendet werden. Es handelt sich dabei weiterhin um einen normalen REST-Dienst – es ist nicht notwendig, den Dienst neu auf Basis von KI zu entwickeln.

## Verwenden Sie zunächst die bereits existierenden Protokolle.

MCP ist der branchenweit gültige Eingangspunkt für Agenten. Deshalb verwendet DCC-MCP diesen Punkt anstatt, ein eigenes Protokoll zu entwickeln. REST, Python, C++, HTTP, Kommando-Ports, native Plugins sowie offizielle Tools von Herstellern können alle hinter demselben Kontrollzentrum arbeiten.

DCC-MCP ersetzt weder einen Agenten, eine DCC-API noch eine Integration mit einem Anbieter. Wenn ein Anbieter eine nutzbare native oder offizielle MCP-Funktion bereitstellt, behält der Adapter seine Bezeichnungen und Schemata bei. DCC-MCP bietet hingegen gemeinsame Funktionen wie die Erkennung von Geräten, die Routingsysteme, Sicherheitsfunktionen, das Lebenszyklusmanagement, die Verteilung von Daten sowie Diagnosefunktionen an.

## Kenntnisse über den Ablauf des Werkzeugs „Skills Store“

Ein „Skill“ stellt einen getesteten Arbeitsablauf als eine versionierte, typisierte und verbreitbare Fähigkeit dar.

Die Grenze bezüglich des Eigentumsverhältnisses ist:

- Core- und Adapter-Elemente verfügen über die notwendigen Fähigkeiten zur Verbindung mit anderen Komponenten, Thread-Sicherheit, Routing-Funktionen, Richtlinien sowie Überwachungsfunktionen.
- TDs und TAs halten die Projektbenennung, die Überprüfung der Szenen, die Vorbereitung der Ressourcen, die Veröffentlichungspunkte, die Exportregeln sowie die Übermittlung der Ergebnisse in ihrem bestehenden Prozess.
- Die Agenten wählen ein gut beschriebenes Werkzeug aus und liefern validierte Argumente – anstatt den gesamten Workflow von vorne zu erfinden.

Dadurch wird die erneute Erstellung des gleichen Codes vermieden. Zudem kann ein Studio verschiedene Funktionen je nach Projekt, Abteilung oder Produktionsstufe bereitstellen – ohne dass dies die Kontrollstruktur beeinträchtigt.

## Behalten Sie die Beweise für das Scheitern.

Die Diagnose beginnt mit dem `request_id`, den eingesetzten Werkzeugen und Argumenten, der ausgewählten DCC-Instanz sowie den beobachteten Ergebnissen. Die Gateway- und CLI-Schnittstellen bieten Informationen zur Gesundheit des Systems, zu den Protokollen, Statistiken sowie strukturierten Rückmeldungen an.

Das schafft eine konkrete Schleife.

1. Reproduzieren des Fehlers gegenüber einem echten Host.
2. Ermitteln, ob es sich um „Core“, einen Adapter oder eine „Skill“ handelt.
3. Versuchen Sie, die kleinste Fehlerbehebung an jener Grenze vorzunehmen.
4. Wieder die gleiche Anrufe validieren lassen.
5. Bewahren Sie die Beweise auf – damit die nächsten Verbesserungen auf der Grundlage von Erfahrungen erfolgen, nicht aufgrund von Vermutungen.

## Bekanntene Grenzen

DCC-MCP behauptet nicht, dass jede kreative Anwendung gleich ist.

- Native-Fähigkeiten und APIs sind dennoch besser als DCC-CUA/UI-Controller. Der DCC-CUA/UI-Controller erfordert nämlich, dass eine bestimmte Prozess- und Fensteroberfläche verwendet werden muss.
- Core besitzt keine spezifischen Pipeline-Semantiken für Hosts.
- Ein Adapter kann nicht versprechen, dass eine sichere Rückkehr zur vorherigen Situation möglich ist, wenn der Host keine Transaktions-API bereitstellt.
- Die Marketplace-Pakete erweitern das Framework – sie verbergen dabei keine Fehler im Core- oder Adapter-Teil des Systems.
- Das Projekt stellt eine Infrastruktur für die Agenten bereit. Es legt jedoch keine Vorgaben dar, welchen Agenten oder Modelle man verwenden soll.

## Was immer noch von menschlichem Urteilsvermögen abhängt

Viele Produktionsaufgaben können standardisiert, validiert und automatisiert werden. Doch ästhetisches Urteilsvermögen, künstlerische Leitung, Komposition, Zeitplanung und Stil sind immer noch schwer in stabile Verträge umzusetzen. DCC-MCP behauptet nicht, dass die Infrastruktur alle diese Probleme allein lösen kann.

DCC-MCP handhabt die wiederholbaren Teile und gewährt den Agenten eine kontrollierte Zugänglichkeit zu den entsprechenden Werkzeugen. Eine bessere Wahrnehmung, Rechenfähigkeit sowie kreatives Urteilsvermögen können dieselben Werkzeuge nutzen – ohne dass die gesamte Integration von DCC neu erstellt werden muss.

## Fahren Sie weiter von hier aus.

- [Sehen Sie sich an, wie ein Agent das System nutzt.](/de/agents)
- [Erstelle einen Adapter, eine eigenständige Dienstleistung oder eine „Skill“.](/de/developers)
- [Erkunden Sie die Adapter und Erweiterungen.](/de/ecosystem)
- [Lesen Sie die wesentlichen technischen Dokumentationen.](https://dcc-mcp.github.io/dcc-mcp-core/)

## Offizielle Links

- [Webseite von DCC-MCP](https://dcc-mcp.github.io/de/)
- [GitHub-Organisation](https://github.com/dcc-mcp)
- [YouTube-Kanal](https://www.youtube.com/@dcc-mcp)
- [Showcase-Galerie](https://dcc-mcp.github.io/showcase/)
