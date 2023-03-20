import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    REACT_APP_VETSGOV_SWAGGER_API: 'http://localhost:3001',
  },
  blockHosts: [
    'dap.digitalgov.gov',
    'search.usa.gov',
    'www.google-analytics.com',
    'www.googletagmanager.com',
    'googleads.g.doubleclick.net',
    'www.youtube.com',
  ],
  trashAssetsBeforeRuns: false,
  updateSnapshots: false,
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3001',
    excludeSpecPattern: [
      'accessibility.spec.js',
      'smoketest.spec.js',
      'visual.spec.js',
    ],
  },
})
