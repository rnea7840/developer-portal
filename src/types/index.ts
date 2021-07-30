import { APICategoryContent, APIContent } from './content';

export * from './apply';

export interface APINameParam {
  apiName?: string;
  apiCategoryKey: string;
}

export interface VersionMetadata {
  version: string;
  path: string;
  status: string;
  internal_only: boolean;
  healthcheck: string;
}

export interface APIMetadata {
  meta: {
    versions: VersionMetadata[];
  };
}

export interface APIVersioning {
  defaultUrl: string;
  versions: VersionMetadata[] | null;
  requestedApiVersion: string;
}

export interface OAuthAPISelection {
  selectedOAuthApi: string;
}

// only content shared across pages that is managed in the Redux store
export interface CategoriesContent {
  [key: string]: APICategoryContent;
}

export interface APIsContent {
  [key: string]: APIContent;
}

export interface AppContent {
  categories: CategoriesContent | null;
  apis: APIsContent | null;
}

export interface RootState {
  oAuthApiSelection: OAuthAPISelection;
  apiVersioning: APIVersioning;
  content: AppContent;
}
