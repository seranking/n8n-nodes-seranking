# Domain Analysis Data Processor & Multi-Sheet Exporter

Automatically transforms SE Ranking API responses into structured, Google Sheets-ready data with intelligent type detection.

## Overview

This workflow processes various SE Ranking domain analysis data types and exports them to Google Sheets with automatic categorization, timestamps, and formatting for easy analysis and dashboard creation.

## What This Workflow Does

1. **Fetches Domain Analysis Data** from SE Ranking API (regional, keywords, competitors, etc.)
2. **Detects Data Type** automatically based on API response structure
3. **Transforms Data** into flat, analysis-ready format
4. **Adds Metadata**: Timestamps and data type labels
5. **Exports to Google Sheets** with proper column mapping
6. **Creates Multiple Sheets** for different data types (optional)

## Data Types Processed

### Regional Performance

Multi-country organic and paid metrics across 200+ regions

- **Fields**: Region, organic keywords, paid keywords, organic traffic, paid traffic, avg position
- **Use Case**: Compare performance across different countries/languages

### Domain Summary

Aggregated organic vs. paid keyword distribution and traffic

- **Fields**: Total keywords (organic/paid), estimated traffic, visibility score
- **Use Case**: High-level domain health dashboard

### Keywords Analysis

Individual keyword positions, volume, difficulty, and traffic data

- **Fields**: Keyword, position, search volume, CPC, difficulty, traffic, URL
- **Use Case**: Keyword-level performance tracking and optimization

### Competitor Insights

Keyword overlap, gaps, and opportunity analysis

- **Fields**: Competitor domain, common keywords, unique keywords, traffic comparison
- **Use Case**: Competitive intelligence and gap analysis

## Benefits

✅ **Universal Processor**: Handles all SE Ranking response formats automatically  
✅ **Smart Detection**: No manual configuration - auto-identifies data structure  
✅ **Historical Tracking**: Timestamps all records for trend analysis  
✅ **Easy Filtering**: Data type labels for instant pivot tables and charts  
✅ **Scalable**: Process thousands of keywords and regions in one run

## Setup Instructions

### Prerequisites

- SE Ranking API credentials configured in n8n
- Google Sheets account connected to n8n
- A Google Sheet prepared (workflow can create sheets automatically)

### Step-by-Step Setup

1. **Import the workflow**: Download `workflow.json` and import via n8n UI

2. **Configure SE Ranking node**:

   ```
   Resource: Domain Analysis
   Operation: Choose your operation:
     - Get Regional Database Overview
     - Get Keywords
     - Get Competitors
     - Get Domain Summary
   Domain: yourdomain.com
   Source: us (or your target region)
   ```

3. **Configure Data Processing node** (Function/Code node):
   - No configuration needed - automatically detects data type
   - Adds `date` and `data_type` fields to all records

4. **Configure Google Sheets node**:
   - **Method 1: Single Sheet** (Recommended for starting)
     - Operation: Append
     - Spreadsheet: Your tracking spreadsheet
     - Sheet: "Domain_Data"
     - Columns: Auto-mapped from data

   - **Method 2: Multi-Sheet** (Advanced)
     - Add Switch node after data processing
     - Route by `data_type` field
     - Create separate Google Sheets nodes for each type
     - Sheet names: "Regional", "Keywords", "Competitors", "Summary"

5. **Test the workflow**: Execute to verify data flows correctly

## Configuration Examples

### Example 1: Regional Performance Tracking

```
SE Ranking Node:
  Resource: Domain Analysis
  Operation: Get Regional Database Overview
  Domain: example.com
  Source: us

Output Columns:
  date | data_type | region | organic_keywords | paid_keywords | organic_traffic | avg_position
```

### Example 2: Top Keywords Export

```
SE Ranking Node:
  Resource: Domain Analysis
  Operation: Get Keywords
  Domain: example.com
  Source: us
  Position From: 1
  Position To: 20
  Limit: 100

Output Columns:
  date | data_type | keyword | position | volume | cpc | difficulty | traffic | url
```

### Example 3: Competitor Analysis

```
SE Ranking Node:
  Resource: Domain Analysis
  Operation: Get Competitors
  Domain: example.com
  Source: us
  Type: organic
  Limit: 10

Output Columns:
  date | data_type | competitor_domain | common_keywords | unique_keywords | traffic_estimate
```

## Output Format

Each row includes:

- **date**: Timestamp for historical tracking (YYYY-MM-DD HH:MM:SS)
- **data_type**: Category identifier (regional_organic, keyword, competitor, etc.)
- **All Metrics**: Keywords count, traffic, positions, CPC, difficulty, and more

### Sample Output (Keywords)

| date | data_type | keyword | position | volume | cpc | difficulty | traffic | url |
|------|-----------|---------|----------|--------|-----|------------|---------|-----|
| 2025-10-25 14:30 | keyword | seo tools | 5 | 12000 | 15.30 | 68 | 450 | /tools |
| 2025-10-25 14:30 | keyword | free seo | 12 | 8500 | 8.20 | 45 | 180 | /free |

### Sample Output (Regional)

| date | data_type | region | organic_keywords | paid_keywords | organic_traffic | avg_position |
|------|-----------|--------|------------------|---------------|-----------------|--------------|
| 2025-10-25 14:30 | regional_organic | us | 15420 | 320 | 125000 | 18.3 |
| 2025-10-25 14:30 | regional_organic | uk | 8930 | 150 | 48000 | 22.1 |

## Advanced Features

### Multi-Sheet Export Setup

Add after data processing node:

1. **Switch Node**: Route by `data_type` field
   - Route 0: `data_type === 'regional_organic'` → Regional Sheet
   - Route 1: `data_type === 'keyword'` → Keywords Sheet
   - Route 2: `data_type === 'competitor'` → Competitors Sheet
   - Route 3: `data_type === 'summary'` → Summary Sheet

2. **Google Sheets Nodes** (one per route):
   - Each writes to a dedicated sheet
   - Maintains clean data separation

### Scheduling

Convert to automated tracking:

```
Schedule Trigger:
  - Daily at 8:00 AM for keyword tracking
  - Weekly on Monday for regional analysis
  - Monthly for competitor updates
```

### Data Retention

Add filtering before Google Sheets:

```javascript
// Keep only last 90 days
const ninetyDaysAgo = new Date();
ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

return items.filter(item => 
  new Date(item.json.date) > ninetyDaysAgo
);
```

## Dashboard Ideas

### Google Sheets Pivot Tables

**Regional Performance Dashboard:**

- Rows: Region
- Columns: Date
- Values: Sum of organic_traffic
- Filter: data_type = 'regional_organic'

**Keyword Position Tracking:**

- Rows: Keyword
- Columns: Date
- Values: Average of position
- Filter: data_type = 'keyword'

**Competitor Movement:**

- Rows: Competitor_domain
- Columns: Date  
- Values: Count of common_keywords
- Filter: data_type = 'competitor'

## Troubleshooting

### Data Not Appearing in Sheets

- **Problem**: Google Sheets node returns no data
- **Solution**: Check that data_type field is being added correctly; verify column mapping

### Type Detection Failing

- **Problem**: All data gets same data_type
- **Solution**: Update detection logic in Function node to match your API response structure

### Rate Limiting

- **Problem**: API returns 429 for large data requests
- **Solution**: Add pagination with Limit parameter; use multiple runs with Wait nodes between

### Missing Columns

- **Problem**: Some expected fields are blank
- **Solution**: SE Ranking returns different fields based on operation; update column mapping to handle optional fields

## Customization Ideas

### Add Data Validation

Insert after data processing:

```javascript
// Filter out low-quality keywords
return items.filter(item => 
  item.json.volume > 100 && 
  item.json.difficulty < 70
);
```

### Calculate Custom Metrics

Add before Google Sheets:

```javascript
// Add traffic value estimate
items.forEach(item => {
  if (item.json.traffic && item.json.cpc) {
    item.json.traffic_value = item.json.traffic * item.json.cpc * 0.3;
  }
});
return items;
```

### Merge with External Data

Add HTTP Request node after SE Ranking:

- Enrich keywords with your internal conversion data
- Add content quality scores from your CMS
- Merge with Google Analytics traffic data

## Performance Tips

- **Batch Processing**: Use Limit and pagination for large datasets (>1000 records)
- **Column Reduction**: Only map columns you need in Google Sheets
- **Split Operations**: Run regional and keyword tracking as separate workflows
- **Cache Results**: Store processed data in n8n database for re-processing

## Additional Resources

- [SE Ranking Domain Analysis API](https://seranking.com/api-v3.html#tag/Domain-Analysis)
- [n8n Function Node Guide](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.function/)
- [Google Sheets Advanced Mapping](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)

## License

This workflow is provided as-is for demonstration purposes. Customize freely for your needs.

Perfect for building automated SEO dashboards and long-term performance databases!
