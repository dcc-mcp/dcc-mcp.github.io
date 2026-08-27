import assert from 'node:assert/strict'
import {
  classifyRetrievalUrl,
  RetrievalUrlRejectedError,
} from './retrieval-url-contract.mjs'

const fixed = { kind: 'fixed', application: null, locale: 'en' }
const maya = { kind: 'application-control', application: 'Maya', locale: 'en' }

const rejected = [
  ['non-default port', 'https://dcc-mcp.github.io:8443/', fixed],
  ['IPv4 loopback', 'https://127.0.0.1/', fixed],
  ['IPv6 loopback', 'https://[::1]/', fixed],
  ['localhost', 'https://localhost/', fixed],
  ['local suffix', 'https://dcc-mcp.github.io.local/', fixed],
  ['Unicode host lookalike', 'https://ｄｃｃ-mcp.github.io/', fixed],
  ['punycode host', 'https://xn--dcc-mcp-qza.github.io/', fixed],
  ['uppercase host', 'https://DCC-MCP.GITHUB.IO/', fixed],
  ['trailing-dot host', 'https://dcc-mcp.github.io./', fixed],
  ['credentials', 'https://user:secret@dcc-mcp.github.io/', fixed],
  ['HTTP scheme', 'http://dcc-mcp.github.io/', fixed],
  ['FTP scheme', 'ftp://dcc-mcp.github.io/', fixed],
  ['explicit default port', 'https://dcc-mcp.github.io:443/', fixed],
  ['raw backslash', String.raw`https://dcc-mcp.github.io\control\maya`, maya],
  ['encoded backslash', 'https://dcc-mcp.github.io/control%5Cmaya', maya],
  ['double slash', 'https://dcc-mcp.github.io//control/maya', maya],
  ['dot segment', 'https://dcc-mcp.github.io/control/../control/maya', maya],
  ['encoded dot segment', 'https://dcc-mcp.github.io/control/%2e%2e/control/maya', maya],
  ['encoded slash', 'https://dcc-mcp.github.io/control%2Fmaya', maya],
  ['query string', 'https://dcc-mcp.github.io/control/maya?q=1', maya],
  ['fragment', 'https://dcc-mcp.github.io/control/maya#result', maya],
  ['proxy host', 'https://r.jina.ai/http://dcc-mcp.github.io/control/maya', maya],
  ['archive host', 'https://web.archive.org/web/20260827/https://dcc-mcp.github.io/', fixed],
  ['cache host', 'https://webcache.googleusercontent.com/search?q=cache:dcc-mcp.github.io', fixed],
  ['search host', 'https://www.google.com/search?q=dcc-mcp', fixed],
  ['redirect route', 'https://dcc-mcp.github.io/redirect', fixed],
  ['GitHub issues route', 'https://github.com/dcc-mcp/dcc-mcp-maya/issues', maya],
  ['GitHub releases route', 'https://github.com/dcc-mcp/dcc-mcp-maya/releases', maya],
  ['GitHub tree route', 'https://github.com/dcc-mcp/dcc-mcp-maya/tree/main', maya],
  ['GitHub blob route', 'https://github.com/dcc-mcp/dcc-mcp-maya/blob/main/README.md', maya],
  ['GitHub search route', 'https://github.com/dcc-mcp/dcc-mcp-maya/search', maya],
  ['GitHub forks route', 'https://github.com/dcc-mcp/dcc-mcp-maya/forks', maya],
  ['GitHub owner/repository case alias', 'https://github.com/DCC-MCP/DCC-MCP-MAYA', maya],
  ['PyPI child route', 'https://pypi.org/project/dcc-mcp-maya/files', maya],
  ['PyPI package case alias', 'https://pypi.org/project/DCC-MCP-MAYA', maya],
]

assert.equal(rejected.length, 35, 'reviewer invalid URL matrix must remain frozen at 35 cases')
for (const [label, url, context] of rejected) {
  assert.throws(
    () => classifyRetrievalUrl(url, context),
    RetrievalUrlRejectedError,
    `${label} must be rejected: ${url}`,
  )
}

for (const url of [
  'https://dcc-mcp.github.io/?',
  'https://dcc-mcp.github.io/#',
  'https://dcc-mcp.github.io/?#',
]) {
  assert.throws(
    () => classifyRetrievalUrl(url, fixed),
    RetrievalUrlRejectedError,
    `bare query or fragment delimiter must be rejected: ${url}`,
  )
}

for (const locale of ['fr-FR', 'en-US', 'zh', 'EN']) {
  assert.throws(
    () => classifyRetrievalUrl('https://dcc-mcp.github.io/control/maya', { ...maya, locale }),
    RetrievalUrlRejectedError,
    `unsupported locale must be rejected: ${locale}`,
  )
}

for (const [url, context, expected] of [
  ['https://dcc-mcp.github.io/', fixed, { accepted: true, firstParty: true, canonical: true }],
  ['https://dcc-mcp.github.io/control/maya', maya, { accepted: true, firstParty: true, canonical: true }],
  ['https://dcc-mcp.github.io/zh/control/maya', { ...maya, locale: 'zh-CN' }, { accepted: true, firstParty: true, canonical: true }],
  ['https://github.com/dcc-mcp/dcc-mcp-maya', maya, { accepted: true, firstParty: true, canonical: false }],
  ['https://pypi.org/project/dcc-mcp-maya', maya, { accepted: true, firstParty: true, canonical: false }],
]) {
  assert.equal(new URL(url).href, url, `accepted fixture must already equal its WHATWG form: ${url}`)
  assert.deepEqual(classifyRetrievalUrl(url, context), expected, `unexpected classification: ${url}`)
}
