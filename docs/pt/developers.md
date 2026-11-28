---
title: "Desenvolver um adaptador, serviço ou Skill"
description: "Escolha uma linha de desenvolvimento e teste localmente um serviço MCP privado, um adaptador ou uma Skill especializada."
pageClass: route-page
---

# Desenvolver um adaptador, serviço ou Skill

Escolha o layer que é responsável pela criação dos arquivos antes de começar a criá-los. O DCC-MCP suporta adaptadores públicos do DCC, serviços privados que não fazem parte do DCC, além de pacotes de habilidades específicos. É suficiente usar uma pasta local ou uma árvore de origem interna para isso.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Serviço privado ou personalizado MCP</strong><span>Use o dcc-mcp-creator.</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Habilidade em trabalhar com foco concentrado no fluxo de trabalho</strong><span>Use as habilidades criadoras.</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>Infraestrutura compartilhada</strong><span>Contribua para o Core.</span></a>
</div>

## Escolha uma das trilhas de desenvolvimento.

| A sua necessidade | Rota |
|---|---|
| Conecte o Maya, o Blender, o Unreal ou qualquer outro processo host. | Use o `dcc-mcp-creator` para criar ou melhorar um adaptador DCC. |
| Exiba uma API interna, um console de linha de comando, um banco de dados de ativos, uma estação de renderização ou um serviço de revisão. | Use o `dcc-mcp-creator` com um ID de serviço personalizado e ``instance_type="standalone"`. Não é necessário usar um repositório público. |
| Adicione um fluxo de trabalho preestruturado a um adaptador existente ou a um serviço autônomo. | Use o `dcc-mcp-skills-creator`. Não crie outro ambiente de execução. |
| Altere o gateway, o comando de linha de comando, o protocolo, as medidas de segurança ou o comportamento entre hosts. | Contribua com o contrato compartilhado para a Core. |

Procure no [diretório do ecossistema](/pt/ecosystem) antes de criar um adaptador público ou uma habilidade. As identidades de serviços privados não precisam ter uma entrada no catálogo público.

## Crie um serviço privado que não faça parte do DCC.

Use essa rota para um sistema interno, que não seja uma aplicação criativa. Além disso, esse sistema não deve usar o GitHub. Execute o agente de codificação a partir do projeto privado. Em seguida, use este prompt:

```text
Use dcc-mcp-creator para o serviço e dcc-mcp-skills-creator para os arquivos da Skill. Trabalhe apenas no projeto privado atual. Reutilize a linguagem, o gerenciador de pacotes, os testes e as práticas de autenticação e implantação adotadas pelo projeto. Não crie repositórios no GitHub, entradas públicas no catálogo, chamados externos ou versões públicas.

Escolha um fluxo interno real e implemente um serviço mínimo com identificador estável e uma Skill tipada de somente leitura. Use DccServerBase e DccServerOptions.from_env(..., instance_type="standalone"), sem dcc_pid. Durante o desenvolvimento, aceite conexões somente pela interface de loopback. Execute diretamente as operações de serviço, arquivos e API. Adicione um despachante ou uma ponte apenas se precisar atravessar limites entre threads ou processos. Defina esquemas de entrada e saída que rejeitem campos desconhecidos, anotações de segurança, um tempo limite, um exemplo de chamada e mensagens de erro que orientem a correção sem expor dados sensíveis. Mantenha as credenciais no sistema de segredos existente.

Execute dcc-mcp-cli lint skills e o menor teste aplicável do projeto. Inicie o serviço e mostre a URL /mcp efetiva. Com o MCP Inspector oficial, verifique tools/list, a busca e o carregamento da Skill correta, describe, uma chamada válida, um erro de entrada e o encerramento normal. Repita o fluxo pela CLI com list, load-skill, describe e call usando --output toon. Registre o slug e o request_id retornados. Evite suposições e tentativas às cegas. Informe quais arquivos mudaram, os resultados dos testes e as pendências de segurança e implantação. Pare antes de publicar ou alterar a infraestrutura compartilhada.
```

Validação necessária:

1. As convenções de projeto existentes são reutilizadas.
2. O ID do serviço personalizado e o motivo pelo qual o runtime é “`standalone`”.
3. Uma habilidade validada, e uma chamada de leitura apenas.
4. Um resultado seguro para a entrada inválida.
5. As evidências relacionadas à desativação do sistema foram limpas, e o caminho de entrega privado permaneceu intacto.

### Execute o serviço de exemplo.

O exemplo completo do Core está localizado em [`examples/remote-server`](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server). O nome do diretório onde esse exemplo está armazenado é estável. Atualmente, o exemplo funciona como um serviço autônomo, e ele descobre o diretório com os arquivos relacionados ao Skill.

```bash
pip install dcc-mcp-core
dcc-mcp-cli lint skills
python server.py
```

Espera-se que a saída da inicialização inclua um URL como `http://127.0.0.1:8765/mcp`, a identidade personalizada `studio-service` e o modo de funcionamento `standalone`.

### Use o Conjunto de Desenvolvimento.

O exemplo inclui uma configuração de [Contêiner de Desenvolvimento](https://containers.dev/). As especificações e referências relacionadas ao CLI são de código aberto. Portanto, o mesmo ambiente de Python, Node.js, Core e Inspector pode ser utilizado em um editor compatível ou a partir de uma shell de agente, sem a necessidade de uma conta hospedada.

A partir da raiz do repositório central:

```bash
npm install --global @devcontainers/cli
devcontainer up --workspace-folder examples/remote-server
devcontainer exec --workspace-folder examples/remote-server python server.py
```

Use o segundo terminal para a operação automática do dispositivo de detecção de fumaça.

```bash
devcontainer exec --workspace-folder examples/remote-server \
  npx --yes @modelcontextprotocol/inspector@latest --cli \
  http://127.0.0.1:8765/mcp --transport http --method tools/list
```

O laboratório é executado como um usuário não root. Além disso, o container do host não é montado. As credenciais privadas devem ser mantidas fora da imagem.

Para treinamentos em grupo realizados em navegadores, o [Educates](https://docs.educates.dev/en/stable/) oferece sessões isoladas, etapas escritas em Markdown, terminais e um editor integrado. É necessário que os operadores tenham conhecimento sobre Kubernetes, ingresso de recursos, identidade dos usuários, cotas, imagens e limpeza das sessões. Use o container de desenvolvimento local quando esses serviços compartilhados não forem necessários.

### Teste com o MCP Inspector

Use o oficial [MCP Inspector](https://github.com/modelcontextprotocol/inspector). Ele é executado localmente, não precisa de uma conta hospedada, suporta o protocolo Streamable HTTP, e permite que um serviço de loopback privado esteja isolado da internet pública:

```bash
npx --yes @modelcontextprotocol/inspector@latest
```

Conecte-se à URL `/mcp` impressa. Procure por “`hello-world`”, carregue-o e chame `hello_world__greet`, utilizando o valor `{"name":"Agent"}`. Além disso, envie um nome vazio e verifique se a resposta é um erro de validação estruturada.

::: warning Por que usar um inspetor local?
O local onde o jogo é executado não pode acessar um serviço de tipo Loopback ou Intranet MCP, sem expor esse serviço. Para sistemas internos, o Inspector de código aberto local é a opção segura para realizar o jogo. Nunca exporte o proxy que gera processos para uma rede não confiável.
:::

### Verifique através do CLI.

Use o CLI após o serviço se registrar. Mantenha o resultado da busca que é retornado pelo sistema.

```bash
dcc-mcp-cli list --output toon
dcc-mcp-cli load-skill hello-world --dcc-type studio-service --output toon
dcc-mcp-cli describe <tool-slug-returned-by-load> --output toon
dcc-mcp-cli call <tool-slug-returned-by-load> --json '{"name":"Agent"}' --wait --output toon
```

## Altere uma habilidade, sem precisar adicionar um tempo de execução.

Use essa instrução quando o ambiente de execução já existir.

```text
Use dcc-mcp-skills-creator no projeto privado atual. Pesquise primeiro as Skills existentes e adicione ou melhore a responsável por esse fluxo. Não crie um adaptador, serviço, repositório ou pacote público. Em SKILL.md, sob metadata.dcc-mcp.*, declare esquemas tipados, anotações de segurança, affinity, timeout, call_examples e next-tools. Implemente um único script com escopo limitado e reutilize dcc_mcp_core.skills_helper quando a função já existir. Execute dcc-mcp-cli lint no diretório instalável, carregue a Skill no serviço existente e faça uma chamada válida e outra com dados inválidos. Apresente os resultados e peça minha autorização antes de publicar.
```

Use esta sequência: **buscar a propriedade existente → edição do scaffold ou de outros elementos → verificação de erros com o Lint → recarregar o sistema → carregar os dados necessários → descrever os dados → realizar diagnósticos**.

## Desenvolva o código sem adivinhar.

| Sintomas | Próximo passo: verificação. |
|---|---|
| A validação das habilidades falha. | Defina exatamente o problema relacionado ao `dcc-mcp-cli lint` antes de iniciar o ambiente de execução. |
| O serviço não responde aos pedidos. | Verifique o URL impresso. Depois, execute os comandos `GET /v1/healthz` e `GET /v1/readyz`. |
| A habilidade está ausente. | Verifique o caminho de origem, execute o comando `reload-skills`, e depois tente procurar novamente. |
| A ferramenta está ausente. | Carregue a habilidade responsável e siga o `next_step` retornado por ela. |
| Chamada falha | Mantenha o `request_id`, execute o comando `dcc-mcp-cli doctor` e analise as estatísticas de falhas. Depois, corrija a camada responsável pela causa do problema. |
| A dependência privada não está disponível. | Relate o proprietário interno e as provas que foram editadas. Não abra nenhuma questão pública. |

## Passa de um sucesso local para entregas privadas.

Continue o desenvolvimento no loopback. A exposição da intranet precisa de um mecanismo de autenticação próprio ao operador, listas de permissões de rede/origem, gerenciamento de senhas, armazenamento de dados para auditoria e controle de acesso. Reuse o sistema de arquivamento, contêineres, registro privado ou sistema de implantação interno existentes no projeto. O GitHub é opcional.

Leia a seguir:

- [fluxo de trabalho do serviço interno autônomo](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/INTERNAL_SERVICE_WORKFLOW.md)
- [Exemplo de contêiner de desenvolvimento aberto](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server/.devcontainer)
- [Adaptador e fluxo de trabalho do serviço](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/ADAPTER_WORKFLOW.md)
- [Sistema de habilidades](https://dcc-mcp.github.io/dcc-mcp-core/guide/skills)
- [Escopos de habilidades e políticas](https://dcc-mcp.github.io/dcc-mcp-core/guide/skill-scopes-policies)
- [Implantação remota](https://dcc-mcp.github.io/dcc-mcp-core/guide/remote-server)
- [Arquitetura de núcleo](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture)
