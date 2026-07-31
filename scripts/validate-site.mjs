import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'docs', '.vitepress', 'dist')
const integrationSource = readFileSync(join(root, 'docs', '.vitepress', 'dcc-integrations.mts'), 'utf8')
const integrations = [...integrationSource.matchAll(
  /slug: '([^']+)',\s+name: '([^']+)',\s+repository: '([^']+)'/g,
)].map(([, slug, name, repository]) => ({ slug, name, repository }))
if (integrations.length !== 27) {
  throw new Error(`Expected 27 public application and pipeline integrations, found ${integrations.length}`)
}
const releasedIntegrationCount = [...integrationSource.matchAll(/\s+dccType: '[^']+',/g)].length
if (releasedIntegrationCount !== 20) {
  throw new Error(`Expected 20 released host identifiers, found ${releasedIntegrationCount}`)
}
const requiredFiles = [
  'index.html',
  'agents.html',
  'developers.html',
  'ecosystem.html',
  'marketplace.html',
  'showcase.html',
  'showcase/wwise.html',
  'use-cases.html',
  'why-dcc-mcp.html',
  'zh/index.html',
  'zh/agents.html',
  'zh/developers.html',
  'zh/ecosystem.html',
  'zh/marketplace.html',
  'zh/showcase.html',
  'zh/showcase/wwise.html',
  'zh/use-cases.html',
  'zh/why-dcc-mcp.html',
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
for (const { slug } of integrations) {
  for (const file of [`control/${slug}.html`, `zh/control/${slug}.html`]) {
    if (!existsSync(join(dist, file))) throw new Error(`Missing generated DCC control guide: ${file}`)
  }
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
if (!englishHome.includes('href="/use-cases"') || !chineseHome.includes('href="/zh/use-cases"')) {
  throw new Error('Localized homepages are missing the all-integration control guide link')
}
if (!englishHome.includes(`"numberOfItems":${releasedIntegrationCount}`)) {
  throw new Error('Homepage structured data has the wrong released integration count')
}
for (const label of ['Why DCC-MCP', 'Marketplace', 'Showcase', 'For Agents']) {
  if (!englishHome.includes(`>${label}<`)) throw new Error(`English navigation is missing ${label}`)
}
for (const label of ['为什么是 DCC-MCP', '技能市场', '案例画廊', 'Agent 使用']) {
  if (!chineseHome.includes(`>${label}<`)) throw new Error(`Chinese navigation is missing ${label}`)
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
for (const route of ['/', '/marketplace', '/showcase', '/showcase/wwise', '/use-cases', '/why-dcc-mcp', '/zh/', '/zh/marketplace', '/zh/showcase', '/zh/showcase/wwise', '/zh/use-cases', '/zh/why-dcc-mcp']) {
  if (!sitemap.includes(`https://dcc-mcp.github.io${route}`)) throw new Error(`Sitemap is missing ${route}`)
}
for (const { slug } of integrations) {
  for (const route of [`/control/${slug}`, `/zh/control/${slug}`]) {
    if (!sitemap.includes(`https://dcc-mcp.github.io${route}`)) throw new Error(`Sitemap is missing ${route}`)
  }
}
if (sitemap.includes('/public/') || sitemap.includes('/README')) {
  throw new Error('Sitemap contains an internal asset README')
}

const marketplaceSource = readFileSync(join(root, 'docs', '.vitepress', 'theme', 'components', 'MarketplaceSearch.vue'), 'utf8')
if (!marketplaceSource.includes('raw.githubusercontent.com')) throw new Error('Marketplace media is not pinned to repository source')
if (!marketplaceSource.includes('mp4|webm|ogg|mov')) throw new Error('Marketplace video media support is missing')
if (!marketplaceSource.includes('props.preview ? previewSkills.value : filtered.value')) {
  throw new Error('Marketplace home preview support is missing')
}
if (!marketplaceSource.includes('dcc-mcp-cli marketplace install ${skill.name} --dcc ${host} --reload')) {
  throw new Error('Marketplace copy command is missing install --reload')
}
const catalogResponse = await fetch('https://raw.githubusercontent.com/dcc-mcp/marketplace/main/marketplace.json', {
  signal: AbortSignal.timeout(15_000),
})
if (!catalogResponse.ok) throw new Error(`Marketplace validation request failed (${catalogResponse.status})`)
const catalog = await catalogResponse.json()
if (!Array.isArray(catalog.skills)) throw new Error('Marketplace validation response is invalid')
for (const file of [join(dist, 'marketplace.html'), join(dist, 'zh', 'marketplace.html')]) {
  const html = readFileSync(file, 'utf8')
  const missing = catalog.skills.filter((skill) => !html.includes(skill.name)).map((skill) => skill.name)
  if (missing.length) throw new Error(`${file} is missing rendered Marketplace packages: ${missing.join(', ')}`)
}

const showcaseSource = readFileSync(join(root, 'docs', '.vitepress', 'theme', 'components', 'ShowcaseGallery.vue'), 'utf8')
for (const asset of ['blender-lookdev.webp', 'marmoset-pbr-lookdev.webp', 'dcc-mcp-wwise-dark.svg', 'houdini-portal.png', 'hunyuan3d.webp', 'geospatial-city.webp', 'maya-architecture.jpg', 'kenney-assets.webp']) {
  if (!showcaseSource.includes(asset)) throw new Error(`Showcase gallery is missing ${asset}`)
}
if (!showcaseSource.includes('navigator.clipboard.writeText')) throw new Error('Showcase prompt copy support is missing')
const showcaseIds = [...showcaseSource.matchAll(/id: '([^']+)'/g)].map((match) => match[1])
for (const file of [join(dist, 'showcase.html'), join(dist, 'zh', 'showcase.html')]) {
  const html = readFileSync(file, 'utf8')
  const missing = showcaseIds.filter((id) => !html.includes(`id="${id}"`))
  if (missing.length) throw new Error(`${file} is missing rendered Showcase entries: ${missing.join(', ')}`)
}

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
for (const phrase of ['control Maya with AI', 'control Houdini with AI', 'control Blender with AI', 'create ten random spheres in Maya', 'want to make a game', 'edit photos with AI', 'edit or composite a film with AI', 'create visual effects with AI']) {
  if (!englishUseCases.toLowerCase().includes(phrase.toLowerCase())) throw new Error(`English use cases are missing: ${phrase}`)
}
for (const phrase of ['AI 怎么控制 Maya', 'AI 怎么控制 Houdini', 'AI 怎么控制 Blender', '我想在 Maya 创建十个随机的小球', '我想做一个游戏', '我想用 AI 修图', '我想用 AI 剪辑或合成片子', '我想用 AI 做特效']) {
  if (!chineseUseCases.includes(phrase)) throw new Error(`Chinese use cases are missing: ${phrase}`)
}
const llmsFiles = [
  readFileSync(join(dist, 'llms.txt'), 'utf8'),
  readFileSync(join(dist, 'llms-full.txt'), 'utf8'),
  readFileSync(join(dist, 'zh', 'llms.txt'), 'utf8'),
  readFileSync(join(dist, 'zh', 'llms-full.txt'), 'utf8'),
]
for (const { slug, name, repository } of integrations) {
  const englishGuide = readFileSync(join(dist, 'control', `${slug}.html`), 'utf8')
  const chineseGuide = readFileSync(join(dist, 'zh', 'control', `${slug}.html`), 'utf8')
  for (const [label, html, localePath, question] of [
    ['English', englishGuide, `control/${slug}`, `control ${name}`],
    ['Chinese', chineseGuide, `zh/control/${slug}`, `控制 ${name}`],
  ]) {
    if (!html.includes(question)) throw new Error(`${label} ${name} guide is missing its direct-answer question`)
    if (!html.includes(`https://github.com/dcc-mcp/${repository}`)) throw new Error(`${label} ${name} guide is missing its owning repository`)
    if (!html.includes(`https://dcc-mcp.github.io/${localePath}`)) throw new Error(`${label} ${name} guide is missing its canonical URL`)
    if (!html.includes('hreflang="en"') || !html.includes('hreflang="zh-CN"')) {
      throw new Error(`${label} ${name} guide is missing language alternates`)
    }
  }
  if (!englishUseCases.includes(`/control/${slug}`) || !chineseUseCases.includes(`/zh/control/${slug}`)) {
    throw new Error(`Localized use-case hubs are missing the ${name} guide`)
  }
  for (const llms of llmsFiles) {
    if (!llms.includes(`/control/${slug}`)) throw new Error(`An llms file is missing the ${name} guide`)
  }
}

const developerGuides = [
  [join(root, 'docs', 'developers.md'), ['private non-DCC service', 'instance_type="standalone"', 'dcc-mcp-cli lint skills', '@modelcontextprotocol/inspector@latest', 'devcontainer up', 'Educates', 'Do not create a GitHub repository']],
  [join(root, 'docs', 'zh', 'developers.md'), ['内部非 DCC 服务', 'instance_type="standalone"', 'dcc-mcp-cli lint skills', '@modelcontextprotocol/inspector@latest', 'devcontainer up', 'Educates', '不要创建 GitHub 仓库']],
]
for (const [file, phrases] of developerGuides) {
  const source = readFileSync(file, 'utf8')
  for (const phrase of phrases) {
    if (!source.includes(phrase)) throw new Error(`${file} is missing the developer lab contract: ${phrase}`)
  }
}

const whyGuides = [
  [join(root, 'docs', 'why-dcc-mcp.md'), ['Start with the production process', 'CLI, MCP, and REST share one implementation', 'Why direct scripts stopped scaling', 'Use existing protocols first', 'Keep failure evidence', 'What still depends on human judgment', 'Known limits']],
  [join(root, 'docs', 'zh', 'why-dcc-mcp.md'), ['先整理生产流程', 'CLI、MCP 与 REST 共用一套实现', '临时脚本为什么无法规模化', '优先复用现有协议', '保留失败证据', '仍然依赖人的判断', '已知边界']],
]
for (const [file, phrases] of whyGuides) {
  const source = readFileSync(file, 'utf8')
  for (const phrase of phrases) {
    if (!source.includes(phrase)) throw new Error(`${file} is missing the architecture rationale: ${phrase}`)
  }
}

console.log(`Validated ${18 + integrations.length * 2} localized pages, ${integrations.length} bilingual DCC control guides, 4 llms files, architecture rationale, developer labs, theme logos, sitemap, Marketplace media, Showcase prompts, audio, and GEO use cases.`)
