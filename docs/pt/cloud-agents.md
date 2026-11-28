---
title: "Agentes na nuvem e DCC-MCP"
description: "Compare interfaces, testes datados e requisitos de instalação antes de escolher uma máquina na nuvem ou uma estação de trabalho."
pageClass: route-page
---

# Agentes na nuvem e DCC-MCP

Escolha um fluxo de trabalho baseado em nuvem ou em uma estação de trabalho, levando em consideração os testes realizados com o software, as interfaces da plataforma, os requisitos de instalação e os limites de implementação.

O DCC-MCP conecta um agente de AI a aplicações criativas, por meio de ferramentas de digitação, do MCP e do `dcc-mcp-cli`. Um agente na nuvem pode inspecionar um documento, realizar edições, exportar recursos e verificar o resultado, desde que seu ambiente tenha a aplicação necessária, um adaptador funcional e uma conexão autorizada. Um agente capaz de usar o shell pode utilizar o CLI e o gateway HTTP, sem a necessidade de configurações no MCP.

Este guia aborda os seguintes conceitos: **OpenAI Dots**, **Grok Bot**, **Meta Muse** (o agente pessoal) e **Manus Cue**. As documentações das plataformas são registradas separadamente dos testes, em um computador com sistema de pontos, utilizado para o desenvolvimento do Lightbox. O Lightbox é o contexto de desenvolvimento e implementação da aplicação; a DCC-MCP é responsável pela integração das aplicações. Os resultados obtidos com este computador não garantem suporte para todas as contas, imagens ou plataformas. São integrações independentes, sem qualquer afirmação de parceria com as plataformas envolvidas.

## Níveis de evidência {#evidence-levels}

As evidências analisadas foram coletadas em **2026-10-01 UTC**. Uma aplicação instalada, uma entrada no catálogo de CLI, e uma chamada de ferramenta MCP que funciona são observações diferentes.

| Rótulo/Identificador | O que as evidências estabelecem |
| --- | --- |
| O MCP foi testado. | O adaptador e a conexão especificados concluíram o fluxo de trabalho designado no ambiente mencionado. As versões experimentais e os patches não publicados continuam a ser considerados como parte do processo. |
| Apenas nativos. | O aplicativo produziu um artefato ou passou em uma pequena verificação da API, utilizando sua própria interface de comando/API. Não há nenhuma implicação de aceitação pelo DCC-MCP. |
| A interface oficial está disponível; o DCC ainda não foi testado. | A documentação da plataforma descreve uma interface que pode suportar essa integração. Trata-se de uma avaliação de viabilidade, e não de um fluxo de trabalho DCC já testado. |
| **Não confirmado** | A interface ou o comportamento da aplicação necessários ainda não foram estabelecidos. |

Um fluxo de trabalho do MCP incompleto ou rejeitado é considerado como uma falha, mesmo que um arquivo intermediário tenha sido criado. Os repositórios de adaptadores são responsáveis pela instalação e suporte à versão do software; esta página resume as informações sobre o fluxo de trabalho em nuvem.

## Interfaces da plataforma {#platform-interfaces}

| Plataforma e ambiente | Interface oficial e possíveis rotas | Software/adaptador/evidências relacionadas ao fluxo de trabalho | Não confirmado ou não testado |
| --- | --- | --- | --- |
| **OpenAI Dots**: um computador em nuvem ou um computador pessoal autorizado. | Computadores em nuvem, navegadores, arquivos e aplicativos; plugins e tarefas pessoais no computador. Veja [computadores e aplicativos](https://learn.chatgpt.com/docs/dots/computers-and-apps) e [plugins](https://learn.chatgpt.com/docs/plugins). | O computador Linux abaixo possui testes de software nativos e experimentos com adaptadores limitados. As versões dos adaptadores e as rotas de comunicação são registradas, por linha de software. | Os documentos não especificam um sistema operacional universal para a nuvem, nem a compatibilidade do inventário DCC ou dos adaptadores utilizados. As tarefas realizadas em computadores pessoais exigem que o computador esteja conectado à rede e que o aplicativo ChatGPT esteja aberto. |
| O Grok Bot utiliza um computador com sistema operacional Linux. | [Ferramentas de computador, shell e área de trabalho](https://docs.x.ai/grok-bot/computer-and-apps); [Identidade/acesso ao Linux](https://docs.x.ai/grok-bot/identity-and-access); [Comando remoto HTTPS e comandos personalizados do MCP](https://docs.x.ai/grok-bot/team-bots#plugins). O uso da interface de linha de comando combinada com o HTTP é uma possível solução. | A interface oficial está disponível; o DCC não foi testado. Versão do software: não testada. Adaptador: não testado. Nenhum fluxo de trabalho do DCC foi realizado aqui. | O suporte do Command MCP não verifica a conexão de dados padrão DCC. As restrições relacionadas às informações secretas e a visibilidade da equipe também são aplicadas. O acesso remoto precisa utilizar o protocolo TLS/auth para garantir a segurança da conexão. |
| **Meta Muse**, máquina virtual com agente pessoal, baseada no sistema operacional Linux. | O [agente pessoal do Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) e os [conectores de runtime do Debian, bem como os conectores API/CLI](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse). A integração entre CLI/API é um caminho plausível, conforme inferido a partir dessas interfaces. | A interface oficial está disponível; o DCC não foi testado. Versão do software: não testada. Adaptador: não testado. Nenhum fluxo de trabalho do DCC foi realizado aqui. | Os conhecimentos básicos em MCP, o controle gráfico do DCC e o escopo de instalação de software não são confirmados por essas fontes. O Muse Code é um produto separado. As permissões relacionadas ao tempo de execução e aos conectores ainda são válidas. |
| **Manus Cue** – Aplicativo independente de agente pessoal. | [A seção “Cue” de Introduzindo o Manus 2.0 descreve um aplicativo móvel/desktop independente e o computador próprio de cada agente.](https://manus.im/blog/introducing-manus-2-0) | Não confirmado. OS/software: não confirmado. Adaptador/conexão: nenhum testado. Nenhum fluxo de trabalho DCC foi realizado aqui. | As conexões específicas para Cue, os conectores personalizados e o software DCC arbitrário ainda não foram confirmados. As capacidades do Manus Studio não constituem evidência de que Cue seja realmente possível. |

## Inventário de software em nuvem {#cloud-software-inventory}

O computador em questão estava executando o sistema operacional **Debian 13.6, x86_64**. A interface gráfica estava funcionando normalmente. O fato de não haver nenhum programa no shell `DISPLAY` não significa que a área de trabalho não estivesse presente no computador. Este é um inventário atualizado do computador, e não uma promessa de instalação prévia. Nessas verificações de inventário, não foi utilizado nenhum adaptador. O ambiente inicial não continha pacotes DCC-MCP.

| Versão da plataforma/software | Adaptador/conexão utilizado | fluxo de trabalho nativo e evidências | Limites remanentes |
| --- | --- | --- | --- |
| Pontos em Debian 13.6 x86_64 / Inkscape **1.4** | Nenhum / Idioma CLI nativo e interface gráfica gerenciada | Consulta de dados em formato SVG e exportação para formato PNG; o interface gráfico é bem intencionado. **Apenas nativo.** | A ação de extensão nativa e o fluxo de trabalho de produção do DCC-MCP exigem verificações separadas. |
| Pontos de Debian 13.6 x86_64 / FreeCAD **1.0.0** | Nenhum / Sistema Python + API de parte | Foram criados artefatos do tipo FCStd e STEP. **Apenas nativos.** | O ambiente contaminado foi corrigido; o ambiente limpo foi restaurado. A validação dos resultados do adaptador é um procedimento separado. |
| Pontos de referência do Debian 13.6 x86_64 / GIMP **3.0.4** | Nenhum / API de lote nativo | Criação de documentos em lote. **Apenas nativo.** | O início do funcionamento do adaptador, as chamadas de ferramentas e a aceitação das informações exportadas/leídas ainda não foram testados. |
| Pontos de referência do Debian 13.6 x86_64 / OpenSCAD **2021.01** | Nenhum / nativo do CLI | Geração de arquivos STL. **Apenas para uso nativo.** | A aceitação do adaptador é algo separado da renderização na linha de comando. |
| Pontos de referência do Debian 13.6 x86_64 / Blender **4.3.2** | Nenhuma execução com background nativo. | O blendagem foi salvo, exportado como GLB, e o renderização do CPU foi concluída, com a função de eliminação de ruídos desativada. **Apenas para uso nativo.** | Abaixo do piso de suporte ao adaptador, a pontuação é **4,5**; OIDN e Draco não estão disponíveis. Isso não expande as versões do Blender que são suportadas. |
| Pontos de Debian 13.6 x86_64 / Godot **4.6.3** | Nenhum/sem CLI nativo sem cabeça | Execução sem cabeça. **Apenas nativo.** | Os fluxos de trabalho do editor e do adaptador ainda não foram testados. |
| Pontos de referência do Debian 13.6 x86_64 / FFmpeg **7.1.5** | Nenhum / nativo do CLI | Produzido em formato MP4. **Apenas nativo.** | No adaptador DCC-MCP testado. |
| Pontos em Debian 13.6 x86_64 / ImageMagick (**Versão não registrada**) | Nenhum / nativo do CLI | Produzido em PNG. **Apenas nativo.** | Lembre-se da versão anterior, antes de procurar um fluxo de trabalho que seja reproduzível. |
| Pontos de Debian 13.6 x86_64 / CadQuery **2.7** | Nenhum / API de Python | É uma verificação simples do API. **Apenas disponível para sistemas nativos.** | O fluxo de trabalho de modelagem/exportação completa e do adaptador ainda não foi testado. |
| Pontos de referência do Debian 13.6 x86_64 / KiCad **9.0.2** | Nenhum / API de Python | É uma verificação simples do API. **Apenas disponível para sistemas nativos.** | O processo de edição/exportação dos PCBs, bem como o fluxo de trabalho relacionado ao adaptador, ainda não foram testados. |
| Pontos de referência do Debian 13.6 x86_64 / ParaView **5.13.2** | Nenhum / API de Python | É uma verificação simples do API. **Apenas disponível para sistemas nativos.** | O fluxo de trabalho de visualização/exportação e adaptação não foi testado. |
| Pontos de referência do Debian 13.6 x86_64 / QGIS **3.40.6** | Nenhum / API de Python | É uma verificação simples do API. **Apenas disponível para sistemas nativos.** | O fluxo de trabalho do projeto/exportação e do adaptador ainda não foi testado. |
| Pontos de referência do Debian 13.6 x86_64 / LibreOfficeDev **26.8 alpha** | Nenhum / nativo do CLI | Experimento de conversão de DOCX para PDF. **Apenas nativo; experimental.** | Versão Alpha; não há reclamações de aceitação ou aprovação pela produção ou pelo adaptador. |
| Pontos de referência do Debian 13.6 x86_64 / Kdenlive **24.12.3** | Nenhum / versão / ajuda no CLI | O Executable respondeu à solicitação de versão/ajuda. **Não foi confirmado** quanto à sua funcionalidade no processo de renderização. | O fluxo de trabalho do render ou adaptador não foi testado. |
| Pontos de Debian 13.6 x86_64 / Slicer (**versão não estabelecida**) | Nenhum / Ponto de entrada da aplicação | Ponto de entrada encontrado; tentativa sem cabeça falhou. **Não confirmado.** | A execução nativa e a integração do adaptador ainda não foram resolvidas. |

## Testes do Cloud MCP {#cloud-mcp-tests}

Os seguintes experimentos foram bloqueados pelo trabalhador responsável pelo teste da nuvem em **2026-10-01 UTC**: dois ciclos de desenvolvimento passaram após as correções locais; um experimento de compatibilidade com o Blender não conseguiu superar os obstáculos relacionados à compatibilidade com o software; e um fluxo de trabalho de produção com o Inkscape permaneceu bloqueado. As construções do site e as verificações no navegador no PC8 são documentações separadas, que não representam uma certificação de suporte geral. O [resumo das evidências públicas](/cloud-evidence/2026-10-01.json) registra os resultados obtidos e as identidades das correções locais; ele não contém quaisquer dados relacionados às correções, credenciais ou links para download privados.

| Plataforma/software | Adaptador / liberação ou fonte / conexão | Workflow e evidências observadas | Não testado ou bloqueado |
| --- | --- | --- | --- |
| dots / Debian 13.6 x86_64 / Blender **4.3.2** | O `dcc-mcp-blender` foi publicado na versão **0.2.12**. Além disso, a versão do Core é **0.20.39**/real MCP. | Inicializar, listar/carregar, criar uma nova cena, criar objetos, salvar informações de mistura, limpar a cena, reabrir a cena, inspecionar a cena e exportar os dados em formato GLB. **MCP testado; compatibilidade verificada.** | A versão testada está abaixo da [versão mínima oficialmente compatível, Blender 4.5](https://github.com/dcc-mcp/dcc-mcp-blender). A execução de scripts arbitrários e o Draco estavam desativados. O teste não estabeleceu suporte completo ao Blender 4.3, à interface gráfica nem à renderização via MCP. |
| dots / Debian 13.6 x86_64 / FreeCAD **1.0.0** | [`dcc-mcp-freecad`](https://github.com/dcc-mcp/dcc-mcp-freecad) / patch local não publicado `f761672f62ab8d0d1ae3d77a6379249e307eeff1` / MCP real + Core **0.20.39** | Após corrigir `verified` para retornar o booleano esperado pelo Core em vez de uma lista, passaram as etapas de criação, gravação, reabertura, exportação e leitura independente. **O MCP foi testado com um patch local.** Passaram 138 testes, incluindo três no aplicativo real, além da verificação com Ruff. | O patch não foi lançado; não há nenhum commit remoto disponível. A execução bem-sucedida da operação de escrita nativa falhou antes mesmo da correção ser aplicada. O commit local é apenas uma prova de identidade, e não representa um lançamento oficial do patch. |
| dots / Debian 13.6 x86_64 / Inkscape **1.4** | [`dcc-mcp-inkscape`](https://github.com/dcc-mcp/dcc-mcp-inkscape), código-fonte `9769234`. A descoberta foi feita via MCP. A ação nativa usou a interface gráfica e dependências temporárias de `inkex`. | As descobertas e as capacidades foram legíveis. A execução sem cabeça não possuía a extensão nativa necessária para funcionar. A geração do GUI utilizou formato SVG nativo. No entanto, o processo de validação da origem do arquivo no Linux GLib falhou. **O fluxo de trabalho de produção do MCP ainda está incompleto.** | Há uma lacuna na integração do código fonte do Linux. Não se deve relaxar nos controles de origem dos componentes, nem se pode afirmar que a produção foi aceita. O processo intermediário do SVG não permite que a produção do MCP seja realizada com sucesso. |
| dots / Debian 13.6 x86_64 / OpenSCAD **2021.01** | [`dcc-mcp-openscad`](https://github.com/dcc-mcp/dcc-mcp-openscad) está na versão **0.2.1**. Há também um patch local não publicado, com o nome `799fc2af97d13365613545347e4d4817e9f75b48`. Além disso, a versão real do MCP é **0.20.39**. | Descoberta da versão, reabertura/inspeção de novas sessões, compilação de parâmetros, exportação de dados em formato binário/ASCII, além da leitura dos dados após a correção do valor booleano “`verified`”. Foram encontrados **12 triângulos, 7200 mm³** de dados. Os testes de segurança foram aprovados. O **MCP** foi testado com um patch local. 129 testes foram aprovados; 4 testes específicos para Windows foram ignorados. 2 testes nativos também foram aprovados. | O patch não foi lançado. O arquivo PNG falhou devido à configuração do caminho DISPLAY/OpenGL. A fonte do SCAD foi criada como texto local. O adaptador não possui API de edição, portanto, não se trata de um modelo criado a partir do zero, utilizando o MCP. |

## Escolha uma conexão. {#choose-a-connection}

1. **Aplicação no computador em nuvem do agente:** use um adaptador local compatível e o CLI, ou o cliente MCP do ambiente. Verifique primeiro as versões exatas da aplicação e do adaptador. As APIs nativas são úteis para identificar candidatos adequados para integração; em seguida, deve-se considerar a aceitação do adaptador.
2. **Aplicação em uma estação de trabalho autorizada:** É necessário manter o endpoint DCC em modo loopback e conectá-lo por meio de uma conexão computacional aprovada ou de um gateway protegido. O agente na nuvem precisa ter acesso às paths dos projetos e dos artefatos desejados. Além disso, a estação de trabalho deve permanecer disponível.
3. **Agente compatível com Shell:** Utilize o `dcc-mcp-cli` para realizar inventários, descobrir ferramentas e fazer chamadas. Uma interface de configuração nativa do MCP é opcional. O Command MCP e o CLI são interfaces separadas. As pontes `translate` do Core realizam a conversão entre formatos de entrada/saída e formato HTTP. O suporte ao Command no cliente não permite o uso de um fluxo de trabalho baseado em DCC.

Para conectar redes diferentes, configure **TLS e autenticação no proxy de entrada ou em um gateway OAuth dedicado**. Restrinja o acesso e mantenha o DCC na interface de loopback. Pelo [contrato de autenticação do Core 0.20.39](https://github.com/dcc-mcp/dcc-mcp-core/blob/v0.20.39/docs/guide/remote-server.md#auth), a validação nativa de Bearer/OAuth/CIMD por requisição no `McpHttpServer` ainda está planejada. `ApiKeyConfig` e `OAuthConfig` não protegem sozinhos o serviço em execução. Não exponha um endpoint sem proteção como serviço público autenticado.

## Pré-requisitos para a instalação {#prerequisites}

- Permissão para instalar ou atualizar o software no ambiente escolhido; uma aplicação disponível para uso e qualquer licença necessária. Um plugin DCC-MCP não inclui a própria aplicação, sua licença ou um endpoint público para vários usuários.
- É necessário que a versão do aplicativo esteja dentro do intervalo de suporte do adaptador responsável pela execução do aplicativo. Além disso, são necessárias bibliotecas nativas, bem como um adaptador oficial verificado ou um patch de código fonte devidamente registrado.
- É necessário que haja uma conexão CLI/MCP compatível, uma instância pronta para uso imediato e um diretório de projeto autorizado. Os ferramentas que dependem da interface gráfica também precisam do serviço de área de trabalho gerenciada pela plataforma, ou de um serviço de exibição compatível.
- Para uso remoto, é necessária uma infraestrutura TLS/auth aprovada e segredos gerenciados pelo operador. Este guia não cria um ponto final público ou credenciais para o uso remoto.

Siga as instruções de configuração do [agente compartilhado](/pt/agents) e do [diretório de adaptadores](/pt/ecosystem). As instruções de instalação e as soluções para problemas específicos de cada host estão disponíveis no repositório de adaptadores.

## Um fluxo de trabalho com verificação {#verified-workflow}

Comece com um documento relacionado a uma tarefa específica e com uma operação definida. Por exemplo, inspecionar uma peça CAD, fazer alterações nas dimensões da peça, salvar as informações, reabrir a peça e verificar as dimensões antes de exportá-la no formato STEP. Este é um padrão de aceitação; a matriz acima indica quais experimentos realmente foram bem-sucedidos.

```bash
# After approved setup, inspect the current environment and live instances.
dcc-mcp-cli doctor
dcc-mcp-cli list

# Only continue when a ready instance for the intended application exists.
dcc-mcp-cli search --query "inspect document" --dcc-type freecad

# Follow the returned next_step and exact schema; do not invent a tool slug.
```

Pare se o inventário estiver vazio ou se a instância não estiver pronta. Mantenha as versões da aplicação/adaptador/Core, o caminho de conexão, as informações de commit da fonte para patches, as IDs das solicitações/tarefas e as verificações dos artefatos. A salvamento ou exportação deve ser verificada ao reabrir o documento nativo ou inspecionando independentemente o resultado. Preserve a ID da tarefa que falhou antes de tentar diagnosticá-la; não reproduza cegamente uma mutação.

```text
Use a habilidade “dcc-mcp” para inspecionar o documento pertinente à tarefa, no computador em nuvem ou na estação de trabalho autorizada. Verifique as versões e o estado de prontidão do documento. Use ferramentas preestabelecidas para realizar alterações necessárias. Salve o resultado e reabra-o posteriormente. Verifique também o artefato exportado. Peça permissão antes de instalar software ou alterar o estado do sistema. Relate o caminho de conexão, as evidências disponíveis e os limites restantes.
```

## Perguntas frequentes {#faq}

### Isso significa que todas as quatro plataformas suportam todos os tipos de comunicações DCC?

As interfaces da plataforma, o software instalado e a aceitação dos adaptadores são elementos separados. O Grok Bot e o Muse possuem documentação sobre os caminhos de integração, mas não há testes de DCC realizados aqui. As interfaces necessárias para o Cue ainda não foram confirmadas. Até mesmo um teste superficial aplica-se apenas às versões gravadas do sistema e ao fluxo de trabalho relacionado.

### Posso usar o DCC-MCP sem uma tela de configuração do MCP nativo?

Sim, quando o agente autoriza o acesso ao shell, é necessário que haja um `dcc-mcp-cli` funcionando e um gateway HTTP local ou protegido para permitir a conexão. É preciso verificar se a plataforma permite a execução e a conexão necessárias. O próprio shell não é suficiente para instalar ou licenciar o aplicativo.

### Por que a execução nativa pode ser realizada, enquanto a execução com o MCP falha?

A comando nativa pode criar um arquivo, mesmo quando o processamento pelo adaptador falha, a validação dos resultados falha, o rastreamento dos trabalhos falha ou as verificações de origem do arquivo falham. O FreeCAD e o Inkscape permitem que essas limitações sejam superadas. Considere o falha do adaptador como um problema não resolvido, até que o fluxo de trabalho e os resultados obtidos sejam satisfatórios.

### Um agente de nuvem pode funcionar com o meu desktop DCC licenciado?

Uma conexão autorizada com um computador pessoal, ou um gateway protegido, pode fornecer esse caminho. É necessário confirmar o acesso, as versões suportadas, os caminhos de acesso, a disponibilidade da estação de trabalho e as condições de licenciamento com o operador. Os documentos da plataforma não certificam todos os desktops DCC.

### Será que esta página garante a visibilidade da busca por meio de IA?

O guia de pesquisa da AI da Google [[Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)] exige que o conteúdo seja normalmente disponibilizado para leitura, e que os dados estruturados sejam visíveis. Não é necessário usar arquivos ou esquemas especiais relacionados à IA. Além disso, não há garantia de indexação ou exibição do conteúdo. A documentação do rastreador da OpenAI [[OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots)] distingue entre o rastreamento de pesquisa e o rastreamento de treinamento. Este guia preserva as políticas de rastreamento existentes no site.
