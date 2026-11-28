---
title: "制作ソフトとの連携"
description: "制作ソフトごとの MCP アダプタと CLI の識別子を調べ、対応する公式リポジトリを参照できます。"
pageClass: integrations-page
outline: [2, 3]
---

# 制作ソフトとの連携

DCC-MCPは、AIエージェントを、チームが既に使用しているデジタルコンテンツ作成ソフトウェアに接続します。このディレクトリでは、各サポートされているアプリケーションが、その公式なアダプターリポジトリに対応していることが示されています。また、一般的に使われる検索用語も記載されており、例えば**Maya MCP**、**Blender MCP**、**Houdini MCP**、**3ds Max MCP**、**Substance Painter MCP**、**SP MCP**などがあります。

[公式サイト](https://clawhub.ai/loonghao/skills/dcc-mcp)を使用して、接続されたDCCを操作します。また、[スキルマーケットプレイス](/ja/marketplace)を利用して、ワークフローの拡張機能を見つけることができます。さらに、`[`dcc-mcp-cli dcc-types``](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)を使って、実際に利用可能なカタログを確認することもできます。

## 公式のDCC MCPディレクトリ

この表では主な連携先を紹介します。Core 0.20.39 のカタログには Wwise を含む 38 件のアダプタ識別子があります。利用中の環境では `dcc-mcp-cli dcc-types` で確認してください。 [DCC-MCP プロジェクト一覧](/ja/ecosystem)

| アプリケーション | 一般的な検索キーワード | 公式的な統合 |
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

## 一般的なDCC MCPの検索方法

### Maya MCPという資格は存在しますか？

はい。公式の[Maya MCP統合](https://github.com/dcc-mcp/dcc-mcp-maya)により、Autodesk MayaがDCC-MCP Gatewayに接続されます。入力した検索内容やコールフローを使って、接続されたMayaインスタンスで利用可能なツールを確認できます。

### Blender MCPというものがありますか？

はい。公式の[BlenderとMCPの統合](https://github.com/dcc-mcp/dcc-mcp-blender)により、Blenderは同じGatewayに接続されます。また、共有されるDCC-MCPの検出、認証、ワークフローコントラクトもサポートされています。

### Houdini MCPというものがありますか？

はい。公式の[Houdini MCP統合](https://github.com/dcc-mcp/dcc-mcp-houdini)では、SideFX Houdini用のリポジトリや、ホスト固有の実装が提供されています。

### SP MCPとは、何を意味するのでしょうか？

**SP MCP**とは、**Substance Painter MCP**の略称です。正式な名称は**[dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter)によって提供されている**Substance 3D Painter MCP**です。テクスチャのペインティング作業を行う際には、そのリポジトリやDCC-MCPマーケットプレイスを利用してください。

### どのようにして、DCC MCP用のツールを見つけることができるのでしょうか？

公共のDCC-MCPスキルをインストールし、`dcc-mcp-cli health`を使用してゲートウェイを確認します。次に、`dcc-mcp-cli search --query <intent> --dcc-type <host>`を使用して検索範囲を絞り込みます。その後、返される`next_step`に従ってください。インストールと互換性に関する詳細は、ホスト固有のアダプターリポジトリを参照してください。

## 続けてください。

- [エージェントからDCC-MCPを使用してください。](/ja/agents)
- [スキルマーケットプレイスで検索してください。](/ja/marketplace)
- [生産モデルを理解する必要があります。](/ja/why-dcc-mcp)
- [完全なエコシステムを閲覧してください。](/ja/ecosystem)
