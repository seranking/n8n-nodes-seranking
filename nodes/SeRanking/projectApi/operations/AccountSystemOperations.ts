import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function AccountSystemOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'getBalance': {
			return await apiRequest.call(this, 'GET', '/account/balance', {}, {}, index);
		}

		case 'getProfile': {
			return await apiRequest.call(this, 'GET', '/account/profile', {}, {}, index);
		}

		case 'getSubscription': {
			return await apiRequest.call(this, 'GET', '/account/subscription', {}, {}, index);
		}

		default:
			throw new Error(`Unknown Account System operation: ${operation}`);
	}
}
