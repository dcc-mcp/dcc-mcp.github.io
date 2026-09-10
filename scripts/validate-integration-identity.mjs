import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  expectedCurrentCoreApplicationRoutes,
  expectedGuideIdentities,
  expectedReleasedDccTypes,
  guideIdentityKey,
} from './site-identity-contract.mjs'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const releaseSnapshot = JSON.parse(readFileSync(
  join(root, 'docs', 'public', 'catalog', 'core-v0.20.25-dcc-types.json'),
  'utf8',
))

const validateReleaseSnapshot = () => {
  const expectedKeys = [
    'schema', 'repository', 'tag', 'commit', 'cli_asset', 'cli_asset_sha256', 'dcc_types',
  ].sort()
  if (JSON.stringify(Object.keys(releaseSnapshot).sort()) !== JSON.stringify(expectedKeys)
      || releaseSnapshot.schema !== 'dcc-mcp-core-dcc-types.v1'
      || releaseSnapshot.repository !== 'https://github.com/dcc-mcp/dcc-mcp-core'
      || releaseSnapshot.tag !== 'v0.20.25'
      || releaseSnapshot.commit !== '05b3c61cf787045f11e4fd49019c2be090e9db78'
      || releaseSnapshot.cli_asset !== 'dcc-mcp-cli-windows-x86_64.exe'
      || releaseSnapshot.cli_asset_sha256 !== '2392a12cb6b809a424c218bcc7cf9841d8f6a17a070761f2a530dcaa4400322'
      || !Array.isArray(releaseSnapshot.dcc_types)
      || JSON.stringify(releaseSnapshot.dcc_types) !== JSON.stringify(expectedReleasedDccTypes)) {
    throw new Error('Core v0.20.25 dcc-types release snapshot differs from the immutable CLI evidence')
  }
}

export const validateIntegrationIdentity = (integrations) => {
  validateReleaseSnapshot()
  const expectedGuideIdentityKeys = expectedGuideIdentities.map(guideIdentityKey).sort()
  const guideIdentityKeys = integrations.map(guideIdentityKey).sort()
  const duplicateGuideIdentities = guideIdentityKeys.filter((identity, index) => (
    index > 0 && identity === guideIdentityKeys[index - 1]
  ))
  const expectedGuideIdentitySet = new Set(expectedGuideIdentityKeys)
  const guideIdentitySet = new Set(guideIdentityKeys)
  const missingGuideIdentities = expectedGuideIdentityKeys.filter((identity) => !guideIdentitySet.has(identity))
  const extraGuideIdentities = [...guideIdentitySet].filter((identity) => !expectedGuideIdentitySet.has(identity)).sort()
  if (duplicateGuideIdentities.length || missingGuideIdentities.length || extraGuideIdentities.length) {
    throw new Error(
      `Public guide identities do not match the frozen ${expectedGuideIdentities.length}-guide contract: `
      + `duplicates=[${[...new Set(duplicateGuideIdentities)].join(';')}] `
      + `missing=[${missingGuideIdentities.join(';')}] `
      + `extra=[${extraGuideIdentities.join(';')}]`,
    )
  }
  if (integrations.length !== expectedGuideIdentities.length) {
    throw new Error(
      `Expected ${expectedGuideIdentities.length} public application and pipeline integrations, found ${integrations.length}`,
    )
  }
  const releasedDccTypes = integrations.flatMap(({ dccType }) => dccType ? [dccType] : []).sort()
  const duplicateReleasedDccTypes = releasedDccTypes.filter((dccType, index) => (
    index > 0 && dccType === releasedDccTypes[index - 1]
  ))
  const expectedReleasedDccTypeSet = new Set(expectedReleasedDccTypes)
  const releasedDccTypeSet = new Set(releasedDccTypes)
  const missingReleasedDccTypes = expectedReleasedDccTypes.filter((dccType) => !releasedDccTypeSet.has(dccType))
  const extraReleasedDccTypes = [...releasedDccTypeSet].filter((dccType) => !expectedReleasedDccTypeSet.has(dccType)).sort()
  if (duplicateReleasedDccTypes.length || missingReleasedDccTypes.length || extraReleasedDccTypes.length) {
    throw new Error(
      'Released project-owned host identifiers do not match dcc-mcp-cli 0.20.25: '
      + `duplicates=[${[...new Set(duplicateReleasedDccTypes)].join(',')}] `
      + `missing=[${missingReleasedDccTypes.join(',')}] `
      + `extra=[${extraReleasedDccTypes.join(',')}]`,
    )
  }
  const currentCoreApplicationRoutes = integrations
    .flatMap(({ coreApplicationRoute }) => coreApplicationRoute ? [coreApplicationRoute] : [])
    .sort()
  if (JSON.stringify(currentCoreApplicationRoutes) !== JSON.stringify(expectedCurrentCoreApplicationRoutes)) {
    throw new Error(
      `Current Core application routes differ: expected=[${expectedCurrentCoreApplicationRoutes.join(',')}] `
      + `actual=[${currentCoreApplicationRoutes.join(',')}]`,
    )
  }
  return integrations
}
