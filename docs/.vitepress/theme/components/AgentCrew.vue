<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import localizedCopy from './AgentCrew.content.json'

const props = withDefaults(defineProps<{ locale?: 'en' | 'zh' }>(), { locale: 'en' })
const copy = computed(() => localizedCopy[props.locale])
const selected = ref('plan')
const animationEnabled = ref(false)
const reducedMotion = ref(false)
const activeRole = computed(() => copy.value.roles.find((role) => role.id === selected.value)!)
const imageUrl = (role: { id: string; asset: string }) => withBase(
  `/brand/agent-crew/${role.asset}.${animationEnabled.value && !reducedMotion.value && role.id === selected.value ? 'gif' : 'png'}`,
)
let motionQuery: MediaQueryList | undefined
const updateMotion = () => {
  reducedMotion.value = motionQuery?.matches ?? false
  if (reducedMotion.value) animationEnabled.value = false
}
onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotion()
  motionQuery.addEventListener('change', updateMotion)
})
onBeforeUnmount(() => motionQuery?.removeEventListener('change', updateMotion))
</script>

<template>
  <section class="agent-crew" aria-labelledby="agent-crew-title">
    <div class="crew-heading">
      <div>
        <p class="home-kicker">{{ copy.kicker }}</p>
        <h2 id="agent-crew-title">{{ copy.title }}</h2>
      </div>
      <p>{{ copy.description }}</p>
    </div>
    <div class="crew-toolbar">
      <span class="crew-demo">{{ copy.demo }}</span>
      <button
        type="button"
        :aria-pressed="animationEnabled && !reducedMotion"
        :disabled="reducedMotion"
        @click="animationEnabled = !animationEnabled"
      >{{ reducedMotion ? copy.reduced : animationEnabled ? copy.pause : copy.play }}</button>
    </div>
    <div class="crew-roles" :aria-label="copy.kicker">
      <button
        v-for="(role, index) in copy.roles"
        :key="role.id"
        type="button"
        class="crew-role"
        :aria-pressed="selected === role.id"
        aria-controls="agent-crew-brief"
        @click="selected = role.id"
      >
        <span class="crew-number" aria-hidden="true">0{{ index + 1 }}</span>
        <img :src="imageUrl(role)" alt="" width="160" height="160" loading="lazy" decoding="async">
        <strong>{{ role.name }}</strong>
        <span class="crew-purpose">{{ role.purpose }}</span>
      </button>
    </div>
    <div id="agent-crew-brief" class="crew-brief" aria-live="polite" aria-atomic="true">
      <div>
        <p class="crew-brief-label">{{ copy.taskLabel }} · {{ activeRole.name }}</p>
        <p class="crew-task">{{ activeRole.task }}</p>
      </div>
      <a :href="withBase(activeRole.href)">{{ copy.linkLabel }} <span aria-hidden="true">↗</span></a>
    </div>
  </section>
</template>

<style scoped>
.agent-crew { margin: 0 0 120px; color: var(--dcc-ink); }
.crew-heading { display: grid; grid-template-columns: 1.15fr 1fr; gap: 48px; align-items: end; margin-bottom: 28px; }
.crew-heading h2 { margin: 0; padding: 0; border: 0; max-width: 700px; font-size: clamp(30px, 3.5vw, 48px); letter-spacing: -.04em; line-height: 1.2; }
.crew-heading > p { margin: 0; max-width: 540px; color: var(--dcc-muted); font-size: 16px; line-height: 1.8; }
.crew-toolbar { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; border-block: 1px solid var(--dcc-line); padding: 12px 0; }
.crew-demo { color: var(--dcc-muted); font-size: 12px; letter-spacing: .04em; }
.crew-toolbar button { border: 1px solid var(--dcc-line); padding: 9px 14px; min-height: 44px; border-radius: 4px; color: var(--dcc-ink); background: var(--dcc-panel); cursor: pointer; font-size: 13px; }
.crew-toolbar button:disabled { color: var(--dcc-muted); cursor: default; }
.crew-roles { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; padding: 22px 0; }
.crew-role { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; min-width: 0; padding: 22px 18px; text-align: left; border: 1px solid transparent; border-radius: 8px; color: var(--dcc-ink); background: transparent; cursor: pointer; }
.crew-role:hover { background: var(--dcc-panel-soft); }
.crew-role[aria-pressed="true"] { border-color: var(--dcc-line); background: var(--dcc-panel); }
.crew-number { color: var(--dcc-muted); font: 11px var(--vp-font-family-mono); }
.crew-role img { display: block; width: 100%; max-width: 144px; height: auto; aspect-ratio: 1; object-fit: contain; align-self: center; margin: 10px 0 14px; }
.crew-role strong { font-size: 18px; line-height: 1.35; }
.crew-purpose { color: var(--dcc-muted); font-size: 13px; line-height: 1.8; }
.crew-brief { display: flex; justify-content: space-between; align-items: center; gap: 32px; border-top: 1px solid var(--dcc-line); padding: 26px 0; }
.crew-brief-label { margin: 0 0 8px; color: var(--dcc-muted); font-size: 12px; }
.crew-task { margin: 0; max-width: 760px; font-size: 17px; line-height: 1.7; }
.crew-brief > a { flex-shrink: 0; font-size: 13px; min-height: 44px; display: inline-flex; align-items: center; gap: 12px; }
@media (max-width: 960px) {
  .crew-heading { grid-template-columns: 1fr; gap: 18px; }
  .crew-roles { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .crew-brief { align-items: flex-start; flex-direction: column; gap: 12px; }
}
@media (max-width: 580px) {
  .agent-crew { margin-bottom: 76px; }
  .crew-roles { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .crew-role { padding: 16px 12px; }
  .crew-role img { max-width: 112px; }
  .crew-role strong { font-size: 16px; }
  .crew-task { font-size: 15px; }
}
</style>
