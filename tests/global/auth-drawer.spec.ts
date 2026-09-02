import { test } from '../../fixtures/app.fixture';

/**
 * AUTH / LOGIN DRAWER (Medium value)
 *
 * Smoke test that login drawer opens. Does NOT test actual login (OAuth, external redirect).
 * When guest clicks account menu, LoginSubmenu shows "Sveiki sugrįžę!".
 */
test.describe('Auth Drawer', () => {
  test('@auth-drawer @global should display auth drawer', async ({ header }) => {
    await header.open();
    await header.dismissCookieBanner();
    const authDrawer = await header.clickAccountMenu();
    await authDrawer.expectAuthDrawerToBeOpen();
    await authDrawer.closeAuthDrawer();
  });
});