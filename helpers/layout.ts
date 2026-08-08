import { Page } from '@playwright/test'

export const dismissCookieBanner = async (page: Page) => {
  const cookieBanner = page.getByRole('button', { name: 'Sutinku su visais' }).first()

  try {
    await cookieBanner.waitFor({ state: 'visible', timeout: 5000 })
    await cookieBanner.click()
    await cookieBanner.waitFor({ state: 'hidden', timeout: 2000 })
  } catch {
    // Banner not present or already dismissed, continue
  }
}
