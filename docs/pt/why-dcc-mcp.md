---
title: "Por que o DCC-MCP existe"
description: "Conheça os desafios de produção que motivaram o DCC-MCP e as responsabilidades do núcleo, dos adaptadores e das Skills."
---

# Por que o DCC-MCP existe

## O que é DCC-MCP?

DCC-MCP é um conjunto de ferramentas de código aberto que conecta agentes de IA a softwares criativos. Um agente de IA é um assistente de inteligência artificial que pode chamar ferramentas para realizar tarefas específicas. DCC significa criação de conteúdo digital; entre as aplicações disponíveis estão Maya, Blender, Houdini e Photoshop.

Agentes e sistemas de automação podem utilizar essas ferramentas para modelagem, criação de materiais, animações e renderização de imagens. Uma ferramenta tipada define seus parâmetros, seus tipos e os resultados obtidos. Dessa forma, é possível inspecionar e validar o resultado da execução da ferramenta.

O MCP (Model Context Protocol), as APIs REST e o `dcc-mcp-cli` compartilham recursos como descoberta de ferramentas, validação de dados, seleção de instâncias, políticas de segurança e verificação de resultados. A infraestrutura compartilhada é fornecida pelo Core; os adaptadores conectam cada aplicação, enquanto as Skills fornecem guias de fluxo de trabalho reutilizáveis.

O DCC-MCP surgiu a partir do trabalho com adaptadores em aplicações DCC reais. As questões relacionadas à afinidade de threads, seleção de instâncias, ciclo de vida, descoberta e diagnóstico continuaram a surgir em diferentes hosts. Adicionamos os contratos compartilhados apenas depois que esses problemas se repetiram.

## Comece pelo processo de produção.

Um agente utiliza o processo que lhe é atribuído. Ele não define esse processo para a equipe.

> Padronizar a produção → transformar os padrões em fluxos de trabalho → organizar os fluxos de trabalho como ferramentas → permitir que os agentes utilizem essas ferramentas para realizar suas tarefas.

Defina os critérios de nomeação, entradas, saídas, verificações, responsabilidade e aceitação. Conecte esses elementos em um fluxo de trabalho repetível. Depois, torne esse fluxo de trabalho um instrumento utilizado por pessoas, scripts, CI ou agentes. O mesmo instrumento pode ser chamado por pessoas, scripts, CI ou agentes.

## Por que os scripts diretos pararam de escalar?

Pedir a um modelo que escreva e execute um script de Python, como o `mayapy`, `hython` ou Blender, é útil para fins de exploração. O trabalho de produção repetido revelou as seguintes limitações:

- O modelo regenera código semelhante a cada turno, mas o resultado é diferente de vez em quando.
- As APIs DCC geralmente exigem que a execução seja feita no thread principal, além de verificações de prontidão específicas para a aplicação.
- Várias cenas abertas ou instâncias de aplicação tornam o alvo da execução ambíguo.
- As operações longas exigem progresso, cancelamentos, pontos de controle e recuperação.
- Uma saída bem-sucedida do processo não prova que a cena ou documento pretendido foi alterado.
- As falhas são difíceis de reproduzir, sem a utilização de dados digitados, IDs de solicitações, logs e outros registros relacionados.

Esses problemas ocorreram em todos os adaptadores. Portanto, eles deveriam fazer parte de uma infraestrutura compartilhada.

## Problemas e os contratos que eles criaram

| Problemas repetidos | O que aprendemos | Resposta do DCC-MCP |
| --- | --- | --- |
| Os modelos reescrevem a lógica da tarefa a cada rodada. | O conhecimento relacionado ao pipeline deve ser capaz de sobreviver às mudanças nos modelos e nos prompts utilizados. | Habilidades com versões, esquemas escritos, validação e ferramentas reutilizáveis. |
| Cada adaptador recria o código relacionado ao transporte e ao ciclo de vida do sistema. | As integrações de host precisam de um contrato compartilhado. | Tempo de execução do Core, Gateway, CLI e adaptadores próprios aos hosts. |
| As APIs DCC têm restrições relacionadas a threads e à disponibilidade dos recursos. | A execução genérica do processo não é suficiente. | Distribuição do fio principal, prontidão, roteamento das instâncias e execução pelo host. |
| Os catálogos de ferramentas grandes consomem muito espaço de memória e confundem a escolha dos produtos necessários. | Os agentes devem descobrir apenas aquilo de que a tarefa precisa. | `search -> load/describe -> call` |
| As operações criativas podem ser lentas ou parcialmente concluídas. | O chamado precisa ter semântica relacionada ao ciclo de vida do objeto, não apenas um valor de retorno. | Trabalhos assíncronos, progresso, cancelamento, pontos de verificação e transferência de responsabilidades. |
| O uso de ferramentas torna-se algo como uma “caixa preta” – algo que não é possível entender completamente. | As equipes de produção precisam de provas que demonstrem que podem inspecionar o local em questão. | IDs de solicitações, políticas, registros de auditoria, logs, rastreamentos, métricas, estado de saúde e reprodução de eventos. |
| As ferramentas existentes, às vezes, não oferecem uma API útil para uso. | A automação do interface do usuário é uma solução de reserva, e não a base para o desenvolvimento de aplicações. | DCC-CUA / Controle de interface do usuário vinculado a um processo e janela específicos, com operações limitadas ao escopo, verificações de políticas e o `snapshot -> find -> act -> wait -> verify` |
| Os fluxos de trabalho úteis devem se mover entre pessoas e projetos. | A pasta “script” não é um modelo de distribuição. | Pacotes de mercado, referências de origem imutáveis, atualização rápida, e escopos de projeto/equipe |

## Quem é o dono de quê?

O sistema separa os serviços compartilhados do comportamento específico de cada host.

| Camada | Responsabilidade |
| --- | --- |
| Interface do agente | Pontos de extremidade MCP e REST, comandos CLI digitados, esquemas, recursos, prompts e resultados estruturados. |
| Plano de controle | Descoberta de caminhos, roteamento, verificação de políticas, gerenciamento do ciclo de vida, capacidade de observação e contexto de múltiplas instâncias. |
| Tempo de execução do DCC | Distribuição de tarefas principais, prontidão, tarefas a serem realizadas, cancelamentos, pontos de verificação e execução segura pelo host. |
| Adaptador | Instalação, compatibilidade, APIs do host e o comportamento específico da aplicação, que pertence a cada repositório DCC. |
| Habilidade | Testado o conhecimento relacionado ao fluxo de trabalho, validados os argumentos apresentados, analisados os passos do fluxo de trabalho, e verificadas as convenções do projeto ou da equipe. |

A [documentação da arquitetura básica](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture) é a fonte de informações confiáveis para os contratos atuais. As configurações específicas de cada host, a compatibilidade e os procedimentos de resolução de problemas continuam a ser mantidos em cada repositório de adaptadores.

## CLI, MCP e REST compartilham uma mesma implementação.

O código de serviço compartilhado e o contrato REST/OpenAPI digitado são as implementações necessárias. O `dcc-mcp-cli` chama a API REST do Gateway. O MCP é simples: `search`, `describe`, `load_skill` e `call` exibem o mesmo fluxo de trabalho para clientes que utilizam apenas o MCP. Ambas as rotas usam os mesmos serviços de descoberta, validação, roteamento, políticas e chamadas.

| Consumidores | Superfície preferida | Requer a intervenção de um agente de inteligência artificial. |
| --- | --- | --- |
| Artistas, TDs, operadores, scripts de shell e CI | CLI ou REST digitados | Não |
| Automação de estúdio e aplicações personalizadas | Descansar com os clientes OpenAPI gerados. | Não |
| IDEs e assistentes de AI que utilizam apenas tecnologias MCP | fluxo de trabalho mínimo do MCP | Sim |
| Painéis de fluxo de trabalho inteligentes e orquestração em nuvem | Integração com REST/OpenAPI; MCP quando um agente participa. | Não |

O pipeline pode chamar diretamente o REST, gerar clientes a partir do arquivo `/v1/openapi.json`, ou utilizar a interface CLI nas etapas de controle e operação. Um agente também pode ter acesso às mesmas funcionalidades por meio da interface MCP.

Um serviço OpenAPI 3.x existente também pode ser montado como ferramentas MCP. Ele continua sendo um serviço REST normal, e não precisa ser reconstruído com base em tecnologias de IA.

## Use os protocolos existentes primeiro.

O MCP é o ponto de entrada padrão da indústria. Por isso, o DCC-MCP utiliza esse ponto de entrada, em vez de criar um protocolo privado. REST, Python, C++, HTTP, portas de comando, plugins nativos e ferramentas oficiais dos fabricantes podem operar sob o mesmo planejamento de controle.

O DCC-MCP não substitui um agente, uma API do DCC ou uma integração com um fornecedor. Quando um fornecedor oferece uma funcionalidade nativa ou oficial do MCP, o adaptador mantém seus nomes e esquemas de dados. O DCC-MCP fornece recursos como descoberta compartilhada, roteamento, segurança, ciclo de vida, distribuição e diagnósticos relacionados a essas funcionalidades.

## Conhecimento sobre o fluxo de trabalho do armazenamento de habilidades

A Skill transforma o fluxo de trabalho testado em uma capacidade que pode ser distribuída, com versões disponíveis para uso.

A fronteira de propriedade é:

- Os núcleos e adaptadores são responsáveis pela conectividade, segurança das threads, roteamento, definição de políticas e capacidade de observação.
- Os TDs e TAs mantêm a nomeação dos projetos, as verificações das cenas, a preparação dos recursos necessários, os pontos de publicação, as regras de exportação e a transferência das responsabilidades de revisão, tudo isso próximo ao código existente deles.
- Os agentes selecionam uma ferramenta que seja bem descrita e utilizam argumentos validados, em vez de ter que criar todo o fluxo de trabalho do zero.

Isso reduz a geração de código repetido e permite que um estúdio distribua diferentes recursos, de acordo com o projeto, departamento ou fase de produção, sem precisar alterar o planejamento do sistema.

## Mantenha as evidências do fracasso.

O diagnóstico começa com um `request_id`, o tipo do instrumento e dos argumentos utilizados, a instância DCC selecionada, e o resultado observado. O Gateway e a CLI fornecem informações sobre o estado do sistema, logs, estatísticas e feedback estruturado.

Isso cria um ciclo concreto:

1. Reproduz o mesmo fracasso contra um hospedeiro real.
2. Identificar se o Core, um adaptador ou uma Skill é o responsável por isso.
3. Faça o menor ajuste possível naquela borda.
4. Valida a mesma chamada novamente.
5. É necessário manter as evidências, para que as próximas melhorias sejam baseadas em experiências reais, e não em suposições.

## Limites conhecidos

A DCC-MCP não pretende tornar todas as aplicações criativas idênticas entre si.

- As habilidades nativas e as APIs continuam sendo preferíveis em relação ao DCC-CUA/UI Control, que exige que um processo e uma janela específicos sejam vinculados.
- A Core não possui uma semântica de pipelines específica para cada host.
- Um adaptador não pode garantir um rollback seguro quando o host não oferece nenhuma API de transação.
- Os pacotes do Marketplace expandem o framework; eles não escondem os defeitos do Core ou dos adaptadores.
- O projeto fornece infraestrutura para os agentes. Ele não determina qual agente ou modelo deve ser utilizado.

## O que ainda depende do julgamento humano

Muitas tarefas de produção podem ser padronizadas, validadas e automatizadas. No entanto, critérios estéticos, direção artística, composição, tempo e estilo ainda são difíceis de serem expressos em forma de contratos estáveis. O DCC-MCP não pretende que a infraestrutura sozinha resolva esses problemas.

O DCC-MCP cuida das partes que podem ser repetidas, e proporciona aos agentes acesso controlado aos instrumentos necessários para realizar as tarefas. Uma melhor percepção, raciocínio e julgamento criativo permitem o uso dos mesmos instrumentos, sem a necessidade de reconstruir todas as integrações DCC.

## Continue daqui em diante.

- [Veja como um agente utiliza o sistema.](/pt/agents)
- [Crie um adaptador, um serviço independente ou uma “Skill”.](/pt/developers)
- [Explore os adaptadores e extensões.](/pt/ecosystem)
- [Leia a documentação técnica básica.](https://dcc-mcp.github.io/dcc-mcp-core/)

## Ligações oficiais

- [Site do DCC-MCP](https://dcc-mcp.github.io/pt/)
- [Organização do GitHub](https://github.com/dcc-mcp)
- [Canal do YouTube](https://www.youtube.com/@dcc-mcp)
- [Galeria de exibições](https://dcc-mcp.github.io/showcase/)
