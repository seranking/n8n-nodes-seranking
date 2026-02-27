import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';
import { validateSource, parseKeywords } from '../../utils/validators';

/**
 * Helper: converts a comma-separated string of "contains" words into the
 * filter[multi_keyword_included / excluded] array format expected by the API.
 *
 * e.g. "best, top" → [[{type:"contains",value:"best"},{type:"contains",value:"top"}]]
 */
function buildMultiKeywordFilter(csv: string): Array<Array<{ type: string; value: string }>> {
	return csv
		.split(',')
		.map((w) => w.trim())
		.filter(Boolean)
		.map((word) => [{ type: 'contains', value: word }]);
}

export async function KeywordResearchOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	let endpoint = '';
	const params: any = {};
	const body: any = {};
	let method = 'GET';

	switch (operation) {
		case 'exportMetrics': {
			const source = this.getNodeParameter('source', index) as string;
			const keywords = this.getNodeParameter('keywords', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			method = 'POST';
			endpoint = `/keywords/export?source=${validateSource(source)}`;

			const keywordList = parseKeywords(keywords);
			body.keywords = keywordList;

			if (additionalFields.cols) {
				body.cols = additionalFields.cols.join(',');
			} else {
				body.cols = 'keyword,volume,cpc,competition,difficulty';
			}

			if (additionalFields.sort) body.sort = additionalFields.sort;
			if (additionalFields.sortOrder) body.sort_order = additionalFields.sortOrder;
			break;
		}

		case 'getSimilar': {
			const source = this.getNodeParameter('source', index) as string;
			const keyword = this.getNodeParameter('keyword', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			if (!keyword || keyword.trim() === '') throw new Error('Keyword cannot be empty');

			endpoint = '/keywords/similar';
			params.source = validateSource(source);
			params.keyword = keyword.trim();

			// ── Pagination & sorting ──────────────────────────────────────────
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.sortOrder) params.sort_order = additionalFields.sortOrder;
			if (additionalFields.historyTrend !== undefined) {
				params.history_trend = additionalFields.historyTrend;
			}

			// ── Volume ────────────────────────────────────────────────────────
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;

			// ── Difficulty ────────────────────────────────────────────────────
			if (additionalFields.difficultyFrom) {
				params['filter[difficulty][from]'] = additionalFields.difficultyFrom;
			}
			if (additionalFields.difficultyTo) {
				params['filter[difficulty][to]'] = additionalFields.difficultyTo;
			}

			// ── CPC ───────────────────────────────────────────────────────────
			if (additionalFields.cpcFrom) params['filter[cpc][from]'] = additionalFields.cpcFrom;
			if (additionalFields.cpcTo) params['filter[cpc][to]'] = additionalFields.cpcTo;

			// ── Competition ───────────────────────────────────────────────────
			if (additionalFields.competitionFrom) {
				params['filter[competition][from]'] = additionalFields.competitionFrom;
			}
			if (additionalFields.competitionTo) {
				params['filter[competition][to]'] = additionalFields.competitionTo;
			}

			// ── Keyword word count ────────────────────────────────────────────
			if (additionalFields.keywordCountFrom) {
				params['filter[keyword_count][from]'] = additionalFields.keywordCountFrom;
			}
			if (additionalFields.keywordCountTo) {
				params['filter[keyword_count][to]'] = additionalFields.keywordCountTo;
			}

			// ── Character count ───────────────────────────────────────────────
			if (additionalFields.charactersCountFrom) {
				params['filter[characters_count][from]'] = additionalFields.charactersCountFrom;
			}
			if (additionalFields.charactersCountTo) {
				params['filter[characters_count][to]'] = additionalFields.charactersCountTo;
			}

			// ── SERP features ─────────────────────────────────────────────────
			if (additionalFields.serpFeatures) {
				params['filter[serp_features]'] = additionalFields.serpFeatures;
			}

			// ── Search intents ────────────────────────────────────────────────
			if (additionalFields.intents && additionalFields.intents.length > 0) {
				params['filter[intents]'] = additionalFields.intents.join(',');
			}

			// ── Include / exclude keyword patterns ────────────────────────────
			if (additionalFields.multiKeywordIncluded) {
				params['filter[multi_keyword_included]'] = JSON.stringify(
					buildMultiKeywordFilter(additionalFields.multiKeywordIncluded),
				);
			}
			if (additionalFields.multiKeywordExcluded) {
				params['filter[multi_keyword_excluded]'] = JSON.stringify(
					buildMultiKeywordFilter(additionalFields.multiKeywordExcluded),
				);
			}
			break;
		}

		case 'getRelated': {
			const source = this.getNodeParameter('source', index) as string;
			const keyword = this.getNodeParameter('keyword', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			if (!keyword || keyword.trim() === '') throw new Error('Keyword cannot be empty');

			endpoint = '/keywords/related';
			params.source = validateSource(source);
			params.keyword = keyword.trim();

			// ── Pagination & sorting ──────────────────────────────────────────
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.sortOrder) params.sort_order = additionalFields.sortOrder;
			if (additionalFields.historyTrend !== undefined) {
				params.history_trend = additionalFields.historyTrend;
			}

			// ── Volume ────────────────────────────────────────────────────────
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;

			// ── Difficulty ────────────────────────────────────────────────────
			if (additionalFields.difficultyFrom) {
				params['filter[difficulty][from]'] = additionalFields.difficultyFrom;
			}
			if (additionalFields.difficultyTo) {
				params['filter[difficulty][to]'] = additionalFields.difficultyTo;
			}

			// ── CPC ───────────────────────────────────────────────────────────
			if (additionalFields.cpcFrom) params['filter[cpc][from]'] = additionalFields.cpcFrom;
			if (additionalFields.cpcTo) params['filter[cpc][to]'] = additionalFields.cpcTo;

			// ── Competition ───────────────────────────────────────────────────
			if (additionalFields.competitionFrom) {
				params['filter[competition][from]'] = additionalFields.competitionFrom;
			}
			if (additionalFields.competitionTo) {
				params['filter[competition][to]'] = additionalFields.competitionTo;
			}

			// ── Keyword word count ────────────────────────────────────────────
			if (additionalFields.keywordCountFrom) {
				params['filter[keyword_count][from]'] = additionalFields.keywordCountFrom;
			}
			if (additionalFields.keywordCountTo) {
				params['filter[keyword_count][to]'] = additionalFields.keywordCountTo;
			}

			// ── Character count ───────────────────────────────────────────────
			if (additionalFields.charactersCountFrom) {
				params['filter[characters_count][from]'] = additionalFields.charactersCountFrom;
			}
			if (additionalFields.charactersCountTo) {
				params['filter[characters_count][to]'] = additionalFields.charactersCountTo;
			}

			// ── SERP features ─────────────────────────────────────────────────
			if (additionalFields.serpFeatures) {
				params['filter[serp_features]'] = additionalFields.serpFeatures;
			}

			// ── Search intents ────────────────────────────────────────────────
			if (additionalFields.intents && additionalFields.intents.length > 0) {
				params['filter[intents]'] = additionalFields.intents.join(',');
			}

			// ── Include / exclude keyword patterns ────────────────────────────
			if (additionalFields.multiKeywordIncluded) {
				params['filter[multi_keyword_included]'] = JSON.stringify(
					buildMultiKeywordFilter(additionalFields.multiKeywordIncluded),
				);
			}
			if (additionalFields.multiKeywordExcluded) {
				params['filter[multi_keyword_excluded]'] = JSON.stringify(
					buildMultiKeywordFilter(additionalFields.multiKeywordExcluded),
				);
			}
			break;
		}

		case 'getQuestions': {
			const source = this.getNodeParameter('source', index) as string;
			const keyword = this.getNodeParameter('keyword', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			if (!keyword || keyword.trim() === '') throw new Error('Keyword cannot be empty');

			endpoint = '/keywords/questions';
			params.source = validateSource(source);
			params.keyword = keyword.trim();

			// ── Pagination & sorting ──────────────────────────────────────────
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.sortOrder) params.sort_order = additionalFields.sortOrder;
			if (additionalFields.historyTrend !== undefined) {
				params.history_trend = additionalFields.historyTrend;
			}

			// ── Volume ────────────────────────────────────────────────────────
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;

			// ── Difficulty ────────────────────────────────────────────────────
			if (additionalFields.difficultyFrom) {
				params['filter[difficulty][from]'] = additionalFields.difficultyFrom;
			}
			if (additionalFields.difficultyTo) {
				params['filter[difficulty][to]'] = additionalFields.difficultyTo;
			}

			// ── CPC ───────────────────────────────────────────────────────────
			if (additionalFields.cpcFrom) params['filter[cpc][from]'] = additionalFields.cpcFrom;
			if (additionalFields.cpcTo) params['filter[cpc][to]'] = additionalFields.cpcTo;

			// ── Competition ───────────────────────────────────────────────────
			if (additionalFields.competitionFrom) {
				params['filter[competition][from]'] = additionalFields.competitionFrom;
			}
			if (additionalFields.competitionTo) {
				params['filter[competition][to]'] = additionalFields.competitionTo;
			}

			// ── Keyword word count ────────────────────────────────────────────
			if (additionalFields.keywordCountFrom) {
				params['filter[keyword_count][from]'] = additionalFields.keywordCountFrom;
			}
			if (additionalFields.keywordCountTo) {
				params['filter[keyword_count][to]'] = additionalFields.keywordCountTo;
			}

			// ── Character count ───────────────────────────────────────────────
			if (additionalFields.charactersCountFrom) {
				params['filter[characters_count][from]'] = additionalFields.charactersCountFrom;
			}
			if (additionalFields.charactersCountTo) {
				params['filter[characters_count][to]'] = additionalFields.charactersCountTo;
			}

			// ── SERP features ─────────────────────────────────────────────────
			if (additionalFields.serpFeatures) {
				params['filter[serp_features]'] = additionalFields.serpFeatures;
			}

			// ── Search intents ────────────────────────────────────────────────
			if (additionalFields.intents && additionalFields.intents.length > 0) {
				params['filter[intents]'] = additionalFields.intents.join(',');
			}

			// ── Include / exclude keyword patterns ────────────────────────────
			if (additionalFields.multiKeywordIncluded) {
				params['filter[multi_keyword_included]'] = JSON.stringify(
					buildMultiKeywordFilter(additionalFields.multiKeywordIncluded),
				);
			}
			if (additionalFields.multiKeywordExcluded) {
				params['filter[multi_keyword_excluded]'] = JSON.stringify(
					buildMultiKeywordFilter(additionalFields.multiKeywordExcluded),
				);
			}
			break;
		}

		case 'getLongtail': {
			const source = this.getNodeParameter('source', index) as string;
			const keyword = this.getNodeParameter('keyword', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			if (!keyword || keyword.trim() === '') throw new Error('Keyword cannot be empty');

			endpoint = '/keywords/longtail';
			params.source = validateSource(source);
			params.keyword = keyword.trim();

			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			break;
		}

		default:
			throw new Error(`Unknown Keyword Research operation: ${operation}`);
	}

	if (method === 'POST') {
		return await apiRequest.call(this, method, endpoint, body, params, index);
	} else {
		return await apiRequest.call(this, method, endpoint, {}, params, index);
	}
}