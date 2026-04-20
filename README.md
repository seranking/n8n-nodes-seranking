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
npm install -g seranking-n8n-nodes-seranking-1.3.0.tgz
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
3. Enter your **Data API Token** (required)
4. Enter your **Project API Token** (optional — only if using Project API resources)
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

**From npm:**

```bash
npm update @seranking/n8n-nodes-seranking
```

**From .tgz:**

```bash
npm uninstall -g seranking-n8n-nodes-seranking
npm install -g seranking-n8n-nodes-seranking-NEW-VERSION.tgz
```

**From GitHub:**

```bash
npm install -g git+https://github.com/seranking/n8n-nodes-seranking.git
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
3. Enter your **API Token (Data API)** — required
4. Enter your **API Token (Project API)** — optional, only needed for Project API resources
5. Click **Save**

The node will automatically test your Data API credentials by making a test request to the SE Ranking API.

> **Note:** Data API and Project API use different tokens. Data API tokens are UUID format; Project API tokens are 40-character hex format. Get both from your [SE Ranking API Dashboard](https://online.seranking.com/admin.api.dashboard.html). The node automatically routes to the correct API based on the resource you select.

---

## Compatibility

- **n8n version**: 1.0.0 or higher
- **Node.js version**: 18.x or higher
- **SE Ranking API**: v1 (Data API) + Project API (`api4.seranking.com`)

## Operations

This node provides access to **20 SE Ranking resources** with **172 total operations** across two API types:

### Data API (6 resources, 65 operations)

### AI Search (5 operations)

- Get Overview - LLM visibility metrics across ChatGPT, Perplexity, Gemini
- Discover Brand - Identify brand name for domain
- Get Prompts by Target - Find prompts mentioning your domain
- Get Prompts by Brand - Track brand mentions in AI responses
- Get Leaderboard - Compare domain performance against competitors across LLMs


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

### Domain Analysis (11 operations)

- Get Regional Database Overview - Regional performance data
- Get Worldwide Aggregate - Global domain statistics
- Get Worldwide Aggregate for URL - URL-level global performance
- Get Overview History - Historical metrics tracking
- Get Keywords - Ranking keywords with filters
- Get Keywords Comparison - Domain vs competitor analysis
- Get Domain Pages - Page-level keyword and traffic metrics
- Get Domain Subdomains - Subdomain performance analysis
- Get Competitors - Identify competing domains
- Get Paid Ads for Keyword - Advertisers on keywords
- Get Paid Ads for Domain - Domain's advertising keywords

### Keyword Research (5 operations)

- Export Metrics - Bulk keyword metrics (up to 700 keywords)
- Get Similar Keywords - Semantically similar suggestions with full filter support (traffic, difficulty, intents, SERP features, word count, and more)
- Get Related Keywords - Topically related keywords with full filter support (traffic, difficulty, intents, SERP features, word count, and more)
- Get Question Keywords - Question-based variations with full filter support (traffic, difficulty, intents, SERP features, word count, and more)
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

### SERP Classic (5 operations)

- Add Tasks - Create SERP tasks for keywords (up to 1,000 per request, supports Pingback URL)
- Get Results - Get standard SERP results for a task
- List Tasks - List recent SERP tasks (last 24 hours)
- Get Advanced Results - Retrieve detailed SERP results with all features
- Get Locations - Get available location IDs for SERP queries

---

### Project API (14 resources, 107 operations)

### Project Management (17 operations)

- List Projects - Get all projects
- Add Project - Create a new project
- Change Project Settings - Update project configuration
- Delete Project - Remove a project
- List Search Engines - Get search engines for a project
- Add Search Engine - Add search engine to project
- Change Search Engine - Update search engine settings
- Delete Search Engine - Remove search engine from project
- List Keywords - Get project keywords
- Add Keywords - Add keywords to project
- Delete Keywords - Remove keywords from project
- Get Project Stats - Overall project statistics
- Get Keyword Positions - Keyword ranking positions over time
- Get Ads Chart - Advertising data for keywords
- Get Historical Dates - Available historical check dates
- Set Manual Position - Manually set a keyword position
- Run Position Check - Trigger a position recheck

### Project Groups (5 operations)

- List Groups - Get all project groups
- Add Group - Create a project group
- Rename Group - Update group name
- Delete Group - Remove a project group
- Move Projects to Group - Move projects into a group

### AI Result Tracker (14 operations)

- Get Site Brand - Get brand name for a site
- Save Site Brand - Set brand name for a site
- List LLM Engines - Get all LLM engines for a site
- Get LLM Engine - Get specific LLM engine details
- Create LLM Engine - Add LLM engine (ChatGPT, Gemini, Perplexity, Google AI)
- Update LLM Engine - Modify LLM engine settings
- Delete LLM Engine - Remove LLM engine from site
- Get LLM Status - Check LLM engine processing status
- Get LLM Statistics - Presence and overlap stats
- List Prompts - Get prompts for an LLM engine
- Add Prompts - Add keywords/prompts to LLM engine
- Delete Prompts - Remove prompts from LLM engine
- Get Prompt Rankings - Prompt ranking data over time
- Get Prompt Answer - Full AI answer text, cited sources, detected brands, and organic URLs (Google AI Overview) for a tracked prompt on a given date

### Keyword Groups (5 operations)

- List Groups - Get keyword groups for a project
- Add Group - Create a keyword group
- Move Keywords - Move keywords to a group
- Rename Group - Update keyword group name
- Delete Group - Remove a keyword group

### Competitors (7 operations)

- Add Competitor - Add competitor to project
- List Competitors - Get all competitors for a project
- Get Keyword Positions - Competitor ranking positions
- Delete Competitor - Remove a competitor
- Get TOP 10 Results - SERP top 10 for a keyword
- Get TOP 100 Results - SERP top 100 for a keyword
- Get All Competitors - All competitors from SERP data

### URL Tags (4 operations)

- List Tags - Get all URL tags for a site
- Add Tag - Create a URL tag
- Update Tag Assignment - Assign tags to URLs/domains
- Delete Tag - Remove a URL tag

### Analytics Traffic (2 operations)

- Get Google Search Console Data - GSC queries with impressions, clicks, CTR
- Calculate SEO Potential - Estimated traffic and revenue potential

### Account System (3 operations)

- Get Account Balance - Account balance and currency
- Get User Profile - Account profile information
- Get Subscription Data - Subscription type and status

### Sub-Account Management (8 operations)

- List Sub-Accounts - Get all sub-accounts
- Get Sub-Account Details - Sub-account settings and permissions
- Create Sub-Account - Create a new sub-account
- Delete Sub-Account - Remove a sub-account
- Update Sub-Account - Modify sub-account settings
- List Shared Projects - Projects shared with sub-account
- List Owned Projects - Projects owned by sub-account
- Share Projects - Share projects with sub-account

### General Data (4 operations)

- List Search Engines - Available search engines and regions
- List Languages for Google - Google language codes
- List Volume Regions - Regions for keyword volume checks
- Get Keyword Search Volume - Search volume for keywords in a region

### Marketing Plan (5 operations)

- List Plan Items - Get marketing plan checklist
- Add Task - Add custom task to plan
- Update Task - Modify task title and description
- Set Task Status - Mark task as complete/incomplete
- Delete Task - Remove a custom task

### Website Audit (Project) (12 operations)

- Create Audit - Launch a website audit
- List Audits - Get all audits
- Get Audit Status - Check audit progress
- Get Audit Report - Full audit results
- Get Crawled Pages - Pages found during audit
- Get Pages by Issue - Pages affected by specific issue
- Get All Issues for URL - All issues for a specific page
- Get All Links - Internal/external links found
- Get Audit History - Historical audit data
- Update Audit Title - Rename an audit
- Delete Audit - Remove an audit
- Recheck Audit - Re-run an audit

### Backlink Checker (17 operations)

- List Backlinks - Get monitored backlinks
- Add Backlink - Add a backlink to monitor
- Import Backlinks List - Bulk import backlinks
- Update Import Settings - Configure GSC auto-import
- Start GSC Import - Import backlinks from Google Search Console
- Get GSC Import Status - Check GSC import progress
- Delete Backlinks - Remove monitored backlinks
- Recheck Backlinks - Re-check backlink status or index
- Get Backlink Statistics - Backlink portfolio stats
- List Disavowed Backlinks - Get disavowed backlinks
- Add Disavowed Backlinks - Add URLs to disavow list
- Delete Disavowed Backlink - Remove from disavow list
- List Backlink Groups - Get backlink groups
- Create Backlink Group - Create a backlink group
- Delete Backlink Group - Remove a backlink group
- Rename Backlink Group - Update group name
- Move Backlinks to Group - Move backlinks between groups

### Search Volume (4 operations)

- Create Volume Check - Submit keyword volume check request
- List Volume Checks - Get submitted check requests
- Get Volume Check Results - Retrieve volume check results
- Delete Volume Check - Remove a check request

## Usage Examples

Ready-to-use workflows demonstrating real-world applications of the SE Ranking node. Each example includes importable n8n workflows, setup instructions, and expected outputs.

---

### 🤖 Example 1: AI Search Visibility Tracker

**Track your brand's presence and competitive gaps across ChatGPT, Perplexity, and Gemini**

Two comprehensive workflows for monitoring AI visibility and identifying content opportunities.

**Workflow 1: AI Search Visibility Tracker**

Monitor how often your brand appears in AI-powered search engines with automated historical tracking.

- Link presence count across multiple AI engines
- Average position tracking in AI citations
- AI opportunity traffic estimates
- Period-over-period comparison metrics

**Workflow 2: Competitor Topic Gap Analysis**

Identify content opportunities by analyzing where competitors outrank you in AI search and traditional SEO.

- AI visibility gaps across ChatGPT, Perplexity, and Gemini
- Keyword gaps with search volume and difficulty
- Competitor backlink authority metrics
- Prioritized opportunities with HIGH/MEDIUM/LOW scoring
- Actionable recommendations for each gap

**Best For:** Marketing teams tracking AI SEO performance, Content strategists planning editorial calendars, SEO teams doing competitive intelligence

📂 [View Full Guide & Download Workflow →](./Usage-Examples/AI-Search)

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

📂 [View Full Guide & Download Workflow →](./Usage-Examples/SERP-Classic)

---

### 📊 Example 3: Domain Analysis Data Processor

**Transform SE Ranking API data into structured Google Sheets reports**

Automatically process and organize domain analysis data with intelligent type detection.

**What You'll Get:**

- Regional performance across 200+ countries
- Domain summary with organic vs. paid breakdown
- Keywords analysis with positions and difficulty
- Competitor insights and gap analysis
- Multi-domain comparison with worldwide traffic data

**Best For:** SEO agencies managing multiple clients, Enterprise teams tracking regional performance

📂 [View Full Guide & Download Workflow →](./Usage-Examples/Domain-Analysis)

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

📂 [View Full Guide & Download Workflow →](./Usage-Examples/Keyword-Research)

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

📂 [View Full Guide & Download Workflow →](./Usage-Examples/Website-Audit)

---

### 📍 Example 6: SERP Classic Tracking

**Track keyword rankings and analyze SERP features across search engines**

Monitor keyword positions, SERP features, and competitor visibility with automated rank tracking.

**What You'll Get:**

- Keyword position tracking across multiple locations
- SERP features analysis (featured snippets, local pack, etc.)
- Competitor ranking visibility
- Device-specific rankings (desktop, mobile, tablet)
- Historical rank tracking

**Best For:** SEO teams tracking keyword performance, Local businesses monitoring location-based rankings, Agencies managing multi-client SERP tracking

📂 [View Full Guide & Download Workflow →](./Usage-Examples/SERP-Classic)

---
### 🔔 Example 7: SERP Pingback Webhooks

**Get notified instantly when SERP results are ready — no polling required!**

Instead of checking task status repeatedly, SE Ranking calls your webhook when done.

#### Simple Workflow (3 nodes)

```
[Webhook] → [SE Ranking: Get Results] → [Google Sheets]
   ↑
   └── SE Ranking calls this when task completes
```

#### Step-by-Step Setup

**Step 1: Create Webhook to Receive Notifications**

Add a **Webhook** node:
| Setting | Value |
|---------|-------|
| HTTP Method | `GET` |
| Path | `serp-callback` |
| Response Mode | `Immediately` |

Click **"Listen for test event"** and copy the URL.

**Step 2: Create SERP Task with Pingback**

In another workflow, add **SE Ranking** node:
| Setting | Value |
|---------|-------|
| Resource | `SERP Classic` |
| Operation | `Add Tasks` |
| Search Engine | `google` |
| Device | `desktop` |
| Language Code | `en` |
| Location ID | `2840` (USA) |
| Keywords | `seo tools` |
| Tag | `my-test` |
| **Pingback URL** | `https://your-n8n.com/webhook/serp-callback?id=$id&tag=$tag` |

> ⚠️ Use `$id` and `$tag` exactly as shown — SE Ranking replaces them with real values.

**Step 3: Fetch Results When Webhook Fires**

Back in your webhook workflow, add **SE Ranking** node after the Webhook:
| Setting | Value |
|---------|-------|
| Resource | `SERP Classic` |
| Operation | `Get Results` |
| Task ID | `{{ $json.query.id }}` |

**That's it!** When SE Ranking finishes, it calls your webhook, which fetches the results automatically.

#### Using in Advanced Workflows

Add pingback to any existing SERP workflow:

```
[Schedule] → [SE Ranking: Add Tasks] ──(async)──→ [Webhook] → [Get Results] → [Process]
                    │
                    └── pingback_url triggers webhook when done
```

---

### 🏆 Example 8: AI Search Leaderboard

**Compare your AI visibility against competitors in one request.**

See how your brand performs vs competitors across ChatGPT, Perplexity, Gemini, and Google AI Overview.

#### Simple Workflow (2 nodes)

```
[Manual Trigger] → [SE Ranking: Get Leaderboard] → [View Results]
```

#### Step-by-Step Setup

**Step 1: Add SE Ranking Node**

| Setting | Value |
|---------|-------|
| Resource | `AI Search` |
| Operation | `Get Leaderboard` |
| Primary Target | `yoursite.com` |
| Primary Brand | `Your Brand` |
| Source | `us` |
| AI Engines | Select: `chatgpt`, `perplexity`, `ai-overview` |

**Step 2: Add Competitors**

Click **"Add Competitor"** and enter:
| Target Domain | Brand Name |
|---------------|------------|
| `competitor1.com` | `Competitor 1` |
| `competitor2.com` | `Competitor 2` |

**Step 3: Run and View Results**

Execute the workflow. Response includes:
- Link presence count (how often you appear)
- Average position in AI citations
- Change vs previous period
- Breakdown by AI engine

#### Using in Advanced Workflows

Combine with scheduling and reporting:

```
[Schedule: Weekly] → [Get Leaderboard] → [Code: Calculate Gaps] → [Google Sheets] → [Slack Alert]
```

**Example: Find where competitors beat you**
```javascript
// In Code node after Get Leaderboard
const dominated = $input.all().filter(item => 
  item.json.competitor_presence > item.json.primary_presence
);
return dominated;
```

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

**Data API** (`api.seranking.com/v1`):
- [AI Search API](https://seranking.com/api/data/ai-search/)
- [Backlinks API](https://seranking.com/api/data/backlinks/)
- [Domain Analysis API](https://seranking.com/api/data/domain-analysis/)
- [Keyword Research API](https://seranking.com/api/data/keyword-research/)
- [Website Audit API](https://seranking.com/api/data/website-audit/)
- [SERP API](https://seranking.com/api/data/serp/)

**Project API** (`api4.seranking.com`):
- [Project API Documentation](https://seranking.com/api/project/)

For detailed API specifications, visit [SE Ranking API Documentation](https://seranking.com/api.html).

---

## Version History

### v1.5.8 (Current)

* ✅ **NEW: Get Prompt Answer (AI Result Tracker)** - Returns full AI answer text, cited source URLs, detected brand mentions, and (for Google AI Overview) top organic URLs for a tracked prompt on a given date. Cost: 0 credits.
* 📝 **Note on SE Ranking docs quirk** - The endpoint's path param is documented as `keyword_id` but actually requires `k2site_llm_id` from `List Prompts`. The node field is labeled accordingly.

### v1.3.6

* 🔧 **FIX: Rate limiting compatibility** - Replaced setTimeout with n8n-workflow sleep function for n8n verified node compliance

### v1.3.5 

* ✅ **NEW: SERP Pingback URL** - Webhook notifications when SERP tasks complete
* ✅ **NEW: AI Search Leaderboard** - Compare visibility against competitors across LLMs
* ✅ **Total: 65 operations across 6 resources**
* ✅ Event-driven SERP workflow support
* ✅ Multi-competitor AI visibility comparison

### v1.3.3 

- ✅ **NEW: Get Worldwide Aggregate for URL** - URL-level global performance metrics
- ✅ **NEW: Get Domain Pages** - Page-level keyword and traffic analysis with intent breakdown
- ✅ **NEW: Get Domain Subdomains** - Subdomain traffic and keyword metrics
- ✅ **Total: 62 operations across 6 resources**
- ✅ Advanced filtering for pages/subdomains (traffic %, keywords count, traffic sum,)
- ✅ Search intent breakdown (Informational, Navigational, Transactional, Commercial, Local)

### v1.3.0 

- ✅ Complete AI Search resource (4 operations)
- ✅ Complete Backlinks resource (25 operations)
- ✅ Enhanced Domain Analysis resource (8 operations - added History, Comparison, Paid Ads)
- ✅ Complete Keyword Research resource (5 operations)
- ✅ Complete Website Audit resource (14 operations)
- ✅ **NEW: Complete SERP Classic resource (5 operations)**
- ✅ **Total: 59 operations across 6 resources**
- ✅ Comprehensive error handling with detailed messages
- ✅ Full TypeScript support
- ✅ Input validation (domains, sources, dates)
- ✅ Pagination support (offset/limit)
- ✅ Advanced filtering options
- ✅ Multi-keyword support (up to 1,000 keywords for SERP tasks)
- ✅ Backlink export and bulk operations
- ✅ Website audit creation and management
- ✅ **NEW: SERP rank tracking and analysis**
- ✅ **NEW: Multi-location SERP data retrieval**

### v1.2.3

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

✅ **172 Operations** - Comprehensive coverage across 20 resources (Data API + Project API)

✅ **Pingback Webhooks** - Event-driven notifications for SERP task completion

✅ **AI Competitive Analysis** - Leaderboard comparison across LLM engines

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

✅ **SERP Tracking** - Keyword ranking and SERP features analysis

✅ **Advanced Filtering** - Volume, position, CPC, difficulty, traffic, search intent, SERP features, keyword word count, and include/exclude keyword pattern filters, and the new SERP Feature Link filter (filter[serp_features_2]) — which lets you filter keywords where your domain is specifically linked within a SERP feature (e.g. AI Overviews, Reviews), distinct from the existing serpFeatures filter which only checks for feature presence on the SERP.

---

## Limitations

- **Rate Limits**: SE Ranking API has rate limits (varies by plan)
- **Regional Data**: Some data is region-specific (requires country code)
- **Keyword Limits**: Export Metrics supports up to 700 keywords per request
- **Historical Data**: History trend data adds to response time
- **API Credits**: Some operations consume API credits (check your plan)

---
## Rate Limiting

This node includes built-in rate limiting (300ms delay between requests) to help prevent hitting SE Ranking API limits.

If you still encounter "429 Too Many Requests" errors when processing large amounts of data, you can use n8n's built-in solutions:

1. **Retry On Fail**: Open node Settings → enable "Retry On Fail" → set "Wait Between Tries" to 1000ms or more
2. **Split In Batches + Wait**: Use the "Loop Over Items" node to process items in smaller batches with a "Wait" node between requests

For more details, see [n8n's rate limiting documentation](https://docs.n8n.io/integrations/builtin/rate-limits/).

---
## Troubleshooting

### Pingback Not Received

**Problem**: SERP task completes but webhook never fires

**Solution**:
1. Use production webhook URL (not `webhook-test`)
2. Ensure URL is publicly accessible (not localhost)
3. Use HTTPS
4. Respond within 5 seconds with HTTP 200
5. Use literal `$id` and `$tag` placeholders

**Valid URL format:**
```
✅ https://your-domain.com/webhook/serp-callback?id=$id&tag=$tag
❌ https://localhost:5678/webhook/...
❌ https://your-domain.com/webhook-test/...
```
```

---

### Authentication Errors

**Problem**: "401 Unauthorized" or "Invalid API Token"

**Solution**:

1. Verify API token is correct (copy from SE Ranking dashboard)
2. For Project API resources, ensure the Project API Token field is filled
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
│       │   │   ├── AiSearchOperations.ts                         # AI Search operations logic
│       │   │   ├── BacklinksOperations.ts                        # Backlinks operations logic
│       │   │   ├── DomainAnalysisOperations.ts                   # Domain Analysis operations logic
│       │   │   ├── KeywordResearchOperations.ts                  # Keyword Research operations logic
│       │   │   ├── WebsiteAuditOperations.ts                     # Website Audit operations logic
│       │   │   └── SerpClassicOperations.ts                      # SERP Classic operations logic
│       │   └── descriptions/
│       │       ├── AiSearchDescription.ts                        # AI Search UI definitions
│       │       ├── BacklinksDescription.ts                       # Backlinks UI definitions
│       │       ├── DomainAnalysisDescription.ts                  # Domain Analysis UI definitions
│       │       ├── KeywordResearchDescription.ts                 # Keyword Research UI definitions
│       │       ├── WebsiteAuditDescription.ts                    # Website Audit UI definitions
│       │       └── SerpClassicDescription.ts                     # SERP Classic UI definitions
│       ├── projectApi/
│       │   ├── operations/
│       │   │   ├── ProjectManagementOperations.ts                # Project Management operations
│       │   │   ├── ProjectGroupsOperations.ts                    # Project Groups operations
│       │   │   ├── AiResultTrackerOperations.ts                  # AI Result Tracker operations
│       │   │   ├── KeywordGroupsOperations.ts                    # Keyword Groups operations
│       │   │   ├── CompetitorsOperations.ts                      # Competitors operations
│       │   │   ├── UrlTagsOperations.ts                          # URL Tags operations
│       │   │   ├── AnalyticsTrafficOperations.ts                 # Analytics Traffic operations
│       │   │   ├── AccountSystemOperations.ts                    # Account System operations
│       │   │   ├── SubAccountOperations.ts                       # Sub-Account operations
│       │   │   ├── GeneralDataOperations.ts                      # General Data operations
│       │   │   ├── MarketingPlanOperations.ts                    # Marketing Plan operations
│       │   │   ├── WebsiteAuditOperations.ts                     # Website Audit (Project) operations
│       │   │   ├── BacklinkCheckerOperations.ts                  # Backlink Checker operations
│       │   │   └── SearchVolumeOperations.ts                     # Search Volume operations
│       │   └── descriptions/
│       │       ├── ProjectManagementDescription.ts               # Project Management UI definitions
│       │       ├── ProjectGroupsDescription.ts                   # Project Groups UI definitions
│       │       ├── AiResultTrackerDescription.ts                 # AI Result Tracker UI definitions
│       │       ├── KeywordGroupsDescription.ts                   # Keyword Groups UI definitions
│       │       ├── CompetitorsDescription.ts                     # Competitors UI definitions
│       │       ├── UrlTagsDescription.ts                         # URL Tags UI definitions
│       │       ├── AnalyticsTrafficDescription.ts                # Analytics Traffic UI definitions
│       │       ├── AccountSystemDescription.ts                   # Account System UI definitions
│       │       ├── SubAccountDescription.ts                      # Sub-Account UI definitions
│       │       ├── GeneralDataDescription.ts                     # General Data UI definitions
│       │       ├── MarketingPlanDescription.ts                   # Marketing Plan UI definitions
│       │       ├── WebsiteAuditDescription.ts                    # Website Audit (Project) UI definitions
│       │       ├── BacklinkCheckerDescription.ts                 # Backlink Checker UI definitions
│       │       └── SearchVolumeDescription.ts                    # Search Volume UI definitions
│       └── utils/
│           ├── validators.ts                                     # Input validators
│           └── apiRequest.ts                                     # API request handler
│
├── Usage-Examples/
│   ├── AI-Search/
│   │   ├── AIVisibilityTracker.json                              # Workflow 1: AI Visibility Tracker
│   │   ├── AIVisibilityTrackerResults.xlsx                       # Workflow 1 Results
│   │   ├── SERanking-CompetitorTopicGapAnalysis.json             # Workflow 2: Competitor Topic Gap Analysis
│   │   ├── SE Ranking - Competitor Topic Gap Analysis.xlsx       # Workflow 2 Results
│   │   └── README.md                                             # AI Search workflows documentation
│   │
│   ├── Backlinks/
│   │   ├── Backlinks-Monitoring&Analysis.json                    # Backlinks monitoring workflow
│   │   └── README.md                                             # Backlinks workflow documentation
│   │
│   ├── Domain-Analysis/
│   │   ├── DomainAnalysisMulti-FormatProcessor.json              # Workflow 1: Multi-Format Data Processor
│   │   ├── DomainAnalysisMulti-FormatProcessor.xlsx              # Workflow 1 Results
│   │   ├── DomainTraffic&CompetitorAnalysis.json                 # Workflow 2: Multi-Domain Traffic Analysis
│   │   ├── DomainTraffic&CompetitorAnalysis.xlsx                 # Workflow 2 Results
│   │   ├── Get_Regional_DB_Overview.jpg                          # Screenshot: Regional Overview
│   │   ├── Get_Worldwide_Aggregate.jpg                           # Screenshot: Worldwide Aggregate
│   │   ├── Get_Domain_Keywords.jpg                               # Screenshot: Keywords Analysis
│   │   ├── Get_Competitors.jpg                                   # Screenshot: Competitors
│   │   ├── Get keywords comparison Organic Common Keywords.jpg   # Screenshot: Keywords Comparison
│   │   ├── Get keywords comparison Organic Keyword Gap.jpg       # Screenshot: Organic Gap
│   │   ├── Get keywords comparison Paid Keyword Gap.jpg          # Screenshot: Paid Gap
│   │   ├── Get keywords comparison Paid.jpg                      # Screenshot: Paid Comparison
│   │   ├── Get overview history Organic.jpg                      # Screenshot: Organic History
│   │   ├── Get overview history Paid.jpg                         # Screenshot: Paid History
│   │   ├── Get paid ads for domain.jpg                           # Screenshot: Domain Ads
│   │   ├── Get paid ads for keyword.jpg                          # Screenshot: Keyword Ads
│   │   ├── Get audit links.png                                   # Screenshot: Audit Links
│   │   ├── Get crawled pages.png                                 # Screenshot: Crawled Pages
│   │   ├── Get issues for URL.png                                # Screenshot: URL Issues
│   │   └── README.md                                             # Domain Analysis workflows documentation
│   │
│   ├── Keyword-Research/
│   │   ├── KeywordResearch→GoogleSheetsPipeline.json             # Keyword research workflow
│   │   ├── KeywordResearch→GoogleSheetsPipeline.xlsx             # Workflow results
│   │   ├── Get_Similar_Keywords.jpg                              # Screenshot: Similar Keywords
│   │   ├── Get_Related_Keywords.jpg                              # Screenshot: Related Keywords
│   │   ├── Get_Question_Keywords.jpg                             # Screenshot: Question Keywords
│   │   ├── Get_Longtail_Keywords.jpg                             # Screenshot: Longtail Keywords
│   │   └── README.md                                             # Keyword Research workflow documentation
│   │
│   ├── Website-Audit/
│   │   ├── Website-Audit-Technical-SEO-Monitor.json              # Website audit workflow
│   │   └── README.md                                             # Website Audit workflow documentation
│   │
│   └── SERP-Classic/
│       ├── Gelato-Small-Towns-Amsterdam-Area.json                # SERP tracking workflow
│       ├── Gelato Small Towns Amsterdam Area.xlsx                # Workflow results
│       └── README.md                                             # SERP Classic workflow documentation
│
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

n8n, n8n-custom-node, seranking, seo, keyword-research, domain-analysis, ai-search, llm-visibility, serp-tracking, competitive-analysis, seo-automation, workflow-automation, project-management, backlink-checker, website-audit, search-volume, marketing-plan, sub-account, ai-result-tracker

---

**Made with ❤️ for SEO professionals using n8n**
