/* eslint-disable react/display-name */
import moment from 'moment';
import { APICategories, APIDeactivationInfo, APIDescription } from '../apiDefs/schema';

export const fakeCategoryOrder: string[] = ['lotr', 'sports'];
export const fakeCategories: APICategories = {
  lotr: {
    apis: [
      {
        docSources: [], // doesn't matter yet
        enabledByDefault: true,
        name: 'Rings API',
        trustedPartnerOnly: false,
        urlFragment: 'rings',
        vaInternalOnly: false,
      },
      {
        deactivationInfo: {
          deactivationDate: moment().subtract(1, 'year'),
          deprecationDate: moment().subtract(15, 'months'),
        },
        docSources: [],
        enabledByDefault: true,
        name: 'Silmarils API',
        trustedPartnerOnly: false,
        urlFragment: 'silmarils',
        vaInternalOnly: false,
      },
      {
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        name: 'Hobbits API',
        trustedPartnerOnly: false,
        urlFragment: 'hobbits',
        vaInternalOnly: false,
      },
    ],
    name: 'LOTR API',
    properName: 'Fancy LOTR API',
  },
  sports: {
    apis: [
      {
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        name: 'Basketball API',
        trustedPartnerOnly: false,
        urlFragment: 'basketball',
        vaInternalOnly: false,
      },
      {
        docSources: [], // doesn't matter here
        enabledByDefault: false,
        name: 'Baseball API',
        trustedPartnerOnly: false,
        urlFragment: 'baseball',
        vaInternalOnly: false,
      },
    ],
    name: 'Sports API',
    properName: 'Fancy Sports API',
  },
};

export const fakeAPIs: APIDescription[] = Object.values(fakeCategories).flatMap(
  category => category.apis,
);

export const extraAPI: APIDescription = {
  docSources: [],
  enabledByDefault: true,
  name: 'Soccer API',
  trustedPartnerOnly: false,
  urlFragment: 'soccer',
  vaInternalOnly: false,
};

export const extraDeactivationInfo: APIDeactivationInfo = {
  deactivationDate: moment().subtract(3, 'months'),
  deprecationDate: moment().subtract(6, 'months'),
};

export const unmetDeactivationInfo: APIDeactivationInfo = {
  deactivationDate: moment().add(3, 'months'),
  deprecationDate: moment().add(1, 'year'),
};
