# AI Search Visibility Tracker

Track how often your brand appears in different LLM engines with automated rate limiting and historical tracking.

## Overview

This workflow monitors your brand's presence across ChatGPT and Perplexity storing results in Google Sheets for trend analysis over time.

## What This Workflow Does

1. **Fetches AI Search Overview** for your domain from ChatGPT
2. **Waits 10 seconds** (rate limit protection)
3. **Fetches data from Perplexity**
4. **Merges results** from both engines
5. **Appends to Google Sheets** with timestamp

## Key Metrics Tracked

- **Link Presence**: Number of times your brand appears in AI responses
- **Average Position**: Your brand's average ranking position in AI citations
- **AI Opportunity Traffic**: Estimated traffic potential from AI search
- **Changes**: Period-over-period comparison metrics

## Benefits

✅ **Automated Tracking**: Schedule to run daily/weekly for trend analysis  
✅ **Multi-Engine Comparison**: See performance across ChatGPT and Perplexity  
✅ **Rate Limit Safe**: Built-in wait times prevent API throttling  
✅ **Historical Data**: Track visibility changes over time in Google Sheets  
✅ **Easy Expansion**: Add more engines by duplicating nodes

## Setup Instructions

### Prerequisites

- SE Ranking API credentials configured in n8n
- Google Sheets account connected to n8n
- A Google Sheet prepared with columns: `Date`, `Engine`, `Domain`, `Link_Presence`, `Avg_Position`, `Traffic_Opportunity`

### Step-by-Step Setup

1. **Import the workflow**: Download `workflow.json` and import via n8n UI

2. **Configure SE Ranking nodes**:
   - Open each SE Ranking node (ChatGPT and Perplexity)
   - Select your SE Ranking credential
   - Update `Domain` field with your website (e.g., `example.com`)
   - Keep `Source: us` or change to your target region

3. **Configure Google Sheets node**:
   - Select your Google Sheets credential
   - Choose your tracking spreadsheet
   - Select the worksheet (or create "AI Visibility Tracker")
   - Map columns: Date, Engine, Domain, Link_Presence, Avg_Position, Traffic_Opportunity

4. **Test the workflow**: Click "Execute Workflow" to verify everything works

### Configuration Options

**SE Ranking Node Settings:**

```
Resource: AI Search
Operation: Get Overview
Domain: yourdomain.com
Engine: chatgpt | perplexity
Source: us (or your target region)
Scope: base_domain
```

**Rate Limiting:**

- Current setup: 2-second delays between API calls
- Adjust "Wait" nodes if you experience rate limiting
- SE Ranking free tier: 100 requests/day

## Scheduling (Optional)

Convert Manual Trigger to Schedule Trigger for automation:

**Recommended Schedule:**

- **Trigger**: Every Monday at 9:00 AM
- **Timezone**: Your local timezone
- **Why Weekly**: AI visibility changes slowly; weekly tracking is sufficient

**Setup:**

1. Delete the "Manual Trigger" node
2. Add "Schedule Trigger" node
3. Configure: Cron Expression `0 9 * * 1` (Every Monday at 9 AM)

This creates an automated weekly AI visibility dashboard!

## Expected Output

### Google Sheets Format

| Date | Engine | Domain | Link_Presence | Avg_Position | Traffic_Opportunity |
|------|--------|--------|---------------|--------------|---------------------|
| 2025-10-25 | chatgpt | example.com | 47 | 3.2 | 1250 |
| 2025-10-25 | perplexity | example.com | 23 | 4.1 | 680 |

### Data Analysis Tips

- **Trend Tracking**: Create charts showing link presence over time per engine
- **Engine Comparison**: Compare which AI platform shows your brand most
- **Traffic Opportunity**: Sum traffic potential across all engines
- **Position Monitoring**: Alert when average position drops significantly

## Troubleshooting

### Rate Limit Errors

- **Problem**: API returns 429 errors
- **Solution**: Increase wait time between nodes to 5-10 seconds

### Missing Data

- **Problem**: Some engines return no data
- **Solution**: Verify domain is indexed; AI engines may not have data for all domains

### Duplicate Entries

- **Problem**: Multiple runs create duplicate rows
- **Solution**: Add a "Remove Duplicates" node before Google Sheets, or use "Update" instead of "Append"

## Customization Ideas

### Add More Engines

When SE Ranking adds support for additional engines, duplicate the node pattern:

1. Copy any SE Ranking node
2. Change `Engine` parameter to the new engine
3. Add Wait node after it (2 seconds)
4. Connect to Merge node

### Add Alerts

Add a Slack/Email node after Merge:

- Trigger when Link_Presence drops >20%
- Notify when new engine shows your brand

### Regional Tracking

Duplicate entire workflow for different regions:

- Change `Source` parameter (us, uk, de, etc.)
- Create separate Google Sheets tabs per region

## Additional Resources

- [SE Ranking AI Search Documentation](https://seranking.com/api-v3.html#tag/AI-Search)
- [n8n Schedule Trigger Docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/)
- [Google Sheets Node Docs](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)

## License

This workflow is provided as-is for demonstration purposes. Customize freely for your needs.
