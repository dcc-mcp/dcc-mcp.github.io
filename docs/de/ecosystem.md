---
title: "DCC-MCP-Projektverzeichnis"
description: "Finde Zweck, Status und Quellrepository von Adaptern, Skills, Asset-Anbietern und Generierungsdiensten."
pageClass: ecosystem-directory
outline: [2, 2]
---

# DCC-MCP-Projektverzeichnis

Dieser Ordner enthält kreative Tools für AI-Agenten und Automatisierung. DCC steht für die Erstellung digitalen Inhalts. Beginnen Sie mit dem Leitfaden zum öffentlichen Workflowsmodul [`dcc-mcp`](https://clawhub.ai/loonghao/skills/dcc-mcp). Wählen Sie anschließend den passenden Adapter oder Erweiterung für Ihre Aufgabe aus. Jedes Projekt beschreibt seine eigene Installation, Kompatibilität sowie die verwendeten APIs. Core dokumentiert die gemeinsame Infrastruktur für die Abrufung von Daten. Ein eingebautes Tool definiert seine Parameter, deren Typen sowie die Ergebnisse. So kann eine Anfrage überprüft und validiert werden.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>Betreiben kreative Software-Programme</strong><span>dcc-mcp Fähigkeiten</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Erstellen Sie einen Adapter.</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Eine Fähigkeit aufbauen</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## Gemeinsame Infrastruktur und Werkzeuge

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) – Gemeinsam genutzte Gateway, CLI-Befehlssatz, MCP/REST-Betriebssystem, Sicherheit, Diagnosefunktionen sowie Überwachungsmöglichkeiten.
- [dcc-mcp-runtime](https://github.com/dcc-mcp/dcc-mcp-runtime) – Gemeinsamer Python-Laufzeitbereich sowie Manifestvertrag für externe DCC-MCP-Adapter.
- [Marktplatz-Suche](/de/marketplace) – Suchen Sie im offiziellen Erweiterungskatalog nach den Produkten, die von `dcc-mcp-cli` verwendet werden. [Quelle des Katalogs](https://github.com/dcc-mcp/marketplace).
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) – Integration mit Autodesk Flow Production Tracking.
- [fpt-cli](https://github.com/dcc-mcp/fpt-cli) – Eine Rust-CLI, die sich auf die Automatisierung konzentriert. Diese CLI wird für die Autodesk Flow Production Tracking-Anwendung verwendet.
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) – OpenUSD-Arbeitsabläufe und Interaktionsfähigkeiten.
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) – Interoperabilität zwischen MaterialX und der Entwicklungsumgebung.
- [dcc-lookdev](https://github.com/dcc-mcp/dcc-lookdev) – Standardisierte Workflows für die Entwicklung von PBR-Designs zwischen verschiedenen DCC-Systemen.
- [dcc-modeling-spec](https://github.com/dcc-mcp/dcc-modeling-spec) – Host-neutrales Modellierungsformat v2. Es handelt sich dabei um Standards für die Arbeit mit den Programmen Maya, Blender, Houdini und 3ds Max.
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) – Portable-verwendbare Veröffentlichungsmanifeste für DCC-, USD- sowie Rendering-Farm-Prozesse.
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) – Deterministische Texturen für OpenImageIO und OpenColorIO.
- [dcc-itchio](https://github.com/dcc-mcp/dcc-itchio) – Fähigkeiten zur sicheren Akquise von Assets aus itch.io sowie zur Veröffentlichung von Spielen nach vorheriger Überprüfung.
- [dcc-media-enhance](https://github.com/dcc-mcp/dcc-media-enhance) – Eine Agent-first-Rust-Orientierte Lösung zur Entfernung von Unschönheiten in Medien sowie zur Verbesserung der Qualität solcher Medien. Dabei werden installierte Backends verwendet.
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) – Eine hostunabhängige Lösung zur Überprüfung von Caches in einem geschlossenen, privatschutzorientierten Offline-Marktplatz. Es gibt keine Adapter oder Pakete im PyPI-Repository.
- [mcpcall](https://github.com/dcc-mcp/mcpcall) – Eine CLI-Software, die es ermöglicht, die Tools des MCP-Servers über STDIO oder Streamable HTTP aufzulisten und zu verwenden.
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) – Erfassung und Wiederholung von Render-Operationen.
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) – Erfassung und Analyse von Daten durch Tracy Frame-Profiler.

## DCC und kreative Anwendungsadapter

Für Fragen bezüglich der Steuerung mit natürlicher Sprache sowie für sichere Anweisungen für den Agenten, sollten Sie zunächst die [anwendungsspecifichen AI-Kontrollrichtlinien](/de/use-cases) verwenden. Anschließend kann das verlinkte Adapterrepository als Quelle für Informationen zur Installation und zu den Hostdaten dienen.

Der signierte Fernverzeichnisdienst, der von der offiziellen CLI 0.20.39 überprüft wurde, enthält 38 Adapteridentifikatoren. Die Installation des Verzeichnisses ist für 33 dieser Adapter möglich. Für `kdenlive`, `material-maker`, `powerpoint`, `tiled` und `wwise` gilt jedoch „`catalog_install_available=false`“. Eine Definition des Verzeichnisses oder eine separate Adapterveröffentlichung schafft keine Live-Host- oder Produktionszulassung.

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) – Autodesk 3ds Max.
- [3D Slicer](https://github.com/dcc-mcp/dcc-mcp-slicer) – Begrenzte synthetische Volumina, Materialphänomene sowie Kugelmeshes, die in Form von NRRD/STL-Dateien exportiert werden können. Zudem gibt es Funktionen zur Umwandlung von MRB-Szenen, zur Einstellung der Kamera und der Schnitte sowie zur Anzeige von PNG-Vorlagen. Es werden nur synthetische Daten verarbeitet – keine Patientendaten, keine Importfunktionen für DICOM-Dateien, keine klinischen Angaben oder irgendwelche anderen Daten. Die Quelle der Daten ist auf Core und Server 0.20.41 festgelegt. Eine weitere Qualifizierung ist noch nicht abgeschlossen. Es handelt sich dabei nicht um einen Adapter-Identifikator, der im Katalog von CLI 0.20.39 überprüft wird.
- [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) – Adobe After Effects.
- [AutoCAD](https://github.com/dcc-mcp/dcc-mcp-autocad) – Eine portable Lösung für die Automatisierung von DWG-Dateien, mithilfe von COM und dem „headless“-Modus von `accoreconsole.exe`. Überprüfen Sie den verfügbaren Repositorien für aktuelle Informationen und Anleitungen zur Installation.
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) – Ein Add-on für Blender sowie eine eingebettete Serverlösung.
- [CapCut](https://github.com/dcc-mcp/dcc-mcp-capcut) – Ein eingesetzter Desktop-Adapter von CapCut, wobei die Verbindung über einen autorisierten lokalen Bridge hergestellt wird.
- [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) – Eingebautes, headless-ähnliches Dokumentenformat. Einfache Übertragung von Daten, Automatisierung der Rendering-Prozesse.
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) – Live-Validierung von Knoten-Contracten, Ausführung in begrenzten Warteschlangen sowie Abruf von Artefakten. Die [ComfyUI-MCP-Anleitung](/de/control/comfyui) behandelt die lokale Spieloberfläche, transparente PNG-Dateien sowie die Verwendung von Pixal3D/PBR-Formaten. Dabei wird auch auf die Verfügbarkeit der Quellcode- versus-Veröffentlichungsversionen eingegangen.
- [Epic Games Launcher und Fab](https://github.com/dcc-mcp/dcc-mcp-epic) – Independently veröffentlicht als Version v0.2.1 ([Veröffentlichungsquelle](https://github.com/dcc-mcp/dcc-mcp-epic/tree/1157defe203aab4beaa8f7be56f8063caac2a415)) für das Inventar der installierten Engine, Projektüberprüfungen sowie Operationen, die von begrenzten Providers durchgeführt werden. Es handelt sich dabei nicht um einen Adapter-Identifikator, der im Katalog durch die CLI 0.20.39 überprüft wird. Die Installation der Engine bleibt nur planbasiert, ohne eine verifizierte native Providerlösung. Anmelden, CAPTCHA, Einkäufe und Lizenzannahme werden weiterhin von Menschen überwacht. Weitere Informationen finden Sie im [Epic Games-Kontrollleitfaden](/de/control/epic-games).
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) – Parametrische CAD-Modellierung, Überprüfung der Topologie sowie Austausch von Meshen.
- [Gaea](https://github.com/dcc-mcp/dcc-mcp-gaea) – Independently veröffentlicht als Version 0.1.1 ([Veröffentlichungsquelle](https://github.com/dcc-mcp/dcc-mcp-gaea/tree/b95d3f81b8f883732c73d268658100d09d9cad84)). Enthält Funktionen zur Erstellung von Gebieten sowie zur Überprüfung der Ergebnisse. Es handelt sich dabei nicht um einen Adapter-Identifikator, der vom CLI 0.20.39 überprüft wird. Echte lizenzierten Builds, die Anwendung von Prozessstrukturen, die Qualität der Gebiete sowie die Importfunktionen von Unreal-Dateien sind noch nicht überprüft. Siehe dazu den [Gaea-Kontrollleitfaden](/de/control/gaea).
- [GameMaker](https://github.com/dcc-mcp/dcc-mcp-gamemaker) – Ein Adapter für GameMaker. Es handelt sich dabei nicht um eine eindeutige Bezeichnung für einen Adapter, wie sie im Katalog der CLI 0.20.39 aufgeführt ist.
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) – GIMP 3.
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) – Godot Engine sowie Fähigkeiten zur Erstellung 2D-Spiele.
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) – SideFX Houdini.
- [Illustrator](https://github.com/dcc-mcp/dcc-mcp-illustrator) – Erstellt Adobe Illustrator-Dokumente, vektorisierte Grafiken, bearbeitet offizielle DOM-Dateien sowie exportiert Produkte.
- [Inkscape](https://github.com/dcc-mcp/dcc-mcp-inkscape) – Die Integration der Quellen außerhalb des Katalogs wurde von CLI 0.20.39 überprüft. Der Produktionsablauf in der Cloud-MCP-Infrastruktur bleibt aufgrund der Validierung der Herkunft der Daten blockiert. Siehe dazu den [Testbericht über die Cloud-Infrastruktur](/de/cloud-agents#cloud-mcp-tests).
- [Katana](https://github.com/dcc-mcp/dcc-mcp-katana) – Foundry Katana.
- [Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive) – Projektverwaltung, MLT- rendering und gemeinsamer DCC-CUA-Editor. Das Repository hat unabhängig v0.1.1 veröffentlicht ([Veröffentlichungsquelle](https://github.com/dcc-mcp/dcc-mcp-kdenlive/tree/376c812047b308239174aa1bbb662da1908f829e)); der von der CLI 0.20.39 überprüfte Katalog listet `kdenlive` bei Version 0.1.0 mit `catalog_install_available=false` auf. Diese Katalogprüfung führte keine Live-Prüfung des Editors oder des Rendering-Status durch. Siehe die [Kdenlive-Handbücher](/de/control/kdenlive).
- [KiCad](https://github.com/dcc-mcp/dcc-mcp-kicad) – Es handelt sich dabei um eine Art von Bauteilen, die mit der native `pcbnew`-API sowie `kicad-cli` erstellt werden. Dabei wird ein isoliertes Bauteil erstellt, anstatt dass es sich mit dem PCB-Editor verbindet oder über IPC/UI-Kontrolle verfügt. Die Quelle dieses Tools ist auf Core und Server 0.20.41 gesichert. Eine Veröffentlichung ist noch nicht möglich. Zudem gibt es keine Adapteridentifikationen im Katalog, die durch CLI 0.20.39 abgerufen werden können.
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) – Krita.
- [LiquiGen](https://github.com/dcc-mcp/dcc-mcp-liquigen) – Typische Überprüfung des Knotengraphen, begrenzte Simulationsteuerungen, Export von VAT-Daten und Übergabe an den Unreal Engine; aufgeführt als `liquigen` im Katalog, überprüft mit CLI 0.20.39.
- [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) – Projekte von Foundry Mari, Geometrie, Knotengraphen, Ansichtselemente sowie die Exportfunktionen für Texturen.
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) – Prozedurale Erstellung von Materialien. Der Katalog, der von CLI 0.20.39 geprüft wurde, enthält die Version 0.3.1. Dabei ist die Eigenschaft `catalog_install_available=false` festgelegt.
- [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) – Autodesk Maya.
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) – Erstellung von PBR-Materialien, Überprüfung von Szenen sowie Rendering.
- [Marvelous Designer](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer) – Independently veröffentlicht in Version 0.1.1 ([Veröffentlichungsquelle](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer/tree/4d4d289905f82290804b288d03d84d541b01af08)). Es handelt sich dabei um eine Lösung für die Erstellung von Mustern, die Simulation von Materialien, das Speichern und Exportieren von Daten. Es handelt sich dabei nicht um einen Adapter-Identifikator, der im Katalog von CLI 0.20.39 erfasst wird. Die Funktionen wie Licensed-Host, Qt-Bootstrap, Materialsimulation sowie Engine-Handoff-Abbildung sind noch nicht vollständig implementiert. Weitere Informationen finden Sie in der [Anleitung zum Marvelous Designer](/de/control/marvelous-designer).
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) – Autodesk MotionBuilder.
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) – Foundry Nuke.
- [OBS Studio](https://github.com/dcc-mcp/dcc-mcp-obs) – Eingeschränkte Inspektion von Szenen und Quellen sowie Kontrolle der eingeschriebenen Aufnahmen; aufgelistet als `obs` im Katalog, der von CLI 0.20.39 überprüft wurde. Die Installation des Adapters führt nicht zur Installation von OBS Studio.
- [Office](https://github.com/dcc-mcp/dcc-mcp-office) – Gemeinsame `office`-Anwendungsroute: Office-RPC/1-Protokoll, C# COM-Sidecar, Open XML-Werkzeug, Microsoft Graph-Verbindung und Office-weite Fähigkeiten. Diese gemeinsame Route ist getrennt von den 38 Adapter-Identifikatoren, die durch CLI 0.20.39 gemeldet werden; die spezifische Verfügbarkeit der Anwendung bleibt in den Händen jedes Adapters.
- [PowerPoint](https://github.com/dcc-mcp/dcc-mcp-powerpoint) – Erstellung von Präsentationen aus dem Format Deck IR, über die Verwendung von Open XML-Formaten sowie durch die Darstellung mit der Desktop-Version von COM. Der Katalog, der durch CLI 0.20.39 geprüft wurde, listet Version 0.1.0 auf, wobei „`catalog_install_available=false`“ angezeigt wird.
- [Word](https://github.com/dcc-mcp/dcc-mcp-word) – Word-Dokumente, Felder sowie die Anpassung der Seitenausgabe. Es wird noch eine Umsetzung des Adapters geben; der Adapter-Repository ist jedoch noch nur ein Platzhalter und wird noch nicht veröffentlicht.
- [Excel](https://github.com/dcc-mcp/dcc-mcp-excel) – Arbeitsbücher, Formeln, Diagramme sowie Produktionsdashboards. Es wird noch voraussichtlich veröffentlicht. Der Adapter-Repository ist derzeit noch nur ein Platzhalter – er wird noch nicht tatsächlich verwendet.
- [Outlook](https://github.com/dcc-mcp/dcc-mcp-outlook) – E-Mail-Vorlagen und Kalender (geplant, Phase 3); Bewertung: `host_limited`. Dieses Tool nutzt das lokal installierte Outlook-Tool über MAPI/COM. Es benötigt die Zustimmung des Benutzers bei der ersten Ausführung des Programms. Daher gibt es keine „headless“-Möglichkeit, das Tool zu verwenden. Es kann daher nicht in der Qualitätskontrolle überprüft werden. Eine Verbindung mit Microsoft Graph wäre die Voraussetzung dafür, dass das Tool in der Qualitätskontrolle überprüfbar ist.
- [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) – Deklarative parametrische CAD-Validierung, Voransicht-Animationen sowie Export von Meshen.
- [OpenScreen](https://github.com/dcc-mcp/dcc-mcp-openscreen) – Independently veröffentlicht als Version 0.1.1 ([Veröffentlichungsquelle](https://github.com/dcc-mcp/dcc-mcp-openscreen/tree/5a32837d9d1b3bd2aea04bf61e61b4a54bbd5262)), mit eingebauten `sources`, `record` und `export`-Funktionen; ist kein Adapter-Identifikator, der vom CLI 0.20.39 überprüft wird. Quellentests zeigen nicht die Akzeptanz einer Live-Aufzeichnung unter Windows an; die ununterstützte Auswahl von Fenstern bleibt in den Händen von dcc-cua und ui-control. Siehe die [Anleitung zum OpenScreen-Controller](/de/control/openscreen).
- [ParaView](https://github.com/dcc-mcp/dcc-mcp-paraview) – Eingebettete ParaView-Pipelines: begrenzte Primitiven, Flächenausschnitte und -scheiben, Konturextraktion, Export von verifizierten Datensätzen, Speicherung der PVSM-Zustände sowie Anzeige von PNG-Vorschauen. Die Quelle dieser Funktionen ist auf Core und Server 0.20.41 festgelegt. Eine Veröffentlichung ist noch nicht möglich. Zudem gibt es keine Adapter-Identifikatoren im Katalog, die durch die CLI 0.20.39 überprüft werden können.
- [PhotoCraft](https://github.com/dcc-mcp/dcc-mcp-photocraft) – Ein experimenteller Adapter für die offizielle PhotoCraft-0.2.0-Engine. Er verfügt über einen Standardprozess für Dokumente, Ebenen, Masken, Auswahlvorgänge, Anpassungen, Vorschaufunktionen sowie Exportfunktionen. Es handelt sich dabei um keinen eigentlichen Anwendungsprogrammierer; außerdem öffnet es keine Desktop-Fenster. Der Name „PhotoCraft“ wird in dem Katalog nicht als Adapter identifiziert, wie es durch die CLI 0.20.39 festgelegt ist.
- [PdfCraft](https://github.com/dcc-mcp/dcc-mcp-pdfcraft) – Ein Adapter für PdfCraft. Es handelt sich dabei nicht um eine Adresse eines Adapters, die im Katalog von CLI 0.20.39 gespeichert ist.
- [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) – Adobe Photoshop über UXP.
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) – Adobe Premiere Pro.
- [QGIS](https://github.com/dcc-mcp/dcc-mcp-qgis) – Es handelt sich um ein QGIS-Projekt, bei dem die vektorielle Bearbeitung über MCP erfolgt. Dabei wird eine von der Anwendung selbst gesteuerte Prozessverarbeitung verwendet, die getrennt von der laufenden QGIS-Desktop-Sitzung abläuft. Die Quelle des Projekts ist auf Version 0.20.41 gesichert; eine native Neuvalidierung ist erforderlich. Es gibt keine Pakete im PyPI oder auf GitHub. Zudem wird bei der CLI-Version 0.20.39 keine Anzeige eines Adapters angezeigt.
- [REAPER](https://github.com/dcc-mcp/dcc-mcp-reaper) – REAPER DAW-Adapter. Es handelt sich dabei nicht um einen Adapterschlüssel, der im Katalog von CLI 0.20.39 erfasst wird.
- [RizomUV](https://github.com/dcc-mcp/dcc-mcp-rizomuv) – Unpacken und Verpacken von UV-Dateien ohne Kopf. Es handelt sich dabei nicht um einen Adapter-Identifikator, der im Katalog gespeichert ist. Diese Information wurde von der CLI 0.20.39 überprüft.
- [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) – Modellierung, Verwendung von Materialien, Hinzufügen von Tags, Validierung sowie Austausch von Daten werden über eine autorisierte Ruby-Schnittstelle ermöglicht.
- [Shōgun](https://github.com/dcc-mcp/dcc-mcp-shogun) – Offizielle SDK-Werkzeuge für Objekte, Attribute, Kanäle, optische Kameras, Dateien, Steuerung der Zeitachse sowie für Einstellungen und Operationen bezüglich des Offline-Verarbeitungsprozesses. Erfahren Sie sich zunächst mit den Werkzeugen der Live-Instanz, bevor Sie mit der Arbeit beginnen.
- [SpeedTree](https://github.com/dcc-mcp/dcc-mcp-speedtree) – Independently veröffentlichtes V0.1.1-Versionen ([Veröffentlichungsquelle](https://github.com/dcc-mcp/dcc-mcp-speedtree/tree/595f0bd308aa0f4f0635a399c2b63bd76f16caf8)). Diese Versionen bieten die Möglichkeit, exakte Instanzen und offizielle Hook-Funktionen zu nutzen. Es handelt sich dabei nicht um eine Adapteridentifikation, die vom CLI 0.20.39 überprüft wird. Eine echte ST9-Übertragung wurde in Unreal Engine 5.5.4 mit einer einzigen Handbewegung verifiziert. Die Kollisionsskala sowie der dynamische Wind sind jedoch noch nicht verifiziert. Siehe dazu den [SpeedTree-MCP-Leitfaden](/de/control/speedtree).
- [DaVinci Resolve](https://github.com/dcc-mcp/dcc-mcp-resolve) – Ein Adapter für Projekte, Medienpool, Zeitachse sowie die Überprüfung der Galerie. Es handelt sich dabei nicht um einen Adapter-Identifikator, der im Katalog von CLI 0.20.39 überprüft wird.
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) – Adobe Substance 3D Designer.
- [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) – Adobe Substance 3D Painter.
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) – Ein Karteneinzugsprogramm. In dem Katalog, der von CLI 0.20.39 geprüft wurde, wird die Version 0.3.0 aufgeführt. Dabei ist die Eigenschaft `catalog_install_available=false` aktiviert.
- [Tracy Profiler](https://github.com/dcc-mcp/dcc-mcp-tracy) – Ein unabhängig veröffentlichter Adapter, Version 0.2.5 ([Quelle der Veröffentlichung](https://github.com/dcc-mcp/dcc-mcp-tracy/tree/a5e29b7bcef28ccd6a2ee17667dbdbcb7c45b119)). Er dient zur Erfassung von Daten und zur Analyse von Offline-Zonen. Es handelt sich dabei nicht um einen Adapter-Identifikator, der im Katalog gespeichert wird. Der Adapter muss daher ein bereits instrumentiertes Zielgerät sein. Weitere Informationen finden Sie in der [Tracy-Kontrollanleitung](/de/control/tracy).
- [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) – Eine Weiterentwicklung von TouchDesigner.
- [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) – Unity-Editor und Fähigkeiten zur Erstellung von Spielen.
- [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) – Ein Plug-in für den Unreal Engine-Editor.
- [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) – Die Erstellung von Audiokinetic Wwise-Anwendungen mithilfe der WAAPI-Tools. Der Katalog, der durch die CLI 0.20.39 geprüft wurde, listet Version 0.1.2 auf, wobei die Eigenschaft `catalog_install_available=false` angezeigt wird.
- [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) – Maxon ZBrush.

## Spezialisierte Maya-Fähigkeiten

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) – Arbeitsabläufe für das Einrichten von AdvancedSkeleton-Objekten.
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) – Integration mit mGear Shifter.
- [Prozessarchitektur](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) – Architekturbetriebe von Maya, Bifrost und Arnold.

## Generationsdienste

Für die lokale Erzeugung von Daten siehe die [ComfyUI-Spielwelt Workflow-Übersicht](/de/control/comfyui).

- [Hunyuan 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) – Text und Bilder werden in 3D-Form umgewandelt.
- [OpenAI Image](https://github.com/dcc-mcp/dcc-ai-openai-image) – Bildgenerierung und -bearbeitung für DCC-Textur-Workshops.
- [Tripo 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) – Text, Bild und mehrere Ansichten werden in eine 3D-Wahrnehmung umgewandelt.

## Anlagegeber

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Blender-Erweiterungen](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [Kostenlose Medienformate](https://github.com/dcc-mcp/dcc-asset-free-media)
- [Geospatial](https://github.com/dcc-mcp/dcc-asset-geospatial) · [glTF Sample Assets](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [Google Scanned Objects](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [Kenney](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [Objaverse](https://github.com/dcc-mcp/dcc-asset-objaverse) · [Poly Haven](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [Quaternius](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)
- [Pirate Nation](https://github.com/dcc-mcp/dcc-asset-pirate-nation) – Integration mit dem Anbieter von Spielressourcen.
- [Poly Pizza](https://github.com/dcc-mcp/dcc-asset-poly-pizza) – Suche nach Low-Poly-Modellen sowie Downloads dieser Modelle. Es werden auch die entsprechenden Lizenzinformationen sowie die Verantwortlichen für die Erstellung der Daten angegeben.

## UI-Automatisierung und gemeinsame Laufzeiten

- [winget-releaser](https://github.com/dcc-mcp/winget-releaser) – Eine Lösung zur Automatisierung der Veröffentlichung von Windows-Paketen für die Entwickler von Anwendungen.
- [Qt-Aktionen](https://github.com/dcc-mcp/dcc-ui-qt-actions) – Wiederverwendbare, eingegebenen Aktionen für Qt-basierte DCC-Interfäden.
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) – Erkennung von Fenstern und Widgets auf verschiedenen Hosts.
- [UI-Worksflow-Memory](https://github.com/dcc-mcp/dcc-ui-workflow-memory) – Überprüfte Selektoren, Rezepte sowie Informationen über Fehler.
- [dcc-mcp-filmcraft](https://github.com/dcc-mcp/dcc-mcp-filmcraft) – Experimentelle Integration mit FilmCraft: Ein Browser-SDK, der dazu dient, dass das gleiche Dokument im WebAssembly-Format angezeigt werden kann.
- [adobepy](https://github.com/dcc-mcp/adobepy) – Eine gemeinsam genutzte Laufzeitumgebung für die Kommunikation auf dem Adobe-Desktop.

## Organisation und Entdeckungsflächen

Weitere Entdeckungsmöglichkeiten sind unten aufgeführt. Überprüfen Sie den installierten CLI-Katalog, um festzustellen, ob diese Funktionen verfügbar sind. Ein einzelnes Repository oder ein entfernter Verbindungspunkt allein reicht nicht aus, um eine aktive Anwendungsinstanz zu erstellen.

- [Autodesk Product Help](https://developer.api.autodesk.com/knowledge/public/v1/mcp) – Ein externer, read-only-Dokumentationsdienst, der als „`autodesk-help`“ identifiziert wird. Er ist getrennt von den 38 Adapteridentifikatoren, die durch die CLI 0.20.39 angegeben werden. Es handelt sich dabei auch nicht um eine Anwendungsänderung.

- [Offizielle Websitequelle](https://github.com/dcc-mcp/dcc-mcp.github.io) – Gemeinsam verwendete Dokumente, Metadaten zu den Standorten, Anleitungen zur Anwendung sowie Beispiele für erfolgreiche Projekte.
- <a href="https://dcc-mcp.github.io/showcase/" target="_self">Showcase-Kollektion</a> Fertiggestellte Arbeiten, wiederverwendbare Anweisungen, Quellen für das Projekt, Lizenzierungsfragen sowie konkrete Beweise für die Produktion. [Quelle der Sammlung und Beiträge](https://github.com/dcc-mcp/showcase). [Beispiele für Adapter und Anweisungen](/de/examples) behalten ihren ursprünglichen Umfang bei.
- [Agent-Plug-ins](https://github.com/dcc-mcp/dcc-mcp-agent-plugins) – Kanonische Fähigkeiten und Plug-in-Pakete für unterstützte Agentenkunden.
- [dcc-cua](https://github.com/dcc-mcp/dcc-cua) – Eine plattformübergreifende Automatisierungslösung für den Einsatz auf Computern. Diese Lösung wird von begrenzten DCC-UI-Arbeiten verwendet.
- [Organisationseinstellungen](https://github.com/dcc-mcp/.github) – Der gemeinsame GitHub-Profil und die Konfiguration der Community.

> Die Verfügbarkeit von Projekten sowie die Unterstützung bei der Installation können sich zwischen den verschiedenen Katalogversionen unterscheiden. Verwenden Sie `dcc-mcp-cli --json dcc-types`, um den aktuellen Kataloginhalt, die Versionen der Adapters sowie die Installationsflaggen zu überprüfen. Für die Suche nach installierbaren Erweiterungen können Sie `dcc-mcp-cli marketplace search` verwenden.
