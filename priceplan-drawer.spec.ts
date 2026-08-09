import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/layout';

/**
 * PRICEPLAN DRAWER CHECK
 *
 * Smoke test that priceplan drawer opens. Does NOT test actual priceplan selection.
 */

test.describe('Priceplan Drawer', () => {
  // All tests in this describe block will run in parallel, which is useful for smoke tests that don't depend on each other.
  test.describe.configure({ mode: 'parallel' });

  test('@open-drawer should open priceplan drawer with term selected', async ({ page }) => {
    // Load page
    const response = await page.goto('/privatiems/planai', {
      //waitUntil: 'domcontentloaded',
    })

    await dismissCookieBanner(page);

    // Wait until page JavaScript is fully loaded
    await page.waitForLoadState('networkidle')

    // Searching first plan card that has a "Plačiau" button inside it
    const planButton = page.getByRole('button', {
      name: 'Plačiau',
      exact: true,
    }).first()

    // Click the "Plačiau" button to open the priceplan drawer
    await expect(planButton).toBeVisible();
    await planButton.click();

    // Wait for drawer to appear
    const drawer = page.locator('[role="dialog"]')

    await expect(drawer).toBeAttached();
    await expect(drawer).toBeVisible();

    // 3 main elements that should be visible in the drawer: heading, default priceplan term and continue button
    const heading = drawer.locator('h4').first();
    const term = drawer.locator('input[name="priceplan"]').first();
    const continueButton = drawer.getByRole('button', { name: 'Tęsti' });

    await expect(heading).toBeVisible();
    await expect(continueButton).toBeVisible();
    await expect(term).toBeVisible();
    await expect(term).toBeChecked();
  });
});