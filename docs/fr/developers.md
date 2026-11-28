---
title: "Développer un adaptateur, un service ou un Skill"
description: "Choisissez une voie de développement et testez localement un service MCP privé, un adaptateur ou un Skill spécialisé."
pageClass: route-page
---

# Développer un adaptateur, un service ou un Skill

Il est nécessaire de choisir le niveau qui possède les fichiers avant de créer des fichiers. DCC-MCP prend en charge des adaptateurs publics, des services privés non liés à DCC, ainsi que des packs de compétences spécifiques. Une simple boîte de fichiers locale ou un arbre de sources interne suffisent.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Service MCP privé ou sur mesure</strong><span>Utilisez dcc-mcp-creator.</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Compétence liée à un flux de travail bien organisé.</strong><span>Utilisez les compétences créatrices.</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>Infrastructure partagée</strong><span>Contribuez à Core.</span></a>
</div>

## Choisissez une voie de développement.

| Votre besoin | Route |
|---|---|
| Connectez Maya, Blender, Unreal ou tout autre processus hôte. | Utilisez `dcc-mcp-creator` pour créer ou améliorer un adaptateur DCC. |
| Expose une API interne, un interface de commande, une base de données d’assets, un centre de rendu ou un service de revue. | Utilisez `dcc-mcp-creator` avec un identifiant de service personnalisé et ``instance_type="standalone"`. Il n’est pas nécessaire d’utiliser de répertoire public pour cela. |
| Ajoutez un flux de travail typé à un adaptateur existant ou à un service autonome. | Utilisez `dcc-mcp-skills-creator`. Ne créez pas d’autre environnement de développement. |
| Changer le routeur, le mode CLI, le protocole, les mesures de sécurité, ou le comportement entre différentes machines. | Veuillez transmettre le contrat partagé à Core. |

Cherchez dans le [dossier de l’écosystème](/fr/ecosystem) avant de créer une adaptateur publique ou une compétence. Les identités de services privés n’ont pas besoin d’une entrée dans le catalogue public.

## Créer un service privé qui ne fait pas partie de la plateforme DCC.

Utilisez cette route pour un système interne qui ne sert pas d’application créative. Il est également possible que ce système ne utilise pas GitHub. Exécutez l’agent de codage depuis le projet privé, puis utilisez ce prompt :

```text
Utilise dcc-mcp-creator pour le service et dcc-mcp-skills-creator pour les fichiers de la Skill. Travaille uniquement dans le projet privé actuel. Reprends son langage, son gestionnaire de paquets, ses tests et ses conventions d’authentification et de déploiement. Ne crée ni dépôt GitHub, ni entrée publique de catalogue, ni ticket externe, ni version publique.

Choisis un processus interne réel et implémente un service minimal avec un identifiant stable et une Skill typée en lecture seule. Utilise DccServerBase et DccServerOptions.from_env(..., instance_type="standalone"), sans dcc_pid. En développement, limite l’écoute à l’interface de bouclage. Exécute directement les opérations sur les services, les fichiers et les API. Ajoute un répartiteur ou une passerelle uniquement pour franchir une frontière de thread ou de processus. Définis des schémas d’entrée et de sortie fermés, les annotations de sécurité, un délai maximal, un exemple d’appel et des erreurs exploitables dont les données sensibles sont masquées. Conserve les identifiants dans le dispositif de gestion des secrets existant.

Lance dcc-mcp-cli lint skills et le test minimal du projet. Démarre le service et affiche son URL /mcp. Avec le MCP Inspector officiel, vérifie tools/list, la recherche et le chargement de la bonne Skill, describe, un appel valide, une erreur de saisie et un arrêt propre. Rejoue le parcours avec les commandes list, load-skill, describe et call de la CLI et l’option --output toon. Note le slug et le request_id renvoyés. Évite les suppositions et les nouvelles tentatives à l’aveugle. Indique les fichiers modifiés, les résultats et les travaux de sécurité et de déploiement restants. Arrête-toi avant toute publication ou modification de l’infrastructure partagée.
```

Vérification nécessaire :

1. Il réutilise donc les conventions de projet existantes.
2. L’identifiant de service personnalisé, ainsi que la raison pour laquelle le runtime est configuré en mode « `standalone` ».
3. Une compétence validée, et une seule communication de type lecture uniquement.
4. Un résultat sûr pour l’entrée invérifiée.
5. Des preuves de démantèlement proprement dédiées, ainsi que le chemin de livraison privé, ont été conservés sans modification.

### Exécutez le service d’exemple.

L’exemple complet se trouve à l’adresse [`examples/remote-server`](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server). Le nom de son répertoire est stable ; l’exemple fonctionne actuellement comme un service autonome, capable de découvrir le répertoire des compétences qui lui sont associées.

```bash
pip install dcc-mcp-core
dcc-mcp-cli lint skills
python server.py
```

L'output attendu lors de l'exécution inclut un URL tel que `http://127.0.0.1:8765/mcp`, l'identité personnalisée `studio-service`, et le mode de fonctionnement `standalone`.

### Utilisez le conteneur de développement.

L’exemple inclut une configuration de [Development Container](https://containers.dev/). Les spécifications et les instructions relatives au CLI sont open source. Ainsi, le même environnement Python, Node.js, Core et Inspector peut être utilisé dans un éditeur compatible ou depuis une console d’agent, sans avoir besoin d’une compte dédié.

Du répertoire de base :

```bash
npm install --global @devcontainers/cli
devcontainer up --workspace-folder examples/remote-server
devcontainer exec --workspace-folder examples/remote-server python server.py
```

Utilisez un deuxième terminal pour l’automatisation de la détection des fumées.

```bash
devcontainer exec --workspace-folder examples/remote-server \
  npx --yes @modelcontextprotocol/inspector@latest --cli \
  http://127.0.0.1:8765/mcp --transport http --method tools/list
```

Le laboratoire fonctionne en tant qu’utilisateur non root. De plus, il ne monte pas le socket du conteneur hôte. Veillez à conserver les informations de connexion confidentielles en dehors de l’image de l’application.

Pour la formation en groupe basée sur des navigateurs, [Educates](https://docs.educates.dev/en/stable/) propose des sessions isolées, des étapes écrites en Markdown, des terminaux, ainsi qu’un éditeur intégré. Il nécessite l’utilisation d’opérateurs compétents en matière de Kubernetes, d’ingress, d’identité, de quotas, d’images, et de nettoyage des sessions. Il est préférable d’utiliser le conteneur de développement local lorsque ces services partagés ne sont pas nécessaires.

### Test avec MCP Inspector

Utilisez l’outil officiel [MCP Inspector](https://github.com/modelcontextprotocol/inspector). Il fonctionne localement, ne nécessite pas d’un compte hébergé, prend en charge le protocole Streamable HTTP, et permet de maintenir un service privé sans accès à Internet public.

```bash
npx --yes @modelcontextprotocol/inspector@latest
```

Connexion à l’URL imprimé `/mcp`. Recherchez `hello-world`, chargez-le, puis appelez `hello_world__greet` en utilisant le paramètre `{"name":"Agent"}`. Envoie également un nom vide, et vérifiez que la réponse correspond à une erreur de validation structurée.

::: warning Pourquoi utiliser un inspecteur local ?
Un espace de jeu hébergé ne peut pas accéder à un service MCP en mode loopback ou sur une intranet, sans que cela ne représente un risque. Pour les systèmes internes, l’utilisation de l’inspecteur open-source local est la meilleure solution. Il ne faut jamais exposer le proxy qui crée des processus dans un réseau non fiable.
:::

### Vérifier via l’interface CLI.

Utilisez la CLI après que le service se sera enregistré. Gardez le nom de l’élément retourné par la recherche.

```bash
dcc-mcp-cli list --output toon
dcc-mcp-cli load-skill hello-world --dcc-type studio-service --output toon
dcc-mcp-cli describe <tool-slug-returned-by-load> --output toon
dcc-mcp-cli call <tool-slug-returned-by-load> --json '{"name":"Agent"}' --wait --output toon
```

## Changer une compétence, sans avoir besoin d’ajouter de logiciel de déploiement.

Utilisez cette instruction lorsque le runtime existe déjà.

```text
Utilise dcc-mcp-skills-creator dans le projet privé actuel. Recherche d’abord les Skills existantes, puis ajoute ou améliore celle qui prend en charge ce processus. Ne crée aucun adaptateur, service, dépôt ou paquet public. Dans SKILL.md, sous metadata.dcc-mcp.*, déclare les schémas typés, les annotations de sécurité, affinity, timeout, call_examples et next-tools. Implémente un seul script de portée limitée en réutilisant dcc_mcp_core.skills_helper lorsque cela convient. Lance dcc-mcp-cli lint sur le répertoire installable et charge la Skill dans le service existant. Teste un appel valide et une entrée invalide, puis présente les résultats. Demande mon accord avant de publier.
```

Utilisez cette séquence : **recherche de la propriété existante → élagage ou modification des données → vérification des erreurs → réchargement des données → chargement des données → description des données → appel des fonctions → diagnostic des problèmes**.

## Déboguer sans deviner

| Symptôme | Vérification suivante |
|---|---|
| La validation des compétences échoue. | Il est nécessaire de résoudre le problème spécifique lié à `dcc-mcp-cli lint` avant de démarrer l’exécution du programme. |
| Le service ne répond pas. | Vérifiez l’URL imprimée. Ensuite, tentez les requêtes suivantes : `GET /v1/healthz` et `GET /v1/readyz`. |
| Il manque des compétences nécessaires. | Vérifiez le chemin parent, exécutez `reload-skills`, puis recherchez à nouveau. |
| L’outil est absent. | Lire la compétence qui possède cette information, puis suivre le “`next_step`” renvoyé par cette compétence. |
| L'appel échoue. | Gardez `request_id`, exécutez `dcc-mcp-cli doctor` et analysez les statistiques liées aux échecs. Ensuite, corrigez le niveau de gestion de l’élément responsable de l’échec. |
| La dépendance privée n’est pas disponible. | Rapportez l’identité de l’auteur interne et les preuves modifiées ; ne lancez pas de publication publique. |

## Passer d’un succès local à une livraison privée.

Continuer le développement sur le réseau local. L’exposition à l’intranet nécessite une authentification basée sur TLS, des listes d’autorisations pour le réseau/origine, une gestion des secrets, la conservation des données après l’audit, ainsi que la possibilité de mettre en service ou de désactiver le système. Il est possible de réutiliser les outils existants du projet : les archives, les conteneurs, le registre privé, ou encore le système de déploiement interne. GitHub est une option disponible.

Lisez la suite :

- [Flot de travail interne autonome du service](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/INTERNAL_SERVICE_WORKFLOW.md)
- [Exemple d’utilisation des dev containers ouverts](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server/.devcontainer)
- [Adaptation et flux de travail des services](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/ADAPTER_WORKFLOW.md)
- [Système de compétences](https://dcc-mcp.github.io/dcc-mcp-core/guide/skills)
- [Domaines de compétence et politiques](https://dcc-mcp.github.io/dcc-mcp-core/guide/skill-scopes-policies)
- [Déploiement à distance](https://dcc-mcp.github.io/dcc-mcp-core/guide/remote-server)
- [Architecture centrale](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture)
