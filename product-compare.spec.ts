import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * PRODUCT COMPARE (MEDIUM priority)
 *
 * Tests the compare flow: add product to compare, view compare page.
 *
 * INSTRUCTIONS:
 * 1. Navigate to category (e.g. /privatiems/mobilieji-telefonai)
 * 2. Click "Palyginti" / add-to-compare on first product
 *    - AddToCompareButton adds product via ?section=compare query param
 *    - ProductsCompareDrawer may open, or compare list updates
 * 3. Either:
 *    a) Add second product to compare, then open compare drawer/page
 *    b) Open compare from the compare button in header/drawer
 * 4. Navigate to /privatiems/produktai/palyginimas (or via compare CTA)
 * 5. Assert: compare page loads, at least one product in comparison
 *
 * SELECTORS:
 * - Compare page: /{store}/produktai/palyginimas (STATIC_ROUTES.PRODUCTS_COMPARE)
 * - Add to compare: check AddToCompareButton.tsx - button text or aria-label
 * - Compare drawer opens via ?section=compare query (ProductsCompareDrawer)
 */
test.describe('Product compare', () => {
  test.skip('it should add product to compare and show compare page', async ({ page }) => {
    await page.goto('/privatiems')

    await dismissCookieBanner(page)

    // TODO: Navigate to category with products
    // TODO: Find and click add-to-compare button on first product
    // TODO: Open compare drawer or navigate to /privatiems/produktai/palyginimas
    // TODO: Assert at least one product in compare view
    await expect(page).toBeTruthy() // placeholder
  })
})
