import { RouterState } from 'react-router-redux';
import { AppRootState, OpenAPISpecState } from '../openAPISpec';
import { IApplication } from './apply';

export * from './apply';
export * from './form';

export interface IApiNameParam {
  apiName?: string;
  apiCategoryKey: string;
}

export interface IApiVersioning {
  docUrl: string;
  metadata: any;
  requestedApiVersion: string;
}

export interface IRootState extends AppRootState {
  apiVersioning: IApiVersioning;
  application: IApplication;
  routing: RouterState;
  specs: OpenAPISpecState;
}
