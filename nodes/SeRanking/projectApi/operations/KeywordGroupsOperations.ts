import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// Keyword Groups under unified docs: /project-management/keywords/groups
// group_id / site_id move from path to query string.

export async function KeywordGroupsOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'listGroups': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/keywords/groups', {}, { site_id: siteId }, index);
		}

		case 'addGroup': {
			const siteId = this.getNodeParameter('siteId', index) as number;
			const name = this.getNodeParameter('groupName', index) as string;

			if (!name || name.trim() === '') {
				throw new Error('Group name cannot be empty');
			}

			return await apiRequest.call(this, 'POST', '/project-management/keywords/groups', {
				name: name.trim(),
				site_id: siteId,
			}, {}, index);
		}

		case 'moveKeywords': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			const keywordIdsStr = this.getNodeParameter('keywordIds', index) as string;
			const keywordIds = keywordIdsStr.split(',').map((id) => parseInt(id.trim(), 10));

			// API expects body key `keywords_ids` (plural), not `keyword_ids` as docs state.
			// Verified 2026-05-28: `keyword_ids` returns 400 "No keywords ids in request".
			await apiRequest.call(this, 'POST', '/project-management/keywords/groups/move', {
				keywords_ids: keywordIds,
			}, { group_id: groupId }, index);
			return { success: true, group_id: groupId, moved_keywords: keywordIds };
		}

		case 'renameGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			const name = this.getNodeParameter('groupName', index) as string;

			if (!name || name.trim() === '') {
				throw new Error('Group name cannot be empty');
			}

			await apiRequest.call(this, 'PATCH', `/project-management/keywords/groups?group_id=${groupId}`, {
				name: name.trim(),
			}, {}, index);
			return { success: true, group_id: groupId, name: name.trim() };
		}

		case 'deleteGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;

			await apiRequest.call(this, 'DELETE', '/project-management/keywords/groups', {}, { group_id: groupId }, index);
			return { success: true, deleted: true, group_id: groupId };
		}

		default:
			throw new Error(`Unknown Keyword Groups operation: ${operation}`);
	}
}
