import { test } from '../../fixtures/app.fixture';

/**
 * HOMEPAGE LOAD
 *
 * Smoke test that homepage renders. Checking basic UX elements.
 */
test.describe('Homepage', () => {
  test(
    '@homepage @smoke homepage should load and show header, search, cart and main content',
    async ({ homePage }) => {
      await homePage.checkPageHealth();
      await homePage.dismissCookieBanner();
      await homePage.expectHomepageElementsVisible();
    });
});