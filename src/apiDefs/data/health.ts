/**
 * Note the use of the secondary swagger api instead of the primary for openApiUrl. Health APIs do not have a
 * staging environment setup, as such we can only use `sandbox-api.va.gov` or `api.va.gov` for the openApiUrl host.
 * The primary swagger api is tied to the environment. The secondary swagger api always points to production.
 * Using the primary swagger api would break staging. The swagger url is shown in the UI. In order to avoid the
 * confusion of having a `sandbox-api.va.gov` url shown in production `api.va.gov` (the secondary swagger api) is
 * used in all developer portal environments for health documentation.
 */

import moment from 'moment';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import {
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  FHIRMultiOpenAPIIntro,
  UrgentCareApiIntro,
} from '../../content/apiDocs/health';
import { APIDescription } from '../schema';

const swaggerHost: string = process.env.REACT_APP_VETSGOV_SECONDARY_SWAGGER_API ?? '';
const healthApis: APIDescription[] = [
  // {
  //   // adding an altID to match keys need on the backend for signup
  //   altID: 'clinicalHealth',
  //   description:
  //     'Use to develop clinical-facing applications that improve access to and management of patient health data.',
  //   docSources: [
  //     {
  //       openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/fhir-clinical-health/v0/openapi.json`,
  //     },
  //   ],
  //   enabledByDefault: process.env.REACT_APP_CLINICAL_HEALTH_API === 'true',
  //   name: 'Clinical Health API (FHIR)',
  //   oAuth: true,
  //   oAuthInfo: {
  //     baseAuthPath: '/oauth2/clinical-health/v1',
  //     scopes: [
  //       'profile',
  //       'openid',
  //       'offline_access',
  //       'launch/patient',
  //       'patient/Condition.read',
  //       'patient/Observation.read',
  //       'patient/Patient.read',
  //       'patient/Practitioner.read',
  //     ],
  //   },
  //   releaseNotes: ClinicalHealthReleaseNotes,
  //   trustedPartnerOnly: false,
  //   urlFragment: 'clinical_health',
  //   vaInternalOnly: true,
  // },
  {
    altID: 'communityCare',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/community-care-eligibility/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Community Care Eligibility API',
    oAuth: true,
    oAuthInfo: {
      baseAuthPath: '/oauth2/community-care/v1',
      scopes: [
        'profile',
        'openid',
        'offline_access',
        'launch/patient',
        'patient/CommunityCareEligibility.read',
      ],
    },
    trustedPartnerOnly: false,
    urlFragment: 'community_care',
    vaInternalOnly: false,
  },
  {
    deactivationInfo: {
      deactivationDate: moment('20 Jul 2020 00:00 EDT'),
      deprecationDate: moment('13 Jul 2020 00:00 EDT'),
    },
    docSources: [
      {
        apiIntro: UrgentCareApiIntro,
        openApiUrl: `${swaggerHost}/services/fhir/v0/r4/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Urgent Care Eligibility API (FHIR)',
    oAuth: true,
    trustedPartnerOnly: false,
    urlFragment: 'urgent_care',
    vaInternalOnly: false,
  },
  {
    altID: 'health',
    docSources: [
      {
        key: 'r4',
        label: 'R4',
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/fhir-r4/v0/openapi.json`,
      },
      {
        apiIntro: FhirArgonautApiIntro,
        key: 'argonaut',
        label: 'Argonaut',
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/fhir-argonaut/v0/openapi.json`,
      },
      {
        apiIntro: FhirDSTU2ApiIntro,
        key: 'dstu2',
        label: 'DSTU2',
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/fhir-dstu2/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    multiOpenAPIIntro: FHIRMultiOpenAPIIntro,
    name: 'Veterans Health API (FHIR)',
    oAuth: true,
    oAuthInfo: {
      baseAuthPath: '/oauth2/health/v1',
      scopes: [
        'profile',
        'openid',
        'offline_access',
        'launch/patient',
        'patient/AllergyIntolerance.read',
        'patient/Appointment.read',
        'patient/Condition.read',
        'patient/Device.read',
        'patient/DiagnosticReport.read',
        'patient/Immunization.read',
        'patient/Location.read',
        'patient/Medication.read',
        'patient/MedicationOrder.read',
        'patient/MedicationRequest.read',
        'patient/MedicationStatement.read',
        'patient/Observation.read',
        'patient/Organization.read',
        'patient/Patient.read',
        'patient/Practitioner.read',
        'patient/PractitionerRole.read',
        'patient/Procedure.read',
      ],
    },
    trustedPartnerOnly: false,
    urlFragment: 'fhir',
    vaInternalOnly: false,
  },
  // {
  //   deactivationInfo: {
  //     // see the RFC 2822 date format section here: https://momentjs.com/docs/#/parsing/string-format/
  //     deactivationDate: moment('01 Oct 2019 00:00 EDT'),
  //     deprecationDate: moment('15 Sep 2019 00:00 EDT'),
  //   },
  //   docSources: [
  //     {
  //       openApiUrl: `${swaggerHost}/services/argonaut/v0/openapi.json`,
  //     },
  //   ],
  //   enabledByDefault: true,
  //   name: 'Veterans Health API (Legacy)',
  //   oAuth: true,
  //   trustedPartnerOnly: false,
  //   urlFragment: 'argonaut',
  //   vaInternalOnly: false,
  // },
];

export default healthApis;
