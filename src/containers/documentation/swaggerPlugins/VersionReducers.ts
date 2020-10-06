import { Map } from 'immutable';
import { SetAPIMetadataAction, SetAPIVersionAction } from './types';

export const VersionReducers = {
  reducers: {
    API_METADATA_SET: (
      state: Map<string, unknown>,
      action: SetAPIMetadataAction,
    ): Map<string, unknown> => state.set('apiMetadata', action.payload),
    API_VERSION_SET: (
      state: Map<string, unknown>,
      action: SetAPIVersionAction,
    ): Map<string, unknown> => state.set('apiVersion', action.payload),
  },
};
