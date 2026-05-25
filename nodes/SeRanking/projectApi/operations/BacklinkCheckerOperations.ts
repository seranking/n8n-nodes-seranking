import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// Backlink Checker under unified docs: /project-management/backlinks/...
// All backlinks endpoints folded under one /backlinks namespace:
//   /backlinks (list/add)
//   /backlinks/import
//   /backlinks/gsc/settings  (was /backlinks/{id}/settings)
//   /backlinks/gsc/import    (was /backlinks/{id}/import-gsc)
//   /backlinks/delete, /backlinks/recheck
//   /backlinks/stats         (was /backlinks/{id}/stat)
//   /backlinks/disavowed     (was /backlink-disavow/{id})
//   /backlinks/groups        (was /backlink-groups/{id})
//   /backlinks/groups/move
// site_id moves from path to query string.

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

			const query: any = { site_id: siteId };
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			return await apiRequest.call(this, 'GET', '/project-management/backlinks', {}, query, index);
		}

		case 'addBacklink': {
			const url = this.getNodeParameter('backlinkUrl', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { url };
			if (additionalFields.price !== undefined) body.price = additionalFields.price;
			if (additionalFields.currency) body.currency = additionalFields.currency;
			if (additionalFields.chargePeriod) body.charge_period = additionalFields.chargePeriod;
			if (additionalFields.chargeStart) body.charge_start = additionalFields.chargeStart;

			return await apiRequest.call(this, 'POST', '/project-management/backlinks', body, { site_id: siteId }, index);
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

			return await apiRequest.call(this, 'POST', '/project-management/backlinks/import', body, { site_id: siteId }, index);
		}

		case 'updateImportSettings': {
			const gscAutoimport = this.getNodeParameter('gscAutoimport', index) as boolean;
			await apiRequest.call(this, 'PATCH', `/project-management/backlinks/gsc/settings?site_id=${siteId}`, { gsc_autoimport: gscAutoimport }, {}, index);
			return { success: true, gsc_autoimport: gscAutoimport };
		}

		case 'startGscImport': {
			return await apiRequest.call(this, 'POST', '/project-management/backlinks/gsc/import', {}, { site_id: siteId }, index);
		}

		case 'getGscImportStatus': {
			// New docs no longer accept a per-import token in path — status is fetched per site.
			return await apiRequest.call(this, 'GET', '/project-management/backlinks/gsc/import', {}, { site_id: siteId }, index);
		}

		case 'deleteBacklinks': {
			const idsStr = this.getNodeParameter('backlinkIds', index) as string;
			const backlinkIds = idsStr.split(',').map((id) => parseInt(id.trim(), 10));
			await apiRequest.call(this, 'POST', '/project-management/backlinks/delete', { backlink_ids: backlinkIds }, { site_id: siteId }, index);
			return { success: true, deleted: true, backlink_ids: backlinkIds };
		}

		case 'recheckBacklinks': {
			const idsStr = this.getNodeParameter('backlinkIds', index) as string;
			const backlinkIds = idsStr.split(',').map((id) => parseInt(id.trim(), 10));
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const body: any = { backlink_ids: backlinkIds };
			if (additionalFields.recheckType) body.recheck_type = additionalFields.recheckType;

			return await apiRequest.call(this, 'POST', '/project-management/backlinks/recheck', body, { site_id: siteId }, index);
		}

		case 'getStats': {
			return await apiRequest.call(this, 'GET', '/project-management/backlinks/stats', {}, { site_id: siteId }, index);
		}

		// ─── Disavow ────────────────────────────────────────────────────────
		case 'listDisavowed': {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

			const query: any = { site_id: siteId };
			if (additionalFields.limit !== undefined) query.limit = additionalFields.limit;
			if (additionalFields.offset !== undefined) query.offset = additionalFields.offset;

			return await apiRequest.call(this, 'GET', '/project-management/backlinks/disavowed', {}, query, index);
		}

		case 'addDisavowed': {
			const urlsStr = this.getNodeParameter('disavowUrls', index) as string;
			const list = urlsStr.split(',').map((u) => u.trim()).filter((u) => u.length > 0);
			return await apiRequest.call(this, 'POST', '/project-management/backlinks/disavowed', { list }, { site_id: siteId }, index);
		}

		case 'deleteDisavowed': {
			const disavowId = this.getNodeParameter('disavowId', index) as number;
			await apiRequest.call(this, 'DELETE', '/project-management/backlinks/disavowed', {}, { site_id: siteId, id: disavowId }, index);
			return { success: true, deleted: true, id: disavowId };
		}

		// ─── Backlink Groups ────────────────────────────────────────────────
		case 'listGroups': {
			return await apiRequest.call(this, 'GET', '/project-management/backlinks/groups', {}, { site_id: siteId }, index);
		}

		case 'createGroup': {
			const name = this.getNodeParameter('groupName', index) as string;
			return await apiRequest.call(this, 'POST', '/project-management/backlinks/groups', { name }, { site_id: siteId }, index);
		}

		case 'deleteGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			await apiRequest.call(this, 'DELETE', '/project-management/backlinks/groups', {}, { site_id: siteId, id: groupId }, index);
			return { success: true, deleted: true, group_id: groupId };
		}

		case 'renameGroup': {
			const groupId = this.getNodeParameter('groupId', index) as number;
			const name = this.getNodeParameter('newGroupName', index) as string;
			await apiRequest.call(this, 'PATCH', `/project-management/backlinks/groups?site_id=${siteId}`, { id: groupId, name }, {}, index);
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
			return await apiRequest.call(this, 'POST', '/project-management/backlinks/groups/move', body, { site_id: siteId }, index);
		}

		default:
			throw new Error(`Unknown Backlink Checker operation: ${operation}`);
	}
}
