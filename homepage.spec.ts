import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

test('@homepage loads correctly with key elements', async ({ page }) => {
  const response = await page.goto('/privatiems', {
    waitUntil: 'domcontentloaded',
  })

  expect(response?.status()).toBe(200)

  await dismissCookieBanner(page)

  // Main application
  await expect(page.locator('#app')).toBeVisible()

  // Main navigation
  await expect(
    page.getByRole('button', { name: 'Planai', exact: true })
  ).toBeVisible()

  // Search
  await expect(
    page.getByRole('button', { name: 'Atidaryti paiešką' })
  ).toBeVisible()

  // Cart
  await expect(
    page.getByRole('button', { name: 'Atidaryti krepšelį' })
  ).toBeVisible()

  // Main homepage content
  await expect(
    page.getByRole('heading', {
      name: 'Mėnesio žvaigždės',
      exact: true,
    })
  ).toBeVisible()
})