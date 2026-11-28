---
title: "DCC-MCP プロジェクト一覧"
description: "制作ソフトのアダプタ、Skill、アセット提供元、生成サービスの用途と公式リポジトリを調べられます。"
pageClass: ecosystem-directory
outline: [2, 2]
---

# DCC-MCP プロジェクト一覧

[`dcc-mcp` Skill`のワークフローガイドから始めて、自分のタスクに適したアダプターや拡張機能を選択してください。各プロジェクトは、そのプロジェクト独自のインストール方法、互換性、アプリケーションAPIを記述しています。Coreは、共有された接続や呼び出しインフラストラクチャを記述しています。タイプされたツールは、そのパラメータ、型、結果を定義しており、呼び出しが検査され、検証されるようになっています。](https://clawhub.ai/loonghao/skills/dcc-mcp)

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>創造的なソフトウェアを操作する</strong><span>dcc-mcp スキル</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>アダプターを作成しましょう。</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>スキルを身につける</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## 共有されるインフラストラクチャやツール群

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) – 共有ゲートウェイ、CLI、MCP/RESTランタイム、セキュリティ、診断、可視性機能を提供します。
- [dcc-mcp-runtime](https://github.com/dcc-mcp/dcc-mcp-runtime) – 外部のDCC-MCPアダプター用の共有パイソン実行環境およびマニフェストコントラクトです。
- [マーケットプレイス検索](/ja/marketplace) – `dcc-mcp-cli`が使用する公式の拡張機能カタログを検索します。[カタログのソース](https://github.com/dcc-mcp/marketplace)
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) – Autodesk Flow Production Trackingとの統合機能です。
- [fpt-cli](https://github.com/dcc-mcp/fpt-cli) – Autodesk Flow Production Tracking用の、自動化を重視したRust CLIツールです。
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) – OpenUSDのワークフローや交換スキルについて。
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) — MaterialXの開発用のデータ交換サイトです。
- [dcc-lookdev](https://github.com/dcc-mcp/dcc-lookdev) — 各DCC間で標準化されたPBRのロックウィンドウ開発ワークフローです。
- [dcc-modeling-spec](https://github.com/dcc-mcp/dcc-modeling-spec) – ホスト非依存型のモデリング仕様です。Maya、Blender、Houdini、3ds Maxといったツール用のゲートやレビューのためのアーティファクトを含みます。
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) – DCC、USD、レンダリングファーム、トラッキングワークフロー用の、ポータブルなパブリメントマニフェストです。
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) — 確定的なOpenImageIOおよびOpenColorIOのテクスチャワークフローです。
- [dcc-itchio](https://github.com/dcc-mcp/dcc-itchio) – 安全なアセットの取得や、プレビュー段階でのゲームの公開を行うスキルです。
- [dcc-media-enhance](https://github.com/dcc-mcp/dcc-media-enhance) – エージェントフレンドリーなRust言語によるオーケストレーションであり、既存のバックエンドを利用して、メディアのノイズを除去したり、品質を向上させたりすることができます。
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) – ホストに依存しないマーケットプレイス用のスキルです。制限付きで、プライバシーが保護されたオフライン環境でのキャッシュのチェックが可能です。アダプターやPyPIパッケージはありません。
- [mcpcall](https://github.com/dcc-mcp/mcpcall) – CLIツールであり、標準のstdioやStreamable HTTPを通じて、MCPサーバー用のツールを一覧表示したり、呼び出したりすることができます。
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) – RenderDocによるキャプチャと再実行の自動化処理。
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) – トレイシー・フレームプロファイラによるキャプチャおよび分析。

## DCCおよび、創造的なアプリケーションの適用方法

自然言語による制御に関する質問や、安全なエージェントのプロンプトについては、まず[アプリケーション固有のAI制御ガイドライン](/ja/use-cases)を参照してください。その後、リンクされているアダプターリポジトリを、インストールやホストに関する情報の出典として利用してください。

公式のCLI 0.20.39で確認された、署名されたリモートカタログには、38個のアダプター識別子が記載されています。そのうち、33個のカタログのインストールが可能です。一方、`kdenlive`、`material-maker`、`powerpoint`、`tiled`、`wwise`については、`catalog_install_available=false`と表示されています。カタログの定義や、独立したアダプターのリリースによっても、実際に利用可能なホストや、生産的な使用が可能になるわけではありません。

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) – Autodesk 3ds Maxです。
- [3D Slicer](https://github.com/dcc-mcp/dcc-mcp-slicer) – 境界が明確な合成体、材料の仮想モデル、およびNRRD/STL形式でエクスポート可能な球体メッシュ。MRBシーンのリトライ機能、カメラやスライスの設定、PNG形式でのプレビュー機能もあります。合成データのみです。患者データやDICOMファイルのインポート、臨床的なデータの取り込みは行えません。ソースコードはCoreおよびサーバー0.20.41に固定されています。ネイティブな再認証が待たれています。CLI 0.20.39では、カタログ内でこのアダプターの識別子は確認されていません。
- [After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) — アドビ社のAfter Effectsです。
- [AutoCAD](https://github.com/dcc-mcp/dcc-mcp-autocad) – COMインターフェースや、`accoreconsole.exe`を使って、ポータブルなDWGファイルの処理が可能です。現在利用可能かどうか、また設定方法については、該当するリポジトリを確認してください。
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) – Blenderのアドオンであり、埋め込み型のサーバーとしても機能します。
- [CapCut](https://github.com/dcc-mcp/dcc-mcp-capcut) – 認証されたローカルブリッジを使用して、CapCutデスクトップアダプターを入力します。
- [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) – タイプされた、ヘッジレスなドキュメント形式の処理が可能です。また、プリミティブなデータのやり取りや、レンダリングの自動化も可能です。
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) – ノードの有効性を確認する機能、制限付きキューの実行、アーティファクトの取得が可能です。[ComfyUIのMCPガイド](/ja/control/comfyui)では、ローカルゲームのUI、透明なPNGファイルの処理、Pixal3D/PBR GLBファイルの処理について説明されています。また、ソースコードとリリース版の可用性についても説明されています。
- [Epic Games Launcher と Fab](https://github.com/dcc-mcp/dcc-mcp-epic) の独立連携では、インストール済みエンジンの一覧、プロジェクトの確認、公式プロバイダが管理する範囲内での Fab 操作を扱います。[v0.2.1 のソース](https://github.com/dcc-mcp/dcc-mcp-epic/tree/1157defe203aab4beaa8f7be56f8063caac2a415) が公開されています。CLI 0.20.39 で確認したカタログには識別子がありません。ネイティブプロバイダの検証が済むまでは、エンジン導入は計画の作成までにとどめます。ログイン、CAPTCHA、購入、ライセンス確認は利用者が行ってください。[Epic Games 操作ガイド](/ja/control/epic-games)
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) – パラメトリックCADモデリング、トポロジー検証、メッシュの交換が可能です。
- [Gaea](https://github.com/dcc-mcp/dcc-mcp-gaea) は、Build Swarm の地形生成ジョブを型付きツールで実行し、出力を検証するための独立連携です。[v0.1.1 のソース](https://github.com/dcc-mcp/dcc-mcp-gaea/tree/b95d3f81b8f883732c73d268658100d09d9cad84) が公開されています。CLI 0.20.39 で確認したカタログには識別子がありません。ライセンスを持つ環境でのビルド、プロセスツリーのキャンセル、地形の品質、Unreal へのインポートは未検証です。[Gaea 操作ガイド](/ja/control/gaea)
- [GameMaker](https://github.com/dcc-mcp/dcc-mcp-gamemaker) – GameMaker用のアダプターです。CLI 0.20.39でチェックされたカタログには、このアダプターの識別子は含まれていません。
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) — GIMP 3.
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) – Godot Engineと2Dゲームの制作スキル。
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) – SideFX Houdini。
- [イラストレーター](https://github.com/dcc-mcp/dcc-mcp-illustrator) – Adobe Illustratorで作成されたドキュメントやベクターアートワークの編集、公式のDOM操作、および作品のエクスポートを行います。
- [Inkscape](https://github.com/dcc-mcp/dcc-mcp-inkscape) – CLI 0.20.39では、カタログ外のソースの統合が行われていません。クラウドベースのMCP生産ワークフローは、情報源の検証によって妨げられています。詳細については、[クラウドテスト記録](/ja/cloud-agents#cloud-mcp-tests)をご覧ください。
- [カタナ](https://github.com/dcc-mcp/dcc-mcp-katana) — Foundryのカタナです。
- [Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive) – プロジェクトの作成、MLTのレンダリング、そして共有されたDCC-CUAエディターの制御機能を提供します。このリポジトリでは、v0.1.1が既にリリースされています([リリース情報](https://github.com/dcc-mcp/dcc-mcp-kdenlive/tree/376c812047b308239174aa1bbb662da1908f829e))。CLI 0.20.39で確認したカタログには、`kdenlive`のバージョンが0.1.0として記載されており、`catalog_install_available=false`となっています。このカタログの確認では、実際のエディターやレンダリングの検証は行われていません。詳しくは[Kdenliveの操作ガイド](/ja/control/kdenlive)をご覧ください。
- [KiCad](https://github.com/dcc-mcp/dcc-mcp-kicad) – ネイティブの`pcbnew` APIや`kicad-cli`を通じて、ヘッドレスでキーボード入力による作業が可能なKiCad 9用のボード作成ツールです。このツールは、PCBエディターに接続したり、IPC/UIコントロールを提供したりするのではなく、独立したボードを扱います。ソースコードはCoreおよびサーバー0.20.41に固定されており、ネイティブな再認証が待ち望まれています。しかし、現在はリリースされておらず、CLI 0.20.39でカタログ内でアダプターの識別子も確認されていません。
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) – Krita。
- [LiquiGen](https://github.com/dcc-mcp/dcc-mcp-liquigen) – ノードグラフのチェック、制限付きシミュレーションの制御、VATのエクスポート、そしてUnreal Engineとの連携機能を備えています。CLI 0.20.39で確認されたカタログには、`liquigen`として記載されています。
- [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) – FoundryのMariプロジェクトに関する情報。幾何学的構造、ノードグラフ、外観のデザイン、テクスチャのエクスポートなどについて説明しています。
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) – 手続き的な資料の作成方法です。CLI 0.20.39で確認されたカタログには、バージョン0.3.1が記載されており、「`catalog_install_available=false`」という設定があります。
- [Maya](https://github.com/dcc-mcp/dcc-mcp-maya) – Autodesk Maya。
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) – PBR素材の作成、シーンのチェック、レンダリングを行うためのツールです。
- [Marvelous Designer](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer) の独立連携では、衣服の編集、シミュレーション、保存、書き出しに型付きツールを使えます。[v0.1.1 のソース](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer/tree/4d4d289905f82290804b288d03d84d541b01af08) が公開されています。CLI 0.20.39 で確認したカタログには識別子がありません。ライセンス環境での動作、Qt の初期化、クロスシミュレーション、エンジンへの受け渡しは未検証です。[Marvelous Designer 操作ガイド](/ja/control/marvelous-designer)
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) – Autodesk MotionBuilder。
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) — Foundry社のNukeです。
- [OBS Studio](https://github.com/dcc-mcp/dcc-mcp-obs) – エクスプロイス処理によるシーンの検査や、タイプされた録音の制御を行います。CLI 0.20.39で確認したカタログには、`obs`として記載されています。アダプターをインストールしても、OBS Studioはインストールされません。
- [Office](https://github.com/dcc-mcp/dcc-mcp-office) — 共有`office`アプリケーションルート：office-rpc/1プロトコル、C# COMサイドカー、Open XMLワーカー、Microsoft Graphコネクタ、およびOffice全体にわたるスキル。この共有ルートは、CLI 0.20.39で報告されている38のアダプター識別子とは別です。アプリケーション固有の機能は、各アダプターが独自に管理しています。
- [PowerPoint](https://github.com/dcc-mcp/dcc-mcp-powerpoint) – Deck IRからOpen XML形式に変換し、デスクトップ上でCOMレンダリングを行うことで作成されるデッキです。CLI 0.20.39でチェックされたカタログには、バージョン0.1.0が記載されており、「`catalog_install_available=false`」と表示されています。
- [Word](https://github.com/dcc-mcp/dcc-mcp-word) – Wordドキュメント、フィールド、リフロードに関する処理。このアダプターのリポジトリはまだプレースホルダ的な状態であり、実際に利用可能になるまでは何も変更されていません。
- [Excel](https://github.com/dcc-mcp/dcc-mcp-excel) – ワークブック、数式、チャート、およびプロダクション用のダッシュボードです。ただし、このアダプターのリポジトリはまだプレースホルダとしての状態であり、実際に利用可能になるのは後日です。
- [Outlook](https://github.com/dcc-mcp/dcc-mcp-outlook) – メールのドラフトやカレンダー機能です。これは、フェーズ3で実装予定の機能であり、評価は`host_limited`とされています。この機能は、ローカルにインストールされたOutlookをMAPI/COMを通じて制御します。そのため、最初の実行時にユーザーの同意が必要です。したがって、ヘッドレスパスは存在せず、CIでの検証が不可能です。また、CIによる検証の対象外となります。Microsoft Graph経由でのアクセスが必要であり、それによってのみ、CIで検証可能なルートが得られます。
- [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) – 宣言型のパラメトリックCADの検証、プレビューレンダリング、メッシュのエクスポートが可能です。
- [OpenScreen](https://github.com/dcc-mcp/dcc-mcp-openscreen) — v0.1.1として独立してリリースされました ([リリースソース](https://github.com/dcc-mcp/dcc-mcp-openscreen/tree/5a32837d9d1b3bd2aea04bf61e61b4a54bbd5262))。タイプ入力による`sources`、`record`、`export`操作が可能です。これは、CLI 0.20.39でチェックされるカタログ内のアダプター識別子ではありません。ソーステストでは、実際のWindowsでの録画の受け入れが確認されていません。サポートされていないウィンドウの選択は、dcc-cuaとui-controlによって管理されています。詳細は[OpenScreenコントロールガイド](/ja/control/openscreen)をご覧ください。
- [ParaView](https://github.com/dcc-mcp/dcc-mcp-paraview) – 永続的なParaViewパイプラインを使用しています。制限されたプリミティブ、平面のクリップやスライス、コントールの抽出、検証済みのデータセットのエクスポート、PVSMの状態の保存、そして表示用のPNGビューイングなどが可能です。ソースコードはCoreおよびサーバー0.20.41に固定されています。ネイティブな再認証はまだ待たれています。公開されているバージョンはありません。また、CLI 0.20.39でチェックされたカタログには、アダプターの識別子が含まれていません。
- [PhotoCraft](https://github.com/dcc-mcp/dcc-mcp-photocraft) – 公式のPhotoCraft 0.2.0ヘッドレスエンジン用の実験的なアダプターです。このアダプターは、ドキュメント、レイヤー、マスク、選択範囲、調整、プレビュー、エクスポートなどの処理を行うための標準的なプロセスを持っています。このアダプターは、どのアプリケーションとも連携せず、デスクトップウィンドウも開きません。CLI 0.20.39でチェックされているカタログには、このアダプターは記載されていません。
- [PdfCraft](https://github.com/dcc-mcp/dcc-mcp-pdfcraft) – PdfCraftアダプターです。CLI 0.20.39でチェックされたカタログには、このアダプターの識別子は含まれていません。
- [Photoshop](https://github.com/dcc-mcp/dcc-mcp-photoshop) – UXPを通じてアドビシステムズのPhotoshopを利用する方法。
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) – Adobe Premiere Pro。
- [QGIS](https://github.com/dcc-mcp/dcc-mcp-qgis) – QGISプロジェクトを編集するためのツールです。MCP上で動作し、アダプターが所有するヘッドレスなPyQGISプロセスを通じて実行されます。実行中のQGISデスクトップセッションには接続しません。ソースコードはCoreおよびサーバー0.20.41に固定されており、ネイティブな再確認が必要です。PyPIパッケージやGitHubリリースは存在しません。また、CLI 0.20.39でカタログをチェックした際には、アダプターの識別子は含まれていませんでした。
- [REAPER](https://github.com/dcc-mcp/dcc-mcp-reaper) – REAPER DAWアダプターです。CLI 0.20.39でチェックしたカタログには、このアダプターの識別子は含まれていません。
- [RizomUV](https://github.com/dcc-mcp/dcc-mcp-rizomuv) – ヘッドレスでのバッチ処理によるUVデータの展開およびパッキング処理を行うものです。CLI 0.20.39でチェックされたカタログには、このアダプターの識別子は含まれていません。
- [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) – 認証されたRubyのAPIを通じて、モデルの作成、素材の設定、タグの付与、シーンの管理、検証、およびデータの交換が行えます。
- [Shōgun](https://github.com/dcc-mcp/dcc-mcp-shogun) – Sceneオブジェクト、属性、チャンネル、光学カメラ、ファイル、タイムラインの制御、およびオフライン処理の設定や操作に関する、公式のSDKツールです。実際に操作を行う前に、まずはライブインスタンスのツールを試してみてください。
- [SpeedTree](https://github.com/dcc-mcp/dcc-mcp-speedtree) — v0.1.1が独立してリリースされました（[リリースソース](https://github.com/dcc-mcp/dcc-mcp-speedtree/tree/595f0bd308aa0f4f0635a399c2b63bd76f16caf8)）。これは、正確なインスタンスと公式のフック機能を備えたブリッジです。CLI 0.20.39でチェックされるカタログ内のアダプター識別子ではありません。Unreal Engine 5.5.4では、ST9のハンドオフが実際に確認されています。ただし、衝突スケールや動的な風の効果はまだ確認されていません。詳細は[SpeedTree MCPガイド](/ja/control/speedtree)をご覧ください。
- [DaVinci Resolve](https://github.com/dcc-mcp/dcc-mcp-resolve) – プロジェクト、メディアプール、タイムライン、ギャラリーのチェックを行うためのDaVinci Resolve用のアダプターです。CLI 0.20.39でチェックされたカタログには、このアダプターの識別子は含まれていません。
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) – Adobe Substance 3D Designer。
- [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) – Adobe Substance 3D Painter。
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) – Tiledマップエディターです。CLI 0.20.39で確認されたカタログには、バージョン0.3.0が記載されており、「`catalog_install_available=false`」とあります。
- [Tracy Profiler](https://github.com/dcc-mcp/dcc-mcp-tracy) – 独立してリリースされたアダプターです。バージョンは0.2.5です。([リリースサイト](https://github.com/dcc-mcp/dcc-mcp-tracy/tree/a5e29b7bcef28ccd6a2ee17667dbdbcb7c45b119))。このアダプターは、制限付きのTracyキャプチャやオフラインゾーンの分析に使用されます。このアダプターは、CLI 0.20.39でチェックされるカタログ内のアダプター識別子ではありません。したがって、すでにインストルメント化されているターゲットが必要です。[Tracyコントロールガイド](/ja/control/tracy)も参照してください。
- [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) – TouchDesignerの派生版です。
- [Unity](https://github.com/dcc-mcp/dcc-mcp-unity) – Unityエディターやゲーム制作のスキルについて。
- [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) – Unreal Engine用のプラグインです。
- [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) – タイプ入力によるWAAPIツールを使ってWwiseのコーディングを行う方法です。CLI 0.20.39でチェックされたカタログには、バージョン0.1.2が記載されており、「`catalog_install_available=false`」と表示されています。
- [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) – Maxon ZBrush

## マヤ人の専門的なスキル

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) – AdvancedSkeletonのリギングに関するワークフローです。
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) – mGear Shifterの統合機能です。
- [手続き的なアーキテクチャ](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) – Maya、Bifrost、Arnoldのアーキテクチャワークフロー。

## 生成サービス

ローカルでの生成については、[ComfyUIのゲームアセットのワークフロー](/ja/control/comfyui)を参照してください。

- [Hunyuan 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) – テキストや画像を3Dデータに変換するサービスです。
- [OpenAI Image](https://github.com/dcc-mcp/dcc-ai-openai-image) – DCCテクスチャワークフロー用の画像生成や編集機能。
- [Tripo 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) – テキスト、画像、および複数の視点からなるデータを3Dオブジェクトに変換する機能です。

## 資産提供者

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Blender Extensions](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [Free Media](https://github.com/dcc-mcp/dcc-asset-free-media)
- [地理空間情報](https://github.com/dcc-mcp/dcc-asset-geospatial) · [glTFサンプルアセット](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [Googleスキャンされたオブジェクト](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [ケニー](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [Objaverse](https://github.com/dcc-mcp/dcc-asset-objaverse) · [Poly Haven](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [Quaternius](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)
- [Pirate Nation](https://github.com/dcc-mcp/dcc-asset-pirate-nation) – ゲームアセットの提供元との連携。
- [Poly Pizza](https://github.com/dcc-mcp/dcc-asset-poly-pizza) – 低ポリゴンモデルの検索やダウンロードが可能です。また、アセットのライセンス情報やプロヴェンシャルレコードもあります。

## UI自動化と共有ランタイム

- [winget-releaser](https://github.com/dcc-mcp/winget-releaser) – アプリケーションのメンテナー向けの、Windowsパッケージマネージャーのリリース自動化ツールです。
- [Qtアクション](https://github.com/dcc-mcp/dcc-ui-qt-actions) – QtベースのDCCインターフェースで再利用可能な、テキスト入力によるアクションです。
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) – 異なるホスト間でのウィンドウやウィジェットの検出を行います。
- [UIワークフローメモリ](https://github.com/dcc-mcp/dcc-ui-workflow-memory) – 確認されたセレクター、レシピ、およびエラーのメモリ情報。
- [dcc-mcp-filmcraft](https://github.com/dcc-mcp/dcc-mcp-filmcraft) – 実験的なFilmCraftの統合手法です。同じ可視化されたWebAssemblyエディター用のブラウザ用SDKです。
- [adobepy](https://github.com/dcc-mcp/adobepy) – アドビ社のデスクトップコミュニケーション用のランタイム環境です。

## 組織や発見の仕方について

以下に、追加の検出手段をリストアップしています。利用可能かどうかは、インストールされているCLIカタログを確認してください。リポジトリやリモートコネクターだけでは、実際にアプリケーションインスタンスを立ち上げることはできません。

- [Autodesk Product Help](https://developer.api.autodesk.com/knowledge/public/v1/mcp) – オプトイン方式で利用できる、外部からアクセス可能なドキュメントコネクタです。その名称は`autodesk-help`とされています。このコネクタは、CLI 0.20.39によって報告されている38個のアダプター識別子とは別のものであり、アプリケーションの変更によるものではありません。

- [公式ウェブサイトの情報源](https://github.com/dcc-mcp/dcc-mcp.github.io) – 共有されているドキュメント、GEOのメタデータ、アプリケーションの制御に関するガイド、そして実例などがあります。
- <a href="https://dcc-mcp.github.io/showcase/" target="_self">ショーケースコレクション</a> – 作業が完了しました。再利用可能なプロンプト、プロジェクトの出典、ライセンス情報、そして製作に関する明確な証拠もあります。[コレクションの出典と貢献内容](https://github.com/dcc-mcp/showcase)。[アダプターの例やプロンプト](/ja/examples)についても、元の証拠範囲は保持されています。
- [エージェント用のプラグイン](https://github.com/dcc-mcp/dcc-mcp-agent-plugins) – サポートされているエージェントクライアント向けの、標準的なDCC-MCPスキルやプラグインパッケージです。
- [dcc-cua](https://github.com/dcc-mcp/dcc-cua) – バウンド化されたDCC UIワークフローで使用される、クロスプラットフォームのコンピュータ利用自動化ランタイムです。
- [組織プロフィール](https://github.com/dcc-mcp/.github) – 共有されているGitHub上の組織のプロフィールや、コミュニティの設定情報です。

> プロジェクトの利用可能性やインストールに関するサポートは、カタログのバージョンによって変動することがあります。`dcc-mcp-cli --json dcc-types`を使って、現在のカタログのソースやアダプターのバージョン、インストールに関するフラグを確認してください。また、`dcc-mcp-cli marketplace search`を使って、インストール可能な拡張機能を検索することもできます。
