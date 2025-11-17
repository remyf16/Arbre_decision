
import { chromium, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the login page and perform a real login.
  await page.goto('http://localhost:5173/login');
  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for the navigation to the dashboard to confirm login was successful.
  await page.waitForURL('**/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');

  // Save the authenticated state to a file.
  await page.context().storageState({ path: authFile });
  await browser.close();
}

export default globalSetup;
