import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { validateCollection } from './home-collection-contract.mjs'
const root = fileURLToPath(new URL('../', import.meta.url))
const bytes = readFileSync(`${root}docs/.vitepress/showcase/collection.json`, 'utf8')
const lock = JSON.parse(readFileSync(`${root}docs/.vitepress/showcase/source-lock.json`, 'utf8'))
const data = validateCollection(bytes, lock)
const rejects = (change, pattern) => {
  const mutated = structuredClone(data)
  change(mutated)
  const serialized = JSON.stringify(mutated)
  const refreshed = { ...lock, projection_sha256: createHash('sha256').update(serialized).digest('hex') }
  assert.throws(() => validateCollection(serialized, refreshed), pattern)
}
rejects((value) => value.cases.push(value.cases[0]), /Duplicate/)
rejects((value) => value.cases.pop(), /inventory/)
rejects((value) => { value.cases[0].demo = { case_slug: value.cases[0].slug, localeSupport: ['en', 'zh'] } }, /membership/)
rejects((value) => { value.cases[0].cover.width = 0 }, /assertion|false/i)
rejects((value) => { value.cases[0].cover.path = 'docs/showcase/../private.png' }, /assertion|false/i)
rejects((value) => { value.cases[0].en.evidence_label = '' }, /missing/)
assert.throws(() => validateCollection(bytes + ' ', lock), /source sync/)
console.log(`Homepage collection contracts passed: ${data.cases.length} cases; ${lock.demo_slugs.length} manifest-listed demos; 7 negative cases.`)
