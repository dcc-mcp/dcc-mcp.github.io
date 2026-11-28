---
title: "Agents dans le cloud et DCC-MCP"
description: "Comparez les interfaces, les essais datés et les prérequis avant de choisir une machine dans le cloud ou un poste de travail."
pageClass: route-page
---

# Agents dans le cloud et DCC-MCP

Choisissez un flux de travail basé sur des clouds ou des postes de travail, en tenant compte des tests effectués avec des logiciels anciens, des interfaces de plateforme, des conditions préalables à l’installation, ainsi que des limites liées à la mise en œuvre.

DCC-MCP permet de connecter un agent d’IA à des applications créatives, grâce à des outils de saisie de texte, au MCP, et à `dcc-mcp-cli`. Un agent en nuage peut examiner un document, effectuer des modifications limitées, exporter des ressources, et vérifier le résultat, à condition que son environnement dispose de l’application nécessaire, d’un adaptateur fonctionnel, et d’une connexion autorisée. Un agent capable de se connecter via une interface de ligne de commande peut utiliser la CLI et le portail HTTP, sans avoir besoin d’une interface de configuration du MCP.

Cet guide traite des concepts tels que **OpenAI Dots**, **Grok Bot**, **Meta Muse** (l’agent personnel), et **Manus Cue**. Les documents relatifs aux plateformes sont conservés séparément des tests, dans un ordinateur doté de capacités de traitement de données. Lightbox est donc le contexte de développement et de déploiement des applications ; DCC-MCP s’occupe de l’intégration des applications entre elles. Les résultats obtenus à partir de cet ordinateur ne garantissent pas un soutien uniforme pour toutes les comptes, les images ou les plateformes concernées. Il s’agit donc d’intégrations indépendantes, sans aucune implication en matière de partenariat avec les plateformes concernées.

## Niveaux d’evidence {#evidence-levels}

Les données examinées datent du **2026-10-01 UTC**. Une application installée, une entrée dans le catalogue des commandes CLI, et une appel à l’outil MCP fonctionnel constituent des observations distinctes.

| Lable | Ce que les preuves démontrent |
| --- | --- |
| **MCP testé** | Un adaptateur et une connexion spécifiques ont mis en œuvre un flux de travail nommé dans l’environnement indiqué. Les versions expérimentales et les correctifs non publiés restent explicites. |
| Seulement en langue native. | L’application a produit un artefact, ou a réussi à passer une petite vérification via son propre CLI/API. Cela ne signifie pas pour autant que l’application est acceptée par DCC-MCP. |
| L’interface officielle est disponible ; DCC n’a pas été testé. | La documentation de la plateforme décrit une interface qui pourrait être utilisée pour intégrer des fonctionnalités diverses. Il s’agit donc d’une évaluation de la faisabilité, et non d’un flux de travail DCC véritablement testé. |
| **Non confirmé** | L’interface ou le comportement de l’application nécessaire n’a pas encore été mis en place. |

Un flux de travail MCP incomplète ou rejeté est considéré comme un défaut, même si un fichier intermédiaire a été créé. Les dépôts d’adaptateurs sont responsables de l’installation et de la prise en charge de la version du logiciel ; cette page résume les informations relatives au flux de travail en cloud.

## Interfaces de plateforme {#platform-interfaces}

| Plateforme et environnement | Interface officielle et itinéraire possible | Logiciel / adaptateur / preuves liées au flux de travail | Non confirmé ou non testé |
| --- | --- | --- | --- |
| Les **OpenAI Dots** peuvent être stockés sur un ordinateur cloud, ou bien sur un ordinateur personnel autorisé. | Ordinateur en nuage, navigateur, fichiers et applications ; plugins, ainsi que les tâches personnelles autorisées sur l’ordinateur. Voir [Ordinateurs et applications](https://learn.chatgpt.com/docs/dots/computers-and-apps) et [Plugins](https://learn.chatgpt.com/docs/plugins). | Le ordinateur Linux dispose de tests logiciels natifs, ainsi que d’expériences avec des adaptateurs limités dans leurs capacités. Les versions des adaptateurs et les routes utilisées sont enregistrées pour chaque ligne de programme correspondante. | Les documents ne précisent pas de système d’exploitation cloud universel, ni la compatibilité avec l’inventaire DCC ou les adaptateurs. Pour effectuer des tâches liées aux ordinateurs personnels, il est nécessaire que l’ordinateur connecté soit en ligne et que son application ChatGPT soit ouverte. |
| Grok Bot héberge des ordinateurs Linux. | [Outils informatiques, shell et bureau](https://docs.x.ai/grok-bot/computer-and-apps); [Identité/accès sous Linux](https://docs.x.ai/grok-bot/identity-and-access); [Commandes personnalisées pour le MCP Remote HTTPS](https://docs.x.ai/grok-bot/team-bots#plugins). Le mode CLI + HTTP constitue une possibilité pour la configuration du shell. | L’interface officielle est disponible ; le fonctionnement de DCC n’a pas été testé. Version logicielle : non testée. Adaptateur : non testé non plus. Aucun processus de travail lié à DCC n’a été effectué ici. | Le support de MCP ne vérifie pas la connexion standard DCC. Les restrictions liées aux commandes secrètes et la visibilité du groupe s’appliquent également. L’accès distant nécessite une communication protégée via TLS/Auth au niveau du réseau. |
| **Meta Muse**, machine virtuelle Linux avec agent personnel | [Agent personnel de Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) et [ses connexions au runtime Debian, ainsi que ses API/CLI](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse). Une intégration via CLI/API est une voie possible, d’après ces interfaces. | L’interface officielle est disponible ; le fonctionnement de DCC n’a pas été testé. Version logicielle : non testée. Adaptateur : non testé non plus. Aucun processus de travail lié à DCC n’a été effectué ici. | Les compétences en langage MCP, ainsi que les capacités de contrôle graphique et d’installation de logiciels, ne sont pas confirmées par ces sources. Muse Code est un produit distinct. Les permissions liées au temps de exécution et aux connexions restent valables. |
| **Manus Cue**, application indépendante de type agent personnel | [La section “Cue” dans Introducing Manus 2.0 décrit une application mobile/desktop indépendante et l’ordinateur personnel de chaque agent.](https://manus.im/blog/introducing-manus-2-0) | **Non confirmé.** OS/Logiciel : non confirmé. Adaptateur/connexion : pas testé. Aucun processus de travail basé sur la communication entre véhicules n’a été effectué ici. | Pour Cue, la disponibilité d’un shell, de MCP, de connecteurs personnalisés ou de logiciels de création installés à la demande reste à confirmer. Les fonctions de Manus Studio ne permettent pas de conclure pour Cue. |

## Inventaire informatique en ligne {#cloud-software-inventory}

L’ordinateur cloud concerné était équipé de **Debian 13.6, x86_64**, avec une interface graphique fonctionnelle. Le fait que le champ `DISPLAY` soit vide ne signifie pas pour autant que l’écran de bureau n’était pas disponible. Il s’agit donc d’un inventaire obsolète de cet ordinateur, et non d’une garantie concernant les fonctionnalités préinstallées. Dans ces vérifications d’inventaire, aucun adaptateur n’a été utilisé ; l’environnement initial ne contenait aucun paquet DCC-MCP.

| Version de la plateforme/du logiciel | Adaptateur/connexion utilisé | flux de travail natif et preuves correspondantes | Limites restantes |
| --- | --- | --- | --- |
| Points de Debian 13.6 x86_64 / Inkscape **1.4** | Aucun / Interface clé native et interface graphique gérée | Recherche SVG et export en PNG ; un interface graphique est disponible. **Seulement nativement.** | L’action d’extension native et le flux de travail de production DCC-MCP nécessitent des vérifications distinctes. |
| Points de Debian 13.6 x86_64 / FreeCAD **1.0.0** | Aucun / système Python + Part API | Des artefacts en format FCStd et STEP ont été créés. **Seulement pour les systèmes natifs.** | Un environnement contaminé est détruit ; un environnement propre permet à l’exécution de reprendre. La validation des résultats de l’adaptateur est une vérification distincte. |
| Points de Debian 13.6 x86_64 / GIMP **3.0.4** | Aucune API de traitement par lot native. | Création de documents par lot. **Seulement nativement.** | L’adaptation lors du démarrage, les appels aux outils, ainsi que l’acceptation des données exportées/redéveloppées ne sont pas testés. |
| Points de Debian 13.6 x86_64 / OpenSCAD **2021.01** | Aucun / natif de CLI | STL généré. **Seulement native.** | L’acceptation de l’adaptateur est distincte de la fonction de rendu en ligne de commande. |
| Points de Debian 13.6 x86_64 / Blender **4.3.2** | Pas de contexte de exécution pour les natifs. | Mélange sauvegardé, fichier GLB exporté, et rendu du CPU terminé, avec le débruitement désactivé. **Seulement le format natif.** | Le niveau du sol sous le support de l’adaptateur est de **4,5** ; OIDN et Draco ne sont pas disponibles. Cela ne concerne pas les versions de Blender qui sont compatibles avec cet adaptateur. |
| Points de Debian 13.6 x86_64 / Godot **4.6.3** | Aucun / CLI natif sans tête | Exécution sans tête. **Seulement nativement.** | Les processus d’édition et de mise en forme ne sont pas testés. |
| Points de Debian 13.6 x86_64 / FFmpeg **7.1.5** | Aucun / natif de CLI | Produit en format MP4. **Seul le format natif est utilisé.** | Pas de adaptateur DCC-MCP testé. |
| Points, Debian 13.6 x86_64 / ImageMagick (**version non enregistrée**) | Aucun / natif de CLI | Produit en PNG. **Seulement en format natif.** | Enregistrez la version avant de prétendre que le flux de travail de l’adaptateur est reproductible. |
| Points de Debian 13.6 x86_64 / CadQuery **2.7** | Aucun / API Python | Petite vérification de l’API. **Seulement native.** | Le flux de travail lié à la modélisation complète, à l’exportation des données et à l’utilisation de l’adaptateur n’a pas encore été testé. |
| Points de Debian 13.6 x86_64 / KiCad **9.0.2** | Aucun / API Python | Petite vérification de l’API. **Seulement native.** | Le flux de travail lié à l’édition/exportation des PCB et à l’utilisation de l’adaptateur n’a pas été testé. |
| Points de Debian 13.6 x86_64 / ParaView **5.13.2** | Aucun / API Python | Petite vérification de l’API. **Seulement native.** | Le flux de travail lié à la visualisation/exportation et à l’adaptation n’a pas été testé. |
| Points de Debian 13.6 x86_64 / QGIS **3.40.6** | Aucun / API Python | Petite vérification de l’API. **Seulement native.** | Le flux de travail lié au projet/exportation, ainsi que celui lié à l’adaptateur, n’a pas été testé. |
| Points de Debian 13.6 x86_64 / LibreOfficeDev **26.8 alpha** | Aucun / natif de CLI | Expérience de conversion DOCX en PDF. **Seulement native ; expérimentale.** | Version Alpha ; aucune garantie de production ou d’acceptation par les adapter. |
| Points de Debian 13.6 x86_64 / Kdenlive **24.12.3** | Aucune / version / aide CLI | Executable a répondu à la demande de version/help. **Non confirmé** pour le rendu. | Aucun workflow de rendu ou d’adaptation n’a été testé. |
| Points de Debian 13.6 x86_64 / Slicer (**version non déterminée**) | Aucun / point d’entrée pour l’application | Point d’entrée trouvé ; l’essai sans tête a échoué. **Non confirmé.** | L’exécution native et l’intégration avec l’adaptateur restent problématiques. |

## Tests Cloud MCP {#cloud-mcp-tests}

Les expériences suivantes ont été bloquées par le travailleur chargé des tests sur le cloud, à l’heure **2026-10-01 UTC** : deux boucles de MCP ont été résolues après des corrections locales ; un essai de compatibilité avec Blender n’a pas pu être réalisé en raison d’un problème de support ; quant à l’un des flux de travail produits avec Inkscape, celui-ci est toujours bloqué. Les builds du site web et les vérifications effectuées dans le navigateur sur le PC8 font l’objet d’une documentation distincte. Ces résultats ne constituent pas une certification de support générale. Le [résumé des preuves publiques](/cloud-evidence/2026-10-01.json) contient les résultats obtenus ainsi que les identités des corrections apportées ; il ne contient aucun fichier contenant des données confidentielles, ni de liens de téléchargement privés.

| Plateforme / Logiciel | Adaptateur / libération ou source / connexion | Flus de travail et preuves observées | Non testé ou bloqué |
| --- | --- | --- | --- |
| dots / Debian 13.6 x86_64 / Blender **4.3.2** | `dcc-mcp-blender` a été publié à la version **0.2.12**. La version principale est **0.20.39** / le vrai MCP. | Initialisation, liste/chargement des données, création de nouvelles scènes, création d’objets, sauvegarde des données, nettoyage de la scène, réouverture de la scène, inspection de la scène, et exportation en format GLB. **MCP testé ; expérience de compatibilité.** | En dessous de [l’interface officielle de support de Blender 4.5](https://github.com/dcc-mcp/dcc-mcp-blender). Les scripts arbitraires sont désactivés ; Draco les a explicitement désactivés. Le support complet de Blender 4.3 n’est pas assuré, ni l’interface utilisateur, ni la capacité de rendu via le MCP. |
| dots / Debian 13.6 x86_64 / FreeCAD **1.0.0** | [`dcc-mcp-freecad`](https://github.com/dcc-mcp/dcc-mcp-freecad) / patch local non publié : `f761672f62ab8d0d1ae3d77a6379249e307eeff1` / Version réelle de MCP + Core : **0.20.39** | Créer, enregistrer, réouvrir, exporter, et effectuer une rélecture indépendante des données, après avoir corrigé le problème de concordance entre les valeurs “`verified`” listées dans la liste et les résultats booléens du Core. **MCP a été testé avec un patch local.** 138 tests ont été réussis, y compris 3 tests réels sur le hôte réel, ainsi que des tests avec Ruff. | Le patch n’a pas été publié ; il n’y a donc aucune version disponible pour être téléchargée. Un simple écriture native réussie n’a pas suffi pour valider l’opération MCP avant que la correction ne soit apportée. Le commit local constitue donc une preuve de l’existence du patch, mais ce n’est pas une version publiée officiellement. |
| dots / Debian 13.6 x86_64 / Inkscape **1.4** | [`dcc-mcp-inkscape`](https://github.com/dcc-mcp/dcc-mcp-inkscape) / Source : `9769234` / Découverte des fonctionnalités MCP ; Interface utilisateur intégrée, avec des dépendances temporaires de `inkex` pour l’exécution native. | Les découvertes et les capacités étaient lisibles. L’exécution sans tête ne disposait pas de l’extension native correspondante. La génération de l’interface graphique se faisait en utilisant des fichiers SVG natifs. Cependant, la validation de l’origine des fichiers liés au processus parent PID 1 via GLib de Linux a échoué. Le flux de travail de production de MCP est donc incomplète. | Il y a un manque de cohérence dans l’intégration du code source Linux ; il ne faut donc pas relâcher les contrôles de provenance, ni prétendre que le produit est accepté. Le processus intermédiaire SVG ne permet pas de réaliser une tâche de production correcte. |
| dots / Debian 13.6 x86_64 / OpenSCAD **2021.01** | [`dcc-mcp-openscad`](https://github.com/dcc-mcp/dcc-mcp-openscad) – Base **0.2.1** + patch local non publié : `799fc2af97d13365613545347e4d4817e9f75b48` / MCP réel + Core **0.20.39** | Découverte de la version, réouverture/inspection de la nouvelle session, compilation des paramètres, exportation en format binaire/ASCII, ainsi que la lecture des données après le passage de l’étape “`verified`”. Les données recueillies indiquent que l’on dispose de **12 triangles, 7200 mm³** de données. Les vérifications de sécurité ont été réussies. Le **MCP a été testé avec un patch local**. 129 tests unitaires ont été réussis, 4 tests uniquement pour Windows ont été omis ; 2 tests natifs ont également été réussis. | Le patch n’a pas été publié. Le fichier PNG a échoué en raison de l’emplacement de DISPLAY/OpenGL. Le code source de SCAD a été créé sous forme de texte local. L’adaptateur ne dispose pas d’une API permettant la modélisation, donc il s’agit là d’une modélisation à partir de zéro, via MCP. |

## Choisissez une connexion. {#choose-a-connection}

1. **Application dans l’ordinateur cloud de l’agent:** Utilisez un adaptateur local compatible, ainsi que la CLI ou le client MCP de l’environnement. Vérifiez d’abord les versions exactes de l’application et de l’adaptateur. Les API natifs sont utiles pour découvrir des candidats pour une intégration ; ensuite, il convient d’utiliser les adaptateurs de type typé.
2. **Application sur une station de travail autorisée :** Il est nécessaire de mettre l’endroit DCC en mode loopback, et de se connecter via une connexion informatique approuvée ou un gateway protégé. L’agent cloud doit avoir accès aux chemins de fichiers concernés par le projet. De plus, la station de travail doit rester disponible.
3. **Agent capable de fonctionner sous Shell:** Utilisez `dcc-mcp-cli` pour effectuer l’inventaire, pour limiter la découverte des outils et pour effectuer les appels nécessaires. Une interface de configuration native de MCP est optionnelle. La commande MCP et l’interface CLI sont des interfaces distinctes. Les ponts `translate` de Core transmettent les données via `stdio → HTTP`. Le support des commandes par le client ne permet pas de mettre en œuvre un flux de travail basé sur DCC.

Pour une connexion entre réseaux, configurez **TLS et l’authentification sur un proxy frontal ou une passerelle OAuth dédiée**. Restreignez l’accès et limitez le DCC à l’interface de bouclage. Selon le [contrat d’authentification de Core 0.20.39](https://github.com/dcc-mcp/dcc-mcp-core/blob/v0.20.39/docs/guide/remote-server.md#auth), le contrôle Bearer/OAuth/CIMD de chaque requête dans `McpHttpServer` est encore à l’état de projet. `ApiKeyConfig` et `OAuthConfig` ne protègent pas à eux seuls le service en fonctionnement. N’exposez pas un point d’accès ordinaire comme service public authentifié.

## Prérequisitions pour l’installation {#prerequisites}

- Autorisation d’installer ou de mettre à jour le logiciel dans l’environnement choisi ; une application cible disponible, ainsi que toutes les licences nécessaires. Un plugin DCC-MCP ne comprend pas l’application elle-même, sa licence, ni un endpoint public multi-tenant.
- Il s’agit d’une version d’application qui se trouve dans la plage de support de l’adaptateur concerné. Elle nécessite des bibliothèques natives, ainsi qu’un adaptateur officiel vérifié ou un patch source explicitement enregistré.
- Une connexion CLI/MCP compatible, une instance en ligne prête à l’utilisation, ainsi qu’un dossier de projet autorisé. Les outils dépendant du GUI nécessitent également le service de bureau géré par la plateforme, ou un service de visualisation pris en charge.
- Pour une utilisation à distance, il est nécessaire d’avoir une infrastructure TLS/auth disponible et approuvée, ainsi que des secrets gérés par l’opérateur. Ce guide ne prévoit pas la configuration d’un point de terminaison public ou la fourniture de credences.

Suivez les instructions pour la configuration du [agent partagé](/fr/agents) et le [dossier des adaptateurs](/fr/ecosystem). Les instructions d’installation et les solutions aux problèmes liés aux différents hôtes se trouvent dans le répertoire des adaptateurs.

## Un flux de travail avec vérification {#verified-workflow}

On commence par un document dédié à une tâche donnée, ainsi qu’une opération liée à cette tâche. Par exemple, examiner une pièce CAO, effectuer un changement de dimensions, la sauvegarder, la réouvrir et vérifier les dimensions avant d’ exporter le fichier en format STEP. C’est un modèle de validation : la matrice ci-dessus indique les expériences qui ont effectivement été réussies.

```bash
# After approved setup, inspect the current environment and live instances.
dcc-mcp-cli doctor
dcc-mcp-cli list

# Only continue when a ready instance for the intended application exists.
dcc-mcp-cli search --query "inspect document" --dcc-type freecad

# Follow the returned next_step and exact schema; do not invent a tool slug.
```

Arrêtez l’exécution de l’application si le stock est vide ou si l’instance n’est pas prête. Conservez les versions de l’application, de l’adaptateur et du noyau, ainsi que les routes de connexion, les commits source pour les correctifs, les IDs des demandes/jobs et les vérifications des artefacts. Il est nécessaire de vérifier le résultat de la sauvegarde ou de l’exportation en ouvrant à nouveau le document natif ou en inspectant les résultats de manière indépendante. Conservez l’ID du job qui a échoué avant de essayer de le corriger ; ne répète pas aveuglément une mutation.

```text
Utilisez l’outil dcc-mcp pour examiner le document concerné dans l’ordinateur cloud ou la station de travail autorisée. Vérifiez les versions et l’état du document. Utilisez des outils prévus à cet effet pour effectuer des modifications limitées. Sauvegardez et réouvrez le résultat obtenu. Vérifiez également l’artefact exporté. Informez-vous avant d’installer de nouveaux logiciels ou de modifier l’état du système. Indiquez également la route de connexion, les preuves disponibles et les limites restantes.
```

## Réponses fréquentes {#faq}

### Est-ce que cela signifie que les quatre plateformes supportent tous les protocoles DCC ?

Non. Les interfaces avec les plateformes, le logiciel installé et l’acceptation des adaptateurs sont des éléments distincts. Grok Bot et Muse ont documenté les méthodes d’intégration, mais aucun test de DCC n’a été effectué. Les interfaces requises par Cue ne sont pas encore confirmées. Même un test de passage ne s’applique qu’aux versions enregistrées de Cue et au flux de travail associé.

### Est-il possible d’utiliser DCC-MCP sans une interface de configuration native pour le MCP ?

Oui, lorsque l’agent autorise l’accès à la shell, il est nécessaire que `dcc-mcp-cli` fonctionne correctement, et qu’il y ait un routeur local ou un port HTTP accessible. Il faut également s’assurer que la plateforme permet les opérations de déploiement et de connexion requises. Une shell seule ne suffit pas pour installer ou licencier l’application.

### Pourquoi la exécution native peut-elle réussir, tandis que le MCP échoue ?

Un commande native peut créer un fichier, même lorsque les actions de l’adaptateur, la validation des résultats, le suivi des tâches ou les vérifications de l’origine des données échouent. FreeCAD et Inkscape mettent en évidence ces différentes limites. Considérez l’échec de l’adaptateur comme non résolu jusqu’à ce que le flux de travail et les données soient tous deux validés.

### Un agent de type nuage peut-il fonctionner avec mon ordinateur de bureau équipé de DCC ?

Une connexion autorisée avec un ordinateur personnel, ou un portail protégé, peut offrir cette solution. Veuillez vérifier l’accès possible, les versions supportées, les chemins de communication, la disponibilité du poste de travail, ainsi que les conditions de licenciement avec l’opérateur concerné. Les documents de la plateforme ne garantissent pas que chaque ordinateur de bureau soit compatible avec cette solution.

### Cette page garantit-elle une visibilité pour les recherches effectuées avec l’AI ?

Non. [Les directives de recherche de l’IA de Google](https://developers.google.com/search/docs/appearance/ai-features) exigent que le contenu soit normal, facile à découvrir et à lire, et que les données structurées soient visibles. Il n’est pas nécessaire d’utiliser de fichiers ou de schémas spéciaux liés à l’IA. De plus, ces directives ne garantissent aucune indexation ou affichage du contenu. [La documentation du robot de recherche d’OpenAI](https://developers.openai.com/api/docs/bots) distingue clairement le processus de recherche des processus de formation des modèles de recherche. Cette directive respecte les politiques de recherche existantes du site.
