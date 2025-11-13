
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './client/tests/e2e',

  globalSetup: './client/tests/e2e/global.setup.js',

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    cwd: 'client',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    video: 'on-first-retry', // Record video if a test fails
  },
});
