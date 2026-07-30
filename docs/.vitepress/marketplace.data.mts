import { defineLoader } from 'vitepress'

const catalogUrl = 'https://raw.githubusercontent.com/dcc-mcp/marketplace/main/marketplace.json'

export default defineLoader({
  async load() {
    const response = await fetch(catalogUrl, { signal: AbortSignal.timeout(15_000) })
    if (!response.ok) throw new Error(`Marketplace catalog request failed (${response.status})`)

    const catalog = await response.json()
    if (!Array.isArray(catalog.skills)) throw new Error('Marketplace catalog response is invalid')
    return catalog
  },
})
