import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

const declaration = 'export const dccIntegrations: DccIntegration[] ='
const requiredStringFields = Object.freeze([
  'slug',
  'name',
  'repository',
  'summaryEn',
  'summaryZh',
])
const optionalStringFields = Object.freeze([
  'dccType',
  'marketplacePackage',
  'vendorCaseEn',
  'vendorCaseZh',
])
const taskFields = Object.freeze(['tasksEn', 'tasksZh'])
const allowedFields = new Set([...requiredStringFields, ...optionalStringFields, ...taskFields])

const arrayLiteralEnd = (source, start) => {
  let depth = 0
  let quote = null
  let escaped = false
  let lineComment = false
  let blockComment = false
  for (let index = start; index < source.length; index += 1) {
    const character = source[index]
    const next = source[index + 1]
    if (lineComment) {
      if (character === '\n') lineComment = false
      continue
    }
    if (blockComment) {
      if (character === '*' && next === '/') {
        blockComment = false
        index += 1
      }
      continue
    }
    if (quote) {
      if (escaped) escaped = false
      else if (character === '\\') escaped = true
      else if (character === quote) quote = null
      continue
    }
    if (character === '/' && next === '/') {
      lineComment = true
      index += 1
      continue
    }
    if (character === '/' && next === '*') {
      blockComment = true
      index += 1
      continue
    }
    if (character === "'" || character === '"') {
      quote = character
      continue
    }
    if (character === '`') throw new Error('DCC integration catalog must use static string literals')
    if (character === '[') depth += 1
    if (character === ']') {
      depth -= 1
      if (depth === 0) return index
    }
  }
  throw new Error('Could not locate the end of the DCC integration catalog array')
}

const validateIntegration = (integration, index) => {
  if (!integration || typeof integration !== 'object' || Array.isArray(integration)) {
    throw new Error(`DCC integration ${index} must be a static object`)
  }
  const unexpectedFields = Object.keys(integration).filter((field) => !allowedFields.has(field))
  if (unexpectedFields.length) {
    throw new Error(`DCC integration ${index} has unexpected fields: ${unexpectedFields.join(',')}`)
  }
  for (const field of requiredStringFields) {
    if (typeof integration[field] !== 'string' || !integration[field]) {
      throw new Error(`DCC integration ${index} requires a non-empty ${field}`)
    }
  }
  for (const field of optionalStringFields) {
    if (integration[field] !== undefined && (typeof integration[field] !== 'string' || !integration[field])) {
      throw new Error(`DCC integration ${index} has an invalid ${field}`)
    }
  }
  for (const field of taskFields) {
    if (!Array.isArray(integration[field])
      || integration[field].length !== 3
      || integration[field].some((task) => typeof task !== 'string' || !task)) {
      throw new Error(`DCC integration ${index} requires exactly three non-empty ${field} entries`)
    }
  }
  return integration
}

export const loadIntegrationCatalog = (path) => {
  const source = readFileSync(path, 'utf8')
  const declarationIndex = source.indexOf(declaration)
  if (declarationIndex === -1 || declarationIndex !== source.lastIndexOf(declaration)) {
    throw new Error('Expected exactly one DCC integration catalog declaration')
  }
  const start = source.indexOf('[', declarationIndex + declaration.length)
  if (start === -1) throw new Error('Could not locate the DCC integration catalog array')
  const end = arrayLiteralEnd(source, start)
  const literal = source.slice(start, end + 1)
  let integrations
  try {
    integrations = runInNewContext(`(${literal})`, Object.create(null), {
      timeout: 1000,
      contextCodeGeneration: { strings: false, wasm: false },
    })
  } catch (error) {
    throw new Error(`DCC integration catalog is not a static literal: ${error.message}`)
  }
  if (!Array.isArray(integrations)) throw new Error('DCC integration catalog must be an array')
  return integrations.map(validateIntegration)
}
