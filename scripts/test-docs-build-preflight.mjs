import assert from 'node:assert/strict'
import { cpSync, existsSync, linkSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const buildScript = join(root, 'scripts', 'build-docs.mjs')
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const fixtureRoot = mkdtempSync(join(dirname(root), 'dcc-mcp-build-preflight-'))
const officialCatalog = readFileSync(join(root, 'docs', '.vitepress', 'dcc-integrations.json'), 'utf8')
const validCatalog = `[{
  "slug": "probe",
  "name": "Probe",
  "repository": "dcc-mcp-probe",
  "summaryEn": "English summary",
  "summaryZh": "Chinese summary",
  "tasksEn": ["one", "two", "three"],
  "tasksZh": ["one", "two", "three"]
}]`

const malformedFixture = (name, marker, bytes) => {
  const [prefix, suffix] = validCatalog.split(marker)
  const path = join(fixtureRoot, `${name}.json`)
  writeFileSync(path, Buffer.concat([
    Buffer.from(prefix, 'utf8'),
    Buffer.from(bytes),
    Buffer.from(suffix, 'utf8'),
  ]))
  return path
}

try {
  assert.equal(
    packageJson.scripts['docs:build'],
    'node scripts/build-docs.mjs && npm run geo:test',
    'the official build must enter through the strict catalog preflight',
  )

  const cases = [
    ['malformed-scalar', malformedFixture('malformed-scalar', 'English summary', [0xc3, 0x28])],
    ['malformed-task', malformedFixture('malformed-task', 'two', [0xe2, 0x82])],
    ['leading-bom', (() => {
      const path = join(fixtureRoot, 'leading-bom.json')
      writeFileSync(path, Buffer.concat([
        Buffer.from([0xef, 0xbb, 0xbf]),
        Buffer.from(validCatalog, 'utf8'),
      ]))
      return path
    })()],
  ]

  for (const [name, catalogPath] of cases) {
    const outputPath = join(fixtureRoot, `${name}-dist`)
    const result = spawnSync(
      process.execPath,
      [buildScript, '--catalog', catalogPath, '--out-dir', outputPath],
      { cwd: root, encoding: 'utf8' },
    )
    assert.notEqual(result.status, 0, `${name} must fail the official build entrypoint`)
    assert.equal(existsSync(outputPath), false, `${name} must fail before Vite creates output`)
    assert.doesNotMatch(`${result.stdout}${result.stderr}`, /\n\s+at\s/, `${name} must fail without a traceback`)
  }

  const driftCatalogPath = join(fixtureRoot, 'identity-drift.json')
  writeFileSync(
    driftCatalogPath,
    officialCatalog.replace('"name": "Blender"', '"name": "REVIEWER_DRIFT_MARKER"'),
  )
  const driftOutputPath = join(fixtureRoot, 'identity-drift-dist')
  const driftResult = spawnSync(
    process.execPath,
    [buildScript, '--catalog', driftCatalogPath, '--out-dir', driftOutputPath],
    { cwd: root, encoding: 'utf8' },
  )
  assert.notEqual(driftResult.status, 0, 'identity drift must fail before Vite starts')
  assert.equal(existsSync(driftOutputPath), false, 'identity drift must produce zero build output')
  assert.doesNotMatch(`${driftResult.stdout}${driftResult.stderr}`, /\n\s+at\s/, 'identity drift must fail without a traceback')

  const driftDocsRoot = join(fixtureRoot, 'drift-docs')
  cpSync(join(root, 'docs'), driftDocsRoot, { recursive: true })
  writeFileSync(
    join(driftDocsRoot, '.vitepress', 'dcc-integrations.json'),
    officialCatalog.replace(
      /"summaryEn": "[^"]+"/,
      '"summaryEn": "REVIEWER_DRIFT_MARKER"',
    ),
  )
  const safeCatalogPath = join(fixtureRoot, 'safe-catalog.json')
  writeFileSync(safeCatalogPath, officialCatalog)
  const snapshotOutputPath = join(fixtureRoot, 'snapshot-dist')
  const snapshotResult = spawnSync(
    process.execPath,
    [
      buildScript,
      '--catalog', safeCatalogPath,
      '--docs-root', driftDocsRoot,
      '--out-dir', snapshotOutputPath,
    ],
    { cwd: root, encoding: 'utf8' },
  )
  assert.equal(
    snapshotResult.status,
    0,
    `Vite must build from the validated catalog snapshot:\n${snapshotResult.stdout}${snapshotResult.stderr}`,
  )
  const outputFiles = readdirSync(snapshotOutputPath, { recursive: true })
    .filter((path) => /\.(?:html|js|json|txt)$/.test(path))
  const outputText = outputFiles
    .map((path) => readFileSync(join(snapshotOutputPath, path), 'utf8'))
    .join('\n')
  assert.doesNotMatch(outputText, /REVIEWER_DRIFT_MARKER/, 'Vite must not consume the drifted default catalog')

  const hardlinkCatalogPath = join(fixtureRoot, 'hardlink-catalog.json')
  linkSync(join(root, 'docs', '.vitepress', 'dcc-integrations.json'), hardlinkCatalogPath)
  const hardlinkOutputPath = join(fixtureRoot, 'hardlink-dist')
  const hardlinkResult = spawnSync(
    process.execPath,
    [buildScript, '--catalog', hardlinkCatalogPath, '--out-dir', hardlinkOutputPath],
    { cwd: root, encoding: 'utf8' },
  )
  assert.notEqual(hardlinkResult.status, 0, 'a hardlinked catalog source must be rejected')
  assert.equal(existsSync(hardlinkOutputPath), false, 'hardlink replacement must produce zero build output')
  assert.doesNotMatch(`${hardlinkResult.stdout}${hardlinkResult.stderr}`, /\n\s+at\s/, 'hardlink rejection must not print a traceback')

  const symlinkCatalogPath = join(fixtureRoot, 'symlink-catalog.json')
  symlinkSync(join(root, 'docs', '.vitepress', 'dcc-integrations.json'), symlinkCatalogPath, 'file')
  const symlinkOutputPath = join(fixtureRoot, 'symlink-dist')
  const symlinkResult = spawnSync(
    process.execPath,
    [buildScript, '--catalog', symlinkCatalogPath, '--out-dir', symlinkOutputPath],
    { cwd: root, encoding: 'utf8' },
  )
  assert.notEqual(symlinkResult.status, 0, 'a symlinked catalog source must be rejected')
  assert.equal(existsSync(symlinkOutputPath), false, 'symlink replacement must produce zero build output')
  assert.doesNotMatch(`${symlinkResult.stdout}${symlinkResult.stderr}`, /\n\s+at\s/, 'symlink rejection must not print a traceback')
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true })
}
