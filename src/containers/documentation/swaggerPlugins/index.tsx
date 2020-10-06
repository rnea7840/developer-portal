import { curlify } from './curlify';
import DisableTryItOut from './DisableTryItOut';
import ExtendedLayout from './ExtendedLayout';
import OperationTag from './OperationTag';
import './StyleOverride.scss';
// import { SwaggerPlugins as Plugins } from './types'; // temp
import { VersionActions } from './VersionActions';
import { VersionReducers } from './VersionReducers';
import { VersionSelector } from './VersionSelector';
import { WrapHighlightCode } from './WrapHighlightCode';
import { WrapParameters } from './WrapParameters';

export * from './types';
export const SwaggerPlugins = (versionHandler: (version: string) => void) => ({
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
      wrapSelectors: {
        allowTryItOutFor: () => false,
      },
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
