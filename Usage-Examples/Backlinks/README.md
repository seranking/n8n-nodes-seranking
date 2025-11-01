# Backlinks Monitoring & Competitive Analysis

## Overview
Automate comprehensive backlink monitoring with historical tracking, new/lost link detection, and competitive analysis. This workflow fetches backlink data from SE Ranking and creates detailed reports with authority metrics, referring domains analysis, and anchor text distribution.

## What You'll Get
- **Backlink summary statistics** - Total backlinks, referring domains, IPs, subnets
- **Authority metrics** - InLink Rank (Page Authority) and Domain InLink Rank (Domain Authority)
- **New & lost backlinks tracking** - Daily monitoring with reasons for lost links
- **Anchor text analysis** - Distribution of dofollow/nofollow anchors
- **Referring domains breakdown** - Top domains with backlink counts
- **Historical trend data** - Track backlink growth over time

## Use Cases
- **Link Building Campaigns** - Monitor new backlinks as they're acquired
- **Competitor Analysis** - Compare your backlink profile with competitors
- **SEO Health Monitoring** - Track lost backlinks and identify toxic links
- **Client Reporting** - Generate automated monthly backlink reports

## Best For
- SEO agencies managing client backlink profiles
- Digital marketers tracking link building ROI
- Website owners monitoring domain authority growth
- Competitive intelligence teams

---

## Setup Instructions

### Prerequisites
- n8n installed (version 1.0.0 or higher)
- SE Ranking API credentials ([Get API Token](https://online.seranking.com/admin.api.dashboard.html))
- SE Ranking Backlinks subscription

### Installation Steps

1. **Import the Workflow**
   - Download `BacklinksMonitor.json` from this folder
   - In n8n: **Workflows → Import from File**
   - Select the downloaded JSON file

2. **Configure SE Ranking Credentials**
   - Click any SE Ranking node
   - Select **Create New Credential**
   - Enter your **API Token**
   - Select **Data API** as API Type
   - Click **Save**

3. **Customize Parameters**
   ```javascript
   // Main configuration in the workflow:
   - target: "yourdomain.com"     // Your website
   - mode: "domain"                // domain, host, or url
   - dateFrom: "2025-10-01"       // Historical data start
   - dateTo: "2025-10-30"         // Historical data end
   ```

4. **Set Schedule (Optional)**
   - Replace Manual Trigger with Schedule Trigger
   - Recommended: Daily at 9:00 AM for new/lost monitoring
   - Weekly for comprehensive reports

---

## Workflow Components

### 1. Backlink Summary
**Node**: `Get backlinks summary`
- Fetches comprehensive statistics for your target
- Returns: backlinks count, referring domains, subnets, IPs
- Includes top anchors, top pages, top TLDs, top countries

**Key Metrics**:
```json
{
  "backlinks": 22407,
  "refdomains": 2329,
  "dofollow_backlinks": 18689,
  "inlink_rank": 24,
  "domain_inlink_rank": 68
}
```

### 2. New & Lost Backlinks
**Node**: `Get backlinks history`
- Monitors daily changes in backlink profile
- Identifies new backlinks found
- Tracks lost backlinks with reasons
- Filters by date range

**Lost Backlink Reasons**:
- `page_not_found` - 404 error on referring page
- `link_removed` - Link no longer exists on page
- `redirect` - Page now returns 3XX status
- `noindex` - Page has noindex directive

### 3. Referring Domains Analysis
**Node**: `Get referring domains`
- Lists all domains linking to your site
- Sorted by Domain InLink Rank
- Shows dofollow vs nofollow links per domain

### 4. Anchor Text Distribution
**Node**: `Get anchor texts`
- Complete list of anchor texts used
- Dofollow vs nofollow breakdown
- Sorted by backlinks or referring domains

### 5. Authority Metrics
**Nodes**: `Get authority metrics`, `Get domain authority`
- InLink Rank (Page Authority): 0-100 score
- Domain InLink Rank (Domain Authority): 0-100 score
- Historical tracking available

---

## Output Data Structure

### Summary Response
```json
{
  "target": "seranking.com",
  "backlinks": 22407,
  "refdomains": 2329,
  "subnets": 1403,
  "ips": 1961,
  "nofollow_backlinks": 3718,
  "dofollow_backlinks": 18689,
  "inlink_rank": 24,
  "domain_inlink_rank": 68,
  "top_anchors_by_backlinks": [
    {"anchor": "SE Ranking", "backlinks": 1853}
  ],
  "top_pages_by_backlinks": [
    {"url": "https://www.seranking.com/", "backlinks": 16724}
  ]
}
```

### History Response (New/Lost)
```json
{
  "new_lost_backlinks": [
    {
      "new_lost_date": "2025-10-30",
      "new_lost_type": "new",
      "url_from": "https://example.com/blog",
      "url_to": "https://yourdomain.com/",
      "anchor": "Your Brand",
      "nofollow": false,
      "inlink_rank": 45,
      "domain_inlink_rank": 68
    }
  ]
}
```

---

## Customization Options

### Filtering Backlinks
```javascript
// In "Get all backlinks" node
{
  "limit": 1000,
  "order_by": "inlink_rank",        // or "date_found"
  "inlink_rank_from": 20,           // Min page authority
  "inlink_rank_to": 100,
  "domain_inlink_rank_from": 30,    // Min domain authority
  "nofollow_filter": "dofollow_only" // or "nofollow_only"
}
```

### Historical Analysis
```javascript
// In "Get cumulative backlinks history" node
{
  "target": "yourdomain.com",
  "mode": "domain",
  "date_from": "2025-01-01",
  "date_to": "2025-10-30"
}
// Returns daily backlink count for trend analysis
```

### Export Large Datasets
```javascript
// For comprehensive exports (all backlinks)
1. Use "Export backlinks" node → get task_id
2. Wait 60 seconds
3. Use "Check export status" → wait until "complete"
4. Use "Download export data" → get CSV file
```

---

## Advanced Use Cases

### 1. Competitive Backlink Gap Analysis
**Workflow Enhancement**:
- Add multiple "Get backlinks summary" nodes for competitors
- Compare referring domains and authority metrics
- Identify competitor backlinks you don't have

```javascript
// Compare domains
Your domain: 2,329 referring domains, DR 68
Competitor A: 3,456 referring domains, DR 72
Competitor B: 1,987 referring domains, DR 65
```

### 2. Toxic Link Monitoring
**Filter Configuration**:
```javascript
{
  "domain_inlink_rank_to": 10,  // Low authority domains
  "anchor_filter": "viagra|casino|pills",
  "anchor_filter_mode": "contains"
}
```

### 3. Link Building Progress Tracking
**Weekly Report Setup**:
- Schedule trigger: Every Monday 9:00 AM
- Fetch last 7 days of new backlinks
- Calculate weekly growth rate
- Send summary via email/Slack

---

## Troubleshooting

### Issue: "No data returned"
**Solution**:
- Verify domain has backlinks in SE Ranking database
- Check if domain is tracked in your SE Ranking account
- Try different `mode`: "domain" vs "host" vs "url"
- Adjust date range (recent domains may have limited history)

### Issue: "Rate limit exceeded"
**Solution**:
- Add Wait nodes (2-5 seconds) between API calls
- Reduce batch size in list operations
- Use pagination with smaller `limit` values

### Issue: "Export task timeout"
**Solution**:
- Increase wait time between status checks (60-120 seconds)
- Large sites may take 5-10 minutes to export
- Check task status manually in SE Ranking dashboard

---

## Performance Optimization

### Best Practices
✅ **DO**:
- Use `Get backlinks summary` for quick overview
- Cache frequently accessed data
- Use filters to reduce result size
- Implement error handling for each node

❌ **DON'T**:
- Request all backlinks without pagination (use `limit`)
- Make parallel requests to same endpoint
- Export data more than once per day
- Ignore rate limits

### Recommended Limits
```javascript
{
  "limit": 500,              // For "Get all backlinks"
  "per_domain": 1,           // One backlink per domain
  "max_pages": 5000          // For large exports
}
```

---

## Example Report Output

### Weekly Backlink Growth Report
```
Domain: seranking.com
Period: Oct 23 - Oct 30, 2025

📊 SUMMARY
Total Backlinks: 22,407 (+234 this week)
Referring Domains: 2,329 (+18 this week)
Domain Authority: 68 (↑2)

🆕 NEW BACKLINKS (234)
- 189 dofollow (81%)
- 45 nofollow (19%)
- Avg Domain Authority: 42

❌ LOST BACKLINKS (156)
- 89 link_removed (57%)
- 34 page_not_found (22%)
- 33 other reasons (21%)

⚓ TOP ANCHORS
1. "SE Ranking" - 1,853 backlinks
2. "SEO tools" - 864 backlinks
3. "seranking.com" - 1,209 backlinks

🌐 TOP REFERRING DOMAINS
1. example.com (DR 73) - 42 backlinks
2. seotools.org (DR 68) - 38 backlinks
3. marketing-hub.com (DR 65) - 31 backlinks
```

---

## API Credit Usage

**Cost per Operation**:
- Get Summary: ~1 credit
- Get All Backlinks: ~1 credit per 100 results
- Get History: ~1 credit per date range
- Export: ~5-10 credits (depends on size)

**Estimated Monthly Usage** (Daily monitoring):
- Daily summary: 30 credits
- Weekly detailed report: 40 credits
- Monthly export: 10 credits
- **Total: ~80 credits/month**

---

## Resources

- [SE Ranking Backlinks API Documentation](https://seranking.com/api/data/backlinks/)
- [n8n Community Forum](https://community.n8n.io/)
- [Report Issues](https://github.com/seranking/n8n-nodes-seranking/issues)

---

## Support

Need help? 
- Check the [main README](../../README.md) for general troubleshooting
- Review API documentation at [seranking.com/api](https://seranking.com/api.html)
- Contact SE Ranking support for API-specific questions
