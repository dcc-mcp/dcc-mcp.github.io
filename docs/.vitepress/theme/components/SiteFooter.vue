<script setup lang="ts">
import { localePrefix, site, siteLocale } from '../../i18n/locales'
import { computed } from 'vue'
import { useData } from 'vitepress'
const { lang } = useData()
const locale = computed(() => siteLocale(lang.value))
const isZh = computed(() => locale.value === 'zh')
const localCopy = computed(() => {
  const code = locale.value
  return code === 'en' || code === 'zh' ? undefined : site[code]
})
const prefix = computed(() => localePrefix(locale.value))
function destination(path: string) {
  return path === '/showcase' ? `https://dcc-mcp.github.io/showcase/${isZh.value ? 'zh/' : ''}` : `${prefix.value}${path}`
}
const groups = computed(() => {
  if (localCopy.value) {
    const { footer, nav } = localCopy.value
    return [
      { title: footer.explore, links: [[nav.why, '/why-dcc-mcp'], [nav.showcase, '/showcase'], [nav.market, '/marketplace'], [nav.ecosystem, '/ecosystem']] },
      { title: footer.build, links: [[nav.agents, '/agents'], [nav.developers, '/developers'], [nav.tasks, '/use-cases']] },
    ]
  }
  return isZh.value ? [
    { title: '探索', links: [['为什么是 DCC-MCP', '/why-dcc-mcp'], ['案例画廊', '/showcase'], ['技能市场', '/marketplace'], ['生态目录', '/ecosystem']] },
    { title: '开始构建', links: [['Agent 指南', '/agents'], ['开发者指南', '/developers'], ['常见任务', '/use-cases']] },
  ] : [
    { title: 'Explore', links: [['Why DCC-MCP', '/why-dcc-mcp'], ['Showcase', '/showcase'], ['Marketplace', '/marketplace'], ['Ecosystem', '/ecosystem']] },
    { title: 'Build', links: [['Agent guide', '/agents'], ['Developer guide', '/developers'], ['Common tasks', '/use-cases']] },
  ]
})
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="footer-brand"><a :href="`${prefix}/`" aria-label="DCC-MCP"><img class="footer-logo light" src="/brand/dcc-mcp-logo-admin-light.png" alt="DCC-MCP" width="88" height="40" loading="lazy"><img class="footer-logo dark" src="/brand/dcc-mcp-logo-admin-dark.png" alt="DCC-MCP" width="88" height="40" loading="lazy"></a><p>{{ localCopy?.homeTitle ?? (isZh ? '让熟悉的工具，协作完成真正的作品。' : 'Connect the tools behind the work you want to make.') }}</p></div>
      <div v-for="group in groups" :key="group.title" class="footer-group"><h2>{{ group.title }}</h2><a v-for="[label, path] in group.links" :key="path" :href="destination(path)" :target="path === '/showcase' ? '_self' : undefined">{{ label }}</a></div>
      <div class="footer-group"><h2>{{ localCopy?.footer.open ?? (isZh ? '开源社区' : 'Open source') }}</h2><a href="https://github.com/dcc-mcp" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://github.com/dcc-mcp/dcc-mcp.github.io" target="_blank" rel="noreferrer">{{ localCopy?.footer.contribute ?? (isZh ? '参与贡献' : 'Contribute') }} ↗</a><a :href="`${prefix}/llms.txt`">llms.txt</a></div>
    </div>
    <div class="site-footer-bottom"><span>DCC-MCP</span><span>{{ localCopy?.footer.credit ?? (isZh ? '为创作者与开发者构建。' : 'Built for creators and developers.') }}</span></div>
  </footer>
</template>
