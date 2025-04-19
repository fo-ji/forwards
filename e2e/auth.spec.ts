import { test, expect } from '@playwright/test';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

// ! テストシナリオ
// 新規登録
// 1. 認証前）TOPページにアクセスしてログインページにリダイレクト
// 2. 認証前）ログインページから新規登録ページにページ遷移
// 3. 認証前）新規登録ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 4. 認証前）新規登録ページで正しい値を入力してサブミット
// 5. 認証後）TOPページにリダイレクトされることを確認

// ログアウト
// 6. 認証後）TOPページからログアウト
// 7. 認証後）ログインページにリダイレクトされることを確認

// ログイン
// 8. 認証前）ログインページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 9. 認証前）ログインページで存在しないユーザーの情報を入力してエラーメッセージ確認
// 10. 認証前）新規登録で作成済みのユーザー情報を入力してログインする
// 11. 認証後）TOPページにリダイレクトされることを確認

test('ユーザーの新規登録/ログアウト/ログイン', async ({ page }) => {
  // ! 新規登録
  // 1. 認証前）TOPページにアクセスしてログインページにリダイレクト
  await page.goto('/');
  await expect.soft(page).toHaveURL('/login');
  // 2. 認証前）ログインページから新規登録ページにページ遷移
  await page.getByRole('link', { name: '新規登録ページへ' }).click();
  // 3. 認証前）新規登録ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByLabel('メールアドレス').click();
  await page.getByLabel('メールアドレス').fill('dummy');
  await page.getByLabel('パスワード', { exact: true }).click();
  await page.getByLabel('パスワード', { exact: true }).fill('dummy');
  await page.getByLabel('パスワード（確認）').click();
  await page.getByLabel('パスワード（確認）').fill('dummy');
  await page.getByRole('button', { name: 'メールアドレスで新規登録' }).click();
  await expect
    .soft(page.getByText('メールアドレスの形式で入力してください'))
    .toBeVisible();
  await expect
    .soft(page.getByText('6文字以上で入力してください'))
    .toHaveCount(2);
  await expect
    .soft(page.getByText('半角英字(大・小)、数字、記号を含めてください'))
    .toHaveCount(2);
  await expect.soft(page).toHaveURL('/register');
  // 4. 認証前）新規登録ページで正しい値を入力してサブミット
  await page.getByLabel('メールアドレス').fill('user1@example.com');
  await page.getByLabel('パスワード', { exact: true }).click();
  await page.getByLabel('パスワード', { exact: true }).fill('Test12345!');
  await page.getByLabel('パスワード（確認）').click();
  await page.getByLabel('パスワード（確認）').fill('Test12345!');
  await page.getByRole('button', { name: 'メールアドレスで新規登録' }).click();
  // 5. 認証後）TOPページにリダイレクトされることを確認
  await expect.soft(page).toHaveURL('/');

  // ! ログアウト
  // 6. 認証後）TOPページからログアウト
  await page.getByRole('button', { name: 'Logout' }).click();
  // 7. 認証後）ログインページにリダイレクトされることを確認
  await expect.soft(page).toHaveURL('/login');

  // ! ログイン
  // 8. 認証前）ログインページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByLabel('メールアドレス').click();
  await page.getByLabel('メールアドレス').fill('dummy');
  await page.getByLabel('パスワード').click();
  await page.getByLabel('パスワード').fill('dummy');
  await page.getByRole('button', { name: 'メールアドレスでログイン' }).click();
  await expect
    .soft(page.getByText('メールアドレスの形式で入力してください'))
    .toBeVisible();
  await expect
    .soft(page.getByText('6文字以上で入力してください'))
    .toBeVisible();
  await expect
    .soft(page.getByText('半角英字(大・小)、数字、記号を含めてください'))
    .toBeVisible();
  await expect.soft(page).toHaveURL('/login');
  // 9. 認証前）ログインページで存在しないユーザーの情報を入力してエラーメッセージ確認
  await page.getByLabel('メールアドレス').fill('user9999@example.com');
  await page.getByLabel('パスワード').click();
  await page.getByLabel('パスワード').fill('Test12345!');
  await page.getByRole('button', { name: 'メールアドレスでログイン' }).click();
  await expect
    .soft(page.getByText('メールアドレスかパスワードが間違っています'))
    .toBeVisible();
  await expect.soft(page).toHaveURL('/login');
  // 10. 認証前）新規登録で作成済みのユーザー情報を入力してログインする
  await page.getByLabel('メールアドレス').fill('user1@example.com');
  await page.getByLabel('パスワード').click();
  await page.getByLabel('パスワード').fill('Test12345!');
  await page.getByRole('button', { name: 'メールアドレスでログイン' }).click();
  // 11. 認証後）TOPページにリダイレクトされることを確認
  await expect.soft(page).toHaveURL('/');
});
