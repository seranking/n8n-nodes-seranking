# n8n-nodes-seranking

This is an n8n custom node that lets you use [SE Ranking](https://seranking.com/) in your n8n workflows.

SE Ranking is a comprehensive SEO platform providing keyword research, competitor analysis, website audits, backlink monitoring, and AI search visibility tracking.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

---

## Table of Contents

- [Installation](#installation)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Resources](#resources)
  - [AI Search](#ai-search)
  - [Domain Analysis](#domain-analysis)
  - [Keyword Research](#keyword-research)
- [Usage Examples](#usage-examples)
- [API Documentation](#api-documentation)
- [Version History](#version-history)

---

## Installation

### Option 1: Install via npm

```bash
npm install n8n-nodes-seranking
```

### Option 2: Install from .tgz file

If you have the packaged file:

```bash
npm install n8n-nodes-seranking-1.0.7.tgz
```

### Option 3: Manual Installation

1. Download or clone this repository
2. Copy the node folder to your n8n custom nodes directory
3. Run `npm install` in the node directory
4. Restart n8n

**After installation, restart n8n to load the node.**

---

## Credentials

To use this node, you need:

1. **SE Ranking Account** - Sign up at [seranking.com](https://seranking.com/)
2. **API Token** - Generate from your [SE Ranking API Dashboard](https://api.seranking.com/)

### Setting up credentials in n8n

1. Open any workflow and add the **SE Ranking** node
2. Click on **Create New Credential**
3. Enter your **API Token**
4. Select **Data API** as API Type
5. Click **Save**

The node will automatically test your credentials by making a test request to the SE Ranking API.

---

## Compatibility

- **n8n version**: 1.0.0 or higher
- **Node.js version**: 18.x or higher
- **SE Ranking API**: v1 (Data API)

---

## Resources

This node provides access to 3 major SE Ranking resources with a total of 13 operations:

### AI Search

Track your visibility in AI-powered search engines and Large Language Models (LLMs).

**Operations (4):**

- **Get Overview** - Get LLM visibility metrics for a domain
- **Discover Brand** - Identify brand name for a domain
- **Get Prompts by Target** - Get prompts mentioning target domain
- **Get Prompts by Brand** - Get prompts mentioning brand name

**Supported Engines:**

- ChatGPT (OpenAI)
- Google AI Overview
- Perplexity AI
- Google Gemini
- AI Mode

**Key Features:**

- Track brand mentions in LLM responses
- Monitor AI visibility across different engines
- Identify high-volume prompts where your domain appears
- Compare visibility against competitors
- Filter by scope (base_domain, domain, or exact URL)

**Use Cases:**

- Monitor brand mentions in LLM responses
- Track AI visibility across different engines
- Identify prompts where competitors appear
- Optimize content for AI-generated answers
- Measure LLM visibility ROI

**Example:**

```
Resource: AI Search
Operation: Get Overview
Domain: example.com
Engine: chatgpt
Source: us
Scope: base_domain
```

**Response includes:**

- Total prompts where domain appears
- Appearance types (Link, Brand mention, Citation)
- Total impressions/volume
- Breakdown by position and type

---

### Domain Analysis

Competitive domain research and keyword ranking analysis.

**Operations (4):**

- **Get Regional Database Overview** - Detailed statistics for a specific regional database (FAST)
- **Get Worldwide Aggregate** - Worldwide aggregate statistics for a domain (RECOMMENDED)
- **Get Keywords** - Keywords for which a domain ranks
- **Get Competitors** - Competitor domains

**Key Features:**

- Fast regional database queries (1-3 seconds)
- Worldwide aggregate data across all databases
- Organic and paid keyword rankings
- Advanced filtering (volume, position, CPC)
- Competitor identification with statistics
- Subdomain analysis support

**Use Cases:**

- Competitive analysis
- Market research
- Keyword gap analysis
- Traffic estimation
- Competitor identification
- Regional performance tracking

**Example - Get Regional Overview:**

```
Resource: Domain Analysis
Operation: Get Regional Database Overview
Domain: example.com
Source: us
Include Subdomains: true
```

**Response includes:**

- Total keywords ranking
- Organic/paid traffic estimates
- Average position
- Visibility score
- Top keywords

**Example - Get Keywords:**

```
Resource: Domain Analysis
Operation: Get Keywords
Domain: example.com
Source: us
Type: organic
Position From: 1
Position To: 20
Volume From: 100
Limit: 1000
Sort: position (asc)
```

**Response includes:**

- Keyword text
- Current position
- Previous position (change tracking)
- Search volume
- CPC value
- Competition score
- Ranking URL
- Traffic estimates

---

### Keyword Research

Keyword metrics, suggestions, and difficulty analysis.

**Operations (5):**

- **Export Metrics** - Volume, CPC, competition, difficulty for multiple keywords
- **Get Similar Keywords** - Semantically similar keywords
- **Get Related Keywords** - Topically related keywords with overlapping URLs
- **Get Question Keywords** - Question-based keywords
- **Get Longtail Keywords** - Long-tail keyword variations

**Metrics Available:**

- **Search Volume** - Monthly search volume
- **Cost Per Click (CPC)** - Average CPC for ads
- **Competition Score** - Advertising competition (0.0-1.0)
- **Keyword Difficulty** - SEO difficulty score (0-100)
- **Historical Trend** - 12 months of search volume data (optional)

**Key Features:**

- Bulk keyword metrics (up to 700 keywords per request)
- Advanced filtering by volume, CPC, difficulty, competition
- Historical trend data for seasonality analysis
- Pagination for large result sets
- Multiple suggestion types for comprehensive research

**Use Cases:**

- Content planning and strategy
- PPC campaign research
- SEO keyword targeting
- Topic clustering and content gaps
- Long-tail keyword discovery
- Seasonal trend analysis

**Example - Export Metrics:**

```
Resource: Keyword Research
Operation: Export Metrics
Source: us
Keywords: 
  seo tools
  keyword research
  backlink checker
Columns: keyword, volume, cpc, competition, difficulty
Sort: volume (desc)
```

**Response includes:**

```json
[
  {
    "keyword": "seo tools",
    "volume": 74000,
    "cpc": 15.32,
    "competition": 0.87,
    "difficulty": 68
  },
  {
    "keyword": "keyword research",
    "volume": 22000,
    "cpc": 12.45,
    "competition": 0.73,
    "difficulty": 55
  }
]
```

**Example - Get Similar Keywords:**

```
Resource: Keyword Research
Operation: Get Similar Keywords
Source: us
Keyword: seo tools
Volume From: 500
Difficulty To: 50
Limit: 100
Include History Trend: true
```

**Response includes:**

- Similar keyword suggestions
- Full metrics for each keyword
- Optional 12-month trend data
- Sorted by relevance and volume

---

## Usage Examples

### Example 1: Monitor AI Visibility Across Engines

Track how often your brand appears in different LLM engines:

```
1. SE Ranking Node
   Resource: AI Search
   Operation: Get Overview
   Domain: example.com
   Engine: chatgpt
   Source: us
   Scope: base_domain

2. SE Ranking Node (duplicate for other engines)
   Engine: perplexity
   
3. SE Ranking Node (duplicate)
   Engine: gemini

4. Merge Node
   Combine results from all engines

5. Google Sheets Node
   Append to: AI Visibility Tracker
   Columns: Date, Engine, Total Prompts, Impressions
```

**Result**: Weekly dashboard tracking AI visibility trends across platforms.

---

### Example 2: Find High-Volume Prompts

Identify valuable AI search opportunities:

```
1. SE Ranking Node
   Resource: AI Search
   Operation: Get Prompts by Target
   Domain: example.com
   Engine: chatgpt
   Source: us
   Limit: 1000
   Sort: volume (desc)

2. Filter Node
   Keep only: volume > 1000

3. SE Ranking Node
   Resource: Keyword Research
   Operation: Export Metrics
   Keywords: {{ $json.prompts.map(p => p.text) }}

4. Sort Node
   Sort by: difficulty (asc)
   
5. Limit Node
   Keep first: 20

6. Send to Content Team
```

**Result**: List of high-volume, low-difficulty prompts for content optimization.

---

### Example 3: Keyword Research Workflow

Comprehensive keyword research from a seed keyword:

```
1. Manual Trigger
   Input: seed_keyword = "seo tools"

2. SE Ranking Node
   Resource: Keyword Research
   Operation: Get Similar Keywords
   Keyword: {{ $json.seed_keyword }}
   Source: us
   Volume From: 500
   Difficulty To: 60
   Limit: 100

3. SE Ranking Node
   Resource: Keyword Research
   Operation: Get Related Keywords
   Keyword: {{ $json.seed_keyword }}
   Volume From: 500

4. SE Ranking Node
   Resource: Keyword Research
   Operation: Get Question Keywords
   Keyword: {{ $json.seed_keyword }}
   Volume From: 100

5. SE Ranking Node
   Resource: Keyword Research
   Operation: Get Longtail Keywords
   Keyword: {{ $json.seed_keyword }}
   Limit: 100

6. Merge Node
   Combine all keyword lists
   Remove duplicates

7. Google Sheets Node
   Create new sheet: SEO Tools Keywords
   Include: keyword, volume, cpc, difficulty

8. Sort by: volume (desc)
```

**Result**: Comprehensive keyword list with similar, related, questions, and longtail variations.

---

### Example 4: Competitor Keyword Gap Analysis

Find keywords competitors rank for that you don't:

```
1. SE Ranking Node
   Resource: Domain Analysis
   Operation: Get Keywords
   Domain: competitor.com
   Source: us
   Type: organic
   Position From: 1
   Position To: 20
   Limit: 1000

2. SE Ranking Node
   Resource: Domain Analysis
   Operation: Get Keywords
   Domain: yourdomain.com
   Source: us
   Type: organic
   Limit: 1000

3. Compare Lists Node (custom function)
   Find keywords in competitor list but not in your list

4. SE Ranking Node
   Resource: Keyword Research
   Operation: Export Metrics
   Keywords: {{ $json.gap_keywords }}

5. Filter Node
   Keep: difficulty < 50, volume > 500

6. Sort Node
   Sort by: volume (desc)

7. Airtable Node
   Create records in: Keyword Opportunities
   Include: keyword, volume, difficulty, competitor_url
```

**Result**: Actionable list of keyword opportunities where competitors are winning.

---

### Example 5: Track Competitor Rankings

Monitor competitor movement in search results:

```
1. Schedule Trigger
   Run: Every Monday at 9 AM

2. SE Ranking Node
   Resource: Domain Analysis
   Operation: Get Competitors
   Domain: yourdomain.com
   Source: us
   Type: organic
   Limit: 10

3. Loop Over Competitors

4. SE Ranking Node (inside loop)
   Resource: Domain Analysis
   Operation: Get Regional Database Overview
   Domain: {{ $json.competitor_domain }}
   Source: us

5. Store in Database
   Table: Competitor_Tracking
   Columns: date, competitor, keywords_count, 
            organic_traffic, avg_position

6. Compare with Last Week
   Calculate: keyword changes, traffic changes

7. Slack/Email Alert
   If any competitor gained >100 keywords
```

**Result**: Weekly competitor monitoring with automated alerts.

---

### Example 6: Regional Performance Analysis

Compare domain performance across different countries:

```
1. SE Ranking Node
   Resource: Domain Analysis
   Operation: Get Regional Database Overview
   Domain: example.com
   Source: us

2. SE Ranking Node (duplicate)
   Source: uk

3. SE Ranking Node (duplicate)
   Source: de

4. SE Ranking Node (duplicate)
   Source: fr

5. Merge Node
   Combine all regional data

6. Calculate Metrics
   - Best performing region
   - Total global keywords
   - Traffic by region

7. Google Data Studio API
   Update dashboard: Global Performance Overview
```

**Result**: Multi-regional performance dashboard.

---

### Example 7: Content Opportunity Finder

Identify content gaps using AI Search and Keyword Research:

```
1. SE Ranking Node
   Resource: AI Search
   Operation: Get Prompts by Target
   Domain: competitor.com
   Engine: chatgpt
   Source: us
   Limit: 500

2. Filter Node
   Keep prompts where you're not mentioned

3. SE Ranking Node
   Resource: Keyword Research
   Operation: Export Metrics
   Keywords: {{ $json.prompts }}

4. SE Ranking Node
   Resource: Keyword Research
   Operation: Get Question Keywords
   For each high-volume keyword

5. Filter Node
   Keep: volume > 1000, difficulty < 60

6. Notion API Node
   Create pages in: Content Ideas
   Include: prompt, volume, difficulty, 
            current_top_results, content_angle
```

**Result**: Content ideas based on competitor AI visibility and keyword data.

---

## API Documentation

This node implements the following SE Ranking APIs:

- [AI Search API](https://seranking.com/api/data/ai-search/)
- [Domain Analysis API](https://seranking.com/api/data/domain-analysis/)
- [Keyword Research API](https://seranking.com/api/data/keyword-research/)

For detailed API specifications, visit [SE Ranking API Documentation](https://seranking.com/api-google-organic.html).

---

## Version History

### v1.0.7 (Current)

- ✅ Complete AI Search resource (4 operations)
- ✅ Complete Domain Analysis resource (4 operations)
- ✅ Complete Keyword Research resource (5 operations)
- ✅ Total: 13 operations across 3 resources
- ✅ Comprehensive error handling with detailed messages
- ✅ Full TypeScript support
- ✅ Input validation (domains, sources, dates)
- ✅ Pagination support (offset/limit)
- ✅ Advanced filtering options
- ✅ Multi-keyword support (up to 700 keywords)

---

## Features

✅ **13 Operations** - Comprehensive coverage across 3 major resources
✅ **Type Safety** - Full TypeScript implementation with strict typing
✅ **Error Handling** - Detailed error messages with troubleshooting hints
✅ **Pagination** - Efficient handling of large datasets
✅ **Advanced Filtering** - Volume, position, CPC, difficulty filters
✅ **Validation** - Input validation for domains, country codes, and parameters
✅ **Authentication** - Automatic credential management and testing
✅ **Rate Limiting** - Built-in rate limit handling with retry logic
✅ **Batch Operations** - Support for multiple keywords/domains

---

## Limitations

- **Rate Limits**: SE Ranking API has rate limits (varies by plan)
- **Regional Data**: Some data is region-specific (requires country code)
- **Keyword Limits**: Export Metrics supports up to 700 keywords per request
- **Historical Data**: History trend data adds to response time
- **API Credits**: Some operations consume API credits (check your plan)

---

## Troubleshooting

### Authentication Errors

**Problem**: "401 Unauthorized" or "Invalid API Token"

**Solution**:

1. Verify API token is correct (copy from SE Ranking dashboard)
2. Ensure API Type is set to "Data API"
3. Check token hasn't expired
4. Regenerate token in SE Ranking dashboard if needed
5. Test credentials using the "Test" button in n8n

---

### Invalid Source/Country Code

**Problem**: "Invalid source" or "400 Bad Request"

**Solution**:

1. Use correct Alpha-2 country codes: `us`, `uk`, `de`, `fr`, `es`, `it`, `ca`, `au`, `pl`
2. Country code must be lowercase
3. Check if SE Ranking has data for that region
4. Some engines/features may not be available in all regions

---

### Domain Format Errors

**Problem**: "Invalid domain format" or "Domain validation failed"

**Solution**:

1. Remove `http://` or `https://` from domain (unless operation specifies full URL)
2. Remove `www.` prefix
3. Remove trailing slashes
4. Use format: `example.com` not `www.example.com/`
5. For subdomains: `blog.example.com` is valid

**Valid formats:**

- ✅ `example.com`
- ✅ `blog.example.com`
- ✅ `example.co.uk`
- ❌ `https://example.com`
- ❌ `www.example.com`
- ❌ `example.com/`

---

### Empty Results

**Problem**: No data returned from API

**Solution**:

1. Verify domain has data in SE Ranking database
2. Check if domain is indexed/tracked
3. Try different source/region (domain may rank elsewhere)
4. Adjust filters - they may be too restrictive
5. For new domains, wait 24-48 hours for initial data collection
6. Check if keyword has search volume in selected region

---

### Timeout Errors

**Problem**: "Request timeout" or "Operation exceeded time limit"

**Solution**:

1. Reduce `limit` parameter (try 100 instead of 1000)
2. Use pagination with `offset` to fetch data in chunks
3. For keyword export, reduce number of keywords (try 100 instead of 700)
4. Remove `history_trend` parameter if not needed (adds processing time)
5. Use "Get Worldwide Aggregate" instead of getting all regional databases

---

### Too Many Keywords Error

**Problem**: "Too many keywords" or "Maximum 700 keywords exceeded"

**Solution**:

1. Split keyword list into batches of 700 or less
2. Use multiple node executions with different batches
3. Consider using keyword suggestion operations first to narrow down list

---

### Rate Limit Errors

**Problem**: "429 Too Many Requests" or "Rate limit exceeded"

**Solution**:

1. Add delay between requests using n8n Wait node
2. Reduce frequency of scheduled workflows
3. Use batch operations instead of individual requests
4. Upgrade SE Ranking plan for higher rate limits
5. Implement exponential backoff retry logic

---

## Best Practices

### 1. Efficient Data Retrieval

✅ **DO:**

- Use "Get Worldwide Aggregate" for quick domain overview
- Use pagination for large datasets (limit: 100-500)
- Cache frequently accessed data
- Use filters to reduce result size

❌ **DON'T:**

- Request all databases when you only need one region
- Fetch 10,000 keywords at once without pagination
- Request history_trend unless specifically needed

### 2. Keyword Research

✅ **DO:**

- Start with similar keywords, then expand to related/questions
- Use filters to focus on achievable opportunities (difficulty < 50)
- Export metrics in batches of 200-500 keywords
- Include multiple keyword types for comprehensive research

❌ **DON'T:**

- Request all keyword types simultaneously without filtering
- Ignore difficulty scores (targeting too-hard keywords wastes effort)
- Forget to check search intent and relevance

### 3. Competitor Analysis

✅ **DO:**

- Use "Get Competitors" to identify relevant competitors first
- Track competitor changes over time (weekly/monthly)
- Focus on keywords where competitors rank in top 20
- Analyze multiple competitors to find patterns

❌ **DON'T:**

- Compare against irrelevant competitors
- Track too many competitors (focus on top 5-10)
- Ignore competitor's content strategy and backlink profile

### 4. AI Search Optimization

✅ **DO:**

- Monitor multiple engines (ChatGPT, Perplexity, Gemini)
- Track brand mentions and citation types
- Focus on high-volume prompts
- Use base_domain scope for brand monitoring

❌ **DON'T:**

- Only track one LLM engine
- Ignore prompt context and user intent
- Forget to optimize content based on insights

### 5. Error Handling

✅ **DO:**

- Implement retry logic for transient errors
- Log errors for debugging
- Use n8n's "Continue on Fail" for batch operations
- Validate input before API calls

❌ **DON'T:**

- Ignore error messages (they contain helpful hints)
- Retry immediately after rate limit (wait 60s)
- Skip input validation

---

## Support & Resources

- **Issues**: Report bugs and request features via GitHub Issues
- **n8n Community**: [n8n Community Forum](https://community.n8n.io/)
- **SE Ranking Support**: [SE Ranking Help Center](https://help.seranking.com/)
- **API Documentation**: [SE Ranking API Docs](https://seranking.com/api.html)

---

### Development Setup

```bash
# Clone the repository
git clone https://github.com/seranking/n8n-nodes-seranking.git

# Navigate to directory
cd n8n-nodes-seranking

# Install dependencies
npm install

# Build the node
npm run build

# Watch for changes during development
npm run dev
```

### Project Structure

```
n8n-nodes-seranking/
│
├── credentials/
│   └── SeRankingApi.credentials.ts             # API credentials configuration
│
├── nodes/
│   └── SeRanking/
│       ├── SeRanking.node.ts                   # Main node definition
│       ├── dataApi/
│       │   ├── operations/
│       │   ├── AiSearchOperations.ts           # AI Search operations logic
│       │   ├── DomainAnalysisOperations.ts     # Domain Analysis operations logic
│       │   └── KeywordResearchOperations.ts    # Keyword Research operations logic
│       │   └── descriptions/
│       │   ├── AiSearchDescription.ts          # AI Search UI definitions
│       │   ├── DomainAnalysisDescription.ts    # Domain Analysis UI definitions
│       │   └── KeywordResearchDescription.ts   # Keyword Research UI definitions
│       └── utils/
│           ├── validators.ts                   # Input validators
│           └── apiRequest.ts                   # API request handler
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## Acknowledgments

- Built for the [n8n](https://n8n.io/) workflow automation platform
- Powered by [SE Ranking API](https://seranking.com/)

---

## Keywords

n8n, n8n-custom-node, seranking, seo, keyword-research, domain-analysis, ai-search, llm-visibility, serp-tracking, competitive-analysis, seo-automation, workflow-automation

---

**Made with ❤️ for SEO professionals using n8n**
