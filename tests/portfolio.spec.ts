import { expect, test } from '@playwright/test'

test('project filters, detail dialog, and focus return work', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Complex problems.')
  await expect(page.locator('.project-card')).toHaveCount(4)
  await page.getByRole('button', { name: 'Web systems', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await expect(page.getByRole('button', { name: 'Web systems', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  const trigger = page.getByRole('button', { name: 'View LinkHub Demo project details' })
  await trigger.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog').getByRole('heading', { level: 2 })).toHaveText(
    'LinkHub Demo',
  )
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await page.getByRole('button', { name: /All work/ }).click()
  await expect(page.locator('.project-card')).toHaveCount(4)
})

test('credential summaries and prepared email draft', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Prompt Engineering Basics/ }).click()
  await expect(page.getByRole('dialog')).toContainText('Example Learning Academy')
  await page.getByRole('button', { name: 'Close details' }).click()
  await page.getByLabel('Your name').fill('Test & Review')
  await page.getByLabel('Email address', { exact: true }).fill('review@example.com')
  await page.getByLabel('What’s on your mind?').fill('Let’s discuss a web system & its workflow.')
  await page.getByRole('button', { name: 'Start a conversation' }).click()
  await expect(page.getByRole('status')).toContainText('Your email app will open with your draft')
  await expect(page.locator('a[href="mailto:hello@example.com"]')).toHaveCount(1)
})

test('mobile menu, reduced motion, and horizontal layout', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.locator('button[aria-controls="mobile-navigation"]')
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Approach' })
    .click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
  await expect(page.locator('.hero-video')).toHaveCount(0)
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('html')).toHaveClass(/lenis/)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  for (const width of [320, 390, 768, 1440, 2560]) {
    await page.setViewportSize({ width, height: 900 })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `No horizontal overflow at ${width}px`,
    ).toBe(true)
  }
})

test('page loads without runtime errors or missing media', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  const failed: string[] = []
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().includes('127.0.0.1'))
      failed.push(response.url())
  })
  await page.goto('/')
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1000)
  expect(errors).toEqual([])
  expect(failed).toEqual([])
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.screenshot({
    path: 'artifacts/portfolio-desktop.png',
    fullPage: true,
    animations: 'disabled',
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({
    path: 'artifacts/portfolio-mobile.png',
    fullPage: true,
    animations: 'disabled',
  })
})
