<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

type MarketplaceSkill = {
  name: string
  description: string
  version: string
  dcc: string[]
  tags?: string[]
  category: string
  docs?: string
  lifecycle?: string
  source?: { url?: string }
  policy?: { installation?: string }
}

const catalogUrl = 'https://raw.githubusercontent.com/dcc-mcp/marketplace/main/marketplace.json'
const skills = ref<MarketplaceSkill[]>([])
const query = ref('')
const dcc = ref('')
const category = ref('')
const loading = ref(true)
const error = ref('')
const copied = ref('')
const selectedDcc = reactive<Record<string, string>>({})

const dccOptions = computed(() => [...new Set(skills.value.flatMap((skill) => skill.dcc))].sort())
const categoryOptions = computed(() => [...new Set(skills.value.map((skill) => skill.category))].sort())
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

function targetDcc(skill: MarketplaceSkill) {
  if (dcc.value && skill.dcc.includes(dcc.value)) return dcc.value
  return selectedDcc[skill.name] || skill.dcc[0]
}

async function copy(text: string, key: string) {
  await navigator.clipboard.writeText(text)
  copied.value = key
  window.setTimeout(() => {
    if (copied.value === key) copied.value = ''
  }, 1800)
}

function copyInstall(skill: MarketplaceSkill) {
  const host = targetDcc(skill)
  return copy([
    `dcc-mcp-cli marketplace inspect ${skill.name}`,
    `dcc-mcp-cli marketplace install ${skill.name} --dcc ${host}`,
    `dcc-mcp-cli reload-skills --dcc-type ${host}`,
  ].join('\n'), `install:${skill.name}`)
}

function copyAgentPrompt(skill: MarketplaceSkill) {
  const host = targetDcc(skill)
  return copy(
    `Use the dcc-mcp Skill to inspect the official Marketplace package "${skill.name}", `
      + `ask for my consent, install it for ${host}, reload ${host} Skills, and report validation evidence.`,
    `agent:${skill.name}`,
  )
}

onMounted(async () => {
  query.value = new URLSearchParams(window.location.search).get('q') ?? ''
  try {
    const response = await fetch(catalogUrl)
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`)
    const catalog = await response.json()
    if (!Array.isArray(catalog.skills)) throw new Error('Catalog response is invalid')
    skills.value = catalog.skills
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Catalog request failed'
  } finally {
    loading.value = false
  }
})

watch(query, (value) => {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  value.trim() ? url.searchParams.set('q', value.trim()) : url.searchParams.delete('q')
  window.history.replaceState({}, '', url)
})
</script>

<template>
  <div class="marketplace-search">
    <div class="marketplace-controls" role="search">
      <label class="marketplace-query">
        <span>Search</span>
        <input v-model="query" type="search" placeholder="Rigging, assets, UI, Maya…" autocomplete="off">
      </label>
      <label>
        <span>DCC</span>
        <select v-model="dcc">
          <option value="">All DCCs</option>
          <option v-for="option in dccOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>
      <label>
        <span>Category</span>
        <select v-model="category">
          <option value="">All categories</option>
          <option v-for="option in categoryOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>
    </div>

    <p class="marketplace-status" aria-live="polite">
      <template v-if="loading">Loading the official catalog…</template>
      <template v-else-if="error">The live catalog is unavailable. <a href="https://github.com/dcc-mcp/marketplace">Open it on GitHub ↗</a></template>
      <template v-else>{{ filtered.length }} of {{ skills.length }} packages</template>
    </p>

    <div v-if="!loading && !error" class="marketplace-results">
      <article v-for="skill in filtered" :key="skill.name" class="marketplace-card">
        <div class="marketplace-card-head">
          <div>
            <span>{{ skill.category }}</span>
            <h2>{{ skill.name }}</h2>
          </div>
          <code>v{{ skill.version }}</code>
        </div>
        <p>{{ skill.description }}</p>
        <div class="marketplace-dccs">
          <button
            v-for="host in skill.dcc"
            :key="host"
            type="button"
            :class="{ active: targetDcc(skill) === host }"
            @click="selectedDcc[skill.name] = host"
          >{{ host }}</button>
        </div>
        <div class="marketplace-card-actions">
          <button type="button" @click="copyAgentPrompt(skill)">
            {{ copied === `agent:${skill.name}` ? 'Copied' : 'Copy agent prompt' }}
          </button>
          <button class="primary" type="button" @click="copyInstall(skill)">
            {{ copied === `install:${skill.name}` ? 'Copied' : 'Copy install command' }}
          </button>
          <a :href="skill.docs || skill.source?.url || 'https://github.com/dcc-mcp/marketplace'" target="_blank" rel="noreferrer">Docs ↗</a>
        </div>
      </article>
    </div>

    <p v-if="!loading && !error && !filtered.length" class="marketplace-empty">No package matches these filters.</p>
  </div>
</template>
