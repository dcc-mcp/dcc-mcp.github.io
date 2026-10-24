<script setup lang="ts">
import { computed, ref } from 'vue'
import snapshot from '../../showcase/collection.json'

const props = withDefaults(defineProps<{ locale?: 'en' | 'zh' }>(), { locale: 'en' })
const query = ref('')
const onlyPlayable = ref(false)
const failedImages = ref(new Set<string>())
const copy = computed(() => props.locale === 'zh' ? {
  title: '从灵感，到作品。', intro: '走进真实创作的过程：原生工程、制作记录，以及每件作品做到哪一步。',
  collection: '浏览作品合集', all: '全部作品', playable: '浏览器体验', search: '搜索作品或软件',
  count: '件作品', view: '查看作品', play: '打开体验', evidence: '证据与限制', source: '制作来源',
  fallback: '封面暂不可用，仍可查看作品与制作记录。', empty: '没有找到相符作品。试试其他关键词，或查看全部作品。',
  reset: '重置筛选', provenance: '沿用作品合集的证据标签；浏览器体验依据公开清单，当前官网版本尚未重新验收。',
} : {
  title: 'From an idea. Into the world.', intro: 'Step inside the work: native projects, production records, and an honest account of how far each piece has come.',
  collection: 'Browse the collection', all: 'All work', playable: 'Browser demos', search: 'Search work or software',
  count: 'works', view: 'Explore the work', play: 'Open demo', evidence: 'Evidence & limits', source: 'Production source',
  fallback: 'Cover unavailable. The work and its production records are still available.', empty: 'No matching work. Try another search or browse all work.',
  reset: 'Reset filters', provenance: 'Evidence labels come from the collection. Browser demos follow its public manifest; this website revision has not re-tested them.',
})
const collectionUrl = 'https://dcc-mcp.github.io/showcase/'
const prefix = computed(() => `${collectionUrl}${props.locale === 'zh' ? 'zh/' : ''}`)
const works = computed(() => snapshot.cases.map((item) => ({ ...item, copy: item[props.locale] })))
const visible = computed(() => {
  const term = query.value.trim().toLocaleLowerCase()
  return works.value.filter((item) => (!onlyPlayable.value || item.demo) &&
    (!term || [item.slug, item.copy.title, item.copy.subtitle, ...item.copy.software].join(' ').toLocaleLowerCase().includes(term)))
})
function imageFailed(slug: string) {
  failedImages.value = new Set([...failedImages.value, slug])
}
function reset() { query.value = ''; onlyPlayable.value = false }
</script>

<template>
  <section id="selected-work" class="collection-section" aria-labelledby="collection-title">
    <header class="collection-heading">
      <p class="collection-index" aria-hidden="true">01 / SELECTED WORK</p>
      <h2 id="collection-title">{{ copy.title }}</h2>
      <p>{{ copy.intro }}</p>
      <a :href="prefix" target="_self" class="collection-link">{{ copy.collection }} <span aria-hidden="true">↗</span></a>
    </header>
    <div class="collection-toolbar">
      <div class="collection-filters" :aria-label="copy.all" role="group">
        <button type="button" :aria-pressed="!onlyPlayable" @click="onlyPlayable = false">{{ copy.all }}</button>
        <button type="button" :aria-pressed="onlyPlayable" @click="onlyPlayable = true">{{ copy.playable }}</button>
      </div>
      <label class="collection-search"><span>{{ copy.search }}</span><input v-model="query" type="search" :placeholder="copy.search"></label>
      <p class="collection-count" role="status" aria-live="polite">{{ visible.length }} {{ copy.count }}</p>
    </div>
    <div class="collection-masonry">
      <article v-for="item in visible" :key="item.slug" :data-case-slug="item.slug" class="collection-work">
        <a class="collection-cover" :href="`${prefix}cases/${item.slug}/`" target="_self" :aria-label="item.copy.title">
          <img v-if="!failedImages.has(item.slug)" :src="`https://raw.githubusercontent.com/dcc-mcp/showcase/${snapshot.ref}/${item.cover.path}`"
            :width="item.cover.width" :height="item.cover.height" :alt="item.copy.alt" loading="lazy" decoding="async" @error="imageFailed(item.slug)">
          <span v-else class="collection-cover-fallback">{{ copy.fallback }}</span>
          <span v-if="item.demo" class="collection-demo-mark">{{ copy.playable }} <span aria-hidden="true">↗</span></span>
        </a>
        <p class="collection-software">{{ item.copy.software.join(' / ') }}</p>
        <h3><a :href="`${prefix}cases/${item.slug}/`" target="_self">{{ item.copy.title }} <span aria-hidden="true">↗</span></a></h3>
        <p class="collection-evidence">{{ item.copy.evidence_label }}</p>
        <p class="collection-summary">{{ item.copy.summary }}</p>
        <div class="collection-actions">
          <a :href="`${prefix}cases/${item.slug}/`" target="_self">{{ copy.view }} <span aria-hidden="true">→</span></a>
          <a v-if="item.demo" :href="`${prefix}games/${item.slug}/`" target="_self" :aria-label="`${copy.play}: ${item.copy.title}`">{{ copy.play }} <span aria-hidden="true">↗</span></a>
        </div>
        <details class="collection-record">
          <summary>{{ copy.evidence }}</summary>
          <p>{{ item.copy.evidence_scope }}</p>
          <ul><li v-for="limit in item.copy.limitations" :key="limit">{{ limit }}</li></ul>
          <a :href="item.source.url" target="_self">{{ copy.source }} <span aria-hidden="true">↗</span></a>
        </details>
      </article>
    </div>
    <div v-if="visible.length === 0" class="collection-empty"><p>{{ copy.empty }}</p><button type="button" @click="reset">{{ copy.reset }}</button></div>
    <footer class="collection-footer"><p>{{ copy.provenance }}</p><a :href="prefix" target="_self">{{ copy.collection }} <span aria-hidden="true">↗</span></a></footer>
  </section>
</template>
