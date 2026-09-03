import { test } from '../../fixtures/app.fixture';
import { testData } from '../../data/test-data';

/**
 * HOMEPAGE LOAD
 *
 * Smoke test that homepage renders. Checking basic UX elements.
 */
test.describe('Homepage', () => {
  test(
    '@homepage @smoke homepage should load and show header, search, cart and main content',
    async ({ healthPage, homePage }) => {
      await healthPage.checkPageHealth(testData.urls.home);
      await homePage.dismissCookieBanner();
      await homePage.expectHomepageElementsToBeVisible();
    });
});