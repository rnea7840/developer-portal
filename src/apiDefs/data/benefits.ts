import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const benefitsApis: APIDescription[] = [
  {
    // adding an altID to match keys need on the backend for signup
    altID: 'claims',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/claims/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/claims/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Benefits Claims API',
    oAuth: true,
    oAuthInfo: {
      baseAuthPath: '/oauth2/claims/v1',
      scopes: ['profile', 'openid', 'offline_access', 'claim.read', 'claim.write'],
    },
    trustedPartnerOnly: false,
    urlFragment: 'claims',
    vaInternalOnly: false,
  },
  {
    altID: 'benefits',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/vba_documents/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/vba_documents/docs/v2/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Benefits Intake',
    trustedPartnerOnly: false,
    urlFragment: 'benefits',
    vaInternalOnly: false,
  },
  {
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/loan_guaranty/docs/v1/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Loan Guaranty',
    trustedPartnerOnly: true,
    urlFragment: 'loan_guaranty',
    vaInternalOnly: false,
  },
  // {
  //   description: 'Improve claim routing',
  //   docSources: [
  //     {
  //       openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/claims-attributes/v1/openapi.json`,
  //     },
  //   ],
  //   enabledByDefault: false,
  //   name: 'Claims Attributes',
  //   releaseNotes: ClaimsAttributesReleaseNotes,
  //   trustedPartnerOnly: false,
  //   urlFragment: 'claims_attributes',
  //   vaInternalOnly: false,
  // },
];

export default benefitsApis;
