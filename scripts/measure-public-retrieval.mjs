import { expectedApplications, expectedFixedQueries } from './geo-query-contract.mjs'
import { classifyRetrievalUrl, RetrievalUrlRejectedError } from './retrieval-url-contract.mjs'

const scope = process.argv.includes('--scope')
  ? process.argv[process.argv.indexOf('--scope') + 1]
  : 'all'
if (!['fixed', 'applications', 'all'].includes(scope)) {
  throw new Error('--scope must be fixed, applications, or all')
}
const planOnly = process.argv.includes('--plan')

const decodeXml = (value) => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')

const parseItems = (xml) => [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 10).map((match) => {
  const item = match[1]
  return {
    title: decodeXml(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ''),
    url: decodeXml(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? ''),
  }
})

const measure = async ({ query, locale, market, kind, application }) => {
  const common = {
    timestamp: new Date().toISOString(),
    provider: 'Microsoft Bing',
    engine: 'Bing Web Search RSS',
    locale,
    market,
    method: 'first qualifying DCC-MCP result in the top 10 RSS items',
    kind,
    application,
    query,
  }
  if (planOnly) return { ...common, planned: true }

  const url = new URL('https://www.bing.com/search')
  url.searchParams.set('format', 'rss')
  url.searchParams.set('q', query)
  url.searchParams.set('setlang', locale === 'en' ? 'en-US' : locale)
  url.searchParams.set('cc', market)
  const response = await fetch(url, { headers: { 'User-Agent': 'dcc-mcp-geo-baseline/1.0' } })
  if (!response.ok) throw new Error(`${query}: Bing returned HTTP ${response.status}`)
  const items = parseItems(await response.text())
  for (const [index, item] of items.entries()) {
    let classification
    try {
      classification = classifyRetrievalUrl(item.url, { kind, application, locale })
    } catch (error) {
      if (error instanceof RetrievalUrlRejectedError) continue
      throw error
    }
    if (classification.firstParty) {
      return { ...common, rank: index + 1, title: item.title, url: item.url, ...classification }
    }
  }
  return { ...common, rank: null, title: null, url: null, firstParty: false, canonical: false }
}

const records = []
if (scope === 'fixed' || scope === 'all') {
  for (const { query, locale, market } of expectedFixedQueries) {
    records.push(await measure({ query, locale, market, kind: 'fixed' }))
  }
}
if (scope === 'applications' || scope === 'all') {
  for (const application of expectedApplications) {
    const english = await measure({
      query: `how to control ${application} with AI`,
      locale: 'en',
      market: 'US',
      kind: 'application-control',
      application,
    })
    const chinese = await measure({
      query: `AI 怎么控制 ${application}`,
      locale: 'zh-CN',
      market: 'CN',
      kind: 'application-control',
      application,
    })
    records.push(english, chinese)
    if (!planOnly && (!english.firstParty || !chinese.firstParty)) {
      records.push(await measure({
        query: `"${application}" MCP "DCC-MCP"`,
        locale: 'en',
        market: 'US',
        kind: 'branded-diagnostic',
        application,
      }))
    }
  }
}

for (const record of records) process.stdout.write(`${JSON.stringify(record)}\n`)
