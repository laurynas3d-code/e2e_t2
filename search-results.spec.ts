import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * SEARCH WITH RESULTS (MEDIUM priority)
 *
 * Tests that executing a search returns results.
 *
 * INSTRUCTIONS:
 * 1. Go to homepage, dismiss cookie banner
 * 2. Click "Atidaryti paiešką" (aria-label) to open search
 * 3. Type a search query in the "Paieška" placeholder input
 *    - Use a term that returns results on UAT, e.g. "telefonas", "iPhone", or product name
 *    - Wait for results to load (debounced - may need waitForResponse or waitForSelector)
 * 4. Assert results appear:
 *    - Products tab may show product cards
 *    - Content/Help tabs may show different result types
 *    - Or assert "Rezultatų nėra" / empty state if query is intentionally empty
 *
 * NOTES:
 * - Search is debounced - add appropriate wait (e.g. 500ms-1s) before asserting
 * - UAT content varies - use a generic product term likely to have results
 * - Search page route: /paieska?q=<query> - results may load via client-side fetch
 */
test.describe('Search with results', () => {
  test.skip('it should show search results when query is submitted', async ({ page }) => {
    await page.goto('/privatiems')

    await dismissCookieBanner(page)

    // TODO: Open search (click "Atidaryti paiešką")
    // TODO: Type search query in Paieška input
    // TODO: Wait for results (debounce + API response)
    // TODO: Assert products/content results visible, or empty state for no-results query
    await expect(page).toBeTruthy() // placeholder
  })
})
