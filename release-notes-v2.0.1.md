# SE Ranking n8n Node - v2.0.1

## Bug Fixes

Patch release fixing three operations found during post-v2.0.0 testing on self-hosted n8n.

### Fixed: Keyword Groups → Move Keywords (was 400)

The operation returned `400 Bad Request - No keywords ids in request`. The API expects the body key `keywords_ids` (plural), but the request was sending `keyword_ids`. Corrected.

| Before | After |
|---|---|
| Body key `keyword_ids` → 400 | Body key `keywords_ids` → 204 |

### Fixed: Sub-Account → Share Projects (was 400)

The operation returned `400 Bad Request - site_ids: This value should be of type integer` when sharing projects. The API requires `site_ids` as a **single integer** per request, not an array. The operation now loops one request per site ID, so multiple comma-separated site IDs work as expected.

### Fixed: Backlink Checker → Move to Group (missing field)

The **Target Group ID** field was missing from the operation's UI, so the destination group could not be set. Added the field — you can now specify which backlink group to move backlinks/groups into.

---

## Upgrade

```bash
npm update @seranking/n8n-nodes-seranking
```

Then restart n8n. No credential or workflow changes needed — this is a bugfix-only release on top of v2.0.0.

## Node Totals

- 21 resources, 190 operations on the unified API
- Published with npm provenance attestation via GitHub Actions OIDC Trusted Publishing
