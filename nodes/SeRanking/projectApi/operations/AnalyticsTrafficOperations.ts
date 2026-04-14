import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function AnalyticsTrafficOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	const siteId = this.getNodeParameter('siteId', index) as number;

	switch (operation) {
		case 'getGscData': {
			return await apiRequest.call(this, 'GET', `/analytics/${siteId}/google`, {}, {}, index);
		}

		case 'getSeoPotential': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.topN !== undefined) query.top_n = additionalFields.topN;
			if (additionalFields.leadPrice !== undefined) query.lead_price = additionalFields.leadPrice;
			if (additionalFields.conversionRate !== undefined) query.conversion_rate = additionalFields.conversionRate;
			return await apiRequest.call(this, 'GET', `/analytics/${siteId}/potential`, {}, query, index);
		}

		default:
			throw new Error(`Unknown Analytics Traffic operation: ${operation}`);
	}
}
