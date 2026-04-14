import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function SearchVolumeOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'createVolumeCheck': {
			const keywordsStr = this.getNodeParameter('keywords', index) as string;
			const keywords = keywordsStr.split(',').map((k) => k.trim()).filter((k) => k.length > 0);

			return await apiRequest.call(this, 'POST', '/key-volume/', { query: keywords }, {}, index);
		}

		case 'listVolumeChecks': {
			return await apiRequest.call(this, 'GET', '/key-volume/', {}, {}, index);
		}

		case 'getVolumeResults': {
			const taskId = this.getNodeParameter('taskId', index) as number;
			return await apiRequest.call(this, 'GET', `/key-volume/${taskId}`, {}, {}, index);
		}

		case 'deleteVolumeCheck': {
			const taskId = this.getNodeParameter('taskId', index) as number;
			await apiRequest.call(this, 'DELETE', `/key-volume/${taskId}`, {}, {}, index);
			return { success: true, deleted: true, task_id: taskId };
		}

		default:
			throw new Error(`Unknown Search Volume operation: ${operation}`);
	}
}
