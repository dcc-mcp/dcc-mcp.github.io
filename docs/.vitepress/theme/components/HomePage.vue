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
  why: '把生产标准，变成协作能力。', whyBody: '把输入、输出、检查与交接定义清楚，Agent 才能稳定调用工具；团队经验因此可以复用，每次交付都能回看。',
  reasons: [
    { title: '复用团队已有的 Pipeline', body: '让现有脚本、插件和内部服务成为可调用的能力，继续沿用熟悉的软件与制作约定。' },
    { title: '让上下游交接顺起来', body: '从场景准备、资产检查到导出与交付，明确每一步的输入、依赖、产物和接收者。' },
    { title: '每一步，都有依据', body: '保留场景检查、产物与验证记录。把可重复的步骤交给自动化，人工验收仍由团队掌握。' },
  ],
  whyLink: '看看它如何配合你的制作流程', marketLabel: '能力市场', marketTitle: '找到下一项可直接复用的能力。',
  marketBody: '从资产和 Skill，到团队内部服务。选择需要的能力，少花时间重复搭建。', marketLink: '浏览能力市场',
  developerTitle: '把你的方法，变成团队可以复用的能力。', developerBody: '把自研工具、内部服务和制作经验接入同一套工作流，继续使用团队熟悉的工具。',
  developerLink: '开发者指南', githubLink: '在 GitHub 上探索', prefix: '/zh',
} : {
  why: 'Production standards that keep the pipeline moving.', whyBody: 'Define inputs, outputs, checks, and handoffs first. Then let agents call verified tools while the team keeps production knowledge reusable and every delivery inspectable.',
  reasons: [
    { title: 'Reuse the pipeline you have', body: 'Make existing scripts, plugins, and studio services callable while keeping the applications and conventions your team relies on.' },
    { title: 'Connect every handoff', body: 'Link scene preparation, asset checks, export, and delivery with clear dependencies, artifacts, and owners.' },
    { title: 'Keep every step inspectable', body: 'Preserve scene checks, outputs, and validation records. Automate repeatable steps while people keep the final say.' },
  ],
  whyLink: 'See it in your production workflow', marketLabel: 'CAPABILITY MARKETPLACE', marketTitle: 'Find the next capability. Skip the repeated setup.',
  marketBody: 'Choose from Skills, assets, and studio services your workflow can reuse. Spend less time wiring tools and more time making.', marketLink: 'Browse the capability market',
  developerTitle: 'Turn your way of working into a reusable capability.', developerBody: 'Bring studio tools, internal services, and production know-how into workflows your team can keep using.',
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
