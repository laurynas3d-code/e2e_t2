import { test } from '../../fixtures/app.fixture';
/**
 * CART PAGE LOAD
 *
 * Smoke test that cart page renders.
 */
test.describe('Cart page', () => {
  test('@cart-page @smoke cart page should load and has at least one product',
    async ({ categoryPage }) => {
      await categoryPage.open();
      await categoryPage.dismissCookieBanner();

      const productPage = await categoryPage.openFirstProduct();

      await productPage.selectPayNow();

      const cartDrawerPage = await productPage.addToCart();
      await cartDrawerPage.expectAtLeastOneItemInCartToBeVisible();

      const cartPage = await cartDrawerPage.goToCartPage();
      await cartPage.expectAtLeastOneItemToBeVisible();
    }
  );
});