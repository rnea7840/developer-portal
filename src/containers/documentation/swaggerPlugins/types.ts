import { Map } from 'immutable';
import { OutputSelector } from 'reselect';
import { System as BaseSystem } from 'swagger-ui';
import { APIMetadata } from '../../../types';

/**
 * ACTION PLUGINS
 */
export interface SetAPIMetadataAction {
  payload: APIMetadata;
  type: string;
}

export interface SetAPIVersionAction {
  payload: string;
  type: string;
}

interface UpdateVersionAction {
  type: string;
}

export interface SwaggerVersionActions {
  actions: {
    setApiMetadata: (metadata: APIMetadata) => SetAPIMetadataAction;
    setApiVersion: (version: string) => SetAPIVersionAction;
    updateVersion: (version: string) => UpdateVersionAction;
  };
}

/**
 * REDUCER PLUGINS
 */
export interface SwaggerVersionReducers {
  reducers: {
    API_VERSION_SET: (
      state: Map<string, unknown>,
      action: SetAPIVersionAction,
    ) => Map<string, unknown>;

    API_METADATA_SET: (
      state: Map<string, unknown>,
      action: SetAPIMetadataAction,
    ) => Map<string, unknown>;
  };
}

/**
 * SELECTOR PLUGINS
 */
export interface SwaggerVersionSelectors {
  selectors: {
    apiMetadata: (state: Map<string, unknown>) => APIMetadata;
    apiName: (state: Map<string, unknown>) => string;
    apiVersion: (state: Map<string, unknown>) => string;
    majorVersion: OutputSelector<Map<string, unknown>, string, (result: string) => string>;
  };
}

interface SwaggerSpecSelectors {
  wrapSelectors: {
    allowTryItOutFor: () => boolean;
  };
}

/**
 * PLUGINS
 */
export interface SwaggerPlugins {
  components: { [name: string]: React.ComponentType };
  wrapComponents: { [name: string]: React.ComponentType };
  fn: {
    curlify: (options: Record<string, unknown>) => string;
  };

  statePlugins: {
    spec: SwaggerSpecSelectors;
    version: SwaggerVersionActions & SwaggerVersionReducers & SwaggerVersionSelectors;
  };
}

/**
 * SYSTEM WITH PLUGINS
 */
export interface System extends BaseSystem {
  versionActions: {
    setApiVersion: (version: string) => void;
    setApiMetadata: (meta: APIMetadata) => void;
    updateVersion: (version: string) => void;
  };

  versionSelectors: {
    majorVersion: () => string;
    apiMetadata: () => APIMetadata;
    apiVersion: () => string;
  };
}
