# SE Ranking n8n Node - v2.1.1

## AI Search prompts filters removed

As of 2026-10-14 the SE Ranking API no longer supports three filters on **AI Search → Get Prompts by Target** and **Get Prompts by Brand**: `filter[volume]`, `filter[keyword_count]` and `filter[characters_count]`. A request that uses one of them is answered with `400 unsupported filter`.

### Changed

- **Removed from Additional Fields:** Volume From/To, Keyword Word Count From/To and Characters Count From/To.
- **Existing workflows keep running.** Values saved in a workflow built with an earlier version of the node are no longer sent, so the workflow does not fail with a 400 on a field you can no longer see. Those workflows now return unfiltered results: check any workflow that relied on these filters.
- **Unchanged:** Sort, Limit (at most 1000), Offset and the Include/Exclude Keywords Containing filters.

---

## Upgrade

```bash
npm update @seranking/n8n-nodes-seranking
```

Then restart n8n. No credential changes are needed.
