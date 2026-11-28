---
title: "Intégrations avec les logiciels de création"
description: "Retrouvez l’adaptateur MCP, l’identifiant CLI et le dépôt officiel de votre logiciel de création."
pageClass: integrations-page
outline: [2, 3]
---

# Intégrations avec les logiciels de création

DCC-MCP permet de connecter les agents d’IA au logiciel de création de contenu numérique que votre équipe utilise déjà. Ce répertoire associe chaque application supportée à son dépôt officiel d’adaptateurs, ainsi qu’aux termes de recherche couramment utilisés par les utilisateurs. Parmi ces termes, on trouve **Maya MCP**, **Blender MCP**, **Houdini MCP**, **3ds Max MCP**, **Substance Painter MCP** et **SP MCP**.

Utilisez la [page officielle](https://clawhub.ai/loonghao/skills/dcc-mcp) pour gérer un DCC connecté. Utilisez le [Skill Marketplace](/fr/marketplace) pour trouver des extensions de flux de travail. Et utilisez [`dcc-mcp-cli dcc-types`](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference) pour examiner le catalogue des versions live du DCC.

## Catalogue officiel du DCC MCP

Le tableau présente une sélection d’intégrations. Le catalogue de Core 0.20.39 compte 38 identifiants d’adaptateurs, dont Wwise. Consultez le catalogue installé avec `dcc-mcp-cli dcc-types`. [Répertoire des projets DCC-MCP](/fr/ecosystem)

| Application | Termes de recherche courants | Intégration officielle |
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

## Recherches courantes du DCC MCP

### Y a-t-il un diplôme de niveau MCP pour les Mayas ?

Oui. L'intégration officielle [Maya MCP](https://github.com/dcc-mcp/dcc-mcp-maya) relie Autodesk Maya au DCC-MCP Gateway. Utilisez la recherche saisie et le flux d'appels pour découvrir les outils disponibles dans l’instance Maya connectée.

### Y a-t-il un Blender MCP ?

Oui. L'intégration officielle [Blender MCP](https://github.com/dcc-mcp/dcc-mcp-blender) relie Blender au même Gateway et prend en charge la découverte partagée des DCC-MCP, ainsi que la validation et les contrats de flux de travail.

### Y a-t-il un Houdini MCP ?

Oui. L'intégration officielle [Houdini MCP](https://github.com/dcc-mcp/dcc-mcp-houdini) fournit le dépôt de données et la mise en œuvre spécifique au hôte pour SideFX Houdini.

### Que signifie SP MCP ?

**SP MCP** est une abréviation courante pour **Substance Painter MCP**. Le nom officiel est **Substance 3D Painter MCP**, fourni par le dépôt [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter). Utilisez ce dépôt ainsi que le DCC-MCP Marketplace lorsque vous avez besoin de workflows de peinture de textures.

### Comment puis-je trouver un outil DCC MCP ?

Installez la fonctionnalité publique DCC-MCP. Confirmez l’état du gateway en utilisant `dcc-mcp-cli health`. Pour améliorer la découverte des hosts, utilisez `dcc-mcp-cli search --query <intent> --dcc-type <host>`. Ensuite, suivez les instructions fournies par `next_step`. Lisez également les informations relatives à l’installation et à la compatibilité avec chaque host.

## Continuer.

- [Utilisez DCC-MCP depuis un agent.](/fr/agents)
- [Cherchez sur le marché des compétences.](/fr/marketplace)
- [Comprendre le modèle de production.](/fr/why-dcc-mcp)
- [Explorer l’ensemble de l’écosystème.](/fr/ecosystem)
