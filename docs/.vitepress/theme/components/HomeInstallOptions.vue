<script setup lang="ts">
import { type SiteLocale, localePrefix } from '../../i18n/locales'
import { useHomeTranslations } from '../data/home-translations'
import { computed, ref } from 'vue'
import { agentInstallers, featuredAgentInstallers } from '../data/agent-installers'

const props = defineProps<{ locale: SiteLocale }>()
const translations = useHomeTranslations()
const localCopy = computed(() => translations?.value?.HomeInstallOptions)
const selectedId = ref('auto')
const state = ref<'idle' | 'copied' | 'error'>('idle')

const selected = computed(() => agentInstallers.find((agent) => agent.id === selectedId.value) ?? agentInstallers[0])

const copy = computed(() => localCopy.value ?? (props.locale === 'zh' ? {
  eyebrow: 'AGENT 安装路径',
  choose: '选择你的 Agent',
  copy: '复制安装命令',
  copied: '已复制',
  error: '复制失败，请手动复制。',
  open: '打开发布页',
  worksWith: '支持你的 Agent',
  viewAll: '查看全部 Agent',
  platforms: '个平台，统一入口',
  npmTitle: '需要基于 npm 的分发方式？',
  npmBody: '只有在 Agent 或团队工作流通过 node_modules 管理 Skills 时才需要安装 npm 包。',
  npmLink: '查看 npm 包',
  promptLabel: '然后用一句简短提示词开始：',
  prompt: '使用 dcc-mcp Skill 为这台机器上的创意应用配置 DCC-MCP。安装软件或改变系统状态前先询问我，完成后提供验证证据。',
  installNote: 'Skills CLI 命令请在 Agent 的工作目录运行；如需供当前用户的所有项目使用，可追加 --global。',
  skillsCli: 'Skills CLI',
  native: '原生插件',
  registry: '技能市场',
  manual: '发布包',
} : {
  eyebrow: 'AGENT INSTALL PATHS',
  choose: 'Choose your agent',
  copy: 'Copy install command',
  copied: 'Copied',
  error: 'Could not copy. Copy the command manually.',
  open: 'Open release page',
  worksWith: 'Works with your agent',
  viewAll: 'View every supported agent',
  platforms: 'platforms, one entry point',
  npmTitle: 'Need a package-based workflow?',
  npmBody: 'Use the npm package when an Agent or team workflow vendors Skills through node_modules.',
  npmLink: 'View the npm package',
  promptLabel: 'Then start with a short prompt:',
  prompt: 'Use the dcc-mcp Skill to set up DCC-MCP for the creative applications on this machine. Ask before installing or changing system state, and finish with verification evidence.',
  installNote: 'Run the Skills CLI command from your Agent workspace; use --global for user-level installation.',
  skillsCli: 'Skills CLI',
  native: 'Native plugin',
  registry: 'Skill registry',
  manual: 'Release archive',
}))

const kindLabel = (kind: typeof agentInstallers[number]['kind']) => {
  if (kind === 'native') return copy.value.native
  if (kind === 'registry') return copy.value.registry
  if (kind === 'manual') return copy.value.manual
  return copy.value.skillsCli
}

function selectAgent(id: string) {
  selectedId.value = id
  state.value = 'idle'
}

async function copyCommand() {
  if (selected.value.action === 'link') {
    window.open(selected.value.command, '_blank', 'noopener,noreferrer')
    return
  }
  try {
    await navigator.clipboard.writeText(selected.value.command)
    state.value = 'copied'
    window.setTimeout(() => { state.value = 'idle' }, 2200)
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <div class="home-install-options">
    <div class="agent-install-heading">
      <p class="install-card-eyebrow">{{ copy.eyebrow }}</p>
      <label class="agent-install-select">
        <span>{{ copy.choose }}</span>
        <select :value="selected.id" @change="selectAgent(($event.target as HTMLSelectElement).value)">
          <option v-for="agent in agentInstallers" :key="agent.id" :value="agent.id">{{ agent.id === 'auto' && localCopy ? localCopy.auto : agent.name }}</option>
        </select>
      </label>
    </div>

    <div class="agent-install-rail" :aria-label="localCopy?.command ?? copy.copy">
      <div class="agent-install-command">
        <span class="agent-install-kind">{{ kindLabel(selected.kind) }} · {{ localCopy ? (selected.id === 'auto' ? localCopy.auto : selected.name) : selected.target }}</span>
        <code>{{ selected.command }}</code>
      </div>
      <button v-if="selected.action !== 'link'" type="button" class="site-button primary agent-install-copy" @click="copyCommand">
        {{ state === 'copied' ? copy.copied : copy.copy }} <span aria-hidden="true">{{ state === 'copied' ? '✓' : '↗' }}</span>
      </button>
      <a v-else class="site-button primary agent-install-copy" :href="selected.command" target="_blank" rel="noreferrer">
        {{ copy.open }} <span aria-hidden="true">↗</span>
      </a>
    </div>
    <p class="agent-install-status" role="status">{{ state === 'error' ? copy.error : '' }}</p>

    <div id="agent-logo-caption" class="agent-install-divider">{{ copy.worksWith }}</div>
    <div id="agent-logo-rail" class="logo-strip agent-logo-rail" role="group" aria-labelledby="agent-logo-caption">
      <div class="logo-strip-track">
        <div v-for="repeat in 2" :key="repeat" class="logo-strip-group agent-logo-group"
          :aria-hidden="repeat === 2 ? true : undefined">
          <button v-for="agent in featuredAgentInstallers" :key="agent.id" type="button"
            :tabindex="repeat === 2 ? -1 : undefined" :aria-pressed="agent.id === selected.id"
            @click="selectAgent(agent.id)">
            <span class="agent-logo" :style="{ '--logo': `url('/agent-logos/${agent.id}.svg')` }" aria-hidden="true" />
            <span>{{ agent.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <details class="agent-install-details">
      <summary>{{ copy.viewAll }} <span>{{ agentInstallers.length }} {{ copy.platforms }}</span></summary>
      <div class="agent-install-grid">
        <button
          v-for="agent in agentInstallers"
          :key="agent.id"
          type="button"
          :data-command="agent.command"
          :aria-pressed="agent.id === selected.id"
          @click="selectAgent(agent.id)"
        >
          <strong>{{ agent.id === 'auto' && localCopy ? localCopy.auto : agent.name }}</strong>
          <small>{{ kindLabel(agent.kind) }}</small>
        </button>
      </div>
    </details>

    <details class="agent-install-npm">
      <summary>{{ copy.npmTitle }}</summary>
      <div>
        <p>{{ copy.npmBody }}</p>
        <pre class="install-code"><code>npm install @dcc-mcp/skills</code></pre>
        <a class="text-link" href="https://www.npmjs.com/package/@dcc-mcp/skills" target="_blank" rel="noreferrer">{{ copy.npmLink }} <span aria-hidden="true">↗</span></a>
      </div>
    </details>

    <div class="install-followup">
      <p class="install-followup-label">{{ copy.promptLabel }}</p>
      <pre class="install-code install-prompt-code"><code>{{ copy.prompt }}</code></pre>
      <p class="install-note">{{ copy.installNote }} <a :href="`${localePrefix(locale)}/agents`">{{ localCopy?.notes ?? (locale === 'zh' ? '查看 Agent 客户端安装说明' : 'See Agent host install notes') }}</a></p>
    </div>
  </div>
</template>
