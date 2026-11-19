<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ locale: 'en' | 'zh' }>()
const active = ref(0)
const paused = ref(false)
const hovered = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
let motionPreference: MediaQueryList | undefined

const frames = [
  { image: '/showcase-media/zbrush-fantasy-dragon.png', app: 'ZBrush', source: 'https://github.com/dcc-mcp/dcc-mcp-zbrush', en: 'Remesh and export', zh: '重拓扑与导出' },
  { image: '/showcase-media/zbrush-maya-fantasy-dragon.png', app: 'Maya', source: 'https://github.com/dcc-mcp/dcc-mcp-maya', en: 'Import and validate', zh: '导入与验证' },
] as const
const selected = computed(() => frames[active.value])
const copy = computed(() => props.locale === 'zh' ? {
  eyebrow: '把工具变成可复用的工作流', title: '把工具串成流程，再让 Agent 协作。',
  steps: [
    { title: '标准化', detail: '约定命名、输入输出、权限与验收标准。' },
    { title: '流程化', detail: '明确步骤顺序、依赖关系和上下游交接。' },
    { title: '工具化', detail: '封装现有脚本与服务，提供参数校验和可检查的结果。' },
    { title: 'Agent 编排', detail: '根据目标选择工具、协调执行，并验证交付。' },
  ],
  principle: 'Agent 负责理解目标、选择工具和处理分支；团队继续掌握命名、权限、验收与交付标准。',
  caseLabel: '已有跨软件案例 · ZBrush → Maya', caseTitle: '同一份资产，带着检查结果交给下一站。',
  caseBody: '案例记录了从 500 万面源模型到 115,364 面重拓扑网格的处理，再在 Maya 中核对 115,336 个顶点与 115,364 个面。',
  mediaNote: '真实案例静帧轮播，非实时执行或软件录屏。', pause: '暂停轮播', play: '播放轮播',
  source: '查看所属项目', more: '了解生产方法', alt: 'Fantasy Dragon 在 ZBrush 与 Maya 中的已记录场景截图',
} : {
  eyebrow: 'TURN TOOLS INTO REUSABLE WORKFLOWS', title: 'Connect the tools. Then let the agent coordinate.',
  steps: [
    { title: 'Standardize', detail: 'Define naming, inputs, outputs, permissions, and acceptance criteria.' },
    { title: 'Define the process', detail: 'Make step order, dependencies, and team handoffs explicit.' },
    { title: 'Expose tools', detail: 'Wrap existing scripts and services with validated parameters and inspectable results.' },
    { title: 'Agent orchestration', detail: 'Select tools for the goal, coordinate execution, and verify delivery.' },
  ],
  principle: 'The agent handles intent, tool selection, and branching. Your team keeps control of naming, permissions, acceptance, and delivery.',
  caseLabel: 'RECORDED CROSS-SOFTWARE CASE · ZBrush → Maya', caseTitle: 'One asset. A checked handoff to the next tool.',
  caseBody: 'The case records a five-million-face source remeshed to 115,364 faces, then validated in Maya at 115,336 vertices and 115,364 faces.',
  mediaNote: 'A slideshow of recorded case stills, not live execution or a software recording.', pause: 'Pause slideshow', play: 'Play slideshow',
  source: 'View the owning project', more: 'Explore the production approach', alt: 'Recorded Fantasy Dragon scene captures in ZBrush and Maya',
})

function stopRotation() {
  clearInterval(timer)
  timer = undefined
}
function syncRotation() {
  stopRotation()
  if (!motionPreference || motionPreference.matches || document.hidden || paused.value || hovered.value) return
  timer = setInterval(() => { active.value = (active.value + 1) % frames.length }, 5000)
}
function chooseFrame(index: number) {
  active.value = index
  paused.value = true
  syncRotation()
}
function togglePlayback() {
  paused.value = !paused.value
  syncRotation()
}
function setHovered(value: boolean) {
  hovered.value = value
  syncRotation()
}
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (motionPreference.matches) paused.value = true
  motionPreference.addEventListener('change', syncRotation)
  document.addEventListener('visibilitychange', syncRotation)
  syncRotation()
})
onBeforeUnmount(() => {
  stopRotation()
  motionPreference?.removeEventListener('change', syncRotation)
  document.removeEventListener('visibilitychange', syncRotation)
})
</script>

<template>
  <section id="production-pipeline" class="home-section home-pipeline" aria-labelledby="pipeline-title">
    <div class="section-intro"><p class="home-eyebrow">{{ copy.eyebrow }}</p><h2 id="pipeline-title">{{ copy.title }}</h2></div>
    <ol class="pipeline-method"><li v-for="(step, index) in copy.steps" :key="step.title"><span class="pipeline-number" aria-hidden="true">0{{ index + 1 }}</span><h3>{{ step.title }}</h3><p>{{ step.detail }}</p></li></ol>
    <p class="pipeline-principle">{{ copy.principle }}</p>
    <a class="text-link" :href="locale === 'zh' ? '/zh/why-dcc-mcp' : '/why-dcc-mcp'">{{ copy.more }} <span aria-hidden="true">→</span></a>
    <div class="pipeline-case" @mouseenter="setHovered(true)" @mouseleave="setHovered(false)" @focusin="setHovered(true)" @focusout="setHovered(false)">
      <div class="pipeline-case-media">
        <a :href="selected.source" target="_blank" rel="noreferrer"><Transition name="pipeline-frame" mode="out-in"><img :key="selected.image" :src="selected.image" :alt="copy.alt + ' · ' + selected.app" width="1280" height="720" loading="lazy" decoding="async"></Transition></a>
        <div class="pipeline-controls"><div class="pipeline-frame-buttons"><button v-for="(frame, index) in frames" :key="frame.app" type="button" :aria-pressed="active === index" @click="chooseFrame(index)">{{ frame.app }} <span aria-hidden="true">·</span> {{ frame[locale] }}</button></div><button type="button" class="pipeline-playback" :aria-pressed="paused" @click="togglePlayback">{{ paused ? copy.play : copy.pause }}</button></div>
      </div>
      <div class="pipeline-case-copy"><p class="home-eyebrow">{{ copy.caseLabel }}</p><h3>{{ copy.caseTitle }}</h3><p>{{ copy.caseBody }}</p><p class="pipeline-media-note">{{ copy.mediaNote }}</p><a class="text-link" :href="selected.source" target="_blank" rel="noreferrer">{{ copy.source }} <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>
</template>

<style scoped>
.home-pipeline { padding-top: 64px; }
.pipeline-method { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 0; margin: 32px 0 24px; list-style: none; border-top: 1px solid var(--vp-c-divider); }
.pipeline-method li { margin: 0; padding: 24px 24px 0 0; }
.pipeline-number { color: var(--vp-c-text-3); font-size: 12px; font-variant-numeric: tabular-nums; }
.pipeline-method h3 { margin: 8px 0; font-size: 18px; line-height: 1.5; }
.pipeline-method p, .pipeline-principle, .pipeline-case-copy > p { color: var(--vp-c-text-2); line-height: 1.8; font-size: 15px; }
.pipeline-principle { max-width: 820px; margin-bottom: 12px; }
.pipeline-case { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 40px; align-items: center; margin-top: 56px; }
.pipeline-case-media { min-width: 0; }
.pipeline-case-media > a { display: block; overflow: hidden; aspect-ratio: 16 / 9; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: #161a1f; }
.pipeline-case-media img { width: 100%; height: 100%; object-fit: contain; }
.pipeline-case-copy h3 { margin: 12px 0; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.35; letter-spacing: -.02em; }
.pipeline-controls { display: flex; gap: 10px; align-items: flex-start; justify-content: space-between; margin-top: 12px; }
.pipeline-frame-buttons { display: flex; flex-wrap: wrap; gap: 6px; }
.pipeline-controls button { padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px; color: var(--vp-c-text-2); font-size: 12px; line-height: 1.6; }
.pipeline-controls button[aria-pressed="true"] { color: var(--vp-c-text-1); background: var(--vp-c-bg-soft); }
.pipeline-controls button:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.pipeline-playback { flex-shrink: 0; }
.pipeline-case-copy > .pipeline-media-note { font-size: 12px; color: var(--vp-c-text-3); }
.pipeline-frame-enter-active, .pipeline-frame-leave-active { transition: opacity .2s ease; }
.pipeline-frame-enter-from, .pipeline-frame-leave-to { opacity: 0; }
@media (max-width: 760px) { .pipeline-method { grid-template-columns: repeat(2, minmax(0, 1fr)); } .pipeline-case { grid-template-columns: 1fr; gap: 24px; margin-top: 36px; } }
@media (max-width: 420px) { .pipeline-method { grid-template-columns: 1fr; } .pipeline-method li { padding-top: 18px; } .pipeline-controls { flex-wrap: wrap; } }
@media (prefers-reduced-motion: reduce) { .pipeline-frame-enter-active, .pipeline-frame-leave-active { transition: none; } }
</style>
