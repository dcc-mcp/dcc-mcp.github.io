---
title: "Integrações com aplicativos de criação"
description: "Encontre o adaptador MCP, o identificador da CLI e o repositório oficial do seu aplicativo de criação."
pageClass: integrations-page
outline: [2, 3]
---

# Integrações com aplicativos de criação

O DCC-MCP conecta os agentes de IA ao software de criação de conteúdo digital que sua equipe já utiliza. Este diretório relaciona cada aplicação suportada ao seu repositório oficial de adaptadores, além dos termos de busca comuns utilizados pelas pessoas, como **Maya MCP**, **Blender MCP**, **Houdini MCP**, **3ds Max MCP**, **Substance Painter MCP** e **SP MCP**.

Use a [plataforma oficial](https://clawhub.ai/loonghao/skills/dcc-mcp) para operar um DCC conectado. Use o [Marketplace de Skills](/pt/marketplace) para encontrar extensões para o fluxo de trabalho. E use [`dcc-mcp-cli dcc-types`](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference) para visualizar o catálogo de recursos disponíveis na versão atual do DCC.

## Diretório oficial do DCC MCP

A tabela apresenta uma seleção de integrações. O catálogo do Core 0.20.39 inclui 38 identificadores de adaptadores, entre eles o Wwise. Consulte o catálogo instalado com `dcc-mcp-cli dcc-types`. [Diretório de projetos DCC-MCP](/pt/ecosystem)

| Aplicação | Termos de busca comuns | Integração oficial |
| --- | --- | --- |
| 3ds Max | 3ds Max MCP, 3dsmax MCP | [dcc-mcp-3dsmax](https://github.com/dcc-mcp/dcc-mcp-3dsmax) |
| After Effects | After Effects MCP, AE MCP | [dcc-mcp-aftereffects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) |
| Blender | Blender MCP | [dcc-mcp-blender](https://github.com/dcc-mcp/dcc-mcp-blender) |
| Godot | Godot MCP | [dcc-mcp-godot](https://github.com/dcc-mcp/dcc-mcp-godot) |
| Houdini | Houdini MCP | [dcc-mcp-houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) |
| Katana | Katana MCP | [dcc-mcp-katana](https://github.com/dcc-mcp/dcc-mcp-katana) |
| Maya | Maya MCP, Autodesk Maya MCP | [dcc-mcp-maya](https://github.com/dcc-mcp/dcc-mcp-maya) |
| Marmoset Toolbag | Marmoset MCP, Toolbag MCP | [dcc-mcp-marmoset](https://github.com/dcc-mcp/dcc-mcp-marmoset) |
| MotionBuilder | MotionBuilder MCP, MoBu MCP | [dcc-mcp-mobu](https://github.com/dcc-mcp/dcc-mcp-mobu) |
| Nuke | Nuke MCP | [dcc-mcp-nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) |
| OpenUSD | OpenUSD MCP, USD MCP | [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) |
| Photoshop | Photoshop MCP, Adobe Photoshop MCP | [dcc-mcp-photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) |
| Premiere Pro | Premiere MCP, Premiere Pro MCP | [dcc-mcp-premiere](https://github.com/dcc-mcp/dcc-mcp-premiere) |
| RenderDoc | RenderDoc MCP | [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) |
| Flow Production Tracking | ShotGrid MCP, Flow Production Tracking MCP | [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) |
| Substance 3D Designer | Substance Designer MCP, SD MCP | [dcc-mcp-substance3d-designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) |
| Substance 3D Painter | Substance 3D Painter MCP, Substance Painter MCP, SP MCP | [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) |
| Unity | Unity MCP | [dcc-mcp-unity](https://github.com/dcc-mcp/dcc-mcp-unity) |
| Unreal Engine | Unreal MCP, Unreal Engine MCP | [dcc-mcp-unreal](https://github.com/dcc-mcp/dcc-mcp-unreal) |
| Wwise | Wwise MCP, audio MCP | [dcc-mcp-wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) |
| ZBrush | ZBrush MCP | [dcc-mcp-zbrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) |

## Busca comum do DCC MCP

### Existe um certificado MCP da civilização Maia?

Sim. A integração oficial do [Maya MCP](https://github.com/dcc-mcp/dcc-mcp-maya) conecta o Autodesk Maya ao DCC-MCP Gateway. Use a busca e os fluxos de chamadas para descobrir as ferramentas disponíveis na instância do Maya conectada.

### Existe um Blender MCP?

Sim. A integração oficial do [Blender MCP](https://github.com/dcc-mcp/dcc-mcp-blender) conecta o Blender ao mesmo Gateway e suporta o processo de descoberta, validação e contratos de fluxo de trabalho compartilhados entre DCC e MCP.

### Existe um Houdini MCP?

Sim. A integração oficial do [Houdini MCP](https://github.com/dcc-mcp/dcc-mcp-houdini) fornece o repositório e a implementação específica para o host SideFX Houdini.

### O que significa SP MCP?

**SP MCP** é uma abreviação comum para **Substance Painter MCP**. O nome oficial é **Substance 3D Painter MCP**, fornecido pelo repositório [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter). Use esse repositório e o DCC-MCP Marketplace quando precisar de ferramentas para criar texturas.

### Como posso encontrar uma ferramenta DCC MCP?

Instale a skill pública DCC-MCP. Para confirmar o gateway, use `dcc-mcp-cli health`. Para limitar a busca, use `dcc-mcp-cli search --query <intent> --dcc-type <host>`. Em seguida, siga o `next_step` retornado. Leia o repositório de adaptadores específicos para o host para obter detalhes de instalação e compatibilidade.

## Continue.

- [Use o DCC-MCP por meio de um agente.](/pt/agents)
- [Procure no mercado de habilidades.](/pt/marketplace)
- [Entenda o modelo de produção.](/pt/why-dcc-mcp)
- [Navegue pelo ecossistema completo.](/pt/ecosystem)
