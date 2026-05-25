import { IExecuteFunctions } from 'n8n-workflow';

// Search Volume async-task endpoints (/key-volume/...) returned HTTP 404 under the unified host
// as of 2026-05-22. SE Ranking has not yet published a replacement; for now route users to the
// Data API endpoint Keyword Research → Export Keyword Metrics (/v1/keywords/export), which
// returns volume + CPC + difficulty + intents synchronously for up to 5000 keywords per call.

export async function SearchVolumeOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;

	const message =
		`Search Volume operation "${operation}" is unavailable under the unified SE Ranking API ` +
		'(the legacy /key-volume async task endpoints return HTTP 404 as of 2026-05-22). ' +
		'Use Data API → Keyword Research → Export Keyword Metrics (/v1/keywords/export) instead — ' +
		'it returns volume, CPC, competition, difficulty, intents, and history for up to 5000 keywords per request.';

	throw new Error(message);
}
