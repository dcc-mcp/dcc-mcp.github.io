<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
const props = withDefaults(defineProps<{ locale?: 'en' | 'zh' }>(), { locale: 'en' })
const copy = computed(() => props.locale === 'zh' ? {
  line1: '让想象，', line2: '进入创作现场。', summary: '连接 AI 与创意软件，让建模、材质、动画和渲染成为可追溯的工作流。',
  setup: '配置 DCC-MCP', work: '探索作品', art: 'AI 生成品牌视觉',
} : {
  line1: 'IMAGINATION.', line2: 'IN PRODUCTION.', summary: 'Connect AI to creative software. Build models, materials, animation, and renders through traceable workflows.',
  setup: 'Set up DCC-MCP', work: 'Explore the work', art: 'AI-generated brand artwork',
})
const marks = [
  { name: 'Maya', src: '/dcc-logos/maya.svg', position: 'maya' },
  { name: 'Houdini', src: '/dcc-logos/houdini.svg', position: 'houdini' },
  { name: 'Blender', src: '/dcc-logos/blender.svg', position: 'blender' },
  { name: 'Unreal Engine', src: '/dcc-logos/unreal.svg', position: 'unreal' },
]
</script>

<template>
  <section class="creative-hero" aria-labelledby="creative-hero-title">
    <picture class="creative-hero-art" aria-hidden="true">
      <source media="(max-width: 740px)" :srcset="withBase('/brand/portal-20261024-960.webp')">
      <img :src="withBase('/brand/portal-20261024-1660.webp')" alt="" width="1660" height="948" fetchpriority="high" loading="eager">
    </picture>
    <div class="creative-hero-copy">
      <p class="creative-hero-kicker">DCC-MCP / CREATIVE SOFTWARE, CONNECTED</p>
      <h1 id="creative-hero-title"><span>{{ copy.line1 }}</span><span>{{ copy.line2 }}</span></h1>
      <p class="creative-hero-summary">{{ copy.summary }}</p>
      <div class="creative-hero-actions">
        <a class="creative-primary" :href="locale === 'zh' ? '/zh/#install-prompt' : '/#install-prompt'">{{ copy.setup }} <span aria-hidden="true">↗</span></a>
        <a class="creative-secondary" href="#selected-work">{{ copy.work }} <span aria-hidden="true">↓</span></a>
      </div>
    </div>
    <div class="creative-marks" aria-hidden="true">
      <div v-for="mark in marks" :key="mark.name" :class="['creative-mark', mark.position]"><img :src="withBase(mark.src)" alt="" width="44" height="44"><span>{{ mark.name }}</span></div>
      <img class="creative-gateway" :src="withBase('/brand/dcc-mcp-logo-admin-dark.png')" alt="" width="150" height="76">
    </div>
    <p class="creative-art-credit">{{ copy.art }}</p>
  </section>
</template>
