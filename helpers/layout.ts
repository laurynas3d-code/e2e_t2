import { Page } from '@playwright/test'

export const dismissCookieBanner = async (page: Page) => {
  const cookieBanner = page.getByRole('button', {
    name: 'Sutinku su visais',
  }).first()

  // Give the banner a very short opportunity to appear
  // If it is not present, continue immediately.
  try {
    if (await cookieBanner.isVisible({ timeout: 300 })) {
      await cookieBanner.click()
    }
  } catch {
    // Cookie banner is not appears
  }
}