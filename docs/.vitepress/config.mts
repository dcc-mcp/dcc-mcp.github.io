import { defineConfig } from 'vitepress'

const siteUrl = 'https://dcc-mcp.github.io/'
const description = 'One Agent Skill and one CLI for creative software through a shared production control plane.'
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

export default defineConfig({
  title: 'DCC-MCP',
  description,
  appearance: 'dark',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: siteUrl },

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
    const canonicalUrl = new URL(pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, ''), siteUrl).href
    const title = pageData.frontmatter.layout === 'home'
      ? 'DCC-MCP — One control plane for creative software'
      : `${pageData.title} | DCC-MCP`

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageData.description ?? description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
    )
  },

  themeConfig: {
    logo: '/brand/dcc-mcp-logo-dark-transparent.webp',
    siteTitle: 'DCC-MCP',
    search: { provider: 'local' },
    nav: [
      { text: 'Marketplace', link: '/marketplace' },
      { text: 'For Agents', link: '/agents' },
      { text: 'For Developers', link: '/developers' },
      { text: 'Ecosystem', link: '/ecosystem' },
      {
        text: 'Reference',
        items: [
          { text: 'Core documentation', link: 'https://dcc-mcp.github.io/dcc-mcp-core/' },
          { text: 'CLI reference', link: 'https://dcc-mcp.github.io/dcc-mcp-core/guide/cli-reference' },
          { text: 'Python API', link: 'https://dcc-mcp.github.io/dcc-mcp-core/api/models' },
          { text: 'Marketplace source', link: 'https://github.com/dcc-mcp/marketplace' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dcc-mcp' },
    ],
    footer: {
      message: 'Open infrastructure for agent-driven creative software.',
      copyright: 'DCC-MCP',
    },
    editLink: {
      pattern: 'https://github.com/dcc-mcp/dcc-mcp.github.io/edit/main/docs/:path',
      text: 'Improve this page',
    },
  },
})
