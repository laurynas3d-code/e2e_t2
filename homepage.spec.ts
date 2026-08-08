import { test, expect } from '@playwright/test'

test('homepage loads correctly with key elements', async ({ page }) => {
  const response = await page.goto('/privatiems')
  expect(response?.status()).toBe(200)

  // 1. Check for Header elements
  await expect(page.locator('header')).toBeVisible()
  
  // 2. Check for Hero/Main banner (common regression point)
  const hero = page.locator('section').filter({ has: page.locator('h1, h2') }).first()
  await expect(hero).toBeVisible()

  // 3. Check for Footer
  await expect(page.locator('footer')).toBeVisible()

  // 4. Check for Menu navigation
  const menuButton = page.getByRole('button', { name: /Meniu|Planai|Telefonai/i }).first()
  await expect(menuButton).toBeVisible()
})
