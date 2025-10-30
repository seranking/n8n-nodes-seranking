import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';


export async function WebsiteAuditOperations(
    this: IExecuteFunctions,
    index: number
): Promise<any> {
    const operation = this.getNodeParameter('operation', index) as string;
    
    let endpoint = '';
    const params: any = {};
    const body: any = {};
    let method = 'GET';

    switch (operation) {
        case 'createStandard': {
            const domain = this.getNodeParameter('domain', index) as string;
            const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
            
            method = 'POST';
            endpoint = '/site-audit/audits/standard';
            
            body.domain = domain;
            
            if (additionalFields.title) {
                body.title = additionalFields.title;
            }
            
            const settings: any = {};
            
            if (additionalFields.source_site !== undefined) {
                settings.source_site = additionalFields.source_site ? 1 : 0;
            }
            if (additionalFields.source_sitemap !== undefined) {
                settings.source_sitemap = additionalFields.source_sitemap ? 1 : 0;
            }
            if (additionalFields.source_subdomain !== undefined) {
                settings.source_subdomain = additionalFields.source_subdomain ? 1 : 0;
            }
            if (additionalFields.check_robots !== undefined) {
                settings.check_robots = additionalFields.check_robots ? 1 : 0;
            }
            
            if (additionalFields.max_pages) settings.max_pages = additionalFields.max_pages;
            if (additionalFields.max_depth) settings.max_depth = additionalFields.max_depth;
            if (additionalFields.max_req) settings.max_req = additionalFields.max_req;
            
            if (additionalFields.user_agent !== undefined) {
                settings.user_agent = additionalFields.user_agent;
            }
            
            if (additionalFields.min_title_len) settings.min_title_len = additionalFields.min_title_len;
            if (additionalFields.max_title_len) settings.max_title_len = additionalFields.max_title_len;
            if (additionalFields.min_description_len) settings.min_description_len = additionalFields.min_description_len;
            if (additionalFields.max_description_len) settings.max_description_len = additionalFields.max_description_len;
            
            if (Object.keys(settings).length > 0) {
                body.settings = settings;
            }
            
            break;
        }

        case 'createAdvanced': {
            const domain = this.getNodeParameter('domain', index) as string;
            const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
            
            method = 'POST';
            endpoint = '/site-audit/audits/advanced';
            
            body.domain = domain;
            
            if (additionalFields.title) {
                body.title = additionalFields.title;
            }
            
            const settings: any = {};
            
            if (additionalFields.source_site !== undefined) {
                settings.source_site = additionalFields.source_site ? 1 : 0;
            }
            if (additionalFields.source_sitemap !== undefined) {
                settings.source_sitemap = additionalFields.source_sitemap ? 1 : 0;
            }
            if (additionalFields.source_subdomain !== undefined) {
                settings.source_subdomain = additionalFields.source_subdomain ? 1 : 0;
            }
            if (additionalFields.check_robots !== undefined) {
                settings.check_robots = additionalFields.check_robots ? 1 : 0;
            }
            
            if (additionalFields.max_pages) settings.max_pages = additionalFields.max_pages;
            if (additionalFields.max_depth) settings.max_depth = additionalFields.max_depth;
            
            if (additionalFields.user_agent !== undefined) {
                settings.user_agent = additionalFields.user_agent;
            }
            
            if (Object.keys(settings).length > 0) {
                body.settings = settings;
            }
            
            break;
        }

        case 'listAudits': {
            const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
            
            endpoint = '/site-audit/audits';
            
            if (additionalFields.limit) params.limit = additionalFields.limit;
            if (additionalFields.offset) params.offset = additionalFields.offset;
            if (additionalFields.search) params.search = additionalFields.search;
            if (additionalFields.date_start) params.date_start = additionalFields.date_start;
            if (additionalFields.date_end) params.date_end = additionalFields.date_end;
            break;
        }

        case 'getStatus': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            
            endpoint = '/site-audit/audits/status';
            params.audit_id = auditId;
            break;
        }

        case 'getReport': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            
            endpoint = '/site-audit/audits/report';
            params.audit_id = auditId;
            break;
        }

        case 'getCrawl': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
            
            endpoint = '/site-audit/audits/pages';
            params.audit_id = auditId;
            
            if (additionalFields.limit) params.limit = additionalFields.limit;
            if (additionalFields.offset) params.offset = additionalFields.offset;
            break;
        }

        case 'getIssuesByType': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            const issueCode = this.getNodeParameter('issueCode', index) as string;
            const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
            
            endpoint = '/site-audit/audits/issue-pages';
            params.audit_id = auditId;
            params.code = issueCode;
            
            if (additionalFields.limit) params.limit = additionalFields.limit;
            if (additionalFields.offset) params.offset = additionalFields.offset;
            break;
        }

        case 'getIssuesByUrl': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            const urlIdentifier = this.getNodeParameter('urlIdentifier', index) as string;
            
            endpoint = '/site-audit/audits/issues';
            params.audit_id = auditId;
            
            if (/^\d+$/.test(urlIdentifier)) {
                params.url_id = urlIdentifier;
            } else {
                params.url = urlIdentifier;
            }
            break;
        }

        case 'getLinks': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
            
            endpoint = '/site-audit/audits/links';
            params.audit_id = auditId;
            
            if (additionalFields.page_type) params.page_type = additionalFields.page_type;
            if (additionalFields.limit) params.limit = additionalFields.limit;
            if (additionalFields.offset) params.offset = additionalFields.offset;
            break;
        }

        case 'getHistory': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            const date = this.getNodeParameter('date', index) as string;
            
            endpoint = '/site-audit/audits/history';
            params.audit_id = auditId;
            params.date = date;
            break;
        }

        case 'updateAudit': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            const title = this.getNodeParameter('title', index) as string;
            
            method = 'PATCH';
            endpoint = '/site-audit/audits';
            params.audit_id = auditId;
            
            body.title = title;
            break;
        }

        case 'deleteAudit': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            
            method = 'DELETE';
            endpoint = '/site-audit/audits';
            params.audit_id = auditId;
            break;
        }

        case 'recheckStandard': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            
            method = 'POST';
            endpoint = '/site-audit/audits/recheck/standard';
            params.audit_id = auditId;
            break;
        }

        case 'recheckAdvanced': {
            const auditId = this.getNodeParameter('auditId', index) as string;
            
            method = 'POST';
            endpoint = '/site-audit/audits/recheck/advanced';
            params.audit_id = auditId;
            break;
        }

        default:
            throw new Error(`Unknown Website Audit operation: ${operation}`);
    }

    return await apiRequest.call(this, method, endpoint, body, params, index);
}