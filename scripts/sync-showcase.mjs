import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Updating the snapshot is an explicit maintenance operation, never a browser fetch.
const args = process.argv.slice(2)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'docs/.vitepress/showcase')
const check = args.includes('--check')
const ref = args.includes('--ref') ? args[args.indexOf('--ref') + 1] : check ? JSON.parse(readFileSync(resolve(out, 'source-lock.json'), 'utf8')).ref : ''
const source = args.includes('--source') ? args[args.indexOf('--source') + 1] : null
if (!/^[a-f0-9]{40}$/.test(ref)) {
  throw new Error('Use --ref <full immutable showcase commit> [--source <bare git repository>]')
}
const files = {}
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex')
async function read(path) {
  let bytes
  if (source) bytes = execFileSync('git', [`--git-dir=${resolve(source)}`, 'show', `${ref}:${path}`], { maxBuffer: 8 * 1024 * 1024 })
  else {
    const response = await fetch(`https://raw.githubusercontent.com/dcc-mcp/showcase/${ref}/${path}`, { signal: AbortSignal.timeout(30000) })
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`)
    bytes = Buffer.from(await response.arrayBuffer())
  }
  files[path] = { sha256: digest(bytes), bytes: bytes.length }
  return JSON.parse(bytes.toString('utf8'))
}
const collection = await read('collection.json')
const play = await read('play/manifest.json')
const sharedEn = await read('locales/en/ui.json')
const zh = await read('locales/zh/collection.json')
if (collection.schema_version !== 1 || play.schema_version !== 1) throw new Error('Unsupported source schema')
const ids = new Set()
for (const item of collection.cases) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || item.slug.length > 80 || ids.has(item.slug)) throw new Error(`Invalid or duplicate slug: ${item.slug}`)
  ids.add(item.slug)
}
const demos = new Map()
for (const demo of play.demos) {
  if (!ids.has(demo.case_slug) || demos.has(demo.case_slug) || !demo.localeSupport?.includes('en') || !demo.localeSupport?.includes('zh')) throw new Error('Demo must identify exactly one bilingual collection case')
  demos.set(demo.case_slug, demo)
}
// The owning localization builder merges all case catalogs; shared evidence
// phrases may be defined in another case's catalog.
for (const item of [...collection.cases].sort((a, b) => a.slug.localeCompare(b.slug))) {
  const catalog = await read(`locales/en/cases/${item.slug}.json`)
  for (const [key, value] of Object.entries(catalog)) {
    if (sharedEn[key] && sharedEn[key] !== value) throw new Error(`Conflicting translation: ${key}`)
    sharedEn[key] = value
  }
}
const cases = []
for (const item of collection.cases) {
  const mediaPath = item.cover.src
  if (!mediaPath.startsWith(`docs/showcase/${item.slug}/`) || mediaPath.includes('..')) throw new Error('Cover must belong to its case')
  const manifest = await read(`docs/showcase/${item.slug}/manifest.json`)
  const cover = manifest.files.find((file) => file.path === mediaPath.slice(`docs/showcase/${item.slug}/`.length))
  if (!cover || !Number.isInteger(cover.width) || !Number.isInteger(cover.height) || cover.width <= 0 || cover.height <= 0 || !/^[a-f0-9]{64}$/.test(cover.sha256)) throw new Error(`Missing cover dimensions/hash: ${item.slug}`)
  const original = {
    title: item.title, subtitle: item.subtitle, summary: item.summary,
    software: item.software, evidence_label: item.evidence_label,
    evidence_scope: item.evidence_scope, limitations: item.limitations, alt: item.cover.alt,
  }
  const translate = (value, locale) => {
    if (Array.isArray(value)) return value.map((entry) => translate(entry, locale))
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, translate(entry, locale)]))
    if (typeof value !== 'string') return value
    const translated = (locale === 'en' ? sharedEn[value] : zh[value]) ?? value
    if (locale === 'en' && /[\u3400-\u9fff]/u.test(translated)) throw new Error(`Missing English translation in ${item.slug}: ${value.slice(0, 100)}`)
    return translated
  }
  cases.push({ slug: item.slug, original, en: translate(original, 'en'), zh: translate(original, 'zh'),
    cover: { path: mediaPath, width: cover.width, height: cover.height, bytes: cover.bytes, sha256: cover.sha256 },
    // This is membership in the source manifest, not a new playability acceptance.
    demo: demos.get(item.slug) ?? null,
    source: item.source, credits: item.credits,
  })
}
const data = { schema_version: 1, repository: 'dcc-mcp/showcase', ref, cases }
const serialized = `${JSON.stringify(data, null, 2)}\n`
const lock = `${JSON.stringify({ repository: data.repository, ref, case_slugs: cases.map((item) => item.slug), demo_slugs: [...demos.keys()], projection_sha256: digest(serialized), files }, null, 2)}\n`
if (check) {
  if (readFileSync(resolve(out, 'collection.json'), 'utf8') !== serialized || readFileSync(resolve(out, 'source-lock.json'), 'utf8') !== lock) throw new Error('Showcase projection drifted from the pinned source. Run showcase:sync with the intended source commit.')
} else {
  mkdirSync(out, { recursive: true })
  writeFileSync(resolve(out, 'collection.json'), serialized)
  writeFileSync(resolve(out, 'source-lock.json'), lock)
}
console.log(`${check ? 'Verified' : 'Synced'} ${cases.length} cases and ${demos.size} Web demo entries from showcase ${ref}`)
