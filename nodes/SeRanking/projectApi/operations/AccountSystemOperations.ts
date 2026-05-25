import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// Account System under unified docs:
//   /account/subscription is on the Data API surface (returns units_left/units_limit balance).
//   Profile + balance currency endpoints moved into Project API's /project-management/users/me.

export async function AccountSystemOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'getBalance': {
			// Unified docs do not expose a separate /account/balance — credit balance lives on
			// /account/subscription as units_left. Route there for v2.
			return await apiRequest.call(this, 'GET', '/account/subscription', {}, {}, index);
		}

		case 'getProfile': {
			// Was /account/profile on legacy Project API → now /project-management/users/me.
			return await apiRequest.call(this, 'GET', '/project-management/users/me', {}, {}, index);
		}

		case 'getSubscription': {
			return await apiRequest.call(this, 'GET', '/account/subscription', {}, {}, index);
		}

		default:
			throw new Error(`Unknown Account System operation: ${operation}`);
	}
}
