import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const appealsApis: APIDescription[] = [
  {
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/appeals/appeals_status/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/appeals/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Appeals Status API',
    trustedPartnerOnly: false,
    urlFragment: 'appeals',
    vaInternalOnly: true,
  },
  {
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/appeals/decision_reviews/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/appeals/docs/v1/decision_reviews`,
      },
    ],
    enabledByDefault: true,
    name: 'Decision Reviews API',
    trustedPartnerOnly: false,
    urlFragment: 'decision_reviews',
    vaInternalOnly: true,
  },
];

export default appealsApis;
