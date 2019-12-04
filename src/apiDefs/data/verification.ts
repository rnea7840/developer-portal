import { IApiDescription } from '../schema';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const verificationApis : IApiDescription[] = [
  {
    description: "Obtain data about a Veteran",
    docSources: [
      {
        key: 'disability_rating',
        label: 'Disability Rating',
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/disability_rating`,
      },
      {
        key: 'service_history',
        label: 'Service History',
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/service_history`,
      },
      {
        key: 'veteran_confirmation',
        label: 'Veteran Confirmation',
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/status`,
      },
    ],
    enabledByDefault: true,
    name: 'Veteran Verification',
    urlFragment: 'veteran_verification',
    vaInternalOnly: false,
  },
];

export default verificationApis;
