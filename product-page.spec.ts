import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * PRODUCT PAGE LOAD / PDP (High value, low effort)
 *
 * Smoke test that product page renders. Catches PDP, url-resolver, product data regressions.
 *
 * INSTRUCTIONS:
 * - Navigates via category → first product link (avoids hardcoding SKU)
 * - Asserts product content visible (add to cart button or product config)
 * - If category is empty on UAT, test may fail - consider fallback to direct SKU URL
 */
test.describe('Product page', () => {
  test('it should load product page when navigating from category', async ({ page }) => {
    await page.goto('/privatiems/mobilieji-telefonai')

    await dismissCookieBanner(page)

    // Wait for products to load, then click first product link (product URLs: /privatiems/mobilieji-telefonai/product-slug)
    const productLink = page.locator('a[href*="/privatiems/mobilieji-telefonai/"]').first()
    await productLink.waitFor({ state: 'visible', timeout: 15000 })
    await productLink.click()

    await page.waitForURL(/\/privatiems\/mobilieji-telefonai\/.+/)

    // PDP shows "Pridėti į krepšelį" or product config
    await expect(
      page.getByRole('button', { name: /Pridėti į krepšelį/i }).or(page.locator('[id="products-content"]'))
    ).toBeVisible({ timeout: 10000 })
  })
})
