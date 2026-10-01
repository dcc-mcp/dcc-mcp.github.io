import { createHash } from 'node:crypto'
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
const releaseSnapshotBytes = readFileSync(
  join(root, 'docs', 'public', 'catalog', 'core-v0.20.39-dcc-types.json'),
)
const releaseSnapshot = JSON.parse(releaseSnapshotBytes.toString('utf8'))

const validateReleaseSnapshot = () => {
  const snapshotHash = createHash('sha256').update(releaseSnapshotBytes).digest('hex')
  const snapshotDccTypes = releaseSnapshot.dcc_types.map((row) => row.dcc_type)
  const installableCount = releaseSnapshot.dcc_types.flatMap((row) => row.adapters)
    .filter((adapter) => adapter.catalog_install_available).length
  if (snapshotHash !== 'd6b563c44bdcafbe9bb3fbd7034d82a49da1ca0933361dafc0c9a1411d1b70a7'
      || releaseSnapshot.schema !== 'dcc-mcp-core-dcc-types.v2'
      || releaseSnapshot.tag !== 'v0.20.39'
      || releaseSnapshot.commit !== '60c96cce4ed949eb8412ebd67119853e77dbafee'
      || releaseSnapshot.cli_asset_sha256 !== 'fd258c1a10bcbe9727e5ebc28a83cfba93cd3bccf97d1f7c4094bbe29d97ef65'
      || releaseSnapshot.catalog.source !== 'remote'
      || releaseSnapshot.catalog.source_revision !== '60c96cce4ed949eb8412ebd67119853e77dbafee'
      || releaseSnapshot.catalog.sha256 !== '813d18d7e36bbe3054d88e7cf24830cb0371062d9c20fb459c23d908f1e1c9d0'
      || releaseSnapshot.total !== 38 || installableCount !== 33
      || JSON.stringify(snapshotDccTypes) !== JSON.stringify(expectedReleasedDccTypes)) {
    throw new Error('Core v0.20.39 dcc-types catalog snapshot differs from the immutable CLI evidence')
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
      'Catalog-listed project-owned identifiers do not match dcc-mcp-cli 0.20.39: '
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
