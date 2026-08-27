import {
  expectedGuideIdentities,
  expectedReleasedDccTypes,
  guideIdentityKey,
} from './site-identity-contract.mjs'

export const validateIntegrationIdentity = (integrations) => {
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
      'Public guide identities do not match the frozen 36-guide contract: '
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
      'Released host identifiers do not match dcc-mcp-cli 0.20.21: '
      + `duplicates=[${[...new Set(duplicateReleasedDccTypes)].join(',')}] `
      + `missing=[${missingReleasedDccTypes.join(',')}] `
      + `extra=[${extraReleasedDccTypes.join(',')}]`,
    )
  }
  return integrations
}
