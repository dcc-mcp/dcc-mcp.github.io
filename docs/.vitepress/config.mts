import { defineConfig } from 'vitepress'

const siteUrl = 'https://dcc-mcp.github.io/'
const description = 'Gateway, typed CLI, MCP, REST, adapters, and Skills for creative applications.'
const zhDescription = '连接创意应用的 Gateway、类型化 CLI、MCP、REST、适配器与 Skills。'
const integrations = [
  ['3ds Max', 'dcc-mcp-3dsmax'],
  ['After Effects', 'dcc-mcp-aftereffects'],
  ['Blender', 'dcc-mcp-blender'],
  ['Godot', 'dcc-mcp-godot'],
  ['Houdini', 'dcc-mcp-houdini'],
  ['Katana', 'dcc-mcp-katana'],
  ['Maya', 'dcc-mcp-maya'],
  ['MotionBuilder', 'dcc-mcp-mobu'],
  ['Nuke', 'dcc-mcp-nuke'],
  ['OpenUSD', 'dcc-mcp-openusd'],
  ['Photoshop', 'dcc-mcp-photoshop'],
  ['Premiere Pro', 'dcc-mcp-premiere'],
  ['RenderDoc', 'dcc-mcp-renderdoc'],
  ['Flow Production Tracking', 'dcc-mcp-fpt'],
  ['Substance 3D Designer', 'dcc-mcp-substance3d-designer'],
  ['Substance 3D Painter', 'dcc-mcp-substance3d-painter'],
  ['Unity', 'dcc-mcp-unity'],
  ['Unreal Engine', 'dcc-mcp-unreal'],
  ['ZBrush', 'dcc-mcp-zbrush'],
]

const englishTheme = {
  nav: [
    { text: 'Why DCC-MCP', link: '/why-dcc-mcp' },
    { text: 'Marketplace', link: '/marketplace' },
    { text: 'Showcase', link: '/showcase' },
    { text: 'For Agents', link: '/agents' },
    { text: 'For Developers', link: '/developers' },
    { text: 'Ecosystem', link: '/ecosystem' },
    {
      text: 'Reference',
      items: [
        { text: 'Common AI + DCC tasks', link: '/use-cases' },
        { text: 'Core documentation', link: 'https://dcc-mcp.github.io/dcc-mcp-core/' },
        { text: 'CLI reference', link: 'https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference' },
        { text: 'Python API', link: 'https://dcc-mcp.github.io/dcc-mcp-core/api/models' },
        { text: 'Marketplace source', link: 'https://github.com/dcc-mcp/marketplace' },
      ],
    },
  ],
  footer: {
    message: 'Gateway, CLI, adapters, and Skills for creative applications.',
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
    { text: '为什么是 DCC-MCP', link: '/zh/why-dcc-mcp' },
    { text: '技能市场', link: '/zh/marketplace' },
    { text: '案例画廊', link: '/zh/showcase' },
    { text: 'Agent 使用', link: '/zh/agents' },
    { text: '开发者', link: '/zh/developers' },
    { text: '生态目录', link: '/zh/ecosystem' },
    {
      text: '参考资料',
      items: [
        { text: '常见 AI + DCC 任务', link: '/zh/use-cases' },
        { text: 'Core 文档', link: 'https://dcc-mcp.github.io/dcc-mcp-core/zh/' },
        { text: 'CLI 参考', link: 'https://dcc-mcp.github.io/dcc-mcp-core/zh/guide/cli-reference' },
        { text: 'Python API', link: 'https://dcc-mcp.github.io/dcc-mcp-core/api/models' },
        { text: 'Marketplace 源目录', link: 'https://github.com/dcc-mcp/marketplace' },
      ],
    },
  ],
  footer: {
    message: '连接创意应用的 Gateway、CLI、适配器与 Skills。',
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
  lastUpdated: true,
  sitemap: { hostname: siteUrl },

  locales: {
    root: { label: 'English', lang: 'en', title: 'DCC-MCP', description, themeConfig: englishTheme },
    zh: { label: '简体中文', lang: 'zh-CN', title: 'DCC-MCP', description: zhDescription, link: '/zh/', themeConfig: chineseTheme },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/brand/dcc-mcp-logo.png' }],
    ['meta', { property: 'og:site_name', content: 'DCC-MCP' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: `${siteUrl}brand/social-card.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'DCC-MCP',
          url: siteUrl,
          logo: `${siteUrl}brand/dcc-mcp-logo.png`,
          sameAs: [
            'https://github.com/dcc-mcp',
            'https://clawhub.ai/loonghao/skills/dcc-mcp',
          ],
        },
        {
          '@type': 'WebSite',
          name: 'DCC-MCP',
          url: siteUrl,
          description,
          inLanguage: ['en', 'zh-CN'],
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}marketplace?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'DCC-MCP',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Windows, macOS, Linux',
          url: siteUrl,
          description,
        },
        {
          '@type': 'ItemList',
          name: 'DCC-MCP integrated creative applications',
          numberOfItems: integrations.length,
          itemListElement: integrations.map(([name, repository], index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name,
            url: `https://github.com/dcc-mcp/${repository}`,
          })),
        },
      ],
    })],
  ],

  transformPageData(pageData) {
    const relativePath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = new URL(relativePath, siteUrl).href
    const isZh = pageData.relativePath.startsWith('zh/')
    const englishPath = relativePath.replace(/^zh\//, '')
    const chinesePath = isZh ? relativePath : `zh/${relativePath}`
    const title = pageData.frontmatter.layout === 'home'
        ? (isZh ? 'DCC-MCP — 创意应用控制平面' : 'DCC-MCP — Creative application control plane')
      : `${pageData.title} | DCC-MCP`

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['link', { rel: 'alternate', hreflang: 'en', href: new URL(englishPath, siteUrl).href }],
      ['link', { rel: 'alternate', hreflang: 'zh-CN', href: new URL(chinesePath, siteUrl).href }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: new URL(englishPath, siteUrl).href }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageData.description ?? (isZh ? zhDescription : description) }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:locale', content: isZh ? 'zh_CN' : 'en_US' }],
    )
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
        locales: {
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
    ],
  },
})
