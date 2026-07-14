# SE Ranking n8n Node - v2.1.0

## New: SE Visible API + AI Result Tracker Sources & Competitors

This release adds **31 new operations** — SE Ranking's SE Visible (AI-visibility) product as a new resource, plus the Sources and Competitors additions to the existing AI Result Tracker. The node now covers **225 operations across 22 resources**.

---

## New: SE Visible resource (24 operations)

SE Visible tracks how brands appear across AI assistants (ChatGPT, Google Gemini, Perplexity, Google AI Mode, Google AI Overview). The new resource covers the full product surface:

- **Projects** — List, Create (async), Get Details, Delete
- **Brands** — List Tracked, Create Competitor, List Mentioned, Get Aggregated Metrics, Update, Delete, Add Aliases
- **Topics** — Create, Update Title, Delete
- **Prompts & Results** — List Prompts, Create, Delete, Move, Get Details, Get Results, Get Result Details, Download Raw Response
- **Sources & Subscription** — Get Project Sources, Get Subscription

> **Access requirement:** SE Visible API access is enabled per account. A valid API token that works for the Data and Project APIs will still return `401` on SE Visible endpoints until access is enabled for your account. The API is rate-limited to **1 request/second**; the node throttles automatically.

## New: AI Result Tracker → Sources & Competitors (7 operations)

Read-only additions to the existing AI Result Tracker resource:

- **Sources** — Get Sources Summary, List Source Domains, List Source Pages, Get Sources Recommendations
- **Competitors** — Get Competitors Breakdown, Get Competitors Check Dates, Get Competitors Source Metrics

## Details

- Domain inputs (SE Visible project/brand) accept bare domains — the node adds the URL scheme automatically.
- Country codes on project creation are normalized to the case the API expects.
- Repeatable filters (model types, sentiments, topic IDs, etc.) use the array form the API requires.

---

## Upgrade

```bash
npm update @seranking/n8n-nodes-seranking
```

Then restart n8n. No credential or workflow changes needed — existing nodes are unaffected; this is an additive release on top of v2.0.6.

## Node Totals

- 22 resources, 225 operations on the unified API
- Published with npm provenance attestation via GitHub Actions OIDC Trusted Publishing
