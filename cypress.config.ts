import { defineConfig } from 'cypress';

export default defineConfig({
  blockHosts: [
    'dap.digitalgov.gov',
    'search.usa.gov',
    'www.google-analytics.com',
    'www.googletagmanager.com',
    'googleads.g.doubleclick.net',
    'www.youtube.com',
  ],
  e2e: {
    baseUrl: 'http://localhost:3001',
    excludeSpecPattern: ['accessibility.spec.js', 'smoketest.spec.js', 'visual.spec.js'],
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
    setupNodeEvents: (on, config) => require('./cypress/plugins/index.js')(on, config),
  },
  env: {
    REACT_APP_VETSGOV_SWAGGER_API: 'http://localhost:3001',
  },
  trashAssetsBeforeRuns: false,
  video: false,
});
