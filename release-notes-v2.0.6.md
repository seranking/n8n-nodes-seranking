# SE Ranking n8n Node - v2.0.6

## Reliability Fix — AI Search Leaderboard timeouts

The **AI Search → Get AI Search Leaderboard** operation runs a heavy synchronous computation (your domain vs. competitors across multiple LLM engines). A large or first-time (uncached) comparison can run longer than the API gateway's ~60-second limit and return a `504`. In earlier versions the node also capped the client at 60 seconds and surfaced a misleading *"connection was aborted, perhaps the server is offline"* — even though the service was up and simply still computing.

### Fixed

- **Auto-retry on gateway timeout.** The leaderboard operation now waits up to 180s and automatically retries up to 2× on a `504` (with short backoff). The retry completes quickly because the service caches partial progress — so heavy comparisons that previously failed now return their full result. Retries are safe: incomplete requests are not billed, and the retry is opt-in per operation, so no data-changing operation is ever re-issued.
- **Accurate timeout message.** A genuine client-side timeout now reports *"Request Timeout — the API was reached, not offline; heavy endpoints compute on demand and are cached afterward — retry in a moment"* instead of the misleading "server is offline."

This is interim hardening; SE Ranking is also improving the endpoint's server-side performance.

---

## Upgrade

```bash
npm update @seranking/n8n-nodes-seranking
```

Then restart n8n. No credential or workflow changes needed — this is a reliability-only release on top of v2.0.5.

## Node Totals

- 21 resources, 194 operations on the unified API
- Published with npm provenance attestation via GitHub Actions OIDC Trusted Publishing
