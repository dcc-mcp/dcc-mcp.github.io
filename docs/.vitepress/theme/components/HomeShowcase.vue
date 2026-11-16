<script setup lang="ts">
import { computed, ref } from 'vue'
const props = defineProps<{ locale: 'en' | 'zh' }>()
const active = ref(0)
const items = [
  {
    image: '/showcase-media/game-world-v3.webp', source: 'https://github.com/dcc-mcp/dcc-mcp-blender', app: { en: 'Blender · Game environments', zh: 'Blender · 游戏环境' },
    en: { tab: 'Game worlds', title: 'Build a world worth stepping into.', description: 'Connect environment modeling, scene assembly, materials, and lighting in the creative pipeline your team already uses.', alt: 'Original game-world concept: a traveler approaches a vast mountain citadel across an overgrown glacial gorge.', stages: ['Environment modeling', 'Scene assembly', 'Lighting & review'] },
    zh: { tab: '游戏世界', title: '把世界观，落成值得探索的场景。', description: '连接环境建模、场景搭建、材质与灯光，复用团队已有的工具与流程，让制作从一个环节走向下一个环节。', alt: '原创游戏世界概念图：旅人沿石道走向横跨冰川峡谷的巨型山城。', stages: ['环境建模', '场景搭建', '灯光与验收'] },
  },
  {
    image: '/showcase-media/film-vfx-v3.webp', source: 'https://github.com/dcc-mcp/dcc-mcp-houdini', app: { en: 'Houdini · Film & VFX', zh: 'Houdini · 影视特效' },
    en: { tab: 'Film & VFX', title: 'Give an impossible shot a production path.', description: 'Connect procedural effects, material work, and preview renders with clear inputs and checks at each handoff.', alt: 'Original VFX shot concept: a massive industrial energy aperture lights a rain-soaked hangar with sparks and volumetric haze.', stages: ['Procedural setup', 'Effects & look', 'Render review'] },
    zh: { tab: '影视镜头', title: '让天马行空的镜头，有章可循地制作。', description: '把程序化搭建、特效、材质与预览渲染接起来，在每次上下游交接时保留输入、产物和检查结果。', alt: '原创影视特效概念图：巨型工业能量门在雨湿机库中启动，火花与体积雾被光照亮。', stages: ['程序化搭建', '特效与材质', '渲染与审片'] },
  },
  {
    image: '/showcase-media/character-lookdev-v3.webp', source: 'https://github.com/dcc-mcp/dcc-mcp-maya', app: { en: 'Maya · Character production', zh: 'Maya · 角色制作' },
    en: { tab: 'Character assets', title: 'Carry every detail into the next stage.', description: 'Coordinate modeling, asset checks, and look development across your tools, with a reviewable handoff for the team.', alt: 'Original character-production concept: a frontier explorer with detailed skin, braided hair, woven clothing, and weathered technical armor.', stages: ['Model & refine', 'Materials & look', 'Validate & hand off'] },
    zh: { tab: '角色资产', title: '让每一处细节，都能交到下一站。', description: '从模型整理、资产检查到材质开发，让已有工具相互配合，也让下一位制作者拿到可检查、可继续制作的资产。', alt: '原创角色制作概念图：边境探险者的皮肤、发辫、织物与磨损装甲呈现细致的数字角色质感。', stages: ['建模与细化', '材质与表现', '检查与交付'] },
  },
] as const
const selected = computed(() => items[active.value])
const text = computed(() => selected.value[props.locale])
function handleKey(event: KeyboardEvent, index: number) {
  const destinations: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: items.length - 1 }
  if (!(event.key in destinations)) return
  event.preventDefault()
  active.value = (destinations[event.key] + items.length) % items.length
  document.getElementById(`showcase-tab-${active.value}`)?.focus()
}
</script>

<template>
  <section id="home-showcase" class="home-showcase" :aria-label="locale === 'zh' ? '探索创作工作流' : 'Explore creative workflows'">
    <div class="showcase-tabs" role="tablist" :aria-label="locale === 'zh' ? '选择工作流' : 'Choose a workflow'">
      <button v-for="(item, index) in items" :id="`showcase-tab-${index}`" :key="item.source" type="button" role="tab" :aria-selected="active === index" aria-controls="showcase-panel" :tabindex="active === index ? 0 : -1" @click="active = index" @keydown="handleKey($event, index)">{{ item[locale].tab }}</button>
    </div>
    <div id="showcase-panel" class="showcase-panel" role="tabpanel" :aria-labelledby="`showcase-tab-${active}`" tabindex="0">
      <a :href="selected.source" target="_blank" rel="noreferrer" class="showcase-feature-image"><img :key="selected.image" :src="selected.image" :alt="text.alt" width="1672" height="941" fetchpriority="high" decoding="async"></a>
      <ol class="showcase-workflow-stages"><li v-for="stage in text.stages" :key="stage">{{ stage }}</li></ol>
      <div class="showcase-feature-caption">
        <div><p class="home-eyebrow">{{ selected.app[locale] }}</p><h2>{{ text.title }}</h2><p class="showcase-feature-description">{{ text.description }}</p><p class="showcase-illustration-note">{{ locale === 'zh' ? 'AI 原创制作概念图 · 非软件实机截图，真实案例见画廊' : 'Original AI-generated production concept · Not a software capture; real examples are in the gallery' }}</p></div>
        <a class="text-link" :href="`https://dcc-mcp.github.io/showcase/${locale === 'zh' ? 'zh/' : ''}`" target="_self">{{ locale === 'zh' ? '看看真实案例' : 'Explore real examples' }} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
</template>
