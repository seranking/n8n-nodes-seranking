import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// Competitors under unified docs: /project-management/competitors
// site_id / competitor_id move from path to query string.
// Path renames: /competitors/site/{id} → /competitors?site_id=;
//   /competitors/top10/{id} → /competitors/serp10?site_id=;
//   /competitors/top100/{id} → /competitors/serp100?site_id=;
//   /competitors/all/{id} → /competitors/metrics?site_id=

export async function CompetitorsOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'addCompetitor': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const url = this.getNodeParameter('competitorUrl', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = {
				site_id: siteId,
				url,
			};

			if (additionalFields.name) body.name = additionalFields.name;
			if (additionalFields.subdomainMatch !== undefined) body.subdomain_match = additionalFields.subdomainMatch;

			return await apiRequest.call(this, 'POST', '/project-management/competitors', body, {}, index);
		}

		case 'listCompetitors': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/competitors', {}, { site_id: siteId }, index);
		}

		case 'getPositions': {
			const competitorId = this.getNodeParameter('competitorId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { competitor_id: competitorId };
			if (additionalFields.dateFrom) query.date_from = additionalFields.dateFrom;
			if (additionalFields.dateTo) query.date_to = additionalFields.dateTo;
			if (additionalFields.siteEngineId) query.site_engine_id = additionalFields.siteEngineId;
			if (additionalFields.withSerpFeatures !== undefined) query.with_serp_features = additionalFields.withSerpFeatures;

			return await apiRequest.call(this, 'GET', '/project-management/competitors/positions', {}, query, index);
		}

		case 'deleteCompetitor': {
			const competitorId = this.getNodeParameter('competitorId', index) as number;

			await apiRequest.call(this, 'DELETE', '/project-management/competitors', {}, { competitor_id: competitorId }, index);
			return { success: true, deleted: true, competitor_id: competitorId };
		}

		case 'getTop10': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const date = this.getNodeParameter('date', index) as string;
			const siteEngineId = this.getNodeParameter('siteEngineId', index) as number;
			const keywordId = this.getNodeParameter('keywordId', index) as number;

			const query: any = {
				site_id: siteId,
				date,
				site_engine_id: siteEngineId,
				keyword_id: keywordId,
			};

			return await apiRequest.call(this, 'GET', '/project-management/competitors/serp10', {}, query, index);
		}

		case 'getTop100': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const date = this.getNodeParameter('date', index) as string;
			const siteEngineId = this.getNodeParameter('siteEngineId', index) as number;
			const keywordId = this.getNodeParameter('keywordId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {
				site_id: siteId,
				date,
				site_engine_id: siteEngineId,
				keyword_id: keywordId,
			};

			if (additionalFields.top !== undefined) query.top = additionalFields.top;

			return await apiRequest.call(this, 'GET', '/project-management/competitors/serp100', {}, query, index);
		}

		case 'getAllCompetitors': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const date = this.getNodeParameter('date', index) as string;
			const siteEngineId = this.getNodeParameter('siteEngineId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {
				site_id: siteId,
				date,
				site_engine_id: siteEngineId,
			};

			if (additionalFields.groupId) query.group_id = additionalFields.groupId;
			if (additionalFields.tags) {
				const tagIds = additionalFields.tags.split(',').map((id: string) => parseInt(id.trim(), 10));
				tagIds.forEach((id: number, i: number) => {
					query[`tags[${i}]`] = id;
				});
			}

			return await apiRequest.call(this, 'GET', '/project-management/competitors/metrics', {}, query, index);
		}

		default:
			throw new Error(`Unknown Competitors operation: ${operation}`);
	}
}
