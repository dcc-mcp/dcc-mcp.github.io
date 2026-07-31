---
title: 如何用 AI 控制 Maya、Houdini、Blender、创意应用与游戏引擎
description: 覆盖全部公开创意应用与流水线集成的 DCC-MCP 直接答案和安全 Agent 工作流。
pageClass: route-page
---

<script setup>
import DccControlGuideIndex from '../.vitepress/theme/components/DccControlGuideIndex.vue'
</script>

# 用 AI 控制创意应用

下面的示例使用公开 [`dcc-mcp` Skill](https://clawhub.ai/loonghao/skills/dcc-mcp) 与 `dcc-mcp-cli`。提示词描述结果和检查项，具体工具名称由 Agent 从已连接 Host 中查询。

如果你指的是让 AI Agent 操作正在运行的创意应用，而不是让聊天机器人讲教程或使用应用内置生成式功能，请先打开下面对应应用的直接答案。每份指南都会链接负责安装、兼容性和 Host 专属细节的适配器仓库。

## AI 怎么控制每一个 DCC？

<DccControlGuideIndex language="zh" />

## Maya 连接示例

安装 `dcc-mcp` Skill 并连接 [Maya 适配器](https://github.com/dcc-mcp/dcc-mcp-maya)。添加 CLI 或适配器前，先检查机器上已有的安装。

```text
请配置 DCC-MCP，让你可以在这台机器上控制 Maya。安装并严格遵循公开的 @loonghao/dcc-mcp Skill。先检查当前 CLI 和 Maya 适配器，安装软件或改变系统状态前必须征得我的同意。打开或发现 Maya，验证 Gateway 和在线 Maya 实例，完成一次只读 search 与 describe 流程，然后报告已连接实例、可用能力和下一步安全的 Maya 操作。配置期间不得修改我当前的场景。
```

检查连接：

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "检查 Maya 场景" --dcc-type maya
```

## Blender 连接示例

使用同一 Skill 与 CLI，并连接 [Blender 适配器](https://github.com/dcc-mcp/dcc-mcp-blender)。安装方式和 Blender 专属工具由该仓库维护。

```text
请配置 DCC-MCP，让你可以在这台机器上控制 Blender。安装并严格遵循公开的 @loonghao/dcc-mcp Skill。先检查当前 CLI 和 Blender 适配器，安装软件或改变系统状态前必须征得我的同意。打开或发现 Blender，验证 Gateway 和在线 Blender 实例，完成一次只读 search 与 describe 流程，然后报告已连接实例、可用能力和下一步安全的 Blender 操作。配置期间不得修改我当前的场景。
```

检查连接：

```bash
dcc-mcp-cli health
dcc-mcp-cli list
dcc-mcp-cli search --query "检查 Blender 场景" --dcc-type blender
```

## 我想在 Maya 创建十个随机的小球，要怎么做？

描述结果，不要猜测工具名称。提示词应写明随机种子、范围、命名和检查项。

```text
使用 dcc-mcp Skill 连接我的在线 Maya 实例。在名为 ai_random_spheres 的新 Group 中创建刚好 10 个多边形球体，使用确定性随机种子 42。每个球体使用唯一名称，并随机放置在 X -10..10、Y 0..10、Z -10..10 范围内，避免明显相交。不得删除或替换现有场景内容。先发现类型化 Maya 工具并遵循每个返回的 next_step，然后验证最终球体数量、名称、Transform 和 Group 归属。展示验证证据；除非我明确要求，否则不要保存场景。
```

## 我想做一个游戏，要从哪里开始？

先定义一个可玩循环，再选择 [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal)、[Unity](https://github.com/dcc-mcp/dcc-mcp-unity) 或 [Godot](https://github.com/dcc-mcp/dcc-mcp-godot)。可选资产在[技能市场](/zh/marketplace)查找，使用前检查许可证；[案例画廊](/zh/showcase)提供提示词示例。

```text
使用 DCC-MCP 帮我制作一个小型可玩游戏。先询问我选择 Unreal、Unity 还是 Godot，以及目标平台、视觉风格和一句话可玩循环。把想法缩小为一个关卡和一个胜利或失败条件。盘点已连接的 DCC 与引擎，发现类型化工具，并检查官方 Marketplace 是否有需要的安全授权资产。安装软件包、下载资产或改变系统状态前必须先征得我的同意。构建最小可玩切片，实际运行它，验证控制与胜负循环，保存证据并报告项目和打包构建路径。没有可运行构建时不得宣称完成。
```

## 我想用 AI 修图，要怎么做？

使用 [Photoshop 适配器](https://github.com/dcc-mcp/dcc-mcp-photoshop)完成修饰、调色、蒙版、图层与导出。开始前写明需要修改的内容、必须保留的内容和交付格式。

```text
使用 dcc-mcp Skill 连接 Photoshop 并帮我修图。先询问需要改变什么、哪些内容必须保持不变、参考效果和交付格式。保留原始文档，在宿主支持时使用新图层、调整图层、蒙版或 Smart Object；未经我批准，不得合并图层或覆盖源文件。发现类型化 Photoshop 工具，完成一次范围有限的初稿，对照需求检查效果，验证尺寸、颜色模式、图层结构和丢失资产；只有我确认预览后，才导出到新的路径。
```

## 我想用 AI 剪辑或合成片子，要怎么做？

使用 [Premiere Pro](https://github.com/dcc-mcp/dcc-mcp-premiere) 做时间线剪辑，[After Effects](https://github.com/dcc-mcp/dcc-mcp-aftereffects) 做动态图形和图层式镜头处理，[Nuke](https://github.com/dcc-mcp/dcc-mcp-nuke) 做节点式合成。任务应留在负责该工作流的应用中。

```text
使用 dcc-mcp Skill 帮我剪辑或合成这部片子。先询问任务属于 Premiere 时间线剪辑、After Effects 动态图形或图层合成，还是 Nuke 节点合成。盘点源媒体，确认分辨率、帧率、色彩空间、音频要求和交付目标。保留源文件，创建新的项目、Sequence 或 Comp，发现类型化工具，先完成一个代表性镜头或段落，渲染预览，检查丢失媒体和帧范围，并报告项目与预览路径。安装 Codec 或插件、重新链接媒体或开始最终渲染前必须征得我的同意。
```

## 我想用 AI 做特效，要怎么做？

使用 [Houdini](https://github.com/dcc-mcp/dcc-mcp-houdini) 做程序化几何与模拟，使用 Nuke 或 After Effects 做镜头合成，使用 [Unreal Engine](https://github.com/dcc-mcp/dcc-mcp-unreal) 做实时特效。先确定负责该效果的应用，再制作测试镜头。

```text
使用 dcc-mcp Skill 帮我制作视觉特效。先询问镜头需求、参考、时长、摄影机、交付格式，以及效果应在 Houdini 模拟、Nuke 或 After Effects 合成，还是 Unreal 实时 VFX 中完成。盘点已连接宿主，发现类型化工具，并提出最小代表性方案。保持参数可编辑，保留源素材和场景，只在需要时缓存或渲染，生成预览，验证时序、比例、色彩空间和缺失依赖，并报告场景、缓存和预览路径。下载资产、安装插件或启动昂贵模拟与最终渲染前必须征得我的同意。
```

## 为什么不直接让 AI 临时写脚本？

一次性任务仍可直接写脚本。工作流需要反复执行时，DCC-MCP 提供类型化发现、参数验证、实例路由、request ID 和诊断。操作步骤见 [Agent 使用](/zh/agents)。
