import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { loadIntegrationCatalog } from './integration-catalog-reader.mjs'

const fixtureRoot = mkdtempSync(join(tmpdir(), 'dcc-mcp-catalog-reader-'))
const fields = (slugExpression = "'probe'") => `
    slug: ${slugExpression},
    name: 'Probe',
    repository: 'dcc-mcp-probe',
    summaryEn: 'English summary',
    summaryZh: 'Chinese summary',
    tasksEn: ['one', 'two', 'three'],
    tasksZh: ['one', 'two', 'three']`

const sourceFor = (literal) => `export const dccIntegrations: DccIntegration[] = ${literal}
export const releasedIntegrations = dccIntegrations.filter(({ dccType }) => dccType)
const repositoryUrl = () => 'https://github.com/dcc-mcp/probe'
`
const loadCase = (name, literal) => {
  const path = join(fixtureRoot, `${name}.mts`)
  writeFileSync(path, sourceFor(literal))
  return () => loadIntegrationCatalog(path)
}

try {
  assert.equal(loadCase('plain-static-literal', `[{${fields()}\n  }]`)()[0].slug, 'probe')
  assert.equal(loadCase('reordered-static-fields', `[{
    tasksZh: ['one', 'two', 'three'],
    repository: 'dcc-mcp-probe',
    name: 'Probe',
    tasksEn: ['one', 'two', 'three'],
    summaryZh: 'Chinese summary',
    slug: 'probe',
    summaryEn: 'English summary'
  }]`)()[0].slug, 'probe')

  const rejected = [
    ['computed-key', `[{
      ['slug']: 'probe',${fields().replace(/\n    slug: 'probe',/, '')}
    }]`],
    ['object-spread', `[{
      ...{ slug: 'probe' },${fields().replace(/\n    slug: 'probe',/, '')}
    }]`],
    ['call-expression', `[{${fields("['pro', 'be'].join('')")}\n    }]`],
    ['iife-expression', `[{${fields("(() => 'probe')()")}\n    }]`],
    ['prototype-mutation', `[{
      __proto__: { reviewerPrototypeMarker: true },${fields()}
    }]`],
    ['duplicate-property', `[{
      slug: 'shadowed',${fields()}
    }]`],
    ['comment-in-catalog', `[/* lexical decoy ] */ {${fields()}\n    }]`],
    ['method-property', `[{
      slug() { return 'probe' },${fields().replace(/\n    slug: 'probe',/, '')}
    }]`],
    ['setter-property', `[{
      set slug(value) {},${fields().replace(/\n    slug: 'probe',/, '')}
    }]`],
    ['nonliteral-value', `[{${fields('1 + 1')}\n    }]`],
    ['comma-declarator-suffix', `[{${fields()}\n    }], reviewerExtra = (() => 'executed')()`],
    ['typescript-assertion-suffix', `[{${fields()}\n    }] as unknown as DccIntegration[]`],
    ['executable-statement-suffix', `[{${fields()}\n    }]; (() => 'executed')()`],
  ]
  for (const [name, literal] of rejected) {
    assert.throws(loadCase(name, literal), Error, `${name} must be rejected without evaluation`)
  }

  const getter = loadCase('getter-executes', `[{
    get slug() { throw new Error('REVIEWER_GETTER_EXECUTED') },${fields().replace(/\n    slug: 'probe',/, '')}
  }]`)
  let getterError
  try {
    getter()
  } catch (error) {
    getterError = error
  }
  assert.ok(getterError instanceof Error, 'getter syntax must be rejected')
  assert.doesNotMatch(
    getterError.message,
    /REVIEWER_GETTER_EXECUTED/,
    'catalog rejection must occur before a getter can execute',
  )
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true })
}
