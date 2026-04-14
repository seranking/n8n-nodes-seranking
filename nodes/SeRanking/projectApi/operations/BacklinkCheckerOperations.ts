import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function BacklinkCheckerOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	const siteId = this.getNodeParameter('siteId', index) as number;

	switch (operation) {
		// ─── Backlinks ──────────────────────────────────────────────────────
		case 'listBacklinks': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			return await apiRequest.call(this, 'GET', `/backlinks/${siteId}`, {}, query, index);
		}

		case 'addBacklink': {
			const url = this.getNodeParameter('backlinkUrl', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { url };
			if (additionalFields.price !== undefined) body.price = additionalFields.price;
			if (additionalFields.currency) body.currency = additionalFields.currency;
			if (additionalFields.chargePeriod) body.charge_period = additionalFields.chargePeriod;
			if (additionalFields.chargeStart) body.charge_start = additionalFields.chargeStart;

			return await apiRequest.call(this, 'POST', `/backlinks/${siteId}`, body, {}, index);
		}

		case 'importList': {
			const urlsStr = this.getNodeParameter('backlinkUrls', index) as string;
			const list = urlsStr.split(',').map((u) => u.trim()).filter((u) => u.length > 0);
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { list };
			if (additionalFields.price !== undefined) body.price = additionalFields.price;
			if (additionalFields.currency) body.currency = additionalFields.currency;
			if (additionalFields.chargePeriod) body.charge_period = additionalFields.chargePeriod;
			if (additionalFields.chargeStart) body.charge_start = additionalFields.chargeStart;
			if (additionalFields.groupId) body.group_id = additionalFields.groupId;
			if (additionalFields.manager) body.manager = additionalFields.manager;

			return await apiRequest.call(this, 'POST', `/backlinks/${siteId}/list`, body, {}, index);
		}

		case 'updateImportSettings': {
			const gscAutoimport = this.getNodeParameter('gscAutoimport', index) as boolean;
			await apiRequest.call(this, 'PUT', `/backlinks/${siteId}/settings`, { gsc_autoimport: gscAutoimport }, {}, index);
			return { success: true, gsc_autoimport: gscAutoimport };
		}

		case 'startGscImport': {
			return await apiRequest.call(this, 'POST', `/backlinks/${siteId}/import-gsc`, {}, {}, index);
		}

		case 'getGscImportStatus': {
			const token = this.getNodeParameter('importToken', index) as string;
			return await apiRequest.call(this, 'GET', `/backlinks/${siteId}/import-gsc/${token}`, {}, {}, index);
		}

		case 'deleteBacklinks': {
			const idsStr = this.getNodeParameter('backlinkIds', index) as string;
			const backlinkIds = idsStr.split(',').map((id) => parseInt(id.trim(), 10));
			await apiRequest.call(this, 'POST', `/backlinks/${siteId}/delete`, { backlink_ids: backlinkIds }, {}, index);
			return { success: true, deleted: true, backlink_ids: backlinkIds };
		}

		case 'recheckBacklinks': {
			const idsStr = this.getNodeParameter('backlinkIds', index) as string;
			const backlinkIds = idsStr.split(',').map((id) => parseInt(id.trim(), 10));
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { backlink_ids: backlinkIds };
			if (additionalFields.recheckType) body.recheck_type = additionalFields.recheckType;

			return await apiRequest.call(this, 'POST', `/backlinks/${siteId}/recheck`, body, {}, index);
		}

		case 'getStats': {
			return await apiRequest.call(this, 'GET', `/backlinks/${siteId}/stat`, {}, {}, index);
		}

		// ─── Disavow ────────────────────────────────────────────────────────
		case 'listDisavowed': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = {};
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			return await apiRequest.call(this, 'GET', `/backlink-disavow/${siteId}`, {}, query, index);
		}

		case 'addDisavowed': {
			const urlsStr = this.getNodeParameter('disavowUrls', index) as string;
			const list = urlsStr.split(',').map((u) => u.trim()).filter((u) => u.length > 0);
			return await apiRequest.call(this, 'POST', `/backlink-disavow/${siteId}`, { list }, {}, index);
		}

		case 'deleteDisavowed': {
			const disavowId = this.getNodeParameter('disavowId', index) as number;
			await apiRequest.call(this, 'DELETE', `/backlink-disavow/${siteId}`, {}, { id: disavowId }, index);
			return { success: true, deleted: true, id: disavowId };
		}

		// ─── Backlink Groups ────────────────────────────────────────────────
		case 'listGroups': {
			return await apiRequest.call(this, 'GET', `/backlink-groups/${siteId}`, {}, {}, index);
		}

		case 'createGroup': {
			const name = this.getNodeParameter('groupName', index) as string;
			return await apiRequest.call(this, 'POST', `/backlink-groups/${siteId}`, { name }, {}, index);
		}

		case 'deleteGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			await apiRequest.call(this, 'DELETE', `/backlink-groups/${siteId}`, {}, { id: groupId }, index);
			return { success: true, deleted: true, group_id: groupId };
		}

		case 'renameGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			const name = this.getNodeParameter('newGroupName', index) as string;
			await apiRequest.call(this, 'PUT', `/backlink-groups/${siteId}`, { id: groupId, name }, {}, index);
			return { success: true, group_id: groupId };
		}

		case 'moveToGroup': {
			const targetGroupId = this.getNodeParameter('targetGroupId', index) as number;
			const body: any = { id: targetGroupId };
			const backlinkIdsStr = this.getNodeParameter('backlinkIds', index, '') as string;
			const groupIdsStr = this.getNodeParameter('groupIds', index, '') as string;
			if (backlinkIdsStr) {
				body.backlink_ids = backlinkIdsStr.split(',').map((id) => parseInt(id.trim(), 10));
			}
			if (groupIdsStr) {
				body.group_ids = groupIdsStr.split(',').map((id) => parseInt(id.trim(), 10));
			}
			return await apiRequest.call(this, 'POST', `/backlink-groups/${siteId}/move`, body, {}, index);
		}

		default:
			throw new Error(`Unknown Backlink Checker operation: ${operation}`);
	}
}
