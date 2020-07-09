import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { 
  AppRootState,
  OpenAPISpecDefinition, 
} from './types';

export const LOAD_OPENAPI_SPEC_START = 'LOAD_OPENAPI_SPEC_START';
export const LOAD_OPENAPI_SPEC_SUCCESS = 'LOAD_OPENAPI_SPEC_SUCCESS';
export const LOAD_OPENAPI_SPEC_ERROR = 'LOAD_OPENAPI_SPEC_ERROR';
type LOAD_OPENAPI_SPEC_START = typeof LOAD_OPENAPI_SPEC_START;
type LOAD_OPENAPI_SPEC_SUCCESS = typeof LOAD_OPENAPI_SPEC_SUCCESS;
type LOAD_OPENAPI_SPEC_ERROR = typeof LOAD_OPENAPI_SPEC_ERROR;

export interface LoadOpenAPISpecStartAction extends Action {
  type: LOAD_OPENAPI_SPEC_START;
  apiId: string;
  endpoint: string;
}

export interface LoadOpenAPISpecSuccessAction extends Action {
  type: LOAD_OPENAPI_SPEC_SUCCESS;
  apiId: string;
  payload: OpenAPISpecDefinition;
}

export interface LoadOpenAPISpecErrorAction extends Action {
  type: LOAD_OPENAPI_SPEC_ERROR;
  apiId: string;
}

export type LoadOpenAPISpecSyncAction = 
  LoadOpenAPISpecStartAction | LoadOpenAPISpecSuccessAction | LoadOpenAPISpecErrorAction;

export type LoadOpenAPISpecAction = ThunkAction<
  Promise<LoadOpenAPISpecSyncAction>,
  AppRootState,
  undefined,
  LoadOpenAPISpecSyncAction
>;

export const loadOpenAPISpecStart: ActionCreator<LoadOpenAPISpecStartAction> = (
  apiId: string,
  endpoint: string,
) => {
  return {
    apiId,
    endpoint,
    type: LOAD_OPENAPI_SPEC_START,
  };
};

export const loadOpenAPISpecSuccess: ActionCreator<LoadOpenAPISpecSuccessAction> = (
  apiId: string,
  specData: OpenAPISpecDefinition,
) => {
  return {
    apiId,
    payload: specData,
    type: LOAD_OPENAPI_SPEC_SUCCESS,
  };
};

export const loadOpenAPISpecError: ActionCreator<LoadOpenAPISpecErrorAction> = (
  apiId: string,
) => {
  return {
    apiId,
    type: LOAD_OPENAPI_SPEC_ERROR,
  };
};

export type OpenAPIDispatch = ThunkDispatch<
  AppRootState,
  undefined,
  LoadOpenAPISpecSyncAction
>;

export const loadOpenAPISpec: ActionCreator<LoadOpenAPISpecAction> = (
  apiId: string,
  endpoint: string,
) => {
  return (dispatch: OpenAPIDispatch, getState: () => AppRootState) => {
    dispatch(loadOpenAPISpecStart(apiId, endpoint));
    const specItem = getState().specs[apiId];
    if (specItem.spec) {
      // use cached spec
      return Promise.resolve(dispatch(loadOpenAPISpecSuccess(apiId, specItem.spec)));
    }

    const request = new Request(endpoint, {
      headers: {
        accept: 'application/json',
      },
    });
    
    return fetch(request)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not load spec for API ${apiId}: response code ${response.status}`);
        }

        return response.json();
      })
      .then((data: OpenAPISpecDefinition) => {
        return dispatch(loadOpenAPISpecSuccess(apiId, data));
      })
      .catch(() => {
        return dispatch(loadOpenAPISpecError(apiId));
      });
  };
};
