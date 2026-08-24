import { test } from '../../fixtures/app.fixture';

/**
 * MENU  COMPONENT LOAD
 *
 * Smoke test that menu component renders.
 *
 * INSTRUCTIONS:
 * - Navigates to homepage
 * - Asserts top menu links are visible
 * - Asserts main menu links are visible
 * - Clicks first main menu link, hovers over "Telefonai" button, clicks "Visi telefonai" link
 * - Asserts product category page loads and heading is visible
 **/

test.describe('Menu component', () => {

  test.beforeEach(async ({ header }) => {
    await header.open();
    await header.dismissCookieBanner();
  });

  test(
    '@menu @menu-top @homepage @smoke it should show top menu',
    async ({ header }) => {
      await header.expectTopMenuToBeVisible();
    });

  test(
    '@menu @menu-main @homepage @smoke it should show main menu',
    async ({ header }) => {
      await header.expectMainMenuToBeVisible();
    });

  test(
    '@menu @menu-main-navigate @homepage @smoke it should be able to navigate with main menu links',
    async ({ header }) => {
      await header.navigateToMainMenuLink();
    });
});