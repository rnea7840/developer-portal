/* eslint-disable react/display-name */
import moment from 'moment';
import * as React from 'react';
import { APICategories, APIDeactivationInfo, APIDescription, ProdAccessFormSteps } from '../apiDefs/schema';

export const fakeCategoryOrder: string[] = ['lotr', 'sports'];
export const fakeCategories: APICategories = {
  lotr: {
    apis: [
      {
        description: 'One Ring to rule them all',
        docSources: [], // doesn't matter yet
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Four,
        name: 'Rings API',
        openData: false,
        releaseNotes: '',
        urlFragment: 'rings',
        vaInternalOnly: false,
      },
      {
        deactivationInfo: {
          deactivationContent: (): JSX.Element => <div>Silmarils lost forever</div>,
          deactivationDate: moment().subtract(1, 'year'),
          deprecationContent: (): JSX.Element => <div>Morgoth claims the jewels</div>,
          deprecationDate: moment().subtract(15, 'months'),
        },
        description: 'Three pretty gems',
        docSources: [],
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Silmarils API',
        openData: false,
        releaseNotes: '',
        urlFragment: 'silmarils',
        vaInternalOnly: false,
      },
      {
        description: 'Hobbits of the Shire',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Two,
        name: 'Hobbits API',
        openData: false,
        releaseNotes: '',
        urlFragment: 'hobbits',
        vaInternalOnly: false,
      },
    ],
    content: {
      consumerDocsLinkText: 'Take me to the consumer docs!',
      overview: '',
      shortDescription: 'Learn more about things in Middle-earth',
    },
    name: 'LOTR API',
    properName: 'Fancy LOTR API',
  },
  sports: {
    apis: [
      {
        description: 'stuff about hoops or whatever',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Basketball API',
        openData: false,
        releaseNotes: '',
        urlFragment: 'basketball',
        vaInternalOnly: false,
      },
      {
        description: 'a slow summer game',
        docSources: [], // doesn't matter here
        enabledByDefault: false,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Baseball API',
        openData: false,
        releaseNotes: '',
        urlFragment: 'baseball',
        vaInternalOnly: false,
      },
    ],
    content: {
      consumerDocsLinkText: 'Take me to the consumer docs!',
      overview: '',
      shortDescription: 'Learn more about throwing, running, and hitting',
    },
    name: 'Sports API',
    properName: 'Fancy Sports API',
  },
};

export const fakeAPIs: APIDescription[] = Object.values(fakeCategories).flatMap(
  category => category.apis,
);

export const extraAPI: APIDescription = {
  description: 'the beautiful game',
  docSources: [],
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Four,
  name: 'Soccer API',
  openData: false,
  releaseNotes: '',
  urlFragment: 'soccer',
  vaInternalOnly: false,
};

export const extraDeactivationInfo: APIDeactivationInfo = {
  deactivationContent: () => <div>deactivated this API</div>,
  deactivationDate: moment().subtract(3, 'months'),
  deprecationContent: () => <div>deprecated this API</div>,
  deprecationDate: moment().subtract(6, 'months'),
};

export const unmetDeactivationInfo: APIDeactivationInfo = {
  deactivationContent: () => <div data-testid="deactivation-info">This API is deactivated</div>,
  deactivationDate: moment().add(3, 'months'),
  deprecationContent: () => <div data-testid="deprecation-info">This API is deprecated</div>,
  deprecationDate: moment().add(1, 'year'),
};
