import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { loadIntegrationCatalog } from './integration-catalog-reader.mjs'

const fixtureRoot = mkdtempSync(join(tmpdir(), 'dcc-mcp-catalog-reader-'))
const fields = (slugExpression = '"probe"') => `
    "slug": ${slugExpression},
    "name": "Probe",
    "repository": "dcc-mcp-probe",
    "summaryEn": "English summary",
    "summaryZh": "Chinese summary",
    "tasksEn": ["one", "two", "three"],
    "tasksZh": ["one", "two", "three"]`

const loadSourceCase = (name, source) => {
  const path = join(fixtureRoot, `${name}.json`)
  writeFileSync(path, source)
  return () => loadIntegrationCatalog(path)
}
const loadCase = (name, literal) => loadSourceCase(name, literal)

try {
  const staticLiteral = `[{${fields()}\n  }]`
  assert.equal(loadCase('plain-static-data', staticLiteral)()[0].slug, 'probe')
  assert.equal(loadCase('reordered-static-fields', `[{
    "tasksZh": ["one", "two", "three"],
    "repository": "dcc-mcp-probe",
    "name": "Probe",
    "tasksEn": ["one", "two", "three"],
    "summaryZh": "Chinese summary",
    "slug": "probe",
    "summaryEn": "English summary"
  }]`)()[0].slug, 'probe')

  const validSurrogatePair = staticLiteral.replace(
    '"English summary"',
    '"Smile \\uD83D\\uDE00"',
  )
  assert.equal(
    loadCase('valid-surrogate-pair', validSurrogatePair)()[0].summaryEn,
    'Smile 😀',
    'a valid escaped surrogate pair must decode without replacement characters',
  )

  const rejected = [
    ['escaped-c0-control', `[{${fields('"pro\\u0001be"')}\n    }]`],
    ['escaped-del-control', `[{${fields('"pro\\u007Fbe"')}\n    }]`],
    ['escaped-c1-control', `[{${fields('"pro\\u0085be"')}\n    }]`],
    ['lone-high-surrogate', `[{${fields('"pro\\uD800be"')}\n    }]`],
    ['lone-low-surrogate', `[{${fields('"pro\\uDC00be"')}\n    }]`],
    ['reversed-surrogates', `[{${fields('"pro\\uDC00\\uD800be"')}\n    }]`],
    ['computed-key', `[{
      ["slug"]: "probe",${fields().replace(/\n    "slug": "probe",/, '')}
    }]`],
    ['object-spread', `[{
      ...{ "slug": "probe" },${fields().replace(/\n    "slug": "probe",/, '')}
    }]`],
    ['call-expression', `[{${fields('["pro", "be"].join("")')}\n    }]`],
    ['iife-expression', `[{${fields('(() => "probe")()')}\n    }]`],
    ['prototype-mutation', `[{
      "__proto__": { "reviewerPrototypeMarker": true },${fields()}
    }]`],
    ['duplicate-property', `[{
      "slug": "shadowed",${fields()}
    }]`],
    ['comment-in-catalog', `[/* lexical decoy ] */ {${fields()}\n    }]`],
    ['method-property', `[{
      "slug"() { return "probe" },${fields().replace(/\n    "slug": "probe",/, '')}
    }]`],
    ['setter-property', `[{
      set "slug"(value) {},${fields().replace(/\n    "slug": "probe",/, '')}
    }]`],
    ['nonliteral-value', `[{${fields('1 + 1')}\n    }]`],
    ['comma-declarator-suffix', `${staticLiteral}, reviewerExtra = (() => "executed")()`],
    ['typescript-assertion-suffix', `${staticLiteral} as unknown as DccIntegration[]`],
    ['executable-statement-suffix', `${staticLiteral}; (() => "executed")()`],
    ['prefix-call', `(() => "executed")();\n${staticLiteral}`],
    ['prefix-declaration', `const reviewerPrefix = (() => "executed")();\n${staticLiteral}`],
    ['comment-declaration-decoy', `/* export const dccIntegrations = */\n${staticLiteral}`],
    ['template-declaration-decoy', `const decoy = \`export const dccIntegrations =\`;\n${staticLiteral}`],
    ['string-declaration-decoy', `const decoy = "export const dccIntegrations =";\n${staticLiteral}`],
    ['repository-call', `${staticLiteral}\nconst repositoryUrl = (() => "executed")()`],
    ['repository-comma', `${staticLiteral}\nconst repositoryUrl = () => "probe", reviewerExtra = (() => "executed")()`],
    ['repository-type-assertion', `${staticLiteral}\nconst repositoryUrl = (() => "probe") as unknown as Function`],
    ['repository-satisfies', `${staticLiteral}\nconst repositoryUrl = (() => "probe") satisfies Function`],
    ['repository-template', `${staticLiteral}\nconst repositoryUrl = \`executed\``],
    ['repository-extra-statement', `${staticLiteral}\n(() => "executed")();`],
    ['trailing-object-comma', `[{${fields()}\n    ,}]`],
    ['trailing-array-comma', `${staticLiteral.slice(0, -1)},]`],
  ]
  for (const [name, source] of rejected) {
    assert.throws(loadSourceCase(name, source), Error, `${name} must be rejected as non-data source`)
  }

  const getter = loadSourceCase('getter-executes', `[{
    get "slug"() { throw new Error("REVIEWER_GETTER_EXECUTED") },${fields().replace(/\n    "slug": "probe",/, '')}
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
