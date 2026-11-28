---
title: "Installer l’agent et vérifier la première connexion"
description: "Installez le Skill dcc-mcp, vérifiez la connexion au logiciel et consultez les paramètres des outils. Retrouvez la procédure de diagnostic d’un appel en échec."
pageClass: route-page
---

# Installer l’agent et vérifier la première connexion

La [Skill publique `dcc-mcp`](https://github.com/dcc-mcp/dcc-mcp-agent-plugins/tree/main/plugins/dcc-mcp/skills/dcc-mcp) décrit la procédure suivie par l’agent. Avec `dcc-mcp-cli`, vous pouvez vérifier le Gateway, rechercher des outils, effectuer des appels typés, diagnostiquer un échec, mettre à jour les composants et installer des paquets du catalogue.

La première connexion nécessite la CLI, le Gateway et l’adaptateur de l’application choisie. Consultez le [guide de démarrage](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started) pour vérifier les composants déjà présents et installer ceux qui manquent.

Exécutez la commande suivante dans l’espace de travail de Codex, Claude Code, Gemini CLI, GitHub Copilot, Cursor, Windsurf, OpenCode, Cline, Roo Code, Kiro CLI, Amp ou d’un autre agent compatible avec Agent Skills.

```bash
npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

Utilisez la option `--global` pour une installation au niveau de l’utilisateur. Démarrez une nouvelle session d’agent si l’hôte ne découvre les compétences que lors du démarrage.

La section d’installation de la page d’accueil propose le même choix de commandes pour les outils suivants : Codex, Claude Code, Cursor, Gemini CLI, GitHub Copilot, Windsurf, OpenCode, Cline, Roo Code, Kiro, Amp, CodeBuddy, OpenHands, Continue, Replit, OpenClaw et WorkBuddy.

Le paquet npm est optionnel. Il peut être utilisé lorsque les fournisseurs de services d’un hôte ou d’une équipe ont des compétences spécifiques, par exemple via `node_modules`. Cela est particulièrement utile dans des environnements gérés par des paquets ou en mode hors ligne.

```bash
npm install @dcc-mcp/skills
```

## Marchés de plugins natifs

Utilisez un marché native lorsque Codex ou Claude Code le proposent. Ces commandes installent la même version canonique de `dcc-mcp`, provenant du dépôt [`dcc-mcp-agent-plugins`](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#install).

### Codex

```bash
codex plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins
codex plugin add dcc-mcp@dcc-mcp
```

### Claude Code

```text
/plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins
/plugin install dcc-mcp@dcc-mcp
```

D’autres options d’installation de plugins et de registre sont également documentées dans le dépôt officiel.

## Vérifier la première connexion

```text
Connecte-toi à Blender. Indique le nom du fichier de la scène ouverte, les noms de ses collections et le nombre d’objets. Laisse la scène intacte et précise l’instance et l’outil utilisés.
```

## Agents en nuage et DCC-MCP

Pour plus d’informations sur les interfaces de la plateforme, l’inventaire du logiciel en nuage, ainsi que les données relatives aux workflows versionnés, veuillez consulter [Cloud agents and DCC-MCP](/fr/cloud-agents). Un agent shell peut utiliser la CLI et le Gateway HTTP. Toute application, adaptateur ou workflow doit être validé dans l’environnement cible. Il est conseillé de maintenir les services DCC sur un réseau local, et d’utiliser TLS et l’authentification pour faciliter l’accès entre différents réseaux. Le plugin ne comprend pas le logiciel DCC cible ni ses licences.

## Maintenez que les compétences et le CLI soient à jour.

Utilisez l’outil de mise à jour qui correspond à chaque installation. Les compétences installées via GitHub utilisent le fichier de verrouillage `skills`.

```bash
# Update managed copies in this workspace.
npx --yes skills@1.5.23 update -p -y

# Update managed user-level copies.
npx --yes skills@1.5.23 update -g -y
```

Vérifiez le DCC-MCP CLI séparément. Ensuite, appliquez l’update validé uniquement avec le consentement des parties concernées.

```bash
dcc-mcp-cli update check
dcc-mcp-cli update apply
```

OpenClaw et les installations directes de ClawHub utilisent leurs propres sources de données enregistrées, ainsi que des commandes pour mettre à jour ces informations. Veuillez consulter la section [Mettre à jour les compétences installées](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#keep-installed-skills-current). Ne pas utiliser le paramètre `--force` pour les mises à jour automatiques ; les compétences mémorisées ou modifiées localement doivent être arrêtées afin d’être revues.

## Utilisez une brève invitation.

La compétence implique également la manière de procéder. Par conséquent, le message doit seulement indiquer l’objectif de l’action et les limites de sécurité qui y sont associées.

```text
Utilisez la compétence dcc-mcp pour <décrire la tâche DCC>. Demandez avant de mettre en place ou de changer l’état du système. Terminez en fournissant des preuves de la réussite de votre travail.
```

## Installez uniquement les compétences dont vous avez besoin.

| Intention | Compétences |
| --- | --- |
| Opérez un DCC en temps réel, découvrez des outils, ou recherchez des extensions. | `dcc-mcp` |
| Créer ou moderniser un adaptateur/run-time complet. | `dcc-mcp-creator` |
| Créer ou améliorer un paquet de compétences spécifique à DCC. | `dcc-mcp-skills-creator` |

Remplacez la valeur `--skill` dans la commande universelle uniquement lorsque la tâche correspond à l’une des deux routes de développement.

## Chercher, décrire, et appeler.

```bash
# Confirm the gateway and connected hosts.
dcc-mcp-cli health
dcc-mcp-cli list

# Search narrowly, then follow the returned next_step.
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# Execute the returned tool slug with validated arguments.
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

Ne devriez pas deviner les noms des outils, ni charger tous les schémas backends. Effectuez d’abord une recherche, puis procédez à l’opération `load` ou `describe` indiquée dans `next_step`.

## Utilisez l’identifiant de la demande avant de réessayer.

Gardez le `request_id` provenant d’une appelée échouée. Utilisez la méthode intégrée de la CLI pour obtenir les informations nécessaires.

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

Vous pouvez ensuite découvrir le fichier `dcc_feedback__report` grâce au même processus de recherche. Consultez et supprimez les informations contenues dans le rapport avant de le partager. La création d’une issue externée nécessite toujours l’autorisation de l’utilisateur.

## Référence

- [Bases de la mise en œuvre](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started)
- [Référence CLI](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)
- [Référence à l’agent](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [Diagnostic de Gateway](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [Marché](/fr/marketplace)
- [Instructions pour la présentation des produits](/fr/examples)
- [Tâches courantes liées à l’intelligence artificielle et au développement de logiciels.](/fr/use-cases)
- [Explorer l’écosystème](/fr/ecosystem)
