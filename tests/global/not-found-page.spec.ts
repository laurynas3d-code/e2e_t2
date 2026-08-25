import { test } from '../../fixtures/app.fixture';

/**
 * 404 / NOT FOUND (Medium value, low effort)
 *
 * Asserts non-existent URL shows error page, not crash or blank screen.
 * Uses GlobalErrorContent: "O nee! Kažkas čia ne taip..." or CMS-configured 404 page.
 */
test.describe('404 Not found', () => {
  test('it should show error page for non-existent URL', async ({ notFoundPage }) => {
    await notFoundPage.open();
    await notFoundPage.dismissCookieBanner();
    // GlobalErrorContent shows "O nee! Kažkas čia ne taip..." or CMS 404 content
    await notFoundPage.expectErrorHeadingToBeVisible();
  });
});