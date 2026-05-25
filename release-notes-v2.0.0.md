# SE Ranking n8n Node - v2.0.0

## API Unification — Single Host, Single Credential

SE Ranking unified their Data API and Project API onto a single host (`api.seranking.com`). This release migrates the n8n node to match — one credential, one host, all 190 operations. Total operations: 180 → 190.

---

## What's New in v2.0.0

### Single Credential (Breaking Change)

The node now uses **one credential** for everything. The old dual-credential setup (`SE Ranking API` + `SE Ranking Project API`) is replaced by a single `SE Ranking API` credential.

| Before (v1.5.13) | After (v2.0.0) |
|---|---|
| 2 credentials (`seRankingApi` + `seRankingProjectApi`) | 1 credential (`seRankingApi`) |
| 2 hosts (`api.seranking.com` + `api4.seranking.com`) | 1 host (`api.seranking.com`) |
| Credential slot switches based on resource | One slot for all resources |

### Single Unified API Host

All 15 Project API operation files rewritten to use the unified `api.seranking.com/v1` host with the new `/project-management/` path namespace. HTTP methods updated where SE Ranking changed them (PUT → PATCH for update operations).

### NEW: 10 Additional Operations

#### Project Management (2 new)

| Operation | Description |
|---|---|
| List Check Dates | Get actual ranking check dates within a date range |
| Get Ranking Trends | Time-series ranking metrics (avg position, visibility, visibility %, top 10 count, top 10 %) with per-engine or cross-engine aggregation |

#### Website Audit - Project (8 new)

| Operation | Description |
|---|---|
| Get Audit Settings | Retrieve full audit configuration (crawl sources, limits, thresholds, schedule) |
| Update Audit Settings | Partially update audit configuration — send only changed fields |
| Reset Audit Settings | Restore all audit settings to defaults |
| List Audit Sitemaps | List configured sitemap crawl sources |
| Add Audit Sitemap | Register a sitemap URL as a crawl source |
| Delete Audit Sitemap | Remove a sitemap from crawl sources |
| List Audit Source Pages | List uploaded custom page lists |
| Delete Audit Source Pages | Remove an uploaded custom page list |

#### AI Result Tracker

| Operation | Enhancement |
|---|---|
| Get Prompt Rankings | New `mode` parameter: set to "Aggregated by Group" to get time-series presence metrics (mention_presence/link_presence as percentages) per prompt group instead of per-prompt rankings |

### Bug Fixes

#### Update Audit Title — Fixed (was 400 since April 2026)

| Before | After |
|---|---|
| Every attempt returned `400 Bad Request` | Returns `200` with updated title |
| Documented as API-side issue | Fixed by SE Ranking's API unification |

This operation has been broken since the node was first tested in April 2026. The unified API resolves it — PATCH `/project-management/audits?audit_id=` with body `{title}` now works correctly.

#### Run Position Check — Confirmed Fixed

The `/api/` prefix bug from v1.5.13 is no longer relevant — the unified endpoint `/project-management/sites/positions/recheck?site_id=` works without any path prefix workaround.

### Deprecated Operations

The following Project API operations return `404` on the unified host. They throw a friendly error message pointing to the Data API replacement (`POST /v1/keywords/export`):

| Operation | Old Endpoint | Status |
|---|---|---|
| Search Volume: Create Volume Check | `/key-volume/` | 404 — not yet republished |
| Search Volume: List Volume Checks | `/key-volume/` | 404 — not yet republished |
| Search Volume: Get Volume Results | `/key-volume/{taskId}` | 404 — not yet republished |
| Search Volume: Delete Volume Check | `/key-volume/{taskId}` | 404 — not yet republished |
| General Data: List Volume Regions | `/system/volume-regions` | 404 — not yet republished |
| General Data: Get Keyword Volume | `/system/volume` | 404 — not yet republished |

SE Ranking's docs reference these endpoints in navigation but haven't deployed them on the unified host yet. Use Data API → Keyword Research → Export Keywords as the replacement.

---

## Upgrade

```bash
npm update @seranking/n8n-nodes-seranking
```

Then restart n8n.

## Migration Notes

**Breaking change:** nodes using the old `SE Ranking Project API` credential will show "credential not configured" after upgrade. Re-save each affected node with the unified `SE Ranking API` credential. The token format itself is unchanged — your existing API token works for both Data API and Project API.

**No workflow logic changes needed.** All operation names, parameter names, and output shapes are identical to v1.5.13. Only the internal endpoint URLs and credential routing changed.

## Node Totals

- 21 resources, 190 operations across unified API
- All versions published with npm provenance attestation via GitHub Actions OIDC Trusted Publishing
- Fully compliant with n8n's `no-http-request-with-manual-auth` linter rule
- Smoke tested: 28/28 operations verified on self-hosted n8n v2.21.7
