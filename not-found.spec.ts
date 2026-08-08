import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * 404 / NOT FOUND (Medium value, low effort)
 *
 * Asserts non-existent URL shows error page, not crash or blank screen.
 * Uses GlobalErrorContent: "O nee! Kažkas čia ne taip..." or CMS-configured 404 page.
 */
test.describe('404 Not found', () => {
  test('it should show error page for non-existent URL', async ({ page }) => {
    await page.goto('/privatiems/nonexistent-slug-xyz-123')

    await dismissCookieBanner(page)

    // GlobalErrorContent shows "O nee! Kažkas čia ne taip..." or CMS 404 content
    await expect(
      page.getByRole('heading', { name: /O nee|neegzistuoja|404/i }).or(page.getByText(/Kažkas čia ne taip/))
    ).toBeVisible({ timeout: 10000 })
  })
})
