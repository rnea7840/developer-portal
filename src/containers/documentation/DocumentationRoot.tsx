import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Switch, useParams } from 'react-router-dom';

import { getApiCategoryOrder, getApiDefinitions, lookupApiCategory } from '../../apiDefs/query';
import { APICategory, APIDescription } from '../../apiDefs/schema';
import { ContentWithNav, SideNavEntry } from '../../components';
import { Flag } from '../../flags';
import { APINameParam, CategoriesContent, RootState } from '../../types';
import {
  loadAPIContent,
  LoadAPIContentThunk,
  loadCategoryContent,
  LoadCategoryContentThunk,
} from '../../actions/content';
import {
  CURRENT_VERSION_IDENTIFIER,
  FLAG_CATEGORIES,
  FLAG_HOSTED_APIS,
} from '../../types/constants';
import ApiPage from './ApiPage';
import { AuthorizationDocs } from './AuthorizationDocs';
import CategoryPage from './CategoryPage';
import DocumentationOverview from './DocumentationOverview';
import QuickstartPage from './QuickstartPage';

import './Documentation.scss';

const SideNavApiEntry = (apiCategoryKey: string, api: APIDescription): JSX.Element => (
  <Flag key={api.urlFragment} name={[FLAG_HOSTED_APIS, api.urlFragment]}>
    <SideNavEntry
      key={api.urlFragment}
      exact
      to={`/explore/${apiCategoryKey}/docs/${api.urlFragment}?version=${CURRENT_VERSION_IDENTIFIER}`}
      name={
        <>
          {api.name}
          {api.vaInternalOnly && (
            <small className="vads-u-display--block">Internal VA use only.</small>
          )}
          {api.trustedPartnerOnly && (
            <small className="vads-u-display--block">
              Internal VA use only.{/* Trusted Partner use only.*/}
            </small>
          )}
        </>
      }
      subNavLevel={1}
    />
  </Flag>
);

const ExploreSideNav = (): JSX.Element => {
  const apiCategoryOrder: string[] = getApiCategoryOrder();
  const apiDefinitions = getApiDefinitions();
  const categoryContent = useSelector<RootState, CategoriesContent>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    state => state.content.categories!,
  );

  return (
    <>
      <SideNavEntry key="all" exact to="/explore" name="Overview" />
      <SideNavEntry
        key="authorization"
        to="/explore/authorization"
        name="Authorization"
        forceAriaCurrent
      />
      {apiCategoryOrder.map((categoryKey: string) => {
        const apiCategory: APICategory = apiDefinitions[categoryKey];
        return (
          <Flag name={[FLAG_CATEGORIES, categoryKey]} key={categoryKey}>
            <SideNavEntry
              to={`/explore/${categoryKey}`}
              id={`side-nav-category-link-${categoryKey}`}
              className="side-nav-category-link"
              name={apiCategory.name}
            >
              {categoryContent[categoryKey].quickstart && (
                <SideNavEntry
                  exact
                  to={`/explore/${categoryKey}/docs/quickstart`}
                  name="Quickstart"
                  subNavLevel={1}
                />
              )}
              {apiCategory.apis.map((api: APIDescription) => SideNavApiEntry(categoryKey, api))}
            </SideNavEntry>
          </Flag>
        );
      })}
    </>
  );
};

const oldRouteToNew = [
  {
    from: '/explore/verification/docs/disability_rating',
    to: '/explore/verification/docs/veteran_verification',
  },
  {
    from: '/explore/verification/docs/service_history',
    to: '/explore/verification/docs/veteran_verification',
  },
  {
    from: '/explore/benefits/docs/appeals',
    to: '/explore/appeals/docs/appeals',
  },
  {
    from: '/explore/verification/docs/authorization',
    to: '/explore/authorization?api=veteran_verification',
  },
];

const DocumentationRoot = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch<LoadCategoryContentThunk | LoadAPIContentThunk>>();
  useEffect(() => {
    dispatch(loadCategoryContent());
    dispatch(loadAPIContent());
  }, [dispatch]);

  const { apiCategoryKey } = useParams<APINameParam>();
  const shouldRouteCategory = !apiCategoryKey || lookupApiCategory(apiCategoryKey) != null;
  const categoryContent = useSelector<RootState>(state => state.content.categories);
  const apiContent = useSelector<RootState>(state => state.content.apis);
  // console.log('DocumentationRoot categories', categoryContent);
  // console.log('DocumentationRoot APIs', apiContent);
  const isContentLoaded = !!(categoryContent && apiContent);

  return isContentLoaded ? (
    <ContentWithNav
      nav={<ExploreSideNav />}
      content={
        <Switch>
          {oldRouteToNew.map(routes => (
            <Redirect key={routes.from} exact from={routes.from} to={routes.to} />
          ))}
          <Route path="/explore/authorization" component={AuthorizationDocs} exact />
          {!shouldRouteCategory && <Redirect from="/explore/:apiCategoryKey" to="/404" />}
          <Route exact path="/explore/" component={DocumentationOverview} />
          <Route exact path="/explore/:apiCategoryKey" component={CategoryPage} />
          <Route exact path="/explore/:apiCategoryKey/docs/authorization">
            <Redirect to="/explore/authorization" />
          </Route>
          <Route exact path="/explore/:apiCategoryKey/docs/quickstart" component={QuickstartPage} />
          <Route exact path="/explore/:apiCategoryKey/docs/:apiName" component={ApiPage} />
        </Switch>
      }
      navAriaLabel="API Docs Side Nav"
      className="documentation"
    />
  ) : <LoadingIndicator message="Loading..." />;
};

export default DocumentationRoot;
