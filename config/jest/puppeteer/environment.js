const puppeteer = require('puppeteer');
const fs = require('fs');
const wsEndpointPath = require('./puppeteer-helper').wsEndpointPath;
const NodeEnvironment = require('jest-environment-node');

// This class needs to be in this file instead of the puppeteer-helper.js. It's something about how
// jest sets up.
/**
* Defines a PuppeteerEnvironment extending NodeEnvironment from the jest-environment-node package.
* This environment describes a jest testing environment for puppeteer
*/
class PuppeteerEnvironment extends NodeEnvironment {
 constructor(config) {
   super(config);
 }

 async setup() {
   await super.setup();

   // connect to puppeteer
   const wsEndpoint = fs.readFileSync(wsEndpointPath, 'utf8');
   if (!wsEndpoint) {
     throw new Error('wsEndpoint not found');
   }

   // define globals that can be accessed within tests
   // connect to the puppeteer browser at the websocket endpoint
   this.global.__BROWSER__ = await puppeteer.connect({
     browserWSEndpoint: wsEndpoint,
   });
   this.global.page = await this.global.__BROWSER__.newPage();
 }

 async teardown() {
   await super.teardown();
 }

 runScript(script) {
   return super.runScript(script);
 }
}

module.exports = PuppeteerEnvironment;
