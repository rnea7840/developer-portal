import { Page } from 'puppeteer';

import { axeCheck, mockSwagger, puppeteerHost, testPaths } from './e2eHelpers';

jest.setTimeout(100000);

const viewports = [
  { width: 1200, height: 800 },
  { width: 768, height: 800 },
  { width: 375, height: 800 },
];

const checkScreenshots = async (page: Page, selector: string) => {
  for (const viewport of viewports) {
    await page.setViewport(viewport);
    await new Promise((resolve, reject) => setTimeout(resolve, 500));
    const content = await page.$(selector)
    if(content) {
      const screenshot = await content.screenshot({});
      expect(screenshot).toMatchImageSnapshot();
    } else {
      fail(`Selector ${selector} not found on the page.`);
    }
  }
};

describe('header visual regression tests', async () => {
  beforeAll(async () => {
    // Set unlimited timeout on first request, since it may timeout while webpack is compiling.
    await page.goto(`${puppeteerHost}`, { waitUntil: 'networkidle0', timeout: 0 });
  });

  it('renders the header properly', async() => {
    await checkScreenshots(page, 'header');
  });

  it('renders the footer properly', async() => {
    await checkScreenshots(page, 'footer');
  })

  for (const path of testPaths) {
    describe(`${path} e2e tests`, async () => {
      beforeAll(async () => {
        // Mock swagger requests on docs pages so those pages aren't blank
        if (/^\/explore\/[^\/]+\/docs\/.+/.test(path)) {
          await page.setRequestInterception(true);
          page.removeAllListeners('request');
          page.on('request', mockSwagger);
        }

        await page.goto(`${puppeteerHost}${path}`, { waitUntil: 'networkidle0' });

        if (path === '/') {
          // Hide problematic video on homepage
          await page.evaluate('document.querySelector("iframe").style="visibility: hidden;"');
        }
      });

      it(`matches the stored screenshots`, async () => {
        await checkScreenshots(page, '.main');
      });

      it('has no aXe violations', async () => {
        await page.addScriptTag({ path: require.resolve('axe-core') });
        const result = await page.evaluate(axeCheck);
        expect(result).toHaveNoViolations();
      })
    });
  }
});
