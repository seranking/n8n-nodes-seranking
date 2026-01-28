import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';
import { validateDomain, validateSource } from '../../utils/validators';

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
			
			endpoint = '/ai-search/overview/by-engine/time-series';
			params.target = validateDomain(domain);
			params.engine = engine;
			params.source = validateSource(source);
			params.scope = scope;
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
			if (!primaryBrand || primaryBrand.trim() === '') {
				throw new Error('Primary brand name is required');
			}

			// Build competitors array from fixedCollection
			const competitors: Array<{ target: string; brand: string }> = [];
			if (competitorsData.competitorValues && Array.isArray(competitorsData.competitorValues)) {
				for (const comp of competitorsData.competitorValues) {
					if (comp.target && comp.brand) {
						competitors.push({
							target: validateDomain(comp.target),
							brand: comp.brand.trim(),
						});
					}
				}
			}

			// Build request body per API docs
			const body = {
				primary: {
					target: validateDomain(primaryTarget),
					brand: primaryBrand.trim(),
				},
				competitors,
				scope,
				source: validateSource(source),
				engines,
			};

			// This is a POST request
			return await apiRequest.call(this, 'POST', '/ai-search/overview/leaderboard', body, {}, index);
		}

		default:
			throw new Error(`Unknown AI Search operation: ${operation}`);
	}

	return await apiRequest.call(this, 'GET', endpoint, {}, params, index);
}