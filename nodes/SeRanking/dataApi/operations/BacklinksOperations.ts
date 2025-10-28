import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';
import { validateDateFormat } from '../../utils/validators';


// Helper function to map n8n mode values to SE Ranking API mode values
function mapMode(modeInput: string): string {
	const modeMapping: any = {
		'as_root': 'domain',
		'as_subdomain': 'host',
		'one_unit': 'url'
	};
	return modeMapping[modeInput] || modeInput;
}

export async function BacklinksOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	
	let endpoint = '';
	const params: any = {};
	let method = 'GET';

	switch (operation) {
		case 'getSummary': {
			const target = this.getNodeParameter('target', index) as string;
			const modeInput = this.getNodeParameter('mode', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/summary';
			params.target = target;
			params.mode = mapMode(modeInput);
			
			if (additionalFields.historical !== undefined) {
				params.historical = additionalFields.historical ? 1 : 0;
			}
			break;
		}

		case 'getMetrics': {
			const targetsInput = this.getNodeParameter('targets', index) as string;
			const targetsList = targetsInput
				.split(/[\n,]/)
				.map(t => t.trim())
				.filter(t => t.length > 0);
			
			endpoint = '/backlinks/metrics';
			
			// SE Ranking expects multiple target parameters, not a comma-separated string
			// We'll pass the array and handle it specially in apiRequest
			// For now, we'll just pass the first target in params and handle the rest in the URL
			if (targetsList.length === 0) {
				throw new Error('Please provide at least one target domain');
			}
			
			// Set the first target as a regular param
			params.target = targetsList[0];
			
			// Store additional targets to be added as separate query params
			if (targetsList.length > 1) {
				params._additionalTargets = targetsList.slice(1);
			}
			break;
		}

		case 'getAll': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/all';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.order) params.order = additionalFields.order;
			if (additionalFields.linkType) params.link_type = additionalFields.linkType;
			if (additionalFields.linkStatus) params.link_status = additionalFields.linkStatus;
			break;
		}

		case 'getRaw': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/raw';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.cursor) params.cursor = additionalFields.cursor;
			if (additionalFields.linkType) params.link_type = additionalFields.linkType;
			break;
		}

		case 'getCount': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/count';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			break;
		}

		case 'export': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/export';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			if (additionalFields.linkType) params.link_type = additionalFields.linkType;
			if (additionalFields.linkStatus) params.link_status = additionalFields.linkStatus;
			break;
		}

		case 'exportStatus': {
			const taskId = this.getNodeParameter('taskId', index) as string;
			
			endpoint = '/backlinks/export/status';
			params.task_id = taskId;
			break;
		}

		case 'exportDownload': {
			const exportUrl = this.getNodeParameter('exportUrl', index) as string;
			
			// SE Ranking returns a full absolute URL that may be on a different domain
			// We need to pass the full URL to apiRequest and handle it specially there
			// Mark this as a special case by using a flag
			endpoint = exportUrl;
			params._fullUrl = true; // Flag to tell apiRequest to use the URL as-is
			break;
		}


		case 'getHistory': {
			const target = this.getNodeParameter('target', index) as string;
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			if (!validateDateFormat(dateFrom) || !validateDateFormat(dateTo)) {
				throw new Error('Date must be in YYYY-MM-DD format');
			}
			
			endpoint = '/backlinks/history';
			params.target = target;
			params.date_from = dateFrom;
			params.date_to = dateTo;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			if (additionalFields.eventType) params.event_type = additionalFields.eventType;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			break;
		}

		case 'getHistoryCount': {
			const target = this.getNodeParameter('target', index) as string;
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			if (!validateDateFormat(dateFrom) || !validateDateFormat(dateTo)) {
				throw new Error('Date must be in YYYY-MM-DD format');
			}
			
			endpoint = '/backlinks/history/count';
			params.target = target;
			params.date_from = dateFrom;
			params.date_to = dateTo;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			break;
		}

		case 'getCumulativeHistory': {
			const target = this.getNodeParameter('target', index) as string;
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			if (!validateDateFormat(dateFrom) || !validateDateFormat(dateTo)) {
				throw new Error('Date must be in YYYY-MM-DD format');
			}
			
			endpoint = '/backlinks/history/cumulative';
			params.target = target;
			params.date_from = dateFrom;
			params.date_to = dateTo;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			break;
		}

		case 'getAnchors': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/anchors';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			break;
		}

		case 'getRefDomains': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/refdomains';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.order) params.order = additionalFields.order;
			break;
		}

		case 'getRefDomainsCount': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/refdomains/count';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			break;
		}

		case 'getRefDomainsHistory': {
			const target = this.getNodeParameter('target', index) as string;
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			if (!validateDateFormat(dateFrom) || !validateDateFormat(dateTo)) {
				throw new Error('Date must be in YYYY-MM-DD format');
			}
			
			endpoint = '/backlinks/refdomains/history';
			params.target = target;
			params.date_from = dateFrom;
			params.date_to = dateTo;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			if (additionalFields.eventType) params.event_type = additionalFields.eventType;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			break;
		}

		case 'getRefDomainsHistoryCount': {
			const target = this.getNodeParameter('target', index) as string;
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			if (!validateDateFormat(dateFrom) || !validateDateFormat(dateTo)) {
				throw new Error('Date must be in YYYY-MM-DD format');
			}
			
			endpoint = '/backlinks/refdomains/history/count';
			params.target = target;
			params.date_from = dateFrom;
			params.date_to = dateTo;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			break;
		}

		case 'getReferringIps': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/referring-ips';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			break;
		}

		case 'getReferringIpsCount': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/referring-ips/count';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			break;
		}

		case 'getReferringSubnetsCount': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/referring-subnets/count';
			params.target = target;
			
			if (additionalFields.mode) params.mode = mapMode(additionalFields.mode);
			break;
		}

		case 'getIndexedPages': {
			const target = this.getNodeParameter('target', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/backlinks/indexed-pages';
			params.target = target;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			break;
		}

		case 'getAuthority': {
			const target = this.getNodeParameter('target', index) as string;
			
			endpoint = '/backlinks/authority';
			params.target = target;
			break;
		}

		case 'getDomainAuthority': {
			const target = this.getNodeParameter('target', index) as string;
			
			endpoint = '/backlinks/authority/domain';
			params.target = target;
			break;
		}

		case 'getDomainAuthorityDistribution': {
			const target = this.getNodeParameter('target', index) as string;
			
			endpoint = '/backlinks/authority/domain/distribution';
			params.target = target;
			break;
		}

		case 'getPageAuthority': {
			const target = this.getNodeParameter('target', index) as string;
			
			endpoint = '/backlinks/authority/page';
			params.target = target;
			break;
		}

		case 'getPageAuthorityHistory': {
			const target = this.getNodeParameter('target', index) as string;
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			
			if (!validateDateFormat(dateFrom) || !validateDateFormat(dateTo)) {
				throw new Error('Date must be in YYYY-MM-DD format');
			}
			
			endpoint = '/backlinks/authority/page/history';
			params.target = target;
			params.date_from = dateFrom;
			params.date_to = dateTo;
			break;
		}

		default:
			throw new Error(`Unknown Backlinks operation: ${operation}`);
	}

	return await apiRequest.call(this, method, endpoint, {}, params, index);
}