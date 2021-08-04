import * as React from 'react';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import classNames from 'classnames';
import { Flag } from '../../flags';
import { getApiDefinitions } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { CardLink, OnlyTags, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { APINameParam, APIsContent, RootState } from '../../types';
import { FLAG_HOSTED_APIS, PAGE_HEADER_ID, FLAG_CONSUMER_DOCS } from '../../types/constants';
import { CONSUMER_PATH } from '../../types/constants/paths';
import { APICategoryContent } from '../../types/content';

const CategoryPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();

  const {
    apis,
  } = getApiDefinitions()[apiCategoryKey];

  const categoryContent = useSelector<
    RootState,
    APICategoryContent
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  >(state => state.content.categories![apiCategoryKey]);

  const apiContent = useSelector<RootState, APIsContent>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    state => state.content.apis!,
  );

  let cardSection;
  if (apis.length > 0) {
    const apiCards = apis.map((apiDesc: APIDescription) => {
      const { urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
      const content = apiContent[apiDesc.urlFragment];
      return (
        <Flag key={apiDesc.urlFragment} name={[FLAG_HOSTED_APIS, urlFragment]}>
          <CardLink
            name={content.name}
            subhead={
              vaInternalOnly || trustedPartnerOnly ? (
                <OnlyTags {...{ trustedPartnerOnly, vaInternalOnly }} />
              ) : undefined
            }
            url={`/explore/${apiCategoryKey}/docs/${urlFragment}`}
            callToAction={`View the ${content.name}`}
          >
            {content.description}
          </CardLink>
        </Flag>
      );
    });

    cardSection = (
      <div role="navigation" aria-labelledby={PAGE_HEADER_ID}>
        <div className={defaultFlexContainer()}>{apiCards}</div>
      </div>
    );
  }

  return (
    <div className="va-api-api-overview">
      <Helmet>
        <title>{categoryContent.name}</title>
      </Helmet>
      <PageHeader header={categoryContent.name} />
      {categoryContent.veteranNotice && (
        <AlertBox
          status="info"
          key={apiCategoryKey}
          className={classNames('vads-u-margin-bottom--2', 'vads-u-padding-y--1')}
        >
          <Markdown>{categoryContent.veteranNotice}</Markdown>
        </AlertBox>
      )}
      <div className="vads-u-width--full">
        <Markdown>{categoryContent.overview}</Markdown>
        <Flag name={[FLAG_CONSUMER_DOCS]}>
          <p>
            <Link to={CONSUMER_PATH}>{categoryContent.consumerDocsLink}</Link>.
          </p>
        </Flag>
      </div>
      {cardSection}
    </div>
  );
};

export default CategoryPage;
