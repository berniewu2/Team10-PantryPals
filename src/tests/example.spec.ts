import { test, expect } from '@playwright/test';

test('title', async ({ page }) => {
  await page.goto('https://team10-pantrypals.onrender.com/');
  expect(await page.title()).toBe('Vite + React');
});