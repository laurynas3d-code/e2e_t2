import { test } from '../../fixtures/app.fixture';

/**
 * PRODUCT COMPARE (MEDIUM priority)
 *
 * Covers the product comparison flow from the category page:
 * 1. Add products to compare via CategoryPage.clickAddToCompare()
 * 2. Compare drawer (bottom bar) shows added products, can be closed/reopened via FabMenu
 * 3. "Palyginti" link in the drawer navigates to the compare page, listing the same products
 *
 * POM references:
 * - CategoryPage.clickAddToCompare(count) - clicks "Palyginti" on first N products in the grid
 * - CompareDrawer - bottom drawer with product count, close/remove, and navigation to compare page
 * - FabMenu.clickShowCompare() - reopens the drawer after it has been closed
 * - ComparePage - /produktai/palyginimas, lists compared products
 */
test.describe('Product compare drawer and page', () => {
  const productsToCompareCount = 2; //Count of products to compare

  test.beforeEach(async ({ categoryPage }) => {
    await categoryPage.open();
    await categoryPage.dismissCookieBanner();
  });

  test(
    '@product-compare-drawer @product-compare should add products to compare drawer',
    async ({ categoryPage, compareDrawer, fabMenu }) => {
      await categoryPage.clickAddToCompare(productsToCompareCount);
      await compareDrawer.expectDrawerToBeVisible();
      await compareDrawer.clickClose();
      await compareDrawer.expectDrawerToBeHidden();

      await fabMenu.clickShowCompare();
      await compareDrawer.expectDrawerToBeVisible();
      await compareDrawer.expectProductsCount(productsToCompareCount);
      await compareDrawer.clickRemove();
      await compareDrawer.expectDrawerToBeHidden();
    });

  test(
    '@product-compare-page @product-compare should add products to compare drawer and go and check compare page',
    async ({ categoryPage, compareDrawer }) => {
      await categoryPage.clickAddToCompare(productsToCompareCount);
      await compareDrawer.expectDrawerToBeVisible();
      await compareDrawer.expectProductsCount(productsToCompareCount);
      const comparePage = await compareDrawer.clickCompare();
      await comparePage.expectComparePageHeadingToBeVisible();
      await comparePage.expectProductsCount(productsToCompareCount);
    });
});