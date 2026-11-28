<script setup lang="ts">
import { type SiteLocale, localePrefix, mediaLocale } from '../../i18n/locales'
import { useHomeTranslations } from '../data/home-translations'
import { computed, onBeforeUnmount, ref } from 'vue'
import { setupPrompts } from '../data/setup-prompts'
import HomeInstallOptions from './HomeInstallOptions.vue'
const props = defineProps<{ locale: SiteLocale }>()
const translations = useHomeTranslations()
const localCopy = computed(() => translations?.value?.HomeSetup)
const state = ref<'idle' | 'copied' | 'error'>('idle')
let timer: ReturnType<typeof setTimeout> | undefined
const copy = computed(() => localCopy.value ?? (props.locale === 'zh' ? {
  eyebrow: '开始连接', title: '从一句话，开始接入你的工具。', description: '把配置提示词交给你正在使用的 Agent。它会先检查现有工具，安装或改变系统状态前询问你。',
  prompt: '请帮我把现有创作工具接入 DCC-MCP，先检查环境，再给出验证结果。', button: '复制配置提示词', copied: '已复制', error: '复制失败，请展开并手动复制。',
  details: '查看完整配置提示词', guide: '阅读 Agent 接入指南', prefix: '/zh',
} : {
  eyebrow: 'GET CONNECTED', title: 'Start with one clear request.', description: 'Give the prompt to your agent. It checks the tools you already have, guides the connection, and asks before installing or changing system state.',
  prompt: 'Connect the creative applications on this machine to DCC-MCP. Check what is already installed, ask before changes, and finish with verification evidence.', button: 'Copy setup prompt', copied: 'Copied', error: 'Could not copy. Expand the prompt and copy it manually.',
  details: 'Read the full setup prompt', guide: 'Read the agent setup guide', prefix: '',
}))
const fullPrompt = computed(() => localCopy.value?.full ?? setupPrompts[mediaLocale(props.locale)])
async function copyPrompt() {
  clearTimeout(timer)
  try {
    await navigator.clipboard.writeText(fullPrompt.value)
    state.value = 'copied'
    timer = setTimeout(() => { state.value = 'idle' }, 2400)
  } catch { state.value = 'error' }
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section id="install-prompt" class="home-section home-setup" aria-labelledby="setup-title">
    <div class="section-intro"><p class="home-eyebrow">{{ copy.eyebrow }}</p><h2 id="setup-title">{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
    <HomeInstallOptions :locale="locale" />
    <div class="setup-prompt"><p>{{ copy.prompt }}</p><button type="button" class="site-button primary" @click="copyPrompt">{{ state === 'copied' ? copy.copied : copy.button }} <span aria-hidden="true">{{ state === 'copied' ? '✓' : '↗' }}</span></button></div>
    <p class="copy-status" role="status">{{ state === 'error' ? copy.error : state === 'copied' ? copy.copied : '' }}</p>
    <details class="setup-details"><summary>{{ copy.details }}</summary><pre><code>{{ fullPrompt }}</code></pre></details>
    <a class="text-link" :href="`${localePrefix(locale)}/agents`">{{ copy.guide }} <span aria-hidden="true">→</span></a>
  </section>
</template>
