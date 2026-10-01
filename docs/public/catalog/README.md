# Versioned catalog evidence

`core-v0.20.38-dcc-types.json` records the actual output of the official Windows
CLI 0.20.38 on 2026-10-01. Its executable SHA-256 matches the GitHub release
asset digest. The CLI verified the signed **remote** catalog at revision
`60c96cce4ed949eb8412ebd67119853e77dbafee`; this is not a claim about the
unchanged bundled catalog inside the executable.

The v2 record retains all 38 adapter definitions, including their names,
versions, repository URLs and `catalog_install_available` flags. Thirty-three
have installable catalog artifacts; five do not: Kdenlive, Material Maker,
PowerPoint, Tiled and Wwise. Listing a definition does not establish live-host
readiness or tool-execution acceptance. Office, external read-only connectors,
independent integrations and Marketplace Skills remain separate categories.

Reproduce an observation using the verified release asset without upgrading an
existing installation or starting a gateway:

```sh
dcc-mcp-cli --no-auto-gateway --output json --non-interactive dcc-types
```

The remote catalog may advance. Preserve its returned revision, digest and
validity timestamps alongside the CLI release identity when refreshing this
snapshot. The stored projection omits unrelated Marketplace update notices.
Website validation pins the snapshot bytes and rejects altered descriptor,
installation-status or provenance evidence.

`independent-releases-2026-10-01.json` preserves the owning repositories' actual
GitHub release identities and source commits. This metadata review did not
re-run licensed DCC hosts, editor operations, rendering or engine import.

## Historical observation

`core-v0.20.25-dcc-types.json` records the 37 adapter-backed identifiers returned
by the official DCC-MCP Core 0.20.25 Windows CLI. The record binds the release
tag and commit together with the downloaded CLI asset name and SHA-256. Website
validation treats Office and external read-only connectors as separate route
classes rather than adding them to this CLI result.
