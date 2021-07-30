import * as PropTypes from 'prop-types';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { Redirect, useParams } from 'react-router';
import { APICategoryContent } from '../../types/content';

import { QuickstartWrapper } from '../../components';
import { APINameParam, RootState } from '../../types';

const QuickstartPagePropTypes = {
  match: PropTypes.object.isRequired,
};

const QuickstartPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const content = useSelector<RootState, APICategoryContent>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    state => state.content.categories![apiCategoryKey],
  );

  if (content.quickstart) {
    return <QuickstartWrapper categoryName={content.name} quickstartContent={content.quickstart} />;
  } else {
    return <Redirect to={`/explore/${apiCategoryKey}`} />;
  }
};

QuickstartPage.propTypes = QuickstartPagePropTypes;
export default QuickstartPage;
