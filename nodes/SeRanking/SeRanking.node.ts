import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

// Import Data API descriptions
import { aiSearchOperations, aiSearchFields } from './dataApi/descriptions/AiSearchDescription';
import { domainAnalysisOperations, domainAnalysisFields } from './dataApi/descriptions/DomainAnalysisDescription';
import { keywordResearchOperations, keywordResearchFields } from './dataApi/descriptions/KeywordResearchDescription';

// Import Data API operations
import { AiSearchOperations } from './dataApi/operations/AiSearchOperations';
import { DomainAnalysisOperations } from './dataApi/operations/DomainAnalysisOperations';
import { KeywordResearchOperations } from './dataApi/operations/KeywordResearchOperations';




export class SeRanking implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SE Ranking',
		name: 'seRanking',
		icon: 'file:seranking.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with SE Ranking API for SEO data',
		defaults: {
			name: 'SE Ranking',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'seRankingApi',
				required: true,
			},
		],
		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'AI Search',
						value: 'aiSearch',
						description: 'LLM visibility and AI search data',
					},
                    {
						name: 'Domain Analysis',
						value: 'domainAnalysis',
						description: 'Domain keyword rankings and competitor analysis',
					},
					{
						name: 'Keyword Research',
						value: 'keywordResearch',
						description: 'Keyword metrics, volume, CPC, and related keywords',
					},
				],
				default: 'domainAnalysis',
			},
			// AI Search
			...aiSearchOperations,
			...aiSearchFields,
			// Domain Analysis
			...domainAnalysisOperations,
			...domainAnalysisFields,
			// Keyword Research
			...keywordResearchOperations,
			...keywordResearchFields,
            ],
	};
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				switch (resource) {
					case 'aiSearch':
						responseData = await AiSearchOperations.call(this, i);
						break;
					case 'domainAnalysis':
						responseData = await DomainAnalysisOperations.call(this, i);
						break;
					case 'keywordResearch':
						responseData = await KeywordResearchOperations.call(this, i);
						break;
                    default:
						throw new NodeOperationError(
							this.getNode(),
							`Unknown resource: ${resource}`,
							{ itemIndex: i }
						);
				}

				// Handle array responses (multiple items)
				if (Array.isArray(responseData)) {
					responseData.forEach(item => {
						returnData.push({ json: item, pairedItem: { item: i } });
					});
				} else {
					returnData.push({ json: responseData, pairedItem: { item: i } });
				}

			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
							itemIndex: i,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}