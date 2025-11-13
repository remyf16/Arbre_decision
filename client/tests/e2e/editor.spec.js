
import { test, expect } from '@playwright/test';

test.describe('Decision Tree Editor', () => {
  test('should create a new tree, add a node, and auto-save', async ({ page }) => {
    // Mock the POST request to create a new tree
    await page.route('/api/decision-trees', route => {
      route.fulfill({
        status: 201,
        body: JSON.stringify({
          _id: 'new-tree-id',
          name: 'Nouvel Arbre de Décision',
          nodes: [],
          edges: [],
        }),
      });
    });

    // Mock the initial GET request for the new tree
    await page.route('/api/decision-trees/new-tree-id', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          _id: 'new-tree-id',
          name: 'Nouvel Arbre de Décision',
          nodes: [],
          edges: [],
        }),
      });
    });

    // Listen for the PUT request to save the tree
    let saveRequest = null;
    await page.route('/api/decision-trees/new-tree-id', route => {
      if (route.request().method() === 'PUT') {
        saveRequest = route.request().postDataJSON();
      }
      route.continue();
    });

    // 1. Navigate to the dashboard and create a new tree
    await page.goto('/dashboard');
    await page.waitForSelector('text="Mes Arbres de Décision"');
    await page.getByRole('button', { name: 'Créer un arbre' }).click();

    // 2. Verify navigation to the editor
    await page.waitForURL('**/editor/new-tree-id');
    await expect(page.locator('h2')).toContainText('Decision Tree Editor');

    // 3. Add a new node by dragging from the sidebar
    await page.getByText('Add Question').dragTo(page.locator('.react-flow__pane'));

    // 4. Verify the node was added
    await expect(page.locator('.react-flow__node')).toHaveCount(1);

    // 5. Verify that the auto-save was triggered
    await page.waitForTimeout(1500); // Wait for debounce
    expect(saveRequest).not.toBeNull();
    expect(saveRequest.nodes).toHaveLength(1);

    await page.screenshot({ path: 'verification/editor_saved.png' });
  });
});
