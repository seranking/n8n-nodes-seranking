import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../utils/apiRequest';

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
			endpoint = `/keywords/export?source=${source}`;
			
			// Parse keywords (comma or newline separated)
			const keywordList = keywords
				.split(/[,\n]/)
				.map(k => k.trim())
				.filter(k => k.length > 0);
			
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
			
			endpoint = '/keywords/similar';
			params.source = source;
			params.keyword = keyword;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.sortOrder) params.sort_order = additionalFields.sortOrder;
			if (additionalFields.historyTrend !== undefined) {
				params.history_trend = additionalFields.historyTrend;
			}
			
			// Filters
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;
			if (additionalFields.difficultyFrom) params['filter[difficulty][from]'] = additionalFields.difficultyFrom;
			if (additionalFields.difficultyTo) params['filter[difficulty][to]'] = additionalFields.difficultyTo;
			if (additionalFields.cpcFrom) params['filter[cpc][from]'] = additionalFields.cpcFrom;
			if (additionalFields.cpcTo) params['filter[cpc][to]'] = additionalFields.cpcTo;
			if (additionalFields.competitionFrom) params['filter[competition][from]'] = additionalFields.competitionFrom;
			if (additionalFields.competitionTo) params['filter[competition][to]'] = additionalFields.competitionTo;
			break;
		}

		case 'getRelated': {
			const source = this.getNodeParameter('source', index) as string;
			const keyword = this.getNodeParameter('keyword', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/keywords/related';
			params.source = source;
			params.keyword = keyword;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.sortOrder) params.sort_order = additionalFields.sortOrder;
			if (additionalFields.historyTrend !== undefined) {
				params.history_trend = additionalFields.historyTrend;
			}
			
			// Filters (same as similar)
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;
			if (additionalFields.difficultyFrom) params['filter[difficulty][from]'] = additionalFields.difficultyFrom;
			if (additionalFields.difficultyTo) params['filter[difficulty][to]'] = additionalFields.difficultyTo;
			if (additionalFields.cpcFrom) params['filter[cpc][from]'] = additionalFields.cpcFrom;
			if (additionalFields.cpcTo) params['filter[cpc][to]'] = additionalFields.cpcTo;
			if (additionalFields.competitionFrom) params['filter[competition][from]'] = additionalFields.competitionFrom;
			if (additionalFields.competitionTo) params['filter[competition][to]'] = additionalFields.competitionTo;
			break;
		}

		case 'getQuestions': {
			const source = this.getNodeParameter('source', index) as string;
			const keyword = this.getNodeParameter('keyword', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/keywords/questions';
			params.source = source;
			params.keyword = keyword;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.sortOrder) params.sort_order = additionalFields.sortOrder;
			if (additionalFields.historyTrend !== undefined) {
				params.history_trend = additionalFields.historyTrend;
			}
			
			// Filters
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;
			if (additionalFields.difficultyFrom) params['filter[difficulty][from]'] = additionalFields.difficultyFrom;
			if (additionalFields.difficultyTo) params['filter[difficulty][to]'] = additionalFields.difficultyTo;
			break;
		}

		case 'getLongtail': {
			const source = this.getNodeParameter('source', index) as string;
			const keyword = this.getNodeParameter('keyword', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/keywords/longtail';
			params.source = source;
			params.keyword = keyword;
			
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