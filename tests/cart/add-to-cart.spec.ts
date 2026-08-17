import { test } from '../../fixtures/app.fixture';


/**
 * ADD TO CART → CART DRAWER (HIGH priority)
 *
 * Tests the core conversion flow: add product to cart, cart drawer shows item.
 *
 * INSTRUCTIONS:
 * 1. Navigate to a category page, e.g. /privatiems/mobilieji-telefonai
 * 2. Click the first product in the grid (or use a known SKU link if UAT has stable products)
 * 3. On product page:
 *    - select "Mokant iš karto" option if available
 *    - click "Pridėti į krepšelį" button
 *    - Wait for add to complete (loader/button state)
 * 4. Cart drawer should auto-open
 * 5. Assert: drawer visible, breadcrumbs visible and at least one item in cart (not "Jūsų krepšelis tuščias")
 *
 * NOTES:
 * - UAT product availability may vary; consider using a fixture or known-in-stock SKU
 * - Products with required options may open ProductSummaryDrawer before add - handle that flow
 * - If too flaky on UAT, consider running this only on staging/mocked environment
 */
test.describe('Add to Cart', () => {
  test(
    '@add-to-cart @smoke this test should select "Mokant iš karto" option, add a product to the cart and verify it is present',
    async ({ categoryPage }) => {
      await categoryPage.open();
      await categoryPage.dismissCookieBanner();

      const productPage = await categoryPage.openFirstProduct();

      await productPage.selectPayNow();
      await productPage.expectAddToCartButtonVisible();

      const cartDrawer = await productPage.addToCart();

      await cartDrawer.expectAtLeastOneItemInCart();
      await cartDrawer.removeAllItems();
      await cartDrawer.expectCartEmpty();
      await cartDrawer.closeDrawer();
      await cartDrawer.expectDrawerClosed();
    });
});