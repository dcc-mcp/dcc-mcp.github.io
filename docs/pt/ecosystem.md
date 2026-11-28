---
title: "Diretório de projetos DCC-MCP"
description: "Consulte a finalidade, o estado e o repositório oficial de adaptadores, Skills, provedores de assets e serviços de geração."
pageClass: ecosystem-directory
outline: [2, 2]
---

# Diretório de projetos DCC-MCP

Este diretório lista ferramentas criativas para agentes de AI e automação. DCC significa criação de conteúdo digital. Comece com o guia de fluxo de trabalho da Skill pública [`dcc-mcp`](https://clawhub.ai/loonghao/skills/dcc-mcp). Depois, escolha o adaptador ou extensão mais adequado para sua tarefa. Cada projeto detalha sua própria instalação, compatibilidade e APIs de aplicação. O Core, por sua vez, descreve a infraestrutura de conexão e invocação compartilhada. Uma ferramenta tipada define seus parâmetros, seus tipos e os resultados obtidos, de modo que a chamada possa ser verificada e validada.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>Operar com softwares criativos</strong><span>Habilidade em dcc-mcp</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>Crie um adaptador.</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>Construa uma habilidade.</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## Infraestrutura compartilhada e ferramentas de pipeline

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) – Gateway compartilhado, interface de comando, runtime MCP/REST, funcionalidades de segurança, diagnósticos e capacidade de observação.
- [dcc-mcp-runtime](https://github.com/dcc-mcp/dcc-mcp-runtime) – Ambiente de execução compartilhado em Python, além de um contrato de manifesto para adaptadores DCC-MCP externos.
- [Pesquisa no mercado](/pt/marketplace) – Realize a pesquisa no catálogo oficial de extensões utilizado pelo `dcc-mcp-cli`; [Fonte do catálogo](https://github.com/dcc-mcp/marketplace).
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) – Integração com o Autodesk Flow Production Tracking.
- [fpt-cli](https://github.com/dcc-mcp/fpt-cli) – Uma ferramenta de linha de comando para Rust, focada na automação, desenvolvida para o Autodesk Flow Production Tracking.
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) – Fluxos de trabalho e intercâmbio de habilidades relacionadas ao OpenUSD.
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) – Intercâmbio de materiais e desenvolvimento do MaterialX.
- [dcc-lookdev](https://github.com/dcc-mcp/dcc-lookdev) – Fluxos de trabalho padronizados para o desenvolvimento de interfaces PBR entre diferentes sistemas DCC.
- [dcc-modeling-spec](https://github.com/dcc-mcp/dcc-modeling-spec) – Especificações de modelagem neutra em relação ao host, versão 2. Essas especificações são utilizadas para o gerenciamento de arquivos e objetos relacionados aos fluxos de trabalho do Maya, Blender, Houdini e 3ds Max.
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) – Manifests de publicação portáteis para DCC, USD, fazendas de renderização e fluxos de trabalho de rastreamento.
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) – Fluxos de trabalho para texturas no formato OpenImageIO e OpenColorIO, de forma determinística.
- [dcc-itchio](https://github.com/dcc-mcp/dcc-itchio) – Habilidades para a aquisição segura de ativos no itch.io e para a publicação de jogos com versões preliminares disponíveis para jogadores.
- [dcc-media-enhance](https://github.com/dcc-mcp/dcc-media-enhance) – Orquestração em Rust, com foco no agente, para a eliminação de ruídos e aprimoramento de mídias, utilizando backends instalados.
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) – É uma habilidade do mercado neutro em relação ao host, projetada para inspeção de caches offline, com segurança de privacidade. Não possui adaptador ou pacote no PyPI.
- [mcpcall](https://github.com/dcc-mcp/mcpcall) – Uma interface de linha de comando para listar e chamar as ferramentas do servidor MCP, utilizando a porta standard de entrada/saída ou o protocolo HTTP Streamable.
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) – Captura e reprodução automática de documentos.
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) – Captura e análise de dados por meio do programa Tracy Frame-Profiler.

## DCC e adaptadores de aplicação criativa

Para perguntas relacionadas ao controle de linguagem natural e para prompts seguros do agente, comece utilizando as [instruções de controle de AI específicas para a aplicação](/pt/use-cases). Em seguida, utilize o repositório de adaptadores vinculado como fonte de informações para a instalação e detalhes sobre o host.

O catálogo remoto assinado, verificado pelo CLI oficial 0.20.39, lista 38 identificadores de adaptadores. A instalação do catálogo está disponível para 33 dos adaptadores mencionados; os adaptadores `kdenlive`, `material-maker`, `powerpoint`, `tiled` e `wwise` têm o valor `catalog_install_available=false`. Uma definição de catálogo ou uma versão independente do adaptador não estabelece um host real ou a aceitação da produção final.

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) – Autodesk 3ds Max.
- [3D Slicer](https://github.com/dcc-mcp/dcc-mcp-slicer) – Volumes sintéticos com limites definidos, fantômenos de materiais, e malhas de esferas com exportação para formatos NRRD/STL. Também inclui funcionalidades como transporte de cenas para o sistema MRB, configuração de câmeras e cortes de imagens, além de pré-visualizações em formato PNG. São dados sintéticos apenas; não há dados do paciente, importação de arquivos DICOM, informações clínicas ou carregamento de cenas arbitrárias. O recurso “Source Candidate” está fixado no Core e no servidor 0.20.41. A requalificação nativa ainda está pendente. Não é um identificador de adaptador no catálogo, conforme verificado pelo CLI 0.20.39.
- [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) – Adobe After Effects.
- [AutoCAD](https://github.com/dcc-mcp/dcc-mcp-autocad) – Automação de arquivos DWG de forma portátil, por meio do COM e do programa `accoreconsole.exe`. Verifique no repositório responsável pela disponibilidade e configuração do software.
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) – Um complemento do Blender, além de ser um servidor incorporado no próprio programa.
- [CapCut](https://github.com/dcc-mcp/dcc-mcp-capcut) – Adaptador de desktop do CapCut, utilizando uma ponte local autenticada.
- [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) – Documento escrito sem elementos de formatação, com funcionalidades de intercâmbio de dados e automação da renderização.
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) – Validação de nós ao vivo, execução de enquetes limitadas e recuperação de artefatos. O guia [ComfyUI MCP](/pt/control/comfyui) aborda a interface do usuário local, formatos PNG transparentes, além de arquivos GLB criados com o Pixal3D/PBR. O guia também explica como os códigos fonte podem ser utilizados em comparação com os arquivos de lançamento do jogo.
- [O Epic Games Launcher e o Fab](https://github.com/dcc-mcp/dcc-mcp-epic) — foram lançados independentemente na versão v0.2.1 ([fonte do lançamento](https://github.com/dcc-mcp/dcc-mcp-epic/tree/1157defe203aab4beaa8f7be56f8063caac2a415)) para o inventário do motor instalado, verificações de projetos e operações realizadas pelo Fab. Não se trata de um identificador de adaptador no catálogo verificado pelo CLI 0.20.39. A instalação do motor continua sendo apenas um plano, sem um provedor nativo verificado. Login, CAPTCHA, compras e aceitação da licença continuam a ser realizados por humanos. Consulte o [guia de controle da Epic Games](/pt/control/epic-games).
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) – Modelagem CAD paramétrica, validação de topologia e troca de malhas.
- [Gaea](https://github.com/dcc-mcp/dcc-mcp-gaea) – Lançado de forma independente, na versão v0.1.1 ([fonte do lançamento](https://github.com/dcc-mcp/dcc-mcp-gaea/tree/b95d3f81b8f883732c73d268658100d09d9cad84)). Permite a execução de tarefas de construção de terrenos e a verificação dos resultados obtidos. Não é um identificador de adaptador, conforme verificado pelo CLI 0.20.39. As construções licenciadas, a cancelação das árvores de processamento, a qualidade do terreno e as importações de dados do Unreal ainda não foram verificadas. Consulte o [guia de controle do Gaea](/pt/control/gaea).
- [GameMaker](https://github.com/dcc-mcp/dcc-mcp-gamemaker) – Adaptador para o GameMaker. Não é um identificador de adaptador no catálogo verificado pelo CLI 0.20.39.
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) – GIMP 3.
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) – O Godot Engine e as habilidades necessárias para criar jogos 2D.
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) – SideFX Houdini.
- [Ilustrador](https://github.com/dcc-mcp/dcc-mcp-illustrator) – Processa documentos do Adobe Illustrator, trabalhos de arte vetorial, edição oficial de dados DOM, e exportação de produtos finalizados.
- [Inkscape](https://github.com/dcc-mcp/dcc-mcp-inkscape) – A integração da fonte fora do catálogo foi verificada pelo CLI 0.20.39. O fluxo de trabalho de produção do cloud MCP continua bloqueado devido à validação da origem dos dados; veja o [registro de teste do cloud](/pt/cloud-agents#cloud-mcp-tests).
- [Katana](https://github.com/dcc-mcp/dcc-mcp-katana) – Foundry Katana.
- [Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive) – Permite criação de projetos, renderização de mídias em formato MLT, e controle de editor DCC-CUA compartilhado. O repositório lançou independentemente a versão v0.1.1 ([fonte do lançamento](https://github.com/dcc-mcp/dcc-mcp-kdenlive/tree/376c812047b308239174aa1bbb662da1908f829e)); o catálogo verificado pelo CLI 0.20.39 lista `kdenlive` na versão 0.1.0, com `catalog_install_available=false`. Essa verificação do catálogo não incluiu a aceitação do editor ou da renderização em tempo real. Consulte o [guia de controle do Kdenlive](/pt/control/kdenlive).
- [KiCad](https://github.com/dcc-mcp/dcc-mcp-kicad) – É um programa que permite o trabalho com placas de circuito impresso no KiCad 9, utilizando a API nativa `pcbnew` e o comando `kicad-cli`. Ele possui uma placa isolada, em vez de se conectar ao Editor de Placas de Circuito Impresso ou fornecer controle através de interface gráfica. A fonte do programa está fixada no Core e no servidor 0.20.41. A requalificação nativa ainda está pendente. Não há lançamento oficial, e não existe identificador de adaptador no catálogo, conforme confirmado pelo CLI 0.20.39.
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) – Krita.
- [LiquiGen](https://github.com/dcc-mcp/dcc-mcp-liquigen) — Inspeção de grafo de nós digitados, controles de simulação limitados, exportação de dados fiscais e transferência de dados para o Unreal Engine; listado como `liquigen` no catálogo verificado pelo CLI 0.20.39.
- [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) – Projetos da Foundry Mari, geometria, grafos de nós, desenvolvimento de aparência e exportação de texturas.
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) – É o processo de criação de materiais. O catálogo verificado pelo CLI 0.20.39 lista a versão 0.3.1, com o valor `catalog_install_available=false`.
- [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) – Autodesk Maya.
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) – Autoria de materiais PBR, inspeção de cenas e renderização.
- [Marvelous Designer](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer) – Lançado de forma independente, na versão v0.1.1 ([fonte do lançamento](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer/tree/4d4d289905f82290804b288d03d84d541b01af08)). Permite operações de digitação de dados, simulação, salvamento e exportação de dados. Não é um identificador de adaptador, conforme confirmado pelo CLI 0.20.39. As funcionalidades como licenciamento, inicialização do Qt, simulação de tecidos e transferência de processamento ainda não estão completamente desenvolvidas. Consulte o [guia de controle do Marvelous Designer](/pt/control/marvelous-designer).
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) – Autodesk MotionBuilder.
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) – Foundry Nuke.
- [OBS Studio](https://github.com/dcc-mcp/dcc-mcp-obs) — Controle exato da inspeção da cena/fonte e do registro de texto; listado como `obs` no catálogo verificado pelo CLI 0.20.39. A instalação do adaptador não instala o OBS Studio.
- [Office](https://github.com/dcc-mcp/dcc-mcp-office) usa a rota compartilhada `office`, com o protocolo office-rpc/1, um processo auxiliar COM em C#, um worker Open XML, um conector Microsoft Graph e Skills para o Office. A CLI 0.20.39 informa 38 identificadores de adaptadores. A rota compartilhada fica fora dessa lista e cada adaptador documenta a disponibilidade específica do aplicativo.
- [PowerPoint](https://github.com/dcc-mcp/dcc-mcp-powerpoint) – Geração de decks a partir do formato Deck IR, utilizando a compilação do formato Open XML e a renderização no ambiente desktop COM. O catálogo verificado pelo CLI 0.20.39 indica que a versão disponível é 0.1.0, com o valor `catalog_install_available=false`.
- [Word](https://github.com/dcc-mcp/dcc-mcp-word) – Documentos do tipo Word, campos de dados e recursos relacionados ao redimensionamento dos elementos do documento. O repositório do adaptador ainda é um espaço reservado, sem qualquer versão pronta para uso.
- [Excel](https://github.com/dcc-mcp/dcc-mcp-excel) – Livros de trabalho, fórmulas, gráficos e painéis de controle de produção. Está planejado que isso seja implementado no futuro; o repositório do adaptador ainda é apenas um espaço reservado, sem nenhuma versão pronta para uso.
- [Outlook](https://github.com/dcc-mcp/dcc-mcp-outlook) – Rascunhos de e-mails e calendário (planejado, Fase 3); classificado como `host_limited`. Ele utiliza o Outlook instalado localmente, através do MAPI/COM. É necessário o consentimento do usuário na primeira execução do programa. Portanto, não possui um caminho de execução sem interação com o usuário. Não pode ser verificado durante o processo de teste, e está isento da verificação necessária para o processo de teste. Um caminho baseado no Microsoft Graph seria uma condição prévia para que o programa possa ser verificado durante o processo de teste.
- [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) – Solução para validação de projetos paramétricos em CAD, visualização prévia dos resultados e exportação de malhas de modelagem.
- [OpenScreen](https://github.com/dcc-mcp/dcc-mcp-openscreen) – Versão independente, versão 0.1.1 ([fonte da versão](https://github.com/dcc-mcp/dcc-mcp-openscreen/tree/5a32837d9d1b3bd2aea04bf61e61b4a54bbd5262)). Possui funções como “`sources`”, “`record`” e “`export`”. Não é um identificador de adaptador, e não está sendo verificado pelo CLI 0.20.39. Os testes de fonte não confirmam a aceitação da gravação em Windows real. A seleção de janelas não suportada continua a ser responsabilidade de dcc-cua e ui-control. Consulte o [guia de controle do OpenScreen](/pt/control/openscreen).
- [ParaView](https://github.com/dcc-mcp/dcc-mcp-paraview) – Conjuntos de pipelines persistentes do ParaView: primitivos limitados, clipes e fatias de planos, extração de contornos, exportação de dados verificados, salvamento de estados do PVSM, e visualizações em formato PNG. A fonte do código está fixada no Core e no servidor 0.20.41. A requalificação nativa ainda está pendente. Não há lançamento publicado, e o identificador do adaptador não foi verificado pelo CLI 0.20.39.
- [PhotoCraft](https://github.com/dcc-mcp/dcc-mcp-photocraft) – É um adaptador experimental para o motor oficial PhotoCraft 0.2.0. Ele possui um processo stdio para lidar com documentos, camadas, máscaras, seleções, ajustes, visualizações e exportações. Não inclui nenhuma aplicação adicional e não abre janelas no ambiente de trabalho. Não é considerado um adaptador no catálogo verificado pelo CLI 0.20.39.
- [PdfCraft](https://github.com/dcc-mcp/dcc-mcp-pdfcraft) – Adaptador PdfCraft; não é um identificador de adaptador no catálogo verificado pelo CLI 0.20.39.
- [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) – Adobe Photoshop, usando o UXP.
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) – Adobe Premiere Pro.
- [QGIS](https://github.com/dcc-mcp/dcc-mcp-qgis) – É um projeto de edição de vetores no QGIS, desenvolvido com base em MCP. Funciona como um processo PyQGIS sem interface gráfica, propriedade do adaptador. Não se conecta a uma sessão de trabalho do QGIS em execução. A fonte do projeto está fixada no Core e no servidor 0.20.41. É necessário realizar a revalidação nativa do projeto. Não existe pacote no PyPI ou no GitHub. Além disso, não há identificador de adaptador no catálogo verificado pela CLI 0.20.39.
- [REAPER](https://github.com/dcc-mcp/dcc-mcp-reaper) – Adaptador REAPER DAW. Não é um identificador de adaptador, conforme verificado pelo catálogo, com o uso do CLI 0.20.39.
- [RizomUV](https://github.com/dcc-mcp/dcc-mcp-rizomuv) – Processamento de arquivos UV sem cabeça; não é um identificador de adaptador no catálogo verificado pelo CLI 0.20.39.
- [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) – Permite a criação de modelos, definição de materiais, adição de etiquetas, organização de cenas, verificação de dados e intercâmbio de informações, tudo isso por meio de uma conexão Ruby autenticada.
- [Shōgun](https://github.com/dcc-mcp/dcc-mcp-shogun) – Ferramentas oficiais do SDK, desenvolvidas para lidar com objetos de cena, atributos, canais, câmeras ópticas, arquivos, controle da linha do tempo, além de configurações e operações relacionadas ao processamento off-line. Descubra as ferramentas disponíveis na versão live antes de começar a usá-las.
- [SpeedTree](https://github.com/dcc-mcp/dcc-mcp-speedtree) – Versão independente v0.1.1 ([fonte da versão](https://github.com/dcc-mcp/dcc-mcp-speedtree/tree/595f0bd308aa0f4f0635a399c2b63bd76f16caf8)), que oferece a capacidade de conexão entre instâncias exatas e pontos oficiais. Não se trata de um identificador de adaptador, conforme verificado pelo CLI 0.20.39. Uma transferência real entre ST9 e Unreal Engine 5.5.4 foi verificada com sucesso. A escala de colisões e o vento dinâmico ainda não foram verificados. Veja o [guia do SpeedTree MCP](/pt/control/speedtree).
- [DaVinci Resolve](https://github.com/dcc-mcp/dcc-mcp-resolve) – É um adaptador de DaVinci Resolve, utilizado para inspeção de projetos, conjuntos de mídia, cronogramas e galerias de imagens. Não é um identificador de adaptador, conforme verificado pelo CLI 0.20.39.
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) – Adobe Substance 3D Designer.
- [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) – Adobe Substance 3D Painter.
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) – Editor de mapas Tiled. O catálogo verificado pelo CLI 0.20.39 lista a versão 0.3.0, com o parâmetro `catalog_install_available=false`.
- [Tracy Profiler](https://github.com/dcc-mcp/dcc-mcp-tracy) – É um adaptador lançado de forma independente, na versão 0.2.5 ([Source do lançamento](https://github.com/dcc-mcp/dcc-mcp-tracy/tree/a5e29b7bcef28ccd6a2ee17667dbdbcb7c45b119)). Ele permite a captura de dados de forma limitada e a análise de zonas offline. Não é um identificador de adaptador no catálogo verificado pelo CLI 0.20.39. É necessário que o alvo seja já equipado com instrumentos de medição. Veja o [guia de controle do Tracy](/pt/control/tracy).
- [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) – Um derivado do TouchDesigner.
- [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) – Editor de Unity e habilidades de criação de jogos.
- [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) – Um plug-in do Unreal Engine.
- [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) – É um sistema de criação de catálogos desenvolvido pela Audiokinetic Wwise, utilizando ferramentas WAAPI. O catálogo verificado pelo CLI 0.20.39 indica a versão 0.1.2, com o parâmetro `catalog_install_available=false`.
- [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) – Maxon ZBrush.

## Habilidades especializadas dos maias

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) – Fluxos de trabalho relacionados ao uso do AdvancedSkeleton.
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) – Integração com o mGear Shifter.
- [Arquitetura procedural](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) – Fluxos de trabalho da Maya, Bifrost e Arnold.

## Serviços de geração

Para a geração local, consulte o [ fluxo de trabalho do ComfyUI para jogos](/pt/control/comfyui).

- [Hunyuan 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) – Texto e imagem transformados em conteúdo 3D.
- [OpenAI Image](https://github.com/dcc-mcp/dcc-ai-openai-image) – Geração e edição de imagens para fluxos de trabalho de textura do DCC.
- [Tripo 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) – Texto, imagem e vistas múltiplas para geração em 3D.

## Fornecedores de ativos

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Extensões do Blender](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [Mídias Grátis](https://github.com/dcc-mcp/dcc-asset-free-media)
- [Geoespacial](https://github.com/dcc-mcp/dcc-asset-geospatial) · [Exemplos de Ativos GLTF](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [Objetos escaneados pelo Google](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [Kenney](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [Objaverse](https://github.com/dcc-mcp/dcc-asset-objaverse) · [Poly Haven](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [Quaternius](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)
- [Pirate Nation](https://github.com/dcc-mcp/dcc-asset-pirate-nation) – Fornecedor de recursos para jogos.
- [Poly Pizza](https://github.com/dcc-mcp/dcc-asset-poly-pizza) – Modelos de baixa poligonal para pesquisa e download, com licença de uso dos recursos disponíveis, além de registros que comprovam a origem desses recursos.

## Automação do interface do usuário e tempo de execução compartilhado

- [winget-releaser](https://github.com/dcc-mcp/winget-releaser) – Ferramenta para automação das versões do pacote do Windows, desenvolvida para os mantenedores de aplicações.
- [Qt Actions](https://github.com/dcc-mcp/dcc-ui-qt-actions) – Ações reutilizáveis, desenvolvidas para interfaces DCC baseadas em Qt.
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) – Descoberta de janelas e widgets em hosts diferentes.
- [Memória do Fluxo de Trabalho do UI](https://github.com/dcc-mcp/dcc-ui-workflow-memory) – Seletores verificados, receitas e informações sobre falhas.
- [dcc-mcp-filmcraft](https://github.com/dcc-mcp/dcc-mcp-filmcraft) – Integração com o programa Experimental FilmCraft: um SDK de navegação para o mesmo editor de documentos WebAssembly.
- [adobepy](https://github.com/dcc-mcp/adobepy) – Ambiente de execução compartilhado para comunicação em desktops da Adobe.

## Organização e superfícies de descoberta

Abaixo estão listadas outras opções de descoberta. Verifique o catálogo do CLI instalado para saber se as opções estão disponíveis. Um repositório ou conector remoto sozinho não permite a criação de uma instância de aplicação ativa.

- [Autodesk Product Help](https://developer.api.autodesk.com/knowledge/public/v1/mcp) – É um conector de documentação de leitura exclusiva, externo ao sistema. É identificado como “`autodesk-help`”. Ele está separado dos 38 identificadores de adaptadores reportados pelo CLI 0.20.39. Além disso, não se trata de uma rota de alteração de aplicação.

- [Fonte do site oficial](https://github.com/dcc-mcp/dcc-mcp.github.io) – Documentação compartilhada, metadados de GEO, guias de aplicação e demonstrações de produtos.
- <a href="https://dcc-mcp.github.io/showcase/" target="_self">Coleção de Exposição</a> – Trabalho concluído: prompts reutilizáveis, fontes de informações para o projeto, licenças necessárias, e evidências explícitas da produção do trabalho. [Fonte das informações e contribuições](https://github.com/dcc-mcp/showcase). [Exemplos de adaptadores e prompts](/pt/examples) mantêm seu escopo de evidências original.
- [Plug-ins para agentes](https://github.com/dcc-mcp/dcc-mcp-agent-plugins) – Habilidades e pacotes de plugins compatíveis com os clientes de agentes, conforme definido pelo DCC-MCP.
- [dcc-cua](https://github.com/dcc-mcp/dcc-cua) – Ferramenta de automação do uso de computadores em diferentes plataformas, utilizada nos fluxos de trabalho de interface de usuário DCC.
- [Perfil da organização](https://github.com/dcc-mcp/.github) – Perfil compartilhado no GitHub e configurações da comunidade.

> A disponibilidade do projeto e o suporte à instalação podem mudar entre as diferentes versões do catálogo. Use o comando `dcc-mcp-cli --json dcc-types` para verificar a fonte atual do catálogo, as versões dos adaptadores e os parâmetros de instalação. Além disso, use o comando `dcc-mcp-cli marketplace search` para encontrar extensões que podem ser instaladas.
