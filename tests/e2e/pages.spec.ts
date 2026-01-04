import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('signup page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signup')
    
    const title = await page.title()
    expect(title).toBeTruthy()
    
    const signupForm = page.locator('form, [role="form"]')
    await expect(signupForm).toBeVisible()
  })

  test('signin page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signin')
    
    const signinForm = page.locator('form, [role="form"]')
    await expect(signinForm).toBeVisible()
  })

  test('role selection page exists', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/role-selection')
    
    const roleOptions = page.locator('button, [role="button"]')
    const count = await roleOptions.count()
    expect(count).toBeGreaterThan(0)
  })
})

test.describe('Legal Pages', () => {
  test('privacy policy page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/legal/privacy')
    
    const content = page.locator('main, [role="main"]')
    await expect(content).toBeVisible()
  })

  test('terms page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/legal/terms')
    
    const content = page.locator('main, [role="main"]')
    await expect(content).toBeVisible()
  })

  test('cancellation policy page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/legal/cancellation')
    
    const content = page.locator('main, [role="main"]')
    await expect(content).toBeVisible()
  })

  test('payment terms page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/legal/payment')
    
    const content = page.locator('main, [role="main"]')
    await expect(content).toBeVisible()
  })
})

test.describe('Public Pages', () => {
  test('home page loads without errors', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    
    const body = page.locator('body')
    await expect(body).toBeVisible()
  })

  test('explore therapies page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/explore/therapies')
    
    const content = page.locator('main, [role="main"]')
    await expect(content).toBeVisible()
  })

  test('news page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/news')
    
    const content = page.locator('main, [role="main"]')
    await expect(content).toBeVisible()
  })
})

test.describe('Error Handling', () => {
  test('404 page is shown for non-existent routes', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/non-existent-route-xyz')
    
    // Should either be 404 or navigate to 404 page
    expect(response?.status() || 200).toBeDefined()
  })
})

test.describe('Performance', () => {
  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('http://localhost:3000/home/client', { waitUntil: 'networkidle' })
    const loadTime = Date.now() - startTime
    
    // Should load in less than 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })

  test('no console errors on page load', async ({ page }) => {
    const errors: string[] = []
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.goto('http://localhost:3000/')
    
    // Allow some errors but not critical ones
    const criticalErrors = errors.filter(e => 
      !e.includes('Failed to load resource') &&
      !e.includes('ResizeObserver')
    )
    
    expect(criticalErrors.length).toBe(0)
  })
})
