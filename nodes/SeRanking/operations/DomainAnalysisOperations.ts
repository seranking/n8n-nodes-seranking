import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../utils/apiRequest';
import { validateDomain } from '../utils/validators';

export async function DomainAnalysisOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	
	let endpoint = '';
	const params: any = {};
	let method = 'GET';

	switch (operation) {
		case 'getOverview': {
			const domain = this.getNodeParameter('domain', index) as string;
			endpoint = '/domain/overview';
			params.domain = validateDomain(domain);
			break;
		}

		case 'getOverviewDb': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/overview/db';
			params.source = source;
			params.domain = validateDomain(domain);
			params.with_subdomains = additionalFields.withSubdomains ? 1 : 0;
			break;
		}

		case 'getOverviewWorldwide': {
			const domain = this.getNodeParameter('domain', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/overview/worldwide';
			params.domain = validateDomain(domain);
			
			if (additionalFields.currency) params.currency = additionalFields.currency;
			if (additionalFields.fields) params.fields = additionalFields.fields.join(',');
			if (additionalFields.showZonesList !== undefined) {
				params.show_zones_list = additionalFields.showZonesList ? 1 : 0;
			}
			break;
		}

		case 'getKeywords': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/keywords';
			params.source = source;
			params.domain = validateDomain(domain);
			params.type = type;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.withSubdomains !== undefined) {
				params.with_subdomains = additionalFields.withSubdomains ? 1 : 0;
			}
			if (additionalFields.cols) params.cols = additionalFields.cols.join(',');
			if (additionalFields.orderField) params.order_field = additionalFields.orderField;
			if (additionalFields.orderType) params.order_type = additionalFields.orderType;
			
			// Filters
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;
			if (additionalFields.positionFrom) params['filter[position][from]'] = additionalFields.positionFrom;
			if (additionalFields.positionTo) params['filter[position][to]'] = additionalFields.positionTo;
			if (additionalFields.cpcFrom) params['filter[cpc][from]'] = additionalFields.cpcFrom;
			if (additionalFields.cpcTo) params['filter[cpc][to]'] = additionalFields.cpcTo;
			break;
		}

		case 'getCompetitors': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/competitors';
			params.source = source;
			params.domain = validateDomain(domain);
			params.type = type;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.stats !== undefined) {
				params.stats = additionalFields.stats ? 1 : 0;
			}
			if (additionalFields.excludeLeaders !== undefined) {
				params.exclude_leaders = additionalFields.excludeLeaders ? 1 : 0;
			}
			break;
		}

		default:
			throw new Error(`Unknown Domain Analysis operation: ${operation}`);
	}

	return await apiRequest.call(this, method, endpoint, {}, params, index);
}