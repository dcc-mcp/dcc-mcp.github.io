<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { data as catalogSnapshot } from '../../marketplace.data.mts'

type MarketplaceSkill = {
  name: string
  description: string
  version: string
  dcc: string[]
  tags?: string[]
  category: string
  maintainer?: string
  docs?: string
  showcase?: string
  source?: { url?: string; ref?: string }
}

const props = defineProps<{ preview?: boolean }>()

const catalogUrl = 'https://raw.githubusercontent.com/dcc-mcp/marketplace/main/marketplace.json'
const dccLogos: Record<string, string> = {
  '3dsmax': '/dcc-logos/3dsmax.png',
  aftereffects: '/dcc-logos/aftereffects.svg',
  blender: '/dcc-logos/blender.svg',
  godot: '/dcc-logos/godot.svg',
  houdini: '/dcc-logos/houdini.svg',
  katana: '/dcc-logos/katana.png',
  marmoset: '/dcc-logos/marmoset.png',
  maya: '/dcc-logos/maya.svg',
  mobu: '/dcc-logos/motionbuilder.png',
  nuke: '/dcc-logos/nuke.png',
  openusd: '/dcc-logos/openusd.svg',
  photoshop: '/dcc-logos/photoshop.png',
  premiere: '/dcc-logos/premiere.svg',
  renderdoc: '/dcc-logos/renderdoc.svg',
  shogun: '/dcc-logos/shogun.svg',
  shotgrid: '/dcc-logos/shotgrid.png',
  substance: '/dcc-logos/substance3d-painter.svg',
  substance3d_designer: '/dcc-logos/substance3d-designer.svg',
  substance3d_painter: '/dcc-logos/substance3d-painter.svg',
  unity: '/dcc-logos/unity.png',
  unreal: '/dcc-logos/unreal.svg',
  zbrush: '/dcc-logos/zbrush.png',
}

const messages = {
  en: {
    search: 'Search the catalog',
    placeholder: 'Rigging, assets, UI, Maya…',
    category: 'Category',
    allCategories: 'All categories',
    browse: 'Browse',
    packages: 'Available packages',
    showcased: 'With showcase',
    targets: 'DCC targets',
    categories: 'Categories',
    all: 'All',
    loading: 'Loading the official catalog…',
    unavailable: 'The live catalog is unavailable.',
    openGithub: 'Open it on GitHub ↗',
    results: (shown: number, total: number) => `${shown} of ${total} packages`,
    dcc: 'DCC',
    tags: 'Tags',
    copyAgent: 'Copy setup prompt',
    copyInstall: 'Copy install command',
    copied: 'Copied',
    docs: 'Docs ↗',
    viewPackage: 'Open package →',
    empty: 'No package matches these filters.',
    mediaAlt: (name: string) => `${name} showcase`,
  },
  zh: {
    search: '搜索官方目录',
    placeholder: '绑定、资产、UI、Maya…',
    category: '分类',
    allCategories: '全部分类',
    browse: '浏览',
    packages: '可用包',
    showcased: '带展示素材',
    targets: 'DCC 目标',
    categories: '分类数',
    all: '全部',
    loading: '正在加载官方目录…',
    unavailable: '暂时无法加载在线目录。',
    openGithub: '在 GitHub 打开 ↗',
    results: (shown: number, total: number) => `显示 ${shown} / ${total} 个包`,
    dcc: 'DCC',
    tags: '标签',
    copyAgent: '复制配置提示词',
    copyInstall: '复制安装命令',
    copied: '已复制',
    docs: '文档 ↗',
    viewPackage: '打开软件包 →',
    empty: '没有符合当前筛选条件的包。',
    mediaAlt: (name: string) => `${name} 展示素材`,
  },
}

const { lang } = useData()
const isZh = computed(() => lang.value.toLowerCase().startsWith('zh'))
const text = computed(() => isZh.value ? messages.zh : messages.en)
const skills = ref<MarketplaceSkill[]>((catalogSnapshot as { skills: MarketplaceSkill[] }).skills)
const query = ref('')
const dcc = ref('')
const category = ref('')
const loading = ref(false)
const error = ref('')
const copied = ref('')
const selectedDcc = reactive<Record<string, string>>({})
const failedMedia = reactive<Record<string, boolean>>({})

const dccOptions = computed(() => [...new Set(skills.value.flatMap((skill) => skill.dcc))].sort())
const categoryOptions = computed(() => [...new Set(skills.value.map((skill) => skill.category))].sort())
const showcasedCount = computed(() => skills.value.filter((skill) => Boolean(skill.showcase)).length)
const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return skills.value.filter((skill) => {
    const haystack = [skill.name, skill.description, skill.category, ...skill.dcc, ...(skill.tags ?? [])]
      .join(' ')
      .toLowerCase()
    return (!needle || haystack.includes(needle))
      && (!dcc.value || skill.dcc.includes(dcc.value))
      && (!category.value || skill.category === category.value)
  })
})
const previewSkills = computed(() => {
  const categories = new Set<string>()
  return filtered.value.filter((skill) => {
    if (!skill.showcase || categories.has(skill.category)) return false
    categories.add(skill.category)
    return true
  }).slice(0, 4)
})
const visibleSkills = computed(() => props.preview ? previewSkills.value : filtered.value)

function targetDcc(skill: MarketplaceSkill) {
  if (dcc.value && skill.dcc.includes(dcc.value)) return dcc.value
  return selectedDcc[skill.name] || skill.dcc[0]
}

function logoFor(skill: MarketplaceSkill) {
  return dccLogos[skill.dcc[0]]
}

function showcaseUrl(skill: MarketplaceSkill) {
  if (!skill.showcase || failedMedia[skill.name]) return ''
  if (/^https:\/\//.test(skill.showcase)) return skill.showcase
  if (!skill.source?.url || !skill.source.ref) return ''
  try {
    const source = new URL(skill.source.url)
    if (source.hostname !== 'github.com') return ''
    const [owner, repository] = source.pathname.replace(/^\//, '').split('/')
    if (!owner || !repository) return ''
    const repo = repository.replace(/\.git$/, '')
    const path = skill.showcase.replace(/^\//, '').split('/').map(encodeURIComponent).join('/')
    return `https://raw.githubusercontent.com/${owner}/${repo}/${skill.source.ref}/${path}`
  } catch {
    return ''
  }
}

function isVideo(url: string) {
  return /\.(?:mp4|webm|ogg|mov)(?:\?.*)?$/i.test(url)
}

function previewLink(skill: MarketplaceSkill) {
  return `${isZh.value ? '/zh' : ''}/marketplace?q=${encodeURIComponent(skill.name)}`
}

async function writeClipboard(value: string, key: string) {
  await navigator.clipboard.writeText(value)
  copied.value = key
  window.setTimeout(() => {
    if (copied.value === key) copied.value = ''
  }, 1800)
}

function copyInstall(skill: MarketplaceSkill) {
  const host = targetDcc(skill)
  return writeClipboard(
    `dcc-mcp-cli marketplace install ${skill.name} --dcc ${host} --reload`,
    `install:${skill.name}`,
  )
}

function copyAgentPrompt(skill: MarketplaceSkill) {
  const host = targetDcc(skill)
  const prompt = isZh.value
    ? `检查适用于 ${host} 的官方 Marketplace 软件包“${skill.name}”。说明 install --reload 会改变什么，并等待我确认。确认后使用准确包 ID 安装、重新加载 DCC，并验证工具是否可用。`
    : `Check the official Marketplace package "${skill.name}" for ${host}. Explain what install --reload will change and wait for my approval. After approval, install the exact package ID, reload the DCC, and verify that its tools are available.`
  return writeClipboard(prompt, `agent:${skill.name}`)
}

onMounted(async () => {
  if (!props.preview) query.value = new URLSearchParams(window.location.search).get('q') ?? ''
  try {
    const response = await fetch(catalogUrl)
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`)
    const catalog = await response.json()
    if (!Array.isArray(catalog.skills)) throw new Error('Catalog response is invalid')
    skills.value = catalog.skills
  } catch (reason) {
    if (!skills.value.length) {
      error.value = reason instanceof Error ? reason.message : 'Catalog request failed'
    }
  } finally {
    loading.value = false
  }
})

watch(query, (value) => {
  if (props.preview || typeof window === 'undefined') return
  const url = new URL(window.location.href)
  value.trim() ? url.searchParams.set('q', value.trim()) : url.searchParams.delete('q')
  window.history.replaceState({}, '', url)
})
</script>

<template>
  <section class="marketplace-search" :class="{ preview: props.preview }" aria-live="polite">
    <div v-if="!props.preview" class="marketplace-toolbar" role="search">
      <label class="marketplace-query">
        <span>{{ text.search }}</span>
        <input v-model="query" type="search" :placeholder="text.placeholder" autocomplete="off">
      </label>
      <label class="marketplace-category">
        <span>{{ text.category }}</span>
        <select v-model="category">
          <option value="">{{ text.allCategories }}</option>
          <option v-for="option in categoryOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>
    </div>

    <div v-if="!props.preview" class="marketplace-tabs" aria-hidden="true">
      <span class="active">{{ text.browse }}</span>
    </div>

    <p v-if="!props.preview || loading || error" class="marketplace-status">
      <template v-if="loading">{{ text.loading }}</template>
      <template v-else-if="error">{{ text.unavailable }} <a href="https://github.com/dcc-mcp/marketplace">{{ text.openGithub }}</a></template>
      <template v-else>{{ text.results(filtered.length, skills.length) }}</template>
    </p>

    <div v-if="!props.preview && !loading && !error" class="marketplace-summary" aria-label="Marketplace summary">
      <div><span>{{ text.packages }}</span><strong>{{ skills.length }}</strong></div>
      <div><span>{{ text.showcased }}</span><strong>{{ showcasedCount }}</strong></div>
      <div><span>{{ text.targets }}</span><strong>{{ dccOptions.length }}</strong></div>
      <div><span>{{ text.categories }}</span><strong>{{ categoryOptions.length }}</strong></div>
    </div>

    <div v-if="!props.preview && !loading && !error" class="marketplace-dcc-filter">
      <strong>{{ text.dcc }}:</strong>
      <button type="button" :class="{ active: !dcc }" :aria-pressed="!dcc" @click="dcc = ''">{{ text.all }}</button>
      <button
        v-for="option in dccOptions"
        :key="option"
        type="button"
        :class="{ active: dcc === option }"
        :aria-pressed="dcc === option"
        @click="dcc = option"
      >{{ option }}</button>
    </div>

    <div v-if="!loading && !error" class="marketplace-results">
      <article v-for="skill in visibleSkills" :key="skill.name" class="marketplace-card">
        <div class="marketplace-card-media">
          <video
            v-if="showcaseUrl(skill) && isVideo(showcaseUrl(skill))"
            :src="showcaseUrl(skill)"
            controls
            muted
            playsinline
            preload="metadata"
            @error="failedMedia[skill.name] = true"
          />
          <img
            v-else-if="showcaseUrl(skill)"
            :src="showcaseUrl(skill)"
            :alt="text.mediaAlt(skill.name)"
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
            @error="failedMedia[skill.name] = true"
          >
          <div v-else class="marketplace-card-fallback" aria-hidden="true">
            <span class="marketplace-card-grid" />
            <img v-if="logoFor(skill)" :src="logoFor(skill)" alt="">
            <b v-else>{{ skill.name.charAt(0).toUpperCase() }}</b>
          </div>
          <span class="marketplace-card-version">v{{ skill.version }}</span>
        </div>

        <div class="marketplace-card-body">
          <div class="marketplace-card-head">
            <span class="marketplace-card-icon">
              <img v-if="logoFor(skill)" :src="logoFor(skill)" alt="">
              <b v-else>{{ skill.name.charAt(0).toUpperCase() }}</b>
            </span>
            <div>
              <h2>{{ skill.name }}</h2>
              <small>{{ skill.maintainer || 'dcc-mcp' }} · {{ skill.category }}</small>
            </div>
          </div>

          <p>{{ skill.description }}</p>

          <div v-if="!props.preview" class="marketplace-card-section">
            <strong>{{ text.dcc }}:</strong>
            <div class="marketplace-card-chips">
              <button
                v-for="host in skill.dcc"
                :key="host"
                type="button"
                :class="{ active: targetDcc(skill) === host }"
                :aria-pressed="targetDcc(skill) === host"
                @click="selectedDcc[skill.name] = host"
              >{{ host }}</button>
            </div>
          </div>

          <div v-if="!props.preview && skill.tags?.length" class="marketplace-card-section tags">
            <strong>{{ text.tags }}:</strong>
            <div class="marketplace-card-chips">
              <code v-for="tag in skill.tags.slice(0, 3)" :key="tag">{{ tag }}</code>
              <code v-if="skill.tags.length > 3">+{{ skill.tags.length - 3 }}</code>
            </div>
          </div>

          <div v-if="!props.preview" class="marketplace-card-actions">
            <button type="button" @click="copyAgentPrompt(skill)">
              {{ copied === `agent:${skill.name}` ? text.copied : text.copyAgent }}
            </button>
            <button class="primary" type="button" @click="copyInstall(skill)">
              {{ copied === `install:${skill.name}` ? text.copied : text.copyInstall }}
            </button>
            <a :href="skill.docs || skill.source?.url || 'https://github.com/dcc-mcp/marketplace'" target="_blank" rel="noreferrer">{{ text.docs }}</a>
          </div>
          <a v-else class="marketplace-preview-link" :href="previewLink(skill)">{{ text.viewPackage }}</a>
        </div>
      </article>
    </div>

    <p v-if="!loading && !error && !visibleSkills.length" class="marketplace-empty">{{ text.empty }}</p>
  </section>
</template>
