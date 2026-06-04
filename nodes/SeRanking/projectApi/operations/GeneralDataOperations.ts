import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

// General Data under unified docs: /project-management/system/...
// Renamed:
//   /system/search-engines → /system/search-engines (unchanged)
//   /system/google-langs → /system/google/languages
//   /system/volume-regions → not yet published in unified docs (returns 404). Marked deprecated.
//   /system/volume → not yet published in unified docs (returns 404). Marked deprecated.
// Per PM message 2026-05-21, unification is "done" — pending docs publication on these two,
// users should fall back to Data API /keywords/export for keyword volume.

export async function GeneralDataOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'listSearchEngines': {
			return await apiRequest.call(this, 'GET', '/project-management/system/search-engines', {}, {}, index);
		}

		case 'listGoogleLangs': {
			return await apiRequest.call(this, 'GET', '/project-management/system/google/languages', {}, {}, index);
		}

		case 'listGoogleRegions': {
			return await apiRequest.call(this, 'GET', '/project-management/system/google/regions', {}, {}, index);
		}

		case 'listVolumeRegions': {
			throw new Error(
				'listVolumeRegions: The /system/volume-regions endpoint is not available under the unified API (HTTP 404 as of 2026-05-22). ' +
				'SE Ranking has not yet published a replacement in the unified docs. ' +
				'For keyword volume data, use the Data API endpoint Keyword Research → Export Keyword Metrics (/v1/keywords/export) instead.'
			);
		}

		case 'getKeywordVolume': {
			throw new Error(
				'getKeywordVolume: The /system/volume endpoint is not available under the unified API (HTTP 404 as of 2026-05-22). ' +
				'Use the Data API endpoint Keyword Research → Export Keyword Metrics (/v1/keywords/export) instead — it returns the same volume + CPC + difficulty data for up to 5000 keywords per request.'
			);
		}

		default:
			throw new Error(`Unknown General Data operation: ${operation}`);
	}
}
