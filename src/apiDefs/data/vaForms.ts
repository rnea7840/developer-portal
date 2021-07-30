import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const vaFormsApis: APIDescription[] = [
  {
    // adding an altID to match keys need on the backend for signup
    altID: 'vaForms',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/forms/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'VA Forms API',
    trustedPartnerOnly: false,
    urlFragment: 'vaForms',
    vaInternalOnly: false,
  },
];

export default vaFormsApis;
