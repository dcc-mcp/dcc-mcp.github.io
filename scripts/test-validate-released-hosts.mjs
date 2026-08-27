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

  const integrationPath = join(fixtureRoot, 'docs', '.vitepress', 'dcc-integrations.mts')
  const source = readFileSync(integrationPath, 'utf8')
  const validateSourceMutation = (mutated, expectedDiagnostics) => {
    assert.notEqual(mutated, source, 'fixture mutation must change the integration catalog')
    writeFileSync(integrationPath, mutated)

    const result = spawnSync(process.execPath, [join(fixtureRoot, 'scripts', 'validate-site.mjs')], {
      encoding: 'utf8',
    })
    const output = `${result.stdout}\n${result.stderr}`
    assert.notEqual(result.status, 0, 'validator must reject a released-host mutation')
    for (const diagnostic of expectedDiagnostics) assert.match(output, diagnostic)
  }

  validateSourceMutation(
    source.replace("dccType: 'blender',", "dccType: 'blender_typo',"),
    [/missing=\[blender\|.*dccType=blender/, /extra=\[blender\|.*dccType=blender_typo/],
  )
  validateSourceMutation(
    source.replace("dccType: 'blender',", "dccType: 'maya',"),
    [/missing=\[blender\|.*dccType=blender/, /extra=\[blender\|.*dccType=maya/],
  )

  const cacheBlock = source.match(/  \{\r?\n    slug: 'cache-inspector',[\s\S]*?\r?\n  \},\r?\n/)?.[0]
  assert.ok(cacheBlock, 'fixture must contain the Cache Inspector guide')
  const listEnd = /\r?\n]\r?\n\r?\nexport const releasedIntegrations/
  validateSourceMutation(
    source.replace(cacheBlock, cacheBlock
      .replace("name: 'Cache Inspector'", "name: 'Stale Inspector'")
      .replace(/repository: '[^']+'/, "repository: 'dcc-mcp-stale'")
      .replace(/marketplacePackage: '[^']+'/, "marketplacePackage: 'stale-package'")),
    [/missing=.*cache-inspector/, /extra=.*Stale Inspector/],
  )
  validateSourceMutation(source.replace(cacheBlock, ''), [/missing=.*cache-inspector/])
  validateSourceMutation(
    source.replace(listEnd, `${cacheBlock
      .replace("slug: 'cache-inspector'", "slug: 'unrelated-guide'")
      .replace("name: 'Cache Inspector'", "name: 'Unrelated Guide'")
      .replace(/repository: '[^']+'/, "repository: 'dcc-mcp-unrelated'")
      .replace(/marketplacePackage: '[^']+'/, "marketplacePackage: 'unrelated-package'")}\n]\n\nexport const releasedIntegrations`),
    [/extra=.*unrelated-guide/],
  )
  validateSourceMutation(
    source.replace(listEnd, `${cacheBlock}\n]\n\nexport const releasedIntegrations`),
    [/duplicates=.*cache-inspector/],
  )

  const reorderedCacheBlock = cacheBlock.replace(
    /    slug: 'cache-inspector',\r?\n    name: 'Cache Inspector',/,
    "    name: 'Cache Inspector',\n    slug: 'cache-inspector',",
  )
  assert.notEqual(reorderedCacheBlock, cacheBlock, 'fixture must reorder Cache Inspector identity fields')
  const listStart = /export const dccIntegrations: DccIntegration\[\] = \[\r?\n/
  validateSourceMutation(
    source.replace(listStart, (match) => `${match}${reorderedCacheBlock
      .replace("slug: 'cache-inspector'", "slug: 'reordered-extra'")
      .replace("name: 'Cache Inspector'", "name: 'Reordered Extra'")
      .replace(/repository: '[^']+'/, "repository: 'dcc-mcp-reordered-extra'")
      .replace(/marketplacePackage: '[^']+'/, "marketplacePackage: 'dcc-mcp-reordered-extra'")}`),
    [/extra=\[[^\]]*reordered-extra/],
  )
  validateSourceMutation(
    source.replace(listStart, (match) => `${match}${reorderedCacheBlock}`),
    [/duplicates=\[[^\]]*cache-inspector/],
  )
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true })
}
