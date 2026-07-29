import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'docs', '.vitepress', 'dist')
const requiredFiles = [
  'index.html',
  'agents.html',
  'developers.html',
  'ecosystem.html',
  'marketplace.html',
  'showcase.html',
  'zh/index.html',
  'zh/agents.html',
  'zh/developers.html',
  'zh/ecosystem.html',
  'zh/marketplace.html',
  'zh/showcase.html',
  'llms.txt',
  'llms-full.txt',
  'zh/llms.txt',
  'zh/llms-full.txt',
  'brand/dcc-mcp-logo-admin-light.png',
  'brand/dcc-mcp-logo-admin-dark.png',
]

for (const file of requiredFiles) {
  if (!existsSync(join(dist, file))) throw new Error(`Missing generated file: ${file}`)
}

const englishHome = readFileSync(join(dist, 'index.html'), 'utf8')
const chineseHome = readFileSync(join(dist, 'zh', 'index.html'), 'utf8')
for (const [name, html] of [['English home', englishHome], ['Chinese home', chineseHome]]) {
  if (!html.includes('hreflang="en"') || !html.includes('hreflang="zh-CN"')) {
    throw new Error(`${name} is missing language alternates`)
  }
}
if (!chineseHome.includes('lang="zh-CN"')) throw new Error('Chinese home has the wrong document language')
if (!englishHome.includes('CAPABILITY MARKETPLACE') || !chineseHome.includes('能力市场')) {
  throw new Error('Localized homepages are missing the Marketplace preview')
}
for (const label of ['Marketplace', 'Showcase', 'For Agents']) {
  if (!englishHome.includes(`>${label}<`)) throw new Error(`English navigation is missing ${label}`)
}
for (const label of ['技能市场', '案例画廊', 'Agent 使用']) {
  if (!chineseHome.includes(`>${label}<`)) throw new Error(`Chinese navigation is missing ${label}`)
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
for (const route of ['/', '/marketplace', '/showcase', '/zh/', '/zh/marketplace', '/zh/showcase']) {
  if (!sitemap.includes(`https://dcc-mcp.github.io${route}`)) throw new Error(`Sitemap is missing ${route}`)
}

const marketplaceSource = readFileSync(join(root, 'docs', '.vitepress', 'theme', 'components', 'MarketplaceSearch.vue'), 'utf8')
if (!marketplaceSource.includes('raw.githubusercontent.com')) throw new Error('Marketplace media is not pinned to repository source')
if (!marketplaceSource.includes('mp4|webm|ogg|mov')) throw new Error('Marketplace video media support is missing')
if (!marketplaceSource.includes('props.preview ? previewSkills.value : filtered.value')) {
  throw new Error('Marketplace home preview support is missing')
}

const showcaseSource = readFileSync(join(root, 'docs', '.vitepress', 'theme', 'components', 'ShowcaseGallery.vue'), 'utf8')
for (const asset of ['blender-lookdev.webp', 'houdini-portal.png', 'hunyuan3d.webp', 'geospatial-city.webp', 'maya-architecture.jpg', 'kenney-assets.webp']) {
  if (!showcaseSource.includes(asset)) throw new Error(`Showcase gallery is missing ${asset}`)
}
if (!showcaseSource.includes('navigator.clipboard.writeText')) throw new Error('Showcase prompt copy support is missing')

console.log('Validated 12 localized pages, 4 llms files, theme logos, sitemap, Marketplace media, and Showcase prompts.')
