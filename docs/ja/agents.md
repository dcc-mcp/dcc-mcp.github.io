---
title: "エージェントの導入と最初の接続"
description: "dcc-mcp Skill と CLI を導入し、制作ソフトへの接続を確認します。ツールの引数を調べる方法と、呼び出しに失敗したときの診断手順も紹介します。"
pageClass: route-page
---

# エージェントの導入と最初の接続

公開されている [`dcc-mcp` Skill](https://github.com/dcc-mcp/dcc-mcp-agent-plugins/tree/main/plugins/dcc-mcp/skills/dcc-mcp) にエージェントの操作手順がまとまっています。`dcc-mcp-cli` で Gateway の状態確認、ツール検索、型付きの呼び出し、診断、更新、Marketplace からのインストールを行えます。

初回は CLI、Gateway、対象アプリケーションのアダプタが必要です。[クイックスタート](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started) に沿って導入状況を調べ、不足しているものを追加してください。

Codex、Claude Code、Gemini CLI、GitHub Copilot、Cursor、Windsurf、OpenCode、Cline、Roo Code、Kiro CLI、Amp など、Agent Skills 対応エージェントのワークスペースで次のコマンドを実行します。

```bash
npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

ユーザーレベルでのインストールを行う場合は、`--global`オプションを使用してください。ホストがSkillsを認識するのは、起動時にのみです。そのため、新しいエージェントセッションを開始する必要があります。

ホームページのインストールセクションでは、Codex、Claude Code、Cursor、Gemini CLI、GitHub Copilot、Windsurf、OpenCode、Cline、Roo Code、Kiro、Amp、CodeBuddy、OpenHands、Continue、Replit、OpenClaw、WorkBuddyといった各ツールに対して、同じコマンド選択器が使われています。

npmパッケージはオプションです。ホストやチームのワークフローで、vendorのスキルを`node_modules`を通じて利用する場合にのみ使用します。例えば、パッケージ管理された環境やオフラインでの設定においてです。

```bash
npm install @dcc-mcp/skills
```

## ネイティブのプラグイン市場

CodexやClaude Codeが提供している場合は、ホストネイティブのマーケットプレイスを使用してください。これらのコマンドを使うことで、[`dcc-mcp-agent-plugins`リポジトリ](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#install)から同じ`dcc-mcp`スキルがインストールされます。

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

その他のネイティブなプラグインやレジストリのインストール方法については、公式リポジトリに記載があります。

## 最初の接続を確かめる

```text
Blender に接続し、開いているシーンのファイル名、コレクション名、オブジェクト数を調べてください。シーンは変更せず、使ったインスタンスとツール名を報告してください。
```

## クラウドエージェントとDCC-MCP

[Cloud agents and DCC-MCP](/ja/cloud-agents)を参照してください。そこには、プラットフォームのインターフェースや、クラウドソフトウェアのインベントリ、バージョン別のワークフローに関する情報が記載されています。シェルエージェントは、CLIやHTTPゲートウェイを使用できます。ただし、各アプリケーション、アダプター、ワークフローについては、対象環境で実際に有効性を確認する必要があります。DCCサービスはループバックモードで動作させ、ネットワーク間のアクセスにはTLSや認証機能を使用してください。このプラグインには、対象となるDCCソフトウェアやそのライセンスは含まれていません。

## スキルとCLIのバージョンを最新のままにしておきましょう。

各インストールに使用されるアップデーターを利用してください。GitHubからインストールされたエージェントスキルは、`skills`というロックファイルを使用しています。

```bash
# Update managed copies in this workspace.
npx --yes skills@1.5.23 update -p -y

# Update managed user-level copies.
npx --yes skills@1.5.23 update -g -y
```

DCC-MCP CLIを別途確認し、その後、同意が得られた場合にのみ、更新プログラムを適用してください。

```bash
dcc-mcp-cli update check
dcc-mcp-cli update apply
```

OpenClawや直接ClawHubを利用する場合、それぞれ独自の記録されたソースや更新コマンドを使用します。詳細は[Keep installed Skills current](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#keep-installed-skills-current)をご覧ください。無人での更新時に `--force`オプションを追加しないでください。固定されているスキルや、ローカルで変更されたスキルは、確認のために停止されるべきです。

## 短いプロンプトを使ってください。

そのスキルには、その手順が含まれているので、プロンプトとしては、タスクとその安全な範囲だけを記述すれば十分です。

```text
dcc-mcpスキルを使って、DCCタスクを<説明>してください。システムの状態を変更する前には必ず確認を行ってください。最後に、その確認結果を提示してください。
```

## 必要なスキルのみをインストールしてください。

| 意図/目的 | スキル |
| --- | --- |
| ライブDCCを操作したり、各種ツールを探したり、拡張機能を検索したりすることができます。 | `dcc-mcp` |
| 完全なアダプター/ランタイムを作成するか、現代的な形に変換してください。 | `dcc-mcp-creator` |
| DCC専用のスキルパッケージを作成する、または改善する。 | `dcc-mcp-skills-creator` |

`--skill`の値は、そのタスクが2つの開発ルートのいずれかに該当する場合にのみ、ユニバーサルコマンド内で置き換える必要があります。

## 検索し、説明し、呼び出す

```bash
# Confirm the gateway and connected hosts.
dcc-mcp-cli health
dcc-mcp-cli list

# Search narrowly, then follow the returned next_step.
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# Execute the returned tool slug with validated arguments.
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

ツールの名前を推測したり、すべてのバックエンドスキーマを読み込んだりしないでください。まず検索を行い、その後、`next_step`に記載されている`load`や`describe`のステップを実行してください。

## 再試行する前に、リクエストIDを使用してください。

失敗した呼び出しから得られた`request_id`を保持しておきます。CLIの内蔵の証拠パスを使用してください。

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

その後、同じ検索ワークフローを通じて`dcc_feedback__report`を見つけ出します。報告書を共有する前に、その内容を確認し、必要な部分を編集してください。外部の問題を作成するには、依然としてユーザーの承認が必要です。

## 参照

- [はじめの準備](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started)
- [CLI参照](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)
- [エージェントの参照情報](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [ゲートウェイ診断](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [マーケットプレイス](/ja/marketplace)
- [ショーケースのプロンプト](/ja/examples)
- [一般的なAIとDCCのタスク](/ja/use-cases)
- [エコシステムを閲覧する](/ja/ecosystem)
