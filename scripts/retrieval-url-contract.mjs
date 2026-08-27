import { expectedGuideIdentities } from './site-identity-contract.mjs'

export const canonicalSiteHost = 'dcc-mcp.github.io'
export const firstPartyHosts = Object.freeze(['dcc-mcp.github.io', 'github.com', 'pypi.org'])
export const retrievalLocales = Object.freeze(['en', 'zh-CN'])

export class RetrievalUrlRejectedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RetrievalUrlRejectedError'
    this.code = 'RETRIEVAL_URL_REJECTED'
  }
}

const reject = (message) => { throw new RetrievalUrlRejectedError(message) }
const accepted = (canonical) => ({ accepted: true, firstParty: true, canonical })

const guideByApplication = new Map(expectedGuideIdentities.map((guide) => [guide.name, guide]))
guideByApplication.set('Tuanjie / 团结', guideByApplication.get('Unity'))

const fixedCanonicalPaths = new Set([
  '/',
  '/agents',
  '/developers',
  '/ecosystem',
  '/marketplace',
  '/showcase',
  '/use-cases',
  '/why-dcc-mcp',
  '/zh',
  '/zh/agents',
  '/zh/developers',
  '/zh/ecosystem',
  '/zh/marketplace',
  '/zh/showcase',
  '/zh/use-cases',
  '/zh/why-dcc-mcp',
  ...expectedGuideIdentities.flatMap(({ slug }) => [`/control/${slug}`, `/zh/control/${slug}`]),
])
const fixedGitHubRepositories = new Set([
  ...expectedGuideIdentities.map(({ repository }) => repository),
  'dcc-mcp-agent-plugins',
  'dcc-mcp-core',
  'marketplace',
])
const fixedPyPiPackages = new Set([
  ...expectedGuideIdentities.flatMap(({ repository, marketplacePackage }) => [
    repository,
    ...(marketplacePackage ? [marketplacePackage] : []),
  ]),
  'dcc-mcp-cli',
  'dcc-mcp-core',
])

const applicationGuide = (application) => {
  const guide = guideByApplication.get(application)
  if (!guide) reject(`unknown application identity: ${application}`)
  return guide
}

const parseStrictRetrievalUrl = (rawUrl) => {
  if (typeof rawUrl !== 'string' || rawUrl.trim() !== rawUrl || !rawUrl) {
    reject('invalid retrieval URL: expected one non-empty normalized string')
  }
  if (!/^[\x21-\x7e]+$/.test(rawUrl)) {
    reject('invalid retrieval URL: only normalized printable ASCII is accepted')
  }
  if (rawUrl.includes('\\')) reject('invalid retrieval URL: backslashes are forbidden')
  if (rawUrl.includes('%')) reject('invalid retrieval URL: encoded URL components are forbidden')

  let parsed
  try {
    parsed = new URL(rawUrl)
  } catch {
    reject('invalid retrieval URL: URL parsing failed')
  }
  if (parsed.protocol !== 'https:') reject('invalid retrieval URL: only https URLs are accepted')
  if (parsed.username || parsed.password) reject('invalid retrieval URL: credentials are forbidden')

  const authority = rawUrl.match(/^https:\/\/([^/?#]+)/)?.[1]
  if (!authority) reject('invalid retrieval URL: malformed authority')
  if (/(?:^|\.)xn--/i.test(authority)) reject('invalid retrieval URL: punycode hosts are forbidden')
  if (authority.endsWith('.')) reject('invalid retrieval URL: hostname must not have a trailing dot')
  if (authority !== authority.toLowerCase()) reject('invalid retrieval URL: hostname must be lowercase')
  if (authority.includes(':') || parsed.port !== '') reject('invalid retrieval URL: explicit ports are forbidden')
  if (!firstPartyHosts.includes(parsed.hostname)) {
    reject(`invalid retrieval URL: hostname is not in the frozen first-party allowlist: ${parsed.hostname}`)
  }
  if (parsed.search) reject('invalid retrieval URL: query strings are forbidden')
  if (parsed.hash) reject('invalid retrieval URL: fragments are forbidden')
  if (parsed.pathname.includes('//')) reject('invalid retrieval URL: double-slash paths are forbidden')
  if (rawUrl !== parsed.href) {
    reject(`invalid retrieval URL: raw URL differs from WHATWG normalized form: ${parsed.href}`)
  }
  return parsed
}

export const classifyRetrievalUrl = (rawUrl, { application, locale }) => {
  if (!retrievalLocales.includes(locale)) {
    reject(`invalid retrieval locale: expected en or zh-CN, received ${locale}`)
  }
  const parsed = parseStrictRetrievalUrl(rawUrl)
  const path = parsed.pathname
  const applicationScoped = application !== null && application !== undefined

  if (parsed.hostname === canonicalSiteHost) {
    if (applicationScoped) {
      const guide = applicationGuide(application)
      const expectedPath = locale === 'zh-CN' ? `/zh/control/${guide.slug}` : `/control/${guide.slug}`
      if (path !== expectedPath) {
        reject(`canonical path is not valid for application ${application}: ${path}`)
      }
    } else if (!fixedCanonicalPaths.has(path) && !/^\/dcc-mcp-core\/guide\/[a-z0-9-]+$/.test(path)) {
      reject(`canonical path is not an allowed public retrieval route: ${path}`)
    }
    return accepted(true)
  }

  if (parsed.hostname === 'github.com') {
    const match = /^\/dcc-mcp\/([a-z0-9-]+)$/.exec(path)
    if (!match) reject(`official GitHub URL must be the exact repository root: ${path}`)
    const repository = match[1]
    if (applicationScoped) {
      const guide = applicationGuide(application)
      if (repository !== guide.repository) {
        reject(`official host path is not valid for application ${application}: ${path}`)
      }
    } else if (!fixedGitHubRepositories.has(repository)) {
      reject(`official GitHub repository is not frozen as first-party: ${repository}`)
    }
    return accepted(false)
  }

  const match = /^\/project\/([a-z0-9-]+)$/.exec(path)
  if (!match) reject(`official PyPI URL must be the exact normalized project route: ${path}`)
  const packageName = match[1]
  if (applicationScoped) {
    const guide = applicationGuide(application)
    const allowedPackages = new Set([
      guide.repository,
      ...(guide.marketplacePackage ? [guide.marketplacePackage] : []),
    ])
    if (!allowedPackages.has(packageName)) {
      reject(`official host path is not valid for application ${application}: ${path}`)
    }
  } else if (!fixedPyPiPackages.has(packageName)) {
    reject(`official PyPI package is not frozen as first-party: ${packageName}`)
  }
  return accepted(false)
}
