---
title: "어댑터, 서비스 및 Skill 개발"
description: "비공개 MCP 서비스, DCC 어댑터 또는 작업별 Skill을 개발하고 로컬에서 검증하는 방법을 안내합니다."
pageClass: route-page
---

# 어댑터, 서비스 및 Skill 개발

파일을 생성하기 전에, 해당 파일을 소유하는 계층을 선택해야 합니다. DCC-MCP는 공개용 DCC 어댑터, 비공개용 서비스, 그리고 특정 목적을 위한 스킬 패키지를 지원합니다. 로컬 폴더나 내부 소스 트리를 사용해도 충분합니다.

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>개인용 또는 맞춤형 MCP 서비스</strong><span>dcc-mcp-creator를 사용하세요.</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>집중된 작업 흐름 기술</strong><span>스킬 크리에이터를 사용하세요.</span></a>
  <a href="https://github.com/dcc-mcp/dcc-mcp-core"><strong>공유된 인프라</strong><span>코어에 기여해 주세요.</span></a>
</div>

## 하나의 개발 경로를 선택하세요.

| 당신의 필요성 | 경로/방향 |
|---|---|
| Maya, Blender, Unreal 또는 다른 호스트 프로세스를 연결합니다. | `dcc-mcp-creator`를 사용하여 DCC 어댑터를 생성하거나 개선할 수 있습니다. |
| 내부 API, CLI, 자산 데이터베이스, 렌더링 장비, 또는 리뷰 서비스를 공개합니다. | `dcc-mcp-creator`를 사용할 때는, 커스텀된 서비스 ID와 `instance_type="standalone"`을 지정해야 합니다. 공개 리포지토리는 필요하지 않습니다. |
| 기존의 어댑터나 독립형 서비스에 타입스크린된 워크플로우를 추가해 보세요. | `dcc-mcp-skills-creator`를 사용하세요. 다른 런타임을 생성하지 마세요. |
| 게이트웨이, CLI, 프로토콜, 보안, 또는 호스트 간의 동작을 변경합니다. | 공유된 계약서를 Core에 전달해 주세요. |

공개 어댑터나 Skill을 생성하기 전에, [생태계 디렉토리](/ko/ecosystem)를 검색해 주세요. 비공개 서비스의 경우, 공개 카탈로그 항목이 필요하지 않습니다.

## 개인용 비-DCC 서비스를 구축해 보세요.

이 경로는 창의적인 애플리케이션이 아닌, GitHub을 사용하지 않는 내부 시스템에 적합합니다. 프라이빗 프로젝트에서 코딩 에이전트를 실행한 후, 다음과 같은 프롬프트를 사용하세요:

```text
런타임에는 dcc-mcp-creator를, Skill 파일에는 dcc-mcp-skills-creator를 사용하세요. 현재 비공개 프로젝트 안에서만 작업하세요. 기존 언어, 패키지 관리자, 테스트 명령, 인증 및 배포 방식을 확인하고 그대로 활용하세요. GitHub 저장소, 공개 카탈로그 항목, 외부 이슈 또는 공개 릴리스를 만들지 마세요.

실제 내부 업무 하나에 대해 고정된 서비스 ID와 타입이 명시된 읽기 전용 Skill 하나를 구현하세요. DccServerBase와 DccServerOptions.from_env(..., instance_type="standalone")을 사용하고 dcc_pid는 지정하지 마세요. 개발 중에는 루프백에만 바인딩하세요. 일반 서비스 호출, 파일 처리, API 작업은 직접 실행하고 스레드나 프로세스 경계를 넘어야 할 때만 디스패처나 브리지를 추가하세요. 정의되지 않은 필드를 거부하는 입출력 스키마, 안전성 주석, 제한 시간, 호출 예시, 민감한 정보를 가린 오류와 해결 방법을 제공하세요. 인증 정보는 기존 비밀 저장소에서 관리하세요.

dcc-mcp-cli lint skills와 프로젝트의 최소 테스트를 실행하세요. 서비스를 시작해 실제 /mcp URL을 출력하고 공식 MCP Inspector로 tools/list, 정확한 Skill 검색과 로드, describe, 정상 호출, 잘못된 입력 오류, 정상 종료를 확인하세요. CLI에서도 list, load-skill, describe, call에 --output toon을 적용해 재현하세요. 추측하거나 무작정 재시도하지 말고 반환된 slug와 request_id를 기록하세요. 수정한 파일, 검증 결과, 남은 보안 및 배포 작업을 보고하고 공개 또는 공용 인프라 변경 전에 중단하세요.
```

필수적인 확인/승인:

1. 기존의 프로젝트 관례들을 다시 사용하고 있습니다.
2. 서비스의 고유 ID와 런타임을 `standalone`으로 실행하는 이유를 설명하세요.
3. 1개의 유효한 기술과, 1번의 성공적인 읽기 전용 통화가 있었습니다.
4. 안전한 무효 입력 결과입니다.
5. 깨끗하게 정리된 종료 증거들과, 그대로 남아 있는 개인적인 배송 경로들도 그대로 유지되었습니다.

### 예제 서비스를 실행해 보세요.

완전한 Core 예제는 [`examples/remote-server`](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server)에 있습니다. 이 예제의 역사적인 디렉터리 이름은 변하지 않았습니다. 이제 이 예제는 로비백 방식으로 실행되며, 자신이 포함된 Skill 디렉토리를 찾아냅니다.

```bash
pip install dcc-mcp-core
dcc-mcp-cli lint skills
python server.py
```

시작 로그에 `http://127.0.0.1:8765/mcp`와 같은 접속 URL, 서비스 식별자 `studio-service`, 런타임 수명 설정 `standalone`이 표시되는지 확인하세요.

### 개발 컨테이너를 사용하세요.

이 예시에는 [개발용 컨테이너](https://containers.dev/)의 구성도 포함되어 있습니다. 명세와 참조 CLI는 오픈 소스이므로, 같은 Python, Node.js, Core, Inspector 환경을 사용할 수 있습니다. 따라서 호스팅된 계정이 없어도 호환되는 편집기나 에이전트 셸에서도 이 환경을 사용할 수 있습니다.

코어 리포지토리의 루트 부분에서:

```bash
npm install --global @devcontainers/cli
devcontainer up --workspace-folder examples/remote-server
devcontainer exec --workspace-folder examples/remote-server python server.py
```

자동화된 감시 시스템을 실행하기 위해, 두 번째 터미널을 사용하세요.

```bash
devcontainer exec --workspace-folder examples/remote-server \
  npx --yes @modelcontextprotocol/inspector@latest --cli \
  http://127.0.0.1:8765/mcp --transport http --method tools/list
```

이 실험은 루트 사용자가 아닌 계정으로 실행되며, 호스트 컨테이너의 소켓도 마운트되지 않습니다. 비밀번호 같은 민감한 정보는 이미지 외부에 저장해 두세요.

브라우저 기반의 그룹 교육을 위해, [Educates](https://docs.educates.dev/en/stable/)는 개별 세션을 제공하며, 마크다운 형식으로 작성된 단계들, 터미널 기능, 그리고 내장된 편집기도 제공합니다. 이를 위해서는 Kubernetes, 인그레스, ID 관리, 할당량, 이미지 관리, 세션 정리 등과 관련된 기능이 필요합니다. 이러한 공유 서비스가 필요하지 않다면, 로컬 개발 컨테이너를 사용하는 것이 좋습니다.

### MCP Inspector를 사용하여 테스트를 수행합니다.

공식적인 [MCP Inspector](https://github.com/modelcontextprotocol/inspector)를 사용하세요. 이 도구는 로컬에서 실행되며, 호스팅된 계정이 필요하지 않습니다. Streamable HTTP을 지원하며, 공개 인터넷으로부터 비공개로 서비스를 유지할 수 있습니다.

```bash
npx --yes @modelcontextprotocol/inspector@latest
```

인쇄된 `/mcp` URL에 연결합니다. `hello-world`라는 내용을 검색하여 로드한 후, `{"name":"Agent"}`와 함께 `hello_world__greet`를 호출합니다. 또한, 빈 이름을 전송하여 반응이 구조화된 오류인지 확인해야 합니다.

::: warning 왜 지역 감독관을 사용해야 할까요?
호스팅된 플레이그라운드는, 해당 서비스를 노출시키지 않고는 루프백이나 인트라넷 MCP 서비스에 접근할 수 없습니다. 내부 시스템의 경우, 로컬 오픈소스 Inspector가 안전한 “즉시 사용할 수 있는” 방법입니다. 절대로 프로세스를 생성하는 프록시를 신뢰할 수 없는 네트워크에 노출시키지 마세요.
:::

### CLI를 통해 확인해 주세요.

서비스가 등록된 후에는 CLI를 사용해야 합니다. 검색 결과로 반환된 슬러그를 그대로 유지해 주세요.

```bash
dcc-mcp-cli list --output toon
dcc-mcp-cli load-skill hello-world --dcc-type studio-service --output toon
dcc-mcp-cli describe <tool-slug-returned-by-load> --output toon
dcc-mcp-cli call <tool-slug-returned-by-load> --json '{"name":"Agent"}' --wait --output toon
```

## 스킬을 변경할 때, 실행 시간을 추가하지 않고도 처리할 수 있습니다.

이 프롬프트는, 런타임이 이미 존재하는 경우에 사용됩니다.

```text
현재 비공개 프로젝트에서 dcc-mcp-skills-creator를 사용하세요. 먼저 기존 Skill을 검색한 뒤 이 업무를 담당하는 Skill만 추가하거나 개선하세요. 새 어댑터, 서비스, 저장소, 공개 패키지는 만들지 마세요. SKILL.md의 metadata.dcc-mcp.*에 타입 스키마, 안전성 주석, affinity, timeout, call_examples, next-tools를 선언하세요. dcc_mcp_core.skills_helper로 처리할 수 있는 기능은 재사용하고 범위를 제한한 스크립트 하나를 구현하세요. 설치할 디렉터리에 dcc-mcp-cli lint를 실행한 뒤 기존 런타임에서 Skill을 로드하세요. 정상 입력과 잘못된 입력으로 한 번씩 호출하고 결과를 보고하세요. 공개하려면 먼저 제 승인을 받으세요.
```

이 순서를 사용하세요: **기존의 소유권 정보를 검색한 후, 스캐폴딩이나 편집 작업을 수행합니다. 그 다음, lint 기능을 사용하여 오류를 확인합니다. 그 후, 다시 데이터를 로드합니다. 마지막으로, 해당 데이터에 대한 설명을 제공하고, 문제를 진단합니다.**

## 추측하지 않고 디버깅을 해보세요.

| 증상 | 다음으로 확인해보세요. |
|---|---|
| 스킬의 유효성을 확인하는 데 실패했습니다. | 런타임을 시작하기 전에, `dcc-mcp-cli lint` 관련 문제를 반드시 해결해야 합니다. |
| 서비스가 응답하지 않습니다. | 인쇄된 URL을 확인한 후, `GET /v1/healthz`와 `GET /v1/readyz`를 시도해보세요. |
| 스킬이 없습니다. | 먼저, 해당 파일의 부모 경로를 확인한 다음, `reload-skills` 명령을 실행해보세요. 그런 다음 다시 검색해보세요. |
| 도구가 없습니다. | 소유하고 있는 스킬을 로드한 후, 그 스킬이 반환하는 `next_step`를 따릅니다. |
| 통화가 실패했습니다. | `request_id`를 유지하되, `dcc-mcp-cli doctor`를 실행하여 장애 통계를 확인합니다. 그런 다음, 해당 문제를 일으키는 계층을 수정해야 합니다. |
| 개인적인 의존 관계는 이용할 수 없습니다. | 내부 소유자를 보고하고, 관련 증거를 수정해야 합니다. 공개적으로 발표하지 마세요. |

## 지역적으로 성공을 거둔 후, 민간 배달 서비스로 전환하기

개발 작업은 리버브에 계속 진행되어야 합니다. 인트라넷에 공개된 정보는 운영자가 직접 관리해야 하며, TLS 인증, 네트워크/원본 허용 목록, 비밀 관리, 감사 기록의 보관, 그리고 시스템의 종료와 관련된 기능도 필요합니다. 프로젝트가 이미 가지고 있는 워더, 아카이브, 컨테이너, 프라이빗 레지스트리, 또는 내부 배포 시스템을 재사용할 수 있습니다. GitHub은 선택 사항입니다.

다음 내용을 읽어보세요:

- [내부 독립적인 서비스 워크플로우](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/INTERNAL_SERVICE_WORKFLOW.md)
- [개발 컨테이너의 예시](https://github.com/dcc-mcp/dcc-mcp-core/tree/main/examples/remote-server/.devcontainer)
- [어댓터와 서비스 워크플로우](https://github.com/dcc-mcp/dcc-mcp-core/blob/main/skills/dcc-mcp-creator/references/ADAPTER_WORKFLOW.md)
- [스킬 시스템](https://dcc-mcp.github.io/dcc-mcp-core/guide/skills)
- [기술 범위와 정책들](https://dcc-mcp.github.io/dcc-mcp-core/guide/skill-scopes-policies)
- [원격 배포](https://dcc-mcp.github.io/dcc-mcp-core/guide/remote-server)
- [핵심 아키텍처](https://dcc-mcp.github.io/dcc-mcp-core/guide/architecture)
