import {
  closeSync,
  constants,
  fstatSync,
  lstatSync,
  openSync,
  readFileSync,
} from 'node:fs'
import { TextDecoder } from 'node:util'

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
const prototypeFields = new Set(['__proto__', 'constructor', 'prototype'])

export const integrationCatalogLimits = Object.freeze({
  maxBytes: 128 * 1024,
  maxIntegrations: 64,
  maxStringCodeUnits: 4096,
  maxArrayItems: 3,
  maxNesting: 3,
})

const syntaxError = (message, index) => new Error(`Invalid DCC integration catalog at offset ${index}: ${message}`)
const strictUtf8Decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true })

const validateDecodedString = (value, index) => {
  for (let offset = 0; offset < value.length; offset += 1) {
    const codeUnit = value.charCodeAt(offset)
    if (codeUnit <= 0x1f || (codeUnit >= 0x7f && codeUnit <= 0x9f)) {
      throw syntaxError('decoded control character in string', index)
    }
    if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
      const lowSurrogate = value.charCodeAt(offset + 1)
      if (lowSurrogate < 0xdc00 || lowSurrogate > 0xdfff) {
        throw syntaxError('unpaired high surrogate in string', index)
      }
      offset += 1
    } else if (codeUnit >= 0xdc00 && codeUnit <= 0xdfff) {
      throw syntaxError('unpaired low surrogate in string', index)
    }
  }
  return value
}

class CatalogLexer {
  constructor(source) {
    this.source = source
    this.index = 0
    this.lookahead = null
  }

  next() {
    if (this.lookahead) {
      const token = this.lookahead
      this.lookahead = null
      return token
    }
    return this.readToken()
  }

  peek() {
    this.lookahead ??= this.readToken()
    return this.lookahead
  }

  readToken() {
    while (/[ \t\r\n]/.test(this.source[this.index] ?? '')) this.index += 1
    const start = this.index
    const character = this.source[this.index]
    if (character === undefined) return { type: 'eof', value: '', index: start }
    if (character === '"') return this.readString(start)
    if (character === '-' || /[0-9]/.test(character)) {
      this.index += 1
      while (/[0-9A-Za-z+._-]/.test(this.source[this.index] ?? '')) this.index += 1
      return { type: 'number', value: this.source.slice(start, this.index), index: start }
    }
    if (/[A-Za-z_$]/.test(character)) {
      this.index += 1
      while (/[A-Za-z0-9_$]/.test(this.source[this.index] ?? '')) this.index += 1
      return { type: 'identifier', value: this.source.slice(start, this.index), index: start }
    }
    this.index += 1
    return { type: 'punctuator', value: character, index: start }
  }

  readString(start) {
    this.index += 1
    const chunks = []
    let codeUnits = 0
    const append = (chunk, index) => {
      codeUnits += chunk.length
      if (codeUnits > integrationCatalogLimits.maxStringCodeUnits) {
        throw syntaxError(
          `string exceeds ${integrationCatalogLimits.maxStringCodeUnits} code units`,
          index,
        )
      }
      chunks.push(chunk)
    }
    while (this.index < this.source.length) {
      const character = this.source[this.index]
      if (character === '"') {
        this.index += 1
        const value = chunks.join('')
        return { type: 'string', value: validateDecodedString(value, start), index: start }
      }
      if (character.charCodeAt(0) < 0x20) throw syntaxError('unescaped control character in string', this.index)
      if (character !== '\\') {
        append(character, this.index)
        this.index += 1
        continue
      }
      const escapeIndex = this.index
      const escaped = this.source[this.index + 1]
      const simpleEscapes = {
        '"': '"',
        '\\': '\\',
        '/': '/',
        b: '\b',
        f: '\f',
        n: '\n',
        r: '\r',
        t: '\t',
      }
      if (Object.hasOwn(simpleEscapes, escaped)) {
        append(simpleEscapes[escaped], escapeIndex)
        this.index += 2
        continue
      }
      if (escaped === 'u') {
        const digits = this.source.slice(this.index + 2, this.index + 6)
        if (!/^[0-9A-Fa-f]{4}$/.test(digits)) throw syntaxError('invalid Unicode escape', escapeIndex)
        append(String.fromCharCode(Number.parseInt(digits, 16)), escapeIndex)
        this.index += 6
        continue
      }
      throw syntaxError('unsupported JSON string escape', escapeIndex)
    }
    throw syntaxError('unterminated string literal', start)
  }
}

const tokenMatches = (token, type, value) => token.type === type && token.value === value
const assertNesting = (depth, index) => {
  if (depth > integrationCatalogLimits.maxNesting) {
    throw syntaxError(`nesting exceeds ${integrationCatalogLimits.maxNesting}`, index)
  }
}
const expectToken = (lexer, type, value, message) => {
  const token = lexer.next()
  if (!tokenMatches(token, type, value)) throw syntaxError(message, token.index)
  return token
}

const parseStringArray = (lexer, field, depth) => {
  assertNesting(depth, lexer.peek().index)
  expectToken(lexer, 'punctuator', '[', `${field} must be a direct JSON array`)
  const values = []
  if (tokenMatches(lexer.peek(), 'punctuator', ']')) {
    lexer.next()
    return values
  }
  while (true) {
    if (values.length >= integrationCatalogLimits.maxArrayItems) {
      throw new Error(
        `Invalid DCC integration catalog: ${field} exceeds ${integrationCatalogLimits.maxArrayItems} items`,
      )
    }
    const value = lexer.next()
    if (value.type === 'punctuator' && (value.value === '[' || value.value === '{')) {
      assertNesting(depth + 1, value.index)
    }
    if (value.type !== 'string') throw syntaxError(`${field} entries must be JSON strings`, value.index)
    values.push(value.value)
    const separator = lexer.next()
    if (tokenMatches(separator, 'punctuator', ']')) return values
    if (!tokenMatches(separator, 'punctuator', ',')) {
      throw syntaxError(`${field} entries must be comma-separated`, separator.index)
    }
    if (tokenMatches(lexer.peek(), 'punctuator', ']')) {
      throw syntaxError(`${field} must not contain a trailing comma`, lexer.peek().index)
    }
  }
}

const parseIntegration = (lexer, index, depth) => {
  assertNesting(depth, lexer.peek().index)
  expectToken(lexer, 'punctuator', '{', `integration ${index} must be a JSON object`)
  const integration = Object.create(null)
  const seen = new Set()
  if (tokenMatches(lexer.peek(), 'punctuator', '}')) lexer.next()
  else {
    while (true) {
      const key = lexer.next()
      if (key.type !== 'string') {
        throw syntaxError(`integration ${index} property keys must be JSON strings`, key.index)
      }
      if (prototypeFields.has(key.value)) {
        throw syntaxError(`integration ${index} contains a forbidden prototype key: ${key.value}`, key.index)
      }
      if (!allowedFields.has(key.value)) {
        throw syntaxError(`integration ${index} has an unexpected field: ${key.value}`, key.index)
      }
      if (seen.has(key.value)) {
        throw syntaxError(`integration ${index} has a duplicate field: ${key.value}`, key.index)
      }
      seen.add(key.value)
      expectToken(lexer, 'punctuator', ':', `integration ${index} field ${key.value} requires a colon`)
      if (taskFields.includes(key.value)) integration[key.value] = parseStringArray(lexer, key.value, depth + 1)
      else {
        const value = lexer.next()
        if (value.type !== 'string') {
          throw syntaxError(`integration ${index} field ${key.value} must be a JSON string`, value.index)
        }
        integration[key.value] = value.value
      }
      const separator = lexer.next()
      if (tokenMatches(separator, 'punctuator', '}')) break
      if (!tokenMatches(separator, 'punctuator', ',')) {
        throw syntaxError(`integration ${index} properties must be comma-separated`, separator.index)
      }
      if (tokenMatches(lexer.peek(), 'punctuator', '}')) {
        throw syntaxError(`integration ${index} must not contain a trailing comma`, lexer.peek().index)
      }
    }
  }
  return integration
}

const validateIntegration = (integration, index) => {
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
  return Object.freeze(integration)
}

const parseCatalog = (lexer, depth = 1) => {
  assertNesting(depth, lexer.peek().index)
  expectToken(lexer, 'punctuator', '[', 'catalog must begin with a JSON array')
  const integrations = []
  if (tokenMatches(lexer.peek(), 'punctuator', ']')) lexer.next()
  else {
    while (true) {
      if (integrations.length >= integrationCatalogLimits.maxIntegrations) {
        throw new Error(
          `Invalid DCC integration catalog: catalog exceeds ${integrationCatalogLimits.maxIntegrations} integrations`,
        )
      }
      integrations.push(validateIntegration(
        parseIntegration(lexer, integrations.length, depth + 1),
        integrations.length,
      ))
      const separator = lexer.next()
      if (tokenMatches(separator, 'punctuator', ']')) break
      if (!tokenMatches(separator, 'punctuator', ',')) {
        throw syntaxError('catalog integrations must be comma-separated', separator.index)
      }
      if (tokenMatches(lexer.peek(), 'punctuator', ']')) {
        throw syntaxError('catalog must not contain a trailing comma', lexer.peek().index)
      }
    }
  }
  const trailing = lexer.next()
  if (trailing.type !== 'eof') throw syntaxError('catalog must end immediately after the JSON array', trailing.index)
  return Object.freeze(integrations)
}

export const parseIntegrationCatalogBytes = (bytes) => {
  if (bytes.byteLength > integrationCatalogLimits.maxBytes) {
    throw new Error(`Invalid DCC integration catalog: catalog exceeds ${integrationCatalogLimits.maxBytes} bytes`)
  }
  let source
  try {
    // Preserve a BOM as U+FEFF so the byte-zero array contract rejects it.
    source = strictUtf8Decoder.decode(bytes)
  } catch {
    throw new Error('Invalid DCC integration catalog: malformed UTF-8')
  }
  return parseCatalog(new CatalogLexer(source))
}

const sameFileIdentity = (left, right) => (
  left.dev === right.dev
  && left.ino === right.ino
  && left.size === right.size
  && left.mtimeNs === right.mtimeNs
)

export const readIntegrationCatalogSnapshot = (path) => {
  const initial = lstatSync(path, { bigint: true })
  if (!initial.isFile() || initial.isSymbolicLink()) {
    throw new Error('Invalid DCC integration catalog: source must be a regular file')
  }
  if (initial.nlink !== 1n) {
    throw new Error('Invalid DCC integration catalog: hardlinked source is forbidden')
  }
  if (initial.size > BigInt(integrationCatalogLimits.maxBytes)) {
    throw new Error(`Invalid DCC integration catalog: catalog exceeds ${integrationCatalogLimits.maxBytes} bytes`)
  }
  const descriptor = openSync(path, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0))
  try {
    const opened = fstatSync(descriptor, { bigint: true })
    if (!sameFileIdentity(initial, opened)) {
      throw new Error('Invalid DCC integration catalog: source identity changed before read')
    }
    const bytes = readFileSync(descriptor)
    const afterRead = fstatSync(descriptor, { bigint: true })
    const currentPath = lstatSync(path, { bigint: true })
    if (!sameFileIdentity(opened, afterRead) || !sameFileIdentity(afterRead, currentPath)) {
      throw new Error('Invalid DCC integration catalog: source identity changed during read')
    }
    return Object.freeze({
      bytes,
      integrations: parseIntegrationCatalogBytes(bytes),
    })
  } finally {
    closeSync(descriptor)
  }
}

export const loadIntegrationCatalog = (path) => readIntegrationCatalogSnapshot(path).integrations
