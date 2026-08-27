import { expectedGuideIdentities } from './site-identity-contract.mjs'

export const canonicalSiteHost = 'dcc-mcp.github.io'
export const firstPartyHosts = Object.freeze(['dcc-mcp.github.io', 'github.com', 'pypi.org'])
export class RetrievalUrlRejectedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RetrievalUrlRejectedError'
    this.code = 'RETRIEVAL_URL_REJECTED'
  }
}
const reject = (message) => { throw new RetrievalUrlRejectedError(message) }

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
  ...expectedGuideIdentities.map(({ repository }) => repository.toLowerCase()),
  'dcc-mcp-agent-plugins',
  'dcc-mcp-core',
  'marketplace',
])
const fixedPyPiPackages = new Set([
  ...expectedGuideIdentities.flatMap(({ repository, marketplacePackage }) => [
    repository.toLowerCase(),
    ...(marketplacePackage ? [marketplacePackage.toLowerCase()] : []),
  ]),
  'dcc-mcp-cli',
  'dcc-mcp-core',
])

const invalidPathSegments = new Set(['redirect', 'search', 'search-result', 'webcache'])
const normalizedPath = (pathname) => pathname === '/' ? '/' : pathname.replace(/\/$/, '')

const parseStrictRetrievalUrl = (rawUrl) => {
  if (typeof rawUrl !== 'string' || rawUrl.trim() !== rawUrl || !rawUrl) {
    reject('invalid retrieval URL: expected one non-empty normalized string')
  }
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
  const rawHost = authority.replace(/:\d+$/, '')
  if (/(?:^|\.)xn--/i.test(rawHost)) reject('invalid retrieval URL: punycode hosts are forbidden')
  if (rawHost !== rawHost.toLowerCase()) reject('invalid retrieval URL: hostname must be lowercase')
  if (rawHost.endsWith('.')) reject('invalid retrieval URL: hostname must not have a trailing dot')
  if (/:443$/.test(authority)) reject('invalid retrieval URL: explicit default port is forbidden')
  if (rawUrl.includes('%')) reject('invalid retrieval URL: encoded URL components are forbidden')

  const pathSegments = parsed.pathname.toLowerCase().split('/').filter(Boolean)
  const cacheHost = parsed.hostname.split('.').some((label) => label.includes('cache'))
  if (cacheHost || pathSegments.some((segment) => invalidPathSegments.has(segment))) {
    if (cacheHost) reject('invalid retrieval URL: cache URLs are forbidden')
    if (pathSegments.includes('search')) reject('invalid retrieval URL: search-result URLs are forbidden')
    reject('invalid retrieval URL: redirect or cache paths are forbidden')
  }
  if (parsed.search) reject('invalid retrieval URL: query strings are forbidden')
  if (parsed.hash) reject('invalid retrieval URL: fragments are forbidden')
  return parsed
}

const applicationGuide = (application) => {
  const guide = guideByApplication.get(application)
  if (!guide) throw new Error(`unknown application identity: ${application}`)
  return guide
}

export const classifyRetrievalUrl = (rawUrl, { application, locale }) => {
  const parsed = parseStrictRetrievalUrl(rawUrl)
  const path = normalizedPath(parsed.pathname)
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
    return { firstParty: true, canonical: true }
  }

  if (parsed.hostname === 'github.com') {
    const [, owner, repository] = path.split('/')
    if (owner?.toLowerCase() !== 'dcc-mcp' || !repository) return { firstParty: false, canonical: false }
    if (applicationScoped) {
      const guide = applicationGuide(application)
      if (repository.toLowerCase() !== guide.repository.toLowerCase()) {
        reject(`official host path is not valid for application ${application}: ${path}`)
      }
    } else if (!fixedGitHubRepositories.has(repository.toLowerCase())) {
      reject(`official GitHub repository is not frozen as first-party: ${repository}`)
    }
    return { firstParty: true, canonical: false }
  }

  if (parsed.hostname === 'pypi.org') {
    const match = /^\/project\/([^/]+)$/.exec(path)
    if (!match) reject(`official PyPI path is not a project route: ${path}`)
    const packageName = match[1].toLowerCase()
    if (applicationScoped) {
      const guide = applicationGuide(application)
      const allowedPackages = new Set([
        guide.repository.toLowerCase(),
        ...(guide.marketplacePackage ? [guide.marketplacePackage.toLowerCase()] : []),
      ])
      if (!allowedPackages.has(packageName)) {
        reject(`official host path is not valid for application ${application}: ${path}`)
      }
    } else if (!fixedPyPiPackages.has(packageName)) {
      reject(`official PyPI package is not frozen as first-party: ${packageName}`)
    }
    return { firstParty: true, canonical: false }
  }

  return { firstParty: false, canonical: false }
}
