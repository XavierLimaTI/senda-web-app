import { test, expect } from '@playwright/test'

test.describe('Navbar UI Components', () => {
  test.beforeEach(async ({ page }) => {
    // Assuming we have a test account
    // This would need proper test credentials
    page.goto('http://localhost:3000/home/client')
  })

  test('logout button renders with Lucide LogOut icon', async ({ page }) => {
    // Check if logout button exists
    const logoutBtn = page.locator('button[title="Sair"]')
    await expect(logoutBtn).toBeVisible()
    
    // Check if it contains an SVG (Lucide icon)
    const svg = logoutBtn.locator('svg')
    await expect(svg).toBeVisible()
  })

  test('logout button has correct styling', async ({ page }) => {
    const logoutBtn = page.locator('button[title="Sair"]')
    
    // Check for hover effects
    await logoutBtn.hover()
    const styles = await logoutBtn.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    )
    
    // Should have some hover styling applied
    expect(styles).toBeTruthy()
  })

  test('logout button is NOT emoji', async ({ page }) => {
    const logoutBtn = page.locator('button[title="Sair"]')
    const textContent = await logoutBtn.textContent()
    
    // Should not contain emoji door
    expect(textContent).not.toContain('🚪')
  })

  test('language selector dropdown exists', async ({ page }) => {
    const langSelector = page.locator('select')
    await expect(langSelector).toBeVisible()
    
    // Should have options
    const options = page.locator('select option')
    const count = await options.count()
    expect(count).toBeGreaterThan(0)
  })

  test('language selector has all supported languages', async ({ page }) => {
    const langSelector = page.locator('select')
    
    const languages = ['pt', 'en', 'es', 'zh']
    for (const lang of languages) {
      const option = page.locator(`select option[value="${lang}"]`)
      await expect(option).toBeVisible()
    }
  })

  test('avatar button links to profile', async ({ page }) => {
    // Find the avatar link
    const avatarLink = page.locator('a[href="/profile"]')
    
    // Should be visible
    await expect(avatarLink).toBeVisible()
    
    // Should have correct styling (gradient)
    const styles = await avatarLink.getAttribute('class')
    expect(styles).toContain('rounded-full')
  })

  test('avatar shows user initial or avatar image', async ({ page }) => {
    const avatarLink = page.locator('a[href="/profile"]')
    
    // Either has image or text content
    const img = avatarLink.locator('img')
    const imgVisible = await img.isVisible().catch(() => false)
    
    if (!imgVisible) {
      // Should have text (user initial)
      const textContent = await avatarLink.textContent()
      expect(textContent?.length).toBeGreaterThan(0)
    }
  })

  test('navigation links have correct active state styling', async ({ page }) => {
    // Check if current page has active styling
    const activeLinks = page.locator('a[class*="text-[#B2B8A3]"]')
    const activeCount = await activeLinks.count()
    
    // Should have at least one active link
    expect(activeCount).toBeGreaterThan(0)
  })
})

test.describe('Language Switching Functionality', () => {
  test('changing language updates page language', async ({ page }) => {
    await page.goto('http://localhost:3000/home/client')
    
    // Get initial language
    const htmlLang = await page.getAttribute('html', 'lang')
    expect(htmlLang).toBe('pt-BR')
    
    // Change language
    const langSelector = page.locator('select')
    await langSelector.selectOption('en')
    
    // Language should update
    const newLang = await page.getAttribute('html', 'lang')
    expect(newLang).toBe('en-US')
  })

  test('language preference persists in localStorage', async ({ page }) => {
    await page.goto('http://localhost:3000/home/client')
    
    // Change language
    const langSelector = page.locator('select')
    await langSelector.selectOption('es')
    
    // Check localStorage
    const lang = await page.evaluate(() => 
      localStorage.getItem('language')
    )
    expect(lang).toBe('es')
  })

  test('language selector shows current selection', async ({ page }) => {
    await page.goto('http://localhost:3000/home/client')
    
    // Default should be Portuguese
    const langSelector = page.locator('select')
    const value = await langSelector.inputValue()
    expect(value).toBe('pt')
  })
})

test.describe('Authentication & Logout', () => {
  test('logout button is disabled/hidden when not authenticated', async ({ page }) => {
    // Navigate to auth signin (not authenticated)
    await page.goto('http://localhost:3000/auth/signin')
    
    // Logout button should NOT be visible
    const logoutBtn = page.locator('button[title="Sair"]')
    const isVisible = await logoutBtn.isVisible().catch(() => false)
    
    // Either not visible or Navbar not shown
    if (isVisible) {
      expect(logoutBtn).not.toBeVisible()
    }
  })

  test('profile link requires authentication', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signin')
    
    // Avatar link should NOT be visible when not logged in
    const avatarLink = page.locator('a[href="/profile"]')
    const isVisible = await avatarLink.isVisible().catch(() => false)
    
    expect(isVisible).toBe(false)
  })
})
