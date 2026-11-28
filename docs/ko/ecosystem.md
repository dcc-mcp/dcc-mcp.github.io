---
title: "DCC-MCP 프로젝트 목록"
description: "제작 도구 어댑터, Skill, 에셋 공급자와 생성 서비스를 찾고 각 프로젝트의 공식 저장소를 확인하세요."
pageClass: ecosystem-directory
outline: [2, 2]
---

# DCC-MCP 프로젝트 목록

[`dcc-mcp` Skill`의 공개 워크플로우 가이드부터 시작하여, 자신의 작업에 맞는 어댑터나 확장기를 선택하세요. 각 프로젝트는 자체적인 설치 방법, 호환성, 애플리케이션 API를 문서화합니다. Core는 공유된 연결 및 호출 인프라를 문서화합니다. 타입화된 도구는 매개변수, 그 유형, 그리고 결과를 정의하여, 호출이 검토되고 검증될 수 있도록 합니다.](https://clawhub.ai/loonghao/skills/dcc-mcp)

<div class="directory-actions">
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp"><strong>창의적인 소프트웨어를 사용하여 작업을 수행합니다.</strong><span>dcc-mcp 스킬</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-creator"><strong>어떤 어댑터를 만들어보자.</strong><span>dcc-mcp-creator</span></a>
  <a href="https://clawhub.ai/loonghao/skills/dcc-mcp-skills-creator"><strong>스킬을 키우세요.</strong><span>dcc-mcp-skills-creator</span></a>
</div>

## 공유된 인프라와 도구들

- [dcc-mcp-core](https://github.com/dcc-mcp/dcc-mcp-core) – 공유 게이트웨이, CLI, MCP/REST 런타임, 안전성, 진단 및 관찰 기능을 제공합니다.
- [dcc-mcp-runtime](https://github.com/dcc-mcp/dcc-mcp-runtime) – 외부 DCC-MCP 어댑터들을 위한 공유된 파이썬 실행 환경 및 명세서입니다.
- [마켓플레이스 검색](/ko/marketplace) – `dcc-mcp-cli`가 사용하는 공식 확장 기능 카탈로그를 검색할 수 있습니다. [카탈로그 소스](https://github.com/dcc-mcp/marketplace)도 확인할 수 있습니다.
- [dcc-mcp-fpt](https://github.com/dcc-mcp/dcc-mcp-fpt) – Autodesk Flow Production Tracking과의 통합 기능입니다.
- [fpt-cli](https://github.com/dcc-mcp/fpt-cli) – Autodesk Flow Production Tracking용 자동화 중심의 Rust CLI 도구입니다.
- [dcc-mcp-openusd](https://github.com/dcc-mcp/dcc-mcp-openusd) – OpenUSD 관련 작업 흐름 및 교환 기술들.
- [dcc-materialx](https://github.com/dcc-mcp/dcc-materialx) – MaterialX의 레이아웃 및 개발 관련 정보를 교환하는 곳입니다.
- [dcc-lookdev](https://github.com/dcc-mcp/dcc-lookdev) – 표준화된 여러 DCC 간의 PBR 관리를 위한 개발 작업 흐름입니다.
- [dcc-modeling-spec](https://github.com/dcc-mcp/dcc-modeling-spec) – 호스트 중립적인 모델링 사양 v2입니다. 이 사양은 Maya, Blender, Houdini, 3ds Max와 같은 소프트웨어에서 사용될 수 있습니다.
- [dcc-pipeline-publish](https://github.com/dcc-mcp/dcc-pipeline-publish) – DCC, USD, 렌더링 팜, 그리고 추적 워크플로우를 위한 휴대 가능한 게시 매니페스트입니다.
- [dcc-texture-pipeline](https://github.com/dcc-mcp/dcc-texture-pipeline) – 결정론적인 OpenImageIO와 OpenColorIO 텍스처 워크플로우입니다.
- [dcc-itchio](https://github.com/dcc-mcp/dcc-itchio) – 안전한 방식으로 itch.io에서 자산을 확보하고, 게임을 미리 볼 수 있는 기능을 제공하는 기술입니다.
- [dcc-media-enhance](https://github.com/dcc-mcp/dcc-media-enhance) – 설치된 백엔드를 활용하여, 제한된 메모리 공간에서 미디어의 노이즈를 제거하고 품질을 향상시키는 데 사용되는, 에이전트-프리 방식의 Rust 오케스트레이션 기술입니다.
- [dcc-mcp-cache-inspector](https://github.com/dcc-mcp/dcc-mcp-cache-inspector) – 호스트 중립적인 마켓플레이스 스킬로, 제한된 환경에서도 개인정보가 안전하게 보호되는 오프라인 환경에서 캐시를 검사할 수 있습니다. 이 도구에는 어댑터나 PyPI 패키지가 없습니다.
- [mcpcall](https://github.com/dcc-mcp/mcpcall) – CLI를 통해, stdio나 Streamable HTTP를 통해 MCP 서버 도구들을 목록으로 표시하거나 호출할 수 있습니다.
- [dcc-mcp-renderdoc](https://github.com/dcc-mcp/dcc-mcp-renderdoc) – RenderDoc을 사용하여 자동화된 렌더링 과정을 캡처하고 재생할 수 있습니다.
- [dcc-mcp-tracy](https://github.com/dcc-mcp/dcc-mcp-tracy) – 트레이시 프레임 프로파일러의 캡처 및 분석 기능.

## DCC와 창의적인 애플리케이션 어댑터들

자연어로 작동하는 제어 질문이나 안전한 에이전트 프롬프트의 경우, 먼저 [애플리케이션별 AI 제어 가이드](/ko/use-cases)를 참조하세요. 그런 다음, 연결된 어댑터 리포지토리를 설치 및 호스트 관련 정보의 출처로 사용하십시오.

공식 CLI 0.20.39를 통해 확인된 원격 카탈로그에는 38개의 어댑터 식별자들이 나열되어 있습니다. 그 중 33개의 카탈로그는 설치가 가능합니다. 하지만 `kdenlive`, `material-maker`, `powerpoint`, `tiled`, `wwise`는 `catalog_install_available=false`로 표시되어 있습니다. 카탈로그 정의나 개별 어댑터의 출시는, 실제로 호스트가 작동하거나 생산적인 용도로 사용될 수 있도록 하는 것을 의미하지 않습니다.

- [3ds Max](https://github.com/dcc-mcp/dcc-mcp-3dsmax) – Autodesk 3ds Max.
- [3D Slicer](https://github.com/dcc-mcp/dcc-mcp-slicer) – 경계가 명확한 합성된 볼륨들, 재료의 가상 모델들, 그리고 NRRD/STL 형식으로 내보낼 수 있는 구형 메시들입니다. 또한, 카메라 설정 및 스라이스 설정 기능도 제공됩니다. PNG 형식의 미리보기도 가능합니다. 이 서비스는 합성된 데이터만을 처리하며, 환자 데이터나 DICOM 형식의 데이터는 처리하지 않습니다. 또한, 임상적인 정보나 임의의 장면 데이터도 처리하지 않습니다. 소스 데이터는 Core와 서버 0.20.41 버전에 고정되어 있습니다. 네이티브 재인증이 필요합니다. CLI 0.20.39에서는 이 서비스가 어댑터 식별자로 확인되지 않습니다.
- [애프리케이션스](https://github.com/dcc-mcp/dcc-mcp-aftereffects) – 어도비 애프리케이션스.
- [AutoCAD](https://github.com/dcc-mcp/dcc-mcp-autocad) – COM 인터페이스를 통해 이동식으로 DWG 파일을 자동화할 수 있습니다. 또한, `accoreconsole.exe`를 사용하여 자동화 기능을 활성화할 수도 있습니다. 현재 사용 가능한 버전과 설정 방법에 대해서는 해당 리포지토리를 확인해 주세요.
- [Blender](https://github.com/dcc-mcp/dcc-mcp-blender) – Blender의 추가 기능이자, 내장된 서버 기능도 포함되어 있습니다.
- [CapCut](https://github.com/dcc-mcp/dcc-mcp-capcut) – 인증된 로컬 브리지를 사용하여 CapCut 데스크톱 애드온을 입력하는 방법입니다.
- [Cinema 4D](https://github.com/dcc-mcp/dcc-mcp-cinema4d) – 키보드로 입력된 헤드리스 문서, 원시 데이터, 데이터의 교환 및 렌더링 자동화 기능을 제공합니다.
- [ComfyUI](https://github.com/dcc-mcp/dcc-mcp-comfyui) – 실시간 노드-계약 검증, 제한된 큐 처리, 아티팩트 가져오기 기능을 제공합니다. [ComfyUI MCP 가이드](/ko/control/comfyui)에서는 로컬 게임 UI, 투명한 PNG 형식, Pixal3D/PBR GLB 형식의 렌더링 방법에 대해 설명하고 있습니다. 또한, 소스 코드와 릴리스된 버전의 차이점도 설명되어 있습니다.
- [Epic Games Launcher 및 Fab] – v0.2.1 버전이 독립적으로 출시되었습니다([출시 소스: [Epic Games Launcher and Fab](https://github.com/dcc-mcp/dcc-mcp-epic)/tree/1157defe203aab4beaa8f7be56f8063caac2a415]). 이 버전은 설치된 엔진의 인벤토리 관리, 프로젝트 확인, 그리고 bounded provider가 관리하는 Fab 관련 작업들을 지원합니다. 하지만 CLI 0.20.39에서 확인된 카탈로그에는 이 버전의 정보가 포함되어 있지 않습니다. 엔진의 설치는 계획 단계에 머물러 있으며, 검증된 네이티브 프로바이더는 없습니다. 로그인, CAPTCHA 처리, 구매, 라이선스 수락 등은 여전히 사람이 직접 처리합니다. 자세한 내용은 [Epic Games 관리 가이드](/ko/control/epic-games)를 참조하십시오. [릴리스 소스](https://github.com/dcc-mcp/dcc-mcp-epic/tree/1157defe203aab4beaa8f7be56f8063caac2a415)
- [FreeCAD](https://github.com/dcc-mcp/dcc-mcp-freecad) – 파라메트릭 CAD 모델링, 토폴로지 검증, 메시 교환 기능을 제공합니다.
- [Gaea](https://github.com/dcc-mcp/dcc-mcp-gaea) – v0.1.1 버전으로 독립적으로 출시되었습니다. 이 버전에서는 타입화된 Build Swarm 지형물 작업과 결과 확인 기능이 지원됩니다. 하지만 CLI 0.20.39에서 확인된 카탈로그 내의 어댑터 식별자는 아닙니다. 실제로 라이선스가 부여된 빌드, 프로세스 트리의 취소, 지형물의 품질, Unreal 엔진을 이용한 데이터 불러오기 기능은 아직 검증되지 않았습니다. 자세한 내용은 [Gaea 제어 가이드](/ko/control/gaea)를 참조하세요. [릴리스 소스](https://github.com/dcc-mcp/dcc-mcp-gaea/tree/b95d3f81b8f883732c73d268658100d09d9cad84)
- [GameMaker](https://github.com/dcc-mcp/dcc-mcp-gamemaker) – GameMaker 어댑터입니다. CLI 0.20.39에서 확인된 카탈로그에는 이 어댑터의 식별번호가 없습니다.
- [GIMP](https://github.com/dcc-mcp/dcc-mcp-gimp) – GIMP 3.
- [Godot](https://github.com/dcc-mcp/dcc-mcp-godot) – Godot 엔진과 2D 게임 제작 기술에 관한 내용입니다.
- [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) – SideFX Houdini.
- [일러스트레이터](https://github.com/dcc-mcp/dcc-mcp-illustrator) – 어도비 일러스트레이터 문서를 입력할 수 있으며, 벡터 그래픽 작업도 가능합니다. 또한, DOM을 편집하거나 프로덕션용 파일을 내보낼 수도 있습니다.
- [Inkscape](https://github.com/dcc-mcp/dcc-mcp-inkscape) – CLI 0.20.39가 확인한 카탈로그 외부에서의 소스 통합입니다. 클라우드 MCP 생산 워크플로우는 출처 검증 문제로 인해 계속 중단되어 있습니다. 자세한 내용은 [클라우드 테스트 기록](/ko/cloud-agents#cloud-mcp-tests)을 참조하세요.
- [Katana](https://github.com/dcc-mcp/dcc-mcp-katana) – Foundry Katana입니다.
- [Kdenlive](https://github.com/dcc-mcp/dcc-mcp-kdenlive) – 프로젝트 작성, MLT 렌더링, 그리고 공유된 DCC-CUA 편집기 기능을 제공합니다. 이 리포지토리는 v0.1.1 버전을 독립적으로 출시했습니다([출시 소스](https://github.com/dcc-mcp/dcc-mcp-kdenlive/tree/376c812047b308239174aa1bbb662da1908f829e)). CLI 0.20.39에서 확인된 카탈로그에는 `kdenlive`가 0.1.0 버전으로 표시되어 있으며, `catalog_install_available=false`로 설정되어 있습니다. 이 카탈로그 검사는 실제 편집기나 렌더링 기능을 확인하지 않았습니다. 자세한 내용은 [Kdenlive 사용 설명서](/ko/control/kdenlive)를 참조하십시오.
- [KiCad](https://github.com/dcc-mcp/dcc-mcp-kicad) – 원하는 KiCad 9 보드 설계를 작성할 수 있는 도구입니다. 이 도구는 네이티브 `pcbnew` API와 `kicad-cli`를 통해 작동합니다. KiCad는 PCB Editor나 IPC/UI를 통해 제어되는 방식이 아니라, 별도의 독립된 보드를 사용합니다. 소스 코드는 Core와 서버 버전 0.20.41에 고정되어 있으며, 네이티브 재인증이 진행 중입니다. 현재는 공개되지 않았으며, CLI 0.20.39에서 확인된 어댑터 식별자는 없습니다.
- [Krita](https://github.com/dcc-mcp/dcc-mcp-krita) – Krita.
- [LiquiGen](https://github.com/dcc-mcp/dcc-mcp-liquigen) – 노드 그래프의 검사 기능, 제한된 시뮬레이션 제어 기능, VAT 형식의 데이터 내보내기 기능, 그리고 Unreal Engine과의 연동 기능을 제공합니다. CLI 0.20.39에서 확인된 카탈로그에는 `liquigen`이라는 이름으로 등재되어 있습니다.
- [Mari](https://github.com/dcc-mcp/dcc-mcp-mari) – Foundry의 Mari 프로젝트들에 관한 정보, 기하학적 구조, 노드 그래프, 외관 디자인, 텍스처 출력 방법 등에 대한 내용입니다.
- [Material Maker](https://github.com/dcc-mcp/dcc-mcp-material-maker) – 절차적 자료 생성 기능입니다. CLI 0.20.39에서 확인된 카탈로그에는 버전 0.3.1이 포함되어 있으며, `catalog_install_available=false`라는 설정이 적용되어 있습니다.
- [마야](https://github.com/dcc-mcp/dcc-mcp-maya) – 오토데스크 마야.
- [Marmoset Toolbag](https://github.com/dcc-mcp/dcc-mcp-marmoset) – PBR 재질 생성, 장면 검사, 렌더링 기능을 제공합니다.
- [Marvelous Designer](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer) – v0.1.1 버전이 독립적으로 출시되었습니다([출시 소스](https://github.com/dcc-mcp/dcc-mcp-marvelous-designer/tree/4d4d289905f82290804b288d03d84d541b01af08)). 이 버전에서는 의류 디자인, 시뮬레이션, 데이터 저장 및 내보내기 기능을 지원합니다. 하지만 CLI 0.20.39를 통해 확인된 카탈로그에는 이 제품에 대한 정보가 없습니다. 라이선스 관련 문제나 Qt 부트스트랩, 클라우드 시뮬레이션, 엔진 전환 기능 등은 아직 해결되지 않았습니다. 자세한 내용은 [Marvelous Designer 사용 설명서](/ko/control/marvelous-designer)를 참조하십시오.
- [MotionBuilder](https://github.com/dcc-mcp/dcc-mcp-mobu) – Autodesk MotionBuilder.
- [Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) – Foundry Nuke입니다.
- [OBS Studio](https://github.com/dcc-mcp/dcc-mcp-obs) – 정확한 프로세스의 장면/소스 검사 및 타입별 녹음 제어 기능을 제공합니다. CLI 0.20.39를 사용하여 카탈로그를 확인할 때 이 프로그램은 `obs`로 표시됩니다. 어댑터를 설치해도 OBS Studio는 설치되지 않습니다.
- [Office](https://github.com/dcc-mcp/dcc-mcp-office) – 공유된 `office` 애플리케이션 경로입니다. 이 프로토콜은 office-rpc/1이며, C# COM sidecar, Open XML worker, Microsoft Graph connector 등을 포함합니다. 또한 Office 전반에 걸친 기능들도 포함됩니다. 이 공유된 경로는 CLI 0.20.39에서 보고된 38개의 어댑터 식별자와는 별개입니다. 애플리케이션별 기능들은 각 어댑터에 의해 관리됩니다.
- [파워포인트](https://github.com/dcc-mcp/dcc-mcp-powerpoint) – Deck IR을 Open XML 형식으로 변환하여 데크를 생성하는 기능; CLI 0.20.39에서 확인된 카탈로그에는 버전 0.1.0이 있으며, `catalog_install_available=false`라는 메시지가 표시됩니다.
- [Word](https://github.com/dcc-mcp/dcc-mcp-word) – Word 문서, 필드들, 그리고 재조정 기능들입니다. (계획 중인 기능입니다. 이 어댑터 리포지토리는 아직 임시적인 것이며, 공개되지 않은 상태입니다.)
- [엑셀](https://github.com/dcc-mcp/dcc-mcp-excel) – 워크북, 수식, 차트, 그리고 생산 관련 대시보드들입니다. 이 기능들은 계획 단계에 있으며, 어댑터 리포지토리는 아직 임시적인 용도로만 사용되고 있습니다.
- [Outlook](https://github.com/dcc-mcp/dcc-mcp-outlook) – 메일 초안 및 일정 관리 기능을 제공합니다. 이 기능은 3단계에서 사용될 예정이며, `host_limited` 등급으로 분류됩니다. 이 기능은 로컨드에 설치된 Outlook을 MAPI/COM을 통해 제어합니다. 따라서 처음 실행할 때는 사용자의 동의가 필요합니다. 그러므로 이 기능에는 헤더리스 경로가 없으며, CI 검증 과정에서도 검증이 불가능합니다. Microsoft Graph를 통한 접근 방식이 필요합니다.
- [OpenSCAD](https://github.com/dcc-mcp/dcc-mcp-openscad) – 선언적 매개변수화된 CAD 도구로, 디자인의 검증, 미리보기 렌더링, 메시 형태로의 내보내기가 가능합니다.
- [OpenScreen](https://github.com/dcc-mcp/dcc-mcp-openscreen) – v0.1.1 버전으로 독립적으로 출시된 제품입니다([출시 소스](https://github.com/dcc-mcp/dcc-mcp-openscreen/tree/5a32837d9d1b3bd2aea04bf61e61b4a54bbd5262)). 입력된 내용을 기반으로 `sources`, `record`, `export`와 같은 기능들이 지원됩니다. 하지만 CLI 0.20.39에서 확인된 카탈로그에는 이 제품의 아이디어가 포함되어 있지 않습니다. 소스 테스트 결과는 실제 Windows 환경에서의 recording 기능이 제대로 작동하는지를 확인하지 못했습니다. 지원되지 않는 창 선택 기능은 dcc-cua와 ui-control에 의해 처리됩니다. 자세한 내용은 [OpenScreen 컨트롤 가이드](/ko/control/openscreen)를 참조하십시오.
- [ParaView](https://github.com/dcc-mcp/dcc-mcp-paraview) – 영구적으로 저장된 ParaView 파이프라인입니다. 제한된 프리미티브, 평면 클립 및 스licing, 컨투어 추출, 검증된 데이터셋의 내보내기, PVSM 상태 저장, 그리고 디스플레이 기반의 PNG 미리보기 기능이 포함됩니다. 소스 코드는 Core와 서버 0.20.41에 고정되어 있으며, 네이티브 재인증이 진행 중입니다. 아직 공개된 버전은 없으며, CLI 0.20.39에서 확인된 카탈로그에도 어댑터 식별자는 없습니다.
- [PhotoCraft](https://github.com/dcc-mcp/dcc-mcp-photocraft) – 공식적인 PhotoCraft 0.2.0 헤드리스 엔진을 위한 실험적인 어댑터입니다. 이 어댑터는 문서, 레이어, 마스크, 선택된 내용, 조정 사항, 미리보기, 그리고 내보내기와 관련된 기능들을 처리하는 하나의 stdio 프로세스를 가지고 있습니다. 이 어댑터는 어떤 애플리케이션도 포함하지 않으며, 데스크톱 창도 열지 않습니다. CLI 0.20.39에서 확인된 카탈로그에는 이 어댑터가 등재되어 있지 않습니다.
- [PdfCraft](https://github.com/dcc-mcp/dcc-mcp-pdfcraft) – PdfCraft 어댑터입니다. CLI 0.20.39에서 확인된 카탈로그에는 이 어댑터에 대한 정보가 없습니다.
- [포토샵](https://github.com/dcc-mcp/dcc-mcp-photoshop) – UXP을 통해 Adobe Photoshop을 사용하는 방법입니다.
- [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) – 어도비 프리미어 프로.
- [QGIS](https://github.com/dcc-mcp/dcc-mcp-qgis) – MCP를 통해 작성된 QGIS 프로젝트와 벡터 데이터를 편집할 수 있는 도구입니다. 이 도구는 어댑터가 소유하는 헤드리스 PyQGIS 프로세스를 통해 실행되며, 별도의 프로젝트로 관리됩니다. 이 도구는 실행 중인 QGIS 데스크톱 세션에 연결되지 않습니다. 소스 코드는 Core와 서버 버전 0.20.41에 고정되어 있으며, 네이티브 재검증이 필요합니다. PyPI 패키지나 GitHub 릴리스는 존재하지 않으며, CLI 0.20.39에서 확인된 카탈로그에는 어댑터 식별자가 없습니다.
- [REAPER](https://github.com/dcc-mcp/dcc-mcp-reaper) – REAPER DAW 어댑터입니다. CLI 0.20.39에서 확인한 카탈로그에는 이 어댑터에 대한 정보가 없습니다.
- [RizomUV](https://github.com/dcc-mcp/dcc-mcp-rizomuv) – 헤드리스 방식의 UV 해제 및 패킹 기능입니다. CLI 0.20.39에서 확인된 카탈로그에는 이 어댑터에 대한 정보가 없습니다.
- [SketchUp](https://github.com/dcc-mcp/dcc-mcp-sketchup) – 인증된 Ruby API를 통해 모델링, 재료 선택, 태그 지정, 장면 생성, 검증 및 데이터 교환 등을 수행할 수 있습니다.
- [쇼군](https://github.com/dcc-mcp/dcc-mcp-shogun) – 씬 객체, 속성, 채널, 광학 카메라, 파일, 타임라인 제어, 그리고 오프라인 처리 설정 및 작업에 관련된 공식적인 도구입니다. 실제 사용할 수 있는 도구들을 미리 확인해 보세요.
- [SpeedTree](https://github.com/dcc-mcp/dcc-mcp-speedtree) – 정확한 인스턴스와 공식적인 호ック 기능을 지원하는 독립적으로 배포된 v0.1.1 버전입니다. 이는 CLI 0.20.39에서 확인된 카탈로그 내의 어댑터 식별자가 아닙니다. Unreal Engine 5.5.4에서 실제로 ST9 전환이 성공적으로 이루어졌습니다. 하지만 충돌 스케일과 동적 바람 효과는 아직 확인되지 않았습니다. [SpeedTree MCP 가이드](/ko/control/speedtree)를 참조하십시오. [릴리스 소스](https://github.com/dcc-mcp/dcc-mcp-speedtree/tree/595f0bd308aa0f4f0635a399c2b63bd76f16caf8)
- [DaVinci Resolve](https://github.com/dcc-mcp/dcc-mcp-resolve) – 프로젝트, 미디어 풀, 타임라인, 갤러리 등을 확인하기 위한 DaVinci Resolve용 어댑터입니다. CLI 0.20.39에서 확인된 카탈로그에는 이 어댑터에 대한 정보가 없습니다.
- [Substance 3D Designer](https://github.com/dcc-mcp/dcc-mcp-substance3d-designer) – Adobe Substance 3D Designer.
- [Substance 3D Painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter) – Adobe Substance 3D Painter.
- [Tiled](https://github.com/dcc-mcp/dcc-mcp-tiled) – Tiled 맵 편집기입니다. CLI 0.20.39 버전에서 확인된 카탈로그에는 0.3.0 버전이 나와 있으며, `catalog_install_available=false`라는 메시지가 표시됩니다.
- [Tracy Profiler](https://github.com/dcc-mcp/dcc-mcp-tracy) – 독립적으로 배포된 어댑터 버전 0.2.5입니다([출시 소스](https://github.com/dcc-mcp/dcc-mcp-tracy/tree/a5e29b7bcef28ccd6a2ee17667dbdbcb7c45b119)). 이 어댑터는 제한된 시간 동안의 트레이시 캡처 및 오프라인 영역 분석을 위한 것입니다. 이 어댑터는 CLI 0.20.39에서 확인되는 카탈로그에 포함된 어댑터가 아닙니다. 따라서 이미 장치가 측정된 상태여야 합니다. 자세한 내용은 [Tracy 제어 가이드](/ko/control/tracy)를 참조하십시오.
- [TouchDesigner](https://github.com/dcc-mcp/dcc-mcp-touchdesigner) – TouchDesigner의 변형 버전입니다.
- [유니티](https://github.com/dcc-mcp/dcc-mcp-unity) – 유니티 에디터와 게임 제작 관련 기술들.
- [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) – Unreal Engine용 플러그인입니다.
- [Wwise](https://github.com/dcc-mcp/dcc-mcp-wwise) – 타입스크립트로 작성된 WAAPI 도구를 사용하여 Audiokinetic Wwise에서 카탈로그를 생성하는 방법입니다. CLI 0.20.39에서 확인된 카탈로그에는 버전 0.1.2가 포함되어 있지만, `catalog_install_available=false`로 표시됩니다.
- [ZBrush](https://github.com/dcc-mcp/dcc-mcp-zbrush) – Maxon ZBrush.

## 전문화된 마야인의 기술들

- [AdvancedSkeleton](https://github.com/dcc-mcp/dcc-mcp-maya-advancedskeleton) – AdvancedSkeleton의 리깅 작업 방식들.
- [mGear](https://github.com/dcc-mcp/dcc-mcp-maya-mgear) – mGear Shifter와의 통합 기능입니다.
- [절차적 아키텍처](https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture) – Maya, Bifrost, 그리고 Arnold의 아키텍처 워크플로우들.

## 생성 서비스

로컬에서의 생성에 대해서는, [ComfyUI 게임 자산 작업 흐름](/ko/control/comfyui)을 참조하세요.

- [훈원 3D](https://github.com/dcc-mcp/dcc-ai-hunyuan3d) – 텍스트와 이미지를 3D 형태로 변환하는 기능입니다.
- [OpenAI 이미지](https://github.com/dcc-mcp/dcc-ai-openai-image) – DCC 텍스처 워크플로우를 위한 이미지 생성 및 편집 기능.
- [트리포 3D](https://github.com/dcc-mcp/dcc-ai-tripo3d) – 텍스트, 이미지, 그리고 다중 시점을 활용한 3D 생성 기술입니다.

## 자산 제공자들

- [ambientCG](https://github.com/dcc-mcp/dcc-asset-ambientcg) · [Blender 확장 기능들](https://github.com/dcc-mcp/dcc-asset-blender-extensions) · [무료 미디어 자료들](https://github.com/dcc-mcp/dcc-asset-free-media)
- [지리정보](https://github.com/dcc-mcp/dcc-asset-geospatial) · [glTF 샘플 자산](https://github.com/dcc-mcp/dcc-asset-gltf-sample-assets) · [Godot Asset Store](https://github.com/dcc-mcp/dcc-asset-godot-store)
- [구글 스캔된 물체들](https://github.com/dcc-mcp/dcc-asset-google-scanned-objects) · [케니](https://github.com/dcc-mcp/dcc-asset-kenney) · [NASA 3D](https://github.com/dcc-mcp/dcc-asset-nasa3d)
- [오브자버스](https://github.com/dcc-mcp/dcc-asset-objaverse) · [폴리 헤이븐](https://github.com/dcc-mcp/dcc-asset-polyhaven) · [콰테르니우스](https://github.com/dcc-mcp/dcc-asset-quaternius)
- [Sketchfab](https://github.com/dcc-mcp/dcc-asset-sketchfab) · [Smithsonian 3D](https://github.com/dcc-mcp/dcc-asset-smithsonian3d)
- [피라이트 네이션](https://github.com/dcc-mcp/dcc-asset-pirate-nation) – 게임 자산 제공자와의 통합 기능입니다.
- [폴리 피자](https://github.com/dcc-mcp/dcc-asset-poly-pizza) – 자산 라이선스와 소스 기록이 포함된, 저해상도 모델들의 검색 및 다운로드 기능을 제공합니다.

## UI 자동화 및 공유된 런타임 환경

- [winget-releaser](https://github.com/dcc-mcp/winget-releaser) – 애플리케이션 관리자들을 위한 Windows 패키지 관리자의 릴리스 자동화 도구입니다.
- [Qt Actions](https://github.com/dcc-mcp/dcc-ui-qt-actions) – Qt 기반의 DCC 인터페이스를 위해 재사용할 수 있는 타입스크립트로 작성된 액션들입니다.
- [Qt Inspector](https://github.com/dcc-mcp/dcc-ui-qt-inspector) – 다양한 호스트 간의 창과 위젯을 발견하는 기능입니다.
- [UI 워크플로우 메모리](https://github.com/dcc-mcp/dcc-ui-workflow-memory) – 확인된 선택자들, 레시피들, 그리고 오류에 관련된 메모리 정보입니다.
- [dcc-mcp-filmcraft](https://github.com/dcc-mcp/dcc-mcp-filmcraft) – 실험적인 FilmCraft 통합 기능입니다. 이는 동일한 웹어셈블리 편집기에서 작동하는 브라우저용 SDK입니다.
- [adobepy](https://github.com/dcc-mcp/adobepy) – 어도비 데스크톱 통신 환경을 공유하는 도구입니다.

## 조직과 발견의 표면들

아래에는 추가로 사용할 수 있는 기능들이 나열되어 있습니다. 사용 가능한 기능들은 설치된 CLI 카탈로그를 확인해보세요. 리포지토리나 원격 커넥터만으로는 실제 애플리케이션 인스턴스를 생성할 수 없습니다.

- [Autodesk Product Help](https://developer.api.autodesk.com/knowledge/public/v1/mcp) – Opt-in 방식의 외부 읽기 전용 문서 연결 기능입니다. 이 연결 기능은 `autodesk-help`로 식별됩니다. 이는 CLI 0.20.39에서 보고된 38개의 어댑터 식별자와는 별개의 기능이며, 애플리케이션 변경 사항과는 관련이 없습니다.

- [공식 웹사이트 출처](https://github.com/dcc-mcp/dcc-mcp.github.io) – 공유된 문서들, 지리적 위치 관련 메타데이터, 애플리케이션 제어에 관한 가이드들, 그리고 성공 사례들도 포함되어 있습니다.
- <a href="https://dcc-mcp.github.io/showcase/" target="_self">쇼케이스 컬렉션</a> – 작업이 완료되었습니다. 재사용 가능한 프롬프트, 프로젝트의 출처, 라이선스 관련 정보, 그리고 제작 과정에 대한 명확한 증거들이 있습니다. [콜렉션의 출처와 기여자들](https://github.com/dcc-mcp/showcase). [어댑터의 예시와 프롬프트](/ko/examples)도 그 원래의 증거 범위를 유지하고 있습니다.
- [에이전트 플러그인](https://github.com/dcc-mcp/dcc-mcp-agent-plugins) – 지원되는 에이전트 클라이언트용으로 제공되는 표준화된 DCC-MCP 스킬 및 플러그인 패키지들입니다.
- [dcc-cua](https://github.com/dcc-mcp/dcc-cua) – 범용 컴퓨터 사용 자동화 런타임입니다. 이는 제한된 DCC UI 워크플로우에서 사용됩니다.
- [조직 프로필](https://github.com/dcc-mcp/.github) – 공유된 GitHub 프로필 및 커뮤니티 설정 정보입니다.

> 프로젝트의 사용 가능성 및 설치 관련 지원은 카탈로그의 버전에 따라 변경될 수 있습니다. `dcc-mcp-cli --json dcc-types`를 사용하여 현재 카탈로그의 소스, 어댑터 버전, 설치 관련 플래그들을 확인할 수 있습니다. 또한, `dcc-mcp-cli marketplace search`를 사용하면 설치 가능한 확장 기능들을 찾을 수 있습니다.
