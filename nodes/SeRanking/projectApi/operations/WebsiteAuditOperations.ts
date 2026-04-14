import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function WebsiteAuditOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'createAudit': {
			const domain = this.getNodeParameter('domain', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { domain };
			if (additionalFields.title) body.title = additionalFields.title;
			if (additionalFields.settingsJson) {
				const settings = typeof additionalFields.settingsJson === 'string'
					? JSON.parse(additionalFields.settingsJson)
					: additionalFields.settingsJson;
				body.settings = settings;
			}

			return await apiRequest.call(this, 'POST', '/audit/create', body, {}, index);
		}

		case 'listAudits': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;
			if (additionalFields.search) query.search = additionalFields.search;
			if (additionalFields.dateStart) query.date_start = additionalFields.dateStart;
			if (additionalFields.dateEnd) query.date_end = additionalFields.dateEnd;

			return await apiRequest.call(this, 'GET', '/audit/list', {}, query, index);
		}

		case 'getStatus': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			return await apiRequest.call(this, 'GET', `/audit/${auditId}/`, {}, {}, index);
		}

		case 'getReport': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			return await apiRequest.call(this, 'GET', `/audit/${auditId}/report`, {}, {}, index);
		}

		case 'getPages': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			return await apiRequest.call(this, 'GET', `/audit/${auditId}/pages`, {}, query, index);
		}

		case 'getPagesByIssue': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const code = this.getNodeParameter('issueCode', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { code };
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			return await apiRequest.call(this, 'GET', `/audit/${auditId}/pages/issues`, {}, query, index);
		}

		case 'getIssues': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const query: any = {};
			const urlId = this.getNodeParameter('urlId', index, 0) as number;
			const pageUrl = this.getNodeParameter('pageUrl', index, '') as string;
			if (urlId) query.url_id = urlId;
			if (pageUrl) query.url = pageUrl;
			return await apiRequest.call(this, 'GET', `/audit/${auditId}/issues`, {}, query, index);
		}

		case 'getLinks': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.pageType) query.page_type = additionalFields.pageType;
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;
			if (additionalFields.filterJson) {
				const filter = typeof additionalFields.filterJson === 'string'
					? JSON.parse(additionalFields.filterJson)
					: additionalFields.filterJson;
				if (Array.isArray(filter) && filter.length > 0) {
					filter.forEach((f: any, i: number) => {
						if (f.param) query[`filter[${i}][param]`] = f.param;
						if (f.value) query[`filter[${i}][value]`] = f.value;
						if (f.type) query[`filter[${i}][type]`] = f.type;
					});
				}
			}

			return await apiRequest.call(this, 'GET', `/audit/${auditId}/links`, {}, query, index);
		}

		case 'getHistory': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const date = this.getNodeParameter('historyDate', index) as string;
			return await apiRequest.call(this, 'GET', `/audit/${auditId}/history`, {}, { date }, index);
		}

		case 'updateTitle': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const title = this.getNodeParameter('newTitle', index) as string;
			await apiRequest.call(this, 'POST', `/audit/${auditId}/update`, { title }, {}, index);
			return { success: true, audit_id: auditId };
		}

		case 'deleteAudit': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			await apiRequest.call(this, 'POST', `/audit/${auditId}/delete`, {}, {}, index);
			return { success: true, deleted: true, audit_id: auditId };
		}

		case 'recheckAudit': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			return await apiRequest.call(this, 'POST', `/audit/${auditId}/recheck`, {}, {}, index);
		}

		default:
			throw new Error(`Unknown Website Audit operation: ${operation}`);
	}
}
