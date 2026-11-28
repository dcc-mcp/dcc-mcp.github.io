---
title: "Pourquoi DCC-MCP existe"
description: "Découvrez les besoins de production à l’origine de DCC-MCP et les rôles respectifs du noyau, des adaptateurs et des Skills."
---

# Pourquoi DCC-MCP existe

## Qu’est-ce que DCC-MCP ?

DCC-MCP est un ensemble de logiciels open-source qui permet de connecter les agents d’IA aux logiciels de création artistique. Un agent d’IA est un assistant informatique capable d’appeler des outils pour effectuer des tâches spécifiques. DCC signifie création de contenu numérique ; les applications incluses dans DCC-MCP incluent Maya, Blender, Houdini et Photoshop.

Les agents et l’automatisation peuvent utiliser ces outils pour la modélisation, le traitement des matériaux, l’animation et la rendu. Un outil écrit définit ses paramètres, leurs types, ainsi que les résultats obtenus. De cette manière, les résultats peuvent être vérifiés et validés.

Le MCP (Model Context Protocol), les API REST, et `dcc-mcp-cli` partagent une même infrastructure pour la découverte des outils, la validation des données, le choix des instances, les politiques de sécurité, ainsi que la vérification des résultats. Le noyau fournit cette infrastructure partagée ; les adaptateurs permettent de connecter chaque application entre elles, tandis que les Skills fournissent des guides de flux de travail réutilisables.

DCC-MCP est né de l’expérience acquise avec les adapter pour les applications DCC réelles. Les problèmes liés à l’affinité des threads, au choix des instances, à la vie du système, à la découverte des problèmes et aux diagnostics se sont toujours répétés sur différents hôtes. Nous avons ajouté des fonctionnalités de partage des contrats uniquement après que ces problèmes se soient encore produits.

## Commencez par le processus de production.

Un agent utilise le processus qui lui est confié. Il ne définit pas ce processus pour l’équipe.

> Standardiser la production → transformer les normes en processus de travail → présenter ces processus de travail sous forme d’outils → permettre aux agents d’utiliser ces outils.

Il s’agit de définir les critères de nommage, des entrées, des sorties, des vérifications, des responsabilités et des conditions d’acceptation. Ces éléments doivent être reliés en un flux de travail répétable. Ce flux de travail peut ensuite être exploité via une interface de type outil. Le même outil peut être utilisé par des personnes, des scripts, des agents, etc.

## Pourquoi les scripts directs ont-ils cessé de fonctionner correctement ?

Demander à un modèle de écrire et d’exécuter des scripts Python comme `mayapy`, `hython` ou Blender est utile pour l’exploration. Les travaux de production répétés ont révélé les limites suivantes :

- Le modèle génère du code similaire à chaque tour, mais le résultat est différent à chaque fois.
- Les API DCC nécessitent souvent l’exécution dans le flux principal, ainsi que des vérifications de préparation spécifiques à l’application.
- Plusieurs scènes ou instances d’application ouvertes rendent l’objet d’exécution ambigu.
- Les opérations longues nécessitent des étapes de progression, des points de contrôle, ainsi que des phases de récupération.
- Une sortie réussie du processus ne prouve pas que la scène ou le document prévu a été modifié.
- Les erreurs sont difficiles à reproduire, sans l’aide d’entrées tapées manuellement, d’identifiants de demandes, de logs et de traces d’activité.

Ces problèmes se produisaient dans tous les adaptateurs. Par conséquent, ils relevaient d’une infrastructure partagée.

## Des problèmes, et les contrats qu’ils ont mis en place

| Problème récurrent | Ce que nous avons appris | Réponse de DCC-MCP |
| --- | --- | --- |
| Les modèles réécrivent la logique de la tâche à chaque tour. | Les connaissances liées au pipeline devraient pouvoir survivre aux changements de modèles et de prompts. | Compétences versionnées, avec des schémas écrits, des vérifications et des outils réutilisables. |
| Chaque adaptateur reconstruit le code lié au transport et à la vie du système. | Les intégrations avec les hôtes nécessitent un contrat partagé. | L’exécution de base, Gateway, CLI, et les adaptateurs propriétaires des hôtes. |
| Les API DCC comportent des contraintes liées aux threads et à l’état de préparation des ressources. | L’exécution de processus de manière générique ne suffit pas. | Routage des tâches principales, prétention des ressources, routage des instances, et exécution des host. |
| De grands catalogues d’outils consomment beaucoup de temps et rendent la sélection des produits plus difficile. | Les agents doivent se contenter de découvrir ce dont le travail a besoin. | `search -> load/describe -> call` |
| Les opérations créatives peuvent être lentes ou incomplètes. | Un appel nécessite des semantics de cycle de vie, et non seulement une valeur de retour. | Travaux asynchrones, progression, annulation, points de contrôle, et transfert des données. |
| L’utilisation des outils devient alors une sorte de “boîte noire”. | Les équipes de production ont besoin de preuves qu’elles peuvent inspecter. | IDs des demandes, politiques, enregistrements d’audit, logs, traces, métriques, état de santé, et fonctionnalités de répétition. |
| Les outils existants ne fournissent parfois aucune API utilisable. | L’automatisation de l’interface utilisateur est une solution de secours, et non une base fondamentale pour le développement de logiciels. | DCC-CUA / Un contrôle de l'interface utilisateur lié à un processus et une fenêtre spécifiques, avec des opérations limitées à un domaine donné, des vérifications de politiques, et `snapshot -> find -> act -> wait -> verify` |
| Les flux de travail utiles doivent pouvoir se déplacer entre les personnes et les projets. | Un dossier de script n’est pas un modèle de distribution. | Packs sur le marché, références de source immuables, mise à jour rapide, et scopes de projet/équipe. |

## Qui possède quoi ?

Le système sépare les services partagés du comportement spécifique à chaque hôte.

| Lien | Responsabilité |
| --- | --- |
| Interface de l’agent | Les endpoints de MCP et REST, les commandes CLI écrites, les schémas, les ressources, les messages d’information et les résultats structurés. |
| Plan de contrôle | Découverte du réseau, routage des données, vérification des politiques, gestion du cycle de vie des instances, capacité d’observation, et gestion du contexte multi-instance. |
| Temps de exécution : DCC | Déploiement des tâches principales, prétention aux tâches, annulation des tâches, points de contrôle, et exécution sécurisée par l’hôte. |
| Adaptateur | L’installation, la compatibilité, les APIs utilisées par l’hôte, ainsi que le comportement spécifique à chaque application, sont des caractéristiques propres à chaque dépôt DCC. |
| Compétences | Vérification des connaissances relatives au flux de travail, validation des arguments, des étapes du flux de travail, ainsi que des conventions liées au projet ou à l’équipe concernée. |

La [documentation sur l’architecture de base](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture) constitue la source fiable pour les contrats actuels. Les aspects liés à l’installation, à la compatibilité et au dépannage pour chaque hôte restent gérés dans chaque répertoire d’adaptateur.

## CLI, MCP et REST partagent une même implémentation.

Le code de service partagé et le contrat REST/OpenAPI écrit sont les éléments d’implémentation. `dcc-mcp-cli` appelle l’API REST du Gateway. MCP reste simple : `search`, `describe`, `load_skill` et `call` exposent le même flux de travail aux clients qui ne disposent que de MCP. Les deux routes utilisent les mêmes services de découverte, de validation, de routage, de politiques et de appel.

| Consommateurs | Surface préférée | Il est nécessaire d’avoir un agent AI pour cela. |
| --- | --- | --- |
| Artistes, techniciens, opérateurs, scripts shell, et CI | Texte tapé via CLI ou REST | Non. |
| Automatisation des studios et applications personnalisées | Dormir, avec des clients OpenAPI générés. | Non. |
| Des IDE et assistants d’intelligence artificielle qui ne fonctionnent que avec des algorithmes de type MCP. | flux de travail minimal du MCP | Oui. |
| Des cadres de travail intelligents et une orchestration en ligne | Intégration avec REST/OpenAPI ; MCP lorsque l’agent participe à l’opération. | Non. |

Un pipeline peut directement appeler REST, générer des clients à partir de `/v1/openapi.json`, ou utiliser l’interface CLI pour les tâches de développement et d’exploitation. Un agent peut également accéder aux mêmes fonctionnalités via l’interface MCP.

Un service OpenAPI 3.x existant peut également être utilisé comme outil de gestion des données. Il reste un service REST normal, et il n’est pas nécessaire de le reconstruire en fonction des technologies d’intelligence artificielle.

## Utilisez d’abord les protocoles existants.

MCP est le point d’entrée standard pour les agents dans l’industrie. C’est pourquoi DCC-MCP utilise MCP, plutôt que de devoir inventer un protocole privé. REST, Python, C++, HTTP, les ports de commande, les plugins natifs, ainsi que les outils officiels des fournisseurs peuvent tous fonctionner sous le même plan de contrôle.

DCC-MCP ne remplace pas un agent, une API DCC ou une intégration avec un fournisseur. Lorsque un fournisseur propose une fonctionnalité native ou officielle, l’adaptateur conserve son nom et ses schémas. DCC-MCP, quant à lui, assure la gestion partagée des aspects liés à la découverte, au routage, à la sécurité, au cycle de vie, à la distribution et aux diagnostics.

## Connaissances relatives au flux d’information dans le magasin des compétences

Un « Skill » représente un flux de travail testé, qui est considéré comme une capacité distribuable, versionnée et prête à utilisation.

La frontière de propriété est la suivante :

- Les noyaux et les adaptateurs sont responsables de la connectivité, de la sécurité des threads, du routage, des politiques, ainsi que de l’observabilité des données.
- Les TDs et les TAs conservent les fonctions liées à la nomination des projets, aux vérifications des scènes, à la préparation des ressources, aux étapes de publication, aux règles d’exportation, ainsi qu’aux transferts de responsabilités, tout en restant proches de leur code existant.
- Les agents choisissent un outil bien décrit et proposent des arguments valides, plutôt que d’inventer entièrement le processus de travail.

Cela réduit la génération de code répétée, et permet à un studio de distribuer différentes fonctionnalités en fonction du projet, du département ou de la phase de production, sans avoir besoin de modifier le système de contrôle.

## Conserve les preuves de l’échec.

Le diagnostic commence par `request_id`, les outils et arguments utilisés, l’instance DCC sélectionnée, ainsi que le résultat observé. Le Gateway et la CLI permettent d’accéder aux informations relatives à l’état du système, aux logs, aux traces, aux statistiques, et à des informations structurées.

Cela crée un boucle concrète :

1. Il reproduit l’échec envers un hôte réel.
2. Il s’agit de déterminer si Core, un adaptateur, ou une compétence est le propriétaire de cette fonctionnalité.
3. Apportez les ajustements nécessaires à cette limite.
4. Valider le même appel à nouveau.
5. Il convient de conserver les preuves, afin que les prochaines améliorations puissent être basées sur l’expérience, et non sur des suppositions.

## Limites connues

DCC-MCP ne prétend pas que chaque application créative soit identique.

- Les compétences et les API natifs restent préférables par rapport à DCC-CUA/UI Control. En effet, DCC-CUA/UI Control nécessite que l’on relie exactement le processus et la fenêtre correspondantes.
- Core ne possède pas de semantics pour les pipelines spécifiques à chaque hôte.
- Un adaptateur ne peut pas garantir un retour en arrière sécurisé lorsque l’hôte ne fournit aucune API de transaction.
- Les paquets de type Marketplace étendent le cadre de fonctionnement du système ; ils ne cachent pas les défauts liés au Core ou aux adaptateurs.
- Le projet fournit une infrastructure pour les agents. Il ne spécifie pas quel agent ou modèle doit être utilisé.

## Ce qui reste encore à juger, c’est par la volonté humaine.

De nombreuses tâches de production peuvent être standardisées, valides et automatisées. Cependant, les critères esthétiques, la direction artistique, la composition, le timing et le style restent difficiles à exprimer sous forme de contrat stable. DCC-MCP ne prétend pas que l’infrastructure seule suffise pour résoudre ces problèmes.

DCC-MCP gère les parties répétitives et permet aux agents d’accéder de manière contrôlée aux outils nécessaires. Une meilleure perception, raisonnement et capacité de jugement créatif peuvent être utilisés avec les mêmes outils, sans avoir besoin de réinventer chaque intégration DCC.

## Continuez de cette manière.

- [Voyez comment un agent utilise le système.](/fr/agents)
- [Créer un adaptateur, un service autonome, ou une compétence.](/fr/developers)
- [Explorons les adaptateurs et les extensions.](/fr/ecosystem)
- [Lisez la documentation technique de base.](https://dcc-mcp.github.io/dcc-mcp-core/)

## Liens officiels

- [Site web de DCC-MCP](https://dcc-mcp.github.io/fr/)
- [Organisation GitHub](https://github.com/dcc-mcp)
- [Channe YouTube](https://www.youtube.com/@dcc-mcp)
- [Galerie d’exposition](https://dcc-mcp.github.io/showcase/)
