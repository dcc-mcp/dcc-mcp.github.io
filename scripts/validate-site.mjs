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
  'showcase/wwise.html',
  'use-cases.html',
  'zh/index.html',
  'zh/agents.html',
  'zh/developers.html',
  'zh/ecosystem.html',
  'zh/marketplace.html',
  'zh/showcase.html',
  'zh/showcase/wwise.html',
  'zh/use-cases.html',
  'llms.txt',
  'llms-full.txt',
  'zh/llms.txt',
  'zh/llms-full.txt',
  'brand/dcc-mcp-logo-admin-light.png',
  'brand/dcc-mcp-logo-admin-dark.png',
  'brand/dcc-mcp-wwise.svg',
  'brand/dcc-mcp-wwise-dark.svg',
  'dcc-logos/wwise.png',
  'showcase/wwise/ui-confirm.wav',
  'showcase/wwise/sci-fi-impact.wav',
  'showcase/wwise/neon-circuit-bgm.wav',
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
for (const [name, html, href] of [
  ['English home', englishHome, '/#install-prompt'],
  ['Chinese home', chineseHome, '/zh/#install-prompt'],
]) {
  if (!html.includes(`href="${href}"`) || !html.includes('id="install-prompt"')) {
    throw new Error(`${name} is missing the one-prompt setup anchor`)
  }
}
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
for (const route of ['/', '/marketplace', '/showcase', '/showcase/wwise', '/use-cases', '/zh/', '/zh/marketplace', '/zh/showcase', '/zh/showcase/wwise', '/zh/use-cases']) {
  if (!sitemap.includes(`https://dcc-mcp.github.io${route}`)) throw new Error(`Sitemap is missing ${route}`)
}

const marketplaceSource = readFileSync(join(root, 'docs', '.vitepress', 'theme', 'components', 'MarketplaceSearch.vue'), 'utf8')
if (!marketplaceSource.includes('raw.githubusercontent.com')) throw new Error('Marketplace media is not pinned to repository source')
if (!marketplaceSource.includes('mp4|webm|ogg|mov')) throw new Error('Marketplace video media support is missing')
if (!marketplaceSource.includes('props.preview ? previewSkills.value : filtered.value')) {
  throw new Error('Marketplace home preview support is missing')
}

const showcaseSource = readFileSync(join(root, 'docs', '.vitepress', 'theme', 'components', 'ShowcaseGallery.vue'), 'utf8')
for (const asset of ['blender-lookdev.webp', 'marmoset-pbr-lookdev.webp', 'dcc-mcp-wwise-dark.svg', 'houdini-portal.png', 'hunyuan3d.webp', 'geospatial-city.webp', 'maya-architecture.jpg', 'kenney-assets.webp']) {
  if (!showcaseSource.includes(asset)) throw new Error(`Showcase gallery is missing ${asset}`)
}
if (!showcaseSource.includes('navigator.clipboard.writeText')) throw new Error('Showcase prompt copy support is missing')

for (const file of [join(dist, 'showcase', 'wwise.html'), join(dist, 'zh', 'showcase', 'wwise.html')]) {
  const html = readFileSync(file, 'utf8')
  for (const id of ['ui-confirm', 'sci-fi-impact', 'neon-circuit-bgm']) {
    if (!html.includes(`id="${id}"`) || !html.includes(`/showcase/wwise/${id}.wav`)) {
      throw new Error(`${file} is missing playable audio: ${id}`)
    }
  }
  if (!html.includes('hreflang="en"') || !html.includes('hreflang="zh-CN"')) {
    throw new Error(`${file} is missing language alternates`)
  }
}

const englishUseCases = readFileSync(join(dist, 'use-cases.html'), 'utf8')
const chineseUseCases = readFileSync(join(dist, 'zh', 'use-cases.html'), 'utf8')
for (const phrase of ['control Maya with AI', 'control Blender with AI', 'create ten random spheres in Maya', 'want to make a game', 'edit photos with AI', 'edit or composite a film with AI', 'create visual effects with AI']) {
  if (!englishUseCases.toLowerCase().includes(phrase.toLowerCase())) throw new Error(`English use cases are missing: ${phrase}`)
}
for (const phrase of ['我想用 AI 控制 Maya', '我想用 AI 控制 Blender', '我想在 Maya 创建十个随机的小球', '我想做一个游戏', '我想用 AI 修图', '我想用 AI 剪辑或合成片子', '我想用 AI 做特效']) {
  if (!chineseUseCases.includes(phrase)) throw new Error(`Chinese use cases are missing: ${phrase}`)
}

console.log('Validated 16 localized pages, 4 llms files, theme logos, sitemap, Marketplace media, Showcase prompts, audio, and GEO use cases.')
