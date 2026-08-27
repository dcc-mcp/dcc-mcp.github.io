import { readFileSync } from 'node:fs'

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
const prototypeFields = new Set(['__proto__', 'constructor', 'prototype'])

const syntaxError = (message, index) => new Error(`Invalid DCC integration catalog at offset ${index}: ${message}`)
const isIdentifierStart = (character) => /[A-Za-z_$]/.test(character)
const isIdentifierPart = (character) => /[A-Za-z0-9_$]/.test(character)

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
    while (/\s/.test(this.source[this.index] ?? '')) this.index += 1
    const start = this.index
    const character = this.source[this.index]
    const next = this.source[this.index + 1]
    if (character === undefined) return { type: 'eof', value: '', index: start }

    if (character === '/' && next === '/') {
      this.index += 2
      while (this.index < this.source.length && !/[\r\n]/.test(this.source[this.index])) this.index += 1
      return { type: 'comment', value: 'line', index: start }
    }
    if (character === '/' && next === '*') {
      this.index += 2
      const end = this.source.indexOf('*/', this.index)
      if (end === -1) throw syntaxError('unterminated block comment', start)
      this.index = end + 2
      return { type: 'comment', value: 'block', index: start }
    }
    if (character === "'" || character === '"') return this.readString(character, start)
    if (character === '`') return this.readTemplate(start)
    if (isIdentifierStart(character)) {
      this.index += 1
      while (isIdentifierPart(this.source[this.index] ?? '')) this.index += 1
      return { type: 'identifier', value: this.source.slice(start, this.index), index: start }
    }
    if (/[0-9]/.test(character)) {
      this.index += 1
      while (/[0-9A-Za-z_.]/.test(this.source[this.index] ?? '')) this.index += 1
      return { type: 'number', value: this.source.slice(start, this.index), index: start }
    }
    this.index += 1
    return { type: 'punctuator', value: character, index: start }
  }

  readString(quote, start) {
    this.index += 1
    let value = ''
    while (this.index < this.source.length) {
      const character = this.source[this.index]
      if (character === quote) {
        this.index += 1
        return { type: 'string', value, index: start }
      }
      if (/[\r\n]/.test(character)) throw syntaxError('unterminated string literal', start)
      if (character !== '\\') {
        value += character
        this.index += 1
        continue
      }
      const escapeIndex = this.index
      const escaped = this.source[this.index + 1]
      const simpleEscapes = {
        "'": "'",
        '"': '"',
        '\\': '\\',
        n: '\n',
        r: '\r',
        t: '\t',
        b: '\b',
        f: '\f',
        v: '\v',
        0: '\0',
      }
      if (Object.hasOwn(simpleEscapes, escaped)) {
        value += simpleEscapes[escaped]
        this.index += 2
        continue
      }
      if (escaped === 'u') {
        const digits = this.source.slice(this.index + 2, this.index + 6)
        if (!/^[0-9A-Fa-f]{4}$/.test(digits)) throw syntaxError('invalid Unicode escape', escapeIndex)
        value += String.fromCharCode(Number.parseInt(digits, 16))
        this.index += 6
        continue
      }
      if (escaped === 'x') {
        const digits = this.source.slice(this.index + 2, this.index + 4)
        if (!/^[0-9A-Fa-f]{2}$/.test(digits)) throw syntaxError('invalid hexadecimal escape', escapeIndex)
        value += String.fromCharCode(Number.parseInt(digits, 16))
        this.index += 4
        continue
      }
      throw syntaxError('unsupported string escape', escapeIndex)
    }
    throw syntaxError('unterminated string literal', start)
  }

  readTemplate(start) {
    this.index += 1
    let escaped = false
    while (this.index < this.source.length) {
      const character = this.source[this.index]
      this.index += 1
      if (escaped) escaped = false
      else if (character === '\\') escaped = true
      else if (character === '`') return { type: 'template', value: '', index: start }
    }
    throw syntaxError('unterminated template literal', start)
  }
}

const tokenMatches = (token, type, value) => token.type === type && token.value === value
const declarationTokens = Object.freeze([
  ['identifier', 'export'],
  ['identifier', 'const'],
  ['identifier', 'dccIntegrations'],
  ['punctuator', ':'],
  ['identifier', 'DccIntegration'],
  ['punctuator', '['],
  ['punctuator', ']'],
  ['punctuator', '='],
])

const locateCatalogDeclaration = (lexer) => {
  let matched = 0
  while (true) {
    const token = lexer.next()
    if (token.type === 'eof') throw syntaxError('catalog declaration was not found', token.index)
    const [type, value] = declarationTokens[matched]
    if (tokenMatches(token, type, value)) {
      matched += 1
      if (matched === declarationTokens.length) return
    } else {
      matched = tokenMatches(token, ...declarationTokens[0]) ? 1 : 0
    }
  }
}

const expectToken = (lexer, type, value, message) => {
  const token = lexer.next()
  if (!tokenMatches(token, type, value)) throw syntaxError(message, token.index)
  return token
}

const parseStringArray = (lexer, field) => {
  expectToken(lexer, 'punctuator', '[', `${field} must be a direct array of string literals`)
  const values = []
  while (!tokenMatches(lexer.peek(), 'punctuator', ']')) {
    const value = lexer.next()
    if (value.type !== 'string') throw syntaxError(`${field} entries must be direct string literals`, value.index)
    values.push(value.value)
    const separator = lexer.peek()
    if (tokenMatches(separator, 'punctuator', ',')) {
      lexer.next()
      if (tokenMatches(lexer.peek(), 'punctuator', ']')) break
    } else if (!tokenMatches(separator, 'punctuator', ']')) {
      throw syntaxError(`${field} entries must be comma-separated`, separator.index)
    }
  }
  expectToken(lexer, 'punctuator', ']', `${field} array is not closed`)
  return values
}

const parseIntegration = (lexer, index) => {
  expectToken(lexer, 'punctuator', '{', `integration ${index} must be a direct object literal`)
  const integration = Object.create(null)
  const seen = new Set()
  while (!tokenMatches(lexer.peek(), 'punctuator', '}')) {
    const key = lexer.next()
    if (key.type !== 'identifier') {
      throw syntaxError(`integration ${index} property keys must be direct identifiers`, key.index)
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
    expectToken(lexer, 'punctuator', ':', `integration ${index} field ${key.value} must use a direct value`)
    if (taskFields.includes(key.value)) {
      integration[key.value] = parseStringArray(lexer, key.value)
    } else {
      const value = lexer.next()
      if (value.type !== 'string') {
        throw syntaxError(`integration ${index} field ${key.value} must be a direct string literal`, value.index)
      }
      integration[key.value] = value.value
    }
    const separator = lexer.peek()
    if (tokenMatches(separator, 'punctuator', ',')) {
      lexer.next()
      if (tokenMatches(lexer.peek(), 'punctuator', '}')) break
    } else if (!tokenMatches(separator, 'punctuator', '}')) {
      throw syntaxError(`integration ${index} properties must be comma-separated`, separator.index)
    }
  }
  expectToken(lexer, 'punctuator', '}', `integration ${index} object is not closed`)
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

const parseCatalog = (lexer) => {
  expectToken(lexer, 'punctuator', '[', 'catalog initializer must be a direct array literal')
  const integrations = []
  while (!tokenMatches(lexer.peek(), 'punctuator', ']')) {
    integrations.push(validateIntegration(parseIntegration(lexer, integrations.length), integrations.length))
    const separator = lexer.peek()
    if (tokenMatches(separator, 'punctuator', ',')) {
      lexer.next()
      if (tokenMatches(lexer.peek(), 'punctuator', ']')) break
    } else if (!tokenMatches(separator, 'punctuator', ']')) {
      throw syntaxError('catalog integrations must be comma-separated', separator.index)
    }
  }
  expectToken(lexer, 'punctuator', ']', 'catalog array is not closed')
  return Object.freeze(integrations)
}

export const loadIntegrationCatalog = (path) => {
  const source = readFileSync(path, 'utf8')
  const firstDeclaration = source.indexOf(declaration)
  if (firstDeclaration === -1 || firstDeclaration !== source.lastIndexOf(declaration)) {
    throw new Error('Expected exactly one DCC integration catalog declaration')
  }
  const lexer = new CatalogLexer(source)
  locateCatalogDeclaration(lexer)
  return parseCatalog(lexer)
}
