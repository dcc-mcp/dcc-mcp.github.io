---
title: "アダプタ、サービス、Skill の開発"
description: "プライベートな MCP サービス、DCC アダプタ、作業別 Skill の開発手順とローカルでの検証方法を説明します。"
pageClass: route-page
---

# アダプタ、サービス、Skill の開発

ファイルを作成する前に、どのレイヤーを使用するかを選択してください。DCC-MCPでは、公開可能なDCCアダプター、プライベートな非DCCサービス、そして特定の機能を提供するパッケージなどがサポートされています。ローカルフォルダや内部のソースツリーを使用するだけで十分です。

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>個人向けまたはカスタムなMCPサービス</strong><span>dcc-mcp-creatorを使用してください。</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>集中したワークフローを実行するスキル</strong><span>スキル・クリエイターを使用してください。</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>共有インフラ</strong><span>Coreに貢献しましょう。</span></a>
</div>

## 1つの開発トラックを選んでください。

| あなたの必要 | ルート |
|---|---|
| Maya、Blender、Unrealなど、他のホストプロセスを接続します。 | `dcc-mcp-creator`を使って、DCCアダプターを作成したり、改善したりすることができます。 |
| 内部のAPI、CLI、アセットデータベース、レンダーファーム、またはレビュースサービスを公開する。 | `dcc-mcp-creator`を使用する際は、カスタムのサービスIDを指定し、`instance_type="standalone"`を選択してください。公開リポジトリは必要ありません。 |
| 既存のアダプターやスタンドアロンサービスに、タイプされたワークフローを追加します。 | `dcc-mcp-skills-creator`を使用してください。別の実行環境を作成しないでください。 |
| ゲートウェイ、CLI、プロトコル、セキュリティ、またはホスト間の動作を変更する。 | 共有契約をCoreに渡してください。 |

公共アダプターやSkillを作成する前に、[エコシステムディレクトリ](/ja/ecosystem)を検索してください。プライベートサービスのアイデンティティには、公共カタログエントリーは必要ありません。

## プライベートな非DCCサービスを構築する。

これは、創造的なアプリケーションではない、内部的なシステム用のルートです。また、GitHubを使用しない場合もあります。プライベートプロジェクトからコーディングエージェントを実行し、その後、このプロンプトを使用してください。

```text
ランタイムには dcc-mcp-creator、Skill ファイルには dcc-mcp-skills-creator を使ってください。作業先は現在の社内プロジェクトです。言語、パッケージ管理、テスト、認証、デプロイの規約を確認して再利用し、GitHub リポジトリ、公開カタログ項目、外部の Issue、公開リリースは作成しないでください。

実際の社内業務を一つ選び、安定したサービス ID と型付きの読み取り専用 Skill を実装してください。DccServerBase と DccServerOptions.from_env(..., instance_type="standalone") を使い、dcc_pid は設定せず、開発時はループバックのみにバインドします。通常のファイル操作や API 呼び出しはその場で実行し、スレッドやプロセスをまたぐ必要がある場合のみディスパッチャーやブリッジを追加してください。入出力スキーマで未定義の項目を拒否し、安全性の注記、タイムアウト、呼び出し例、機密情報を除いた対処可能なエラーを用意してください。認証情報にはプロジェクト既存の保管方法を使ってください。

dcc-mcp-cli lint skills とプロジェクトの最小テストを実行してください。サービスを起動して実際の /mcp URL を表示し、公式 MCP Inspector で tools/list、該当 Skill の検索と読み込み、describe、正常な呼び出し、不正入力時のエラー、正常終了を確認してください。CLI でも list、load-skill、describe、call を --output toon 付きで試し、返された slug と request_id を記録してください。推測や無条件の再試行は避け、変更したファイル、検証結果、セキュリティとデプロイに残る作業を報告してください。公開や共有基盤の変更前に作業を止めてください。
```

必要な認証処理：

1. 既存のプロジェクトの慣習を再利用しているのです。
2. カスタムサービスIDと、なぜランタイムが`standalone`なのか。
3. 1つの有効なスキルがあり、また、1回の成功した読み取り専用のコールもありました。
4. 安全な無効な入力結果です。
5. クリーンなシャットダウンの証拠があり、個人的な配送ルートも無傷のまま残っています。

### 例のサービスを実行してください。

完全なCoreの例は`[``examples/remote-server`にあります。その歴史的なディレクトリ名は変わりません。現在、この例はループバック型のスタンドアロンサービスとして動作し、バンドルされたSkillディレクトリを検出します。](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server)

```bash
pip install dcc-mcp-core
dcc-mcp-cli lint skills
python server.py
```

期待される起動出力には、`http://127.0.0.1:8765/mcp`のようなURL、カスタムアイデンティティ`studio-service`、および実行環境のライフサイクル`standalone`が含まれます。

### 開発用コンテナを使用してください。

この例では、[開発用コンテナ](https://containers.dev/)の設定が含まれています。仕様や参照用のCLIはオープンソースなので、同じPython、Node.js、Core、Inspector環境を使用して、ホストアカウントを必要とせずに、互換性のあるエディターやエージェントシェルからも利用できます。

コアリポジトリのルートから：

```bash
npm install --global @devcontainers/cli
devcontainer up --workspace-folder examples/remote-server
devcontainer exec --workspace-folder examples/remote-server python server.py
```

自動化されたインスペーラー用の別のターミナルを使用してください。

```bash
devcontainer exec --workspace-folder examples/remote-server \
  npx --yes @modelcontextprotocol/inspector@latest --cli \
  http://127.0.0.1:8765/mcp --transport http --method tools/list
```

このラボでは、rootユーザーではなく、通常のユーザーとして実行されます。また、ホストコンテナのソケットをマウントすることもありません。認証情報は、イメージの外側に保管しておくべきです。

ブラウザベースのグループトレーニングにおいては、[Educates](https://docs.educates.dev/en/stable/)が利用できます。このサービスには、個別のセッション、Markdown形式での手順の記述、ターミナル機能、そして埋め込みエディターが含まれています。Kubernetes、ingress、アイデンティティ、クォータ、イメージ、セッションのクリアなどの機能を利用するためには、オペレーターが必要です。これらの共有サービスが不要な場合は、ローカルのDev Containerを使用しましょう。

### MCP Inspectorを使ったテスト

公式の[MCP Inspector](https://github.com/modelcontextprotocol/inspector)を使用してください。このツールはローカルで動作し、ホストアカウントは不要です。また、Streamable HTTPにも対応しています。さらに、プライベートなループバックサービスは、公共のインターネットからは遮断されています。

```bash
npx --yes @modelcontextprotocol/inspector@latest
```

印刷された `/mcp` のURLに接続します。`hello-world`というキーワードを検索し、それを読み込みます。そして、`{"name":"Agent"}`というパラメータを渡して`hello_world__greet`を呼び出します。また、空の名前を送信し、その応答が構造化されたバリデーションエラーであることを確認します。

::: warning なぜ、地元の監査官を利用するのでしょうか？
ホストされたプレイグラウンドは、ループバックやイントラネットのMCPサービスに接続できないため、そのサービスを外部に公開することはできません。内部システムの場合、ローカルのオープンソースのInspectorが安全な「実行可能な手段」となります。プロセスを生成するプロキシを、信頼できないネットワークに公開してはいけません。
:::

### CLIを通じて確認してください。

サービスが登録された後、CLIを使用してください。検索によって返されるスラッグを保持してください。

```bash
dcc-mcp-cli list --output toon
dcc-mcp-cli load-skill hello-world --dcc-type studio-service --output toon
dcc-mcp-cli describe <tool-slug-returned-by-load> --output toon
dcc-mcp-cli call <tool-slug-returned-by-load> --json '{"name":"Agent"}' --wait --output toon
```

## スキルを変更する際に、実行時間を増やさないようにする。

このプロンプトを、実行環境がすでに存在している場合に使用してください。

```text
現在の社内プロジェクトで dcc-mcp-skills-creator を使ってください。既存の Skill を検索し、この業務を担当する Skill に必要最小限の変更を加えてください。新しいアダプター、サービス、リポジトリ、公開パッケージは作成しません。SKILL.md の metadata.dcc-mcp.* に型付きスキーマ、安全性の注記、affinity、timeout、call_examples、next-tools を定義します。該当する機能は dcc_mcp_core.skills_helper を再利用し、範囲を限定したスクリプトを一つ実装してください。インストール対象のディレクトリで dcc-mcp-cli lint を実行し、既存のランタイムで読み込み、正常入力と不正入力を一度ずつ試して結果を報告してください。公開には私の承認が必要です。
```

この手順を使用してください：**既存の所有権を検索する → スカフォールド処理や編集を行う → Lintを実行する → 再読み込みを行う → ロードする → 説明を行う → 呼び出す → 診断を行う**。

## 推測せずにデバッグを行う

| 症状 | 次に、チェックを行います。 |
|---|---|
| スキルの確認に失敗しました。 | 実行を開始する前に、`dcc-mcp-cli lint`に関する正確な問題を解決しておきましょう。 |
| サービスは応答しません。 | 印刷されたURLを確認しました。その後、`GET /v1/healthz`と`GET /v1/readyz`を実行してみてください。 |
| スキルがない | 親パスを確認した後、`reload-skills`を実行し、再び検索してください。 |
| ツールがない | そのスキルをロードし、返される`next_step`に従って進みます。 |
| 通話ができません。 | `request_id`を保持し、`dcc-mcp-cli doctor`を実行して、障害に関する統計情報を取得します。その後、問題の原因となる層を修正してください。 |
| 個人による依存関係は利用できません。 | 内部の所有者について報告し、関連する証拠を削除してください。公開することはしないでください。 |

## 地域での成功から、民間の配送へと移行する

開発作業はループバックで行う必要があります。イントラネットへのアクセスには、オペレーターが管理するTLS、認証機能、ネットワーク/送信元の許可リスト、秘密情報の管理、監査の保持、およびシャットダウンのための権限が必要です。プロジェクト用の既存のツールやアーカイブシステム、コンテナ、プライベートレジストリ、または内部デプロイメントシステムを再利用できます。GitHubはオプションです。

次に読む：

- [内部の独立したサービスワークフロー](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/INTERNAL_SERVICE_WORKFLOW.md)
- [オープン型の開発用コンテナの例](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server/.devcontainer)
- [アダプターおよびサービスのワークフロー](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/ADAPTER_WORKFLOW.md)
- [スキルシステム](https://dcc-mcp.github.io/dcc-mcp-core/guide/skills)
- [スキル範囲とポリシー](https://dcc-mcp.github.io/dcc-mcp-core/guide/skill-scopes-policies)
- [リモートデプロイメント](https://dcc-mcp.github.io/dcc-mcp-core/guide/remote-server)
- [コアアーキテクチャ](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture)
