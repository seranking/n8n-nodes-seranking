import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// Analytics Traffic under unified docs: /project-management/analytics/...
// Path renames: /analytics/{id}/google → /analytics/gsc/queries?site_id=;
//   /analytics/{id}/potential → /analytics/seo-potential?site_id=

export async function AnalyticsTrafficOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	const siteId = this.getNodeParameter('siteId', index) as number;

	switch (operation) {
		case 'getGscData': {
			return await apiRequest.call(this, 'GET', '/project-management/analytics/gsc/queries', {}, { site_id: siteId }, index);
		}

		case 'getSeoPotential': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { site_id: siteId };
			if (additionalFields.topN !== undefined) query.top_n = additionalFields.topN;
			if (additionalFields.leadPrice !== undefined) query.lead_price = additionalFields.leadPrice;
			if (additionalFields.conversionRate !== undefined) query.conversion_rate = additionalFields.conversionRate;
			return await apiRequest.call(this, 'GET', '/project-management/analytics/seo-potential', {}, query, index);
		}

		default:
			throw new Error(`Unknown Analytics Traffic operation: ${operation}`);
	}
}
