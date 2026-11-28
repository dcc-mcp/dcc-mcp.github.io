<script setup lang="ts">
import { type SiteLocale, localePrefix } from '../../i18n/locales'
import { useHomeTranslations } from '../data/home-translations'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ locale: SiteLocale }>()
const translations = useHomeTranslations()
const localCopy = computed(() => translations?.value?.HomeHero)
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

const copy = computed(() => localCopy.value ?? (props.locale === 'zh' ? {
  eyebrow: '连接你已经在用的工具', title: '让工作流', appPrefix: '连接', punctuation: '等软件。',
  accessibleTitle: '让工作流连接 Maya、Blender、Houdini 等软件，由 Agent 协调制作、检查与交付。',
  description: '给 Agent 一个目标。DCC-MCP 通过经过验证的工具，把制作、检查和交付串起来；团队继续使用熟悉的软件、脚本和服务。',
  start: '接入你的工作流', explore: '浏览真实案例', note: '开源 · 本地运行 · 基于现有工具', prefix: '/zh',
} : {
  eyebrow: 'CONNECT THE TOOLS YOU ALREADY USE', title: 'Connect your pipeline', appPrefix: 'to', punctuation: '.',
  accessibleTitle: 'Connect your existing pipeline to Maya, Blender, Houdini, and the creative applications your team already uses.',
  description: 'Give your agent a goal. DCC-MCP connects verified tools across production, review, and delivery, so your team can keep its software, scripts, and handoffs.',
  start: 'Connect your pipeline', explore: 'See real workflows', note: 'Open source · Runs locally · Works with your tools', prefix: '',
}))
</script>

<template>
  <header class="home-hero" aria-labelledby="home-title">
    <p class="home-eyebrow">{{ copy.eyebrow }}</p>
    <h1 id="home-title" :aria-label="copy.accessibleTitle">
      <span class="hero-title-static" aria-hidden="true">{{ copy.title }}</span>
      <span class="hero-app-line" aria-hidden="true">
        <span v-if="copy.appPrefix" class="hero-app-prefix">{{ copy.appPrefix }}</span>
        <span class="hero-app-rotator" @mouseenter="setHovered(true)" @mouseleave="setHovered(false)">
          <Transition name="hero-app" mode="out-in">
            <span :key="currentApp.name" class="hero-app-name">
              <img :src="`/dcc-logos/${currentApp.logo}`" alt="" :class="{ 'dcc-logo-invert-dark': 'invert' in currentApp && currentApp.invert }" width="48" height="48">
              <span>{{ currentApp.name }}</span>
            </span>
          </Transition>
        </span>
        <span v-if="copy.punctuation" class="hero-app-punctuation">{{ copy.punctuation }}</span>
      </span>
    </h1>
    <p class="home-hero-description">{{ copy.description }}</p>
    <div class="home-actions">
      <a class="site-button primary" :href="`${localePrefix(locale)}/#install-prompt`">{{ copy.start }} <span aria-hidden="true">↗</span></a>
      <a class="site-button secondary" :href="`https://dcc-mcp.github.io/showcase/${locale === 'zh' ? 'zh/' : ''}`" target="_self">{{ copy.explore }} <span aria-hidden="true">→</span></a>
    </div>
    <p class="home-hero-note">{{ copy.note }}</p>
  </header>
</template>
