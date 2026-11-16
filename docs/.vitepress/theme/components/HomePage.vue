<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import HomeHero from './HomeHero.vue'
import HomePipeline from './HomePipeline.vue'
import HomeShowcase from './HomeShowcase.vue'
import HomeIntegrations from './HomeIntegrations.vue'
import HomeSetup from './HomeSetup.vue'
import MarketplaceSearch from './MarketplaceSearch.vue'
import CollectionMasonry from './CollectionMasonry.vue'
import AgentCrew from './AgentCrew.vue'
import HomeIntroVideo from './HomeIntroVideo.vue'
import HomeResources from './HomeResources.vue'

const { lang } = useData()
const locale = computed(() => lang.value.startsWith('zh') ? 'zh' : 'en')
const copy = computed(() => locale.value === 'zh' ? {
  why: '从生产标准，到跨软件协作。', whyBody: '先把输入、输出、检查和交接定义清楚，再让 Agent 调用可验证的工具。团队经验可以复用，每一次交付都有依据。',
  reasons: [
    { title: '复用团队已有的 Pipeline', body: '让现有脚本、插件和内部服务成为可调用的能力，继续沿用熟悉的软件与制作约定。' },
    { title: '把上下游交接接起来', body: '从场景准备、资产检查到导出与交付，明确每一步的输入、依赖、产物和下一位接收者。' },
    { title: '每一步，都看得见', body: '保留场景检查、产物和验证记录。自动执行可重复步骤，人工验收保留在流程里。' },
  ],
  whyLink: '看看它如何配合你的创作', marketLabel: '能力市场', marketTitle: '让下一次创作，从更高的起点开始。',
  marketBody: '找一套合适的资产、一项专门的 Skill，或一个新服务，把重复搭建的时间省下来。', marketLink: '发现新的创作能力',
  developerTitle: '把你的拿手好戏，变成可复用的能力。', developerBody: '让自研工具、内部服务和制作经验接入同一套工作流，也让团队接着用。',
  developerLink: '开发者指南', githubLink: '在 GitHub 上探索', prefix: '/zh',
} : {
  why: 'Production standards. Connected workflows.', whyBody: 'Define inputs, outputs, checks, and handoffs first. Then let agents call verified tools, so the team can reuse its production knowledge and inspect each delivery.',
  reasons: [
    { title: 'Reuse the pipeline you have', body: 'Make existing scripts, plugins, and studio services callable while keeping the applications and conventions your team relies on.' },
    { title: 'Connect upstream and downstream', body: 'Connect scene preparation, asset checks, export, and delivery with clear dependencies, artifacts, and owners at each handoff.' },
    { title: 'Stay in the loop', body: 'Keep scene checks, artifacts, and validation records. Automate repeatable steps with human acceptance kept in the workflow.' },
  ],
  whyLink: 'See how it fits your workflow', marketLabel: 'CAPABILITY MARKETPLACE', marketTitle: 'A head start for your next idea.',
  marketBody: 'Find ready-to-use Skills, assets, and services. Spend less time setting up and more time making.', marketLink: 'Find your next capability',
  developerTitle: 'Build it once. Create with it again.', developerBody: 'Bring your own tools, studio services, and production know-how into workflows your team can reuse.',
  developerLink: 'Developer guide', githubLink: 'Explore on GitHub', prefix: '',
})
</script>

<template>
  <div class="home-page">
    <HomeHero :locale="locale" />
    <HomePipeline :locale="locale" />
    <HomeShowcase :locale="locale" />
    <HomeIntegrations :locale="locale" />
    <section class="home-section home-benefits" aria-labelledby="benefits-title">
      <div class="section-intro"><h2 id="benefits-title">{{ copy.why }}</h2><p>{{ copy.whyBody }}</p></div>
      <div class="benefit-grid"><article v-for="reason in copy.reasons" :key="reason.title"><h3>{{ reason.title }}</h3><p>{{ reason.body }}</p></article></div>
      <a class="text-link" :href="`${copy.prefix}/why-dcc-mcp`">{{ copy.whyLink }} <span aria-hidden="true">→</span></a>
    </section>
    <div class="home-section"><CollectionMasonry :locale="locale" /></div>
    <details class="home-demonstrations home-section">
      <summary>{{ locale === 'zh' ? '看看创作分工与工作流演示' : 'Explore creative roles and workflow films' }}</summary>
      <AgentCrew :locale="locale" />
      <HomeIntroVideo :locale="locale" />
    </details>
    <section class="home-section home-marketplace-section" aria-labelledby="home-marketplace-title">
      <div class="section-intro"><p class="home-eyebrow">{{ copy.marketLabel }}</p><h2 id="home-marketplace-title">{{ copy.marketTitle }}</h2><p>{{ copy.marketBody }}</p><a class="text-link" :href="`${copy.prefix}/marketplace`">{{ copy.marketLink }} <span aria-hidden="true">↗</span></a></div>
      <ClientOnly><MarketplaceSearch preview /></ClientOnly>
    </section>
    <HomeSetup :locale="locale" />
    <HomeResources :locale="locale" />
    <section class="home-section home-developers" aria-labelledby="developer-title">
      <div><h2 id="developer-title">{{ copy.developerTitle }}</h2><p>{{ copy.developerBody }}</p></div>
      <div class="home-actions"><a class="site-button primary" :href="`${copy.prefix}/developers`">{{ copy.developerLink }} <span aria-hidden="true">↗</span></a><a class="text-link" href="https://github.com/dcc-mcp" target="_blank" rel="noreferrer">{{ copy.githubLink }} <span aria-hidden="true">↗</span></a></div>
    </section>
  </div>
</template>
