import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function ProjectManagementOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		// ─── Projects ───────────────────────────────────────────────────────
		case 'listProjects': {
			return await apiRequest.call(this, 'GET', '/sites', {}, {}, index);
		}

		case 'addProject': {
			const url = this.getNodeParameter('projectUrl', index) as string;
			const title = this.getNodeParameter('projectTitle', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { url, title };

			if (additionalFields.depth !== undefined) body.depth = additionalFields.depth;
			if (additionalFields.subdomainMatch !== undefined) body.subdomain_match = additionalFields.subdomainMatch;
			if (additionalFields.exactUrl !== undefined) body.exact_url = additionalFields.exactUrl;
			if (additionalFields.checkFreq) body.check_freq = additionalFields.checkFreq;
			if (additionalFields.checkDay) body.check_day = additionalFields.checkDay;
			if (additionalFields.siteGroupId) body.site_group_id = additionalFields.siteGroupId;
			if (additionalFields.autoReports !== undefined) body.auto_reports = additionalFields.autoReports;
			if (additionalFields.disableAudit !== undefined) body.disable_audit = additionalFields.disableAudit;
			if (additionalFields.isActive !== undefined) body.is_active = additionalFields.isActive;

			return await apiRequest.call(this, 'POST', '/sites', body, {}, index);
		}

		case 'changeProject': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;

			const body: any = {};
			if (updateFields.url) body.url = updateFields.url;
			if (updateFields.title) body.title = updateFields.title;
			if (updateFields.depth !== undefined) body.depth = updateFields.depth;
			if (updateFields.subdomainMatch !== undefined) body.subdomain_match = updateFields.subdomainMatch;
			if (updateFields.exactUrl !== undefined) body.exact_url = updateFields.exactUrl;
			if (updateFields.checkFreq) body.check_freq = updateFields.checkFreq;
			if (updateFields.checkDay) body.check_day = updateFields.checkDay;
			if (updateFields.siteGroupId) body.site_group_id = updateFields.siteGroupId;
			if (updateFields.isActive !== undefined) body.is_active = updateFields.isActive;

			await apiRequest.call(this, 'PUT', `/sites/${siteId}`, body, {}, index);
			return { success: true, site_id: siteId };
		}

		case 'deleteProject': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			await apiRequest.call(this, 'DELETE', `/sites/${siteId}`, {}, {}, index);
			return { success: true, deleted: true, site_id: siteId };
		}

		// ─── Search Engines ─────────────────────────────────────────────────
		case 'listSearchEngines': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			return await apiRequest.call(this, 'GET', `/sites/${siteId}/search-engines`, {}, {}, index);
		}

		case 'addSearchEngine': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const searchEngineId = this.getNodeParameter('searchEngineId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { search_engine_id: searchEngineId };

			if (additionalFields.regionId !== undefined) body.region_id = additionalFields.regionId;
			if (additionalFields.regionName) body.region_name = additionalFields.regionName;
			if (additionalFields.langCode) body.lang_code = additionalFields.langCode;
			if (additionalFields.mergeMap !== undefined) body.merge_map = additionalFields.mergeMap;
			if (additionalFields.businessName) body.business_name = additionalFields.businessName;
			if (additionalFields.phone) body.phone = additionalFields.phone;
			if (additionalFields.paidResults !== undefined) body.paid_results = additionalFields.paidResults;
			if (additionalFields.featuredSnippet !== undefined) body.featured_snippet = additionalFields.featuredSnippet;

			return await apiRequest.call(this, 'POST', `/sites/${siteId}/search-engines`, body, {}, index);
		}

		case 'changeSearchEngine': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const siteEngineId = this.getNodeParameter('siteEngineId', index) as number;
			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;

			const body: any = {};
			if (updateFields.regionId !== undefined) body.region_id = updateFields.regionId;
			if (updateFields.regionName) body.region_name = updateFields.regionName;
			if (updateFields.langCode) body.lang_code = updateFields.langCode;
			if (updateFields.mergeMap !== undefined) body.merge_map = updateFields.mergeMap;
			if (updateFields.businessName) body.business_name = updateFields.businessName;
			if (updateFields.phone) body.phone = updateFields.phone;
			if (updateFields.paidResults !== undefined) body.paid_results = updateFields.paidResults;
			if (updateFields.featuredSnippet !== undefined) body.featured_snippet = updateFields.featuredSnippet;

			await apiRequest.call(this, 'PUT', `/sites/${siteId}/search-engines/${siteEngineId}`, body, {}, index);
			return { success: true, site_id: siteId, site_engine_id: siteEngineId };
		}

		case 'deleteSearchEngine': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const siteEngineId = this.getNodeParameter('siteEngineId', index) as number;
			await apiRequest.call(this, 'DELETE', `/sites/${siteId}/search-engines/${siteEngineId}`, {}, {}, index);
			return { success: true, deleted: true, site_id: siteId, site_engine_id: siteEngineId };
		}

		// ─── Keywords ───────────────────────────────────────────────────────
		case 'listKeywords': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.siteEngineId) query.site_engine_id = additionalFields.siteEngineId;

			return await apiRequest.call(this, 'GET', `/sites/${siteId}/keywords`, {}, query, index);
		}

		case 'addKeywords': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const keywordsJson = this.getNodeParameter('keywordsJson', index) as string;
			const keywords = typeof keywordsJson === 'string' ? JSON.parse(keywordsJson) : keywordsJson;

			return await apiRequest.call(this, 'POST', `/sites/${siteId}/keywords`, keywords, {}, index);
		}

		case 'deleteKeywords': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const keywordIdsStr = this.getNodeParameter('keywordIds', index) as string;
			const keywordIds = keywordIdsStr.split(',').map((id) => parseInt(id.trim(), 10));

			const query: any = {};
			keywordIds.forEach((id, i) => {
				query[`keywords_ids[${i}]`] = id;
			});

			await apiRequest.call(this, 'DELETE', `/sites/${siteId}/keywords`, {}, query, index);
			return { success: true, deleted: true, keyword_ids: keywordIds };
		}

		// ─── Statistics & Data ──────────────────────────────────────────────
		case 'getStats': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			return await apiRequest.call(this, 'GET', `/sites/${siteId}/stat`, {}, {}, index);
		}

		case 'getPositions': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.dateFrom) query.date_from = additionalFields.dateFrom;
			if (additionalFields.dateTo) query.date_to = additionalFields.dateTo;
			if (additionalFields.siteEngineId) query.site_engine_id = additionalFields.siteEngineId;
			if (additionalFields.inTop) query.in_top = additionalFields.inTop;
			if (additionalFields.withLandingPages !== undefined) query.with_landing_pages = additionalFields.withLandingPages;
			if (additionalFields.withSerpFeatures !== undefined) query.with_serp_features = additionalFields.withSerpFeatures;

			return await apiRequest.call(this, 'GET', `/sites/${siteId}/positions`, {}, query, index);
		}

		case 'getAds': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.dateFrom) query.date_from = additionalFields.dateFrom;
			if (additionalFields.dateTo) query.date_to = additionalFields.dateTo;
			if (additionalFields.siteEngineIds) {
				additionalFields.siteEngineIds.split(',').forEach((id: string, i: number) => {
					query[`site_engine_ids[${i}]`] = parseInt(id.trim(), 10);
				});
			}
			if (additionalFields.keywordsIds) {
				additionalFields.keywordsIds.split(',').forEach((id: string, i: number) => {
					query[`keywords_ids[${i}]`] = parseInt(id.trim(), 10);
				});
			}

			return await apiRequest.call(this, 'GET', `/sites/${siteId}/ads`, {}, query, index);
		}

		case 'getHistoricalDates': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.siteEngineId) query.site_engine_id = additionalFields.siteEngineId;

			return await apiRequest.call(this, 'GET', `/sites/${siteId}/historicalDates`, {}, query, index);
		}

		// ─── Manual Position & Recheck ──────────────────────────────────────
		case 'setManualPosition': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const keywordId = this.getNodeParameter('keywordId', index) as number;
			const date = this.getNodeParameter('date', index) as string;
			const siteEngineId = this.getNodeParameter('manualSiteEngineId', index) as number;
			const position = this.getNodeParameter('position', index) as number;

			await apiRequest.call(this, 'PUT', `/sites/${siteId}/position`, {
				keyword_id: keywordId,
				date,
				site_engine_id: siteEngineId,
				position,
			}, {}, index);
			return { success: true, keyword_id: keywordId, position, date };
		}

		case 'runRecheck': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const checkMode = this.getNodeParameter('checkMode', index) as string;

			const body: any = {};
			if (checkMode === 'byEngine') {
				body.site_engine_id = this.getNodeParameter('recheckSiteEngineId', index) as number;
			} else {
				const keywordsJson = this.getNodeParameter('recheckKeywords', index) as string;
				body.keywords = typeof keywordsJson === 'string' ? JSON.parse(keywordsJson) : keywordsJson;
			}

			return await apiRequest.call(this, 'POST', `/api/sites/${siteId}/recheck`, body, {}, index);
		}

		default:
			throw new Error(`Unknown Project Management operation: ${operation}`);
	}
}
