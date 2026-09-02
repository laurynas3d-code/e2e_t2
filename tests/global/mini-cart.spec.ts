import { test } from '../../fixtures/app.fixture';

test.describe('Mini Cart', () => {
  test('@mini-cart @global should display mini cart drawer', async ({ header }) => {
    await header.open();
    await header.dismissCookieBanner();
    const miniCart = await header.clickMiniCart();
    await miniCart.expectMiniCartToBeOpen();
    await miniCart.checkCartStatus();
  });
});