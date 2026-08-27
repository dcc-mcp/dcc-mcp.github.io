import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const fixtureRoot = mkdtempSync(join(tmpdir(), 'dcc-mcp-site-validator-'))

try {
  cpSync(join(root, 'docs'), join(fixtureRoot, 'docs'), { recursive: true })
  mkdirSync(join(fixtureRoot, 'scripts'))
  for (const file of ['integration-catalog-reader.mjs', 'site-identity-contract.mjs', 'validate-site.mjs']) {
    cpSync(join(root, 'scripts', file), join(fixtureRoot, 'scripts', file))
  }

  const integrationPath = join(fixtureRoot, 'docs', '.vitepress', 'dcc-integrations.json')
  const catalog = JSON.parse(readFileSync(integrationPath, 'utf8'))
  const validateCatalogMutation = (mutated, expectedDiagnostics) => {
    assert.notDeepEqual(mutated, catalog, 'fixture mutation must change the integration catalog')
    writeFileSync(integrationPath, `${JSON.stringify(mutated, null, 2)}\n`)
    const result = spawnSync(process.execPath, [join(fixtureRoot, 'scripts', 'validate-site.mjs')], {
      encoding: 'utf8',
    })
    const output = `${result.stdout}\n${result.stderr}`
    assert.notEqual(result.status, 0, 'validator must reject a released-host mutation')
    for (const diagnostic of expectedDiagnostics) assert.match(output, diagnostic)
  }

  const mutateGuide = (name, changes) => catalog.map((guide) => (
    guide.name === name ? { ...guide, ...changes } : guide
  ))
  validateCatalogMutation(
    mutateGuide('Blender', { dccType: 'blender_typo' }),
    [/missing=\[blender\|.*dccType=blender/, /extra=\[blender\|.*dccType=blender_typo/],
  )
  validateCatalogMutation(
    mutateGuide('Blender', { dccType: 'maya' }),
    [/missing=\[blender\|.*dccType=blender/, /extra=\[blender\|.*dccType=maya/],
  )

  const cache = catalog.find(({ slug }) => slug === 'cache-inspector')
  assert.ok(cache, 'fixture must contain the Cache Inspector guide')
  validateCatalogMutation(
    mutateGuide('Cache Inspector', {
      name: 'Stale Inspector',
      repository: 'dcc-mcp-stale',
      marketplacePackage: 'stale-package',
    }),
    [/missing=.*cache-inspector/, /extra=.*Stale Inspector/],
  )
  validateCatalogMutation(
    catalog.filter(({ slug }) => slug !== 'cache-inspector'),
    [/missing=.*cache-inspector/],
  )
  validateCatalogMutation(
    [...catalog, {
      ...cache,
      slug: 'unrelated-guide',
      name: 'Unrelated Guide',
      repository: 'dcc-mcp-unrelated',
      marketplacePackage: 'unrelated-package',
    }],
    [/extra=\[[^\]]*unrelated-guide/],
  )
  validateCatalogMutation([...catalog, { ...cache }], [/duplicates=\[[^\]]*cache-inspector/])

  const reorderedExtra = {
    name: 'Reordered Extra',
    slug: 'reordered-extra',
    repository: 'dcc-mcp-reordered-extra',
    marketplacePackage: 'dcc-mcp-reordered-extra',
    summaryEn: cache.summaryEn,
    summaryZh: cache.summaryZh,
    tasksEn: cache.tasksEn,
    tasksZh: cache.tasksZh,
  }
  validateCatalogMutation([reorderedExtra, ...catalog], [/extra=\[[^\]]*reordered-extra/])
  const reorderedDuplicate = {
    name: cache.name,
    slug: cache.slug,
    repository: cache.repository,
    marketplacePackage: cache.marketplacePackage,
    summaryEn: cache.summaryEn,
    summaryZh: cache.summaryZh,
    tasksEn: cache.tasksEn,
    tasksZh: cache.tasksZh,
  }
  validateCatalogMutation([reorderedDuplicate, ...catalog], [/duplicates=\[[^\]]*cache-inspector/])
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true })
}
