# Keyword Research Automation

Transform SE Ranking API data into structured Google Sheets reports with automated keyword metrics tracking and trend analysis.

## Overview

This workflow automates comprehensive keyword research by fetching data from SE Ranking's Keyword Research API, processing multiple data formats, and exporting organized results to Google Sheets with historical trend tracking and SERP feature detection.

## What This Workflow Does

1. **Fetches Keyword Data** from SE Ranking (lists, metrics, related keywords, trends)
2. **Processes Multiple Data Formats** automatically
3. **Calculates Trend Metrics** (min/max/average volume over time)
4. **Extracts SERP Features** (People Also Ask, Featured Snippets, etc.)
5. **Maps Search Intent** (Informational, Commercial, Navigational, Local)
6. **Exports to Google Sheets** with proper data type categorization
7. **Creates Analysis-Ready Structure** for pivot tables and charts

## Key Data Processed

### 1. Keyword Lists

Bulk keyword collections with volume counts

- **Fields**: List name, keyword count, total volume, last updated
- **Use Case**: Organize and track keyword groups
- **Data Type Tag**: `keyword_list`

### 2. Detailed Metrics

Search volume, CPC, difficulty, competition scores

- **Fields**: Keyword, volume, CPC, difficulty, competition, results count
- **Use Case**: In-depth keyword analysis and prioritization
- **Data Type Tag**: `keyword_metrics`

### 3. Single Keywords

Individual keyword performance snapshots

- **Fields**: Keyword, exact volume, broad volume, phrase volume, regional data
- **Use Case**: Deep-dive on specific target keywords
- **Data Type Tag**: `single_keyword`

### 4. Related Keywords

Relevance-scored keyword suggestions with SERP features

- **Fields**: Keyword, relevance score, volume, SERP features array
- **SERP Features**: people_also_ask, knowledge_graph, featured_snippets, local_pack, image_pack, video_carousel, etc.
- **Use Case**: Content expansion and topic clustering
- **Data Type Tag**: `related_keywords`

### 5. Trend Analysis

Historical volume patterns with min/max/average calculations

- **Fields**: Keyword, current volume, 12-month trend data
- **Calculated Metrics**:
  - `trend_avg`: Average monthly volume
  - `trend_max`: Peak monthly volume  
  - `trend_min`: Lowest monthly volume
  - `trend_volatility`: Max - Min difference
- **Use Case**: Seasonality detection and forecasting
- **Data Type Tag**: `keyword_trends`

## Benefits

✅ **Multi-Section Processing**: Handles 5 different SE Ranking data formats automatically  
✅ **Trend Intelligence**: Calculates volume averages, peaks, and valleys from historical data  
✅ **SERP Features**: Captures people_also_ask, knowledge_graph, featured_snippets, and more  
✅ **Intent Mapping**: Tracks informational (I), commercial (C), navigational (N), local (L) intent  
✅ **Scalable Structure**: Each section gets proper data_type tags for easy filtering in Sheets

## Setup Instructions

### Prerequisites

- SE Ranking API credentials configured in n8n
- Google Sheets account connected to n8n
- A Google Sheet prepared (workflow creates columns automatically)

### Step-by-Step Setup

1. **Import the workflow**: Download `workflow.json` and import via n8n UI

2. **Configure SE Ranking Keyword Research node**:

   ```
   Resource: Keyword Research
   
   Operation: Choose based on your need:
     - Get Keyword Lists (organize your keywords)
     - Export Metrics (bulk keyword data)
     - Get Related Keywords (find new opportunities)
     - Get Similar Keywords (close variations)
     - Get Question Keywords (content ideas)
     - Get Longtail Keywords (low-competition targets)
   
   Keyword: your-target-keyword (if applicable)
   Source: us (or your target region)
   
   Optional Filters:
     - Volume From: 100 (minimum monthly searches)
     - Difficulty To: 60 (maximum difficulty score)
     - Limit: 100 (results per request)
   ```

3. **Configure Data Processing** (Function node):
   - Automatically detects data format
   - Adds `date` and `data_type` fields
   - Calculates trend metrics if volume history exists
   - Extracts SERP features into separate columns
   - Maps search intent indicators

4. **Configure Google Sheets node**:
   - **Operation**: Append (or Update if you want to replace)
   - **Spreadsheet**: Your keyword research spreadsheet
   - **Sheet**: "Keyword_Data" (or create multiple sheets per data type)
   - **Columns**: Auto-mapped based on data type

5. **Test the workflow**: Execute to verify data structure

## Configuration Examples

### Example 1: Find Question Keywords for Content

```
SE Ranking Node:
  Resource: Keyword Research
  Operation: Get Question Keywords
  Keyword: seo tools
  Source: us
  Volume From: 500
  Limit: 50

Output Structure:
  date | data_type | keyword | volume | difficulty | cpc | intent | serp_features
  
Use Case: Generate FAQ content and blog post ideas
```

### Example 2: Bulk Keyword Metrics Export

```
SE Ranking Node:
  Resource: Keyword Research
  Operation: Export Metrics
  Keywords: ["keyword 1", "keyword 2", "keyword 3"]
  Source: us

Output Structure:
  date | data_type | keyword | volume | cpc | difficulty | competition | results_count
  
Use Case: Analyze existing keyword list performance
```

### Example 3: Related Keywords with SERP Features

```
SE Ranking Node:
  Resource: Keyword Research
  Operation: Get Related Keywords
  Keyword: content marketing
  Source: us
  Volume From: 1000
  Limit: 100

Output Structure:
  date | data_type | keyword | relevance | volume | difficulty | serp_features | has_featured_snippet | has_paa
  
Use Case: Find content opportunities with rich SERP features
```

### Example 4: Trend Analysis for Seasonality

```
SE Ranking Node:
  Resource: Keyword Research
  Operation: Export Metrics (with trend data)
  Keywords: ["halloween costumes", "christmas gifts"]
  Source: us
  Include: trend_data

Output Structure:
  date | data_type | keyword | volume | trend_avg | trend_max | trend_min | trend_volatility
  
Use Case: Plan content calendar based on seasonal patterns
```

## Output Format

### Keyword Metrics Output

| date | data_type | keyword | volume | cpc | difficulty | competition | intent |
|------|-----------|---------|--------|-----|------------|-------------|--------|
| 2025-10-25 | keyword_metrics | seo tools | 12000 | 15.30 | 68 | 0.82 | C,I |
| 2025-10-25 | keyword_metrics | free seo | 8500 | 8.20 | 45 | 0.65 | C |

### Related Keywords with SERP Features

| date | data_type | keyword | relevance | volume | serp_features | has_featured_snippet | has_paa |
|------|-----------|---------|-----------|--------|---------------|----------------------|---------|
| 2025-10-25 | related_keywords | seo audit | 0.87 | 5400 | featured_snippet,paa | TRUE | TRUE |
| 2025-10-25 | related_keywords | keyword research | 0.92 | 9100 | paa,video_carousel | FALSE | TRUE |

### Trend Analysis Output

| date | data_type | keyword | volume | trend_avg | trend_max | trend_min | trend_volatility |
|------|-----------|---------|--------|-----------|-----------|-----------|------------------|
| 2025-10-25 | keyword_trends | halloween costumes | 45000 | 28000 | 165000 | 3500 | 161500 |
| 2025-10-25 | keyword_trends | seo tools | 12000 | 11800 | 14200 | 9500 | 4700 |

## Search Intent Mapping

The workflow automatically detects and tags search intent:

- **I (Informational)**: "how to", "what is", "guide", "tutorial"
- **C (Commercial)**: "best", "review", "vs", "compare", "top"
- **N (Navigational)**: Brand names, product names, login
- **L (Local)**: "near me", "in [city]", location terms

**Example**: "best seo tools 2024" → Intent: `C,I` (Commercial + Informational)

## SERP Features Tracked

- `featured_snippet`: Rich answer boxes
- `people_also_ask`: PAA boxes
- `knowledge_graph`: Knowledge panels
- `local_pack`: Map results
- `image_pack`: Image carousels
- `video_carousel`: Video results
- `shopping_results`: Product listings
- `site_links`: Enhanced site links
- `reviews`: Star ratings

**Use in filtering**: Target keywords with `has_featured_snippet = TRUE` for quick-win content optimization

## Scheduling (Optional)

Convert Manual Trigger to Schedule Trigger for automation:

**Recommended Schedule:**

```
Trigger: Every day at 8:00 AM
Timezone: Your local timezone
Cron: 0 8 * * *
```

**Why Daily?**

- Keyword volumes update regularly in SE Ranking
- New related keywords appear as trends evolve
- SERP features change based on algorithm updates

This creates an automated daily keyword intelligence pipeline feeding your SEO dashboard!

## Advanced Workflows

### Multi-Keyword Research Pipeline

Combine multiple operations:

1. **Get Similar Keywords** (seed expansion)
2. **Wait 2 seconds** (rate limiting)
3. **Get Related Keywords** (topic clustering)
4. **Wait 2 seconds**
5. **Get Question Keywords** (content ideas)
6. **Wait 2 seconds**
7. **Merge All Results**
8. **Remove Duplicates**
9. **Export Metrics** for full dataset
10. **Export to Google Sheets**

### Competitor Keyword Discovery

1. **SE Ranking Domain Analysis**: Get competitor keywords (position 1-10)
2. **Extract Keywords**: Pull keyword list from results
3. **SE Ranking Keyword Research**: Get full metrics for competitor keywords
4. **Filter**: Keep volume > 1000, difficulty < 60
5. **Compare**: Cross-reference with your own keyword list
6. **Export**: Save gap opportunities to Google Sheets

### Content Calendar Automation

1. **Get Question Keywords**: Find "how to", "what is", "why" questions
2. **Get Related Keywords**: Expand topic clusters
3. **Calculate Trend Scores**: Identify rising/falling keywords
4. **Score by Priority**: Volume × Relevance ÷ Difficulty
5. **Sort & Limit**: Top 20 opportunities
6. **Export to Notion/Airtable**: Content ideas with target dates

## Troubleshooting

### No Trend Data Appearing

- **Problem**: trend_avg, trend_max, trend_min columns are empty
- **Solution**: SE Ranking only provides trend data for certain operations (Export Metrics with trend parameter); not all keywords have historical data

### SERP Features Not Detected

- **Problem**: serp_features column is blank
- **Solution**: Only "Get Related Keywords" operation returns SERP features; other operations don't include this data

### Rate Limit Errors

- **Problem**: API returns 429 Too Many Requests
- **Solution**: Add Wait nodes (2-5 seconds) between SE Ranking calls; reduce Limit parameter

### Intent Mapping Incomplete

- **Problem**: Some keywords show no intent tags
- **Solution**: Intent detection is keyword-based; generic terms may not match patterns; consider adding custom intent rules in Function node

## Customization Ideas

### Custom Intent Detection

Modify Function node to add your own intent patterns:

```javascript
// Add brand-specific intent
if (keyword.includes('your-brand')) {
  intent.push('N'); // Navigational
}
if (keyword.match(/\d{4}/)) { // Year mentioned
  intent.push('C'); // Likely commercial
}
```

### Keyword Scoring Formula

Add custom priority scoring:

```javascript
// Priority = (Volume × Relevance) / (Difficulty + 1)
item.json.priority_score = 
  (item.json.volume * item.json.relevance) / 
  (item.json.difficulty + 1);
```

### Auto-Tag by Topic

Categorize keywords automatically:

```javascript
const topics = {
  'tools': ['software', 'tool', 'platform'],
  'guides': ['how to', 'guide', 'tutorial'],
  'comparisons': ['vs', 'versus', 'compare', 'best']
};

// Match keyword against topics
for (let [topic, patterns] of Object.entries(topics)) {
  if (patterns.some(p => keyword.includes(p))) {
    item.json.topic = topic;
    break;
  }
}
```

## Performance Tips

- **Batch Keywords**: Use Export Metrics with arrays of 50-100 keywords per call
- **Cache Results**: Store processed data to avoid re-fetching
- **Pagination**: Use offset/limit for large result sets
- **Parallel Processing**: Split into multiple workflows by region or keyword group

## Data Analysis Ideas

### In Google Sheets

**Opportunity Matrix Pivot Table:**

- Rows: difficulty (grouped: 0-30, 31-60, 61+)
- Columns: volume (grouped: 0-1000, 1001-5000, 5000+)
- Values: Count of keywords

**Seasonal Trend Chart:**

- X-axis: Month
- Y-axis: Average volume
- Filter: Keywords with trend_volatility > 10000

**SERP Feature Breakdown:**

- Column: has_featured_snippet
- Column: has_paa
- Calculate: % of keywords with each feature

## Additional Resources

- [SE Ranking Keyword Research API](https://seranking.com/api-v3.html#tag/Keyword-Research)
- [n8n Function Node Advanced](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.function/)
- [Google Sheets Formulas for SEO](https://www.blog.google/products/sheets/)

## License

This workflow is provided as-is for demonstration purposes. Customize freely for your needs.

Perfect for building an automated keyword intelligence pipeline feeding your content strategy!
