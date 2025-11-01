# Website Audit - Automated Technical SEO Monitoring

## Overview
Automate comprehensive technical SEO audits with SE Ranking's Website Audit API. This workflow creates audits, monitors crawl progress, retrieves detailed reports, and tracks issues over time. Perfect for continuous site health monitoring and automated client reporting.

## What You'll Get
- **Health Score (0-100)** - Overall site SEO health assessment
- **Issue Detection** - Errors, warnings, and notices by category
- **Detailed Reports** - Security, crawling, content, performance issues
- **Issue Tracking** - Monitor specific pages affected by each issue
- **Historical Comparison** - Track improvements over time

## Use Cases
- **Continuous Monitoring** - Schedule weekly audits to catch issues early
- **Pre-Launch Checks** - Audit new sites before going live
- **Migration Validation** - Verify site health after platform migrations
- **Client Reporting** - Generate automated audit reports for clients
- **Issue Resolution** - Track specific issues and verify fixes

## Best For
- SEO agencies managing multiple client websites
- Web developers ensuring technical SEO compliance
- Website owners monitoring site health
- DevOps teams tracking site performance

---

## Setup Instructions

### Prerequisites
- n8n installed (version 1.0.0 or higher)
- SE Ranking API credentials ([Get API Token](https://online.seranking.com/admin.api.dashboard.html))
- SE Ranking Website Audit subscription

### Installation Steps

1. **Import the Workflow**
   - Download `WebsiteAuditMonitor.json` from this folder
   - In n8n: **Workflows → Import from File**
   - Select the downloaded JSON file

2. **Configure SE Ranking Credentials**
   - Click any SE Ranking node
   - Select **Create New Credential**
   - Enter your **API Token**
   - Select **Data API** as API Type
   - Click **Save**

3. **Customize Audit Settings**
   ```javascript
   // In "Create standard audit" node:
   {
     "domain": "yourdomain.com",
     "title": "Weekly SEO Audit",
     "settings": {
       "max_pages": 1000,        // Crawl limit
       "max_depth": 10,          // Link depth
       "source_sitemap": 1,      // Use sitemap.xml
       "source_site": 1,         // Follow internal links
       "check_robots": 1         // Respect robots.txt
     }
   }
   ```

4. **Set Schedule (Optional)**
   - Replace Manual Trigger with Schedule Trigger
   - Recommended: Weekly (every Monday 2:00 AM)
   - For large sites: Bi-weekly or monthly

---

## Workflow Components

### 1. Create Audit
**Nodes**: `Create standard audit` / `Create advanced audit`

**Standard Audit** (2 credits/page):
- Crawls HTML content
- Suitable for most websites
- Faster and more cost-effective

**Advanced Audit** (20 credits/page):
- Renders JavaScript before analysis
- Required for SPAs (React, Vue, Angular)
- Detects issues in dynamically loaded content

**Configuration Options**:
```javascript
{
  "domain": "example.com",
  "settings": {
    // Sources
    "source_site": 1,           // Follow internal links
    "source_sitemap": 1,        // Include sitemap
    "source_subdomain": 0,      // Exclude subdomains
    
    // Limits
    "max_pages": 1000,          // Max pages to crawl
    "max_depth": 10,            // Max link depth
    "max_req": 500,             // Requests per second
    
    // Content Rules
    "min_title_len": 20,        // Min title length
    "max_title_len": 65,        // Max title length
    "min_description_len": 1,   // Min meta description
    "max_description_len": 158, // Max meta description
    "min_words": 250,           // Min word count
    
    // Authentication (if needed)
    "login": "",                // HTTP auth login
    "password": ""              // HTTP auth password
  }
}
```

### 2. Monitor Crawl Progress
**Node**: `Get audit status`
- Checks if audit is complete
- Returns: queued, processing, finished, cancelled, expired
- Required before fetching reports

**Status Response**:
```json
{
  "status": "finished",
  "total_pages": 1009,
  "total_errors": 346,
  "total_warnings": 979,
  "total_passed": 77,
  "start_time": "2025-10-30 09:00:00",
  "audit_time": "2025-10-30 09:15:33"
}
```

### 3. Get Audit Report
**Node**: `Get audit report`
- Complete technical SEO analysis
- Issues grouped by category
- Domain properties (expiration, backlinks, indexation)

**Report Categories**:
- 🔒 **Security** - HTTPS, mixed content
- 🕷️ **Crawling & Indexing** - 4XX errors, noindex, canonicals
- 📝 **Content** - Titles, descriptions, headings
- 🔗 **Links** - Broken links, redirects
- 🖼️ **Images** - Alt text, size optimization
- ⚡ **Performance** - Page size, load speed
- 📱 **Mobile** - Mobile optimization

### 4. Get Issues by Type
**Node**: `Get issues by type`
- Lists all URLs affected by a specific issue
- Use issue codes from main report
- Paginated results

**Common Issue Codes**:
- `title_duplicate` - Duplicate titles
- `description_duplicate` - Duplicate meta descriptions
- `http4xx` - 4XX status codes
- `http5xx` - 5XX server errors
- `broken_links` - Broken internal/external links
- `no_h1` - Missing H1 tags
- `img_no_alt` - Images without alt text
- `slow_page` - Slow loading pages

### 5. Historical Tracking
**Node**: `Get audit history`
- Compare audits from different dates
- Track issue resolution progress
- Monitor score improvements

---

## Output Data Structure

### Audit Report
```json
{
  "score_percent": 80,
  "total_pages": 1009,
  "total_errors": 346,
  "total_warnings": 979,
  "total_notices": 3915,
  "total_passed": 77,
  "audit_time": "2025-10-30 09:15:33",
  "domain_props": {
    "domain": "www.example.com",
    "expdate": "2026-10-30",
    "backlinks": "212249",
    "index_google": "1380"
  },
  "sections": [
    {
      "uid": "security_v2",
      "name": "Security",
      "props": {
        "no_https": {
          "code": "no_https",
          "status": "error",
          "name": "No HTTPS encryption",
          "value": 0
        },
        "mixed_content": {
          "code": "mixed_content",
          "status": "error",
          "name": "Mixed content",
          "value": 3
        }
      }
    },
    {
      "uid": "crawling_v2",
      "name": "Crawling & Indexing",
      "props": {
        "http4xx": {
          "code": "http4xx",
          "status": "error",
          "name": "4XX HTTP Status Codes",
          "value": 28
        }
      }
    }
  ]
}
```

### Issue Pages
```json
{
  "total_urls": 143,
  "urls": [
    "https://www.example.com/page1",
    "https://www.example.com/page2",
    "https://www.example.com/page3"
  ],
  "urls_type": "simple_urls_array"
}
```

---

## Advanced Configurations

### Custom Crawl Settings

#### Exclude Specific URL Patterns
```javascript
{
  "settings": {
    "disallow": "/admin/",      // Don't crawl admin pages
    "hide": "/api/",            // Hide API endpoints from report
    "allow": "/blog/"           // Only crawl blog section
  }
}
```

#### URL Parameter Handling
```javascript
{
  "settings": {
    "ignore_params": 2,         // Custom list mode
    "custom_params": "utm_source,utm_medium,utm_campaign,fbclid"
  }
}
```

#### User Agent Selection
```javascript
{
  "settings": {
    "user_agent": 0   // Options:
                      // 0: SE Ranking bot
                      // 1: Googlebot
                      // 2: Googlebot Image
                      // 3: Bingbot
                      // 7: Chrome on Windows
                      // 12: Safari on macOS
  }
}
```

### Filtering Issues

#### Get Only Critical Errors
```javascript
// In workflow: Add IF node after "Get audit report"
// Condition: sections[].props[].status equals "error"
// This filters out warnings and notices
```

#### Monitor Specific Issue Types
```javascript
// Common patterns to monitor:
const criticalIssues = [
  'http4xx',              // Broken pages
  'http5xx',              // Server errors
  'title_duplicate',      // SEO issues
  'broken_links',         // Link issues
  'no_https'              // Security
];
```

---

## Complete Workflow Example

### Weekly Audit with Slack Notifications

```json
{
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": {
          "interval": [{ "field": "weeks", "weeksInterval": 1 }]
        }
      }
    },
    {
      "name": "Create standard audit",
      "type": "CUSTOM.seRanking",
      "parameters": {
        "resource": "websiteAudit",
        "operation": "createStandard",
        "domain": "yourdomain.com"
      }
    },
    {
      "name": "Wait 5 minutes",
      "type": "n8n-nodes-base.wait",
      "parameters": { "amount": 5, "unit": "minutes" }
    },
    {
      "name": "Check audit status",
      "type": "CUSTOM.seRanking",
      "parameters": {
        "resource": "websiteAudit",
        "operation": "getStatus",
        "auditId": "={{ $('Create standard audit').item.json.id }}"
      }
    },
    {
      "name": "If audit complete",
      "type": "n8n-nodes-base.if",
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{ $json.status }}",
              "value2": "finished"
            }
          ]
        }
      }
    },
    {
      "name": "Get audit report",
      "type": "CUSTOM.seRanking",
      "parameters": {
        "resource": "websiteAudit",
        "operation": "getReport",
        "auditId": "={{ $('Create standard audit').item.json.id }}"
      }
    },
    {
      "name": "Send to Slack",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#seo-alerts",
        "text": "=Weekly Audit Complete\nScore: {{ $json.score_percent }}/100\nErrors: {{ $json.total_errors }}\nWarnings: {{ $json.total_warnings }}"
      }
    }
  ]
}
```

---

## Troubleshooting

### Issue: "Audit takes too long"
**Solution**:
- Reduce `max_pages` limit (start with 500-1000)
- Decrease `max_depth` (try 5-7 for large sites)
- Use `allow` parameter to audit specific sections
- Increase wait time between status checks

### Issue: "Too many credits consumed"
**Solution**:
- Use Standard audit instead of Advanced (10x cheaper)
- Set lower `max_pages` limit
- Schedule less frequently (bi-weekly or monthly)
- Use `disallow` to exclude non-essential pages

### Issue: "Authentication required" errors
**Solution**:
```javascript
{
  "settings": {
    "login": "your_username",
    "password": "your_password"
  }
}
```

### Issue: "Missing JavaScript content"
**Solution**:
- Switch from Standard to Advanced audit
- Advanced audit renders JavaScript before analysis
- Note: Costs 10x more (20 credits vs 2 credits per page)

---

## Best Practices

### DO ✅
- **Start small**: Test with 100-500 pages first
- **Use Standard audits**: Unless site is SPA/JavaScript-heavy
- **Set realistic limits**: Match `max_pages` to your site size
- **Monitor regularly**: Weekly for active sites, monthly for stable ones
- **Track history**: Compare audits to measure improvements
- **Filter issues**: Focus on errors first, then warnings

### DON'T ❌
- **Over-crawl**: Don't set `max_pages` higher than needed
- **Ignore robots.txt**: Keep `check_robots: 1` enabled
- **Crawl subdomains unnecessarily**: Set `source_subdomain: 0`
- **Forget authentication**: Add login credentials for protected sites
- **Run audits too frequently**: Large sites can take 10-30 minutes

---

## Performance & Costs

### Crawl Times (Approximate)
- **Small site** (100-500 pages): 2-5 minutes
- **Medium site** (500-2000 pages): 5-15 minutes
- **Large site** (2000-10000 pages): 15-60 minutes

### Credit Usage
**Standard Audit**: 2 credits per page
- 500 pages = 1,000 credits
- 1,000 pages = 2,000 credits
- 5,000 pages = 10,000 credits

**Advanced Audit**: 20 credits per page
- 500 pages = 10,000 credits
- Use only when necessary!

### Recommended Schedules
- **Small sites**: Weekly audits
- **Medium sites**: Bi-weekly audits
- **Large sites**: Monthly audits
- **E-commerce**: Weekly (high content changes)
- **Blogs**: Bi-weekly (moderate changes)

---

## Example Audit Report Summary

```
🌐 WEBSITE AUDIT REPORT
Domain: www.example.com
Date: October 30, 2025
Pages Crawled: 1,009

📊 OVERALL HEALTH SCORE: 80/100

🔴 ERRORS (346)
- 4XX HTTP Status Codes: 28 pages
- Broken Internal Links: 45 pages
- Missing H1 Tags: 12 pages
- Duplicate Titles: 143 pages
- Slow Loading Pages: 118 pages

⚠️ WARNINGS (979)
- Missing Meta Descriptions: 234 pages
- Long Titles: 156 pages
- Images Without Alt Text: 589 pages

ℹ️ NOTICES (3,915)
- External 3XX Redirects: 234 links
- Large CSS Files: 880 pages
- Long H1 Tags: 19 pages

✅ PASSED (77 checks)

📈 DOMAIN METRICS
- Google Index: 1,380 pages
- Total Backlinks: 212,249
- Domain Expiration: 2026-10-30

🎯 TOP PRIORITIES
1. Fix 28 pages with 4XX errors
2. Resolve 45 broken internal links
3. Add H1 tags to 12 pages
4. Optimize 118 slow loading pages
5. Fix 143 duplicate title tags
```

---

## Workflow Enhancements

### 1. Email Report Automation
Add Gmail/Email node to send formatted reports

### 2. Google Sheets Integration
Export issue lists to spreadsheet for team collaboration

### 3. Jira Integration
Create tickets automatically for critical issues

### 4. Conditional Alerts
Only notify team if score drops below threshold

### 5. Multi-Site Monitoring
Loop through multiple domains for agency workflows

---

## Resources

- [SE Ranking Website Audit API Documentation](https://seranking.com/api/data/website-audit/)
- [n8n Community Forum](https://community.n8n.io/)
- [Report Issues](https://github.com/seranking/n8n-nodes-seranking/issues)

---

## Support

Need help?
- Check the [main README](../../README.md) for general troubleshooting
- Review API documentation at [seranking.com/api](https://seranking.com/api.html)
- Contact SE Ranking support for API-specific questions

---

## Notes on Excluded Operations

⚠️ **Currently Not Available in This Workflow**:
- ❌ `Get all crawled pages` - Not working in current API version
- ❌ `Get issues by URL` - Not working in current API version  
- ❌ `Get all found links` - Not working in current API version

These operations will be added when API support is restored. For now, use `Get issues by type` to identify affected pages.
