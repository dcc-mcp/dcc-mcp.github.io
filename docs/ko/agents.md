---
title: "에이전트 설치 및 첫 연결"
description: "dcc-mcp Skill과 CLI를 설치하고 제작 도구 연결을 확인합니다. 도구 인수를 조회하고 호출 실패를 진단하는 절차도 안내합니다."
pageClass: route-page
---

# 에이전트 설치 및 첫 연결

공개 [`dcc-mcp` Skill](https://github.com/dcc-mcp/dcc-mcp-agent-plugins/tree/main/plugins/dcc-mcp/skills/dcc-mcp)에 에이전트가 따라야 할 작업 절차가 담겨 있습니다. `dcc-mcp-cli`로 Gateway 상태 확인, 도구 검색, 타입이 지정된 호출, 진단, 업데이트, Marketplace 설치를 수행할 수 있습니다.

처음 연결하려면 CLI, Gateway, 대상 앱의 어댑터가 필요합니다. [빠른 시작](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started)을 따라 이미 설치된 구성요소를 확인한 뒤 빠진 항목을 추가하세요.

Codex, Claude Code, Gemini CLI, GitHub Copilot, Cursor, Windsurf, OpenCode, Cline, Roo Code, Kiro CLI, Amp 등 Agent Skills를 지원하는 에이전트의 워크스페이스에서 다음 명령을 실행하세요.

```bash
npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp
```

사용자 수준의 설치를 위해 `--global` 옵션을 사용하세요. 호스트가 Skills를 시작 시에만 인식한다면, 새로운 에이전트 세션을 시작해야 합니다.

홈페이지의 설치 섹션에서는 Codex, Claude Code, Cursor, Gemini CLI, GitHub Copilot, Windsurf, OpenCode, Cline, Roo Code, Kiro, Amp, CodeBuddy, OpenHands, Continue, Replit, OpenClaw, WorkBuddy 등과 같은 다양한 도구들을 위한 명령어 선택기가 제공됩니다.

npm 패키지는 선택적인 것입니다. 호스트나 팀의 워크플로우에서, `node_modules`를 통해 관련된 공급업체들을 활용할 때만 사용해야 합니다. 예를 들어, 패키지 관리 방식이나 오프라인 설정에서 그렇습니다.

```bash
npm install @dcc-mcp/skills
```

## 네이티브 플러그인 시장

Codex나 Claude Code가 제공하는 경우, 해당 플랫폼을 사용하는 것이 좋습니다. 이러한 명령어를 사용하면, [`dcc-mcp-agent-plugins` 리포지토리에서 제공하는 동일한 `dcc-mcp` 스킬을 설치할 수 있습니다.](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#install)

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

기타 네이티브 플러그인 및 레지스트리 설치 방법들에 대해서는, 공식 저장소에 자세한 설명이 기록되어 있습니다.

## 첫 연결 확인하기

```text
Blender에 연결해 현재 열린 씬의 파일명, 컬렉션 이름, 오브젝트 수를 확인해 주세요. 씬을 수정하지 말고 사용한 인스턴스와 도구 이름을 알려 주세요.
```

## 클라우드 에이전트와 DCC-MCP

[클라우드 에이전트와 DCC-MCP](/ko/cloud-agents)를 참조하여, 플랫폼 인터페이스나 클라우드 소프트웨어의 목록, 그리고 버전별로 관리되는 워크플로우 정보에 대해 알아보세요. 셸 에이전트는 CLI와 HTTP 게이트웨이를 사용할 수 있습니다. 하지만 각 애플리케이션, 어댑터, 워크플로우는 여전히 대상 환경에서 검증이 필요합니다. DCC 서비스는 라우팅을 통해 작동해야 하며, 네트워크 간의 접근을 위해 TLS와 인증 기능을 사용해야 합니다. 이 플러그인에는 대상 DCC 소프트웨어나 그 라이선스 정보가 포함되어 있지 않습니다.

## 스킬과 CLI를 최신 상태로 유지해 주세요.

각 설치에 사용되는 업데이터를 사용해야 합니다. GitHub에서 다운로드된 Agent Skills는 `skills`라는 잠금 파일을 사용합니다.

```bash
# Update managed copies in this workspace.
npx --yes skills@1.5.23 update -p -y

# Update managed user-level copies.
npx --yes skills@1.5.23 update -g -y
```

DCC-MCP CLI를 별도로 확인한 후, 승인을 받은 경우에만 업데이트를 적용해야 합니다.

```bash
dcc-mcp-cli update check
dcc-mcp-cli update apply
```

OpenClaw와 직접적인 ClawHub 설치 방식은 각각 자신만의 녹음된 소스와 업데이트 명령을 사용합니다. 자세한 내용은 [스킬을 최신 상태로 유지하기](https://github.com/dcc-mcp/dcc-mcp-agent-plugins#keep-installed-skills-current)를 참조하세요. 무인 업데이트 시 `--force` 옵션을 추가하지 마세요. 고정된 스킬이나 로컬에서 수정된 스킬들은 검토를 위해 중단되어야 합니다.

## 짧은 프롬프트를 사용하세요.

‘스킬’이라는 개념은 그 절차를 포함하고 있으므로, 프롬프트는 단지 작업과 그 작업의 안전한 범위만을 명시하면 됩니다.

```text
dcc-mcp 스킬을 사용하여 <DCC 작업을 설명하세요>. 시스템 상태를 변경하기 전에 반드시 확인해야 합니다. 마지막으로, 그 작업이 성공했음을 증명하는 증거를 제시해야 합니다.
```

## 필요한 기능만 설치하세요.

| 의도/목적 | 스킬 |
| --- | --- |
| 실시간 DCC를 작동시켜보거나, 다양한 도구들을 찾아보거나, 확장 기능을 검색해보세요. | `dcc-mcp` |
| 완전한 어댑터/런타임 환경을 생성하거나 현대화해야 합니다. | `dcc-mcp-creator` |
| DCC에 특화된 스킬 패키지를 만들거나 개선해 보세요. | `dcc-mcp-skills-creator` |

`--skill` 값은, 해당 작업이 두 가지 개발 경로 중 하나와 일치할 때만 유니버설 명령어에서 사용해야 합니다.

## 찾고, 설명하고, 부르는 것.

```bash
# Confirm the gateway and connected hosts.
dcc-mcp-cli health
dcc-mcp-cli list

# Search narrowly, then follow the returned next_step.
dcc-mcp-cli search --query "create sphere" --dcc-type maya

# Execute the returned tool slug with validated arguments.
dcc-mcp-cli call <tool-slug> --json '{"radius": 2.0}'
```

도구의 이름을 추측하지 마시고, 모든 백엔드 스키마를 로드하지 마세요. 먼저 검색을 해보고, 그 다음에 `next_step`에 명시된 “`load`” 또는 “`describe`” 단계를 수행하세요.

## 재시도를 할 때는 반드시 요청 ID를 사용해야 합니다.

실패한 호출에서 얻은 `request_id`를 유지해 주세요. CLI의 내장된 증거 경로를 사용하세요.

```bash
dcc-mcp-cli doctor
dcc-mcp-cli stats --status failure
```

그런 다음, 동일한 검색 워크플로스를 통해 `dcc_feedback__report`를 찾아보세요. 보고서를 공유하기 전에 먼저 그 보고서를 검토하고 내용을 수정해야 합니다. 외부 문제를 생성하려면 여전히 사용자의 권한이 필요합니다.

## 참고문헌

- [시작하기](https://dcc-mcp.github.io/dcc-mcp-core/guide/getting-started)
- [CLI 참조](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)
- [에이전트의 참고 자료](https://dcc-mcp.github.io/dcc-mcp-core/guide/agents-reference)
- [게이트웨이 진단](https://dcc-mcp.github.io/dcc-mcp-core/guide/gateway-diagnostics)
- [마켓플레이스](/ko/marketplace)
- [쇼케이스 프롬프트들](/ko/examples)
- [일반적인 AI 및 DCC 관련 작업들](/ko/use-cases)
- [생태계를 둘러보세요.](/ko/ecosystem)
