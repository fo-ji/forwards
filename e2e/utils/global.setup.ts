import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/register');
  await page.getByLabel('メールアドレス').fill('test-user@example.com');
  await page.getByLabel('パスワード', { exact: true }).click();
  await page.getByLabel('パスワード', { exact: true }).fill('Test12345!');
  await page.getByLabel('パスワード（確認）').click();
  await page.getByLabel('パスワード（確認）').fill('Test12345!');
  await page.getByRole('button', { name: 'メールアドレスで新規登録' }).click();
  await expect(page).toHaveURL('/');

  await page.context().storageState({ path: authFile });
});
