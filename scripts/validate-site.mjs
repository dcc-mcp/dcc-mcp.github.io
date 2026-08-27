import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  expectedGuideIdentities,
  expectedReleasedDccTypes,
  guideIdentityKey,
} from './site-identity-contract.mjs'
import { loadIntegrationCatalog } from './integration-catalog-reader.mjs'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'docs', '.vitepress', 'dist')
const installSopSchemaPath = 'schemas/adapter-install-sop-v1.schema.json'
const installSopSchemaUrl = `https://dcc-mcp.github.io/${installSopSchemaPath}`
const installSopSchemaHash = '3ca25788439917b4d4c0617230a762f9797756b5b54f45c8c4149f975b90f904'
const installSopSchemaSourceCommit = '9439d1191d729732517f5c023725de954dd211f8'
const installSopSchemaSourceUrl = `https://raw.githubusercontent.com/dcc-mcp/dcc-mcp-core/${installSopSchemaSourceCommit}/python/dcc_mcp_core/schemas/adapter-install-sop-v1.schema.json`
const integrations = loadIntegrationCatalog(join(root, 'docs', '.vitepress', 'dcc-integrations.mts'))
const expectedGuideIdentityKeys = expectedGuideIdentities.map(guideIdentityKey).sort()
const guideIdentityKeys = integrations.map(guideIdentityKey).sort()
const duplicateGuideIdentities = guideIdentityKeys.filter((identity, index) => (
  index > 0 && identity === guideIdentityKeys[index - 1]
))
const expectedGuideIdentitySet = new Set(expectedGuideIdentityKeys)
const guideIdentitySet = new Set(guideIdentityKeys)
const missingGuideIdentities = expectedGuideIdentityKeys.filter((identity) => !guideIdentitySet.has(identity))
const extraGuideIdentities = [...guideIdentitySet].filter((identity) => !expectedGuideIdentitySet.has(identity)).sort()
if (duplicateGuideIdentities.length || missingGuideIdentities.length || extraGuideIdentities.length) {
  throw new Error(
    'Public guide identities do not match the frozen 36-guide contract: '
    + `duplicates=[${[...new Set(duplicateGuideIdentities)].join(';')}] `
    + `missing=[${missingGuideIdentities.join(';')}] `
    + `extra=[${extraGuideIdentities.join(';')}]`,
  )
}
if (integrations.length !== expectedGuideIdentities.length) {
  throw new Error(
    `Expected ${expectedGuideIdentities.length} public application and pipeline integrations, found ${integrations.length}`,
  )
}
const releasedDccTypes = integrations.flatMap(({ dccType }) => dccType ? [dccType] : []).sort()
const duplicateReleasedDccTypes = releasedDccTypes.filter((dccType, index) => (
  index > 0 && dccType === releasedDccTypes[index - 1]
))
const expectedReleasedDccTypeSet = new Set(expectedReleasedDccTypes)
const releasedDccTypeSet = new Set(releasedDccTypes)
const missingReleasedDccTypes = expectedReleasedDccTypes.filter((dccType) => !releasedDccTypeSet.has(dccType))
const extraReleasedDccTypes = [...releasedDccTypeSet].filter((dccType) => !expectedReleasedDccTypeSet.has(dccType)).sort()
if (duplicateReleasedDccTypes.length || missingReleasedDccTypes.length || extraReleasedDccTypes.length) {
  throw new Error(
    'Released host identifiers do not match dcc-mcp-cli 0.20.21: '
    + `duplicates=[${[...new Set(duplicateReleasedDccTypes)].join(',')}] `
    + `missing=[${missingReleasedDccTypes.join(',')}] `
    + `extra=[${extraReleasedDccTypes.join(',')}]`,
  )
}
const releasedIntegrationCount = expectedReleasedDccTypes.length

const parseStructuredData = (html, label) => {
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  if (scripts.length !== 1) {
    throw new Error(`${label} must render exactly one JSON-LD document, found ${scripts.length}`)
  }
  try {
    return JSON.parse(scripts[0][1])
  } catch (error) {
    throw new Error(`${label} rendered invalid JSON-LD: ${error.message}`)
  }
}

const graphEntities = (document, label) => {
  if (document?.['@context'] !== 'https://schema.org' || !Array.isArray(document['@graph'])) {
    throw new Error(`${label} JSON-LD must contain one schema.org @graph`)
  }
  return document['@graph']
}

const oneEntity = (entities, type, label) => {
  const matches = entities.filter((entity) => entity?.['@type'] === type)
  if (matches.length !== 1) throw new Error(`${label} must contain exactly one ${type}, found ${matches.length}`)
  return matches[0]
}

const dccRepositoryPrefix = 'https://github.com/dcc-mcp/'

const collectDccRepositoryReferences = (value, path = '$', matches = []) => {
  if (typeof value === 'string') {
    if (value.includes(dccRepositoryPrefix)) matches.push({ kind: 'value', path, value })
    return matches
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectDccRepositoryReferences(item, `${path}[${index}]`, matches))
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => {
      if (key.includes(dccRepositoryPrefix)) matches.push({ kind: 'key', path: `${path}{key}`, value: key })
      collectDccRepositoryReferences(item, `${path}.${key}`, matches)
    })
  }
  return matches
}

const collectGraphDccRepositoryReferences = (entities) => entities.flatMap((entity) => {
  const entityId = typeof entity?.['@id'] === 'string' ? entity['@id'] : null
  const entityType = typeof entity?.['@type'] === 'string' ? entity['@type'] : null
  return collectDccRepositoryReferences(entity).map((reference) => ({
    ...reference,
    entityId,
    entityType,
  }))
})

const mutateStructuredData = (html, label, mutate) => {
  const pattern = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/
  const match = pattern.exec(html)
  if (!match) throw new Error(`${label} has no JSON-LD document to mutate`)
  const document = JSON.parse(match[1])
  mutate(document)
  return `${html.slice(0, match.index)}${match[0].replace(match[1], JSON.stringify(document))}${html.slice(match.index + match[0].length)}`
}

const expectValidationFailure = (label, expectedMessage, validate) => {
  try {
    validate()
  } catch (error) {
    if (error instanceof Error && error.message === expectedMessage) return
    throw error
  }
  throw new Error(`${label} mutation was accepted`)
}

const validateHomeEntities = (html, language) => {
  const label = language === 'en' ? 'English home' : 'Chinese home'
  const routePrefix = language === 'en' ? '/control/' : '/zh/control/'
  const entities = graphEntities(parseStructuredData(html, label), label)
  for (const type of ['Organization', 'WebSite', 'SoftwareApplication', 'ItemList']) oneEntity(entities, type, label)
  const itemList = oneEntity(entities, 'ItemList', label)
  if (itemList.numberOfItems !== releasedIntegrationCount || itemList.itemListElement?.length !== releasedIntegrationCount) {
    throw new Error(`${label} ItemList has the wrong released integration count`)
  }
  for (const integration of integrations.filter(({ dccType }) => dccType)) {
    const expectedUrl = `https://dcc-mcp.github.io${routePrefix}${integration.slug}`
    const expectedRepository = `https://github.com/dcc-mcp/${integration.repository}`
    const expectedName = language === 'en' ? `${integration.name} MCP adapter` : `${integration.name} MCP 适配器`
    const item = itemList.itemListElement.find(({ name }) => name === expectedName)
    const repositoryReferences = item ? collectDccRepositoryReferences(item) : []
    if (!item
        || item.url !== expectedUrl
        || item.sameAs !== expectedRepository
        || repositoryReferences.length !== 1
        || repositoryReferences[0].path !== '$.sameAs'
        || repositoryReferences[0].value !== expectedRepository) {
      throw new Error(`${label} ItemList has the wrong page/repository relationship for ${integration.name}`)
    }
    if (item.url === expectedRepository) throw new Error(`${label} ItemList uses a repository as the canonical item URL`)
  }
}

const validateControlEntities = (html, language, integration) => {
  const label = `${language === 'en' ? 'English' : 'Chinese'} ${integration.name} guide`
  const routePrefix = language === 'en' ? '/control/' : '/zh/control/'
  const expectedLanguage = language === 'en' ? 'en' : 'zh-CN'
  const pageUrl = `https://dcc-mcp.github.io${routePrefix}${integration.slug}`
  const repositoryUrl = `https://github.com/dcc-mcp/${integration.repository}`
  const entities = graphEntities(parseStructuredData(html, label), label)
  if (entities.some(({ '@type': type }) => ['Organization', 'WebSite', 'ItemList'].includes(type))) {
    throw new Error(`${label} repeats homepage-level structured entities`)
  }
  const webPage = oneEntity(entities, 'WebPage', label)
  const application = oneEntity(entities, 'SoftwareApplication', label)
  const expectedWebPageId = `${pageUrl}#webpage`
  const expectedApplicationId = `${pageUrl}#application`
  if (webPage['@id'] !== expectedWebPageId
      || webPage.url !== pageUrl
      || webPage.inLanguage !== expectedLanguage) {
    throw new Error(`${label} WebPage has the wrong identity, canonical URL, or language`)
  }
  if (application['@id'] !== expectedApplicationId
      || application.url !== pageUrl
      || application.inLanguage !== expectedLanguage) {
    throw new Error(`${label} SoftwareApplication has the wrong canonical URL or language`)
  }
  if (webPage.mainEntity?.['@id'] !== expectedApplicationId) {
    throw new Error(`${label} does not connect WebPage.mainEntity to its application entity`)
  }
  if (application.sameAs !== repositoryUrl) {
    throw new Error(`${label} does not link its owning repository through sameAs`)
  }
  const repositoryReferences = collectGraphDccRepositoryReferences(entities)
  if (repositoryReferences.length !== 1
      || repositoryReferences[0].kind !== 'value'
      || repositoryReferences[0].entityId !== expectedApplicationId
      || repositoryReferences[0].entityType !== 'SoftwareApplication'
      || repositoryReferences[0].path !== '$.sameAs'
      || repositoryReferences[0].value !== repositoryUrl) {
    throw new Error(`${label} has the wrong graph-wide repository relationship`)
  }
  const expectedIdentifier = integration.dccType ?? integration.marketplacePackage
  const expectedIdentifierKind = integration.dccType ? 'DCC-MCP host identifier' : 'DCC-MCP Marketplace package'
  if (!expectedIdentifier
      || application.identifier?.['@type'] !== 'PropertyValue'
      || application.identifier.propertyID !== expectedIdentifierKind
      || application.identifier.value !== expectedIdentifier) {
    throw new Error(`${label} has the wrong host or package identifier`)
  }
  for (const forbidden of ['aggregateRating', 'offers', 'brand', 'manufacturer']) {
    if (forbidden in application) throw new Error(`${label} must not publish ${forbidden}`)
  }
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
  installSopSchemaPath,
  'brand/dcc-mcp-logo-admin-light.png',
  'brand/dcc-mcp-logo-admin-dark.png',
  'brand/dcc-mcp-wwise.svg',
  'brand/dcc-mcp-wwise-dark.svg',
  'dcc-logos/wwise.png',
  'dcc-logos/cinema4d.png',
  'dcc-logos/comfyui.svg',
  'dcc-logos/freecad.png',
  'dcc-logos/illustrator.svg',
  'dcc-logos/mari.svg',
  'dcc-logos/openscad.png',
  'dcc-logos/sketchup.svg',
  'dcc-logos/shogun.svg',
  'dcc-logos/touchdesigner-reference.svg',
  'showcase/cinema4d-typed-scene.webp',
  'showcase/cache-inspection-workflow.webp',
  'showcase/comfyui-typed-workflow.webp',
  'showcase/freecad-game-ready-pipeline.webp',
  'showcase/illustrator-typed-vector-workflow.webp',
  'showcase/openscad-parametric-pipeline.webp',
  'showcase/sketchup-typed-modeling.webp',
  'showcase/shogun-typed-mocap-workflow.webp',
  'showcase/touchdesigner-typed-operator-workflow.webp',
  'showcase/tiled-typed-map-workflow.webp',
  'showcase/material-maker-typed-material-workflow.webp',
  'showcase/krita-typed-paint-workflow.webp',
  'showcase/gimp-typed-image-workflow.webp',
  'showcase/katana-typed-lookdev-workflow.webp',
  'showcase/premiere-typed-edit-workflow.webp',
  'showcase/wwise/ui-confirm.wav',
  'showcase/wwise/sci-fi-impact.wav',
  'showcase/wwise/neon-circuit-bgm.wav',
]

for (const file of requiredFiles) {
  if (!existsSync(join(dist, file))) throw new Error(`Missing generated file: ${file}`)
}

const installSopSourceBytes = readFileSync(join(root, 'docs', 'public', installSopSchemaPath))
const installSopDistBytes = readFileSync(join(dist, installSopSchemaPath))
const actualInstallSopHash = createHash('sha256').update(installSopSourceBytes).digest('hex')
if (actualInstallSopHash !== installSopSchemaHash) {
  throw new Error(`Adapter Install SOP v1 schema hash changed: ${actualInstallSopHash}`)
}
if (!installSopSourceBytes.equals(installSopDistBytes)) {
  throw new Error('Generated Adapter Install SOP v1 schema differs from its public source asset')
}
const installSopSchema = JSON.parse(installSopSourceBytes.toString('utf8'))
if (installSopSchema.$id !== installSopSchemaUrl) {
  throw new Error(`Adapter Install SOP v1 schema has the wrong canonical $id: ${installSopSchema.$id}`)
}
if (installSopSchema.$schema !== 'https://json-schema.org/draft/2020-12/schema') {
  throw new Error(`Adapter Install SOP v1 schema has the wrong dialect: ${installSopSchema.$schema}`)
}
const installSopOwnerResponse = await fetch(installSopSchemaSourceUrl, {
  signal: AbortSignal.timeout(15_000),
})
if (!installSopOwnerResponse.ok) {
  throw new Error(`Adapter Install SOP v1 owner validation request failed (${installSopOwnerResponse.status})`)
}
const installSopOwnerBytes = Buffer.from(await installSopOwnerResponse.arrayBuffer())
if (!installSopSourceBytes.equals(installSopOwnerBytes)) {
  throw new Error('Public Adapter Install SOP v1 schema differs from the immutable Core-owned source')
}
const installSopProvenance = readFileSync(join(root, 'docs', 'public', 'schemas', 'README.md'), 'utf8')
for (const value of [installSopSchemaUrl, installSopSchemaHash, installSopSchemaSourceCommit, 'dcc-mcp/dcc-mcp-core#2320']) {
  if (!installSopProvenance.includes(value)) {
    throw new Error(`Adapter Install SOP v1 provenance is missing: ${value}`)
  }
}
for (const { slug } of integrations) {
  for (const file of [`control/${slug}.html`, `zh/control/${slug}.html`]) {
    if (!existsSync(join(dist, file))) throw new Error(`Missing generated DCC control guide: ${file}`)
  }
}

const englishHome = readFileSync(join(dist, 'index.html'), 'utf8')
const chineseHome = readFileSync(join(dist, 'zh', 'index.html'), 'utf8')
const powerPointIntegration = integrations.find(({ slug }) => slug === 'powerpoint')
if (
  !powerPointIntegration
  || powerPointIntegration.name !== 'PowerPoint'
  || powerPointIntegration.repository !== 'dcc-mcp-powerpoint'
  || powerPointIntegration.dccType !== 'powerpoint'
) {
  throw new Error('The website integration source is missing the released PowerPoint host')
}
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
const universalSkillCommand = 'npx --yes skills@1.5.22 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp'
const hasRenderedSkillInstall = (html) => [
  'npx',
  'skills@1.5.22',
  'dcc-mcp/dcc-mcp-agent-plugins',
  '--skill',
].every((part) => html.includes(part))
for (const [name, html, prompt] of [
  ['English home', englishHome, 'Use the dcc-mcp Skill to set up DCC-MCP'],
  ['Chinese home', chineseHome, '使用 dcc-mcp Skill 为这台机器上的创意应用配置 DCC-MCP'],
]) {
  if (!hasRenderedSkillInstall(html) || !html.includes(prompt)) {
    throw new Error(`${name} is missing the universal Skill install and short prompt`)
  }
}
if (!englishHome.includes('CAPABILITY MARKETPLACE') || !chineseHome.includes('能力市场')) {
  throw new Error('Localized homepages are missing the Marketplace preview')
}
if (!englishHome.includes('href="/use-cases"') || !chineseHome.includes('href="/zh/use-cases"')) {
  throw new Error('Localized homepages are missing the all-integration control guide link')
}
for (const [name, html, prefix] of [
  ['English home', englishHome, ''],
  ['Chinese home', chineseHome, '/zh'],
]) {
  for (const slug of ['godot', 'unity', 'unreal-engine']) {
    if (!html.includes(`href="${prefix}/control/${slug}"`)) {
      throw new Error(`${name} is missing the visible ${slug} control-guide link`)
    }
  }
}
validateHomeEntities(englishHome, 'en')
validateHomeEntities(chineseHome, 'zh')
{
  const integration = integrations.find(({ slug }) => slug === 'maya')
  if (!integration) throw new Error('Maya integration is missing from the mutation gate')
  const source = readFileSync(join(dist, 'control', 'maya.html'), 'utf8')
  const mutated = mutateStructuredData(source, 'English Maya guide', (document) => {
    const entities = graphEntities(document, 'English Maya guide mutation')
    const webPage = oneEntity(entities, 'WebPage', 'English Maya guide mutation')
    const application = oneEntity(entities, 'SoftwareApplication', 'English Maya guide mutation')
    const wrongId = 'https://dcc-mcp.github.io/control/maya#wrong-entity'
    webPage['@id'] = wrongId
    application['@id'] = wrongId
    webPage.mainEntity = { '@id': wrongId }
  })
  expectValidationFailure(
    'Coordinated control entity ID',
    'English Maya guide WebPage has the wrong identity, canonical URL, or language',
    () => validateControlEntities(mutated, 'en', integration),
  )
}
{
  const integration = integrations.find(({ slug }) => slug === 'maya')
  if (!integration) throw new Error('Maya integration is missing from the control repository mutation gate')
  const repositoryUrl = `https://github.com/dcc-mcp/${integration.repository}`
  const foreignRepositoryUrl = 'https://github.com/dcc-mcp/dcc-mcp-3dsmax'
  for (const [language, relativePath] of [['en', ['control', 'maya.html']], ['zh', ['zh', 'control', 'maya.html']]]) {
    const label = `${language === 'en' ? 'English' : 'Chinese'} Maya guide`
    const source = readFileSync(join(dist, ...relativePath), 'utf8')
    for (const [caseName, mutateEntities] of [
      ['WebPage owning repository subjectOf', (webPage) => { webPage.subjectOf = repositoryUrl }],
      ['application nested foreign repository', (_webPage, application) => {
        application.reviewProbe = { nested: [{ target: foreignRepositoryUrl }] }
      }],
      ['application foreign repository property key', (_webPage, application) => {
        application.reviewProbe = { [foreignRepositoryUrl]: 'hidden' }
      }],
      ['application repository prefix substring', (_webPage, application) => {
        application.reviewProbe = { text: `before ${dccRepositoryPrefix}shadow after` }
      }],
      ['additional entity nested foreign repository', (_webPage, _application, entities) => {
        entities.push({
          '@type': 'CreativeWork',
          '@id': 'https://dcc-mcp.github.io/review-probe#creative-work',
          subjectOf: { url: foreignRepositoryUrl },
        })
      }],
    ]) {
      const mutated = mutateStructuredData(source, label, (document) => {
        const entities = graphEntities(document, `${label} mutation`)
        const webPage = oneEntity(entities, 'WebPage', `${label} mutation`)
        const application = oneEntity(entities, 'SoftwareApplication', `${label} mutation`)
        mutateEntities(webPage, application, entities)
      })
      expectValidationFailure(
        `${label} ${caseName}`,
        `${label} has the wrong graph-wide repository relationship`,
        () => validateControlEntities(mutated, language, integration),
      )
    }
    const reorderedWithOrdinaryGithubUrl = mutateStructuredData(source, label, (document) => {
      const entities = graphEntities(document, `${label} allowed mutation`)
      const application = oneEntity(entities, 'SoftwareApplication', `${label} allowed mutation`)
      application.citation = 'https://github.com/example/ordinary-project'
      document['@graph'] = [...entities].reverse()
    })
    validateControlEntities(reorderedWithOrdinaryGithubUrl, language, integration)
  }
}
for (const [language, source] of [['en', englishHome], ['zh', chineseHome]]) {
  const label = language === 'en' ? 'English home' : 'Chinese home'
  const mutated = mutateStructuredData(source, label, (document) => {
    const entities = graphEntities(document, `${label} mutation`)
    const itemList = oneEntity(entities, 'ItemList', `${label} mutation`)
    itemList.itemListElement[0].subjectOf = itemList.itemListElement[0].sameAs
  })
  expectValidationFailure(
    `${label} repository subjectOf`,
    `${label} ItemList has the wrong page/repository relationship for 3ds Max`,
    () => validateHomeEntities(mutated, language),
  )
}
for (const [language, source] of [['en', englishHome], ['zh', chineseHome]]) {
  const label = language === 'en' ? 'English home' : 'Chinese home'
  const foreignRepository = 'https://github.com/dcc-mcp/dcc-mcp-maya'
  for (const [caseName, mutateItem] of [
    ['foreign repository subjectOf', (item) => { item.subjectOf = foreignRepository }],
    ['foreign repository nested path', (item) => { item.reviewProbe = { links: [{ target: foreignRepository }] } }],
    ['foreign repository property key', (item) => { item.reviewProbe = { [foreignRepository]: 'hidden' } }],
  ]) {
    const mutated = mutateStructuredData(source, label, (document) => {
      const entities = graphEntities(document, `${label} mutation`)
      const itemList = oneEntity(entities, 'ItemList', `${label} mutation`)
      mutateItem(itemList.itemListElement[0])
    })
    expectValidationFailure(
      `${label} ${caseName}`,
      `${label} ItemList has the wrong page/repository relationship for 3ds Max`,
      () => validateHomeEntities(mutated, language),
    )
  }
}
for (const phrase of ['Maya MCP', '3ds Max MCP', 'Blender MCP', 'Maya CLI', 'Blender CLI', 'Unity and Tuanjie AI', 'Unreal Engine official MCP']) {
  if (!englishHome.includes(phrase)) throw new Error(`English home is missing the GEO answer: ${phrase}`)
}
for (const phrase of ['Maya MCP', '3ds Max MCP', 'Blender MCP', 'Maya CLI', 'Blender CLI', 'Unity 与团结 AI', 'Unreal Engine 官方 MCP']) {
  if (!chineseHome.includes(phrase)) throw new Error(`Chinese home is missing the GEO answer: ${phrase}`)
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

const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
const organizationHeaders = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'dcc-mcp-website-validator',
}
if (githubToken) organizationHeaders.Authorization = `Bearer ${githubToken}`
const organizationResponse = await fetch('https://api.github.com/orgs/dcc-mcp/repos?per_page=100&type=public', {
  headers: organizationHeaders,
  signal: AbortSignal.timeout(15_000),
})
if (!organizationResponse.ok) {
  throw new Error(`Organization repository validation request failed (${organizationResponse.status})`)
}
const organizationRepositories = (await organizationResponse.json()).filter(({ archived }) => !archived)
if (!organizationRepositories.length) throw new Error('Organization repository validation response is empty')
const missingDescriptions = organizationRepositories.filter(({ description }) => !description).map(({ name }) => name)
const missingHomepages = organizationRepositories.filter(({ homepage }) => !homepage).map(({ name }) => name)
const missingTopics = organizationRepositories.filter(({ topics }) => !topics?.length).map(({ name }) => name)
if (missingDescriptions.length || missingHomepages.length || missingTopics.length) {
  console.warn([
    'Organization repository metadata remains incomplete:',
    `description=${missingDescriptions.length} [${missingDescriptions.join(', ')}]`,
    `homepage=${missingHomepages.length} [${missingHomepages.join(', ')}]`,
    `topics=${missingTopics.length} [${missingTopics.join(', ')}]`,
  ].join(' '))
}
for (const file of [join(dist, 'ecosystem.html'), join(dist, 'zh', 'ecosystem.html')]) {
  const html = readFileSync(file, 'utf8')
  const missing = organizationRepositories
    .filter(({ html_url: url }) => !html.includes(url))
    .map(({ name }) => name)
  if (missing.length) throw new Error(`${file} is missing active organization repositories: ${missing.join(', ')}`)
}

const showcaseSource = readFileSync(join(root, 'docs', '.vitepress', 'theme', 'components', 'ShowcaseGallery.vue'), 'utf8')
for (const asset of ['blender-lookdev.webp', 'marmoset-pbr-lookdev.webp', 'dcc-mcp-wwise-dark.svg', 'houdini-portal.png', 'hunyuan3d.webp', 'geospatial-city.webp', 'maya-architecture.jpg', 'kenney-assets.webp', 'cache-inspection-workflow.webp', 'cinema4d-typed-scene.webp', 'comfyui-typed-workflow.webp', 'freecad-game-ready-pipeline.webp', 'illustrator-typed-vector-workflow.webp', 'openscad-parametric-pipeline.webp', 'sketchup-typed-modeling.webp', 'shogun-typed-mocap-workflow.webp', 'touchdesigner-typed-operator-workflow.webp', 'tiled-typed-map-workflow.webp', 'material-maker-typed-material-workflow.webp', 'krita-typed-paint-workflow.webp', 'gimp-typed-image-workflow.webp', 'katana-typed-lookdev-workflow.webp', 'premiere-typed-edit-workflow.webp']) {
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
for (const llms of llmsFiles) {
  if (!llms.includes(universalSkillCommand) || !llms.includes('https://github.com/dcc-mcp/dcc-mcp-agent-plugins')) {
    throw new Error('An llms file is missing the canonical Agent Skill distribution contract')
  }
  if (!llms.includes(installSopSchemaUrl)) {
    throw new Error('An llms file is missing the canonical Adapter Install SOP v1 schema')
  }
  for (const phrase of ['Maya MCP', '3ds Max MCP', 'Blender MCP', 'Maya CLI', '3ds Max CLI', 'Blender CLI', 'Tuanjie AI']) {
    if (!llms.includes(phrase)) throw new Error(`An llms file is missing the search alias: ${phrase}`)
  }
}
for (const [file, prompt] of [
  [join(dist, 'agents.html'), 'Use the dcc-mcp Skill to &lt;describe the DCC task&gt;'],
  [join(dist, 'zh', 'agents.html'), '使用 dcc-mcp Skill 完成&lt;描述 DCC 任务&gt;'],
]) {
  const html = readFileSync(file, 'utf8')
  if (!hasRenderedSkillInstall(html) || !html.includes(prompt)) {
    throw new Error(`${file} is missing the universal Skill install and short prompt`)
  }
}
for (const { slug, name, repository, dccType, marketplacePackage } of integrations) {
  const englishGuide = readFileSync(join(dist, 'control', `${slug}.html`), 'utf8')
  const chineseGuide = readFileSync(join(dist, 'zh', 'control', `${slug}.html`), 'utf8')
  validateControlEntities(englishGuide, 'en', { slug, name, repository, dccType, marketplacePackage })
  validateControlEntities(chineseGuide, 'zh', { slug, name, repository, dccType, marketplacePackage })
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
for (const [slug, name] of [['maya', 'Maya'], ['3ds-max', '3ds Max'], ['blender', 'Blender']]) {
  const englishGuide = readFileSync(join(dist, 'control', `${slug}.html`), 'utf8')
  const chineseGuide = readFileSync(join(dist, 'zh', 'control', `${slug}.html`), 'utf8')
  for (const [label, html] of [['English', englishGuide], ['Chinese', chineseGuide]]) {
    for (const phrase of [`${name} MCP`, `${name} CLI`, `--dcc-type ${slug === '3ds-max' ? '3dsmax' : slug}`]) {
      if (!html.includes(phrase)) throw new Error(`${label} ${name} guide is missing the GEO answer: ${phrase}`)
    }
  }
}
for (const [label, file, phrases] of [
  ['English', join(dist, 'control', 'unity.html'), ['Tuanjie AI', 'unity-tuanjie-ai', 'native Codely CustomTool']],
  ['Chinese', join(dist, 'zh', 'control', 'unity.html'), ['Tuanjie AI', 'unity-tuanjie-ai', '原生 Codely CustomTool']],
]) {
  const html = readFileSync(file, 'utf8')
  for (const phrase of phrases) {
    if (!html.includes(phrase)) throw new Error(`${label} Unity guide is missing the Tuanjie boundary: ${phrase}`)
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
for (const [label, file, phrases] of [
  ['English', join(dist, 'why-dcc-mcp.html'), ['What is DCC-MCP?', 'open infrastructure', 'shared, typed control plane for creative applications']],
  ['Chinese', join(dist, 'zh', 'why-dcc-mcp.html'), ['DCC-MCP 是什么？', '开放基础设施', '面向创意应用的共享类型化控制面']],
]) {
  const html = readFileSync(file, 'utf8')
  for (const phrase of phrases) {
    if (!html.includes(phrase)) throw new Error(`${label} Why guide is missing the direct answer: ${phrase}`)
  }
}

console.log(`Validated ${18 + integrations.length * 2} localized pages, ${integrations.length} bilingual DCC control guides, ${organizationRepositories.length} active organization repositories, 4 llms files, the Install SOP v1 schema mirror, architecture rationale, developer labs, theme logos, sitemap, Marketplace media, Showcase prompts, audio, and GEO use cases.`)
