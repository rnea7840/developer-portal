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
  const modifiedApiCategoryKey = `${apiCategoryKey}`;

  if (quickstartContent) {
    return <QuickstartWrapper categoryName={name} quickstartContent={quickstartContent} />;
  } else {
    return <Redirect to={`/explore/${modifiedApiCategoryKey}`} />;
  }
};

QuickstartPage.propTypes = QuickstartPagePropTypes;
export default QuickstartPage;
