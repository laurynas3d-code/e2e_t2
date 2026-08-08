import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

test('it should be able to toggle search component', async ({ page }) => {
  await page.goto('/privatiems')

  await dismissCookieBanner(page)

  await page.getByLabel('Atidaryti paiešką').first().click()

  await expect(page.getByPlaceholder('Paieška')).toBeVisible()

  const searchButton = page.getByLabel('Uždaryti paiešką').first()
  await searchButton.click()

  await expect(page.getByLabel('Atidaryti paiešką').first()).toBeVisible()
  await expect(page.locator('html')).not.toHaveClass('search-active')
  await expect(page.getByPlaceholder('Paieška')).toHaveAttribute('tabindex', '-1')
})

test('it should return search results', async ({ page }) => {
  await page.goto('/privatiems')
  await dismissCookieBanner(page)

  await page.getByLabel('Atidaryti paiešką').first().click()
  const searchInput = page.getByPlaceholder('Paieška')
  await searchInput.fill('Samsung')
  await searchInput.press('Enter')

  // Verify result page
  await expect(page).toHaveURL(/.*paieška.*Samsung/i)
  await expect(page.locator('.productPhoto, .itemDetails').first()).toBeVisible({ timeout: 10000 })
})
