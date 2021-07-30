import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const facilitiesApis: APIDescription[] = [
  {
    // adding an altID to match keys need on the backend for signup
    altID: 'facilities',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/facilities/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'VA Facilities API',
    trustedPartnerOnly: false,
    urlFragment: 'facilities',
    vaInternalOnly: false,
  },
];

export default facilitiesApis;
