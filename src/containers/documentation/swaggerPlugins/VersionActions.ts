import { APIMetadata } from '../../../types';

interface SetAPIMetadataAction {
  payload: APIMetadata;
  type: string;
}

interface SetAPIVersionAction {
  payload: string;
  type: string;
}

interface UpdateVersionAction {
  type: string;
}

interface VersionActions {
  actions: {
    setApiMetadata: (metadata: APIMetadata) => SetAPIMetadataAction;
    setApiVersion: (version: string) => SetAPIVersionAction;
    updateVersion: (version: string) => UpdateVersionAction;
  };
}

const actions = (updateVersionHandler: (version: string) => void): VersionActions => ({
  actions: {
    setApiMetadata: (metadata: APIMetadata) => ({
      payload: metadata,
      type: 'API_METADATA_SET',
    }),
    setApiVersion: (version: string) => ({
      payload: version,
      type: 'API_VERSION_SET',
    }),
    updateVersion: (version: string) => {
      updateVersionHandler(version);
      return {
        type: 'API_VERSION_UPDATED',
      };
    },
  },
});

export { actions as VersionActions };
