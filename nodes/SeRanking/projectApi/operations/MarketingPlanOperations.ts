import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function MarketingPlanOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	const siteId = this.getNodeParameter('siteId', index) as number;

	switch (operation) {
		case 'listPlanItems': {
			return await apiRequest.call(this, 'GET', `/checklist/${siteId}`, {}, {}, index);
		}

		case 'addTask': {
			const title = this.getNodeParameter('taskTitle', index) as string;
			const text = this.getNodeParameter('taskText', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { title, text };
			if (additionalFields.forAll !== undefined) body.for_all = additionalFields.forAll;

			return await apiRequest.call(this, 'POST', `/checklist/${siteId}/task`, body, {}, index);
		}

		case 'updateTask': {
			const taskId = this.getNodeParameter('taskId', index) as string;
			const title = this.getNodeParameter('taskTitle', index) as string;
			const text = this.getNodeParameter('taskText', index) as string;

			await apiRequest.call(this, 'PUT', `/checklist/${siteId}/task`, {
				task_id: taskId,
				title,
				text,
			}, {}, index);
			return { success: true, task_id: taskId };
		}

		case 'setTaskStatus': {
			const taskId = this.getNodeParameter('taskId', index) as string;
			const checked = this.getNodeParameter('checked', index) as boolean;

			await apiRequest.call(this, 'PUT', `/checklist/${siteId}/task`, {
				task_id: taskId,
				checked,
			}, {}, index);
			return { success: true, task_id: taskId, checked };
		}

		case 'deleteTask': {
			const taskId = this.getNodeParameter('deleteTaskId', index) as number;
			await apiRequest.call(this, 'DELETE', `/checklist/${siteId}/task/${taskId}`, {}, {}, index);
			return { success: true, deleted: true, task_id: taskId };
		}

		default:
			throw new Error(`Unknown Marketing Plan operation: ${operation}`);
	}
}
