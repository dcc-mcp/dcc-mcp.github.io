import site from './site.json'

export { site }
export type AddedLocale = keyof typeof site
export type SiteLocale = 'en' | 'zh' | AddedLocale
export const addedLocales = Object.keys(site) as AddedLocale[]
export const siteLocales: SiteLocale[] = ['en', 'zh', ...addedLocales]

export function siteLocale(lang: string): SiteLocale {
  const code = lang.split('-')[0]
  return siteLocales.find(locale => locale === code) ?? 'en'
}

export const languageTag = (locale: SiteLocale) => locale === 'en' ? 'en' : locale === 'zh' ? 'zh-CN' : site[locale].lang
export const localePrefix = (locale: SiteLocale) => locale === 'en' ? '' : '/' + locale
export const mediaLocale = (locale: SiteLocale) => locale === 'zh' ? 'zh' : 'en'

export function formatMessage(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (token, key) => String(values[key] ?? token))
}
