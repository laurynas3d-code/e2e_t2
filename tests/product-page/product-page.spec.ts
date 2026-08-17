import { test } from '../../fixtures/app.fixture';

/**
 * PRODUCT  PAGE LOAD
 *
 * Smoke test that product page renders.
 *
 * INSTRUCTIONS:
 * - Navigates via category → first product link (avoids hardcoding SKU)
 * - Asserts product content visible (product title, breadcrumbs, add to cart button)
 * - If category is empty, test may fail
 */

test.describe('Product page', () => {
  test(
    '@product-page @smoke product page should load, show heading and has breadcrumbs visible and add to cart button',
    async ({ categoryPage }) => {
      await categoryPage.open();
      await categoryPage.dismissCookieBanner();
      const productPage = await categoryPage.openFirstProduct();
      await productPage.expectProductTitleVisible();
      await productPage.expectBreadcrumbsVisible();
      await productPage.expectAddToCartButtonVisible();
    },
  );
});