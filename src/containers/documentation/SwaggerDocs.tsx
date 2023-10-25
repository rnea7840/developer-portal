import * as Sentry from '@sentry/browser';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
// eslint-disable-next-line import/no-extraneous-dependencies
import SwaggerUI from 'swagger-ui-react';
import { usePrevious } from '../../hooks';
import {
  resetVersioning,
  ResetVersioning,
  setVersioning,
  SetVersioning,
  setRequestedApiVersion,
  SetRequestedAPIVersion,
} from '../../actions';
import { APIDocSource } from '../../apiDefs/schema';
import { getDocURL, getVersion } from '../../reducers/apiVersioning';
import { APIMetadata, RootState, VersionMetadata } from '../../types';
import { CURRENT_VERSION_IDENTIFIER } from '../../types/constants';
import { SwaggerPlugins } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';
import VersionSelect from './swaggerPlugins/VersionSelect';

interface SwaggerDocsProps {
  apiName: string;
  docSource: APIDocSource;
}

const getVersionsFromMetadata = async (metadataUrl?: string): Promise<VersionMetadata[] | null> => {
  if (!metadataUrl) {
    return null;
  }
  try {
    const request = new Request(`${metadataUrl}`, { method: 'GET' });
    const response = await fetch(request);
    const metadata = await (response.json() as Promise<APIMetadata>);
    return metadata.meta.versions;
  } catch (error: unknown) {
    Sentry.captureException(error);
    return null;
  }
};

const getVersionFromParams = (searchQuery: string): string => {
  const params = new URLSearchParams(searchQuery || undefined);
  const versionQuery = params.get('version');
  return versionQuery ? versionQuery.toLowerCase() : CURRENT_VERSION_IDENTIFIER;
};

const handleVersionChange =
  (dispatch: React.Dispatch<SetRequestedAPIVersion>): ((requestedVersion: string) => void) =>
  (requestedVersion: string): void => {
    dispatch(setRequestedApiVersion(requestedVersion));
  };

const renderSwaggerUI = (
  defaultUrl: string,
  dispatch: React.Dispatch<SetRequestedAPIVersion>,
  // versionNumber: string,
  // versions: VersionMetadata[] | null,
): JSX.Element => {
  const plugins = SwaggerPlugins(handleVersionChange(dispatch));

  // const ui: System = SwaggerUI({
  //  ,
  // }) as System;
  // ui.versionActions.setApiVersion(versionNumber);
  // ui.versionActions.setVersionMetadata(versions);

  return (
    <SwaggerUI
      defaultModelExpandDepth={99}
      layout="ExtendedLayout"
      plugins={[plugins]}
      url={defaultUrl}
    />
  );
};

const SwaggerDocs = (props: SwaggerDocsProps): JSX.Element => {
  const dispatch: React.Dispatch<ResetVersioning | SetRequestedAPIVersion | SetVersioning> =
    useDispatch();

  const defaultUrlSelector = (state: RootState): string => getDocURL(state.apiVersioning);
  const defaultUrl = useSelector(defaultUrlSelector);
  const location = useLocation();
  const navigate = useNavigate();
  // const versionNumberSelector = (state: RootState): string => getVersionNumber(state.apiVersioning);
  // const versionNumber = useSelector(versionNumberSelector);
  const versionsSelector = (state: RootState): VersionMetadata[] | null =>
    state.apiVersioning.versions;
  const versions = useSelector(versionsSelector);

  // Retrieve an initial version from the params so we can compare it under our effects down below
  const initializing = React.useRef(true);
  const versionSelector = (state: RootState): string => getVersion(state.apiVersioning);
  let version = useSelector(versionSelector);
  if (initializing.current) {
    initializing.current = false;
    // Use the version from the search param only if it's the first render
    version = getVersionFromParams(location.search);
  }

  /*
   * UPDATE DOCS WHEN API NAME CHANGES
   */
  const { apiName } = props;
  const { openApiUrl, metadataUrl } = props.docSource;
  const prevApiName = usePrevious(apiName);

  const setMetadataAndDocUrl = React.useCallback(() => {
    const doSet = async (): Promise<void> => {
      const metadataVersions = await getVersionsFromMetadata(metadataUrl);
      const paramsVersion = getVersionFromParams(location.search);

      dispatch(setVersioning(openApiUrl, metadataVersions, paramsVersion));
    };
    void doSet();
  }, [dispatch, location.search, metadataUrl, openApiUrl]);

  React.useEffect(() => {
    if (prevApiName !== apiName) {
      void setMetadataAndDocUrl();
    }
  }, [apiName, setMetadataAndDocUrl, prevApiName]);

  /**
   * CLEAR REDUX STATE ON UNMOUNT
   */
  React.useEffect(
    () => (): void => {
      dispatch(resetVersioning());
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  /**
   * UPDATES URL WITH CORRECT VERSION PARAM
   */
  const prevVersion = usePrevious(version);

  React.useEffect(() => {
    const setSearchParam = (queryString: string, apiVersion: string): void => {
      const params = new URLSearchParams(queryString);
      if (params.get('version') !== apiVersion) {
        params.set('version', apiVersion);
        navigate(`${location.pathname}?${params.toString()}`);
      }
    };

    if (prevVersion !== version) {
      setSearchParam(location.search, version);
    }
  }, [location.pathname, location.search, navigate, prevVersion, version]);

  /**
   * RENDER
   */
  const { apiIntro } = props.docSource;

  return (
    <React.Fragment>
      {apiIntro !== undefined && <ReactMarkdown>{apiIntro}</ReactMarkdown>}
      {versions && versions.length > 1 && (
        <VersionSelect
          dispatch={dispatch}
          version={version}
          versions={versions}
          handleVersionChange={handleVersionChange}
        />
      )}
      {renderSwaggerUI(defaultUrl, dispatch)}
      {/** renderSwaggerUI(defaultUrl, dispatch , versionNumber, versions */}
    </React.Fragment>
  );
};

export { SwaggerDocs };
