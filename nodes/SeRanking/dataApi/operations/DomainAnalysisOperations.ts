import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';
import { validateDomain, validateSource } from '../../utils/validators';

export async function DomainAnalysisOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	let endpoint = '';
	const params: any = {};
	const method = 'GET';

	switch (operation) {
		case 'getOverviewDb': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			endpoint = '/domain/overview/db';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.with_subdomains = additionalFields.withSubdomains ? 1 : 0;
			break;
		}

		case 'getOverviewWorldwide': {
			const domain = this.getNodeParameter('domain', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			endpoint = '/domain/overview/worldwide';
			params.domain = validateDomain(domain);

			if (additionalFields.currency) params.currency = additionalFields.currency;
			if (additionalFields.fields) params.fields = additionalFields.fields.join(',');
			if (additionalFields.showZonesList !== undefined) {
				params.show_zones_list = additionalFields.showZonesList ? 1 : 0;
			}

			const response = await apiRequest.call(this, method, endpoint, {}, params, index);

			if (Array.isArray(response)) {
				return response.map(item => ({ ...item, _domain: validateDomain(domain) }));
			} else if (typeof response === 'object' && response !== null) {
				return { ...response, _domain: validateDomain(domain) };
			}
			return response;
		}

		case 'getWorldwideAggregateUrl': {
			const url = this.getNodeParameter('url', index) as string;
			const additionalOptions = this.getNodeParameter('additionalOptions', index, {}) as any;

			if (!url || url.trim() === '') throw new Error('URL cannot be empty');
			if (!url.match(/^https?:\/\//i)) throw new Error('URL must include http:// or https://');

			endpoint = '/domain/overview/worldwide/url';
			params.url = url.trim();

			if (additionalOptions.fields) params.fields = additionalOptions.fields.join(',');
			break;
		}

		case 'getDomainPages': {
			const target = this.getNodeParameter('target', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			// FIX: scope is now inside additionalFields collection (no longer top-level)
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			endpoint = '/domain/pages';
			params.target = validateDomain(target);
			params.source = validateSource(source);
			params.type = type;
			// FIX: read scope from additionalFields, default to 'base_domain'
			params.scope = additionalFields.scope || 'base_domain';

			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.orderField) params.order_field = additionalFields.orderField;
			if (additionalFields.orderType) params.order_type = additionalFields.orderType;

			// FIX: field names updated to camelCase matching the fields definition
			if (additionalFields.filterDomainUrl) {
				params['filter[domain_url]'] = additionalFields.filterDomainUrl;
			}
			if (additionalFields.filterTrafficPercentFrom) {
				params['filter[domain_traffic_percent][from]'] = additionalFields.filterTrafficPercentFrom;
			}
			if (additionalFields.filterTrafficPercentTo) {
				params['filter[domain_traffic_percent][to]'] = additionalFields.filterTrafficPercentTo;
			}
			if (additionalFields.filterKeywordsCountFrom) {
				params['filter[keywords_count][from]'] = additionalFields.filterKeywordsCountFrom;
			}
			if (additionalFields.filterKeywordsCountTo) {
				params['filter[keywords_count][to]'] = additionalFields.filterKeywordsCountTo;
			}
			if (additionalFields.filterTrafficSumFrom) {
				params['filter[traffic_sum][from]'] = additionalFields.filterTrafficSumFrom;
			}
			if (additionalFields.filterTrafficSumTo) {
				params['filter[traffic_sum][to]'] = additionalFields.filterTrafficSumTo;
			}
			if (additionalFields.filterPriceSumFrom) {
				params['filter[price_sum][from]'] = additionalFields.filterPriceSumFrom;
			}
			if (additionalFields.filterPriceSumTo) {
				params['filter[price_sum][to]'] = additionalFields.filterPriceSumTo;
			}
			break;
		}

		case 'getDomainSubdomains': {
			const target = this.getNodeParameter('target', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			// FIX: scope is now a top-level required field for subdomains
			const scope = this.getNodeParameter('scope', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			// FIX: collection renamed from 'additionalOptions' to 'additionalFields'
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			endpoint = '/domain/subdomains';
			params.target = validateDomain(target);
			params.source = validateSource(source);
			params.type = type;
			params.scope = scope;

			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.orderField) params.order_field = additionalFields.orderField;
			if (additionalFields.orderType) params.order_type = additionalFields.orderType;

			// FIX: camelCase field names matching the updated fields definition
			if (additionalFields.filterDomainUrl) {
				params['filter[domain_url]'] = additionalFields.filterDomainUrl;
			}
			if (additionalFields.filterTrafficPercentFrom) {
				params['filter[domain_traffic_percent][from]'] = additionalFields.filterTrafficPercentFrom;
			}
			if (additionalFields.filterTrafficPercentTo) {
				params['filter[domain_traffic_percent][to]'] = additionalFields.filterTrafficPercentTo;
			}
			if (additionalFields.filterKeywordsCountFrom) {
				params['filter[keywords_count][from]'] = additionalFields.filterKeywordsCountFrom;
			}
			if (additionalFields.filterKeywordsCountTo) {
				params['filter[keywords_count][to]'] = additionalFields.filterKeywordsCountTo;
			}
			if (additionalFields.filterTrafficSumFrom) {
				params['filter[traffic_sum][from]'] = additionalFields.filterTrafficSumFrom;
			}
			if (additionalFields.filterTrafficSumTo) {
				params['filter[traffic_sum][to]'] = additionalFields.filterTrafficSumTo;
			}
			if (additionalFields.filterPriceSumFrom) {
				params['filter[price_sum][from]'] = additionalFields.filterPriceSumFrom;
			}
			if (additionalFields.filterPriceSumTo) {
				params['filter[price_sum][to]'] = additionalFields.filterPriceSumTo;
			}
			break;
		}

		case 'getOverviewHistory': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index, 'organic') as string;

			endpoint = '/domain/overview/history';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.type = type;
			break;
		}

		case 'getKeywords': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			endpoint = '/domain/keywords';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.type = type;

			// ── Pagination & display ──────────────────────────────────────────
			if (additionalFields.page) params.page = additionalFields.page;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.withSubdomains !== undefined) {
				params.with_subdomains = additionalFields.withSubdomains ? 1 : 0;
			}
			if (additionalFields.cols) params.cols = additionalFields.cols;

			// ── Sorting ───────────────────────────────────────────────────────
			if (additionalFields.orderField) params.order_field = additionalFields.orderField;
			if (additionalFields.orderType) params.order_type = additionalFields.orderType;

			// ── Position change ───────────────────────────────────────────────
			if (additionalFields.posChange) params.pos_change = additionalFields.posChange;

			// ── Volume ────────────────────────────────────────────────────────
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;

			// ── Traffic ───────────────────────────────────────────────────────
			if (additionalFields.trafficFrom) params['filter[traffic][from]'] = additionalFields.trafficFrom;
			if (additionalFields.trafficTo) params['filter[traffic][to]'] = additionalFields.trafficTo;

			// ── Traffic percent ───────────────────────────────────────────────
			if (additionalFields.trafficPercentFrom) {
				params['filter[traffic_percent][from]'] = additionalFields.trafficPercentFrom;
			}
			if (additionalFields.trafficPercentTo) {
				params['filter[traffic_percent][to]'] = additionalFields.trafficPercentTo;
			}

			// ── Position ──────────────────────────────────────────────────────
			if (additionalFields.positionFrom) params['filter[position][from]'] = additionalFields.positionFrom;
			if (additionalFields.positionTo) params['filter[position][to]'] = additionalFields.positionTo;

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

			// ── CPC ───────────────────────────────────────────────────────────
			if (additionalFields.cpcFrom) params['filter[cpc][from]'] = additionalFields.cpcFrom;
			if (additionalFields.cpcTo) params['filter[cpc][to]'] = additionalFields.cpcTo;

			// ── Price ─────────────────────────────────────────────────────────
			if (additionalFields.priceFrom) params['filter[price][from]'] = additionalFields.priceFrom;
			if (additionalFields.priceTo) params['filter[price][to]'] = additionalFields.priceTo;

			// ── Competition ───────────────────────────────────────────────────
			if (additionalFields.competitionFrom) {
				params['filter[competition][from]'] = additionalFields.competitionFrom;
			}
			if (additionalFields.competitionTo) {
				params['filter[competition][to]'] = additionalFields.competitionTo;
			}

			// ── Difficulty ────────────────────────────────────────────────────
			if (additionalFields.difficultyFrom) {
				params['filter[difficulty][from]'] = additionalFields.difficultyFrom;
			}
			if (additionalFields.difficultyTo) {
				params['filter[difficulty][to]'] = additionalFields.difficultyTo;
			}

			// ── SERP features ─────────────────────────────────────────────────
			if (additionalFields.serpFeatures) {
				params['filter[serp_features]'] = additionalFields.serpFeatures;
			}

			// ── Search intents ────────────────────────────────────────────────
			if (additionalFields.intents && additionalFields.intents.length > 0) {
				params['filter[intents]'] = additionalFields.intents.join(',');
			}
			break;
		}

		case 'getKeywordsComparison': {
			const domain = this.getNodeParameter('domain', index) as string;
			const compareDomain = this.getNodeParameter('compareDomain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			endpoint = '/domain/keywords/comparison';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.compare = validateDomain(compareDomain);
			params.type = type;

			if (additionalFields.page) params.page = additionalFields.page;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.cols) params.cols = additionalFields.cols;
			if (additionalFields.orderField) params.order_field = additionalFields.orderField;
			if (additionalFields.orderType) params.order_type = additionalFields.orderType;
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;
			break;
		}

		case 'getCompetitors': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			endpoint = '/domain/competitors';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.type = type;

			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.stats !== undefined) {
				params.stats = additionalFields.stats ? 1 : 0;
			}
			if (additionalFields.excludeLeaders !== undefined) {
				params.exclude_leaders = additionalFields.excludeLeaders ? 1 : 0;
			}
			break;
		}

		case 'getAdsForKeyword': {
			const keyword = this.getNodeParameter('keyword', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			if (!keyword || keyword.trim() === '') throw new Error('Keyword cannot be empty');

			endpoint = '/domain/ads';
			params.source = validateSource(source);
			params.keyword = keyword.trim();

			if (additionalFields.from) params.from = additionalFields.from;
			if (additionalFields.to) params.to = additionalFields.to;
			if (additionalFields.page) params.page = additionalFields.page;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			break;
		}

		case 'getAdsForDomain': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			endpoint = '/domain/ads';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);

			if (additionalFields.from) params.from = additionalFields.from;
			if (additionalFields.to) params.to = additionalFields.to;
			if (additionalFields.page) params.page = additionalFields.page;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			break;
		}

		default:
			throw new Error(`Unknown Domain Analysis operation: ${operation}`);
	}

	return await apiRequest.call(this, method, endpoint, {}, params, index);
}