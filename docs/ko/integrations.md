---
title: "제작 소프트웨어 연동"
description: "제작 소프트웨어별 MCP 어댑터, CLI 식별자와 공식 저장소를 안내합니다."
pageClass: integrations-page
outline: [2, 3]
---

# 제작 소프트웨어 연동

DCC-MCP는 AI 에이전트를, 팀이 이미 사용하고 있는 디지털 콘텐츠 제작 소프트웨어와 연결합니다. 이 디렉토리는, 지원되는 각 애플리케이션을 해당 애플리케이션의 공식 어댑터 리포지토리와 연결시킵니다. 또한, 사람들이 자주 사용하는 검색어들도 포함되어 있습니다. 여기에는 **Maya MCP**, **Blender MCP**, **Houdini MCP**, **3ds Max MCP**, **Substance Painter MCP**, **SP MCP** 등이 포함됩니다.

연결된 DCC를 작동시키려면 [공식 사이트](https://clawhub.ai/loonghao/skills/dcc-mcp)를 사용하세요. 워크플로우 확장 기능을 찾고 싶다면 [Skill Marketplace](/ko/marketplace)를 이용하세요. 그리고 실제 출시된 카탈로그를 확인하려면 [`dcc-mcp-cli dcc-types`](https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference)를 사용하세요.

## 공식적인 DCC MCP 디렉토리

아래 표에는 주요 연동 사례가 나와 있습니다. Core 0.20.39 카탈로그에는 Wwise를 포함한 어댑터 식별자 38개가 있습니다. 현재 환경에서는 `dcc-mcp-cli dcc-types`로 확인하세요. [DCC-MCP 프로젝트 목록](/ko/ecosystem)

| 애플리케이션 | 일반적인 검색어들 | 공식적인 통합 |
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

## 공통적인 DCC MCP 검색 내용들

### 마야 MCP라는 것이 존재할까요?

네. 공식적인 [Maya MCP 통합](https://github.com/dcc-mcp/dcc-mcp-maya)을 통해 Autodesk Maya가 DCC-MCP 게이트웨이와 연결됩니다. 입력된 검색어와 콜 플로우를 사용하여, 연결된 Maya 인스턴스에서 사용할 수 있는 도구들을 확인할 수 있습니다.

### Blender MCP라는 것이 존재하나요?

네. 공식적인 [Blender MCP 통합](https://github.com/dcc-mcp/dcc-mcp-blender)을 통해 Blender는 동일한 게이트웨이와 연결됩니다. 또한, 공유된 DCC-MCP 디스커버리, 유효성 검사, 그리고 워크플로우 계약도 지원됩니다.

### 혹시 Houdini MCP라는 것이 존재할까요?

네. 공식적인 [Houdini MCP 통합 기능](https://github.com/dcc-mcp/dcc-mcp-houdini)을 통해, SideFX Houdini용 저장소와 호스트별 구현이 제공됩니다.

### SP MCP는 무엇을 의미하나요?

**SP MCP**는 **Substance Painter MCP**의 약어입니다. 공식적인 이름은 **Substance 3D Painter MCP**이며, 이는 [dcc-mcp-substance3d-painter](https://github.com/dcc-mcp/dcc-mcp-substance3d-painter)에서 제공됩니다. 텍스처를 사용한 그래픽 작업을 할 때는 이 리포지토리와 DCC-MCP 마켓플레이스를 활용하세요.

### DCC MCP 도구를 어떻게 찾을 수 있을까요?

`dcc-mcp-cli health`을 사용하여 게이트웨이를 확인하고, `dcc-mcp-cli search --query <intent> --dcc-type <host>`를 사용하여 검색 범위를 좁힌 후, 반환된 `next_step`을 따릅니다. 설치 및 호스트별 어댑터에 대한 자세한 정보는 호스트별 리포지토리를 참조하세요.

## 계속 진행해 주세요.

- [에이전트를 통해 DCC-MCP를 사용하세요.](/ko/agents)
- [스킬 마켓을 검색해보세요.](/ko/marketplace)
- [생산 모델을 이해해야 합니다.](/ko/why-dcc-mcp)
- [전체 에코시스템을 살펴보세요.](/ko/ecosystem)
