import { test, expect } from '@playwright/test';

// TEST SUITE: End-to-End flow for the public visitor interface
test.describe('Visitor Chat Interface Flow', () => {
    test('should load the home page and locate the main chat input', async ({ page }) => {
        // ACTION: Command the robotic browser to navigate to the root URL
        await page.goto('/');

        // ASSERTION: Wait for the page to load and target the date badge
        const dateBadge = page.getByText('Hoje');

        // ASSERTION: Verify if the date badge is actually visible to the user on the screen
        await expect(dateBadge).toBeVisible();
    });
});