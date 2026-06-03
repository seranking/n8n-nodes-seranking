import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// AIRT paths under unified docs: /project-management/airt/...
// site_id / llm_id / k2site_llm_id move from path to query string.
// Plural→singular rename: /airt/brands → /airt/brand.

export async function AiResultTrackerOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	const siteId = this.getNodeParameter('siteId', index) as number;

	switch (operation) {
		// ─── Brands ──────────────────────────────────────────────────────────
		case 'getSiteBrand': {
			return await apiRequest.call(this, 'GET', '/project-management/airt/brand', {}, { site_id: siteId }, index);
		}

		case 'saveSiteBrand': {
			const brand = this.getNodeParameter('brandName', index) as string;

			if (!brand || brand.trim() === '') {
				throw new Error('Brand name cannot be empty');
			}
			if (brand.trim().length > 255) {
				throw new Error('Brand name cannot exceed 255 characters');
			}

			return await apiRequest.call(this, 'POST', '/project-management/airt/brand', { brand: brand.trim() }, { site_id: siteId }, index);
		}

		// ─── LLM Engines ────────────────────────────────────────────────────
		case 'listLlmEngines': {
			return await apiRequest.call(this, 'GET', '/project-management/airt/llm', {}, { site_id: siteId }, index);
		}

		case 'getLlmEngine': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/airt/llm', {}, { site_id: siteId, llm_id: llmId }, index);
		}

		case 'createLlmEngine': {
			const baseName = this.getNodeParameter('baseName', index) as string;
			const countryCode = this.getNodeParameter('countryCode', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = {
				base_name: baseName,
				country_code: countryCode,
			};

			if (additionalFields.regionName) body.region_name = additionalFields.regionName;
			if (additionalFields.langCode) body.lang_code = additionalFields.langCode;

			return await apiRequest.call(this, 'POST', '/project-management/airt/llm', body, { site_id: siteId }, index);
		}

		case 'updateLlmEngine': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;

			const body: any = {};
			if (updateFields.regionName !== undefined) body.region_name = updateFields.regionName || null;
			if (updateFields.langCode !== undefined) body.lang_code = updateFields.langCode || null;

			return await apiRequest.call(this, 'PATCH', `/project-management/airt/llm?site_id=${siteId}&llm_id=${llmId}`, body, {}, index);
		}

		case 'deleteLlmEngine': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			await apiRequest.call(this, 'DELETE', '/project-management/airt/llm', {}, { site_id: siteId, llm_id: llmId }, index);
			return { success: true, deleted: true, llm_id: llmId };
		}

		case 'getLlmStatus': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/airt/llm/status', {}, { site_id: siteId, llm_id: llmId }, index);
		}

		case 'getLlmStatistics': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { site_id: siteId, llm_id: llmId };
			if (additionalFields.from) query.from = additionalFields.from;
			if (additionalFields.to) query.to = additionalFields.to;
			if (additionalFields.top !== undefined) query.top = additionalFields.top;

			return await apiRequest.call(this, 'GET', '/project-management/airt/llm/statistics', {}, query, index);
		}

		// ─── Prompts ────────────────────────────────────────────────────────
		case 'listPrompts': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { site_id: siteId, llm_id: llmId };
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			let endpoint = '/project-management/airt/prompts';
			if (additionalFields.groupIds) {
				const ids = additionalFields.groupIds.split(',').map((id: string) => id.trim());
				endpoint += '?' + ids.map((id: string) => `group_ids[]=${encodeURIComponent(id)}`).join('&');
			}

			return await apiRequest.call(this, 'GET', endpoint, {}, query, index);
		}

		case 'addPrompts': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const promptsStr = this.getNodeParameter('prompts', index) as string;
			const prompts = promptsStr.split(',').map((p) => p.trim()).filter((p) => p.length > 0);
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { prompts };
			if (additionalFields.groupId) body.group_id = additionalFields.groupId;

			return await apiRequest.call(this, 'POST', '/project-management/airt/prompts', body, { site_id: siteId, llm_id: llmId }, index);
		}

		case 'deletePrompts': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const idsStr = this.getNodeParameter('k2siteLlmIds', index) as string;
			const k2siteLlmIds = idsStr.split(',').map((id) => parseInt(id.trim(), 10));

			// Spec change: was DELETE → now POST /airt/prompts/delete
			await apiRequest.call(this, 'POST', '/project-management/airt/prompts/delete', { k2site_llm_ids: k2siteLlmIds }, { site_id: siteId, llm_id: llmId }, index);
			return { success: true, deleted: true, k2site_llm_ids: k2siteLlmIds };
		}

		case 'getPromptRankings': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { site_id: siteId, llm_id: llmId };
			if (additionalFields.dateFrom) query.date_from = additionalFields.dateFrom;
			if (additionalFields.dateTo) query.date_to = additionalFields.dateTo;
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;
			// NEW in v2.0.0 — mode=groups returns aggregated per-group time series
			if (additionalFields.mode) query.mode = additionalFields.mode;

			let endpoint = '/project-management/airt/prompts/rankings';
			if (additionalFields.groupIds) {
				const ids = additionalFields.groupIds.split(',').map((id: string) => id.trim());
				endpoint += '?' + ids.map((id: string) => `group_ids[]=${encodeURIComponent(id)}`).join('&');
			}

			return await apiRequest.call(this, 'GET', endpoint, {}, query, index);
		}

		case 'getPromptAnswer': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const k2siteLlmId = this.getNodeParameter('k2siteLlmId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { site_id: siteId, llm_id: llmId, prompt_llm_id: k2siteLlmId };
			if (additionalFields.date) query.date = additionalFields.date;

			// Param-name quirk (verified 2026-06-03): the value is the k2site_llm_id from List Prompts,
			// but the /answer query KEY must be `prompt_llm_id`. Sending `k2site_llm_id` returns 400
			// (the docs are wrong). Response echoes it as `prompt_llm_id` too.
			return await apiRequest.call(this, 'GET', '/project-management/airt/prompts/answer', {}, query, index);
		}

		default:
			throw new Error(`Unknown AI Result Tracker operation: ${operation}`);
	}
}
