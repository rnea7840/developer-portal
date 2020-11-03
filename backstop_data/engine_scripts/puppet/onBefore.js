const mockData = require('../mockAPIData')
const urlKey = 'http://localhost:3000/services/vba_documents/docs/v0/api'

module.exports = async (page, scenario, vp) => {  

  await require('./loadCookies')(page, scenario);
  await page.setRequestInterception(true);

  page.on('request', request => {
    if (request.url() === 'https://dev-api.va.gov/services/claims/docs/v1/api') {
        request.respond({
            content: 'application/json',
            headers: {"Access-Control-Allow-Origin": "*"},
            body: JSON.stringify(mockData[urlKey])
        });
    }
    else {
        request.continue();
    }
  });
};