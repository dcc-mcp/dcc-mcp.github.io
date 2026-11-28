---
title: "Répertoire des projets DCC-MCP"
description: "Retrouvez le rôle, le statut et le dépôt officiel des adaptateurs, des Skills, des fournisseurs de ressources et des services de génération."
pageClass: ecosystem-directory
outline: [2, 2]
---

# Répertoire des projets DCC-MCP

Ce répertoire liste des outils créatifs pour les agents d’IA et l’automatisation. DCC signifie création de contenu numérique. Commencez par le guide de travail de la compétence publique [`dcc-mcp`](https://clawhub.ai/loonghao/skills/dcc-mcp). Ensuite, choisissez l’adaptateur ou l’extension qui vous convient pour votre projet. Chaque projet décrit lui-même son installation, sa compatibilité et les APIs utilisées pour son fonctionnement. Le document Core décrit l’infrastructure de connexion et d’appel partagée. Un outil type définit ses paramètres, leurs types, ainsi que les résultats obtenus lors de l’exécution de l’outil. Ainsi, il est possible d’inspecter et de valider les résultats de l’exécution de l’outil.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>Utilisez des logiciels créatifs.</strong><span>dcc-mcp Compétences</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Construisez un adaptateur.</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Construire une compétence</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## Infrastructures partagées et outils communs

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) – Gateway partagé, interface CLI, environnement de développement MCP/REST, fonctionnalités de sécurité, diagnostic et observation des performances.
- [dcc-mcp-runtime](https://github.com/dcc-mcp/dcc-mcp-runtime) – Environnement de développement partagé pour Python, ainsi que contrat de manifeste pour les adaptateurs DCC-MCP externes.
- [Recherche sur le marché](/fr/marketplace) – Faites une recherche dans le catalogue officiel des extensions utilisées par `dcc-mcp-cli` ; [source du catalogue](https://github.com/dcc-mcp/marketplace).
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) – Intégration avec Autodesk Flow Production Tracking.
- [fpt-cli](https://github.com/dcc-mcp/fpt-cli) – Une interface de commande en Rust axée sur l’automatisation, destinée à l’utilisation dans Autodesk Flow Production Tracking.
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) – Processus et interopérations liés à OpenUSD.
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) – Interopérabilité entre MaterialX et le développement.
- [dcc-lookdev](https://github.com/dcc-mcp/dcc-lookdev) – Workflows standardisés pour le développement des interfaces entre différentes applications.
- [dcc-modeling-spec](https://github.com/dcc-mcp/dcc-modeling-spec) – Spécification de modélisation neutre envers l’ordinateur hôte, version 2. Cette spécification concerne les portes et les artefacts de révision pour les workflows de Maya, Blender, Houdini et 3ds Max.
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) – Manifests de publication portables pour les workflows DCC, USD, des réseaux de rendu, et pour le suivi des tâches.
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) – Processus de texturement déterministe pour OpenImageIO et OpenColorIO.
- [dcc-itchio](https://github.com/dcc-mcp/dcc-itchio) – Compétences en matière d’acquisition de ressources sécurisées sur itch.io, ainsi que de publication de jeux sous forme de preview.
- [dcc-media-enhance](https://github.com/dcc-mcp/dcc-media-enhance) – Orchestration en Rust, basée sur l’approche d’agent, pour le dépersonnalage des médias et son amélioration, en utilisant des backend déjà installés.
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) – Compétences liées au marché, neutres par rapport à l’hôte. Conçu pour l’inspection des caches SideFX en mode hors ligne, dans un environnement sécurisé par rapport à la confidentialité. Pas de package adaptateur ni de package disponible sur PyPI.
- [mcpcall](https://github.com/dcc-mcp/mcpcall) – Une interface de ligne de commande permettant de lister et d’appeler les outils du serveur MCP via la sortie standard ou via HTTP.
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) – Capture et répétition automatique des états de rendu.
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) – Capture et analyse des données par Tracy Frame-Profiler.

## DCC et adaptateurs de mise en œuvre créative

Pour les questions de contrôle en langue naturelle et les instructions sûres pour l’Agent, commencez par les guides de contrôle AI spécifiques à l’application ([[Guide d’utilisation](/fr/use-cases)]). Ensuite, utilisez le répertoire d’adaptateurs lié à ces guides comme source fiable pour les informations relatives à l’installation et aux détails de l’hôte.

Le catalogue distant signé, vérifié via la CLI officielle 0.20.39, liste 38 identifiants d’adaptateurs. L’installation du catalogue est disponible pour 33 d’entre eux ; `kdenlive`, `material-maker`, `powerpoint`, `tiled` et `wwise` ont `catalog_install_available=false`. Une définition de catalogue ou une sortie d’adaptateur indépendante ne garantit pas l’host en direct ou l’acceptation de la production complète.

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) – Autodesk 3ds Max.
- [3D Slicer](https://github.com/dcc-mcp/dcc-mcp-slicer) – Volumes synthétiques limités, phantoms de matériaux, et mailles de sphères pouvant être exportées en format NRRD/STL. Possibilité de retourner les scènes vers le format MRB, d’ajuster la caméra et les positions des tranches, ainsi que de voir des prévisualisations en format PNG. Seuls les données synthétiques sont disponibles : aucune donnée provenant du patient, pas d’importation de données DICOM, pas de transfert de données cliniques, ni de chargement arbitraire de scènes. La source du logiciel est fixée à Core et au serveur 0.20.41. Une nouvelle qualification du logiciel est nécessaire. Ce n’est pas un identifiant d’adaptateur dans le catalogue, confirmé par CLI 0.20.39.
- [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) – Adobe After Effects.
- [AutoCAD](https://github.com/dcc-mcp/dcc-mcp-autocad) – Une automatisation du traitement des fichiers DWG, permettant une utilisation portable, grâce à la fonctionnalité COM et à l’utilisation de l’application `accoreconsole.exe`. Il est conseillé de vérifier le répertoire où se trouvent ces fichiers pour savoir s’ils sont disponibles et comment les utiliser.
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) – Un add-on de Blender, ainsi qu’un serveur intégré.
- [CapCut](https://github.com/dcc-mcp/dcc-mcp-capcut) – Logiciel de conversion de fichiers CapCut, utilisé sur un ordinateur local, avec un pont de connexion authentifié.
- [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) – Documente écrit en texte, primitives, fonctionnalités de mise en forme, et automatisation de l’affichage des résultats.
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) – Valeurisation en temps réel des nœuds, exécution des tâches dans une file d’attente limitée, et récupération des artefacts. Le guide [ComfyUI MCP](/fr/control/comfyui) traite de l’interface utilisateur pour les jeux locaux, des fichiers PNG transparents, ainsi que des fichiers GLB créés avec Pixal3D/PBR. Il indique également si les sources ou les versions finales des fichiers sont disponibles.
- [Epic Games Launcher et Fab](https://github.com/dcc-mcp/dcc-mcp-epic) – Version v0.2.1 est disponible indépendamment ([source du logiciel](https://github.com/dcc-mcp/dcc-mcp-epic/tree/1157defe203aab4beaa8f7be56f8063caac2a415)). Cette version permet l’inventaire des jeux installés, le contrôle des projets, ainsi que les opérations liées aux services fournis par Fab. Il s’agit donc d’un identifiant de service, et non d’un adaptateur. Ce logiciel est vérifié par la CLI 0.20.39. L’installation du jeu reste uniquement planifiée, sans qu’il y ait de fournisseur nativement vérifié. La connexion, les achats et l’acceptation de la licence restent gérés par des humains. Veuillez consulter la [guilde de contrôle d’Epic Games](/fr/control/epic-games).
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) – Modélisation par matériaux paramétriques, vérification de la topologie, et échange de maillages.
- [Gaea](https://github.com/dcc-mcp/dcc-mcp-gaea) – Version v0.1.1, disponible indépendamment ([source du logiciel](https://github.com/dcc-mcp/dcc-mcp-gaea/tree/b95d3f81b8f883732c73d268658100d09d9cad84)). Conforme aux exigences relatives aux tâches de construction de terrain et à la vérification des résultats. Ce n’est pas un identifiant d’adaptateur, comme celui que le CLI 0.20.39 vérifie dans le catalogue. Les builds autorisés, les opérations de suppression des arbres de processus, la qualité du terrain, ainsi que les importations depuis Unreal restent à vérifier. Veuillez consulter la [guilde de contrôle de Gaea](/fr/control/gaea).
- [GameMaker](https://github.com/dcc-mcp/dcc-mcp-gamemaker) – Adaptateur pour GameMaker ; ce n’est pas un identifiant d’adaptateur dans le catalogue vérifié par CLI 0.20.39.
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) – GIMP 3.
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) – Le moteur Godot et les compétences nécessaires pour créer des jeux 2D.
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) – SideFX Houdini.
- [Illustrateur](https://github.com/dcc-mcp/dcc-mcp-illustrator) – Édition de documents créés avec Adobe Illustrator, traitement vectoriel des images, édition du DOM officiel, et exportation des produits finis.
- [Inkscape](https://github.com/dcc-mcp/dcc-mcp-inkscape) – L’intégration des sources en dehors du catalogue est actuellement validée par CLI 0.20.39. Le flux de production cloud est toujours bloqué en raison de la validation de l’origine des données ; veuillez consulter le [dossier de test cloud](/fr/cloud-agents#cloud-mcp-tests).
- [Katana](https://github.com/dcc-mcp/dcc-mcp-katana) – Foundry Katana.
- [Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive) – Logiciel pour la création de projets, le rendu des fichiers MLT, ainsi que la gestion de l’éditeur DCC-CUA partagé. Le dépôt de code source a publié une version 0.1.1 ([Source du logiciel](https://github.com/dcc-mcp/dcc-mcp-kdenlive/tree/376c812047b308239174aa1bbb662da1908f829e)). Le catalogue vérifié par la CLI 0.20.39 indique que `kdenlive` est à la version 0.1.0, avec `catalog_install_available=false`. Cette vérification du catalogue n’a pas permis de déterminer si l’éditeur ou le rendu fonctionnaient correctement. Veuillez consulter la [guilde de contrôle de Kdenlive](/fr/control/kdenlive).
- [KiCad](https://github.com/dcc-mcp/dcc-mcp-kicad) – Il s’agit d’un outil permettant de créer des plans de circuit imprimé sans utiliser de logiciel de traitement de texte. Il fonctionne via l’API native `pcbnew` et `kicad-cli`. Ce logiciel permet de créer des plans de circuit imprimé indépendants, sans avoir besoin de se connecter à l’éditeur de PCB ou de disposer d’un contrôle via l’interface IPC/UI. La source du logiciel est fixée au version 0.20.41, avec une requalification native en cours. Aucune version définitive n’a encore été publiée. De plus, aucun identifiant d’adaptateur n’est disponible dans le catalogue, conformément à la version 0.20.39.
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) – Krita.
- [LiquiGen](https://github.com/dcc-mcp/dcc-mcp-liquigen) — Inspection du graphe de nœuds, contrôles de simulation limités, exportation des données de TVA, et transfert avec le moteur Unreal Engine ; listé sous `liquigen` dans le catalogue vérifié par CLI 0.20.39.
- [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) – Projetations de Mari, géométrie, graphes de nœuds, développement visuel, exportation de textures.
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) – Création de matériel procédural. Le catalogue vérifié par CLI 0.20.39 indique que la version 0.3.1 est disponible, mais avec une valeur `catalog_install_available=false`.
- [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) – Autodesk Maya.
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) – Création de matériaux PBR, inspection des scènes et rendu des images.
- [Marvelous Designer](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer) – Version v0.1.1, disponible indépendamment ([source du logiciel](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer/tree/4d4d289905f82290804b288d03d84d541b01af08)). Conforme aux opérations de saisie de données, de simulation, de sauvegarde et d’exportation des données. Ce logiciel n’est pas un adaptateur identifié dans le catalogue, comme le confirme l’analyse effectuée par CLI 0.20.39. Les fonctionnalités liées au traitement des données, à l’initialisation de Qt, à la simulation des tissus, ainsi qu’à la transfert des données entre les différentes versions du logiciel restent encore à améliorer. Veuillez consulter la [guilde de contrôle de Marvelous Designer](/fr/control/marvelous-designer).
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) – Autodesk MotionBuilder.
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) – Une solution de création de fichiers audio de la marque Foundry.
- [OBS Studio](https://github.com/dcc-mcp/dcc-mcp-obs) — Contrôle précis de la scène et de la source, ainsi que du contrôle de la capture d’images ; listé comme `obs` dans le catalogue vérifié par CLI 0.20.39. L’installation de l’adaptateur ne permet pas l’installation de OBS Studio.
- [Office](https://github.com/dcc-mcp/dcc-mcp-office) — Application partagée `office` : protocole office-rpc/1, sidecar en C#, ouvrier Open XML, connecteur Microsoft Graph, et compétences couvrant l’ensemble de Office. Cette route partagée est distincte des 38 identifiants d’adaptateur rapportés par CLI 0.20.39 ; la disponibilité spécifique à l’application reste propriété de chaque adaptateur.
- [PowerPoint](https://github.com/dcc-mcp/dcc-mcp-powerpoint) – Génération de diaporamas à partir de fichiers Deck IR, via la compilation en format Open XML et la rendu par le système COM de bureau. Le catalogue vérifié par CLI 0.20.39 indique que la version est 0.1.0, avec une valeur `catalog_install_available=false`.
- [Word](https://github.com/dcc-mcp/dcc-mcp-word) – Documents Word, champs de données, et fonctionnalités de réglage de l’affichage. Il s’agit d’une fonctionnalité en cours de développement ; le répertoire d’adaptation reste encore un simple placeholder, sans aucune sortie officielle.
- [Excel](https://github.com/dcc-mcp/dcc-mcp-excel) – Des fichiers de travail, des formules, des graphiques, ainsi que des tableaux de bord de production. Ce projet est encore en phase de planification ; le répertoire d’adaptation reste donc un simple placeholder, sans aucune version définitive.
- [Outlook](https://github.com/dcc-mcp/dcc-mcp-outlook) – Des versions préliminaires de courrier électronique et de calendrier (planifié, Phase 3 ; niveau de difficulté : `host_limited`). Il s’agit d’une solution installée localement qui utilise MAPI/COM. Il est nécessaire de obtenir le consentement de l’utilisateur lors de la première exécution de l’application. Par conséquent, il n’y a pas de méthode simple pour l’exécuter, et il ne peut donc pas être vérifié lors de la phase de test. Une solution basée sur Microsoft Graph serait préférable pour permettre une vérification plus efficace.
- [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) – Logiciel permettant la validation des modèles paramétriques, la visualisation préliminaire des résultats, ainsi que l’exportation des maillages.
- [OpenScreen](https://github.com/dcc-mcp/dcc-mcp-openscreen) — Version indépendante v0.1.1 ([source de publication](https://github.com/dcc-mcp/dcc-mcp-openscreen/tree/5a32837d9d1b3bd2aea04bf61e61b4a54bbd5262)), avec des opérations de saisie de `sources`, `record`, et `export` ; ce n’est pas un identifiant d’adaptateur inscrit dans le catalogue contrôlé par la CLI 0.20.39. Les tests de source ne vérifient pas l’acceptation de l’enregistrement en temps réel sur Windows ; la sélection des fenêtres non supportées reste gérée par dcc-cua et ui-control. Veuillez consulter le [guide de contrôle OpenScreen](/fr/control/openscreen).
- [ParaView](https://github.com/dcc-mcp/dcc-mcp-paraview) – Conduites de traitement permanentes de type ParaView : primitives limitées, clippings et coupes en plans, extraction de contours, exportation de données validées, sauvegarde des états PVSM, ainsi que visualisations en format PNG. La source de ces conduites de traitement est fixée à Core et au serveur 0.20.41. Une réqualification native est en cours. Aucune version publiée pour l’instant. De plus, aucun identifiant d’adaptateur n’est disponible dans le catalogue, conformément à la version 0.20.39 du CLI.
- [PhotoCraft](https://github.com/dcc-mcp/dcc-mcp-photocraft) – C’est un adaptateur expérimental conçu pour l’engin PhotoCraft 0.2.0. Il gère un processus standard pour les documents, les couches, les masques, les sélections, les ajustements, les prévisualisations et les exports. Ce logiciel ne constitue pas une application complète ; il ne sert à ouvrir aucune fenêtre de bureau. Il ne fait pas partie des adaptateurs identifiés dans le catalogue, conformément aux spécifications de CLI 0.20.39.
- [PdfCraft](https://github.com/dcc-mcp/dcc-mcp-pdfcraft) – Adaptateur PdfCraft ; ce n’est pas un identifiant d’adaptateur dans le catalogue vérifié par CLI 0.20.39.
- [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) – Adobe Photoshop, via UXP.
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) – Adobe Premiere Pro.
- [QGIS](https://github.com/dcc-mcp/dcc-mcp-qgis) – Il s’agit d’un projet QGIS permettant l’édition de vecteurs, fonctionnant via MCP. Ce projet est géré par un processus PyQGIS sans interface graphique, propriété de l’adaptateur. Le projet n’est pas connecté à une session de bureau QGIS en cours. La source du projet est fixée à la version 0.20.41 ; une révalidation native est nécessaire. Il n’y a pas de paquet PyPI ou de version publiée sur GitHub. De plus, l’identifiant de l’adaptateur n’est pas inclus dans le catalogue vérifié par la CLI 0.20.39.
- [REAPER](https://github.com/dcc-mcp/dcc-mcp-reaper) – C’est un adaptateur pour REAPER DAW. Ce n’est pas un identifiant d’adaptateur, comme cela peut être déduit à partir du catalogue vérifié par CLI 0.20.39.
- [RizomUV](https://github.com/dcc-mcp/dcc-mcp-rizomuv) – Mise en forme et encombrement des données UV sans tête. Ce n’est pas un identifiant d’adaptateur, comme cela est indiqué dans le catalogue, et ce type d’identifiant n’est pas pris en compte par CLI 0.20.39.
- [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) – Permet de saisir des modèles, des matériaux, des étiquettes, des scènes, ainsi que de valider et d’échanger des données, via une interface Ruby authentifiée.
- [Shōgun](https://github.com/dcc-mcp/dcc-mcp-shogun) – C’est un ensemble d’outils officiels développés par SDK, conçus pour gérer les objets, leurs attributs, les canaux, les caméras optiques, les fichiers, le contrôle de la timeline, ainsi que les paramètres liés au traitement hors ligne. Découvrez ces outils avant de les utiliser.
- [SpeedTree](https://github.com/dcc-mcp/dcc-mcp-speedtree) – Version v0.1.1, publiée de manière indépendante ([source du logiciel](https://github.com/dcc-mcp/dcc-mcp-speedtree/tree/595f0bd308aa0f4f0635a399c2b63bd76f16caf8)). Cette version permet de créer des ponts entre les différentes instances officielles. Ce n’est pas un identifiant d’adaptateur, comme ceux vérifiés par le CLI 0.20.39. Une transition réelle avec ST9 a été testée dans Unreal Engine 5.5.4. La taille des collisions et le vent dynamique ne sont pas encore vérifiés. Veuillez consulter la [guilde de SpeedTree](/fr/control/speedtree).
- [DaVinci Resolve](https://github.com/dcc-mcp/dcc-mcp-resolve) – Un adaptateur de DaVinci Resolve pour le gestionnaire de projets, le pool de médias, la timeline et l’inspection des galeries. Ce n’est pas un identifiant d’adaptateur dans le catalogue vérifié par CLI 0.20.39.
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) – Adobe Substance 3D Designer.
- [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) – Adobe Substance 3D Painter.
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) – Éditeur de cartes Tiled. Le catalogue vérifié par CLI 0.20.39 indique que la version disponible est 0.3.0, avec une valeur `catalog_install_available=false`.
- [Tracy Profiler](https://github.com/dcc-mcp/dcc-mcp-tracy) – Un adaptateur publié indépendamment, version 0.2.5 ([Source du logiciel](https://github.com/dcc-mcp/dcc-mcp-tracy/tree/a5e29b7bcef28ccd6a2ee17667dbdbcb7c45b119)). Il permet la capture des données de manière indépendante et l’analyse des zones hors ligne. Ce n’est pas un identifiant d’adaptateur dans le catalogue vérifié par la CLI 0.20.39. Il nécessite donc qu’il s’agisse d’un objet cible déjà équipé d’instruments de mesure. Veuillez consulter la [guilde de contrôle de Tracy](/fr/control/tracy).
- [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) – Un sous-produit de TouchDesigner.
- [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) – L’éditeur Unity et les compétences nécessaires pour créer des jeux.
- [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) – Un plug-in pour Unreal Engine.
- [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) – L’édition de contenu audio via les outils WAAPI ; le catalogue vérifié par CLI 0.20.39 indique que la version utilisée est 0.1.2, avec une valeur `catalog_install_available=false`.
- [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) – Maxon ZBrush.

## Compétences spécialisées des Mayas

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) – Processus de montage AdvancedSkeleton.
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) – Intégration avec mGear Shifter.
- [Architecture de procédure](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) – Workflows d’architecture avec Maya, Bifrost et Arnold.

## Services de génération

Pour la génération locale, veuillez consulter le [ flux de travail du jeu ComfyUI](/fr/control/comfyui).

- [Hunyuan 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) – Traduction de texte et d’images en format 3D.
- [OpenAI Image](https://github.com/dcc-mcp/dcc-ai-openai-image) – Génération et modification d’images pour les workflows de texture de DCC.
- [Tripo 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) – Génération de textes, images et vidéos en format 3D.

## Provedeurs d’actifs

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Blender Extensions](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [Free Media](https://github.com/dcc-mcp/dcc-asset-free-media)
- [Geospatial](https://github.com/dcc-mcp/dcc-asset-geospatial) · [glTF Sample Assets](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [Objets scannés par Google](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [Kenney](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [Objaverse](https://github.com/dcc-mcp/dcc-asset-objaverse) · [Poly Haven](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [Quaternius](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)
- [Pirate Nation](https://github.com/dcc-mcp/dcc-asset-pirate-nation) – Intégration avec les fournisseurs d’éléments de jeu.
- [Poly Pizza](https://github.com/dcc-mcp/dcc-asset-poly-pizza) – Modèle en format polyvalent, permettant la recherche et la téléchargement de modèles. Il s’agit d’un modèle qui bénéficie d’une licence d’utilisation et de données sur l’origine de ces modèles.

## Automatisation de l’interface utilisateur et temps de exécution partagé

- [winget-releaser](https://github.com/dcc-mcp/winget-releaser) – Logiciel permettant l’automatisation des mises à jour des paquets Windows, destiné aux personnes qui s’occupent de la maintenance des applications.
- [Qt Actions](https://github.com/dcc-mcp/dcc-ui-qt-actions) – Des actions réutilisables, conçues pour les interfaces DCC basées sur Qt.
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) – Découverte de fenêtres et de widgets entre différents hôtes.
- [UI Workflow Memory](https://github.com/dcc-mcp/dcc-ui-workflow-memory) – Sélecteurs vérifiés, recettes, et mémoire des échecs.
- [dcc-mcp-filmcraft](https://github.com/dcc-mcp/dcc-mcp-filmcraft) – Intégration avec FilmCraft : un SDK web pour le même éditeur de documents WebAssembly.
- [adobepy](https://github.com/dcc-mcp/adobepy) – Logiciel de communication sur bureau Adobe partagé.

## Organisation et surfaces de découverte

Les autres surfaces de découverte sont listées ci-dessous. Vérifiez le catalogue des CLI installés pour savoir s’ils sont disponibles. Un seul répertoire ou un connecteur distant ne suffit pas pour établir une instance d’application fonctionnelle.

- [Autodesk Product Help](https://developer.api.autodesk.com/knowledge/public/v1/mcp) – C’est un connecteur de documentation en mode “opt-in”, externe et de lecture seule. Son identifiant est `autodesk-help`. Il est distinct des 38 identifiants d’adaptateurs indiqués par CLI 0.20.39. Il ne constitue pas non plus une voie de mutation d’application.

- [Source du site officiel](https://github.com/dcc-mcp/dcc-mcp.github.io) – Documentation partagée, métadonnées GEO, guides d’utilisation des applications, et exemples d’applications fonctionnelles.
- <a href="https://dcc-mcp.github.io/showcase/" target="_self">Collection présentée</a> – Tâches terminées, instructions réutilisables, sources de projet, licences, et preuves explicites de la production. [Source de la collection et contributions](https://github.com/dcc-mcp/showcase). [Exemples d’adaptation des instructions](/fr/examples) conservent leur champ d’application original.
- [Plugins pour les agents](https://github.com/dcc-mcp/dcc-mcp-agent-plugins) – Compétences standard en matière de DCC-MCP, ainsi que des paquets de plugins pour les clients d’agent pris en charge.
- [dcc-cua](https://github.com/dcc-mcp/dcc-cua) – Logiciel de gestion automatique de l’utilisation des ordinateurs sur différentes plateformes, utilisé dans les workflows d’interaction avec l’utilisateur basés sur DCC.
- [Profil de l’organisation](https://github.com/dcc-mcp/.github) – Profil partagé sur GitHub, ainsi que la configuration de la communauté.

> La disponibilité du projet et le soutien à son installation peuvent varier d’une révision du catalogue à l’autre. Utilisez `dcc-mcp-cli --json dcc-types` pour vérifier la source du catalogue actuel, les versions des adaptateurs, ainsi que les options d’installation. Pour trouver des extensions qui peuvent être installées, utilisez `dcc-mcp-cli marketplace search`.
