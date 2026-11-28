---
title: "Piloter les logiciels de création avec l’IA"
description: "Parcourez les tâches et les consignes par logiciel pour rechercher un outil, lancer une opération et vérifier le résultat."
pageClass: route-page
---

<script setup>
import entries from "../.vitepress/i18n/fr/integrations.json"
import labels from "../.vitepress/i18n/fr/guide.json"
import DccControlGuideIndex from '../.vitepress/theme/components/DccControlGuideIndex.vue'
</script>

# Piloter les logiciels de création avec l’IA

Ces exemples utilisent la compétence publique [`dcc-mcp`](https://clawhub.ai/loonghao/skills/dcc-mcp) et `dcc-mcp-cli`. Les instructions décrivent le résultat attendu et vérifient si les conditions sont remplies. L’agent identifie alors les noms des outils à partir de l’hôte connecté.

Pour que un agent AI puisse gérer une application créative en cours, commencez par l’exemple de guide ci-dessous, qui décrit les tâches à accomplir et le flux de travail nécessaire. Chaque guide renvoie au répertoire des adaptateurs correspondant à l’application, où sont stockées les informations relatives à l’installation, à la compatibilité et aux détails spécifiques à l’application.

## Comment puis-je contrôler chaque DCC avec l’AI ?

<DccControlGuideIndex language="fr" :entries="entries" :labels="labels" />

## Exemple de connexion avec Maya

Installez la compétence `dcc-mcp` et connectez l’adaptateur [Maya](https://github.com/dcc-mcp/dcc-mcp-maya). Vérifiez l’installation existante avant d’ajouter le CLI ou l’adaptateur.

```text
Configuez DCC-MCP afin de pouvoir contrôler Maya sur cette machine. Installez-le, puis suivez les instructions publiées par @loonghao/dcc-mcp. Examinez d’abord le CLI actuel et l’adaptateur Maya. Ne modifiez pas la scène actuelle pendant le processus de configuration. Ouvrez ou détectez Maya, vérifiez que le gateway fonctionne correctement et que l’instance de Maya est disponible. Effectuez une recherche en mode lecture seule, décrivez ensuite les étapes à suivre, puis indiquez l’instance connectée, les capacités disponibles, ainsi que l’action suivante à entreprendre pour gérer Maya. Ne modifiez pas la scène actuelle pendant le processus de configuration.
```

Vérifier la connexion avec :

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Maya scene" --dcc-type maya
```

## Exemple de connexion avec le Blender

Utilisez la même compétence et le même interface de commande avec l’adaptateur [Blender](https://github.com/dcc-mcp/dcc-mcp-blender). L’installation ainsi que les outils spécifiques à Blender restent dans ce répertoire.

```text
Configuez DCC-MCP de manière à pouvoir contrôler Blender sur cette machine. Installez-le, puis suivez les instructions données dans la vidéo publiée par @loonghao/dcc-mcp. Vérifiez d’abord le CLI actuel et l’adaptateur de Blender. Ne modifiez pas ma scène actuelle pendant la configuration. Ouvrez ou détectez Blender, vérifiez le gateway et l’instance de Blender en ligne. Effectuez une recherche en mode lecture seule, décrivez ensuite les étapes à suivre, puis indiquez l’instance connectée, les capacités disponibles, ainsi que la prochaine action à entreprendre avec Blender. Ne modifiez pas ma scène actuelle pendant la configuration.
```

Vérifier la connexion avec :

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Blender scene" --dcc-type blender
```

## Comment puis-je créer dix sphères aléatoires dans Maya ?

Décrivez le résultat, plutôt que de suggérer un nom pour l’outil. Incluez également la valeur de la graine aléatoire, les limites, les noms des éléments, ainsi que les vérifications nécessaires.

```text
Utilise la Skill dcc-mcp pour te connecter à mon instance Maya. Crée un nouveau groupe nommé ai_random_spheres et place exactement 10 sphères polygonales en utilisant la graine 42. Donne un nom distinct à chacune. Tire les positions dans les intervalles X -10..10, Y 0..10 et Z -10..10, sans intersection visible. Préserve le contenu de la scène. Recherche les outils Maya typés, suis chaque next_step, puis vérifie le nombre de sphères, leurs noms, leurs transformations et leur appartenance au groupe. Présente les résultats et attends ma demande avant d’enregistrer la scène.
```

## Je veux créer un jeu. Où devrais-je commencer ?

Définissez d’abord une boucle jouable. Ensuite, choisissez entre [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal), [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) ou [Godot](https://github.com/dcc-mcp/dcc-mcp-godot). Utilisez le [Marketplace](/fr/marketplace) pour obtenir des assets supplémentaires. Vérifiez bien les licences avant de les utiliser. Le [Showcase](/fr/examples) contient des exemples de prompts utiles.

```text
Aidez-moi à créer un petit jeu jouable avec DCC-MCP. D’abord, indiquez-moi le moteur à utiliser (Unreal, Unity ou Godot), la plateforme cible, le style visuel, ainsi qu’un cycle de jeu en une phrase. Réduisez l’idée au plus simple : un niveau et une condition de victoire ou de défaite. Identifiez les DCCs et les moteurs connectés, trouvez les outils nécessaires, et vérifiez le Marketplace pour trouver les assets dont nous avons besoin. Demandez votre accord avant d’installer des packages, de télécharger des assets ou de modifier l’état du système. Créez la plus petite version jouable possible, exécutez-la, validez les contrôles et le cycle de victoire/défaite. Capturez les résultats, et rapportez le projet ainsi que les chemins de construction des packages. Ne prétendez pas avoir terminé le projet sans avoir créé une version jouable.
```

## Comment éditer des photos avec l’AI ?

Utilisez l’adaptateur [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) pour effectuer des retouches, des corrections de couleurs, des masques, des étapes de travail et l’exportation des fichiers. Indiquez ce qui doit être modifié, ce qui doit rester inchangé, ainsi que le format de sortie requis.

```text
Utilisez l’outil dcc-mcp pour vous connecter à Photoshop et m’aider à modifier cette image. D’abord, déterminer ce qui doit être modifié, ce qui doit rester inchangé, le style de référence, ainsi que le format de présentation. Conservez le document original. Utilisez des nouveaux niveaux, des niveaux d’ajustement, des masques ou des objets intelligents, si cela est possible. Ne flattiez jamais ni effacez jamais le fichier source sans mon accord. Découvrez les outils de Photoshop. Effectuez une première évaluation de l’image. Comparez le résultat avec les spécifications données. Vérifiez les dimensions, le mode de couleur, la structure des niveaux, et les éléments manquants. Ensuite, exportez l’image uniquement après que j’aurai approuvé la preview.
```

## Comment puis-je modifier ou composer un film avec l’AI ?

Utilisez [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) pour l’édition de la timeline, [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) pour les graphiques animés et le travail sur les couches d’images, et [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) pour le montage basé sur des nœuds. Gardez les tâches liées aux différentes applications qui constituent le flux de travail.

```text
Utilisez la compétence dcc-mcp pour m’aider à éditer ou à composer ce film. D’abord, déterminez si l’opération consiste en l’édition de la timeline dans Premiere, la création de graphiques animés dans After Effects, ou la composition de couches dans Nuke. Identifiez les médias sources, et vérifiez leur résolution, fréquence d’affichage, espace de couleur, exigences audio, ainsi que les conditions de livraison du film. Conservez les fichiers sources, créez un nouveau projet ou une nouvelle composition. Découvrez les outils disponibles, réalisez une scène représentative, effectuez une prise de vue, et vérifiez les médias manquants. Informez-vous également des chemins de navigation pour le projet et la prise de vue. Demandez avant d’installer des codecs ou des plugins, de relier à nouveau les médias, ou de commencer la renderisation finale.
```

## Comment créer des effets visuels à l’aide de l’IA ?

Utilisez [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) pour la géométrie procédurale et la simulation. Utilisez Nuke ou After Effects pour le montage des images. Utilisez [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) pour les effets en temps réel. Identifiez l’application qui sera chargée de gérer ces éléments avant de créer une image de test.

```text
Utilisez la compétence dcc-mcp pour m’aider à créer un effet visuel. Tout d’abord, demandez le résumé du script, les références, la durée de l’effet, la caméra utilisée, le format de diffusion, et déterminez si l’effet doit être géré par Houdini, Nuke ou After Effects compositing. Il est également important de déterminer si l’effet doit être rendu en temps réel avec Unreal VFX. Identifiez les hosts connexes, trouvez les outils nécessaires, et proposez le setup le plus simple possible. Gardez les contrôles modifiables, conservez les fichiers sources et les scènes. Ne faites que le rendu si c’est nécessaire, et produisez une prévisualisation. Vérifiez le timing, l’échelle, le espace de couleur, ainsi que les dépendances manquantes. Indiquez également les chemins vers les scènes, les caches et les prévisualisations. Demandez avant de télécharger des assets, d’installer des plugins, ou de lancer un rendu complexe.
```

## Pourquoi utiliser DCC-MCP plutôt que de demander un script ?

Les scripts restent utiles pour des tâches ponctuelles. DCC-MCP permet également de gérer la découverte des données, la vérification des arguments, le routage des demandes, les identifiants des demandes, ainsi que les diagnostics lorsque le même flux de travail doit être répété. Pour les instructions d’utilisation, veuillez consulter [Pour les agents](/fr/agents).
