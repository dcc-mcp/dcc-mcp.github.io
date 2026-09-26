import { createHash } from 'node:crypto'
import { pathToFileURL } from 'node:url'
import { expectedApplications, expectedFixedQueries } from './geo-query-contract.mjs'
import { classifyRetrievalUrl, RetrievalUrlRejectedError } from './retrieval-url-contract.mjs'

const resultLimit = 10
const bodyLimit = 2 * 1024 * 1024
const bounded = (value, limit = 640) => value.length > limit ? `${value.slice(0, limit)}…` : value
const failXml = (message) => { throw new Error(message) }
const xmlCharacter = (code) => code === 9 || code === 10 || code === 13
  || (code >= 0x20 && code <= 0xd7ff) || (code >= 0xe000 && code <= 0xfffd)
  || (code >= 0x10000 && code <= 0x10ffff)

const decodeXml = (value) => value.replace(/&(#(?:[0-9]+|x[0-9a-fA-F]+)|amp|quot|apos|lt|gt);|&/g, (entity, name) => {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }
  if (Object.hasOwn(named, name)) return named[name]
  if (/^#(?:[0-9]+|x[0-9a-fA-F]+)$/.test(name ?? '')) {
    const code = name[1] === 'x' ? Number.parseInt(name.slice(2), 16) : Number(name.slice(1))
    if (xmlCharacter(code)) return String.fromCodePoint(code)
  }
  return failXml('invalid XML entity')
})

// A small, strict XML reader for RSS. Unsupported declarations (including DTDs
// and external entities) fail closed instead of becoming an empty result set.
const parseXml = (source) => {
  for (const character of source) if (!xmlCharacter(character.codePointAt(0))) failXml('invalid XML character')
  const document = { name: '#document', children: [], text: '' }
  const stack = [document]
  const tokens = /<!--(?:(?!-->)[\s\S])*-->|<!\[CDATA\[[\s\S]*?\]\]>|<\?[\s\S]*?\?>|<\/?[A-Za-z_][\w:.-]*(?:[^<>"']|"[^"<]*"|'[^'<]*')*>|[^<]+/gy
  let offset = 0
  while (offset < source.length) {
    tokens.lastIndex = offset
    const token = tokens.exec(source)?.[0]
    if (!token) failXml('invalid or unsupported XML markup')
    offset = tokens.lastIndex
    const current = stack.at(-1)
    if (token.startsWith('<!--')) {
      if (token.slice(4, -3).includes('--') || token.slice(4, -3).endsWith('-')) failXml('invalid XML comment')
    } else if (token.startsWith('<![CDATA[')) {
      if (stack.length === 1) failXml('CDATA outside XML root')
      current.text += token.slice(9, -3)
    } else if (token.startsWith('<?')) {
      if (!/^<\?[A-Za-z_][\w:.-]*(?:\s[\s\S]*?)?\?>$/.test(token)) failXml('invalid XML processing instruction')
      if (/^<\?xml(?:\s|\?)/i.test(token) && (offset !== token.length || !/^<\?xml\s+version=(["'])1\.0\1(?:\s+encoding=(["'])[Uu][Tt][Ff]-8\2)?(?:\s+standalone=(["'])(?:yes|no)\3)?\s*\?>$/.test(token))) failXml('unsupported XML declaration')
    } else if (token.startsWith('</')) {
      const closing = /^<\/([A-Za-z_][\w:.-]*)\s*>$/.exec(token)?.[1]
      if (stack.length === 1 || closing !== current.name) failXml('mismatched XML closing tag')
      stack.pop()
    } else if (token.startsWith('<')) {
      const [, name, rawAttributes] = /^<([A-Za-z_][\w:.-]*)([\s\S]*?)\/?\s*>$/.exec(token) ?? []
      if (!name) failXml('invalid XML opening tag')
      const attributes = new Set()
      let remaining = rawAttributes
      while (remaining.trim()) {
        const attribute = /^\s+([A-Za-z_][\w:.-]*)\s*=\s*(?:"([^"<]*)"|'([^'<]*)')/.exec(remaining)
        if (!attribute || attributes.has(attribute[1])) failXml('invalid XML attributes')
        attributes.add(attribute[1])
        decodeXml(attribute[2] ?? attribute[3])
        remaining = remaining.slice(attribute[0].length)
      }
      const node = { name, children: [], text: '' }
      current.children.push(node)
      if (!token.endsWith('/>')) stack.push(node)
      if (stack.length > 128) failXml('XML nesting limit exceeded')
    } else {
      if (token.includes(']]>')) failXml('invalid XML text')
      current.text += decodeXml(token)
    }
  }
  if (stack.length !== 1 || document.children.length !== 1 || document.text.trim()) failXml('incomplete XML document')
  return document.children[0]
}

const childText = (node, name) => {
  const matches = node.children.filter((child) => child.name === name)
  if (matches.length !== 1 || matches[0].children.length) throw new Error(`expected one text-only ${name}`)
  return matches[0].text
}

export const parseRss = (source) => {
  const root = parseXml(source.replace(/^\uFEFF/, ''))
  const channels = root.children.filter((node) => node.name === 'channel')
  if (root.name !== 'rss' || channels.length !== 1 || root.children.length !== 1 || root.text.trim()) throw new Error('expected RSS with one channel')
  const channel = channels[0]
  if (channel.text.trim()) throw new Error('unexpected RSS channel text')
  const feed = { title: childText(channel, 'title'), url: childText(channel, 'link'), description: childText(channel, 'description') }
  const nodes = channel.children.filter((node) => node.name === 'item')
  const items = nodes.slice(0, resultLimit).map((node, index) => {
    try {
      if (node.text.trim()) throw new Error('unexpected RSS item text')
      const title = childText(node, 'title').trim()
      const url = childText(node, 'link')
      // Preserve decoded source URLs: normalizing them here could bypass the
      // strict first-party URL contract or turn a malformed item into a miss.
      if (url !== url.trim() || /[\u0000-\u0020\u007f]/.test(url)) throw new Error('invalid result URL whitespace')
      const parsed = new URL(url)
      if (!title || !['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password || url.length > 4096) throw new Error('invalid result title or URL')
      return { position: index + 1, title, url, valid: true }
    } catch (error) {
      return { position: index + 1, valid: false, reason: error.message }
    }
  })
  return { feed, items, resultCount: nodes.length }
}

const requestUrl = ({ query, locale, market }) => {
  const url = new URL('https://www.bing.com/search')
  url.searchParams.set('format', 'rss')
  url.searchParams.set('q', query)
  url.searchParams.set('setlang', locale === 'en' ? 'en-US' : locale)
  url.searchParams.set('cc', market)
  return url.href
}

const queryBinding = (url, query) => {
  try {
    if (url !== url.trim() || /[\u0000-\u0020\u007f]/.test(url)) return 'mismatch'
    const parsed = new URL(url)
    if (parsed.origin !== 'https://www.bing.com' || parsed.pathname !== '/search') return 'mismatch'
    const queries = parsed.searchParams.getAll('q')
    if (!queries.length) return 'unavailable'
    return queries.length === 1 && queries[0] === query ? 'matched' : 'mismatch'
  } catch {
    return 'unavailable'
  }
}

const readBody = async (response) => {
  const chunks = []
  let bytes = 0
  for await (const chunk of response.body ?? []) {
    bytes += chunk.length
    if (bytes > bodyLimit) throw new Error('response body exceeds 2 MiB limit')
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

export const measure = async (context, { planOnly = false, fetchImpl = fetch } = {}) => {
  const { query, locale, market, kind, application } = context
  const common = {
    schemaVersion: 2,
    timestamp: new Date().toISOString(),
    provider: 'Microsoft Bing',
    engine: 'Bing Web Search RSS',
    locale, market, kind, application, query,
    method: 'first qualifying DCC-MCP result in the top 10 RSS items',
    rankMeaning: 'RSS item order; not verified web SERP rank',
    relevance: 'not-assessed',
    requestUrl: requestUrl(context),
  }
  if (planOnly) return { ...common, planned: true }
  const record = {
    ...common,
    outcome: 'error',
    measurementValid: false,
    rank: null, title: null, url: null, firstParty: null, canonical: null,
    response: null,
    parse: { status: 'not-attempted', resultCount: null, examinedCount: 0, invalidItemCount: 0 },
    results: [],
  }
  let response
  let body
  try {
    response = await fetchImpl(common.requestUrl, {
      headers: { 'User-Agent': 'dcc-mcp-geo-baseline/2.0' },
      signal: AbortSignal.timeout(15000),
    })
    record.response = { status: response.status, url: response.url || null, redirected: response.redirected, contentType: response.headers.get('content-type') }
    body = await readBody(response)
  } catch (error) {
    return { ...record, reason: 'request-failed', error: { name: error.name, message: bounded(error.message, 240) } }
  }
  record.response.bodyBytes = body.length
  record.response.bodySha256 = createHash('sha256').update(body).digest('hex')
  record.response.preview = bounded(body.toString('utf8', 0, 3072), 768)
  if (!response.ok) return { ...record, reason: 'http-error' }
  let text
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(body)
  } catch {
    return { ...record, outcome: 'inconclusive', reason: 'invalid-encoding' }
  }
  if (!text.trim()) return { ...record, outcome: 'empty', reason: 'empty-response' }
  if (/\b(?:text\/html|application\/xhtml\+xml)\b/i.test(record.response.contentType ?? '') || /^\s*(?:<!doctype\s+html\b|<html\b)/i.test(text)) {
    return { ...record, outcome: 'inconclusive', reason: 'html-response', parse: { ...record.parse, status: 'invalid' } }
  }
  let parsed
  try {
    parsed = parseRss(text)
  } catch (error) {
    return { ...record, outcome: 'inconclusive', reason: 'invalid-rss', parse: { ...record.parse, status: 'invalid', message: error.message } }
  }
  record.parse = { status: 'valid', resultCount: parsed.resultCount, examinedCount: parsed.items.length, invalidItemCount: parsed.items.filter((item) => !item.valid).length }
  record.feed = { title: bounded(parsed.feed.title), url: bounded(parsed.feed.url, 4096), description: bounded(parsed.feed.description) }
  record.queryBinding = { response: queryBinding(response.url, query), feed: queryBinding(parsed.feed.url, query) }
  record.results = parsed.items.map((item) => ({ ...item, ...(item.valid ? { title: bounded(item.title) } : {}) }))
  if (Object.values(record.queryBinding).some((binding) => binding !== 'matched')) {
    return { ...record, outcome: 'inconclusive', reason: 'query-binding-unverified' }
  }
  if (record.parse.invalidItemCount) return { ...record, outcome: 'inconclusive', reason: 'invalid-rss-item' }
  if (!parsed.items.length) return { ...record, outcome: 'empty', reason: 'empty-feed' }
  // Validity applies to this query-bound RSS observation only. Content relevance
  // and search-engine indexing are not inferred from a structural parse or miss.
  record.measurementValid = true
  for (const item of parsed.items) {
    try {
      const classification = classifyRetrievalUrl(item.url, context)
      if (classification.firstParty) return { ...record, outcome: 'hit', rank: item.position, title: bounded(item.title), url: item.url, ...classification }
    } catch (error) {
      if (!(error instanceof RetrievalUrlRejectedError)) throw error
    }
  }
  return { ...record, outcome: 'no-hit', firstParty: false, canonical: false }
}

export async function* measurements({ scope = 'all', planOnly = false, fetchImpl = fetch } = {}) {
  if (!['fixed', 'applications', 'all'].includes(scope)) throw new Error('--scope must be fixed, applications, or all')
  const options = { planOnly, fetchImpl }
  if (scope === 'fixed' || scope === 'all') {
    for (const context of expectedFixedQueries) yield await measure({ ...context, kind: 'fixed' }, options)
  }
  if (scope === 'applications' || scope === 'all') {
    for (const application of expectedApplications) {
      const english = await measure({ query: `how to control ${application} with AI`, locale: 'en', market: 'US', kind: 'application-control', application }, options)
      yield english
      const chinese = await measure({ query: `AI 怎么控制 ${application}`, locale: 'zh-CN', market: 'CN', kind: 'application-control', application }, options)
      yield chinese
      if (!planOnly && [english, chinese].some((record) => record.outcome === 'no-hit')) {
        yield await measure({ query: `"${application}" MCP "DCC-MCP"`, locale: 'en', market: 'US', kind: 'branded-diagnostic', application }, options)
      }
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const scope = process.argv.includes('--scope') ? process.argv[process.argv.indexOf('--scope') + 1] : 'all'
  if (!scope) throw new Error('--scope requires fixed, applications, or all')
  for await (const record of measurements({ scope, planOnly: process.argv.includes('--plan') })) {
    process.stdout.write(`${JSON.stringify(record)}\n`)
    if (!record.planned && !record.measurementValid) process.exitCode = 1
  }
}
