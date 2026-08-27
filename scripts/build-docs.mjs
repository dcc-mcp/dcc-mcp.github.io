import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { chmodSync, cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readIntegrationCatalogSnapshot } from './integration-catalog-reader.mjs'
import { validateIntegrationIdentity } from './validate-integration-identity.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
let catalogPath = join(root, 'docs', '.vitepress', 'dcc-integrations.json')
let docsRoot = join(root, 'docs')
let outputPath

for (let index = 2; index < process.argv.length; index += 1) {
  const option = process.argv[index]
  const value = process.argv[index + 1]
  if ((option === '--catalog' || option === '--docs-root' || option === '--out-dir') && value) {
    if (option === '--catalog') catalogPath = resolve(value)
    else if (option === '--docs-root') docsRoot = resolve(value)
    else outputPath = resolve(value)
    index += 1
    continue
  }
  throw new Error(`Unsupported docs build option: ${option}`)
}

const run = () => {
  const catalogSnapshot = readIntegrationCatalogSnapshot(catalogPath)
  const catalogBytes = catalogSnapshot.bytes
  validateIntegrationIdentity(catalogSnapshot.integrations)
  const catalogDigest = createHash('sha256').update(catalogBytes).digest('hex')
  const snapshotRoot = mkdtempSync(join(tmpdir(), 'dcc-mcp-docs-snapshot-'))
  const snapshotDocsRoot = join(snapshotRoot, 'docs')
  const finalOutputPath = outputPath ?? join(root, 'docs', '.vitepress', 'dist')
  try {
    symlinkSync(join(root, 'node_modules'), join(snapshotRoot, 'node_modules'), 'junction')
    cpSync(docsRoot, snapshotDocsRoot, { recursive: true, dereference: true })
    const snapshotCatalogPath = join(snapshotDocsRoot, '.vitepress', 'dcc-integrations.json')
    rmSync(snapshotCatalogPath, { force: true })
    writeFileSync(snapshotCatalogPath, catalogBytes, { flag: 'wx', mode: 0o400 })
    chmodSync(snapshotCatalogPath, 0o400)
    const snapshotDigest = createHash('sha256').update(readFileSync(snapshotCatalogPath)).digest('hex')
    if (snapshotDigest !== catalogDigest) throw new Error('Validated catalog snapshot digest changed before build')

    const vitepressBin = join(root, 'node_modules', 'vitepress', 'bin', 'vitepress.js')
    const buildResult = spawnSync(
      process.execPath,
      [vitepressBin, 'build', snapshotDocsRoot, '--outDir', finalOutputPath],
      { cwd: root, stdio: 'inherit' },
    )
    if (buildResult.error) throw buildResult.error
    if (buildResult.status !== 0) throw new Error(`VitePress build failed with status ${buildResult.status ?? 'signal'}`)

    const validationResult = spawnSync(
      process.execPath,
      [join(root, 'scripts', 'validate-site.mjs')],
      {
        cwd: root,
        env: {
          ...process.env,
          DCC_MCP_VALIDATED_CATALOG_PATH: snapshotCatalogPath,
          DCC_MCP_VALIDATED_DIST_PATH: finalOutputPath,
        },
        stdio: 'inherit',
      },
    )
    if (validationResult.error) throw validationResult.error
    if (validationResult.status !== 0) {
      throw new Error(`Site validation failed with status ${validationResult.status ?? 'signal'}`)
    }
  } finally {
    rmSync(snapshotRoot, { recursive: true, force: true })
  }
}

try {
  run()
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Docs build failed')
  process.exitCode = 1
}
