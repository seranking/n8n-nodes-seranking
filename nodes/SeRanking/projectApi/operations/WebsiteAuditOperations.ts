import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// Project-side audit under unified docs: /project-management/audits/...
// audit_id moves from path to query string.
// Methods: updateTitle now PATCH (was POST /audit/{id}/update), deleteAudit now DELETE (was POST /audit/{id}/delete),
// getStatus → /audits/status, recheck → POST /audits/recheck, getReport → /audits/report.

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

			return await apiRequest.call(this, 'POST', '/project-management/audits', body, {}, index);
		}

		case 'listAudits': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;
			if (additionalFields.search) query.search = additionalFields.search;
			if (additionalFields.dateStart) query.date_start = additionalFields.dateStart;
			if (additionalFields.dateEnd) query.date_end = additionalFields.dateEnd;

			return await apiRequest.call(this, 'GET', '/project-management/audits', {}, query, index);
		}

		case 'getStatus': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/audits/status', {}, { audit_id: auditId }, index);
		}

		case 'getReport': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/audits/report', {}, { audit_id: auditId }, index);
		}

		case 'getPages': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { audit_id: auditId };
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			return await apiRequest.call(this, 'GET', '/project-management/audits/pages', {}, query, index);
		}

		case 'getPagesByIssue': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const code = this.getNodeParameter('issueCode', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { audit_id: auditId, code };
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			return await apiRequest.call(this, 'GET', '/project-management/audits/issue-pages', {}, query, index);
		}

		case 'getIssues': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const query: any = { audit_id: auditId };
			const urlId = this.getNodeParameter('urlId', index, 0) as number;
			const pageUrl = this.getNodeParameter('pageUrl', index, '') as string;
			if (urlId) query.url_id = urlId;
			if (pageUrl) query.url = pageUrl;
			return await apiRequest.call(this, 'GET', '/project-management/audits/issues', {}, query, index);
		}

		case 'getLinks': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { audit_id: auditId };
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

			return await apiRequest.call(this, 'GET', '/project-management/audits/found-links', {}, query, index);
		}

		case 'getHistory': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const date = this.getNodeParameter('historyDate', index) as string;
			return await apiRequest.call(this, 'GET', '/project-management/audits/history', {}, { audit_id: auditId, date }, index);
		}

		case 'updateTitle': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const title = this.getNodeParameter('newTitle', index) as string;
			await apiRequest.call(this, 'PATCH', `/project-management/audits?audit_id=${auditId}`, { title }, {}, index);
			return { success: true, audit_id: auditId };
		}

		case 'deleteAudit': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			// Method change: was POST /audit/{id}/delete → now DELETE /audits?audit_id=
			await apiRequest.call(this, 'DELETE', '/project-management/audits', {}, { audit_id: auditId }, index);
			return { success: true, deleted: true, audit_id: auditId };
		}

		case 'recheckAudit': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			return await apiRequest.call(this, 'POST', '/project-management/audits/recheck', {}, { audit_id: auditId }, index);
		}

		// ─── NEW in v2.0.0 (unified docs) ──────────────────────────────────
		case 'getAuditSettings': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/audits/settings', {}, { audit_id: auditId }, index);
		}

		case 'updateAuditSettings': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const settingsJson = this.getNodeParameter('settingsJson', index) as string;
			const settings = typeof settingsJson === 'string' ? JSON.parse(settingsJson) : settingsJson;
			await apiRequest.call(this, 'PATCH', `/project-management/audits/settings?audit_id=${auditId}`, { settings }, {}, index);
			return { success: true, audit_id: auditId };
		}

		case 'resetAuditSettings': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			await apiRequest.call(this, 'POST', '/project-management/audits/settings/reset', {}, { audit_id: auditId }, index);
			return { success: true, reset: true, audit_id: auditId };
		}

		case 'listAuditSitemaps': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/audits/sitemaps', {}, { audit_id: auditId }, index);
		}

		case 'addAuditSitemap': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const url = this.getNodeParameter('sitemapUrl', index) as string;
			return await apiRequest.call(this, 'POST', '/project-management/audits/sitemaps', { url }, { audit_id: auditId }, index);
		}

		case 'deleteAuditSitemap': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const sitemapId = this.getNodeParameter('sitemapId', index) as number;
			await apiRequest.call(this, 'DELETE', '/project-management/audits/sitemaps', {}, { audit_id: auditId, sitemap_id: sitemapId }, index);
			return { success: true, deleted: true, sitemap_id: sitemapId };
		}

		case 'listAuditSourcePages': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/audits/source-pages', {}, { audit_id: auditId }, index);
		}

		case 'deleteAuditSourcePages': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const listId = this.getNodeParameter('sourcePagesListId', index) as string;
			await apiRequest.call(this, 'DELETE', '/project-management/audits/source-pages', {}, { audit_id: auditId, list_id: listId }, index);
			return { success: true, deleted: true, list_id: listId };
		}

		case 'addAuditSourcePages': {
			const auditId = this.getNodeParameter('auditId', index) as number;
			const binaryPropertyName = this.getNodeParameter('binaryPropertyName', index) as string;
			const binaryData = this.helpers.assertBinaryData(index, binaryPropertyName);
			const buffer = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);

			// multipart/form-data: form field `file` = UTF-8 .txt, one URL per line. Returns {added:N}.
			// Inline query string for audit_id (matches the node's defensive mutation style).
			return await apiRequest.call(
				this,
				'POST',
				`/project-management/audits/source-pages?audit_id=${auditId}`,
				{
					_fileUpload: {
						fieldName: 'file',
						filename: binaryData.fileName || 'source-pages.txt',
						contentType: 'text/plain',
						data: buffer,
					},
				},
				{},
				index,
			);
		}

		default:
			throw new Error(`Unknown Website Audit operation: ${operation}`);
	}
}
