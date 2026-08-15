import { test as base } from '@playwright/test';
import { BasePage } from '../page-objects/base-page';
import { HealthPage } from '../page-objects/components/health-page';
import { HomePage } from '../page-objects/pages/home-page';

// Type register
type AppFixtures = {
  basePage: BasePage;
  healthPage: HealthPage;
  homePage: HomePage;
};

// 2. Basic test with the fixture
export const test = base.extend<AppFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page)); // Create BasePage class object and give it to test
  },

  healthPage: async ({ page }, use) => {
    await use(new HealthPage(page)); // Create HealthPage class object and give it to test
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page)); // Create HomePage class object and give it to test
  }
});

export { expect } from '@playwright/test';