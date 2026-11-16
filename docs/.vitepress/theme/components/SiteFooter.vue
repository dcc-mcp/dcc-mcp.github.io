<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
const { lang } = useData()
const isZh = computed(() => lang.value.startsWith('zh'))
const prefix = computed(() => isZh.value ? '/zh' : '')
function destination(path: string) {
  return path === '/showcase' ? `https://dcc-mcp.github.io/showcase/${isZh.value ? 'zh/' : ''}` : `${prefix.value}${path}`
}
const groups = computed(() => isZh.value ? [
  { title: '探索', links: [['为什么是 DCC-MCP', '/why-dcc-mcp'], ['案例画廊', '/showcase'], ['技能市场', '/marketplace'], ['生态目录', '/ecosystem']] },
  { title: '开始构建', links: [['Agent 指南', '/agents'], ['开发者指南', '/developers'], ['常见任务', '/use-cases']] },
] : [
  { title: 'Explore', links: [['Why DCC-MCP', '/why-dcc-mcp'], ['Showcase', '/showcase'], ['Marketplace', '/marketplace'], ['Ecosystem', '/ecosystem']] },
  { title: 'Build', links: [['Agent guide', '/agents'], ['Developer guide', '/developers'], ['Common tasks', '/use-cases']] },
])
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="footer-brand"><a :href="`${prefix}/`" aria-label="DCC-MCP"><img class="footer-logo light" src="/brand/dcc-mcp-logo-admin-light.png" alt="DCC-MCP" width="88" height="40" loading="lazy"><img class="footer-logo dark" src="/brand/dcc-mcp-logo-admin-dark.png" alt="DCC-MCP" width="88" height="40" loading="lazy"></a><p>{{ isZh ? '让灵感，在熟悉的工具里成形。' : 'Bring your next idea to life, in the tools you know.' }}</p></div>
      <div v-for="group in groups" :key="group.title" class="footer-group"><h2>{{ group.title }}</h2><a v-for="[label, path] in group.links" :key="path" :href="destination(path)" :target="path === '/showcase' ? '_self' : undefined">{{ label }}</a></div>
      <div class="footer-group"><h2>{{ isZh ? '开源社区' : 'Open source' }}</h2><a href="https://github.com/dcc-mcp" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://github.com/dcc-mcp/dcc-mcp.github.io" target="_blank" rel="noreferrer">{{ isZh ? '参与贡献' : 'Contribute' }} ↗</a><a :href="`${prefix}/llms.txt`">llms.txt</a></div>
    </div>
    <div class="site-footer-bottom"><span>DCC-MCP</span><span>{{ isZh ? '为创作者与开发者构建。' : 'Built for creators and developers.' }}</span></div>
  </footer>
</template>
