# n8n-nodes-seranking

This is an n8n custom node that lets you use [SE Ranking](https://seranking.com/) in your n8n workflows.

SE Ranking is a comprehensive SEO platform providing keyword research, competitor analysis, website audits, backlink monitoring, and AI search visibility tracking.

[n8n](https://n8n.io/) is a workflow automation platform.

---

## Table of Contents

- [Installation](#installation)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Operations](#operations)
- [Usage Examples](#usage-examples)
- [API Documentation](#api-documentation)
- [Version History](#version-history)

---

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Prerequisites

- Node.js 18.x or higher
- n8n 1.0.0 or higher
- SE Ranking API Token ([Get it here](https://online.seranking.com/admin.api.dashboard.html))

### npm (Recommended)

```bash
npm install @seranking/n8n-nodes-seranking
```

### Quick Installation

1. Navigate to your n8n installation directory
2. Install the package:
   ```bash
   npm install @seranking/n8n-nodes-seranking
   ```
3. Restart n8n

### Manual Install

### Step 1: Install n8n

```bash
npm install n8n -g
```

### Step 2: Install SE Ranking Node

**Option A: From .tgz file**

```bash
npm install -g n8n-nodes-seranking-1.2.0.tgz
```

**Option B: From GitHub**

```bash
npm install -g git+https://github.com/seranking/n8n-nodes-seranking.git
```

**Option C: From source (for developers)**

```bash
cd ~/.n8n/custom
git clone https://github.com/seranking/n8n-nodes-seranking.git
cd n8n-nodes-seranking
npm install
npm run build
npm link
```

### Step 3: Start n8n

```bash
n8n start
```

Open `http://localhost:5678` and add the SE Ranking node to your workflow.

### Step 4: Configure Credentials

1. Add SE Ranking node
2. Click "Create New Credential"
3. Enter your API Token
4. Select "Data API" as API Type
5. Save

### Docker Installation

```bash
# Create custom directory
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom

# Install node 
npm install @seranking/n8n-nodes-seranking
# OR
npm install git+https://github.com/seranking/n8n-nodes-seranking.git

# Run n8n
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

### Verify Installation

1. Open n8n at `http://localhost:5678`
2. Search for "SE Ranking" node
3. If it appears, installation successful ✓

### Updating

**From .tgz:**

```bash
npm uninstall -g n8n-nodes-seranking
npm install -g n8n-nodes-seranking-NEW-VERSION.tgz
```

**From GitHub:**

```bash
npm update -g n8n-nodes-seranking
```

**From source:**

```bash
cd ~/.n8n/custom/n8n-nodes-seranking
git pull
npm install
npm run build
```

Then restart n8n
---

## Credentials

To use this node, you need:

1. **SE Ranking Account** - Sign up at [seranking.com](https://seranking.com/)
2. **API Token** - Generate from your [SE Ranking API Dashboard](https://online.seranking.com/admin.api.dashboard.html)

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

## Operations

This node provides access to 5 SE Ranking resources with 54 total operations:

### AI Search (4 operations)

- Get Overview - LLM visibility metrics across ChatGPT, Perplexity, Gemini
- Discover Brand - Identify brand name for domain
- Get Prompts by Target - Find prompts mentioning your domain
- Get Prompts by Brand - Track brand mentions in AI responses

### Backlinks (25 operations)

- Get Summary - Complete backlink portfolio overview
- Get Metrics - Key metrics for multiple targets
- Get All Backlinks - Detailed backlink list with filters
- Get Raw Backlinks - Cursor-based bulk retrieval
- Get Count - Total backlinks count
- Export Backlinks - Bulk export functionality
- Check Export Status - Monitor export progress
- Download Export Data - Retrieve completed exports
- Get History - New/lost backlinks by date range
- Get History Count - Daily new/lost counts
- Get Cumulative History - Historical growth tracking
- Get Anchors - Anchor text analysis
- Get Referring Domains - List of linking domains
- Get Referring Domains Count - Unique domain count
- Get Referring Domains History - Domain link changes
- Get Referring Domains History Count - Domain change counts
- Get Referring IPs - IP addresses of linking sites
- Get Referring IPs Count - Unique IP count
- Get Referring Subnets Count - /24 subnet diversity
- Get Indexed Pages - Pages in backlink index
- Get Authority - InLink Rank metrics
- Get Domain Authority - Domain-level authority
- Get Domain Authority Distribution - Authority score distribution
- Get Page Authority - Page-level authority
- Get Page Authority History - Historical authority tracking

### Domain Analysis (8 operations)

- Get Regional Database Overview - Regional performance data
- Get Worldwide Aggregate - Global domain statistics
- Get Overview History - Historical metrics tracking
- Get Keywords - Ranking keywords with filters
- Get Keywords Comparison - Domain vs competitor analysis
- Get Competitors - Identify competing domains
- Get Paid Ads for Keyword - Advertisers on keywords
- Get Paid Ads for Domain - Domain's advertising keywords

### Keyword Research (5 operations)

- Export Metrics - Bulk keyword metrics (up to 700 keywords)
- Get Similar Keywords - Semantically similar suggestions
- Get Related Keywords - Topically related keywords
- Get Question Keywords - Question-based variations
- Get Longtail Keywords - Long-tail opportunities

### Website Audit (14 operations)

- Create Standard Audit - HTML site audit
- Create Advanced Audit - JS-rendered audit for SPAs
- List Audits - All audits with status
- Get Audit Status - Check audit progress
- Get Audit Report - Full audit results
- Get Crawled Pages - List of crawled URLs
- Get Issues by Type - Pages with specific issues
- Get Issues by URL - All issues for one URL
- Get Links - Internal/external links found
- Get Audit History - Historical audit snapshots
- Update Audit - Modify audit details
- Delete Audit - Remove audit
- Recheck Standard Audit - Re-run HTML audit
- Recheck Advanced Audit - Re-run JS audit


## Usage Examples

Ready-to-use workflows demonstrating real-world applications of the SE Ranking node. Each example includes importable n8n workflows, setup instructions, and expected outputs.

---

### 🤖 Example 1: AI Search Visibility Tracker

**Track your brand's presence across ChatGPT, Perplexity, and Gemini**

Monitor how often your brand appears in AI-powered search engines with automated historical tracking.

**What You'll Get:**

- Link presence count across multiple AI engines
- Average position tracking in AI citations
- AI opportunity traffic estimates
- Period-over-period comparison metrics

**Best For:** Marketing teams tracking AI SEO performance, Brand managers monitoring AI visibility

📁 [View Full Guide & Download Workflow →](./Usage-Examples/AI-Search)

---

### 🔗 Example 2: Backlinks Monitoring & Analysis

**Track new/lost backlinks, monitor domain authority, and analyze anchor text distribution**

Automatically monitor backlink portfolio health with daily tracking and alerts for significant changes.

**What You'll Get:**

- Daily new/lost backlink reports
- Domain authority trend tracking
- Anchor text distribution analysis
- Referring domain diversity metrics
- Export-ready CSV/Excel reports

**Best For:** SEO agencies managing client backlink portfolios, In-house SEO teams tracking link-building campaigns

📁 [View Full Guide & Download Workflow →](./Usage-Examples/Backlinks)

---

### 📊 Example 3: Domain Analysis Data Processor

**Transform SE Ranking API data into structured Google Sheets reports**

Automatically process and organize domain analysis data with intelligent type detection.

**What You'll Get:**

- Regional performance across 200+ countries
- Domain summary with organic vs. paid breakdown
- Keywords analysis with positions and difficulty
- Competitor insights and gap analysis

**Best For:** SEO agencies managing multiple clients, Enterprise teams tracking regional performance

📁 [View Full Guide & Download Workflow →](./Usage-Examples/Domain-Analysis)

---

### 🔍 Example 4: Keyword Research Automation

**Automate comprehensive keyword research with trend analysis**

Build an automated keyword intelligence pipeline with historical tracking and SERP features.

**What You'll Get:**

- Bulk keyword metrics with volume and CPC
- Historical trend analysis (peaks, valleys, averages)
- SERP features tracking (PAA, featured snippets, etc.)
- Search intent mapping (informational, commercial, navigational)

**Best For:** Content strategists planning editorial calendars, SEO specialists doing competitor research

📁 [View Full Guide & Download Workflow →](./Usage-Examples/Keyword-Research)

---

### 🔧 Example 5: Website Audit Automation

**Automatically crawl sites, detect issues, and generate reports**

Schedule regular technical SEO audits and get alerts when critical issues are detected.

**What You'll Get:**

- Automated monthly/weekly site audits
- Issue detection across 25+ SEO factors
- Historical issue tracking and resolution monitoring
- Exportable reports for clients/stakeholders

**Best For:** Development teams doing pre-launch checks, SEO consultants managing multiple client sites

📁 [View Full Guide & Download Workflow →](./Usage-Examples/Website-Audit)

---

### 🚀 Quick Start

1. **Browse** the example that matches your use case
2. **Download** the `workflow.json` file from the example folder
3. **Import** into n8n (Workflows → Import from File)
4. **Configure** your SE Ranking API credentials
5. **Run** and customize to your needs

**Need help?** Each example includes troubleshooting tips and configuration details.

---

## API Documentation

This node implements the following SE Ranking APIs:

- [AI Search API](https://seranking.com/api/data/ai-search/)
- [Backlinks API](https://seranking.com/api/data/backlinks/)
- [Domain Analysis API](https://seranking.com/api/data/domain-analysis/)
- [Keyword Research API](https://seranking.com/api/data/keyword-research/)
- [Website Audit API](https://seranking.com/api/data/website-audit/)

For detailed API specifications, visit [SE Ranking API Documentation](https://seranking.com/api.html).

---

## Version History

### v1.2.0 (Current)

- ✅ Complete AI Search resource (4 operations)
- ✅ **NEW: Complete Backlinks resource (25 operations)**
- ✅ Enhanced Domain Analysis resource (8 operations - added History, Comparison, Paid Ads)
- ✅ Complete Keyword Research resource (5 operations)
- ✅ **NEW: Complete Website Audit resource (14 operations)**
- ✅ **Total: 54 operations across 5 resources**
- ✅ Comprehensive error handling with detailed messages
- ✅ Full TypeScript support
- ✅ Input validation (domains, sources, dates)
- ✅ Pagination support (offset/limit)
- ✅ Advanced filtering options
- ✅ Multi-keyword support (up to 700 keywords)
- ✅ **NEW: Backlink export and bulk operations**
- ✅ **NEW: Website audit creation and management**

### v1.0.7

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

✅ **54 Operations** - Comprehensive coverage across 5 major resources  
✅ **Type Safety** - Full TypeScript implementation with strict typing  
✅ **Error Handling** - Detailed error messages with troubleshooting hints  
✅ **Pagination** - Efficient handling of large datasets  
✅ **Advanced Filtering** - Volume, position, CPC, difficulty filters  
✅ **Validation** - Input validation for domains, country codes, and parameters  
✅ **Authentication** - Automatic credential management and testing  
✅ **Rate Limiting** - Built-in rate limit handling with retry logic  
✅ **Batch Operations** - Support for multiple keywords/domains  
✅ **Backlink Monitoring** - Complete backlink analysis and tracking  
✅ **Website Auditing** - Technical SEO audits with issue detection

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

### 3. Backlink Monitoring

✅ **DO:**

- Schedule daily checks for new/lost backlinks
- Use "Get Summary" for quick health checks
- Export full data monthly for archival
- Track Domain InLink Rank trends over time
- Monitor anchor text distribution for natural link profile

❌ **DON'T:**

- Poll "Get All Backlinks" every hour (use history endpoints)
- Download exports without checking status first
- Ignore referring domain diversity (IP distribution)

### 4. Competitor Analysis

✅ **DO:**

- Use "Get Competitors" to identify relevant competitors first
- Track competitor changes over time (weekly/monthly)
- Focus on keywords where competitors rank in top 20
- Analyze multiple competitors to find patterns

❌ **DON'T:**

- Compare against irrelevant competitors
- Track too many competitors (focus on top 5-10)
- Ignore competitor's content strategy and backlink profile

### 5. AI Search Optimization

✅ **DO:**

- Monitor multiple engines (ChatGPT, Perplexity, Gemini)
- Track brand mentions and citation types
- Focus on high-volume prompts
- Use base_domain scope for brand monitoring

❌ **DON'T:**

- Only track one LLM engine
- Ignore prompt context and user intent
- Forget to optimize content based on insights

### 6. Website Auditing

✅ **DO:**

- Use Advanced Audit for JavaScript-heavy sites (React, Vue, Angular)
- Set realistic max_pages based on site size
- Schedule monthly audits for ongoing monitoring
- Compare historical audits to track improvements
- Export issues to spreadsheet for team collaboration

❌ **DON'T:**

- Set max_pages too high (start with 1000-5000)
- Ignore robots.txt unless intentionally testing blocked areas
- Run audits too frequently (daily audits waste credits)

### 7. Error Handling

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
│   └── SeRankingApi.credentials.ts                               # API credentials configuration
│
├── nodes/
│   └── SeRanking/
│       ├── SeRanking.node.ts                                     # Main node definition
│       ├── dataApi/
│       │   ├── operations/
│       │   ├── AiSearchOperations.ts                             # AI Search operations logic
│       │   ├── DomainAnalysisOperations.ts                       # Domain Analysis operations logic
│       │   └── KeywordResearchOperations.ts                      # Keyword Research operations logic
│       │   └── descriptions/
│       │   ├── AiSearchDescription.ts                            # AI Search UI definitions
│       │   ├── DomainAnalysisDescription.ts                      # Domain Analysis UI definitions
│       │   └── KeywordResearchDescription.ts                     # Keyword Research UI definitions
│       └── utils/
│           ├── validators.ts                                     # Input validators
│           └── apiRequest.ts                                     # API request handler
├── Usage Examples/
│   └── AI Search/
│       ├── AIVisibilityTracker.json                              # Example 1: Monitor AI Visibility Across Engines
│       ├── AIVisibilityTrackerResults.xlsx                       # Example 1 Results
│       ├── README.md
│   └── Backlinks/
│       ├── Backlinks-Monitoring&Analysis.json                    # Example 2: Backlinks - Monitoring & Analysis
│       ├── README.md
│   └── Domain Analysis/
│       ├── DomainAnalysisMulti-FormatProcessor.json              # Example 3: Domain Analysis Multi-Format Processor
│       ├── DomainAnalysisMulti-FormatProcessor.xlsx              # Example 3 Results
│       ├── README.md
│   └── Keyword Research/
│       ├── KeywordResearch→GoogleSheetsPipeline.json              # Example 4: Keyword Research → Google Sheets Pipeline
│       ├── KeywordResearch→GoogleSheetsPipeline.xlsx              # Example 4 Results
│       ├── README.md
│   └── Website=Audit/
│       ├── Website=Audit-Technical-SEO-Monitor.json              # Example 5: Website Audit - Technical SEO Monitor
│       ├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## Acknowledgments

- Built for the [n8n](https://n8n.io/) workflow automation platform
- Powered by [SE Ranking API](https://seranking.com)

---

## Keywords

n8n, n8n-custom-node, seranking, seo, keyword-research, domain-analysis, ai-search, llm-visibility, serp-tracking, competitive-analysis, seo-automation, workflow-automation

---

**Made with ❤️ for SEO professionals using n8n**
