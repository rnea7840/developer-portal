import * as React from 'react';
import { Helmet } from 'react-helmet';
import { getAllApis, lookupApiByFragment } from '../../apiDefs/query';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import { APIDescription } from '../../apiDefs/schema';

const DocumentationExplore = (): JSX.Element => {
  // const apiDefinitions = getApiDefinitions();
  // const apiCategoryOrder = getApiCategoryOrder();

  const allApis = getAllApis();

  const filteredApisList = allApis;
  if (filteredApisList[0]) {
    // eslint-disable-next-line no-console
    console.log(filteredApisList[0]);
    // eslint-disable-next-line no-console
    console.log(lookupApiByFragment(filteredApisList[0].urlFragment));
  }

  return (
    <div className="documentation-overview-wrapper">
      <Helmet>
        <title>Documentation</title>
      </Helmet>
      <PageHeader
        header="Fuzzy Search Demo"
        description="Use search box to filter APIs in real time."
      />
      <ApisLoader>
        <div className={defaultFlexContainer()}>
          {filteredApisList.map((api: APIDescription) => {
            const { name, categoryUrlFragment, description, urlFragment } = api;
            return (
              <CardLink
                key={urlFragment}
                name={name}
                url={`/explore/${categoryUrlFragment}/docs/${urlFragment}`}
                callToAction={`View the ${name}`}
              >
                {description}
              </CardLink>
            );
          })}
        </div>
      </ApisLoader>
    </div>
  );
};

export default DocumentationExplore;
