---
title: "Kreativprogramme mit KI steuern"
description: "Finde Beispielaufgaben und Aufträge für deine Anwendung, suche passende Werkzeuge und prüfe die Ergebnisse."
pageClass: route-page
---

<script setup>
import entries from "../.vitepress/i18n/de/integrations.json"
import labels from "../.vitepress/i18n/de/guide.json"
import DccControlGuideIndex from '../.vitepress/theme/components/DccControlGuideIndex.vue'
</script>

# Kreativprogramme mit KI steuern

In diesen Beispielen wird die öffentliche [`dcc-mcp` Fähigkeit](https://clawhub.ai/loonghao/skills/dcc-mcp) sowie `dcc-mcp-cli` verwendet. Die Anweisungen beschreiben das erforderliche Ergebnis und die zu überprüfenden Informationen. Der Agent ermittelt die Namen der Tools anhand der verbundenen Hosts.

Um zu verhindern, dass eine künstliche Intelligenz eine laufende kreative Anwendung steuert, sollten Sie zunächst die untenstehenden Anleitungen für die jeweiligen Aufgaben und den Arbeitsablauf verwenden. Jede Anleitung verweist auf das zugehörige Adapter-Repository. Dieses Repository kümmert sich um die Installation, die Kompatibilität sowie die spezifischen Details der Anwendung.

## Wie kann ich jeden DCC mit der AI steuern?

<DccControlGuideIndex language="de" :entries="entries" :labels="labels" />

## Beispiel für die Verbindung mit Maya

Installieren Sie die `dcc-mcp`-Funktion und verbinden Sie den [Maya-Adapter](https://github.com/dcc-mcp/dcc-mcp-maya). Überprüfen Sie zunächst die bestehende Installation, bevor Sie die CLI oder den Adapter hinzufügen.

```text
Stellen Sie DCC-MCP so ein, dass Sie Maya auf diesem Rechner steuern können. Installieren Sie das Tool und folgen Sie den Anweisungen in der offiziellen Dokumentation von @loonghao/dcc-mcp. Überprüfen Sie zunächst den aktuellen CLI-Code sowie den Maya-Adapter. Bitte fragen Sie vor der Installation oder Änderung des Systemzustands um Erlaubnis. Öffnen Sie Maya und überprüfen Sie den Gateway sowie die aktive Maya-Instanz. Führen Sie eine einzige Leserechts-Suche durch und beschreiben Sie anschließend den Ablauf. Berichten Sie außerdem über die verbundenen Instanzen, die verfügbaren Funktionen sowie die nächsten Schritte zur Steuerung von Maya. Verändern Sie während des Setup-Prozesses nicht meine aktuelle Szene.
```

Prüfen Sie die Verbindung mit:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Maya scene" --dcc-type maya
```

## Beispiel für die Verbindung mit dem Blender

Verwenden Sie dieselben Fähigkeiten und die gleiche Benutzeroberfläche mit dem [Blender-Adapter](https://github.com/dcc-mcp/dcc-mcp-blender). Die Installationen sowie die für Blender speziellen Tools bleiben in diesem Repository.

```text
Stellen Sie DCC-MCP so ein, dass Sie den Blender auf dieser Maschine steuern können. Installieren Sie das Tool und folgen Sie den Anweisungen in der öffentlichen Skill-Datei @loonghao/dcc-mcp. Überprüfen Sie zunächst den aktuellen CLI sowie den Adapter für Blender. Bitten Sie vor der Installation oder Änderung des Systemzustands um Erlaubnis. Öffnen Sie den Blender, überprüfen Sie den Gateway sowie die Live-Instanz von Blender. Führen Sie eine einzige Leserechts-Suche durch und beschreiben Sie anschließend die Verläufe. Berichten Sie außerdem über die verbundenen Instanzen, die verfügbaren Funktionen sowie die nächsten Schritte bezüglich der Steuerung von Blender. Modifizieren Sie während des Setup-Prozesses nicht meine aktuelle Szene.
```

Prüfen Sie die Verbindung mit:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Blender scene" --dcc-type blender
```

## Wie kann ich in Maya zehn zufällige Kugeln erstellen?

Beschreiben Sie das Ergebnis – nicht den Namen des vermuteten Werkzeugs. Enthalten Sie dabei auch die zufällige Zahl, die Grenzen, die Bezeichnungen sowie die Überprüfungen.

```text
Verwenden Sie die dcc-mcp-Funktion, um mit meiner Live-Maya-Instanz zu verbinden. In einer neuen Gruppe namens ai_random_spheres erstellen Sie exakt 10 Polygonkugeln mit dem deterministischen Seed 42. Geben Sie jeder Kugel einen einzigartigen Namen und platzieren Sie sie an einer zufälligen Position innerhalb der Grenzen X -10..10, Y 0..10, Z -10..10, wobei sichtbare Schnittpunkte vermieden werden sollen. Löschen oder ersetzen Sie den existierenden Szeneninhalt nicht. Entdecken Sie zunächst die eingesetzten Maya-Werkzeuge, folgen Sie jeder zurückgegebenen next_step, und überprüfen Sie anschließend die endgültige Anzahl der Kugeln, ihre Namen, Transformationen und die Zugehörigkeit zur Gruppe. Zeigen Sie mir die Beweise und speichern Sie die Szene nicht, es sei denn, ich sage es an.
```

## Ich möchte ein Spiel entwickeln. Wo soll ich anfangen?

Definieren Sie zunächst eine spielbare Schleife. Wählen Sie anschließend [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal), [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) oder [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) aus. Verwenden Sie das [Marketplace](/de/marketplace), um optionalen Assets zu erhalten. Überprüfen Sie die Lizenzbedingungen vor der Verwendung. Im [Showcase](/de/examples) finden Sie Beispiele für mögliche Assets.

```text
Helfen Sie mir, ein kleines spielbares Spiel mit DCC-MCP zu erstellen. Bitte geben Sie mir zunächst an, welches Engine verwendet werden soll (Unreal, Unity oder Godot), welche Plattformen angesprochen werden sollen, wie der visuelle Stil aussehen soll sowie eine Aussage darüber, wie der Spielablauf abläuft. Vereinfachen Sie die Idee auf ein Level und eine Bedingung für Erfolg oder Misserfolg. Überprüfen Sie die verbundenen DCCs und Engine-Versionen. Finden Sie passende Tools und schauen Sie sich das offizielle Marketplace an, um alle notwendigen Lizenzen zu finden. Bitten Sie vor der Installation von Paketen, dem Herunterladen von Assets oder der Änderung des Systemzustands um Erlaubnis. Erstellen Sie eine minimale Version des Spiels, führen Sie sie aus, überprüfen Sie die Kontrolle sowie die Bedingungen für Erfolg oder Misserfolg. Dokumentieren Sie alles und berichten Sie über das Projekt sowie die Wege zur Erstellung der Build-Dateien. Glauben Sie nicht, dass das Projekt fertig ist, bevor es tatsächlich spielbar ist.
```

## Wie kann man Fotos mit der AI-Technologie bearbeiten?

Verwenden Sie den [Photoshop-Adapter](https://github.com/dcc-mcp/dcc-mcp-photoshop), um das Bild zu retuschieren, Farben zu korrigieren, Masken zu erstellen, Layers zu verwenden und das Bild in einen geeigneten Ausgabeformat umzuwandeln. Bitte beschreiben Sie, was ändert werden muss, was unverändert bleiben soll sowie das erforderliche Ausgabeformat.

```text
Verwenden Sie die dcc-mcp-Funktion, um mit Photoshop zu verbinden und mir dabei zu helfen, dieses Bild zu bearbeiten. Zuerst sollten Sie herausfinden, was geändert werden muss, was unverändert bleiben soll – also das Aussehen des Originals sowie die Form des Ausdrucks. Bewahren Sie das ursprüngliche Dokument bei und verwenden Sie dabei neue Schichten, Anpassungsschichten, Masken oder Smart Objects, sofern dies möglich ist. Übernehmen Sie niemals Änderungen an dem Quellmaterial ohne meine Zustimmung. Entdecken Sie die in Photoshop verfügbaren Werkzeuge. Erstellen Sie eine erste Vorstellung des Ergebnisses. Vergleichen Sie das Ergebnis mit den vorgegebenen Anforderungen. Überprüfen Sie die Abmessungen, den Farbmodus, die Struktur der Schichten sowie die fehlenden Elemente. Exporteieren Sie das Ergebnis erst, wenn ich die Vorstellung genehmigt habe.
```

## Wie kann man einen Film mit der Hilfe von KI bearbeiten oder kombinieren?

Verwenden Sie [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) für die Bearbeitung der Zeitachse, [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) für Motion-Graphics sowie die Bearbeitung von Aufnahmen auf Basis von Schichten. Nutzen Sie außerdem [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) für die Komposition von Bildern auf Basis von Knotenpunkten. Verwenden Sie die Programme, die am besten zum Erledigen der jeweiligen Aufgaben geeignet sind.

```text
Bitte nutzen Sie die dcc-mcp-Funktion, um mir bei der Bearbeitung oder Komposition dieses Films zu helfen. Zuerst sollten Sie herausfinden, ob es sich um Zeitraumbearbeitung in Premiere, Motion-Graphics-Operationen in After Effects oder Node-Kompositionen in Nuke handelt. Identifizieren Sie die Quellmedien und stellen Sie sicher, dass die Auflösung, die Bildfrequenz, der Farbraum sowie die Audio-Anforderungen sowie die Zielvorgaben erfüllt werden. Speichern Sie die Quelldateien. Erstellen Sie ein neues Projekt oder eine neue Komposition. Finden Sie geeignete Werkzeuge und führen Sie eine repräsentative Szene durch. Rendern Sie eine Vorlage und überprüfen Sie, ob alle benötigten Medien vorhanden sind. Berichten Sie anschließend über das Projekt und die Pfade zur Vorlage. Bitte fragen Sie vorher, ob es notwendig ist, Codecs oder Plugins zu installieren, die Medien erneut zu verbinden oder eine endgültige Rendering-Operation durchzuführen.
```

## Wie kann man mit der AI-Technologie visuelle Effekte erzeugen?

Verwenden Sie [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) für die Erstellung von Prozessorbügeln und Simulationen. Nutzen Sie Nuke oder After Effects für die Zusammenführung der einzelnen Bilder. Für Echtzeit-Effekte verwenden Sie [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal). Identifizieren Sie die entsprechende Anwendung, bevor Sie einen Testaufnahmevorgang durchführen.

```text
Verwenden Sie die dcc-mcp-Funktion, um mir bei der Erstellung eines visuellen Effekts zu helfen. Zuerst sollten Sie die Details bezüglich des Effekts festlegen: Art des Effekts, Dauer, Kameraansicht, Format der Darstellung sowie ob der Effekt in einer Houdini-Simulation, in Nuke oder After Effects oder in Unreal Engine real-time bereitgestellt werden soll. Identifizieren Sie die verbundenen Hosts, finden Sie die passenden Werkzeuge und schlagen Sie eine möglichst einfach strukturierte Lösung vor. Die Kontrollmechanismen sollten weiterhin bearbeitbar bleiben. Speichern Sie die Quellenbilder und Szenen. Rechenleistung und Rendering sollten nur dann verwendet werden, wenn es wirklich notwendig ist. Erstellen Sie eine Voransicht, überprüfen Sie die Zeitplanung, die Skalierung, den Farbraum sowie eventuelle Abhängigkeiten. Berichten Sie anschließend über die Pfade der Szenen, der Caches und der Voransichten. Fragen Sie vor dem Herunterladen von Assets, dem Installieren von Plugins oder dem Start einer teuren Simulation oder eines Endrendings nach.
```

## Warum sollte man lieber DCC-MCP verwenden, anstatt einen Script zu verwenden?

Scripts sind weiterhin nützlich für einmalige Aufgaben. DCC-MCP ermöglicht außerdem die automatische Erkennung von Fehlern, die Überprüfung von Argumenten, die Routierung von Anfragen sowie die Erstellung von Diagnoseberichten – insbesondere dann, wenn dasselbe Workflowsverfahren wiederholt werden muss. Weitere Informationen zu den Bedienungsanweisungen finden Sie unter [For Agents](/de/agents).
