import { System as BaseSystem } from 'swagger-ui';
import { APIMetadata } from '../../../types';
import { curlify } from './curlify';
import DisableTryItOut from './DisableTryItOut';
import ExtendedLayout from './ExtendedLayout';
import OperationTag from './OperationTag';
import './StyleOverride.scss';
import { VersionActions } from './VersionActions';
import { VersionReducers } from './VersionReducers';
import { VersionSelector } from './VersionSelector';
import { WrapHighlightCode } from './WrapHighlightCode';
import { WrapParameters } from './WrapParameters';

export interface System extends BaseSystem {
  // our custom plugins
  versionActions: {
    setApiVersion: (version: string) => void;
    setApiMetadata: (meta: APIMetadata) => void;
  };

  versionSelectors: {
    majorVersion: () => string;
    apiMetadata: () => APIMetadata;
  };
}

export const SwaggerPlugins = (versionHandler: any) => ({
  components: {
    ExtendedLayout,
    OperationTag,
    ServersContainer: () => null,
  },
  fn: {
    curlify,
  },
  statePlugins: {
    spec: {
      ...DisableTryItOut.toggleTryItOut(),
    },
    version: {
      ...VersionActions(versionHandler),
      ...VersionReducers,
      ...VersionSelector,
    },
  },
  wrapComponents: {
    ...DisableTryItOut.toggleAuthorize(),
    ...WrapHighlightCode,
    ...WrapParameters,
  },
});
