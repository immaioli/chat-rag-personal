import { test, expect } from '@playwright/test';

// TEST SUITE: End-to-End flow for the public visitor interface
test.describe('Visitor Chat Interface Flow', () => {
    test('should load the home page and locate the main chat input', async ({ page }) => {
        // ACTION: Command the robotic browser to navigate to the root URL
        await page.goto('/');

        // ASSERTION: Wait for the page to load and target the exact text input element
        const chatInputElement = page.getByRole('textbox', { name: 'Or type your message here...' });

        // ASSERTION: Verify if the input is actually visible to the user on the screen
        await expect(chatInputElement).toBeVisible();
    });
});