import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const fixtureRoot = mkdtempSync(join(tmpdir(), 'dcc-mcp-geo-baseline-'))

try {
  const scripts = join(fixtureRoot, 'scripts')
  const baselines = join(fixtureRoot, '.github', 'geo-baselines')
  mkdirSync(scripts, { recursive: true })
  mkdirSync(baselines, { recursive: true })
  for (const file of [
    'geo-query-contract.mjs',
    'measure-public-retrieval.mjs',
    'retrieval-url-contract.mjs',
    'site-identity-contract.mjs',
    'test-geo-baseline.mjs',
  ]) {
    cpSync(join(root, 'scripts', file), join(scripts, file))
  }
  const queryContractPath = join(scripts, 'geo-query-contract.mjs')
  const baselinePath = join(baselines, '2026-08-27-public-retrieval.md')
  const queryContractSource = readFileSync(queryContractPath, 'utf8')
  const baselineSource = readFileSync(
    join(root, '.github', 'geo-baselines', '2026-08-27-public-retrieval.md'),
    'utf8',
  )

  const validateMutation = (queryContract, baseline, expectedDiagnostic) => {
    writeFileSync(queryContractPath, queryContract)
    writeFileSync(baselinePath, baseline)
    const result = spawnSync(process.execPath, [join(scripts, 'test-geo-baseline.mjs')], {
      encoding: 'utf8',
    })
    const output = `${result.stdout}\n${result.stderr}`
    assert.notEqual(result.status, 0, 'GEO baseline validator must reject the mutation')
    assert.match(output, expectedDiagnostic)
  }

  validateMutation(
    queryContractSource.replace("'Blender'", "'Blender Typo'"),
    baselineSource.replaceAll('Blender', 'Blender Typo'),
    /missing=.*Blender.*extra=.*Blender Typo/,
  )
  validateMutation(
    queryContractSource.replace("'Blender',", ''),
    baselineSource.replace(/^.*control Blender.*\r?\n/gm, ''),
    /missing=.*Blender/,
  )
  validateMutation(
    queryContractSource.replace("'Blender',", "'Blender', 'Blender Copy',"),
    baselineSource,
    /extra=.*Blender Copy/,
  )
  validateMutation(
    queryContractSource.replace("'Blender',", "'Blender', 'Blender',"),
    baselineSource,
    /duplicates=.*Blender/,
  )
  validateMutation(
    queryContractSource,
    baselineSource.replace('| NO_HIT | — | — | false | false |', '| 1 | — | — | false | false |'),
    /rank 1 requires a title and URL/,
  )
  for (const blankTitle of ['', '   ']) {
    validateMutation(
      queryContractSource,
      baselineSource.replace(
        '| NO_HIT | — | — | false | false |',
        `| 1 | ${blankTitle} | https://dcc-mcp.github.io/ | true | true |`,
      ),
      /rank 1 requires a non-empty title/,
    )
  }
  validateMutation(
    queryContractSource,
    baselineSource.replace('| NO_HIT | — | — | false | false |', '| NO_HIT | Unexpected | https:\/\/example.com | false | false |'),
    /NO_HIT requires empty title and URL/,
  )

  const hit = (url, firstParty, canonical) => (
    `| 1 | DCC-MCP result | ${url} | ${firstParty} | ${canonical} |`
  )
  const replaceFirstResult = (url, firstParty, canonical) => baselineSource.replace(
    '| NO_HIT | — | — | false | false |',
    hit(url, firstParty, canonical),
  )
  const replaceApplicationResult = (query, url, firstParty, canonical) => baselineSource.replace(
    `\`${query}\` | NO_HIT | — | — | false | false |`,
    `\`${query}\` ${hit(url, firstParty, canonical)}`,
  )
  validateMutation(
    queryContractSource,
    replaceFirstResult('https://example.com/dcc-mcp', 'true', 'true'),
    /invalid retrieval URL.*first-party allowlist/,
  )
  validateMutation(
    queryContractSource,
    replaceFirstResult('https://dcc-mcp.github.io/', 'true', 'false'),
    /URL classification mismatch.*expected firstParty=true canonical=true/,
  )
  validateMutation(
    queryContractSource,
    replaceFirstResult('https://dcc-mcp.github.io:8443/', 'true', 'true'),
    /invalid retrieval URL.*port/,
  )
  for (const url of [
    'https://dcc-mcp.github.io/?',
    'https://dcc-mcp.github.io/#',
    'https://dcc-mcp.github.io/?#',
  ]) {
    validateMutation(
      queryContractSource,
      replaceFirstResult(url, 'true', 'true'),
      /invalid retrieval URL.*(?:query|fragment)/,
    )
  }
  for (const [url, diagnostic] of [
    ['ftp://dcc-mcp.github.io/', /invalid retrieval URL.*https/],
    ['https://user:secret@dcc-mcp.github.io/', /invalid retrieval URL.*credentials/],
    ['https://xn--dcc-mcp-qza.github.io/', /invalid retrieval URL.*punycode/],
    ['https://dcc-mcp.github.io:443/', /invalid retrieval URL.*port/],
    ['https://DCC-MCP.GITHUB.IO/', /invalid retrieval URL.*lowercase/],
    ['https://dcc-mcp.github.io./', /invalid retrieval URL.*trailing dot/],
    ['https://dcc-mcp.github.io/redirect?url=https://example.com', /invalid retrieval URL/],
    ['https://www.bing.com/search?q=DCC-MCP', /invalid retrieval URL.*first-party allowlist/],
    ['https://webcache.example/dcc-mcp.github.io/', /invalid retrieval URL.*first-party allowlist/],
  ]) {
    validateMutation(queryContractSource, replaceFirstResult(url, 'true', 'true'), diagnostic)
  }
  validateMutation(
    queryContractSource,
    replaceApplicationResult(
      'how to control 3ds Max with AI',
      'https://github.com/dcc-mcp/dcc-mcp-blender',
      'true',
      'false',
    ),
    /official host path is not valid for application 3ds Max/,
  )
  validateMutation(
    queryContractSource,
    replaceApplicationResult(
      'how to control 3ds Max with AI',
      'https://dcc-mcp.github.io/control/blender',
      'true',
      'true',
    ),
    /canonical path is not valid for application 3ds Max/,
  )
  validateMutation(
    queryContractSource,
    replaceApplicationResult(
      'how to control Maya with AI',
      'https://github.com/dcc-mcp/dcc-mcp-maya/issues',
      'true',
      'false',
    ),
    /official GitHub URL must be the exact repository root/,
  )
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true })
}
