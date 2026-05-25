import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// AIRT prompt groups under unified docs: /project-management/airt/prompts/groups
// site_id / group_id move from path to query string.
// Path renames: /prompt-groups → /prompts/groups; /order, /keywords, /moveKeywords, /moveGroupKeywords are restructured.

export async function AirtGroupsOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	const siteId = this.getNodeParameter('siteId', index) as number;

	switch (operation) {
		case 'listPromptGroups': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			const query: any = { site_id: siteId };

			if (additionalFields.keysCount === true) {
				query.keys_count = 1;
			}

			if (additionalFields.siteLlmIds) {
				const ids = (additionalFields.siteLlmIds as string)
					.split(',')
					.map((s) => parseInt(s.trim(), 10))
					.filter((n) => !Number.isNaN(n));
				if (ids.length > 0) {
					query['site_llm_ids[]'] = ids;
				}
			}

			return await apiRequest.call(
				this,
				'GET',
				'/project-management/airt/prompts/groups',
				{},
				query,
				index,
			);
		}

		case 'createPromptGroup': {
			const name = this.getNodeParameter('groupName', index) as string;

			if (!name || name.trim() === '') {
				throw new Error('Group name cannot be empty');
			}

			return await apiRequest.call(
				this,
				'POST',
				'/project-management/airt/prompts/groups',
				{ name: name.trim() },
				{ site_id: siteId },
				index,
			);
		}

		case 'renamePromptGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			const name = this.getNodeParameter('groupName', index) as string;

			if (!name || name.trim() === '') {
				throw new Error('Group name cannot be empty');
			}

			return await apiRequest.call(
				this,
				'PATCH',
				`/project-management/airt/prompts/groups?site_id=${siteId}&group_id=${groupId}`,
				{ name: name.trim() },
				{},
				index,
			);
		}

		case 'deletePromptGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;

			await apiRequest.call(
				this,
				'DELETE',
				'/project-management/airt/prompts/groups',
				{},
				{ site_id: siteId, group_id: groupId },
				index,
			);
			return { success: true, deleted: true, group_id: groupId };
		}

		case 'changeGroupOrder': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			const beforeId = this.getNodeParameter('beforeId', index, 0) as number;
			const afterId = this.getNodeParameter('afterId', index, 0) as number;

			const hasBefore = beforeId > 0;
			const hasAfter = afterId > 0;
			if (hasBefore === hasAfter) {
				throw new Error(
					'Provide exactly one of "Place Before Group ID" or "Place After Group ID" (not both, not neither)',
				);
			}

			const body: any = {};
			if (hasBefore) body.before_id = beforeId;
			if (hasAfter) body.after_id = afterId;

			await apiRequest.call(
				this,
				'POST',
				'/project-management/airt/prompts/groups/order',
				body,
				{ site_id: siteId, group_id: groupId },
				index,
			);
			return { success: true, group_id: groupId, ...body };
		}

		case 'deleteAllPromptsInGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;

			await apiRequest.call(
				this,
				'DELETE',
				'/project-management/airt/prompts/groups/prompts',
				{},
				{ site_id: siteId, group_id: groupId },
				index,
			);
			return { success: true, emptied: true, group_id: groupId };
		}

		case 'movePromptsToGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			const idsStr = this.getNodeParameter('k2siteLlmIds', index) as string;
			const ids = idsStr
				.split(',')
				.map((s) => parseInt(s.trim(), 10))
				.filter((n) => !Number.isNaN(n));

			if (ids.length === 0) {
				throw new Error('Provide at least one k2site_llm_id');
			}

			await apiRequest.call(
				this,
				'POST',
				'/project-management/airt/prompts/groups/move',
				{ k2site_llm_ids: ids },
				{ site_id: siteId, group_id: groupId },
				index,
			);
			return { success: true, group_id: groupId, moved: ids };
		}

		case 'moveAllPromptsBetweenGroups': {
			const fromGroupId = this.getNodeParameter('fromGroupId', index) as number;
			const toGroupId = this.getNodeParameter('toGroupId', index) as number;

			if (fromGroupId === toGroupId) {
				throw new Error('Source and Target Group ID must differ');
			}

			await apiRequest.call(
				this,
				'POST',
				'/project-management/airt/prompts/groups/transfer',
				{ from_group_id: fromGroupId, to_group_id: toGroupId },
				{ site_id: siteId },
				index,
			);
			return { success: true, from_group_id: fromGroupId, to_group_id: toGroupId };
		}

		default:
			throw new Error(`Unknown AIRT Groups operation: ${operation}`);
	}
}
