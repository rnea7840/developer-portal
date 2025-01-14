export * from './actions/apply';
export * from './actions/oauthApiSelection';
export * from './actions/version';
export * from './actions/apiList';
export * from './actions/generalStore';
export * from './actions/scrollPosition';

export const CURRENT_VERSION_IDENTIFIER = 'current';
export const DEFAULT_OAUTH_API_SELECTION = 'claims';
export const DEFAULT_OAUTH_CCG_API_SELECTION = 'claims';
export const OPEN_API_SPEC_HOST: string = process.env.REACT_APP_VETSGOV_SWAGGER_API ?? '';

const LPB_PREFIX = process.env.PUBLIC_URL ?? '';
const LPB_BASE_URL = `${LPB_PREFIX}/platform-backend`;
export const LPB_FORGERY_TOKEN = 'CsrfBlocker';
export const LPB_APPLY_URL = `${LPB_BASE_URL}/v0/consumers/applications`;
export const LPB_PRODUCTION_ACCESS_URL = `${LPB_BASE_URL}/v0/consumers/production-requests`;
export const LPB_PROVIDERS_URL = `${LPB_BASE_URL}/v0/providers/transformations/legacy.json?environment=sandbox`;
export const LPB_CONTACT_US_URL = `${LPB_BASE_URL}/v0/support/contact-us/requests`;

export const APPLY_ACG_APIS = ['claims', 'communityCare', 'health', 'verification'];
export const APPLY_CCG_APIS = ['claims', 'health', 'lgyGuarantyRemittance'];
export const PAGE_HEADER_ID = 'page-header';
export const PAGE_HEADER_AND_HALO_ID = 'header-halo';
export const FLAG_API_ENABLED_PROPERTY = 'enabled';
export const FLAG_CATEGORIES = 'categories';
export const FLAG_DEACTIVATED_APIS = 'deactivated_apis';
export const FLAG_ENABLED_APIS = 'enabled';
export const FLAG_HOSTED_APIS = 'hosted_apis';
export const FLAG_SHOW_TESTING_NOTICE = 'show_testing_notice';
export enum yesOrNoValues {
  Yes = 'yes',
  No = 'no',
}
export enum apiLoadingState {
  IN_PROGRESS = 'in_progress',
  LOADED = 'loaded',
  ERROR = 'error',
}
