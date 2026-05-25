import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// Sub-Account Management under unified docs: /project-management/users/...
// user_id moves from path to query string.
// /users/{id}/own-sites was renamed to /users/owned-sites in new docs (note the s).

export async function SubAccountOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'listSubAccounts': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			return await apiRequest.call(this, 'GET', '/project-management/users', {}, query, index);
		}

		case 'getSubAccount': {
			const id = this.getNodeParameter('subAccountId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/users', {}, { user_id: id }, index);
		}

		case 'createSubAccount': {
			const email = this.getNodeParameter('accountEmail', index) as string;
			const firstName = this.getNodeParameter('accountFirstName', index) as string;
			const password = this.getNodeParameter('accountPassword', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const data: any[] = [
				{ 'setting.account_email': email },
				{ 'setting.account_first_name': firstName },
				{ 'setting.account_password': password },
			];

			if (additionalFields.accountLastName) data.push({ 'setting.account_last_name': additionalFields.accountLastName });
			if (additionalFields.accountLang) data.push({ 'setting.account_lang': additionalFields.accountLang });
			if (additionalFields.accountType) data.push({ 'setting.account_type': additionalFields.accountType });
			if (additionalFields.balancePeriod) data.push({ 'limit.balance.period': additionalFields.balancePeriod });
			if (additionalFields.balanceAmount !== undefined) data.push({ 'limit.balance.amount': additionalFields.balanceAmount });
			if (additionalFields.access) {
				const accessArr = additionalFields.access.split(',').map((a: string) => a.trim());
				data.push({ access: accessArr });
			}

			const body = [{ key: 'data', value: data }];
			return await apiRequest.call(this, 'POST', '/project-management/users', body, {}, index);
		}

		case 'deleteSubAccount': {
			const id = this.getNodeParameter('subAccountId', index) as number;
			await apiRequest.call(this, 'DELETE', '/project-management/users', {}, { user_id: id }, index);
			return { success: true, deleted: true, account_id: id };
		}

		case 'updateSubAccount': {
			const id = this.getNodeParameter('subAccountId', index) as number;
			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;

			const data: any[] = [];
			if (updateFields.accountEmail) data.push({ 'setting.account_email': updateFields.accountEmail });
			if (updateFields.accountFirstName) data.push({ 'setting.account_first_name': updateFields.accountFirstName });
			if (updateFields.accountLastName) data.push({ 'setting.account_last_name': updateFields.accountLastName });
			if (updateFields.accountPassword) data.push({ 'setting.account_password': updateFields.accountPassword });
			if (updateFields.accountLang) data.push({ 'setting.account_lang': updateFields.accountLang });
			if (updateFields.accountType) data.push({ 'setting.account_type': updateFields.accountType });
			if (updateFields.balancePeriod) data.push({ 'limit.balance.period': updateFields.balancePeriod });
			if (updateFields.balanceAmount !== undefined) data.push({ 'limit.balance.amount': updateFields.balanceAmount });
			if (updateFields.access) {
				const accessArr = updateFields.access.split(',').map((a: string) => a.trim());
				data.push({ access: accessArr });
			}

			const body = [{ key: 'data', value: data }];
			await apiRequest.call(this, 'PATCH', `/project-management/users?user_id=${id}`, body, {}, index);
			return { success: true, account_id: id };
		}

		case 'listSharedSites': {
			const id = this.getNodeParameter('subAccountId', index) as number;
			return await apiRequest.call(this, 'GET', '/project-management/users/shared-sites', {}, { user_id: id }, index);
		}

		case 'listOwnedSites': {
			const id = this.getNodeParameter('subAccountId', index) as number;
			// Rename: /users/{id}/own-sites → /users/owned-sites?user_id=
			return await apiRequest.call(this, 'GET', '/project-management/users/owned-sites', {}, { user_id: id }, index);
		}

		case 'shareProjects': {
			const id = this.getNodeParameter('subAccountId', index) as number;
			const siteIdsStr = this.getNodeParameter('siteIds', index) as string;
			const siteIds = siteIdsStr.split(',').map((s) => parseInt(s.trim(), 10));

			// Per docs: body is { site_ids: [...] }. Note prior quirk where API rejected arrays and accepted
			// a single integer — needs re-verification under unified API (see QUIRKS.md).
			return await apiRequest.call(this, 'POST', '/project-management/users/shared-sites', { site_ids: siteIds }, { user_id: id }, index);
		}

		default:
			throw new Error(`Unknown Sub-Account operation: ${operation}`);
	}
}
