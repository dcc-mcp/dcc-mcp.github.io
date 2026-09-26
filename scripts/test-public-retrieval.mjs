import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { measure, measurements, parseRss } from './measure-public-retrieval.mjs'
import { expectedApplications, expectedFixedQueries } from './geo-query-contract.mjs'

const context = { query: '"DCC-MCP" & 中文', locale: 'zh-CN', market: 'CN', kind: 'fixed' }
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const item = (title, url) => `<item><title>${escapeXml(title)}</title><link>${escapeXml(url)}</link></item>`
const feed = (items, query = context.query, channelUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${escapeXml(query)} - Bing</title>
<link>${escapeXml(channelUrl)}</link>
<description>Search results</description>${items}</channel></rss>`
const thirdParty = item('Other documentation', 'https://example.org/guide?q=one&lang=en')
const firstParty = item('DCC-MCP', 'https://dcc-mcp.github.io/')
const fixture = (body, { status = 200, contentType = 'text/xml; charset=utf-8', responseUrl } = {}) => async (url, options) => {
  assert.equal(new URL(url).searchParams.get('q'), context.query)
  assert.equal(new URL(url).searchParams.get('setlang'), 'zh-CN')
  assert.equal(new URL(url).searchParams.get('cc'), 'CN')
  assert.ok(options.signal instanceof AbortSignal)
  const response = new Response(body, { status, headers: { 'content-type': contentType } })
  Object.defineProperty(response, 'url', { value: responseUrl ?? url })
  return response
}

const hitBody = feed(thirdParty + firstParty)
const hit = await measure(context, { fetchImpl: fixture(hitBody) })
assert.equal(hit.outcome, 'hit')
assert.equal(hit.measurementValid, true)
assert.equal(hit.rank, 2, 'rank is original RSS order, including preceding third-party results')
assert.equal(hit.firstParty, true)
assert.equal(hit.canonical, true)
assert.equal(hit.query, context.query, 'keep the exact input query')
assert.equal(hit.schemaVersion, 2)
assert.deepEqual(hit.queryBinding, { response: 'matched', feed: 'matched' })
assert.deepEqual(hit.parse, { status: 'valid', resultCount: 2, examinedCount: 2, invalidItemCount: 0 })
assert.equal(hit.results[0].url, 'https://example.org/guide?q=one&lang=en')
assert.equal(hit.response.bodyBytes, Buffer.byteLength(hitBody))
assert.equal(hit.response.bodySha256, createHash('sha256').update(hitBody).digest('hex'))
assert.equal(hit.relevance, 'not-assessed')
assert.match(hit.rankMeaning, /not verified web SERP rank/)

const noHit = await measure(context, { fetchImpl: fixture(feed(thirdParty)) })
assert.equal(noHit.outcome, 'no-hit')
assert.equal(noHit.measurementValid, true)
assert.equal(noHit.firstParty, false)
assert.equal(noHit.rank, null)
assert.equal(noHit.results.length, 1, 'a valid miss still retains observed result evidence')
assert.equal(noHit.relevance, 'not-assessed', 'a miss does not claim the response is relevant or the site unindexed')

const encodedQuery = encodeURIComponent(context.query)
for (const origin of ['http://www.bing.com', 'http://www.bing.com:80']) {
  for (const [items, outcome] of [[firstParty, 'hit'], [thirdParty, 'no-hit']]) {
    const channelUrl = `${origin}/search?q=${encodedQuery}`
    const record = await measure(context, { fetchImpl: fixture(feed(items, context.query, channelUrl)) })
    assert.equal(record.outcome, outcome, 'HTTP default-port feed metadata must retain valid observations')
    assert.equal(record.measurementValid, true)
    assert.deepEqual(record.queryBinding, { response: 'matched', feed: 'matched' })
    assert.equal(record.feed.url, channelUrl, 'feed metadata must retain its exact decoded URL')
    assert.ok(record.response.url.startsWith('https://'), 'actual retrieval remains HTTPS')
  }
}
for (const contentType of ['text/html; charset=utf-8', 'application/xhtml+xml']) {
  for (const [items, outcome] of [[firstParty, 'hit'], [thirdParty, 'no-hit']]) {
    const record = await measure(context, { fetchImpl: fixture(feed(items), { contentType }) })
    assert.equal(record.outcome, outcome, 'valid RSS must be parsed despite an incorrect HTML content type')
    assert.equal(record.response.contentType, contentType, 'preserve inaccurate headers as evidence')
  }
}

const cases = [
  ['empty body', '', {}, 'empty', 'empty-response'],
  ['empty feed', feed(''), {}, 'empty', 'empty-feed'],
  ['malformed XML', feed(firstParty).replace('</item>', '</items>'), {}, 'inconclusive', 'invalid-rss'],
  ['truncated XML', feed(firstParty).slice(0, -6), {}, 'inconclusive', 'invalid-rss'],
  ['mismatched declaration quotes', feed(firstParty).replace('version="1.0"', 'version="1.0\''), {}, 'inconclusive', 'invalid-rss'],
  ['invalid processing instruction', feed(firstParty).replace('Search results', '<??>'), {}, 'inconclusive', 'invalid-rss'],
  ['unexpected channel text', feed(firstParty).replace('<channel>', '<channel>Error response'), {}, 'inconclusive', 'invalid-rss'],
  ['multiple roots', feed(firstParty) + '<extra/>', {}, 'inconclusive', 'invalid-rss'],
  ['not RSS', '<root><item><title>DCC-MCP</title><link>https://dcc-mcp.github.io/</link></item></root>', {}, 'inconclusive', 'invalid-rss'],
  ['HTML challenge', '<!doctype html><html><body>Verify you are human</body></html>', { contentType: 'text/html' }, 'inconclusive', 'html-response'],
  ['HTML served as XML', '<html><body>Service unavailable</body></html>', {}, 'inconclusive', 'html-response'],
  ['HTML with XML declaration', '<?xml version="1.0"?><html><body>Service unavailable</body></html>', { contentType: 'text/html' }, 'inconclusive', 'invalid-rss'],
  ['HTTP error with valid-looking RSS', feed(firstParty), { status: 503 }, 'error', 'http-error'],
  ['HTTP error with undecodable body', Buffer.from([255]), { status: 503 }, 'error', 'http-error'],
  ['invalid item', feed('<item><title>Missing URL</title></item>' + firstParty), {}, 'inconclusive', 'invalid-rss-item'],
  ['unexpected item text', feed(firstParty.replace('<item>', '<item>Error response')), {}, 'inconclusive', 'invalid-rss-item'],
  ['whitespace-wrapped URL', feed(item('DCC-MCP', ' https://dcc-mcp.github.io/ ')), {}, 'inconclusive', 'invalid-rss-item'],
  ['entity-wrapped URL whitespace', feed(firstParty.replace('<link>https:', '<link>&#32;https:')), {}, 'inconclusive', 'invalid-rss-item'],
  ['CDATA-wrapped URL whitespace', feed('<item><title>DCC-MCP</title><link><![CDATA[ https://dcc-mcp.github.io/ ]]></link></item>'), {}, 'inconclusive', 'invalid-rss-item'],
  ['URL embedded tab', feed(item('DCC-MCP', 'https://dcc-\tmcp.github.io/')), {}, 'inconclusive', 'invalid-rss-item'],
  ['whitespace-only title', feed(item(' \n ', 'https://dcc-mcp.github.io/')), {}, 'inconclusive', 'invalid-rss-item'],
  ['duplicate item link', feed(firstParty.replace('</item>', '<link>https://example.org/</link></item>')), {}, 'inconclusive', 'invalid-rss-item'],
  ['invalid entity', feed(firstParty).replace('Search results', '&unknown;'), {}, 'inconclusive', 'invalid-rss'],
  ['raw ampersand', feed(firstParty).replace('Search results', 'Search & results'), {}, 'inconclusive', 'invalid-rss'],
  ['invalid numeric entity', feed(firstParty).replace('Search results', '&#0;'), {}, 'inconclusive', 'invalid-rss'],
  ['external entity declaration', '<!DOCTYPE rss [<!ENTITY external SYSTEM "file:///secret">]>' + feed(firstParty), {}, 'inconclusive', 'invalid-rss'],
  ['mismatched feed query', feed(firstParty, 'different query'), {}, 'inconclusive', 'query-binding-unverified'],
  ['missing feed query', feed(firstParty).replace(/<link>.*?<\/link>/, '<link>https://www.bing.com/search</link>'), {}, 'inconclusive', 'query-binding-unverified'],
  ['HTTP feed wrong host', feed(firstParty, context.query, `http://example.org/search?q=${encodedQuery}`), {}, 'inconclusive', 'query-binding-unverified'],
  ['HTTP feed wrong port', feed(firstParty, context.query, `http://www.bing.com:8080/search?q=${encodedQuery}`), {}, 'inconclusive', 'query-binding-unverified'],
  ['HTTP feed HTTPS port', feed(firstParty, context.query, `http://www.bing.com:443/search?q=${encodedQuery}`), {}, 'inconclusive', 'query-binding-unverified'],
  ['HTTP feed wrong path', feed(firstParty, context.query, `http://www.bing.com:80/other?q=${encodedQuery}`), {}, 'inconclusive', 'query-binding-unverified'],
  ['HTTP feed wrong query', feed(firstParty, context.query, 'http://www.bing.com:80/search?q=different'), {}, 'inconclusive', 'query-binding-unverified'],
  ['HTTP feed duplicate query', feed(firstParty, context.query, `http://www.bing.com:80/search?q=${encodedQuery}&q=${encodedQuery}`), {}, 'inconclusive', 'query-binding-unverified'],
  ['HTTP feed wrapped whitespace', feed(firstParty, context.query, ` http://www.bing.com:80/search?q=${encodedQuery} `), {}, 'inconclusive', 'query-binding-unverified'],
  ['HTTP response default port', feed(firstParty), { responseUrl: `http://www.bing.com:80/search?q=${encodedQuery}` }, 'inconclusive', 'query-binding-unverified'],
  ['HTTP response implicit port', feed(firstParty), { responseUrl: `http://www.bing.com/search?q=${encodedQuery}` }, 'inconclusive', 'query-binding-unverified'],
  ['redirect to other query', feed(firstParty), { responseUrl: 'https://www.bing.com/search?q=different' }, 'inconclusive', 'query-binding-unverified'],
  ['unexpected final source', feed(firstParty), { responseUrl: 'https://example.org/search' }, 'inconclusive', 'query-binding-unverified'],
  ['missing final source', feed(firstParty), { responseUrl: '' }, 'inconclusive', 'query-binding-unverified'],
  ['invalid UTF-8', Buffer.concat([Buffer.from(feed(firstParty).replace('DCC-MCP</title>', 'DCC-MCP')), Buffer.from([255])]), {}, 'inconclusive', 'invalid-encoding'],
]
for (const [label, body, options, outcome, reason] of cases) {
  const record = await measure(context, { fetchImpl: fixture(body, options) })
  assert.equal(record.outcome, outcome, label)
  assert.equal(record.reason, reason, label)
  assert.equal(record.measurementValid, false, label)
  assert.equal(record.rank, null, label)
  assert.equal(record.firstParty, null, `${label}: unavailable must not count as a miss`)
  assert.equal(record.canonical, null, label)
  assert.equal(record.query, context.query, label)
  assert.equal(record.response.status, options.status ?? 200, label)
  assert.match(record.response.bodySha256, /^[a-f0-9]{64}$/, label)
}

const xml = feed(`<item id="a &gt; b"><title>A &amp;lt; B &quot;Q&quot; &apos;P&apos; &#20013; &#x1F642;</title>
<link><![CDATA[https://example.org/?one=1&two=2]]></link><description><![CDATA[<b>Literal &amp;</b>]]></description></item>`)
const parsed = parseRss(xml)
assert.equal(parsed.items[0].title, 'A &lt; B "Q" \'P\' 中 🙂', 'entities decode exactly once, including numeric references')
assert.equal(parsed.items[0].url, 'https://example.org/?one=1&two=2', 'CDATA preserves literal link ampersands')
const numericLink = feed('<item><title>Encoded URL</title><link>https:&#47;&#x2F;dcc-mcp.github.io/</link></item>')
assert.equal((await measure(context, { fetchImpl: fixture(numericLink) })).outcome, 'hit')

const eleven = await measure(context, { fetchImpl: fixture(feed(thirdParty.repeat(10) + firstParty)) })
assert.equal(eleven.outcome, 'no-hit', 'do not fabricate a top-ten hit from position eleven')
assert.equal(eleven.parse.resultCount, 11)
assert.equal(eleven.parse.examinedCount, 10)
assert.equal(eleven.results.length, 10)
const longResult = await measure(context, { fetchImpl: fixture(feed(item('x'.repeat(5000), 'https://example.org/'))) })
assert.ok(longResult.results[0].title.length <= 641)
assert.ok(longResult.response.preview.length <= 769)
const large = await measure(context, { fetchImpl: fixture('x'.repeat(2 * 1024 * 1024 + 1)) })
assert.equal(large.outcome, 'error')
assert.match(large.error.message, /body exceeds/)

const networkFailure = await measure(context, { fetchImpl: async () => { throw new TypeError('network unavailable') } })
assert.equal(networkFailure.outcome, 'error')
assert.equal(networkFailure.reason, 'request-failed')
assert.equal(networkFailure.response, null)
assert.equal(networkFailure.parse.status, 'not-attempted')
assert.equal(networkFailure.firstParty, null)

let requestCount = 0
const sweep = []
for await (const record of measurements({ scope: 'fixed', fetchImpl: async (url) => {
  if (requestCount++ === 0) throw new TypeError('first request failed')
  const response = new Response(feed(firstParty, new URL(url).searchParams.get('q')))
  Object.defineProperty(response, 'url', { value: url })
  return response
} })) sweep.push(record)
assert.equal(sweep.length, expectedFixedQueries.length, 'one request failure must not erase or stop other query records')
assert.equal(sweep[0].outcome, 'error')
assert.ok(sweep.slice(1).every((record) => record.outcome === 'hit'))

const unavailableApplications = []
for await (const record of measurements({ scope: 'applications', fetchImpl: async () => { throw new TypeError('offline') } })) unavailableApplications.push(record)
assert.equal(unavailableApplications.length, expectedApplications.length * 2, 'unavailable observations must not trigger branded miss diagnostics')
assert.ok(unavailableApplications.every((record) => record.outcome === 'error'))
const plan = []
for await (const record of measurements({ scope: 'all', planOnly: true, fetchImpl: () => assert.fail('query planning must stay offline') })) plan.push(record)
assert.equal(plan.length, expectedFixedQueries.length + expectedApplications.length * 2)
assert.ok(plan.every((record) => record.planned && !('rank' in record)))

const script = new URL('./measure-public-retrieval.mjs', import.meta.url)
const cliFailure = spawnSync(process.execPath, ['--input-type=module', '--eval', `
  globalThis.fetch = async () => { throw new TypeError('offline fixture') }
  process.argv = [process.execPath, ${JSON.stringify(fileURLToPath(script))}, '--scope', 'fixed']
  await import(${JSON.stringify(script.href)})
`], { encoding: 'utf8' })
assert.equal(cliFailure.status, 1, 'CLI must signal unusable measurements after emitting all evidence')
const cliRecords = cliFailure.stdout.trim().split(/\r?\n/).map((line) => JSON.parse(line))
assert.equal(cliRecords.length, expectedFixedQueries.length)
assert.ok(cliRecords.every((record) => record.outcome === 'error'))
const missingScope = spawnSync(process.execPath, [fileURLToPath(script), '--scope'], { encoding: 'utf8' })
assert.equal(missingScope.status, 1)
assert.match(missingScope.stderr, /--scope requires/)
console.log('Public retrieval fixtures passed: outcomes, provenance, XML parsing, query binding, bounds, and failure isolation')
