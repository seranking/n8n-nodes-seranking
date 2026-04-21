import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function AiResultTrackerOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	const siteId = this.getNodeParameter('siteId', index) as number;

	switch (operation) {
		// ─── Brands ──────────────────────────────────────────────────────────
		case 'getSiteBrand': {
			return await apiRequest.call(this, 'GET', `/sites/${siteId}/airt/brands`, {}, {}, index);
		}

		case 'saveSiteBrand': {
			const brand = this.getNodeParameter('brandName', index) as string;

			if (!brand || brand.trim() === '') {
				throw new Error('Brand name cannot be empty');
			}
			if (brand.trim().length > 255) {
				throw new Error('Brand name cannot exceed 255 characters');
			}

			return await apiRequest.call(this, 'POST', `/sites/${siteId}/airt/brands`, { brand: brand.trim() }, {}, index);
		}

		// ─── LLM Engines ────────────────────────────────────────────────────
		case 'listLlmEngines': {
			return await apiRequest.call(this, 'GET', `/sites/${siteId}/airt/llm`, {}, {}, index);
		}

		case 'getLlmEngine': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			return await apiRequest.call(this, 'GET', `/sites/${siteId}/airt/llm/${llmId}`, {}, {}, index);
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

			return await apiRequest.call(this, 'POST', `/sites/${siteId}/airt/llm`, body, {}, index);
		}

		case 'updateLlmEngine': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;

			const body: any = {};
			if (updateFields.regionName !== undefined) body.region_name = updateFields.regionName || null;
			if (updateFields.langCode !== undefined) body.lang_code = updateFields.langCode || null;

			return await apiRequest.call(this, 'PATCH', `/sites/${siteId}/airt/llm/${llmId}`, body, {}, index);
		}

		case 'deleteLlmEngine': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			await apiRequest.call(this, 'DELETE', `/sites/${siteId}/airt/llm/${llmId}`, {}, {}, index);
			return { success: true, deleted: true, llm_id: llmId };
		}

		case 'getLlmStatus': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			return await apiRequest.call(this, 'GET', `/sites/${siteId}/airt/llm/${llmId}/status`, {}, {}, index);
		}

		case 'getLlmStatistics': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.from) query.from = additionalFields.from;
			if (additionalFields.to) query.to = additionalFields.to;
			if (additionalFields.top !== undefined) query.top = additionalFields.top;

			return await apiRequest.call(this, 'GET', `/sites/${siteId}/airt/llm/${llmId}/statistics`, {}, query, index);
		}

		// ─── Prompts ────────────────────────────────────────────────────────
		case 'listPrompts': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			let endpoint = `/sites/${siteId}/airt/llm/${llmId}/prompts`;
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

			return await apiRequest.call(this, 'POST', `/sites/${siteId}/airt/llm/${llmId}/prompts`, body, {}, index);
		}

		case 'deletePrompts': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const idsStr = this.getNodeParameter('k2siteLlmIds', index) as string;
			const k2siteLlmIds = idsStr.split(',').map((id) => parseInt(id.trim(), 10));

			await apiRequest.call(this, 'DELETE', `/sites/${siteId}/airt/llm/${llmId}/prompts`, { k2site_llm_ids: k2siteLlmIds }, {}, index);
			return { success: true, deleted: true, k2site_llm_ids: k2siteLlmIds };
		}

		case 'getPromptRankings': {
			const llmId = this.getNodeParameter('llmId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.dateFrom) query.date_from = additionalFields.dateFrom;
			if (additionalFields.dateTo) query.date_to = additionalFields.dateTo;
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			let endpoint = `/sites/${siteId}/airt/llm/${llmId}/prompts/rankings`;
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

			const query: any = {};
			if (additionalFields.date) query.date = additionalFields.date;

			// NOTE: SE Ranking docs call this path param `keyword_id`, but the endpoint actually
			// expects `k2site_llm_id` (the keyword-LLM link ID from List Prompts).
			return await apiRequest.call(this, 'GET', `/sites/${siteId}/airt/llm/${llmId}/prompts/${k2siteLlmId}/answer`, {}, query, index);
		}

		default:
			throw new Error(`Unknown AI Result Tracker operation: ${operation}`);
	}
}
