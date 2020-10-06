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
