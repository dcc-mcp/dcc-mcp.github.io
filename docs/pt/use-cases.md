---
title: "Controlar aplicativos de criação com IA"
description: "Consulte tarefas e instruções por aplicativo para encontrar ferramentas, executar uma operação e verificar o resultado."
pageClass: route-page
---

<script setup>
import entries from "../.vitepress/i18n/pt/integrations.json"
import labels from "../.vitepress/i18n/pt/guide.json"
import DccControlGuideIndex from '../.vitepress/theme/components/DccControlGuideIndex.vue'
</script>

# Controlar aplicativos de criação com IA

Esses exemplos utilizam a [habilidade pública `dcc-mcp`](https://clawhub.ai/loonghao/skills/dcc-mcp) e o `dcc-mcp-cli`. As instruções descrevem o resultado necessário e as verificações a serem realizadas. O agente descobre os nomes dos ferramentas a partir do host conectado.

Para que um agente de AI possa operar uma aplicação criativa em funcionamento, basta seguir o guia abaixo, que descreve as tarefas e o fluxo de trabalho necessário para a operação da aplicação. Cada guia também inclui um link para o repositório do adaptador responsável pela instalação da aplicação, além de detalhes específicos sobre a compatibilidade da aplicação com os diferentes sistemas.

## Como posso controlar cada DCC com a ajuda da IA?

<DccControlGuideIndex language="pt" :entries="entries" :labels="labels" />

## Exemplo de conexão com a Maya

Instale a habilidade `dcc-mcp` e conecte o [adaptador Maya](https://github.com/dcc-mcp/dcc-mcp-maya). Verifique a instalação existente antes de adicionar o CLI ou o adaptador.

```text
Configure o DCC-MCP de modo que você possa controlar o Maya nesta máquina. Instale e siga as instruções fornecidas pelo @loonghao/dcc-mcp. Verifique primeiro o CLI atual e o adaptador do Maya. Peça permissão antes de instalar ou alterar o estado do sistema. Abra ou detecte o Maya, verifique o gateway e a instância do Maya em execução. Realize uma busca somente leitura e descreva o fluxo de trabalho. Depois, relate a instância conectada, as capacidades disponíveis e as próximas ações seguras que podem ser realizadas com o Maya. Não modifique a cena atual durante o processo de configuração.
```

Verifique a conexão com:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Maya scene" --dcc-type maya
```

## Exemplo de conexão com o blender

Use a mesma ferramenta e interface de comando com o [adaptador Blender](https://github.com/dcc-mcp/dcc-mcp-blender). A instalação e as ferramentas específicas do Blender permanecem nesse repositório.

```text
Configure o DCC-MCP de modo que você possa controlar o Blender nesta máquina. Instale e siga as instruções fornecidas pelo canal de ensinamento @loonghao/dcc-mcp. Verifique primeiro o CLI atual e o adaptador do Blender. Peça permissão antes de instalar ou alterar o estado do sistema. Abra ou detecte o Blender, verifique o gateway e a instância do Blender em funcionamento. Realize uma busca somente leitura e descreva o fluxo de trabalho. Depois, relate a instância conectada, as capacidades disponíveis e a próxima ação segura que pode ser realizada com o Blender. Não modifique a cena atual durante o processo de configuração.
```

Verifique a conexão com:

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "inspect Blender scene" --dcc-type blender
```

## Como posso criar dez esferas aleatórias no Maya?

Descreva o resultado, em vez de nomear um instrumento de forma arbitrária. Inclua a semente aleatória, os limites, o processo de nomeação e as verificações necessárias.

```text
Use o skill dcc-mcp para conectar-se à minha instância ao vivo do Maya. Em um novo grupo chamado ai_random_spheres, crie exatamente 10 esferas poligonais com o seed determinístico 42. Dê a cada esfera um nome único e coloque-a em uma posição aleatória dentro dos limites X -10..10, Y 0..10, Z -10..10, evitando interseções visíveis. Não exclua nem substitua o conteúdo da cena existente. Descubra as ferramentas do Maya primeiro, siga cada next_step retornado, e depois verifique o número final de esferas, nomes, transformações e membresia no grupo. Mostre-me as evidências e não salve a cena até que eu peça.
```

## Eu quero criar um jogo. Por onde devo começar?

Defina um ciclo jogável. Em seguida, escolha entre [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal), [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) ou [Godot](https://github.com/dcc-mcp/dcc-mcp-godot). Use o [Marketplace](/pt/marketplace) para obter recursos opcionais. Verifique as licenças antes de utilizá-los. O [Showcase](/pt/examples) contém exemplos de prompts que podem ser usados.

```text
Ajude-me a criar um pequeno jogo jogável com o DCC-MCP. Primeiro, peça-me informações sobre o motor de desenvolvimento utilizado (Unreal, Unity ou Godot), a plataforma alvo, o estilo visual do jogo e uma sequência de comandos que permita o funcionamento do jogo. Reduza a ideia para um único nível e uma condição de sucesso ou fracasso. Consulte os DCCs conectados e o motor de desenvolvimento utilizado; descubra as ferramentas disponíveis e procure no Marketplace oficial qualquer recurso necessário para o desenvolvimento do jogo. Peça permissão antes de instalar pacotes, baixar recursos ou alterar o estado do sistema. Crie a menor versão possível do jogo, execute-a, verifique os controles e a sequência de comandos, capture as informações relevantes e relate o projeto e os caminhos utilizados para a construção do jogo. Não declare que o trabalho está concluído sem que o jogo esteja pronto para ser jogado.
```

## Como edito fotos usando a tecnologia AI?

Use o [adaptador do Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) para realizar retoques, correção de cores, criação de máscaras, criação de camadas e exportação dos arquivos. Indique o que precisa ser alterado, o que deve permanecer inalterado, e o formato de saída necessário.

```text
Use a habilidade “dcc-mcp” para se conectar ao Photoshop e me ajudar a editar essa imagem. Primeiro, indique o que precisa ser alterado, o que deve permanecer inalterado, o visual de referência e o formato de entrega da imagem. Preserve o documento original, use novos layers, camadas de ajuste, máscaras ou Smart Objects, quando possível. Nunca aplique ajustes ou sobrescreva a imagem sem minha aprovação. Descubra as ferramentas do Photoshop, faça um primeiro contorno da imagem, compare o resultado com as especificações fornecidas, verifique as dimensões, o modo de cor, a estrutura dos layers e os recursos que estão faltando. Depois, exporte a imagem para um novo formato, somente depois que eu aprovar a visualização da imagem.
```

## Como posso editar ou compor um filme utilizando a AI?

Use o [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) para edição de cronogramas, o [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) para gráficos em movimento e trabalho com camadas, e o [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) para composição baseada em nós. Mantenha a tarefa na aplicação que é responsável pelo fluxo de trabalho.

```text
Use a habilidade “dcc-mcp” para me ajudar a editar ou compor este filme. Primeiro, determine se a tarefa envolve edição de cronograma no Premiere, criação de gráficos em movimento no After Effects, ou composição de layers no Nuke. Identifique os materiais de origem e confirme as resolução, taxa de quadros, espaço de cor, requisitos de áudio e o destino da entrega do filme. Preserve os arquivos de origem, crie um novo projeto ou sequência, descubra as ferramentas disponíveis, complete uma cena representativa, faça a renderização de uma prévia do filme, verifique os materiais faltantes e o intervalo de quadros. Informe-se sobre os caminhos do projeto e da prévia do filme. Peça permissão antes de instalar codecs ou plugins, religar os materiais ou iniciar a renderização final.
```

## Como posso criar efeitos visuais usando a IA?

Use o [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) para a geometria procedural e simulações. Use o Nuke ou o After Effects para a composição das imagens. E use o [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) para efeitos em tempo real. Identifique a aplicação responsável pelo processamento das informações antes de criar uma imagem de teste.

```text
Use a habilidade “dcc-mcp” para me ajudar a criar um efeito visual. Primeiro, peça informações sobre o tipo de efeito, referência, duração, câmera utilizada, formato de apresentação, e se o efeito deve ser processado pelo Houdini, Nuke ou After Effects Compositing. Também é necessário determinar se o efeito deve ser processado em tempo real pelo Unreal VFX. Identifique os hosts conectados, descubra as ferramentas disponíveis e proposte uma configuração minimamente adequada para a criação do efeito. Mantenha os controles editáveis, preserve as placas de origem e as cenas envolvidas no processo de criação do efeito. Faça o renderização apenas quando necessário, produza uma prévia do resultado, verifique os tempos, as escalas, o espaço de cor e as dependências ausentes. Além disso, informe os caminhos para o cache e a prévia do resultado. Peça permissão antes de baixar recursos, instalar plugins ou iniciar um processo de renderização complexo.
```

## Por que usar o DCC-MCP em vez de solicitar um script?

Os scripts continuam sendo úteis para trabalhos únicos. O DCC-MCP inclui funcionalidades como descoberta de dados, validação de argumentos, roteamento de instâncias, identificação de pedidos e diagnósticos, quando o mesmo fluxo de trabalho precisa ser repetido. Para saber mais sobre os passos de operação, consulte [For Agents](/pt/agents).
