import { addedLocales, languageTag, localePrefix, site, siteLocale, siteLocales, type SiteLocale } from './i18n/locales'
import { createLocale, createSearchLocale } from './i18n/theme.mts'
import { defineConfig } from 'vitepress'
import { dccIntegrations, releasedIntegrations, type DccIntegration } from './dcc-integrations.mts'

const siteUrl = 'https://dcc-mcp.github.io/'
const description = 'DCC-MCP is an open-source control plane for AI agents and automation across digital content creation. It connects Maya, Blender, Houdini, Unreal Engine, Unity, and other creative applications through MCP, REST APIs, and a shared CLI.'
const zhDescription = 'DCC-MCP 是面向数字内容创作（DCC）的开源控制平面，让 AI Agent 和自动化程序通过 MCP、REST API 与统一 CLI 连接 Maya、Blender、Houdini、Unreal Engine、Unity 等创意应用。'

const controlPageUrl = (integration: DccIntegration, locale: SiteLocale) =>
  new URL(`${localePrefix(locale)}/control/${integration.slug}`, siteUrl).href

const repositoryUrl = (integration: DccIntegration) =>
  `https://github.com/dcc-mcp/${integration.repository}`

const integrationIdentifier = (integration: DccIntegration) => ({
  '@type': 'PropertyValue',
  propertyID: integration.dccType
    ? 'DCC-MCP catalog adapter identifier'
    : integration.coreApplicationRoute
      ? 'DCC-MCP Core application route'
    : integration.marketplacePackage
      ? 'DCC-MCP Marketplace package'
      : 'Independent integration repository',
  value: integration.dccType ?? integration.coreApplicationRoute ?? integration.marketplacePackage ?? integration.repository,
})

const siteDescription = (locale: SiteLocale) => locale === 'en' ? description : locale === 'zh' ? zhDescription : site[locale].description
const homeTitle = (locale: SiteLocale) => locale === 'en' ? 'AI control for creative workflows' : locale === 'zh' ? '用 AI 连接创作软件与制作流程' : site[locale].homeTitle

const homeStructuredData = (locale: SiteLocale) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
      name: 'DCC-MCP',
      url: siteUrl,
      logo: `${siteUrl}brand/dcc-mcp-logo.png`,
      sameAs: [
        'https://github.com/dcc-mcp',
        'https://www.youtube.com/@dcc-mcp',
        'https://clawhub.ai/loonghao/skills/dcc-mcp',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      name: 'DCC-MCP',
      url: siteUrl,
      description: siteDescription(locale),
      inLanguage: siteLocales.map(languageTag),
      publisher: { '@id': `${siteUrl}#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: new URL(`${localePrefix(locale)}/marketplace?q={search_term_string}`, siteUrl).href,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}#application`,
      name: 'DCC-MCP',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Digital content creation workflow automation',
      operatingSystem: 'Windows, macOS, Linux',
      url: siteUrl,
      description: siteDescription(locale),
      featureList: [
        'MCP tool discovery and calls',
        'REST API and OpenAPI workflows',
        'Typed dcc-mcp-cli commands',
        'DCC adapters and reusable Skills',
      ],
      publisher: { '@id': `${siteUrl}#organization` },
    },
    {
      '@type': 'ItemList',
      name: locale === 'zh' ? 'DCC-MCP 目录中的创意应用集成' : locale === 'en' ? 'DCC-MCP catalog-listed creative application integrations' : site[locale].nav.ecosystem,
      numberOfItems: releasedIntegrations.length,
      itemListElement: releasedIntegrations.map((integration, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: locale === 'zh' ? `${integration.name} MCP 适配器` : locale === 'en' ? `${integration.name} MCP adapter` : `${integration.name} MCP`,
        description: locale === 'zh'
          ? `通过 MCP 或 dcc-mcp-cli 操作 ${integration.name}`
          : locale === 'en' ? `${integration.name} MCP and typed dcc-mcp-cli integration` : `${integration.name} · MCP · dcc-mcp-cli`,
        url: controlPageUrl(integration, locale),
        sameAs: repositoryUrl(integration),
      })),
    },
  ],
})

const controlPageStructuredData = (
  integration: DccIntegration,
  locale: SiteLocale,
  canonicalUrl: string,
  title: string,
  pageDescription: string,
) => {
  const language = languageTag(locale)
  const applicationId = `${canonicalUrl}#application`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description: pageDescription,
        inLanguage: language,
        isPartOf: { '@id': `${siteUrl}#website` },
        mainEntity: { '@id': applicationId },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': applicationId,
        name: locale === 'zh' ? `${integration.name} MCP 集成` : locale === 'en' ? `${integration.name} MCP integration` : `${integration.name} MCP`,
        description: pageDescription,
        applicationCategory: 'DeveloperApplication',
        url: canonicalUrl,
        inLanguage: language,
        identifier: integrationIdentifier(integration),
        sameAs: repositoryUrl(integration),
      },
    ],
  }
}

const cloudAgentPageStructuredData = (
  locale: SiteLocale,
  canonicalUrl: string,
  title: string,
  pageDescription: string,
) => ({
  '@context': 'https://schema.org',
  '@graph': [{
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description: pageDescription,
    inLanguage: languageTag(locale),
    isPartOf: { '@id': `${siteUrl}#website` },
  }],
})

const englishTheme = {
  nav: [
    { text: 'Why DCC-MCP', link: '/why-dcc-mcp' },
    { text: 'Marketplace', link: '/marketplace' },
    { text: 'Showcase', link: 'https://dcc-mcp.github.io/showcase/', target: '_self' },
    {
      text: 'Resources',
      items: [
        { text: 'For Agents', link: '/agents' },
        { text: 'For Developers', link: '/developers' },
        { text: 'Ecosystem', link: '/ecosystem' },
        { text: 'Common AI + DCC tasks', link: '/use-cases' },
        { text: 'Cloud agents and DCC-MCP', link: '/cloud-agents' },
        { text: 'Adapter examples and prompts', link: '/examples' },
        { text: 'Core documentation', link: 'https://dcc-mcp.github.io/dcc-mcp-core/' },
        { text: 'CLI reference', link: 'https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference' },
        { text: 'Python API', link: 'https://dcc-mcp.github.io/dcc-mcp-core/api/models' },
        { text: 'Marketplace source', link: 'https://github.com/dcc-mcp/marketplace' },
      ],
    },
  ],
  footer: {
    message: 'Gateway, CLI, adapters, and Skills for creative applications. '
      + '<a href="https://github.com/dcc-mcp" target="_blank" rel="noopener">GitHub</a> &middot; '
      + '<a href="https://www.youtube.com/@dcc-mcp" target="_blank" rel="noopener">YouTube</a> &middot; '
      + '<a href="https://dcc-mcp.github.io/showcase/" target="_self">Showcase</a>',
    copyright: 'DCC-MCP',
  },
  editLink: {
    pattern: 'https://github.com/dcc-mcp/dcc-mcp.github.io/edit/main/docs/:path',
    text: 'Improve this page',
  },
  docFooter: { prev: 'Previous page', next: 'Next page' },
  lastUpdatedText: 'Last updated',
  outlineTitle: 'On this page',
}

const chineseTheme = {
  nav: [
    { text: '为什么选择 DCC-MCP', link: '/zh/why-dcc-mcp' },
    { text: '技能市场', link: '/zh/marketplace' },
    { text: '案例画廊', link: 'https://dcc-mcp.github.io/showcase/zh/', target: '_self' },
    {
      text: '资源',
      items: [
        { text: 'Agent 使用指南', link: '/zh/agents' },
        { text: '开发者', link: '/zh/developers' },
        { text: '项目目录', link: '/zh/ecosystem' },
        { text: '常见 AI + DCC 任务', link: '/zh/use-cases' },
        { text: '云 Agent 与 DCC-MCP', link: '/zh/cloud-agents' },
        { text: '适配器案例与提示词', link: '/zh/examples' },
        { text: 'Core 文档', link: 'https://dcc-mcp.github.io/dcc-mcp-core/zh/' },
        { text: 'CLI 参考', link: 'https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/cli-reference' },
        { text: 'Python API', link: 'https://dcc-mcp.github.io/dcc-mcp-core/api/models' },
        { text: '技能市场源码', link: 'https://github.com/dcc-mcp/marketplace' },
      ],
    },
  ],
  footer: {
    message: '用 AI Agent 和自动化工具连接创作软件。'
      + '<a href="https://github.com/dcc-mcp" target="_blank" rel="noopener">GitHub</a> &middot; '
      + '<a href="https://www.youtube.com/@dcc-mcp" target="_blank" rel="noopener">YouTube</a> &middot; '
      + '<a href="https://dcc-mcp.github.io/showcase/" target="_self">案例画廊</a>',
    copyright: 'DCC-MCP',
  },
  editLink: {
    pattern: 'https://github.com/dcc-mcp/dcc-mcp.github.io/edit/main/docs/:path',
    text: '改进此页面',
  },
  docFooter: { prev: '上一页', next: '下一页' },
  lastUpdatedText: '最后更新',
  outlineTitle: '本页内容',
  darkModeSwitchLabel: '外观',
  lightModeSwitchTitle: '切换到浅色主题',
  darkModeSwitchTitle: '切换到深色主题',
  langMenuLabel: '切换语言',
  sidebarMenuLabel: '菜单',
  returnToTopLabel: '返回顶部',
  skipToContentLabel: '跳到正文',
}

export default defineConfig({
  title: 'DCC-MCP',
  description,
  appearance: 'dark',
  cleanUrls: true,
  metaChunk: true,
  lastUpdated: true,
  srcExclude: ['public/**'],
  sitemap: {
    hostname: siteUrl,
    // Project Pages owns /showcase/. Keep legacy bridges out of discovery.
    transformItems: (items) => items.filter(({ url }) => !/(?:^|\/)showcase(?:\.html|\/|$)/.test(url)),
  },

  locales: {
    root: { label: 'English', lang: 'en', title: 'DCC-MCP', description, themeConfig: englishTheme },
    zh: { label: '简体中文', lang: 'zh-CN', title: 'DCC-MCP', description: zhDescription, link: '/zh/', themeConfig: chineseTheme },
    ...Object.fromEntries(addedLocales.map(locale => [locale, createLocale(locale)])),
  },

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
    ['meta', { name: 'theme-color', content: '#fcfcfc', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#151517', media: '(prefers-color-scheme: dark)' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/brand/dcc-mcp-logo.png' }],
    ['meta', { property: 'og:site_name', content: 'DCC-MCP' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: `${siteUrl}brand/social-card.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  transformPageData(pageData) {
    if (pageData.params?.title) pageData.title = pageData.params.title
    if (pageData.params?.description) pageData.description = pageData.params.description

    const relativePath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const locale = siteLocale(relativePath.split('/')[0])
    const prefix = localePrefix(locale)
    const route = prefix ? relativePath.slice(prefix.length) : relativePath
    const isCollectionBridge = route === 'showcase'
    const pageRoute = route === 'showcase/wwise' ? 'examples/wwise' : route
    const canonicalUrl = new URL(isCollectionBridge ? 'showcase/' : `${prefix}/${pageRoute}`, siteUrl).href
    const isHome = pageData.frontmatter.layout === 'home'
    if (isHome) pageData.title = homeTitle(locale)
    const title = isHome ? `DCC-MCP — ${pageData.title}` : `${pageData.title} | DCC-MCP`

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ...(!isCollectionBridge ? [
        ...siteLocales.map(language => ['link', {
          rel: 'alternate', hreflang: languageTag(language),
          href: new URL(`${localePrefix(language)}/${pageRoute}`, siteUrl).href,
        }]),
        ['link', { rel: 'alternate', hreflang: 'x-default', href: new URL(pageRoute, siteUrl).href }],
      ] : []),
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageData.description ?? siteDescription(locale) }],
      ['meta', { property: 'og:image:alt', content: 'DCC-MCP · ' + homeTitle(locale) }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:locale', content: locale === 'zh' ? 'zh_CN' : locale === 'en' ? 'en_US' : site[locale].og }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: pageData.description ?? siteDescription(locale) }],
    )

    if (!route) {
      pageData.frontmatter.head.push(
        ['script', { type: 'application/ld+json' }, JSON.stringify(homeStructuredData(locale))],
      )
    }

    if (route === 'cloud-agents') {
      pageData.frontmatter.head.push(
        ['script', { type: 'application/ld+json' }, JSON.stringify(cloudAgentPageStructuredData(
          locale,
          canonicalUrl,
          pageData.title,
          pageData.description ?? siteDescription(locale),
        ))],
      )
    }

    const controlSlug = route.match(/^control\/([^/]+)$/)?.[1]
    if (controlSlug) {
      const integration = dccIntegrations.find(({ slug }) => slug === controlSlug)
      if (!integration) throw new Error(`Unknown DCC control guide integration: ${controlSlug}`)
      pageData.frontmatter.head.push(
        ['script', { type: 'application/ld+json' }, JSON.stringify(controlPageStructuredData(
          integration,
          locale,
          canonicalUrl,
          pageData.params?.title ?? pageData.title,
          pageData.params?.description ?? pageData.description ?? siteDescription(locale),
        ))],
      )
    }
  },

  themeConfig: {
    logo: {
      light: '/brand/dcc-mcp-logo-admin-light.png',
      dark: '/brand/dcc-mcp-logo-admin-dark.png',
      alt: 'DCC-MCP',
    },
    siteTitle: 'DCC-MCP',
    darkModeSwitchLabel: 'Appearance / 外观',
    lightModeSwitchTitle: 'Switch to light / 切换到浅色主题',
    darkModeSwitchTitle: 'Switch to dark / 切换到深色主题',
    langMenuLabel: 'Language / 语言',
    sidebarMenuLabel: 'Menu / 菜单',
    returnToTopLabel: 'Return to top / 返回顶部',
    skipToContentLabel: 'Skip to content / 跳到正文',
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            // VitePress serializes this function for the browser. Keep the
            // tokenizer self-contained so the index and queries agree.
            tokenize: (text: string) => {
              const terms = text.split(/[\n\r\p{Z}\p{P}]+/u).filter(Boolean)
              if (!/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text) ||
                  typeof Intl.Segmenter !== 'function') return terms
              const lang = /[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text) ? 'ja' : 'zh'
              const words = new Intl.Segmenter(lang, { granularity: 'word' }).segment(text)
              return [...new Set([...terms, ...Array.from(words).filter(word => word.isWordLike).map(word => word.segment)])]
            },
          },
        },
        locales: {
          ...Object.fromEntries(addedLocales.map(locale => [locale, createSearchLocale(locale)])),
          zh: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果：',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '向上',
                  navigateDownKeyAriaLabel: '向下',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc',
                },
              },
            },
          },
        },
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dcc-mcp' },
      { icon: 'youtube', link: 'https://www.youtube.com/@dcc-mcp' },
      // Official X account is not open yet: { icon: 'x', link: 'https://x.com/dcc_mcp' },
    ],
  },
})
