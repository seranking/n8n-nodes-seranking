import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';

export async function GeneralDataOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'listSearchEngines': {
			return await apiRequest.call(this, 'GET', '/system/search-engines', {}, {}, index);
		}

		case 'listGoogleLangs': {
			return await apiRequest.call(this, 'GET', '/system/google-langs', {}, {}, index);
		}

		case 'listVolumeRegions': {
			return await apiRequest.call(this, 'GET', '/system/volume-regions', {}, {}, index);
		}

		case 'getKeywordVolume': {
			const regionId = this.getNodeParameter('regionId', index) as number;
			const keywordsStr = this.getNodeParameter('keywords', index) as string;
			const keywords = keywordsStr.split(',').map((k) => k.trim()).filter((k) => k.length > 0);

			const query: any = { region_id: regionId, _keywordArray: keywords };

			return await apiRequest.call(this, 'GET', '/system/volume', {}, query, index);
		}

		default:
			throw new Error(`Unknown General Data operation: ${operation}`);
	}
}
