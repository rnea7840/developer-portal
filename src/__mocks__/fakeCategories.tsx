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
        releaseNotes: '### March 25, 2020 \n One Ring destroyed \n ### June 10, 2019 \n One Ring discovered by Bilbo in Misty Mountains',
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
        releaseNotes: '### April 3, 1005 \n Stolen by Morgoth \n ### December 1, 0215 \n Feanor created the jewels',
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
        releaseNotes: '### September 22, 2019 \n Pippin and Merry got taller \n ### June 11, 2019 \n Bilbo disappeared',
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
        releaseNotes: '### September 21, 2019 \n Moved exiled Numenoreans to Middle-earth \n ### June 12, 2019 \n Released our API',
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
        releaseNotes: '### September 22, 2019 \n Mike Trout homers \n ### June 11, 2019 \n Gerrit Cole strikes out 80',
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
  releaseNotes: '### October 22, 2019 \n a lot of goals get scored \n ### August 11, 2019 \n champions league',
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
