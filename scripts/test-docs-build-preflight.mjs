import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const buildScript = join(root, 'scripts', 'build-docs.mjs')
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const fixtureRoot = mkdtempSync(join(tmpdir(), 'dcc-mcp-build-preflight-'))
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
    'node scripts/build-docs.mjs && node scripts/validate-site.mjs && npm run geo:test',
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
  }
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true })
}
