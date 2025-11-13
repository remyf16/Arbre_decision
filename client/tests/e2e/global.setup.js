
import { chromium } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // This is a placeholder for a real login flow.
  // In a real app, you would navigate to the login page, fill in credentials, and submit.
  // Since we don't have a working login form, we'll create a dummy token.
  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
    localStorage.setItem('token', 'dummy-auth-token');
  });

  await page.context().storageState({ path: authFile });
  await browser.close();
}

export default globalSetup;
