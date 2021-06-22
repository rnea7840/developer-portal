import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Redirect, useParams } from 'react-router';

import { getApiDefinitions, lookupApiByFragment } from '../../apiDefs/query';
import { QuickstartWrapper } from '../../components';
import { APINameParam } from '../../types';

const QuickstartPagePropTypes = {
  match: PropTypes.object.isRequired,
};

const QuickstartPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const {
    content: { quickstart: quickstartContent },
    name,
  } = getApiDefinitions()[apiCategoryKey];

  if (quickstartContent) {
    return <QuickstartWrapper categoryName={name} quickstartContent={quickstartContent} />;
  } else {
    const apiLookup = lookupApiByFragment(apiCategoryKey);
    if (apiLookup) {
      return <Redirect to={`/explore/${apiCategoryKey}`} />;
    }
    return <Redirect to="/404" />;
  }
};

QuickstartPage.propTypes = QuickstartPagePropTypes;
export default QuickstartPage;
