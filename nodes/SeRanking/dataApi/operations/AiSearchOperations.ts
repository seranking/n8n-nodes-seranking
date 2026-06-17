import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';
import { validateDomain, validateSource } from '../../utils/validators';

// NEW: helper for multi_keyword filters
function buildMultiKeywordFilter(csv: string): Array<Array<{ type: string; value: string }>> {
	return csv
		.split(',')
		.map((w) => w.trim())
		.filter(Boolean)
		.map((word) => [{ type: 'contains', value: word }]);
}

export async function AiSearchOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	let endpoint = '';
	const params: any = {};

	switch (operation) {
		case 'getOverview': {
			const domain = this.getNodeParameter('domain', index) as string;
			const engine = this.getNodeParameter('engine', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const scope = this.getNodeParameter('scope', index, 'base_domain') as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any; 

			endpoint = '/ai-search/overview/by-engine/time-series';
			params.target = validateDomain(domain);
			params.engine = engine;
			params.source = validateSource(source);
			params.scope = scope;
			if (additionalFields.brand) params.brand = additionalFields.brand; 
			break;
		}

		case 'discoverBrand': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const scope = this.getNodeParameter('scope', index, 'base_domain') as string;

			endpoint = '/ai-search/discover-brand';
			params.target = validateDomain(domain);
			params.source = validateSource(source);
			params.scope = scope;
			break;
		}

		case 'getPromptsByTarget': {
			const domain = this.getNodeParameter('domain', index) as string;
			const engine = this.getNodeParameter('engine', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const scope = this.getNodeParameter('scope', index, 'base_domain') as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			endpoint = '/ai-search/prompts-by-target';
			params.target = validateDomain(domain);
			params.engine = engine;
			params.source = validateSource(source);
			params.scope = scope;

			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.sortOrder) params.sort_order = additionalFields.sortOrder;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			// NEW: filter params
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;
			if (additionalFields.keywordCountFrom) params['filter[keyword_count][from]'] = additionalFields.keywordCountFrom;
			if (additionalFields.keywordCountTo) params['filter[keyword_count][to]'] = additionalFields.keywordCountTo;
			if (additionalFields.charactersCountFrom) params['filter[characters_count][from]'] = additionalFields.charactersCountFrom;
			if (additionalFields.charactersCountTo) params['filter[characters_count][to]'] = additionalFields.charactersCountTo;
			if (additionalFields.multiKeywordIncluded) {
				params['filter[multi_keyword_included]'] = JSON.stringify(buildMultiKeywordFilter(additionalFields.multiKeywordIncluded));
			}
			if (additionalFields.multiKeywordExcluded) {
				params['filter[multi_keyword_excluded]'] = JSON.stringify(buildMultiKeywordFilter(additionalFields.multiKeywordExcluded));
			}
			break;
		}

		case 'getPromptsByBrand': {
			const brandName = this.getNodeParameter('brandName', index) as string;
			const engine = this.getNodeParameter('engine', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			if (!brandName || brandName.trim() === '') {
				throw new Error('Brand name cannot be empty');
			}

			endpoint = '/ai-search/prompts-by-brand';
			params.brand = brandName.trim();
			params.engine = engine;
			params.source = validateSource(source);

			if (additionalFields.sort) params.sort = additionalFields.sort;
			if (additionalFields.sortOrder) params.sort_order = additionalFields.sortOrder;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			// NEW: filter params
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;
			if (additionalFields.keywordCountFrom) params['filter[keyword_count][from]'] = additionalFields.keywordCountFrom;
			if (additionalFields.keywordCountTo) params['filter[keyword_count][to]'] = additionalFields.keywordCountTo;
			if (additionalFields.charactersCountFrom) params['filter[characters_count][from]'] = additionalFields.charactersCountFrom;
			if (additionalFields.charactersCountTo) params['filter[characters_count][to]'] = additionalFields.charactersCountTo;
			if (additionalFields.multiKeywordIncluded) {
				params['filter[multi_keyword_included]'] = JSON.stringify(buildMultiKeywordFilter(additionalFields.multiKeywordIncluded));
			}
			if (additionalFields.multiKeywordExcluded) {
				params['filter[multi_keyword_excluded]'] = JSON.stringify(buildMultiKeywordFilter(additionalFields.multiKeywordExcluded));
			}
			break;
		}

		case 'getLeaderboard': {
			const primaryTarget = this.getNodeParameter('primaryTarget', index) as string;
			const primaryBrand = this.getNodeParameter('primaryBrand', index) as string;
			const competitorsData = this.getNodeParameter('competitors', index, {}) as any;
			const scope = this.getNodeParameter('leaderboardScope', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const engines = this.getNodeParameter('engines', index) as string[];

			if (!primaryTarget || primaryTarget.trim() === '') {
				throw new Error('Primary target domain is required');
			}

			const competitors: Array<{ target: string; brand?: string }> = []; // NEW: brand optional
			if (competitorsData.competitorValues && Array.isArray(competitorsData.competitorValues)) {
				for (const comp of competitorsData.competitorValues) {
					if (comp.target) {
						const entry: { target: string; brand?: string } = {
							target: validateDomain(comp.target),
						};
						if (comp.brand) entry.brand = comp.brand.trim(); // NEW: only add brand if provided
						competitors.push(entry);
					}
				}
			}

			const body: any = {
				primary: {
					target: validateDomain(primaryTarget),
				},
				competitors,
				scope,
				source: validateSource(source),
				engines,
			};
			if (primaryBrand) body.primary.brand = primaryBrand.trim(); // NEW: only add brand if provided

			// Leaderboard is a heavy synchronous endpoint (7,500 credits, cross-engine
			// computation). A cold/uncached heavy set can exceed SE Ranking's ~60s gateway
			// cap, which returns a 504. Allow up to 180s client-side, and retry the 504 up
			// to 2x — safe because incomplete requests don't bill and the server caches
			// partial compute, so a retry completes far faster (504 -> ~27s -> sub-second).
			return await apiRequest.call(this, 'POST', '/ai-search/overview/leaderboard', body, {}, index, 180000, 2);
		}

		default:
			throw new Error(`Unknown AI Search operation: ${operation}`);
	}

	return await apiRequest.call(this, 'GET', endpoint, {}, params, index);
}