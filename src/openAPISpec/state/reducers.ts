import { 
  LOAD_OPENAPI_SPEC_ERROR,
  LOAD_OPENAPI_SPEC_START,
  LOAD_OPENAPI_SPEC_SUCCESS,
  LoadOpenAPISpecSyncAction,
} from './actions';
import { OpenAPISpecItem, OpenAPISpecState } from './types';

const specsReducer = (
  state: OpenAPISpecState = {}, 
  action: LoadOpenAPISpecSyncAction,
): OpenAPISpecState => {
  let item: OpenAPISpecItem;
  switch (action.type) {
    case LOAD_OPENAPI_SPEC_START:
      console.log(`Started spec load for API ${action.apiId}`);
      return {
        ... state,
        [action.apiId]: { 
          endpoint: action.endpoint,
          loadState: {
            failed: false,
            loading: true,
          },
        },
      };
    case LOAD_OPENAPI_SPEC_ERROR:
      console.log(`Failed to load spec for API ${action.apiId}`);
      item = state[action.apiId];
      return {
        ... state,
        [action.apiId]: {
          endpoint: item.endpoint,
          loadState: {
            failed: true,
            loading: false,
          },
        },
      };
    case LOAD_OPENAPI_SPEC_SUCCESS:
      console.log(`Successfully loaded spec for API ${action.apiId}`);
      console.log(action.payload);
      item = state[action.apiId];
      return { 
        ... state, 
        [action.apiId]: { 
          endpoint: item.endpoint,
          loadState: {
            failed: false,
            loading: false,
          },
          spec: action.payload, 
        },
      };
    default:
      return state;
  }
};

export default specsReducer;
