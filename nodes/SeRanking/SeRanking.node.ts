import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionTypes,
} from 'n8n-workflow';

// Import Data API descriptions
import { aiSearchOperations, aiSearchFields } from './dataApi/descriptions/AiSearchDescription';
import { domainAnalysisOperations, domainAnalysisFields } from './dataApi/descriptions/DomainAnalysisDescription';
import { keywordResearchOperations, keywordResearchFields } from './dataApi/descriptions/KeywordResearchDescription';
import { backlinksOperations, backlinksFields } from './dataApi/descriptions/BacklinksDescription';
import { websiteAuditOperations, websiteAuditFields } from './dataApi/descriptions/WebsiteAuditDescription';
import { serpClassicOperations, serpClassicFields } from './dataApi/descriptions/SerpClassicDescription'; 

// Import Project API descriptions
import { projectManagementOperations, projectManagementFields } from './projectApi/descriptions/ProjectManagementDescription';
import { projectGroupsOperations, projectGroupsFields } from './projectApi/descriptions/ProjectGroupsDescription';
import { aiResultTrackerOperations, aiResultTrackerFields } from './projectApi/descriptions/AiResultTrackerDescription';
import { airtGroupsOperations, airtGroupsFields } from './projectApi/descriptions/AirtGroupsDescription';
import { keywordGroupsOperations, keywordGroupsFields } from './projectApi/descriptions/KeywordGroupsDescription';
import { competitorsOperations, competitorsFields } from './projectApi/descriptions/CompetitorsDescription';
import { urlTagsOperations, urlTagsFields } from './projectApi/descriptions/UrlTagsDescription';
import { analyticsTrafficOperations, analyticsTrafficFields } from './projectApi/descriptions/AnalyticsTrafficDescription';
import { accountSystemOperations, accountSystemFields } from './projectApi/descriptions/AccountSystemDescription';
import { subAccountOperations, subAccountFields } from './projectApi/descriptions/SubAccountDescription';
import { generalDataOperations, generalDataFields } from './projectApi/descriptions/GeneralDataDescription';
import { marketingPlanOperations, marketingPlanFields } from './projectApi/descriptions/MarketingPlanDescription';
import { websiteAuditOperations as websiteAuditProjectOperations, websiteAuditFields as websiteAuditProjectFields } from './projectApi/descriptions/WebsiteAuditDescription';
import { backlinkCheckerOperations, backlinkCheckerFields } from './projectApi/descriptions/BacklinkCheckerDescription';
import { searchVolumeOperations, searchVolumeFields } from './projectApi/descriptions/SearchVolumeDescription';


// Import Data API operations
import { AiSearchOperations } from './dataApi/operations/AiSearchOperations';
import { DomainAnalysisOperations } from './dataApi/operations/DomainAnalysisOperations';
import { KeywordResearchOperations } from './dataApi/operations/KeywordResearchOperations';
import { BacklinksOperations } from './dataApi/operations/BacklinksOperations';
import { WebsiteAuditOperations } from './dataApi/operations/WebsiteAuditOperations';
import { SerpClassicOperations } from './dataApi/operations/SerpClassicOperations';


// Import Project API operations
import { ProjectManagementOperations } from './projectApi/operations/ProjectManagementOperations';
import { ProjectGroupsOperations } from './projectApi/operations/ProjectGroupsOperations';
import { AiResultTrackerOperations } from './projectApi/operations/AiResultTrackerOperations';
import { AirtGroupsOperations } from './projectApi/operations/AirtGroupsOperations';
import { KeywordGroupsOperations } from './projectApi/operations/KeywordGroupsOperations';
import { CompetitorsOperations } from './projectApi/operations/CompetitorsOperations';
import { UrlTagsOperations } from './projectApi/operations/UrlTagsOperations';
import { AnalyticsTrafficOperations } from './projectApi/operations/AnalyticsTrafficOperations';
import { AccountSystemOperations } from './projectApi/operations/AccountSystemOperations';
import { SubAccountOperations } from './projectApi/operations/SubAccountOperations';
import { GeneralDataOperations } from './projectApi/operations/GeneralDataOperations';
import { MarketingPlanOperations } from './projectApi/operations/MarketingPlanOperations';
import { WebsiteAuditOperations as WebsiteAuditProjectOperations } from './projectApi/operations/WebsiteAuditOperations';
import { BacklinkCheckerOperations } from './projectApi/operations/BacklinkCheckerOperations';
import { SearchVolumeOperations } from './projectApi/operations/SearchVolumeOperations';



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
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'seRankingApi',
				required: true,
			},
		],
		properties: [
			// Resource selector (all resources — flat dropdown, standard n8n pattern)
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account System',
						value: 'accountSystem',
						description: 'Account balance, profile, and subscription info',
					},
					{
						name: 'AI Result Tracker',
						value: 'aiResultTracker',
						description: 'Track brand visibility across AI search engines',
					},
					{
						name: 'AIRT Groups',
						value: 'airtGroups',
						description: 'Manage AI Result Tracker prompt groups',
					},
					{
						name: 'AI Search',
						value: 'aiSearch',
						description: 'LLM visibility and AI search data',
					},
					{
						name: 'Analytics Traffic',
						value: 'analyticsTraffic',
						description: 'Google Search Console data and SEO potential',
					},
					{
						name: 'Backlink Checker',
						value: 'backlinkChecker',
						description: 'Backlink monitoring, disavow, and groups',
					},
					{
						name: 'Backlinks',
						value: 'backlinks',
						description: 'Backlink analysis and authority metrics',
					},
					{
						name: 'Competitors',
						value: 'competitors',
						description: 'Manage competitors and retrieve ranking data',
					},
					{
						name: 'Domain Analysis',
						value: 'domainAnalysis',
						description: 'Domain keyword rankings and competitor analysis',
					},
					{
						name: 'General Data',
						value: 'generalData',
						description: 'System search engines, languages, regions, and keyword volume',
					},
					{
						name: 'Keyword Groups',
						value: 'keywordGroups',
						description: 'Manage keyword groups within a project',
					},
					{
						name: 'Keyword Research',
						value: 'keywordResearch',
						description: 'Keyword metrics, volume, CPC, and related keywords',
					},
					{
						name: 'Marketing Plan',
						value: 'marketingPlan',
						description: 'Marketing plan checklists and tasks',
					},
					{
						name: 'Project Groups',
						value: 'projectGroups',
						description: 'Manage project groups within the account',
					},
					{
						name: 'Project Management',
						value: 'projectManagement',
						description: 'Manage projects and search engine configurations',
					},
					{
						name: 'Search Volume',
						value: 'searchVolume',
						description: 'Keyword search volume check requests',
					},
					{
						name: 'SERP Classic',
						value: 'serpClassic',
						description: 'SERP tracking and results retrieval',
					},
					{
						name: 'Sub-Account Management',
						value: 'subAccount',
						description: 'Manage sub-accounts, sharing, and permissions',
					},
					{
						name: 'URL Tags',
						value: 'urlTags',
						description: 'Manage landing page tags within a site',
					},
					{
						name: 'Website Audit (Data)',
						value: 'websiteAudit',
						description: 'Site crawling, technical SEO, and on-page analysis',
					},
					{
						name: 'Website Audit (Project)',
						value: 'websiteAuditProject',
						description: 'Technical SEO audits lifecycle management',
					},
				],
				default: 'domainAnalysis',
			},
			// AI Search
			...aiSearchOperations,
			...aiSearchFields,
			// Backlinks
			...backlinksOperations,
			...backlinksFields,
			// Domain Analysis
			...domainAnalysisOperations,
			...domainAnalysisFields,
			// Keyword Research
			...keywordResearchOperations,
			...keywordResearchFields,
			// SERP Classic                                      
			...serpClassicOperations,                           
			...serpClassicFields,                               
			// Website Audit
			...websiteAuditOperations,
			...websiteAuditFields,
			// Project Management
			...projectManagementOperations,
			...projectManagementFields,
			// Project Groups
			...projectGroupsOperations,
			...projectGroupsFields,
			// AI Result Tracker
			...aiResultTrackerOperations,
			...aiResultTrackerFields,
			// AIRT Groups
			...airtGroupsOperations,
			...airtGroupsFields,
			// Keyword Groups
			...keywordGroupsOperations,
			...keywordGroupsFields,
			// Competitors
			...competitorsOperations,
			...competitorsFields,
			// URL Tags
			...urlTagsOperations,
			...urlTagsFields,
			// Analytics Traffic
			...analyticsTrafficOperations,
			...analyticsTrafficFields,
			// Account System
			...accountSystemOperations,
			...accountSystemFields,
			// Sub-Account Management
			...subAccountOperations,
			...subAccountFields,
			// General Data
			...generalDataOperations,
			...generalDataFields,
			// Marketing Plan
			...marketingPlanOperations,
			...marketingPlanFields,
			// Website Audit (Project API)
			...websiteAuditProjectOperations,
			...websiteAuditProjectFields,
			// Backlink Checker
			...backlinkCheckerOperations,
			...backlinkCheckerFields,
			// Search Volume
			...searchVolumeOperations,
			...searchVolumeFields,
            ],
	};

	methods = {
		loadOptions: {
			async getAuditIssueCodes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const auditId = this.getCurrentNodeParameter('auditId') as number;
				if (!auditId) {
					return [];
				}

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'seRankingApi',
					{
						method: 'GET',
						url: 'https://api.seranking.com/v1/project-management/audits/report',
						qs: { audit_id: auditId },
						json: true,
					},
				);

				const codes = new Set<string>();
				const sections = (response && response.sections) || [];
				for (const section of sections) {
					const props = section && section.props;
					if (props && typeof props === 'object') {
						for (const key of Object.keys(props)) {
							codes.add(key);
						}
					}
				}

				return Array.from(codes)
					.sort()
					.map((code) => ({ name: code, value: code }));
			},
		},
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
					case 'backlinks':
						responseData = await BacklinksOperations.call(this, i);
						break;
					case 'domainAnalysis':
						responseData = await DomainAnalysisOperations.call(this, i);
						break;
					case 'keywordResearch':
						responseData = await KeywordResearchOperations.call(this, i);
						break;
					case 'serpClassic':                                        
						responseData = await SerpClassicOperations.call(this, i); 
						break;
					case 'websiteAudit':
						responseData = await WebsiteAuditOperations.call(this, i);
						break;
					case 'projectManagement':
						responseData = await ProjectManagementOperations.call(this, i);
						break;
					case 'projectGroups':
						responseData = await ProjectGroupsOperations.call(this, i);
						break;
					case 'aiResultTracker':
						responseData = await AiResultTrackerOperations.call(this, i);
						break;
					case 'airtGroups':
						responseData = await AirtGroupsOperations.call(this, i);
						break;
					case 'keywordGroups':
						responseData = await KeywordGroupsOperations.call(this, i);
						break;
					case 'competitors':
						responseData = await CompetitorsOperations.call(this, i);
						break;
					case 'urlTags':
						responseData = await UrlTagsOperations.call(this, i);
						break;
					case 'analyticsTraffic':
						responseData = await AnalyticsTrafficOperations.call(this, i);
						break;
					case 'accountSystem':
						responseData = await AccountSystemOperations.call(this, i);
						break;
					case 'subAccount':
						responseData = await SubAccountOperations.call(this, i);
						break;
					case 'generalData':
						responseData = await GeneralDataOperations.call(this, i);
						break;
					case 'marketingPlan':
						responseData = await MarketingPlanOperations.call(this, i);
						break;
					case 'websiteAuditProject':
						responseData = await WebsiteAuditProjectOperations.call(this, i);
						break;
					case 'backlinkChecker':
						responseData = await BacklinkCheckerOperations.call(this, i);
						break;
					case 'searchVolume':
						responseData = await SearchVolumeOperations.call(this, i);
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