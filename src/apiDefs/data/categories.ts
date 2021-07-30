import { APICategories } from '../schema';
import appealsApis from './appeals';
import benefitsApis from './benefits';
import facilitiesApis from './facilities';
import healthApis from './health';
import vaForms from './vaForms';
import verificationApis from './verification';

const apiDefinitions: APICategories = {
  appeals: {
    apis: appealsApis,
    name: 'Appeals APIs',
    properName: 'Appeals API',
  },
  benefits: {
    apis: benefitsApis,
    name: 'Benefits APIs',
    properName: 'Benefits Intake API',
  },
  facilities: {
    apis: facilitiesApis,
    name: 'Facilities API',
    properName: 'VA Facilities API',
  },
  health: {
    apis: healthApis,
    name: 'Health APIs',
    properName: 'Health API',
  },
  vaForms: {
    apis: vaForms,
    name: 'Forms API',
    properName: 'VA Form API',
  },
  verification: {
    apis: verificationApis,
    name: 'Veteran Verification APIs',
    properName: 'Veteran Verification API',
  },
};

export const apiCategoryOrder: string[] = [
  'appeals',
  'benefits',
  'facilities',
  'vaForms',
  'health',
  'verification',
];
export default apiDefinitions;
