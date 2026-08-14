import { test as base } from '@playwright/test';
import { BasePage } from '../page-objects/base-page';

// Type register
type MyFixtures = {
  basePage: BasePage;
};

// 2. Basic test with the fixture
export const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page)); // Create BasePage class object and ive it to test
  },
});

export { expect } from '@playwright/test';