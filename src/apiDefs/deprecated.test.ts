import 'jest';
import moment from 'moment';

import { isApiDeactivated, isApiDeprecated } from './deprecated';
import { APIDescription } from './schema';

describe('deprecated API module', () => {
  const apiValues: APIDescription = {
    docSources: [],
    enabledByDefault: true,
    name: 'My API',
    oAuth: false,
    trustedPartnerOnly: false,
    urlFragment: 'my_api',
    vaInternalOnly: false,
  };
  let oldEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    oldEnv = process.env;
    process.env = {
      ...oldEnv,
    };
  });

  afterEach(() => {
    process.env = oldEnv;
  });

  describe('isApiDeprecated', () => {
    it('returns false if deactivationInfo is undefined', () => {
      expect(isApiDeprecated(apiValues)).toBe(false);
    });

    it('returns true if the FF is set', () => {
      process.env = {
        ...oldEnv,
        'REACT_APP_MY_API_DEPRECATED': 'true',
      };
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationDate: moment().add(2, 'month'),
          deprecationDate: moment().add(1, 'month'),
        },
      };

      expect(isApiDeprecated(api)).toBe(true);
    });

    it('returns false if the deprecation date is in the future', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationDate: moment().add(2, 'month'),
          deprecationDate: moment().add(1, 'month'),
        },
      };
      expect(isApiDeprecated(api)).toBe(false);
    });

    it('returns true if the deprecation date is in the past', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationDate: moment().add(2, 'month'),
          deprecationDate: moment().subtract(1, 'month'),
        },
      };
      expect(isApiDeprecated(api)).toBe(true);
    });

    it('returns true if the API is deactivated', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationDate: moment().subtract(1, 'month'),
          deprecationDate: moment().subtract(2, 'month'),
        },
      };
      expect(isApiDeprecated(api)).toBe(true);
    });
  });

  describe('isApiDeactivated', () => {
    it('returns false if deactivationInfo is undefined', () => {
      expect(isApiDeactivated(apiValues)).toBe(false);
    });

    it('returns true if the FF is set', () => {
      process.env = {
        ...oldEnv,
        'REACT_APP_MY_API_DEACTIVATED': 'true',
      };
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationDate: moment().add(2, 'month'),
          deprecationDate: moment().add(1, 'month'),
        },
      };

      expect(isApiDeactivated(api)).toBe(true);
    });

    it('returns false if the API is not deprecated yet', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationDate: moment().add(2, 'month'),
          deprecationDate: moment().add(1, 'month'),
        },
      };
      expect(isApiDeactivated(api)).toBe(false);
    });

    it('returns false if the API is deprecated but the deactivation date is in the future', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationDate: moment().add(2, 'month'),
          deprecationDate: moment().subtract(1, 'month'),
        },
      };
      expect(isApiDeactivated(api)).toBe(false);
    });

    it('returns true if the removal date is in the past', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationDate: moment().subtract(1, 'month'),
          deprecationDate: moment().subtract(2, 'month'),
        },
      };
      expect(isApiDeactivated(api)).toBe(true);
    });
  });
});
