import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { classifyRetrievalUrl } from './retrieval-url-contract.mjs'
import { expectedGuideIdentities } from './site-identity-contract.mjs'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const expectedFixedQueries = [
  ['"DCC-MCP"', 'en', 'US'],
  ['"What is DCC-MCP"', 'en', 'US'],
  ['"DCC-MCP 是什么"', 'zh-CN', 'CN'],
  ['"Why DCC-MCP"', 'en', 'US'],
  ['AI agent control Maya Blender Houdini typed tools gateway MCP', 'en', 'US'],
  ['use AI to control Maya typed tools MCP', 'en', 'US'],
  ['用 AI 控制 Maya MCP 类型化工具', 'zh-CN', 'CN'],
  ['"How do I create ten random spheres in Maya?"', 'en', 'US'],
  ['"DCC-MCP Marketplace"', 'en', 'US'],
  ['"dcc-lookdev-turntable"', 'en', 'US'],
  ['"dcc-mcp-maya-procedural-architecture"', 'en', 'US'],
  ['"DCC-MCP" Wwise Marmoset Showcase', 'en', 'US'],
]
const expectedApplications = [
  ...expectedGuideIdentities.map(({ name }) => name),
  'Tuanjie / 团结',
]
const expectedRecords = [
  ...expectedFixedQueries.map(([query, locale, market]) => ({
    query, locale, market, kind: 'fixed', application: null,
  })),
  ...expectedApplications.flatMap((application) => [
    { query: `how to control ${application} with AI`, locale: 'en', market: 'US', kind: 'application-control', application },
    { query: `AI 怎么控制 ${application}`, locale: 'zh-CN', market: 'CN', kind: 'application-control', application },
  ]),
]
const tupleKey = ({ query, locale, market, kind, application }) => (
  `${kind}|${locale}|${market}|${application ?? '-'}|${query}`
)
const compareExactInventory = (actualRecords, expectedInventory, label) => {
  const actual = actualRecords.map(tupleKey).sort()
  const expected = expectedInventory.map(tupleKey).sort()
  const duplicates = actual.filter((key, index) => index > 0 && key === actual[index - 1])
  const actualSet = new Set(actual)
  const expectedSet = new Set(expected)
  const missing = expected.filter((key) => !actualSet.has(key))
  const extra = [...actualSet].filter((key) => !expectedSet.has(key)).sort()
  assert.ok(
    !duplicates.length && !missing.length && !extra.length,
    `${label} inventory mismatch: duplicates=[${[...new Set(duplicates)].join(';')}] missing=[${missing.join(';')}] extra=[${extra.join(';')}]`,
  )
}

const fixedContext = { kind: 'fixed', application: null, locale: 'en' }
const maxContext = { kind: 'application-control', application: '3ds Max', locale: 'en' }
assert.deepEqual(classifyRetrievalUrl('https://dcc-mcp.github.io/', fixedContext), {
  accepted: true,
  firstParty: true,
  canonical: true,
})
assert.deepEqual(classifyRetrievalUrl('https://dcc-mcp.github.io/control/3ds-max', maxContext), {
  accepted: true,
  firstParty: true,
  canonical: true,
})
assert.deepEqual(classifyRetrievalUrl('https://github.com/dcc-mcp/dcc-mcp-3dsmax', maxContext), {
  accepted: true,
  firstParty: true,
  canonical: false,
})
assert.deepEqual(classifyRetrievalUrl('https://pypi.org/project/dcc-mcp-3dsmax', maxContext), {
  accepted: true,
  firstParty: true,
  canonical: false,
})

const plan = spawnSync(
  process.execPath,
  [join(root, 'scripts', 'measure-public-retrieval.mjs'), '--scope', 'all', '--plan'],
  { encoding: 'utf8' },
)
assert.equal(plan.status, 0, plan.stderr)
const records = plan.stdout.trim().split(/\r?\n/).map((line) => JSON.parse(line))
for (const record of records) {
  assert.equal(record.provider, 'Microsoft Bing')
  assert.equal(record.engine, 'Bing Web Search RSS')
  assert.equal(record.method, 'first qualifying DCC-MCP result in the top 10 RSS items')
  assert.equal(record.planned, true)
  assert.ok(!Number.isNaN(Date.parse(record.timestamp)), `invalid timestamp for ${record.query}`)
}
compareExactInventory(records, expectedRecords, 'GEO query')

const actualApplications = new Set(records.flatMap(({ kind, application }) => (
  kind === 'application-control' ? [application] : []
)))
assert.equal(actualApplications.size, expectedGuideIdentities.length + 1)
for (const { name } of expectedGuideIdentities) {
  assert.ok(actualApplications.has(name), `application matrix is missing frozen guide: ${name}`)
}
assert.ok(actualApplications.has('Tuanjie / 团结'), 'application matrix is missing the Unity-owned Tuanjie alias')
assert.ok(actualApplications.has('Unity'), 'Tuanjie alias must reconcile to the frozen Unity guide')

const baseline = readFileSync(
  join(root, '.github', 'geo-baselines', '2026-08-27-public-retrieval.md'),
  'utf8',
)
const observedRows = baseline.split(/\r?\n/)
  .filter((line) => line.includes('| Microsoft Bing | Bing Web Search RSS |'))
  .map((line) => {
    const cells = line.slice(1, -1).split('|').map((cell) => cell.trim())
    const numbered = /^\d+$/.test(cells[0])
    const [provider, engine, locale, codedQuery, rank, title, url, firstParty, canonical] = numbered
      ? cells.slice(1)
      : cells
    const query = codedQuery.startsWith('`') && codedQuery.endsWith('`')
      ? codedQuery.slice(1, -1)
      : codedQuery
    const expected = expectedRecords.find((record) => record.query === query && record.locale === locale)
    assert.ok(expected, `baseline contains unexpected query/locale: ${locale} ${query}`)
    assert.equal(provider, 'Microsoft Bing')
    assert.equal(engine, 'Bing Web Search RSS')
    assert.match(firstParty, /^(true|false)$/)
    assert.match(canonical, /^(true|false)$/)
    if (rank === 'NO_HIT') {
      assert.equal(title, '—', `NO_HIT requires empty title and URL: ${query}`)
      assert.equal(url, '—', `NO_HIT requires empty title and URL: ${query}`)
      assert.equal(firstParty, 'false', `NO_HIT cannot be first-party: ${query}`)
      assert.equal(canonical, 'false', `NO_HIT cannot be canonical: ${query}`)
    } else {
      assert.match(rank, /^(?:[1-9]|10)$/, `rank must be NO_HIT or 1-10: ${query}`)
      assert.notEqual(title, '—', `rank ${rank} requires a title and URL: ${query}`)
      assert.notEqual(url, '—', `rank ${rank} requires a title and URL: ${query}`)
      const expectedClassification = classifyRetrievalUrl(url, expected)
      assert.equal(expectedClassification.accepted, true, `ranked URL was not accepted: ${query}`)
      const recordedClassification = {
        firstParty: firstParty === 'true',
        canonical: canonical === 'true',
      }
      assert.deepEqual(
        recordedClassification,
        {
          firstParty: expectedClassification.firstParty,
          canonical: expectedClassification.canonical,
        },
        `URL classification mismatch for ${query}: expected firstParty=${expectedClassification.firstParty} canonical=${expectedClassification.canonical}; recorded firstParty=${recordedClassification.firstParty} canonical=${recordedClassification.canonical}`,
      )
      assert.equal(firstParty, 'true', `ranked qualifying result must be first-party: ${query}`)
      if (canonical === 'true') assert.equal(firstParty, 'true')
    }
    return expected
  })
compareExactInventory(observedRows, expectedRecords, 'Recorded baseline')

for (const date of ['2026-08-28', '2026-09-04', '2026-09-11', '2026-09-27']) {
  assert.ok(baseline.includes(date), `baseline is missing immutable retest date: ${date}`)
}
assert.match(baseline, /No ranking outcome is promised/)
assert.match(baseline, /node scripts\/measure-public-retrieval\.mjs --scope all/)
