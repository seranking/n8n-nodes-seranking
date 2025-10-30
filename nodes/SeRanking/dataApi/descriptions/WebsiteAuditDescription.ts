import { INodeProperties } from 'n8n-workflow';

export const websiteAuditOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
            },
        },
        options: [
            {
                name: 'Create Standard Audit',
                value: 'createStandard',
                description: 'Launch a standard (HTML) site audit',
                action: 'Create standard audit',
            },
            {
                name: 'Create Advanced Audit',
                value: 'createAdvanced',
                description: 'Launch a JS-rendered site audit (for SPAs)',
                action: 'Create advanced audit',
            },
            {
                name: 'List Audits',
                value: 'listAudits',
                description: 'Get all audits with status for the account',
                action: 'List all audits',
            },
            {
                name: 'Get Audit Status',
                value: 'getStatus',
                description: 'Get status/progress of a specific audit',
                action: 'Get audit status',
            },
            {
                name: 'Get Audit Report',
                value: 'getReport',
                description: 'Retrieve full audit report for a completed audit',
                action: 'Get audit report',
            },
            {
                name: 'Get Crawled Pages',
                value: 'getCrawl',
                description: 'Get list of crawled pages for an audit',
                action: 'Get crawled pages',
            },
            {
                name: 'Get Issues by Type',
                value: 'getIssuesByType',
                description: 'Get pages affected by a specific issue type',
                action: 'Get issues by type',
            },
            {
                name: 'Get Issues by URL',
                value: 'getIssuesByUrl',
                description: 'Get all issue details for a specific audited URL',
                action: 'Get issues for URL',
            },
            {
                name: 'Get Links',
                value: 'getLinks',
                description: 'Get all outgoing links found during the audit',
                action: 'Get audit links',
            },
            {
                name: 'Get Audit History',
                value: 'getHistory',
                description: 'Get historical snapshot of a specific audit run',
                action: 'Get audit history',
            },
            {
                name: 'Update Audit',
                value: 'updateAudit',
                description: 'Update the title of an audit',
                action: 'Update audit details',
            },
            {
                name: 'Delete Audit',
                value: 'deleteAudit',
                description: 'Delete an audit by ID',
                action: 'Delete audit',
            },
            {
                name: 'Recheck Standard Audit',
                value: 'recheckStandard',
                description: 'Re-run a standard audit with same settings',
                action: 'Recheck standard audit',
            },
            {
                name: 'Recheck Advanced Audit',
                value: 'recheckAdvanced',
                description: 'Re-run an advanced audit with same settings',
                action: 'Recheck advanced audit',
            },
        ],
        default: 'listAudits',
    },
];

export const websiteAuditFields: INodeProperties[] = [
    // Domain field (for create operations)
    {
        displayName: 'Domain',
        name: 'domain',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['createStandard', 'createAdvanced'],
            },
        },
        default: '',
        placeholder: 'example.com',
        description: 'Domain to audit (without https:// - e.g., example.com or www.example.com)',
    },
    // Audit ID field
    {
        displayName: 'Audit ID',
        name: 'auditId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: [
                    'getStatus',
                    'getReport',
                    'getCrawl',
                    'getIssuesByType',
                    'getIssuesByUrl',
                    'getLinks',
                    'getHistory',
                    'updateAudit',
                    'deleteAudit',
                    'recheckStandard',
                    'recheckAdvanced',
                ],
            },
        },
        default: '',
        placeholder: '700183831',
        description: 'ID of the audit to query',
    },
    // Issue Code field
    {
        displayName: 'Issue Code',
        name: 'issueCode',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['getIssuesByType'],
            },
        },
        options: [
            { name: 'No HTTPS', value: 'no_https' },
            { name: 'Mixed Content', value: 'mixed_content' },
            { name: '4XX Status Codes', value: 'http4xx' },
            { name: '5XX Status Codes', value: 'http5xx' },
            { name: 'Blocked by Noindex', value: 'blocked_by_noindex' },
            { name: 'Duplicate Titles', value: 'title_duplicate' },
            { name: 'Missing Titles', value: 'title_missing' },
            { name: 'Long Titles', value: 'title_long' },
            { name: 'Short Titles', value: 'title_short' },
            { name: 'Duplicate Descriptions', value: 'description_duplicate' },
            { name: 'Missing Descriptions', value: 'description_missing' },
            { name: 'Long Descriptions', value: 'description_long' },
            { name: 'Short Descriptions', value: 'description_short' },
            { name: 'Missing H1', value: 'h1_missing' },
            { name: 'Duplicate H1', value: 'h1_duplicate' },
            { name: 'Multiple H1', value: 'h1_multiple' },
            { name: 'Long H1', value: 'h1_long' },
            { name: 'Missing Alt Text', value: 'img_alt_missing' },
            { name: 'Broken Links', value: 'broken_links' },
            { name: 'Redirect Chains', value: 'redirect_chain' },
            { name: 'Slow Pages', value: 'slow_page' },
            { name: 'Large Pages', value: 'large_page' },
            { name: 'Thin Content', value: 'thin_content' },
            { name: 'Canonical Issues', value: 'canonical_issues' },
        ],
        default: 'title_duplicate',
        description: 'Type of issue to retrieve affected pages for',
    },
    // URL ID or URL field
    {
        displayName: 'URL ID or URL',
        name: 'urlIdentifier',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['getIssuesByUrl'],
            },
        },
        default: '',
        placeholder: '50958380 or https://example.com/page',
        description: 'Either the URL ID (from pages endpoint) or the full page URL',
    },
    // Date field
    {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['getHistory'],
            },
        },
        default: '',
        placeholder: '2025-07-29',
        description: 'Date of the historical audit to retrieve (YYYY-MM-DD)',
    },
    // Title field
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['updateAudit'],
            },
        },
        default: '',
        placeholder: 'Updated Audit Title',
        description: 'New title for the audit (max 300 characters)',
    },
    // Additional Fields for createStandard
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['createStandard'],
            },
        },
        options: [
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
                placeholder: 'My Site Audit',
                description: 'Custom title for the audit (max 300 characters)',
            },
            {
                displayName: 'Scan Site',
                name: 'source_site',
                type: 'boolean',
                default: true,
                description: 'Whether to scan pages by following internal links from homepage',
            },
            {
                displayName: 'Scan Sitemap',
                name: 'source_sitemap',
                type: 'boolean',
                default: true,
                description: 'Whether to scan the sitemap.xml file',
            },
            {
                displayName: 'Include Subdomains',
                name: 'source_subdomain',
                type: 'boolean',
                default: false,
                description: 'Whether to scan subdomains',
            },
            {
                displayName: 'Respect Robots.txt',
                name: 'check_robots',
                type: 'boolean',
                default: true,
                description: 'Whether to follow directives in robots.txt',
            },
            {
                displayName: 'Max Pages',
                name: 'max_pages',
                type: 'number',
                default: 1000,
                description: 'Maximum number of pages to crawl (1-300000)',
                typeOptions: {
                    minValue: 1,
                    maxValue: 300000,
                },
            },
            {
                displayName: 'Max Depth',
                name: 'max_depth',
                type: 'number',
                default: 10,
                description: 'Maximum crawl depth (1-100)',
                typeOptions: {
                    minValue: 1,
                    maxValue: 100,
                },
            },
            {
                displayName: 'Max Requests Per Second',
                name: 'max_req',
                type: 'number',
                default: 500,
                description: 'Maximum requests per second (1-500)',
                typeOptions: {
                    minValue: 1,
                    maxValue: 500,
                },
            },
            {
                displayName: 'User Agent',
                name: 'user_agent',
                type: 'options',
                options: [
                    { name: 'SE Ranking Bot', value: 0 },
                    { name: 'Googlebot', value: 1 },
                    { name: 'Googlebot Image', value: 2 },
                    { name: 'Bingbot', value: 3 },
                    { name: 'Yahoo! Slurp', value: 4 },
                    { name: 'YandexBot', value: 5 },
                    { name: 'BaiduSpider', value: 6 },
                    { name: 'Chrome on Windows', value: 7 },
                    { name: 'Chrome on macOS', value: 8 },
                    { name: 'Chrome on iOS', value: 9 },
                    { name: 'Firefox on Windows', value: 10 },
                    { name: 'Firefox on Linux', value: 11 },
                    { name: 'Safari on macOS', value: 12 },
                    { name: 'Opera on Windows', value: 13 },
                ],
                default: 0,
                description: 'User-Agent header to use for crawling',
            },
            {
                displayName: 'Min Title Length',
                name: 'min_title_len',
                type: 'number',
                default: 20,
                description: 'Minimum length for title tag (1-10000)',
            },
            {
                displayName: 'Max Title Length',
                name: 'max_title_len',
                type: 'number',
                default: 65,
                description: 'Maximum length for title tag (1-10000)',
            },
            {
                displayName: 'Min Description Length',
                name: 'min_description_len',
                type: 'number',
                default: 1,
                description: 'Minimum length for meta description (1-10000)',
            },
            {
                displayName: 'Max Description Length',
                name: 'max_description_len',
                type: 'number',
                default: 158,
                description: 'Maximum length for meta description (1-10000)',
            },
        ],
    },
    // Additional Fields for createAdvanced
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['createAdvanced'],
            },
        },
        options: [
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
                placeholder: 'My SPA Audit',
                description: 'Custom title for the audit (max 300 characters)',
            },
            {
                displayName: 'Scan Site',
                name: 'source_site',
                type: 'boolean',
                default: true,
                description: 'Whether to scan pages by following internal links from homepage',
            },
            {
                displayName: 'Scan Sitemap',
                name: 'source_sitemap',
                type: 'boolean',
                default: true,
                description: 'Whether to scan the sitemap.xml file',
            },
            {
                displayName: 'Include Subdomains',
                name: 'source_subdomain',
                type: 'boolean',
                default: false,
                description: 'Whether to scan subdomains',
            },
            {
                displayName: 'Respect Robots.txt',
                name: 'check_robots',
                type: 'boolean',
                default: true,
                description: 'Whether to follow directives in robots.txt',
            },
            {
                displayName: 'Max Pages',
                name: 'max_pages',
                type: 'number',
                default: 1000,
                description: 'Maximum number of pages to crawl (1-300000)',
                typeOptions: {
                    minValue: 1,
                    maxValue: 300000,
                },
            },
            {
                displayName: 'Max Depth',
                name: 'max_depth',
                type: 'number',
                default: 10,
                description: 'Maximum crawl depth (1-100)',
                typeOptions: {
                    minValue: 1,
                    maxValue: 100,
                },
            },
            {
                displayName: 'User Agent',
                name: 'user_agent',
                type: 'options',
                options: [
                    { name: 'SE Ranking Bot', value: 0 },
                    { name: 'Googlebot', value: 1 },
                    { name: 'Chrome on Windows', value: 7 },
                    { name: 'Chrome on macOS', value: 8 },
                ],
                default: 7,
                description: 'User-Agent header to use for crawling',
            },
        ],
    },
    // Additional Fields for listAudits
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['listAudits'],
            },
        },
        options: [
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                default: 100,
                description: 'Maximum number of audits to return',
                typeOptions: {
                    minValue: 1,
                    maxValue: 1000,
                },
            },
            {
                displayName: 'Offset',
                name: 'offset',
                type: 'number',
                default: 0,
                description: 'Number of audits to skip',
                typeOptions: {
                    minValue: 0,
                },
            },
            {
                displayName: 'Search',
                name: 'search',
                type: 'string',
                default: '',
                description: 'Filter by search term matching title or URL',
            },
            {
                displayName: 'Date Start',
                name: 'date_start',
                type: 'string',
                default: '',
                placeholder: '2025-01-01',
                description: 'Start date for filtering (YYYY-MM-DD)',
            },
            {
                displayName: 'Date End',
                name: 'date_end',
                type: 'string',
                default: '',
                placeholder: '2025-12-31',
                description: 'End date for filtering (YYYY-MM-DD)',
            },
        ],
    },
    // Additional Fields for getCrawl
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['getCrawl'],
            },
        },
        options: [
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                default: 100,
                description: 'Maximum number of pages to return',
                typeOptions: {
                    minValue: 1,
                    maxValue: 10000,
                },
            },
            {
                displayName: 'Offset',
                name: 'offset',
                type: 'number',
                default: 0,
                description: 'Number of pages to skip',
                typeOptions: {
                    minValue: 0,
                },
            },
        ],
    },
    // Additional Fields for getIssuesByType
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['getIssuesByType'],
            },
        },
        options: [
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                default: 100,
                description: 'Maximum number of URLs to return',
                typeOptions: {
                    minValue: 1,
                    maxValue: 1000,
                },
            },
            {
                displayName: 'Offset',
                name: 'offset',
                type: 'number',
                default: 0,
                description: 'Number of URLs to skip',
                typeOptions: {
                    minValue: 0,
                },
            },
        ],
    },
    // Additional Fields for getLinks
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['websiteAudit'],
                operation: ['getLinks'],
            },
        },
        options: [
            {
                displayName: 'Page Type',
                name: 'page_type',
                type: 'options',
                options: [
                    { name: 'All Links', value: 'all' },
                    { name: 'Internal Only', value: 'internal' },
                    { name: 'External Only', value: 'external' },
                ],
                default: 'all',
                description: 'Type of links to retrieve',
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                default: 100,
                description: 'Maximum number of links to return',
                typeOptions: {
                    minValue: 1,
                    maxValue: 10000,
                },
            },
            {
                displayName: 'Offset',
                name: 'offset',
                type: 'number',
                default: 0,
                description: 'Number of links to skip',
                typeOptions: {
                    minValue: 0,
                },
            },
        ],
    },
];
