import * as React from 'react';
import { APIDescription } from '../../apiDefs/schema';
import { CheckboxRadioField } from '../index';
import { Flag } from '../../flags';
import { FLAG_HOSTED_APIS } from '../../types/constants';

import './APICheckboxList.scss';
import { ExploreApiTags } from '../exploreApiCard/ExploreApiTags';

interface APICheckboxListProps {
  apis: APIDescription[];
  authType: 'acg' | 'apikey' | 'ccg';
}

const ApiCheckboxList = ({ apis, authType }: APICheckboxListProps): JSX.Element => (
  <div className="va-api-api-checkbox-list">
    {apis.map(api => (
      <Flag name={[FLAG_HOSTED_APIS, api.urlFragment]} key={api.urlFragment}>
        <CheckboxRadioField
          type="checkbox"
          name="apis"
          label={
            <>
              <span>{api.name}</span>
              <ExploreApiTags api={api} />
            </>
          }
          value={`${authType}/${api.altID ?? api.urlSlug}`}
          className="vads-u-padding-left--1p5"
        />
      </Flag>
    ))}
  </div>
);

ApiCheckboxList.propTypes = {};

export { ApiCheckboxList };
