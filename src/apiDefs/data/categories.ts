import {
  appealsContent,
  benefitsContent,
  facilitiesContent,
  healthContent,
  vaFormsContent,
  verificationContent,
} from '../../content/apiDocs';

import { IApiCategories } from '../schema';
import appealsApis from './appeals';
import benefitsApis from './benefits';
import facilitiesApis from './facilities';
import healthApis from './health';
import vaForms from './vaForms';
import verificationApis from './verification';

const apiDefinitions: IApiCategories = {
  appeals: {
    apiKey: true,
    apis: appealsApis,
    buttonText: 'Get Your Key',
    content: appealsContent,
    name: 'Appeals',
    properName: 'Appeals',
  },
  benefits: {
    apiKey: true,
    apis: benefitsApis,
    buttonText: 'Get Your Key',
    content: benefitsContent,
    name: 'Benefits',
    properName: 'Benefits',
  },
  facilities: {
    apiKey: true,
    apis: facilitiesApis,
    buttonText: 'Get Your Key',
    content: facilitiesContent,
    name: 'Facilities',
    properName: 'Facilities',
  },
  health: {
    apiKey: false,
    apis: healthApis,
    buttonText: 'Get Your Key',
    content: healthContent,
    name: 'Health',
    properName: 'Health',
    tabBlurb:
      "VA's FHIR Health APIs allow consumers to develop applications using Veteran data. Please see the tabs below for the specific FHIR implementations.",
  },
  vaForms: {
    apiKey: true,
    apis: vaForms,
    buttonText: 'Stay Informed',
    content: vaFormsContent,
    name: 'Forms',
    properName: 'Forms',
  },
  verification: {
    apiKey: false,
    apis: verificationApis,
    buttonText: 'Stay Informed',
    content: verificationContent,
    name: 'Veteran Verification',
    properName: 'Veteran Verification',
  },
};

export const apiCategoryOrder: string[] = [
  'appeals',
  'benefits',
  'facilities',
  'health',
  'vaForms',
  'verification',
];
export default apiDefinitions;
