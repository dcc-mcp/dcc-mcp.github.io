import { createHash } from 'node:crypto'

const expectedKeys = Object.freeze([
  'capture_composition',
  'collision_scale_verified',
  'dynamic_wind_verified',
  'final_dimensions_verified',
  'final_mesh_height_cm',
  'schema',
  'source_application',
  'source_asset',
  'source_capture_sha256',
  'source_composite_sha256',
  'source_repository',
  'source_repository_commit',
  'source_repository_image',
  'source_repository_provenance',
  'source_spm_sha256',
  'target_application',
  'target_kind',
  'target_render_sha256',
  'website_derivative_sha256',
].sort())

const hashFields = Object.freeze([
  'source_spm_sha256',
  'source_capture_sha256',
  'target_render_sha256',
  'source_composite_sha256',
  'website_derivative_sha256',
])

export const validateSpeedTreeShowcaseProvenance = (provenance, derivativeBytes) => {
  if (!provenance || typeof provenance !== 'object' || Array.isArray(provenance)) {
    throw new Error('SpeedTree showcase provenance must be an object')
  }
  if (JSON.stringify(Object.keys(provenance).sort()) !== JSON.stringify(expectedKeys)) {
    throw new Error('SpeedTree showcase provenance fields differ')
  }
  if (provenance.schema !== 'dcc-showcase-provenance.v1'
      || provenance.source_repository !== 'https://github.com/dcc-mcp/dcc-mcp-speedtree'
      || provenance.source_repository_commit !== '7d3136a344c12dcb0ba4d8c71d133a2140af0efe'
      || provenance.source_repository_image !== 'docs/images/speedtree-to-unreal.png'
      || provenance.source_repository_provenance !== 'docs/showcase-provenance.json') {
    throw new Error('SpeedTree showcase source identity differs')
  }
  for (const field of hashFields) {
    if (!/^[0-9a-f]{64}$/.test(provenance[field])) {
      throw new Error(`SpeedTree showcase ${field} must be a lowercase SHA-256`)
    }
  }
  if (typeof provenance.dynamic_wind_verified !== 'boolean'
      || typeof provenance.final_dimensions_verified !== 'boolean'
      || typeof provenance.collision_scale_verified !== 'boolean'
      || typeof provenance.final_mesh_height_cm !== 'number'
      || !Number.isFinite(provenance.final_mesh_height_cm)) {
    throw new Error('SpeedTree showcase verification fields differ')
  }
  const derivativeHash = createHash('sha256').update(derivativeBytes).digest('hex')
  if (derivativeHash !== provenance.website_derivative_sha256) {
    throw new Error('SpeedTree showcase derivative bytes differ from provenance')
  }
  return provenance
}
