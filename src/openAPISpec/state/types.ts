export interface Operation {
  tags: string[];
  summary?: string;
  description?: string;
  operationId?: string;
}

export interface Path {
  summary?: string;
  description?: string;
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
  trace?: Operation;
}

export interface Paths {
  [path: string]: Path;
}

export interface OpenAPISpecDefinition {
  paths: Paths;
}

export interface SpecLoadState {
  loading: boolean;
  failed: boolean;
}

export interface OpenAPISpecItem {
  endpoint: string;
  spec?: OpenAPISpecDefinition;
  loadState: SpecLoadState;
}

export interface OpenAPISpecState {
  [apiId: string]: OpenAPISpecItem;
}

export interface AppRootState {
  specs: OpenAPISpecState;
}
