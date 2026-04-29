import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function AirtGroupsOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	const siteId = this.getNodeParameter('siteId', index) as number;

	switch (operation) {
		case 'listPromptGroups': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			const query: any = {};

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
				`/sites/${siteId}/airt/prompt-groups`,
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
				`/sites/${siteId}/airt/prompt-groups`,
				{ name: name.trim() },
				{},
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
				`/sites/${siteId}/airt/prompt-groups/${groupId}`,
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
				`/sites/${siteId}/airt/prompt-groups/${groupId}`,
				{},
				{},
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
				`/sites/${siteId}/airt/prompt-groups/${groupId}/order`,
				body,
				{},
				index,
			);
			return { success: true, group_id: groupId, ...body };
		}

		case 'deleteAllPromptsInGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;

			await apiRequest.call(
				this,
				'DELETE',
				`/sites/${siteId}/airt/prompt-groups/${groupId}/keywords`,
				{},
				{},
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
				`/sites/${siteId}/airt/prompt-groups/${groupId}/moveKeywords`,
				{ k2site_llm_ids: ids },
				{},
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
				`/sites/${siteId}/airt/prompt-groups/moveGroupKeywords`,
				{ from_group_id: fromGroupId, to_group_id: toGroupId },
				{},
				index,
			);
			return { success: true, from_group_id: fromGroupId, to_group_id: toGroupId };
		}

		default:
			throw new Error(`Unknown AIRT Groups operation: ${operation}`);
	}
}
