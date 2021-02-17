import { Page } from 'puppeteer';

// I think we need to do something like this to make page accessible
declare global {
  const page: Page;
}
