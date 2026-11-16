<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ locale: 'en' | 'zh' }>()
const apps = [
  { name: 'Maya', logo: 'maya.svg' },
  { name: 'Blender', logo: 'blender.svg' },
  { name: 'Houdini', logo: 'houdini.svg' },
  { name: 'Unreal', logo: 'unreal.svg', invert: true },
  { name: 'Photoshop', logo: 'photoshop.png' },
  { name: '3ds Max', logo: '3dsmax.png' },
] as const
const active = ref(0)
const currentApp = computed(() => apps[active.value])
let timer: ReturnType<typeof setInterval> | undefined
let motionPreference: MediaQueryList | undefined
let hovered = false

function stopRotation() {
  clearInterval(timer)
  timer = undefined
}

function syncRotation() {
  stopRotation()
  if (!motionPreference || motionPreference.matches || document.hidden || hovered) return
  timer = setInterval(() => { active.value = (active.value + 1) % apps.length }, 3200)
}

function setHovered(value: boolean) {
  hovered = value
  syncRotation()
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', syncRotation)
  document.addEventListener('visibilitychange', syncRotation)
  syncRotation()
})

onBeforeUnmount(() => {
  stopRotation()
  motionPreference?.removeEventListener('change', syncRotation)
  document.removeEventListener('visibilitychange', syncRotation)
})

const copy = computed(() => props.locale === 'zh' ? {
  eyebrow: '跨软件协作 · 复用现有 Pipeline', title: '让工作流，', appPrefix: '贯通', punctuation: '等软件',
  accessibleTitle: '让现有 Pipeline 贯通 Maya、Blender、Houdini 等软件，由 Agent 协调调用。',
  description: '把目标告诉 Agent，通过已验证的工具连接制作、检查与交付。复用团队已有的软件、脚本和服务，保留上下游约定与人工验收。',
  start: '接入现有工作流', explore: '看看能做什么', note: '开源 · 本地运行 · 复用现有工具', prefix: '/zh',
} : {
  eyebrow: 'CROSS-SOFTWARE COLLABORATION', title: 'Your pipeline.', appPrefix: 'Across', punctuation: '.',
  accessibleTitle: 'Connect your existing pipeline across Maya, Blender, Houdini, and the tools your team already uses.',
  description: 'Tell your agent the goal. Connect production, checks, and delivery through verified tools, reusing your existing scripts and services. Keep team handoffs and human acceptance in the workflow.',
  start: 'Connect your pipeline', explore: 'See it in action', note: 'Open source · Runs locally · Built around your tools', prefix: '',
})
</script>

<template>
  <header class="home-hero" aria-labelledby="home-title">
    <p class="home-eyebrow">{{ copy.eyebrow }}</p>
    <h1 id="home-title" :aria-label="copy.accessibleTitle">
      <span class="hero-title-static" aria-hidden="true">{{ copy.title }}</span>
      <span class="hero-app-line" aria-hidden="true">
        <span class="hero-app-prefix">{{ copy.appPrefix }}</span>
        <span class="hero-app-rotator" @mouseenter="setHovered(true)" @mouseleave="setHovered(false)">
          <Transition name="hero-app" mode="out-in">
            <span :key="currentApp.name" class="hero-app-name">
              <img :src="`/dcc-logos/${currentApp.logo}`" alt="" :class="{ 'dcc-logo-invert-dark': 'invert' in currentApp && currentApp.invert }" width="48" height="48">
              <span>{{ currentApp.name }}</span>
            </span>
          </Transition>
        </span>
        <span class="hero-app-punctuation">{{ copy.punctuation }}</span>
      </span>
    </h1>
    <p class="home-hero-description">{{ copy.description }}</p>
    <div class="home-actions">
      <a class="site-button primary" :href="`${copy.prefix}/#install-prompt`">{{ copy.start }} <span aria-hidden="true">↗</span></a>
      <a class="site-button secondary" :href="`https://dcc-mcp.github.io/showcase/${locale === 'zh' ? 'zh/' : ''}`" target="_self">{{ copy.explore }} <span aria-hidden="true">→</span></a>
    </div>
    <p class="home-hero-note">{{ copy.note }}</p>
  </header>
</template>
