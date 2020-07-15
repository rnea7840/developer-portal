import { createSelector } from 'reselect';
import {
  APIComponentProps,
  APIEndpointComponentProps,
  AppRootState,
  OpenAPISpecDefinition,
  OpenAPISpecItem,
  Operation,
  Parameter,
  Path,
} from '../types';

export const getAPISpec = (
  state: AppRootState,
  props: APIComponentProps,
): OpenAPISpecDefinition | null => {
  const specItem: OpenAPISpecItem = state.specs[props.apiId];
  if (!specItem || !specItem.spec) {
    return null;
  }

  return specItem.spec;
};

const getEndpointPath = (state: AppRootState, props: APIEndpointComponentProps): string =>
  props.path;

const getEndpointMethod = (state: AppRootState, props: APIEndpointComponentProps): string =>
  props.httpMethod;

const makeGetPath = () => {
  return createSelector(
    getAPISpec,
    getEndpointPath,
    getEndpointMethod,
    (apiSpec: OpenAPISpecDefinition | null, path: string): Path | null => {
      return apiSpec == null || !apiSpec.paths[path] ? null : apiSpec.paths[path];
    },
  );
};

export const makeGetOperation = () => {
  return createSelector<
    AppRootState,
    APIEndpointComponentProps,
    Path | null,
    string,
    Operation | null
  >(
    makeGetPath(),
    getEndpointMethod,
    (path: Path | null, httpMethod: string): Operation | null => {
      return path == null || !path[httpMethod] ? null : path[httpMethod];
    },
  );
};

export const makeGetEndpointParameters = () => {
  return createSelector<
    AppRootState,
    APIEndpointComponentProps,
    Path | null,
    Operation | null,
    Parameter[]
  >(
    makeGetPath(),
    makeGetOperation(),
    (path: Path | null, operation: Operation | null): Parameter[] => {
      if (path == null || operation == null) {
        return [];
      }

      const uniqueOpParams = new Set(
        operation.parameters.map((p: Parameter) => `${p.in}-${p.name}`),
      );
      const pathParams = (path.parameters || []).filter(
        (p: Parameter) => !uniqueOpParams.has(`${p.in}-${p.name}`),
      );

      return [...pathParams, ...operation.parameters];
    },
  );
};
