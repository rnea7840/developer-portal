const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const puppeteerDirPath = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const wsEndpointPath = path.join(puppeteerDirPath, 'wsEndpoint');

/**
 * Exposes the websocket to test environments by creating a file for it and mapping the puppeteer
 * browser to that file
 * @param {puppeteer.Browser} puppeteerBrowser 
 */
function createWebSocketEndpointFile(puppeteerBrowser) {

  // Create the puppeteer directory if it does not exist
  mkdirp.sync(puppeteerDirPath);
  fs.writeFileSync(wsEndpointPath, puppeteerBrowser.wsEndpoint());
}

/**
 * Removes the puppeteer directory created inside of 'createWebSocketEndpointFile'
 * This is used to effectively remove the web socket endpoint file.
 */
function removePuppeteerDirectory() {
  rimraf.sync(puppeteerDirPath);
}

module.exports = {
  setup: async () => {
    const browser = await puppeteer.launch();
    global.__BROWSER_GLOBAL__ = browser;
    createWebSocketEndpointFile(browser);
  },
  teardown: async () => {
    await global.__BROWSER_GLOBAL__.close();
    removePuppeteerDirectory();
  },
  wsEndpointPath
};
