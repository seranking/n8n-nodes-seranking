import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';


/**
 * Parse keywords: supports newline or comma-separated input, enforces API limits.
 */
function parseKeywords(input: string): string[] {
	if (!input || input.trim() === '') {
		throw new Error('Keywords cannot be empty');
	}
	const keywords = input
		.split(/[,\n]/)
		.map((k) => k.trim())
		.filter((k) => k.length > 0);

	if (keywords.length === 0) throw new Error('Provide at least one keyword');
	if (keywords.length > 1000) throw new Error('Maximum 1000 keywords per request');
	const tooLong = keywords.find((k) => k.length > 255);
	if (tooLong) throw new Error('Each keyword must be 255 characters or fewer');
	return keywords;
}

/**
 * Simple task id parser (comma/newline separated)
 */
function parseTaskIds(input: string): string[] {
	if (!input || input.trim() === '') throw new Error('Task ID(s) required');
	const items = input
		.split(/[,\n]/)
		.map((i) => i.trim())
		.filter((i) => i.length > 0);
	if (items.length === 0) throw new Error('Provide at least one task ID');
	return items;
}

export async function SerpClassicOperations(this: IExecuteFunctions, index: number): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	let method = 'GET';
	let endpoint = '';
	const params: any = {};
	const body: any = {};

	switch (operation) {
		// Add Tasks (POST /v1/serp/classic/tasks)
		case 'addTasks': {
			method = 'POST';
			endpoint = '/serp/classic/tasks';

			const searchEngine = this.getNodeParameter('searchEngine', index) as string;
			const device = this.getNodeParameter('device', index) as string;
			const languageCode = this.getNodeParameter('languageCode', index) as string;
			const locationId = this.getNodeParameter('locationId', index) as number;
			const keywordsInput = this.getNodeParameter('keywords', index) as string;
			const tag = this.getNodeParameter('tag', index, '') as string;
			const pingbackUrl = this.getNodeParameter('pingbackUrl', index, '') as string;  // Pingback (webhook)

			const keywords = parseKeywords(keywordsInput);

			// Build request body per docs: search_engine, device, language_code, location_id, query[], tag
			body.search_engine = searchEngine;
			body.device = device;
			body.language_code = languageCode;

			if (typeof locationId !== 'number' || Number.isNaN(locationId)) {
				throw new Error('locationId must be a valid integer');
			}
			body.location_id = Math.floor(locationId);

			body.query = keywords;

			if (tag && tag.trim() !== '') body.tag = tag;
			if (pingbackUrl && pingbackUrl.trim() !== '') body.pingback_url = pingbackUrl;  // Pingback (webhook)

			// Send request
			const response = await apiRequest.call(this, method, endpoint, body, params, index);

			// According to docs, successful response is an array of task IDs.
			// Return a friendly mapping for n8n: [{ task_id: 62 }, ...]
			if (Array.isArray(response)) {
				return response.map((id: any) => ({ task_id: id }));
			}
			return response;
		}

		// Get Results (standard): GET /v1/serp/classic/tasks?task_id=...
		case 'getResults': {
			endpoint = '/serp/classic/tasks';
			method = 'GET';

			const taskId = this.getNodeParameter('taskId', index) as string;
			if (!taskId) throw new Error('taskId is required');

			params.task_id = taskId;

			const response = await apiRequest.call(this, method, endpoint, {}, params, index);

			// If still processing, API returns { status: "processing" }
			if (response && response.status === 'processing') {
				return { status: 'processing', raw: response };
			}

			// If completed, API returns request_metadata, summary, items[]
			// Return as-is so downstream nodes can consume full structure
			return response;
		}

		// List Tasks (GET /v1/serp/classic/tasks) — no params required (returns tasks from last 24h)
		case 'listTasks': {
			endpoint = '/serp/classic/tasks';
			method = 'GET';

			// Optional UI filter support (limit) — API does not require it but we can use local paging
			const filters = this.getNodeParameter('listFilters', index, {}) as any;
			if (filters.limit) params.limit = filters.limit;

			const response = await apiRequest.call(this, method, endpoint, {}, params, index);

			// API returns an array of task objects — pass it through
			return response;
		}

		// Get Advanced Results (GET /v1/serp/classic/tasks/results_advanced?task_id=...)
		case 'getAdvancedResults': {
			endpoint = '/serp/classic/tasks/results_advanced';
			method = 'GET';

			// The docs show a single task_id for advanced results; allow one or many (iterate if many)
			const taskIdInput = this.getNodeParameter('taskId', index) as string;
			const taskIds = parseTaskIds(taskIdInput);

			// If multiple provided, call per task id and aggregate results
			const aggregated: any[] = [];
			for (const tid of taskIds) {
				const localParams = { task_id: tid };
				const resp = await apiRequest.call(this, method, endpoint, {}, localParams, index);

				// If processing state returned, include that
				if (resp && resp.status === 'processing') {
					aggregated.push({ task_id: tid, status: 'processing' });
					continue;
				}

				// Completed: include the full returned object; attach task_id for clarity if missing
				if (resp && resp.request_metadata) {
					aggregated.push({ task_id: tid, ...resp });
				} else {
					// Unexpected shape: push raw response
					aggregated.push({ task_id: tid, raw: resp });
				}
			}

			return aggregated;
		}

		// Get Locations (GET /v1/serp/classic/locations)
		case 'getLocations': {
			endpoint = '/serp/classic/locations';
			method = 'GET';

			const countryCode = this.getNodeParameter('countryCode', index, '') as string;
			const q = this.getNodeParameter('q', index, '') as string;

			if (countryCode && countryCode.trim() !== '') params.country_code = countryCode;
			if (q && q.trim() !== '') params.q = q;

			const response = await apiRequest.call(this, method, endpoint, {}, params, index);

			// API returns { data: [...] } — return data if present else raw response
			if (response && response.data) return response.data;
			return response;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}
