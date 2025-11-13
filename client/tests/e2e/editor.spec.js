
import { test, expect } from '@playwright/test';

test.describe('Decision Tree Editor', () => {
  let consoleLogs = [];

  test.beforeEach(async ({ page }) => {
    consoleLogs = [];
    page.on('console', msg => consoleLogs.push(msg.text()));
    await page.goto('http://localhost:5173/editor');
  });

  test('should load the editor', async ({ page }) => {
    await page.waitForSelector('.react-flow', { timeout: 60000 });
    await page.screenshot({ path: 'verification/editor_loaded.png' });
  });

  test('should collapse and expand the sidebar', async ({ page }) => {
    const sidebar = page.locator('aside');
    await expect(sidebar.first()).toHaveClass(/w-64/);

    await page.getByRole('button', { name: 'Collapse' }).click();
    await expect(sidebar.first()).toHaveClass(/w-20/);

    await page.getByRole('button', { name: 'Expand' }).click();
    await expect(sidebar.first()).toHaveClass(/w-64/);
  });

  test('should connect a result node to a question node', async ({ page }) => {
    const sourceNode = page.locator('.react-flow__node[data-id="2"] .react-flow__handle.source');
    const targetNode = page.locator('.react-flow__node[data-id="1"] .react-flow__handle.target');

    await sourceNode.dragTo(targetNode);

    // Check if a new edge was created
    const newEdge = page.locator('.react-flow__edge[aria-label^="Edge from 2 to 1"]');
    await expect(newEdge).toBeVisible();

    await page.screenshot({ path: 'verification/nodes_connected.png' });
  });
});
