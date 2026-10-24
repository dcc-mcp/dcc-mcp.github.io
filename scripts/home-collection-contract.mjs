import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'

export function validateCollection(bytes, lock) {
  const snapshot = JSON.parse(bytes)
  assert.equal(snapshot.schema_version, 1)
  assert.equal(snapshot.repository, 'dcc-mcp/showcase')
  assert.match(snapshot.ref, /^[a-f0-9]{40}$/)
  assert.equal(snapshot.ref, lock.ref)
  assert.equal(createHash('sha256').update(bytes).digest('hex'), lock.projection_sha256, 'Projection changed without a source sync')
  const slugs = snapshot.cases.map((item) => item.slug)
  assert.equal(new Set(slugs).size, slugs.length, 'Duplicate case slug')
  assert.ok(slugs.length > 0)
  assert.deepEqual(slugs, lock.case_slugs, 'Cases must preserve source order and complete inventory')
  assert.deepEqual(snapshot.cases.filter((item) => item.demo).map((item) => item.slug).sort(), [...lock.demo_slugs].sort(), 'Demo membership must match the source manifest')
  for (const item of snapshot.cases) {
    assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.ok(item.slug.length <= 80)
    assert.ok(item.cover.path.startsWith(`docs/showcase/${item.slug}/`) && !item.cover.path.includes('..'))
    assert.ok(item.cover.width > 0 && item.cover.height > 0)
    assert.match(item.cover.sha256, /^[a-f0-9]{64}$/)
    assert.ok(lock.files[`docs/showcase/${item.slug}/manifest.json`])
    for (const locale of ['original', 'en', 'zh']) {
      const value = item[locale]
      for (const field of ['title', 'summary', 'evidence_label', 'evidence_scope', 'alt']) assert.ok(value[field]?.length > 0, `${item.slug}: missing ${locale} ${field}`)
      assert.ok(Array.isArray(value.limitations) && value.limitations.length > 0)
    }
    assert.ok(!/[\u3400-\u9fff]/u.test(JSON.stringify(item.en)), 'Missing English localization')
    if (item.demo) {
      assert.equal(item.demo.case_slug, item.slug)
      assert.ok(item.demo.localeSupport.includes('en') && item.demo.localeSupport.includes('zh'))
    }
  }
  return snapshot
}

export function validateCollectionHtml(html, snapshot, locale) {
  const gallery = html.match(/<section\b[^>]*id="selected-work"[^>]*>([\s\S]*?)<\/section>/)?.[1]
  assert.ok(gallery, 'Gallery must render without client JavaScript')
  const cards = [...gallery.matchAll(/<article\b[^>]*data-case-slug="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)]
  assert.deepEqual(cards.map((match) => match[1]), snapshot.cases.map((item) => item.slug), 'Exactly one rendered card per source case, in source order')
  const prefix = `https://dcc-mcp.github.io/showcase/${locale === 'zh' ? 'zh/' : ''}`
  for (let index = 0; index < cards.length; index += 1) {
    const [, slug, card] = cards[index]
    const item = snapshot.cases[index]
    assert.ok(card.includes(`href="${prefix}cases/${slug}/"`))
    const gameLinks = [...card.matchAll(/<a\b[^>]*href="([^"]*\/games\/[^" ]+)"[^>]*>/g)]
    assert.equal(gameLinks.length, item.demo ? 1 : 0, `${slug}: incorrect browser-demo claim`)
    if (item.demo) assert.ok(gameLinks[0][0].includes(`href="${prefix}games/${slug}/"`))
    for (const [, anchor] of card.matchAll(/(<a\b[^>]*>)/g)) assert.ok(anchor.includes('target="_self"'), 'Project Pages links must use full navigation')
    const img = card.match(/<img\b[^>]*>/)?.[0]
    assert.ok(img?.includes(`https://raw.githubusercontent.com/dcc-mcp/showcase/${snapshot.ref}/${item.cover.path}`))
    for (const attribute of [`width="${item.cover.width}"`, `height="${item.cover.height}"`, 'loading="lazy"', 'decoding="async"']) assert.ok(img.includes(attribute), `${slug}: missing ${attribute}`)
    assert.ok(card.includes('<details') && card.includes('<summary'), 'Evidence and limits must be in server HTML')
    assert.ok(!/<(?:iframe|video|canvas)\b/.test(card), 'Gallery must not load game engines or video')
  }
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'Homepage needs one h1')
  assert.ok(html.includes('id="creative-hero-title"') && html.includes('fetchpriority="high"'))
}
