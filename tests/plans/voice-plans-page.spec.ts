import { test } from '../../fixtures/app.fixture';

/**
 * PRICEPLAN DRAWER CHECK
 *
 * Smoke test that priceplan drawer opens and has needed elements. Does NOT test actual priceplan selection.
 */
test.describe('Voice plans page', () => {
  test('@voice-plans-page @smoke voice plans drawer should open', async ({ voicePlansPage }) => {
    await voicePlansPage.open();
    await voicePlansPage.dismissCookieBanner();

    await voicePlansPage.expectPlanButtonToBeVisible();
    await voicePlansPage.clickPlanButton();
    await voicePlansPage.expectPlanDrawerToBeReady();
  });
});