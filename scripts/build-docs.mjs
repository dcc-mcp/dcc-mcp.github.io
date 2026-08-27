import { spawnSync } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadIntegrationCatalog } from './integration-catalog-reader.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
let catalogPath = join(root, 'docs', '.vitepress', 'dcc-integrations.json')
let outputPath

for (let index = 2; index < process.argv.length; index += 1) {
  const option = process.argv[index]
  const value = process.argv[index + 1]
  if ((option === '--catalog' || option === '--out-dir') && value) {
    if (option === '--catalog') catalogPath = resolve(value)
    else outputPath = resolve(value)
    index += 1
    continue
  }
  throw new Error(`Unsupported docs build option: ${option}`)
}

// This must complete before Vite can read the catalog through its JSON loader.
loadIntegrationCatalog(catalogPath)

const vitepressBin = join(root, 'node_modules', 'vitepress', 'bin', 'vitepress.js')
const args = [vitepressBin, 'build', 'docs']
if (outputPath) args.push('--outDir', outputPath)
const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' })
if (result.error) throw result.error
if (result.status !== 0) process.exitCode = result.status ?? 1
