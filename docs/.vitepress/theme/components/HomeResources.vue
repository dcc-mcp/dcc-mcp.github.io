<script setup lang="ts">
import { type SiteLocale, localePrefix } from '../../i18n/locales'
import { computed } from 'vue'
import { useHomeTranslations } from '../data/home-translations'
defineProps<{ locale: SiteLocale }>()
const translations = useHomeTranslations()
const localCopy = computed(() => translations?.value?.HomeResources)
</script>
<template>
<div class="home-resources">
<template v-if="localCopy">
<section class="home-marketplace-section" aria-labelledby="cloud-agents-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">{{ localCopy.cloud }}</p>
      <h2 id="cloud-agents-title">{{ localCopy.workstation }}</h2>
    </div>
    <div>
      <p>{{ localCopy.cloudBody }}</p>
      <p><a :href="`${localePrefix(locale)}/cloud-agents`">{{ localCopy.cloudLink }}</a></p>
    </div>
  </div>
</section>
<section class="home-marketplace-section" aria-labelledby="mcp-cli-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">MCP + CLI</p>
      <h2 id="mcp-cli-title">{{ localCopy.contract }}</h2>
    </div>
    <div>
      <p>{{ localCopy.contractBody }}</p>
      <p><a :href="`${localePrefix(locale)}/control/maya`">Maya MCP / Maya CLI</a> · <a :href="`${localePrefix(locale)}/control/3ds-max`">3ds Max MCP / 3ds Max CLI</a> · <a :href="`${localePrefix(locale)}/control/blender`">Blender MCP / Blender CLI</a></p>
    </div>
  </div>
</section>
<section class="home-marketplace-section" aria-labelledby="vendor-ai-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">{{ localCopy.native }}</p>
      <h2 id="vendor-ai-title">{{ localCopy.nativeTitle }}</h2>
    </div>
    <div>
      <p><a href="https://github.com/dcc-mcp/dcc-mcp-unreal/blob/main/src/dcc_mcp_unreal/skills/unreal-official-mcp/SKILL.md">{{ localCopy.epic }}</a></p>
      <p><a href="https://github.com/dcc-mcp/dcc-mcp-unity/blob/main/src/dcc_mcp_unity/skills/unity-tuanjie-ai/SKILL.md">{{ localCopy.unity }}</a></p>
      <p><a :href="`${localePrefix(locale)}/control/unity`">Unity / Tuanjie AI</a> · <a :href="`${localePrefix(locale)}/control/unreal-engine`">Unreal Engine</a> · <a :href="`${localePrefix(locale)}/control/godot`">Godot</a></p>
    </div>
  </div>
</section>
</template>
<template v-else-if="locale === 'en'">
<section class="home-marketplace-section" aria-labelledby="cloud-agents-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">CLOUD AGENTS</p>
      <h2 id="cloud-agents-title">Your next workstation can be anywhere.</h2>
    </div>
    <div>
      <p>Inspect the available software, choose an MCP or CLI connection, and keep the project files and verification records. Compare documented platform interfaces, dated DCC tests, installation prerequisites, and deployment limits before choosing a host.</p>
      <p><a href="/cloud-agents">Cloud agents and DCC-MCP →</a></p>
    </div>
  </div>
</section>
<section class="home-marketplace-section" aria-labelledby="mcp-cli-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">MCP + CLI</p>
      <h2 id="mcp-cli-title">One tool contract. Every interface.</h2>
    </div>
    <div>
      <p>Maya MCP, 3ds Max MCP, and Blender MCP expose typed tools: each tool defines its parameters, types, and results so calls can be inspected and validated. MCP, <code>dcc-mcp-cli</code>, and REST use the same tool contract. For a Maya CLI or Blender CLI workflow, select the application by its identifier.</p>
      <p><a href="/control/maya">Maya MCP and Maya CLI</a> · <a href="/control/3ds-max">3ds Max MCP and 3ds Max CLI</a> · <a href="/control/blender">Blender MCP and Blender CLI</a></p>
    </div>
  </div>
</section>
<section class="home-marketplace-section" aria-labelledby="vendor-ai-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">VENDOR-NATIVE AI</p>
      <h2 id="vendor-ai-title">Let the application lead.</h2>
    </div>
    <div>
      <p><strong>Unreal Engine official MCP:</strong> the <a href="https://github.com/dcc-mcp/dcc-mcp-unreal/blob/main/src/dcc_mcp_unreal/skills/unreal-official-mcp/SKILL.md">Unreal Skill</a> enables and bridges Epic's official toolsets without renaming their tools or schemas.</p>
      <p><strong>Unity and Tuanjie AI:</strong> the <a href="https://github.com/dcc-mcp/dcc-mcp-unity/blob/main/src/dcc_mcp_unity/skills/unity-tuanjie-ai/SKILL.md">Unity Skill</a> inspects the native Codely CustomTool catalog before executing a freshly returned tool; Tuanjie still owns sign-in, credits, downloads, and task recovery.</p>
      <p>Agent-control guides: <a href="/control/unity">Unity and Tuanjie AI</a> · <a href="/control/unreal-engine">Unreal Engine</a> · <a href="/control/godot">Godot</a></p>
    </div>
  </div>
</section>
</template>
<template v-else>
<section class="home-marketplace-section" aria-labelledby="cloud-agents-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">云 AGENT</p>
      <h2 id="cloud-agents-title">让创作，跨过工作站。</h2>
    </div>
    <div>
      <p>先盘点可用软件，选择 MCP 或 CLI 连接方式，并保留工程文件与验证记录。选择环境前，对照平台官方接口、带日期的 DCC 实测、安装前提与部署限制。</p>
      <p><a href="/zh/cloud-agents">云 Agent 与 DCC-MCP →</a></p>
    </div>
  </div>
</section>
<section class="home-marketplace-section" aria-labelledby="mcp-cli-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">MCP + CLI</p>
      <h2 id="mcp-cli-title">同一套工具契约，多种接口。</h2>
    </div>
    <div>
      <p>Maya MCP、3ds Max MCP 和 Blender MCP 都提供类型化工具：每个工具明确规定参数、类型和返回结果，调用前可查询和校验。MCP、<code>dcc-mcp-cli</code> 与 REST 共用这套工具契约；要使用 Maya CLI 或 Blender CLI，只需在命令中指定对应应用标识。</p>
      <p><a href="/zh/control/maya">Maya MCP 与 Maya CLI</a> · <a href="/zh/control/3ds-max">3ds Max MCP 与 3ds Max CLI</a> · <a href="/zh/control/blender">Blender MCP 与 Blender CLI</a></p>
    </div>
  </div>
</section>
<section class="home-marketplace-section" aria-labelledby="vendor-ai-title">
  <div class="home-marketplace-heading">
    <div>
      <p class="home-kicker">厂商原生 AI</p>
      <h2 id="vendor-ai-title">顺着应用的原生能力创作。</h2>
    </div>
    <div>
      <p><strong>Unreal Engine 官方 MCP：</strong><a href="https://github.com/dcc-mcp/dcc-mcp-unreal/blob/main/src/dcc_mcp_unreal/skills/unreal-official-mcp/SKILL.md">Unreal Skill</a> 启用并接入 Epic 官方工具集，保留原有工具名称和参数定义。</p>
      <p><strong>Unity 与团结 AI：</strong><a href="https://github.com/dcc-mcp/dcc-mcp-unity/blob/main/src/dcc_mcp_unity/skills/unity-tuanjie-ai/SKILL.md">Unity Skill</a> 先查询 Codely CustomTool 工具目录，再调用本次查询确认可用的工具；登录、积分、下载和任务恢复仍由团结软件包处理。</p>
      <p>Agent 控制指南：<a href="/zh/control/unity">Unity 与团结 AI</a> · <a href="/zh/control/unreal-engine">Unreal Engine</a> · <a href="/zh/control/godot">Godot</a></p>
    </div>
  </div>
</section>
</template>
</div>
</template>
