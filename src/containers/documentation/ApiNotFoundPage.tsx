import * as React from 'react';

import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { isApiDeactivated } from '../../apiDefs/deprecated';
import { lookupApiByFragment, lookupApiCategory } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { PageHeader } from '../../components';
import { APINameParam } from '../../types';
import { PAGE_HEADER_ID } from '../../types/constants';

const ApiNotFoundPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const category = lookupApiCategory(apiCategoryKey);
  // You can't get to this page without a valid API so this ?? is just for TypeScript's benefit
  const api = lookupApiByFragment(apiCategoryKey) ?? { urlFragment: '' };

  return (
    <div role="region" aria-labelledby={PAGE_HEADER_ID}>
      <AlertBox
        className="vads-u-margin-top--0 va-api-alert-box"
        headline="Page not found."
        content="Try using the links below or the search bar to find your way forward."
        status="warning"
      />
      {category?.name && <PageHeader header={category.name} />}
      <ul>
        {category?.apis
          .filter((item: APIDescription) => !isApiDeactivated(item))
          .map((item: APIDescription) => (
            <li key={item.urlFragment}>
              <Link to={`/explore/${api.urlFragment}/docs/${item.urlFragment}`}>{item.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ApiNotFoundPage;
