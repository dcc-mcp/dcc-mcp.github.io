<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { setupPrompts } from '../data/setup-prompts'
import HomeInstallOptions from './HomeInstallOptions.vue'
const props = defineProps<{ locale: 'en' | 'zh' }>()
const state = ref<'idle' | 'copied' | 'error'>('idle')
let timer: ReturnType<typeof setTimeout> | undefined
const copy = computed(() => props.locale === 'zh' ? {
  eyebrow: '开始连接', title: '下一件作品，从一句话开始。', description: '复制给你正在使用的 Agent，让它带你完成连接。安装什么，先由你确认。',
  prompt: '帮我连接创意软件，我想开始制作下一件作品。', button: '复制连接提示词', copied: '已复制', error: '复制失败，请展开并手动复制。',
  details: '查看完整提示词', guide: '阅读 Agent 指南', prefix: '/zh',
} : {
  eyebrow: 'GET CONNECTED', title: 'Your next project starts with a prompt.', description: 'Give the setup prompt to your agent. It checks your tools, guides the connection, and asks before installing.',
  prompt: 'Connect my creative tools so I can start making.', button: 'Copy setup prompt', copied: 'Copied', error: 'Could not copy. Expand the prompt and copy it manually.',
  details: 'Read the full prompt', guide: 'Read the agent guide', prefix: '',
})
async function copyPrompt() {
  clearTimeout(timer)
  try {
    await navigator.clipboard.writeText(setupPrompts[props.locale])
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
    <details class="setup-details"><summary>{{ copy.details }}</summary><pre><code>{{ setupPrompts[locale] }}</code></pre></details>
    <a class="text-link" :href="`${copy.prefix}/agents`">{{ copy.guide }} <span aria-hidden="true">→</span></a>
  </section>
</template>
