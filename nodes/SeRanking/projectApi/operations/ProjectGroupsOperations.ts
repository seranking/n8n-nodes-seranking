import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// Project Groups under unified docs: /project-management/sites/groups
// group_id moves from path to query string.

export async function ProjectGroupsOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'addGroup': {
			const name = this.getNodeParameter('groupName', index) as string;

			if (!name || name.trim() === '') {
				throw new Error('Group name cannot be empty');
			}

			return await apiRequest.call(this, 'POST', '/project-management/sites/groups', { name: name.trim() }, {}, index);
		}

		case 'renameGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			const name = this.getNodeParameter('groupName', index) as string;

			if (!name || name.trim() === '') {
				throw new Error('Group name cannot be empty');
			}

			await apiRequest.call(this, 'PATCH', `/project-management/sites/groups?group_id=${groupId}`, { name: name.trim() }, {}, index);
			return { success: true, group_id: groupId, name: name.trim() };
		}

		case 'deleteGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;

			await apiRequest.call(this, 'DELETE', '/project-management/sites/groups', {}, { group_id: groupId }, index);
			return { success: true, deleted: true, group_id: groupId };
		}

		case 'listGroups': {
			return await apiRequest.call(this, 'GET', '/project-management/sites/groups', {}, {}, index);
		}

		case 'moveProjects': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			const siteIdsStr = this.getNodeParameter('siteIds', index) as string;
			const siteIds = siteIdsStr.split(',').map((id) => parseInt(id.trim(), 10));

			await apiRequest.call(this, 'POST', '/project-management/sites/groups/move', {
				site_ids: siteIds,
			}, { group_id: groupId }, index);
			return { success: true, group_id: groupId, moved_sites: siteIds };
		}

		default:
			throw new Error(`Unknown Project Groups operation: ${operation}`);
	}
}
