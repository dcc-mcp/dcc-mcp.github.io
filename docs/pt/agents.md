---
title: "Instalação e primeira conexão do agente"
description: "Instale a Skill dcc-mcp, verifique a conexão com o aplicativo e consulte os argumentos das ferramentas. Saiba como diagnosticar falhas nas chamadas."
pageClass: route-page
---

# Instalação e primeira conexão do agente

A [Skill pública `dcc-mcp`](https://github.com/dcc-mcp/dcc-mcp-agent-plugins/tree/main/plugins/dcc-mcp/skills/dcc-mcp) descreve o procedimento seguido pelo agente. Com `dcc-mcp-cli`, você pode conferir o Gateway, encontrar ferramentas, fazer chamadas tipadas, diagnosticar falhas, atualizar componentes e instalar pacotes do Marketplace.

A primeira conexão exige a CLI, o Gateway e o adaptador do aplicativo escolhido. Siga o [guia de início rápido](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started) para verificar os componentes instalados e adicionar os que faltam.

Execute o comando a seguir no espaço de trabalho do Codex, Claude Code, Gemini CLI, GitHub Copilot, Cursor, Windsurf, OpenCode, Cline, Roo Code, Kiro CLI, Amp ou de outro agente compatível com Agent Skills.

```bash
npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

Use o parâmetro `--global` para realizar a instalação em nível de usuário. Inicie uma nova sessão do agente, caso o host descubra as habilidades apenas durante o início do processo de instalação.

A seção de instalação da página inicial possui o mesmo seletor de comandos para os seguintes recursos: Codex, Claude Code, Cursor, Gemini CLI, GitHub Copilot, Windsurf, OpenCode, Cline, Roo Code, Kiro, Amp, CodeBuddy, OpenHands, Continue, Replit, OpenClaw e WorkBuddy.

O pacote npm é opcional. Você pode utilizá-lo quando necessário, por exemplo, para gerenciar habilidades de fornecedores de um host ou equipe, através do diretório `node_modules`. Isso é útil em configurações gerenciadas por pacotes ou em ambientes offline.

```bash
npm install @dcc-mcp/skills
```

## Mercados de plugins nativos

Use o mercado de hosts nativos quando o Codex ou o Claude Code fornece esse recurso. Esses comandos instalam a mesma versão do `dcc-mcp` no repositório [`dcc-mcp-agent-plugins`](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#install).

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

Outras opções de instalação de plugins e registros nativos ainda estão documentadas no repositório oficial.

## Verifique a primeira conexão

```text
Conecte-se ao Blender e informe o nome do arquivo da cena aberta, os nomes das coleções e a quantidade de objetos. Preserve a cena e identifique a instância e a ferramenta usadas.
```

## Agentes de nuvem e DCC-MCP

Consulte [Cloud Agents and DCC-MCP](/pt/cloud-agents) para obter informações sobre as interfaces da plataforma, o inventário de software em nuvem e as evidências dos fluxos de trabalho com versões diferentes. Um agente de shell pode usar a CLI e o HTTP Gateway; no entanto, cada aplicação, adaptador e fluxo de trabalho ainda precisa ser validado no ambiente de destino. Mantenha os serviços DCC em loopback, e use TLS e autenticação para garantir o acesso entre redes diferentes. O plugin não inclui o software DCC de destino ou suas licenças.

## Mantenha as habilidades e o CLI atualizados.

Use o atualizador que é proprietário de cada instalação. As habilidades instaladas pelo GitHub utilizam o arquivo de bloqueio `skills`.

```bash
# Update managed copies in this workspace.
npx --yes skills@1.5.23 update -p -y

# Update managed user-level copies.
npx --yes skills@1.5.23 update -g -y
```

Verifique o DCC-MCP CLI separadamente. Após isso, aplicar a atualização verificada apenas com o consentimento do usuário.

```bash
dcc-mcp-cli update check
dcc-mcp-cli update apply
```

O OpenClaw e as instalações diretas do ClawHub utilizam suas próprias fontes de dados e comandos de atualização. Veja [Mantendo as habilidades instaladas atualizadas](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#keep-installed-skills-current). Não adicione o parâmetro `--force` às atualizações automáticas; as habilidades que foram modificadas localmente ou fixadas devem ser retidas para revisão posterior.

## Use o prompt curto.

A habilidade carrega consigo o procedimento a ser seguido. Portanto, o prompt precisa apenas da tarefa a ser realizada e dos limites de segurança relacionados a ela.

```text
Use a habilidade dcc-mcp para <descrever a tarefa do DCC>. Peça permissão antes de instalar ou alterar o estado do sistema. Conclua com evidências que comprovem sua realização.
```

## Instale apenas a habilidade que você realmente precisa.

| Intenção | Habilidade |
| --- | --- |
| Operar um DCC ao vivo, descobrir ferramentas ou procurar extensões. | `dcc-mcp` |
| Crie ou modernize um adaptador/runtime completo. | `dcc-mcp-creator` |
| Crie ou aprimore um pacote de habilidades específico para o DCC. | `dcc-mcp-skills-creator` |

Substitua o valor `--skill` no comando universal apenas quando a tarefa corresponde a uma das duas rotas de desenvolvimento disponíveis.

## Pesquisar, descrever e chamar.

```bash
# Confirm the gateway and connected hosts.
dcc-mcp-cli health
dcc-mcp-cli list

# Search narrowly, then follow the returned next_step.
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# Execute the returned tool slug with validated arguments.
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

Não adivinhe os nomes das ferramentas, nem carregue todos os esquemas de backend. Procure primeiro, e depois execute as etapas `load` ou `describe` mencionadas em `next_step`.

## Use o ID da solicitação antes de tentar novamente.

Guarde o `request_id` proveniente de uma chamada falha. Use o caminho de evidência integrado do CLI.

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

Em seguida, descubra o arquivo `dcc_feedback__report` utilizando o mesmo fluxo de trabalho de busca. Revisar e editar o relatório antes de compartilhá-lo. A criação de um problema externo ainda requer autorização do usuário.

## Referência

- [Primeiros passos](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started)
- [Referência do CLI](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)
- [Referência ao agente](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [Diagnósticos de Gateway](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [Mercado](/pt/marketplace)
- [Promptes para exibição](/pt/examples)
- [Tarefas comuns de IA + DCC](/pt/use-cases)
- [Navegue pelo ecossistema](/pt/ecosystem)
