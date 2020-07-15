export interface APIComponentProps {
  apiId: string;
}

export interface APIEndpointComponentProps extends APIComponentProps {
  path: string;
  httpMethod: string;
}

export interface OpenAPIInfo {
  description: string;
}

export interface MediaTypeContent {
  schema: object;
}

export interface Parameter {
  name: string;
  in: 'path' | 'query' | 'cookie' | 'header';
  description?: string;
  required?: boolean;
}

export interface RequestBody {
  description?: string;
  required?: boolean;
  content: { [mediaType: string]: MediaTypeContent };
}

export interface Header {
  description?: string;
  required?: boolean;
}

export interface APIResponse {
  description?: string;
  headers: { [headerName: string]: Header };
  content: { [mediaType: string]: MediaTypeContent };
}

export interface Responses {
  [httpStatusCode: string]: APIResponse;
}

export interface Operation {
  tags: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters: Parameter[];
  requestBody?: RequestBody;
  responses: Responses;
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
  parameters?: Parameter[];
}

export interface Paths {
  [path: string]: Path;
}

export interface OpenAPISpecDefinition {
  info: OpenAPIInfo;
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
