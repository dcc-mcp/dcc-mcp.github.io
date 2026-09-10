import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateSpeedTreeShowcaseProvenance } from './showcase-provenance.mjs'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const provenance = JSON.parse(readFileSync(
  join(root, 'docs', 'public', 'showcase', 'speedtree-to-unreal-engine-provenance.json'),
  'utf8',
))
const derivative = readFileSync(
  join(root, 'docs', 'public', 'showcase', 'speedtree-to-unreal-engine.webp'),
)

validateSpeedTreeShowcaseProvenance(provenance, derivative)

for (const mutation of [
  { ...provenance, unexpected: true },
  { ...provenance, source_repository_commit: '0'.repeat(40) },
  { ...provenance, source_capture_sha256: 'A'.repeat(64) },
  { ...provenance, website_derivative_sha256: '0'.repeat(64) },
]) {
  assert.throws(
    () => validateSpeedTreeShowcaseProvenance(mutation, derivative),
    /SpeedTree showcase/,
  )
}
assert.throws(
  () => validateSpeedTreeShowcaseProvenance(provenance, Buffer.concat([derivative, Buffer.of(0)])),
  /derivative bytes differ/,
)
