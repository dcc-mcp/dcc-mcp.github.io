import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import { parse, compileScript } from 'vue/compiler-sfc'
import { createRenderer, createSSRApp, nextTick } from 'vue'
import { renderToString } from 'vue/server-renderer'

const root = fileURLToPath(new URL('../', import.meta.url))
const assetRoot = join(root, 'docs/public/brand/agent-crew')
const manifest = JSON.parse(readFileSync(join(assetRoot, 'source-manifest.json'), 'utf8'))
for (const asset of manifest.files) {
  assert.equal(createHash('sha256').update(readFileSync(join(assetRoot, asset.file))).digest('hex'), asset.sha256)
}
const componentPath = join(root, 'docs/.vitepress/theme/components/AgentCrew.vue')
const directory = mkdtempSync(join(root, 'node_modules/.crew-test-'))
try {
  const { descriptor } = parse(readFileSync(componentPath, 'utf8'))
  const compiled = compileScript(descriptor, { id: 'agent-crew-test', inlineTemplate: true })
  const result = await build({
    stdin: { contents: compiled.content, loader: 'ts', resolveDir: join(root, 'docs/.vitepress/theme/components') },
    bundle: true, format: 'esm', platform: 'node', external: ['vue'], write: false,
    plugins: [{
      name: 'site-base-fixture',
      setup(builder) {
        builder.onResolve({ filter: /^vitepress$/ }, () => ({ path: 'vitepress', namespace: 'fixture' }))
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({ contents: 'export const withBase = path => path' }))
      },
    }],
  })
  const modulePath = join(directory, 'crew.mjs')
  writeFileSync(modulePath, result.outputFiles[0].text)
  const { default: AgentCrew } = await import(pathToFileURL(modulePath).href)
  for (const locale of ['en', 'zh']) {
    const html = await renderToString(createSSRApp(AgentCrew, { locale }))
    assert.equal((html.match(/class="crew-role"/g) ?? []).length, 5)
    assert(!html.includes('.gif'), 'Server rendering must not auto-load animations')
    assert(html.includes(locale === 'zh' ? '角色示意' : 'Illustrated roles'))
  }
  const listeners = new Set()
  const query = {
    matches: false,
    addEventListener: (_, callback) => listeners.add(callback),
    removeEventListener: (_, callback) => listeners.delete(callback),
  }
  globalThis.window = { matchMedia: () => query }
  const node = (type, text = '') => ({ type, text, props: {}, children: [], parent: null })
  const renderer = createRenderer({
    createElement: node, createText: (text) => node('text', text), createComment: (text) => node('comment', text),
    setText: (item, text) => { item.text = text },
    setElementText: (item, text) => { item.text = text; item.children = [] },
    patchProp: (item, key, _old, value) => { item.props[key] = value },
    insert(item, parent, anchor = null) {
      if (item.parent) item.parent.children.splice(item.parent.children.indexOf(item), 1)
      const index = anchor ? parent.children.indexOf(anchor) : -1
      parent.children.splice(index < 0 ? parent.children.length : index, 0, item)
      item.parent = parent
    },
    remove(item) { item.parent.children.splice(item.parent.children.indexOf(item), 1) },
    parentNode: (item) => item.parent,
    nextSibling: (item) => item.parent?.children[item.parent.children.indexOf(item) + 1] ?? null,
  })
  const tree = node('root')
  const app = renderer.createApp(AgentCrew, { locale: 'en' })
  app.mount(tree)
  const all = (item) => [item, ...item.children.flatMap(all)]
  const images = () => all(tree).filter((item) => item.type === 'img')
  const roles = () => all(tree).filter((item) => item.props.class === 'crew-role')
  const toggle = all(tree).find((item) => item.type === 'button')
  assert(images().every((item) => item.props.src.endsWith('.png')))
  toggle.props.onClick()
  await nextTick()
  assert.equal(images().filter((item) => item.props.src.endsWith('.gif')).length, 1)
  toggle.props.onClick()
  await nextTick()
  assert(images().every((item) => item.props.src.endsWith('.png')), 'Pause must unload the animated image')
  toggle.props.onClick()
  await nextTick()
  roles()[2].props.onClick()
  await nextTick()
  assert.equal(roles()[2].props['aria-pressed'], true)
  assert(images()[2].props.src.endsWith('.gif'))
  assert(images()[0].props.src.endsWith('.png'))
  assert(all(tree).some((item) => item.text.includes('two material options')))
  query.matches = true
  listeners.forEach((callback) => callback())
  await nextTick()
  assert.equal(toggle.props.disabled, true)
  assert(images().every((item) => item.props.src.endsWith('.png')))
  query.matches = false
  listeners.forEach((callback) => callback())
  await nextTick()
  assert.equal(toggle.props.disabled, false)
  assert(images().every((item) => item.props.src.endsWith('.png')), 'Preference changes must not restart animation')
  app.unmount()
  assert.equal(listeners.size, 0)
  delete globalThis.window
  console.log('Agent crew: bilingual SSR, static defaults, role switching, animation pause, reduced motion and cleanup passed.')
} finally {
  rmSync(directory, { recursive: true, force: true })
}
