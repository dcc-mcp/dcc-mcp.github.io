<script setup lang="ts">
import { type SiteLocale, localePrefix, formatMessage } from '../../i18n/locales'
import { useHomeTranslations } from '../data/home-translations'
import { computed, ref } from 'vue'
import { dccIntegrations, releasedIntegrations } from '../../dcc-integrations.mts'
const props = defineProps<{ locale: SiteLocale }>()
const translations = useHomeTranslations()
const localCopy = computed(() => translations?.value?.HomeIntegrations)
const paused = ref(false)
const prefix = computed(() => localePrefix(props.locale))
const copy = computed(() => localCopy.value ?? (props.locale === 'zh' ? {
  title: '你在用的工具，进入同一条工作流。', description: '从游戏引擎、三维与材质，到音频和后期。让 Agent 进入团队已经在用的工具。',
  catalog: `Core 0.20.39 的版本目录包含 ${releasedIntegrations.length} 个适配器标识；各集成的安装条件、独立发布状态与验证范围，请查看对应指南。`,
  all: `查看全部 ${dccIntegrations.length} 项集成指南`, directory: '找到我的软件', pause: '暂停滚动', resume: '继续滚动', evidence: '查看版本目录',
} : {
  title: 'The tools you use, in one workflow.', description: 'Game engines, 3D, look development, audio, and post. Bring your agent into the tools already in production.',
  catalog: `The Core 0.20.39 catalog lists ${releasedIntegrations.length} adapter identifiers. Each guide explains installation requirements, independent releases, and verification limits.`,
  all: `Explore all ${dccIntegrations.length} integration guides`, directory: 'Find your tools', pause: 'Pause scrolling', resume: 'Resume scrolling', evidence: 'Read the versioned catalog',
}))
const logos: Record<string, string> = {
  '3ds-max': '3dsmax.png', 'after-effects': 'aftereffects.svg', blender: 'blender.svg', cinema4d: 'cinema4d.png', comfyui: 'comfyui.svg', freecad: 'freecad.png', godot: 'godot.svg', houdini: 'houdini.svg', illustrator: 'illustrator.svg', katana: 'katana.png', maya: 'maya.svg', marmoset: 'marmoset.png', mari: 'mari.svg', motionbuilder: 'motionbuilder.png', nuke: 'nuke.png', openusd: 'openusd.svg', openscad: 'openscad.png', photoshop: 'photoshop.png', 'premiere-pro': 'premiere.svg', renderdoc: 'renderdoc.svg', sketchup: 'sketchup.svg', shogun: 'shogun.svg', touchdesigner: 'touchdesigner-reference.svg', 'flow-production-tracking': 'shotgrid.png', 'substance-3d-designer': 'substance3d-designer.svg', 'substance-3d-painter': 'substance3d-painter.svg', unity: 'unity.png', 'unreal-engine': 'unreal.svg', wwise: 'wwise.png', zbrush: 'zbrush.png',
}
const marqueeApps = [
  { name: 'Maya', slug: 'maya', mask: 'maya' }, { name: 'Blender', slug: 'blender', mask: 'blender' },
  { name: 'Houdini', slug: 'houdini', mask: 'houdini' }, { name: 'Unreal Engine', slug: 'unreal-engine', mask: 'unreal' },
  { name: 'Photoshop', slug: 'photoshop', mask: 'photoshop' }, { name: 'Unity', slug: 'unity', mask: 'unity' },
  { name: 'Nuke', slug: 'nuke', mask: 'nuke' }, { name: 'Godot', slug: 'godot', mask: 'godot' },
]
</script>
<template>
  <section class="home-section home-integrations" aria-labelledby="integrations-title">
    <div class="section-intro"><h2 id="integrations-title">{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
    <div class="integration-marquee" :class="{ 'is-paused': paused }"><div class="integration-marquee-track"><div v-for="repeat in 2" :key="repeat" class="integration-marquee-group" :aria-hidden="repeat === 2 ? true : undefined"><a v-for="app in marqueeApps" :key="app.slug" :href="repeat === 1 ? `${prefix}/control/${app.slug}` : undefined" :tabindex="repeat === 2 ? -1 : undefined" :aria-label="app.name" :title="app.name"><span class="integration-mark" :style="{ '--integration-logo': `url('/dcc-logos/monochrome/${app.mask}.svg')` }" aria-hidden="true" /></a></div></div></div>
    <button class="integration-marquee-toggle" type="button" :aria-pressed="paused" @click="paused = !paused">{{ paused ? copy.resume : copy.pause }}</button>
    <details class="integration-disclosure"><summary>{{ formatMessage(copy.all, { total: dccIntegrations.length }) }}</summary><p class="integration-catalog-note">{{ formatMessage(copy.catalog, { released: releasedIntegrations.length }) }} <a href="/catalog/core-v0.20.39-dcc-types.json">{{ copy.evidence }}</a></p><div class="integration-directory"><a v-for="app in dccIntegrations" :key="app.slug" :href="`${prefix}/control/${app.slug}`"><span class="integration-icon" :class="{ 'on-dark': ['wwise', 'mari', 'shogun'].includes(app.slug) }"><img v-if="logos[app.slug]" :src="`/dcc-logos/${logos[app.slug]}`" :alt="app.name" :class="{ 'dcc-logo-invert-dark': app.slug === 'unreal-engine' }" width="28" height="28" loading="lazy"><span v-else aria-hidden="true">{{ app.name.slice(0, 2) }}</span></span>{{ app.name }} <span class="integration-arrow" aria-hidden="true">↗</span></a></div></details>
    <a class="text-link" :href="`${prefix}/use-cases`">{{ copy.directory }} <span aria-hidden="true">→</span></a>
  </section>
</template>
