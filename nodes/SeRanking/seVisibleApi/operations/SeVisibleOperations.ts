import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// SE Visible API — /se-visible/... (apiRequest prepends /v1 via BASE_URL).
// Query serialization VERIFIED LIVE 2026-07-13: bracketed keys emitted literally —
// date_range[0][from], dimensions[], metrics[], AND every repeatable filter uses
// the bracketed form too (model_types[]=a&model_types[]=b). Bare repeated keys
// (model_types=a&model_types=b, as the Postman docs imply) are REJECTED with
// 422 "The <field> field must be an array."
// Rate limit: 1 request/second, throttled path-based in apiRequest.

const SEV = '/se-visible';

// n8n dateTime values are full ISO strings; the API wants YYYY-MM-DD.
function sevDate(value: string): string {
	return (value || '').slice(0, 10);
}

function splitLines(value: string): string[] {
	return (value || '').split('\n').map((s) => s.trim()).filter((s) => s.length > 0);
}

function splitIds(value: string): number[] {
	return (value || '')
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
}

function splitCsv(value: string): string[] {
	return (value || '').split(',').map((s) => s.trim()).filter((s) => s.length > 0);
}

// The API requires domain fields to be full URLs ("The domain field must be a
// valid URL.", 422 on bare domains — verified live 2026-07-13). Accept either.
function ensureUrl(domain: string): string {
	const d = (domain || '').trim();
	if (d === '' || /^https?:\/\//i.test(d)) return d;
	return `https://${d}`;
}

// Query pairs with keys emitted verbatim (brackets untouched), values encoded.
function addPair(pairs: string[], key: string, value: string | number): void {
	pairs.push(`${key}=${encodeURIComponent(String(value))}`);
}

function addDateRange(pairs: string[], index: number, from: string, to: string): void {
	addPair(pairs, `date_range[${index}][from]`, sevDate(from));
	addPair(pairs, `date_range[${index}][to]`, sevDate(to));
}

// Shared filters (metrics / prompts / results / sources) — bracketed [] form
// required (bare repeated keys → 422 "must be an array", verified live).
function addFilters(pairs: string[], additionalFields: any): void {
	for (const m of additionalFields.modelTypes || []) addPair(pairs, 'model_types[]', m);
	for (const c of splitCsv(additionalFields.countryCodes || '')) addPair(pairs, 'country_codes[]', c);
	for (const t of splitCsv(additionalFields.topicIds || '')) addPair(pairs, 'topic_ids[]', t);
	for (const s of additionalFields.sentiments || []) addPair(pairs, 'sentiments[]', s);
	for (const b of splitCsv(additionalFields.trackedBrandIds || '')) addPair(pairs, 'tracked_brand_ids[]', b);
}

function withQuery(endpoint: string, pairs: string[]): string {
	return pairs.length > 0 ? `${endpoint}?${pairs.join('&')}` : endpoint;
}

export async function SeVisibleOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		// ─── Projects ────────────────────────────────────────────────────────
		case 'listProjects': {
			return await apiRequest.call(this, 'GET', `${SEV}/projects`, {}, {}, index);
		}

		case 'createProject': {
			const domain = this.getNodeParameter('domain', index) as string;
			const countryCode = this.getNodeParameter('countryCode', index) as string;
			const langCode = this.getNodeParameter('langCode', index) as string;
			const brandNames = splitLines(this.getNodeParameter('brandNames', index) as string);
			const topics = splitLines(this.getNodeParameter('topics', index) as string);

			if (brandNames.length === 0) throw new Error('At least one brand name is required');
			if (topics.length === 0) throw new Error('At least one topic is required');

			// Async: the response carries only the new project id — poll Get Project
			// Details for check.processed_percent / project.status.
			// country_code must be UPPERCASE ("us" → 422 "selected country code is
			// invalid", "US" → 200 — verified live 2026-07-13). lang_code is lowercase.
			return await apiRequest.call(this, 'POST', `${SEV}/projects`, {
				domain: ensureUrl(domain),
				country_code: countryCode.trim().toUpperCase(),
				lang_code: langCode.trim().toLowerCase(),
				brand_names: brandNames,
				topics,
			}, {}, index);
		}

		case 'getProjectDetails': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			return await apiRequest.call(this, 'GET', `${SEV}/projects/${projectId}`, {}, {}, index);
		}

		case 'deleteProject': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			await apiRequest.call(this, 'DELETE', `${SEV}/projects/${projectId}`, {}, {}, index);
			// 204 — soft delete, restorable. Emit explicit output, never the input.
			return { success: true, deleted: true, project_id: projectId };
		}

		// ─── Brands ──────────────────────────────────────────────────────────
		case 'listTrackedBrands': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			return await apiRequest.call(this, 'GET', `${SEV}/projects/${projectId}/brands`, {}, {}, index);
		}

		case 'createBrand': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const title = this.getNodeParameter('brandTitle', index) as string;
			const domain = this.getNodeParameter('brandDomain', index) as string;
			const aliases = splitLines(this.getNodeParameter('brandAliases', index, '') as string);

			const body: any = { title, domain: ensureUrl(domain) };
			if (aliases.length > 0) body.aliases = aliases.map((t) => ({ title: t }));

			return await apiRequest.call(this, 'POST', `${SEV}/projects/${projectId}/brands`, body, {}, index);
		}

		case 'listMentionedBrands': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			return await apiRequest.call(this, 'GET', `${SEV}/projects/${projectId}/brands/mentioned`, {}, {}, index);
		}

		case 'getBrandMetrics': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const dimensions = this.getNodeParameter('dimensions', index) as string[];
			const metrics = this.getNodeParameter('metrics', index) as string[];
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			if (dimensions.length < 1 || dimensions.length > 3) {
				throw new Error('Dimensions must contain 1–3 values (the last one is the pivot)');
			}
			if (metrics.length < 1 || metrics.length > 5) {
				throw new Error('Metrics must contain 1–5 values');
			}

			const pairs: string[] = [];
			for (const d of dimensions) addPair(pairs, 'dimensions[]', d);
			for (const m of metrics) addPair(pairs, 'metrics[]', m);
			addDateRange(pairs, 0, dateFrom, dateTo);
			if (additionalFields.compareFrom && additionalFields.compareTo) {
				addDateRange(pairs, 1, additionalFields.compareFrom, additionalFields.compareTo);
			}
			addFilters(pairs, additionalFields);
			if (additionalFields.sortField) addPair(pairs, 'sort_field', additionalFields.sortField);
			if (additionalFields.sortOrder) addPair(pairs, 'sort_order', additionalFields.sortOrder);
			if (additionalFields.limit !== undefined) addPair(pairs, 'limit', additionalFields.limit);
			if (additionalFields.offset !== undefined) addPair(pairs, 'offset', additionalFields.offset);

			return await apiRequest.call(this, 'GET', withQuery(`${SEV}/projects/${projectId}/brands/metrics`, pairs), {}, {}, index);
		}

		case 'updateBrand': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const brandId = this.getNodeParameter('sevBrandId', index) as string;
			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;

			// This PATCH carries a JSON body (not the inline-query PATCH pattern used
			// on the Project API). Aliases REPLACE the existing set; [] clears them.
			const body: any = {};
			if (updateFields.domain) body.domain = ensureUrl(updateFields.domain);
			if ('aliases' in updateFields) {
				body.aliases = splitLines(updateFields.aliases).map((t) => ({ title: t }));
			}
			if (Object.keys(body).length === 0) {
				throw new Error('Provide at least one field to update (Domain or Aliases)');
			}

			return await apiRequest.call(this, 'PATCH', `${SEV}/projects/${projectId}/brands/${brandId}`, body, {}, index);
		}

		case 'deleteBrand': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const brandId = this.getNodeParameter('sevBrandId', index) as string;
			// The primary brand cannot be deleted — the API returns 422.
			await apiRequest.call(this, 'DELETE', `${SEV}/projects/${projectId}/brands/${brandId}`, {}, {}, index);
			return { success: true, deleted: true, brand_id: brandId };
		}

		case 'addBrandAliases': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const brandId = this.getNodeParameter('sevBrandId', index) as string;
			const aliases = splitLines(this.getNodeParameter('aliases', index) as string);

			if (aliases.length === 0) throw new Error('At least one alias is required');

			// Body is a RAW JSON ARRAY [{title}, ...], not wrapped in an object.
			const body = aliases.map((t) => ({ title: t }));
			return await apiRequest.call(this, 'POST', `${SEV}/projects/${projectId}/brands/${brandId}/aliases`, body, {}, index);
		}

		// ─── Topics ──────────────────────────────────────────────────────────
		case 'createTopics': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const titles = splitLines(this.getNodeParameter('topicTitles', index) as string);

			if (titles.length === 0) throw new Error('At least one topic title is required');

			return await apiRequest.call(this, 'POST', `${SEV}/projects/${projectId}/topics`, { titles }, {}, index);
		}

		case 'updateTopic': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const topicId = this.getNodeParameter('sevTopicId', index) as string;
			const title = this.getNodeParameter('topicTitle', index) as string;

			return await apiRequest.call(this, 'PUT', `${SEV}/projects/${projectId}/topics/${topicId}`, { title }, {}, index);
		}

		case 'deleteTopic': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const topicId = this.getNodeParameter('sevTopicId', index) as string;
			// Cascades: deletes all prompts grouped under the topic.
			await apiRequest.call(this, 'DELETE', `${SEV}/projects/${projectId}/topics/${topicId}`, {}, {}, index);
			return { success: true, deleted: true, topic_id: topicId };
		}

		// ─── Prompts & Results ───────────────────────────────────────────────
		case 'listPrompts': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const groupMode = this.getNodeParameter('groupMode', index) as string;
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const pairs: string[] = [];
			addPair(pairs, 'group_mode', groupMode);
			addDateRange(pairs, 0, dateFrom, dateTo);
			addFilters(pairs, additionalFields);
			if (additionalFields.searchQuery) addPair(pairs, 'search_query', additionalFields.searchQuery);
			if (additionalFields.sortField) addPair(pairs, 'sort_field', additionalFields.sortField);
			if (additionalFields.sortOrder) addPair(pairs, 'sort_order', additionalFields.sortOrder);
			if (additionalFields.limit !== undefined) addPair(pairs, 'limit', additionalFields.limit);
			if (additionalFields.offset !== undefined) addPair(pairs, 'offset', additionalFields.offset);

			return await apiRequest.call(this, 'GET', withQuery(`${SEV}/projects/${projectId}/prompts`, pairs), {}, {}, index);
		}

		case 'deletePrompts': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const promptIds = splitIds(this.getNodeParameter('promptIds', index) as string);

			if (promptIds.length === 0) throw new Error('At least one prompt ID is required');

			await apiRequest.call(this, 'DELETE', `${SEV}/projects/${projectId}/prompts`, { prompt_ids: promptIds }, {}, index);
			return { success: true, deleted: true, prompt_ids: promptIds };
		}

		case 'createPrompts': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const topicId = this.getNodeParameter('sevTopicId', index) as string;
			const prompts = splitLines(this.getNodeParameter('prompts', index) as string);

			if (prompts.length === 0) throw new Error('At least one prompt is required');

			return await apiRequest.call(this, 'POST', `${SEV}/projects/${projectId}/topics/${topicId}/prompts`, { prompts }, {}, index);
		}

		case 'movePrompts': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const targetTopicId = this.getNodeParameter('sevTargetTopicId', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const promptIds = splitIds(additionalFields.promptIds || '');
			const topicIds = splitIds(additionalFields.topicIds || '');
			if (promptIds.length === 0 && topicIds.length === 0) {
				throw new Error('Provide Prompt IDs and/or Source Topic IDs (at least one)');
			}

			const body: any = {};
			if (promptIds.length > 0) body.prompt_ids = promptIds;
			if (topicIds.length > 0) body.topic_ids = topicIds;

			// Atomic (all-or-nothing); target topic must belong to the same project.
			await apiRequest.call(this, 'POST', `${SEV}/projects/${projectId}/prompts/move/${targetTopicId}`, body, {}, index);
			return { success: true, moved: true, target_topic_id: targetTopicId, prompt_ids: promptIds, topic_ids: topicIds };
		}

		case 'getPromptDetails': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const promptId = this.getNodeParameter('sevPromptId', index) as number;
			return await apiRequest.call(this, 'GET', `${SEV}/projects/${projectId}/prompts/${promptId}`, {}, {}, index);
		}

		case 'getPromptResults': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const promptId = this.getNodeParameter('sevPromptId', index) as number;
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const pairs: string[] = [];
			addDateRange(pairs, 0, dateFrom, dateTo);
			addFilters(pairs, additionalFields);
			if (additionalFields.limit !== undefined) addPair(pairs, 'limit', additionalFields.limit);
			if (additionalFields.offset !== undefined) addPair(pairs, 'offset', additionalFields.offset);

			return await apiRequest.call(this, 'GET', withQuery(`${SEV}/projects/${projectId}/prompts/${promptId}/results`, pairs), {}, {}, index);
		}

		case 'getPromptResultDetails': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const promptId = this.getNodeParameter('sevPromptId', index) as number;
			const resultId = this.getNodeParameter('sevResultId', index) as number;
			return await apiRequest.call(this, 'GET', `${SEV}/projects/${projectId}/prompts/${promptId}/results/${resultId}`, {}, {}, index);
		}

		case 'downloadRawResponse': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const promptId = this.getNodeParameter('sevPromptId', index) as number;
			const resultId = this.getNodeParameter('sevResultId', index) as number;

			// Response is text/html, not JSON — _rawText makes apiRequest skip JSON parsing.
			const response = await apiRequest.call(
				this, 'GET', `${SEV}/projects/${projectId}/prompts/${promptId}/results/${resultId}/dump`, {}, { _rawText: true }, index,
			);
			return { result_id: resultId, html: typeof response === 'string' ? response : String(response) };
		}

		// ─── Sources ─────────────────────────────────────────────────────────
		case 'getProjectSources': {
			const projectId = this.getNodeParameter('sevProjectId', index) as string;
			const sourceType = this.getNodeParameter('sourceType', index) as string;
			const dateFrom = this.getNodeParameter('dateFrom', index) as string;
			const dateTo = this.getNodeParameter('dateTo', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const pairs: string[] = [];
			addDateRange(pairs, 0, dateFrom, dateTo);
			addPair(pairs, 'source_type', sourceType);
			// Sort field values are gated by source_type — a cross-type value returns 422.
			if (additionalFields.sortField) addPair(pairs, 'source_sort_field', additionalFields.sortField);
			if (additionalFields.sortOrder) addPair(pairs, 'sort_order', additionalFields.sortOrder);
			addFilters(pairs, additionalFields);
			for (const p of splitCsv(additionalFields.promptIds || '')) addPair(pairs, 'prompt_ids[]', p);
			if (additionalFields.searchQuery) addPair(pairs, 'search_query', additionalFields.searchQuery);
			if (additionalFields.domainId) addPair(pairs, 'domain_id', additionalFields.domainId);
			for (const t of additionalFields.types || []) addPair(pairs, 'types[]', t);
			if (additionalFields.isMyBrandMentions !== undefined && additionalFields.isMyBrandMentions !== '') {
				addPair(pairs, 'is_my_brand_mentions', additionalFields.isMyBrandMentions);
			}
			if (additionalFields.competitorsCountFrom) addPair(pairs, 'competitors_count_from', additionalFields.competitorsCountFrom);
			if (additionalFields.competitorsCountTo) addPair(pairs, 'competitors_count_to', additionalFields.competitorsCountTo);
			const brandIds = splitCsv(additionalFields.brandIds || '');
			if (brandIds.length > 0) {
				for (const b of brandIds) addPair(pairs, 'brand_ids[]', b);
				addPair(pairs, 'brand_match_mode', additionalFields.brandMatchMode || 'any');
			}
			if (additionalFields.limit !== undefined) addPair(pairs, 'limit', additionalFields.limit);
			if (additionalFields.offset !== undefined) addPair(pairs, 'offset', additionalFields.offset);

			// Numeric fields in rows are metric objects with a `values` array
			// (2 entries + delta in compare mode) — left nested for downstream use.
			return await apiRequest.call(this, 'GET', withQuery(`${SEV}/projects/${projectId}/sources`, pairs), {}, {}, index);
		}

		// ─── Subscription ────────────────────────────────────────────────────
		case 'getSubscription': {
			return await apiRequest.call(this, 'GET', `${SEV}/subscription`, {}, {}, index);
		}

		default:
			throw new Error(`Unknown SE Visible operation: ${operation}`);
	}
}
