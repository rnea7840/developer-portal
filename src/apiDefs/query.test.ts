/**
 * This file contains unit tests for the query.ts module in this directory. Because query.ts
 * is the only module that accesses data from the Typescript definition files in data/ directly,
 * we cannot currently mock the dependencies of these functions. Because query is a core module for
 * this application, however, it is better not to leave these functions untested. Therefore, this
 * test suite tests high-level results of these functions by querying our real data. When the source
 * of that data changes from Typescript objects to a database, we can mock the calls to the database
 * instead of checking real data.
 *
 * In the meantime, these tests are limited to checking properties of our APIs that should be relatively
 * stable over time, so that they will not break for the majority of pull requests to developer-portal.
 * If you make a significant change to one of the APIs, you may need to update these tests, but that
 * should be a rare occurrence. If you need to add tests to this file, please respect this convention
 * and avoid testing with data that is likely to change over time.
 */

/* eslint-disable max-nested-callbacks -- Jest callbacks */
import 'jest';
import { setApis } from '../actions';
import store from '../store';
import { fakeCategories } from '../__mocks__/fakeCategories';
import {
  apisFor,
  getAllQuickstartCategorySlugs,
  includesOAuthAPI,
  lookupApiByFragment,
  lookupApiCategory,
  includesInternalOnlyAPI,
  onlyOpenDataAPIs,
  includesOpenDataAPI,
} from './query';
import { APIDescription, ProdAccessFormSteps, VaInternalOnly } from './schema';

const rings: APIDescription = {
  categoryUrlFragment: 'movies',
  description: 'One Ring to rule them all',
  docSources: [], // doesn't matter yet
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Four,
  name: 'Rings API',
  openData: false,
  releaseNotes:
    '### March 25, 2020\n\nOne Ring destroyed\n\n\n---\n\n### June 10, 2019\n\nOne Ring discovered by Bilbo in Misty Mountains\n',
  urlFragment: 'rings',
};

const apollo13: APIDescription = {
  altID: 'apollo13',
  categoryUrlFragment: 'movies',
  description: "When a trip to the moon doesn't go according to plan",
  docSources: [],
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Three,
  name: 'Apollo 13 API',
  oAuth: true,
  oAuthInfo: {
    ccgInfo: {
      baseAuthPath: '/oauth2/apollo_13/v1',
      productionAud: 'sample-productionAud',
      sandboxAud: 'sample-sandboxAud',
      scopes: [],
    },
  },
  oAuthTypes: ['ClientCredentialsGrant'],
  openData: false,
  releaseNotes:
    '### April 11, 1970\n\nLaunch!\n\n\n---\n\n### April 14, 1970\n\nOxygen tank #2 is unhappy.\n\n\n---\n\n### April 17, 1970\n\nSplashdown. The crew arrives home safely.\n',
  urlFragment: 'apollo_13',
};

const theMartian: APIDescription = {
  altID: 'the_martian',
  categoryUrlFragment: 'movies',
  description:
    'Mark Watney (played by Matt Damon) is stranded on Mars forced to survive alone for over a year.',
  docSources: [], // doesn't matter here
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Four,
  name: 'The Martian API',
  openData: false,
  releaseNotes:
    '### November 25, 2035\n\nA powerful storm hits the Ares III landing site forcing an evacuation during which Mark Watney is struck by debris and assumed to be dead.\n\n\n---\n\n### November 26, 2035\n\nMark Watney is not dead, just very sleepy and injured.\n\n\n---\n\n### February 2037\n\nMark Watney leaves Mars in a convertable space ship and rejoins his crew on the Hermes.\nYay!\n',
  urlFragment: 'the_martian',
  vaInternalOnly: VaInternalOnly.AdditionalDetails,
};

const basketball: APIDescription = {
  categoryUrlFragment: 'sports',
  description: 'stuff about hoops or whatever',
  docSources: [], // doesn't matter here
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Three,
  name: 'Basketball API',
  openData: true,
  releaseNotes:
    '### September 21, 2019\n\nMoved exiled Numenoreans to Middle-earth\n\n\n---\n\n### June 12, 2019\n\nReleased our API\n',
  urlFragment: 'basketball',
};

describe('query module', () => {
  store.dispatch(setApis(fakeCategories));

  describe('lookupApiByFragment', () => {
    it('finds the API if it is defined', () => {
      const api = lookupApiByFragment('rings');
      expect(api).toEqual(rings);
    });

    it('returns null if the API does not exist', () => {
      expect(lookupApiByFragment('fake')).toBeNull();
    });
  });

  describe('lookupApiCategory', () => {
    /**
     * This test checks relatively stable properties of our API categories. If our API
     * categories change substantially in the future, this test will need to be updated.
     */
    it('returns the API category definition if it is defined', () => {
      const moviesApi = lookupApiCategory('movies');
      expect(moviesApi).not.toBeNull();
      expect(moviesApi?.apis.length).toEqual(3);
      expect(moviesApi?.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(2);

      const sportsApi = lookupApiCategory('sports');
      expect(sportsApi).not.toBeNull();
      expect(sportsApi?.apis.length).toEqual(2);
      expect(sportsApi?.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(0);

      const lotrApi = lookupApiCategory('lotr');
      expect(lotrApi).not.toBeNull();
      expect(lotrApi?.apis.length).toEqual(3);
      expect(lotrApi?.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(0);
    });

    it('returns null for an API that does not exist', () => {
      expect(lookupApiCategory('fake')).toBeNull();
    });
  });

  describe('includeOauthAPI', () => {
    it('returns true if the list includes an API that is marked as OAuth at the API level', () => {
      expect(includesOAuthAPI(['apollo13', 'armageddon'])).toBe(true);
    });

    it('returns false if the list does not include any OAuth APIs', () => {
      expect(includesOAuthAPI(['rings', 'silmarils', 'hobbits'])).toBe(false);
    });
  });

  describe('includesInternalOnlyAPI', () => {
    it('returns true if the list includes an API within a key-based category', () => {
      expect(includesInternalOnlyAPI(['the_martian', 'armageddon'])).toBe(true);
    });

    it('returns false if the list does not include any VA Internal Only APIs', () => {
      expect(includesInternalOnlyAPI(['baseball', 'basketball'])).toBe(false);
    });
  });

  describe('onlyOpenDataApis', () => {
    it('returns true if the list includes only Open Data APIs', () => {
      expect(onlyOpenDataAPIs(['hobbits', 'basketball'])).toBe(true);
    });

    it('returns false if the list does not include any VA Internal Only APIs', () => {
      expect(onlyOpenDataAPIs(['apollo13', 'baseball', 'armageddon'])).toBe(false);
    });
  });

  describe('getAllQuickstartCategorySlugs', () => {
    it('returns the list of all API category slugs that have a quickstart page', () => {
      expect(getAllQuickstartCategorySlugs()).toStrictEqual(['movies']);
    });
  });

  describe('apisFor', () => {
    it('retrieves the requested APIs', () => {
      const apis = apisFor(['the_martian', 'basketball']);
      expect(apis).toHaveLength(2);
      expect(apis).toContainEqual(theMartian);
      expect(apis).toContainEqual(basketball);
    });

    it('checks both urlFragment and altID', () => {
      // 'verification' is an altID, 'veteran_confirmation' is a urlFragment
      const apis = apisFor(['rings', 'apollo_13']);
      expect(apis).toHaveLength(2);
      expect(apis).toContainEqual(rings);
      expect(apis).toContainEqual(apollo13);
    });
  });

  describe('includesOpenDataAPI', () => {
    it('returns true if the list includes at least 1 Open Data API', () => {
      expect(includesOpenDataAPI(['apollo13', 'basketball'])).toBe(true);
    });

    it('returns false if the list does not include at least 1 Open Data API', () => {
      expect(includesOpenDataAPI(['apollo13', 'rings'])).toBe(false);
    });
  });
});
