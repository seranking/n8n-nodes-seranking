import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// URL Tags under unified docs: /project-management/sites/url-tags
// site_id / tag_id move from path to query string.

export async function UrlTagsOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'listTags': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/sites/url-tags', {}, { site_id: siteId }, index);
		}

		case 'addTag': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const name = this.getNodeParameter('tagName', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { name };

			if (additionalFields.urls) {
				body.urls = additionalFields.urls.split(',').map((u: string) => u.trim());
			}
			if (additionalFields.domains) {
				body.domains = additionalFields.domains.split(',').map((d: string) => d.trim());
			}

			return await apiRequest.call(this, 'POST', '/project-management/sites/url-tags', body, { site_id: siteId }, index);
		}

		case 'updateAssignment': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const tagIdsStr = this.getNodeParameter('tagIds', index) as string;
			const tagIds = tagIdsStr.split(',').map((id) => parseInt(id.trim(), 10));
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { tag_ids: tagIds };

			if (additionalFields.urls) {
				body.urls = additionalFields.urls.split(',').map((u: string) => u.trim());
			}
			if (additionalFields.domains) {
				body.domains = additionalFields.domains.split(',').map((d: string) => d.trim());
			}

			await apiRequest.call(this, 'PATCH', `/project-management/sites/url-tags?site_id=${siteId}`, body, {}, index);
			return { success: true, tag_ids: tagIds };
		}

		case 'deleteTag': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const tagId = this.getNodeParameter('tagId', index) as number;

			await apiRequest.call(this, 'DELETE', '/project-management/sites/url-tags', {}, { site_id: siteId, tag_id: tagId }, index);
			return { success: true, deleted: true, tag_id: tagId };
		}

		default:
			throw new Error(`Unknown URL Tags operation: ${operation}`);
	}
}
