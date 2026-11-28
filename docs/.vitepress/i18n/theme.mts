import { site, languageTag, type AddedLocale } from './locales'

export function createLocale(locale: AddedLocale) {
  const { label, description, nav, theme } = site[locale]
  const link = (text: string, path: string) => ({ text, link: `/${locale}/${path}` })
  const core = 'https://dcc-mcp.github.io/dcc-mcp-core/'
  return {
    label, lang: languageTag(locale), description, link: `/${locale}/`,
    themeConfig: {
      nav: [
        link(nav.why, 'why-dcc-mcp'), link(nav.market, 'marketplace'),
        { text: nav.showcase, link: 'https://dcc-mcp.github.io/showcase/', target: '_self' },
        { text: nav.resources, items: [
          link(nav.agents, 'agents'), link(nav.developers, 'developers'), link(nav.ecosystem, 'ecosystem'),
          link(nav.tasks, 'use-cases'), link(nav.cloud, 'cloud-agents'), link(nav.examples, 'examples'),
          { text: nav.core, link: core }, { text: nav.cli, link: core + 'guide/cli-reference' },
          { text: nav.python, link: core + 'api/models' }, { text: nav.marketSource, link: 'https://github.com/dcc-mcp/marketplace' },
        ] },
      ],
      editLink: { pattern: 'https://github.com/dcc-mcp/dcc-mcp.github.io/edit/main/docs/:path', text: theme.edit },
      docFooter: { prev: theme.prev, next: theme.next },
      lastUpdatedText: theme.updated, outline: { label: theme.outline },
      darkModeSwitchLabel: theme.appearance, lightModeSwitchTitle: theme.light, darkModeSwitchTitle: theme.dark,
      langMenuLabel: theme.language, sidebarMenuLabel: theme.menu, returnToTopLabel: theme.top, skipToContentLabel: theme.skip,
    },
  }
}

export function createSearchLocale(locale: AddedLocale) {
  const { search } = site[locale]
  return { translations: {
    button: { buttonText: search.button, buttonAriaLabel: search.aria },
    modal: {
      displayDetails: search.details, resetButtonTitle: search.reset, backButtonTitle: search.back, noResultsText: search.empty,
      footer: {
        selectText: search.select, selectKeyAriaLabel: 'Enter', navigateText: search.navigate,
        navigateUpKeyAriaLabel: search.up, navigateDownKeyAriaLabel: search.down, closeText: search.close, closeKeyAriaLabel: 'Esc',
      },
    },
  } }
}
