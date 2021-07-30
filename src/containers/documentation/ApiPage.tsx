import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import * as React from 'react';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { isApiDeactivated, isApiDeprecated } from '../../apiDefs/deprecated';

import { lookupApiByFragment, lookupApiCategory } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { PageHeader } from '../../components';
import ExplorePage from '../../content/explorePage.mdx';
import { Flag } from '../../flags';

import { APINameParam, RootState } from '../../types';
import { APIContent } from '../../types/content';
import { FLAG_API_ENABLED_PROPERTY } from '../../types/constants';
import ApiDocumentation from './ApiDocumentation';
import ApiNotFoundPage from './ApiNotFoundPage';

const DeactivationMessage = ({
  api,
  content,
}: { api: APIDescription; content: APIContent }): JSX.Element | null => {
  /*
   * This code should be unneeded but is required for the linter. Without this
   * code DeactivationMessage will still return null (isApiDeprecated and
   * isApiDeactivated will both return false when api.deactivationInfo is
   * undefined, resulting in a null return on DeactivationMessage).
   * The linter does not catch this and thinks that api.deactivationInfo could
   * be undefined further down, even though the DeactionMessage would return
   * null before hitting that code.
   */
  if (!api.deactivationInfo) {
    return null;
  }

  const isDeprecated = isApiDeprecated(api);
  const isDeactivated = isApiDeactivated(api);

  if (!isDeprecated && !isDeactivated) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const message = isDeactivated ? content.deactivationNotice! : content.deprecationNotice!;
  return (
    <div className={classNames('usa-alert', 'usa-alert-info', 'va-api-alert-box')}>
      <div className={classNames('usa-alert-body')}>
        <Markdown>{message}</Markdown>
      </div>
    </div>
  );
};

const getApi = (apiName?: string): APIDescription | null => {
  if (!apiName) {
    return null;
  }

  return lookupApiByFragment(apiName);
};

const ApiPage = (): JSX.Element => {
  const location = useLocation();
  const params = useParams<APINameParam>();

  const api = getApi(params.apiName);
  const category = lookupApiCategory(params.apiCategoryKey);
  const content = useSelector<RootState, APIContent | undefined>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    state => state.content.apis![api?.urlFragment ?? '']
  );

  if (api === null || !category?.apis.includes(api) || !content) {
    return <ApiNotFoundPage />;
  }

  return (
    <Flag
      name={[FLAG_API_ENABLED_PROPERTY, api.urlFragment]}
      fallbackRender={(): JSX.Element => <ExplorePage />}
    >
      <Helmet>
        <title>{api.name} Documentation</title>
      </Helmet>
      <PageHeader halo={category.name} header={api.name} />
      {content.veteranNotice && (
        <AlertBox
          status="info"
          key={api.urlFragment}
          className={classNames('vads-u-margin-bottom--2', 'vads-u-padding-y--1')}
        >
          <Markdown>{content.veteranNotice}</Markdown>
        </AlertBox>
      )}
      <DeactivationMessage api={api} content={content} />
      {!isApiDeactivated(api) && <ApiDocumentation apiDefinition={api} location={location} />}
    </Flag>
  );
};

ApiPage.propTypes = {};
export default ApiPage;
