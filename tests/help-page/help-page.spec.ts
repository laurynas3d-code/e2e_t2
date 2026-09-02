import { test } from '../../fixtures/app.fixture';
import { testData } from '../../data/test-data';

/**
 * HELP PAGE (Medium value, low effort)
 *
 * Smoke test that help/support page loads. Critical for support and legal access.
 */
test.describe('Help page', () => {
  test('@help-page @smoke it should load help page', async ({ helpPage }) => {
    await helpPage.open(testData.urls.help_page);
    await helpPage.dismissCookieBanner();
    await helpPage.expectHelpPageReady();
  });
});