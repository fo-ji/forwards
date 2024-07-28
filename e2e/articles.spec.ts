import { expect, test } from '@playwright/test';

// ! テストシナリオ

// 事前準備
// 1. スキルを新規で作成 & 詳細ページに遷移する

// 新規作成
// 2. 新規作成ページ(モーダル)に遷移
// 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 4. 新規作成ページで正しい値を入力してサブミット
// 5. スキル詳細ページにリダイレクトされることを確認

// 一覧表示

// 詳細表示

// 編集

// 削除

test('記事一覧/新規作成/編集/削除', async ({ page }) => {
  // ! 事前準備
  // 1. スキルを新規で作成する
  await page.goto('/skills');
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('React');
  await page.getByLabel('URL').fill('https://ja.legacy.reactjs.org/');
  await page.getByRole('button', { name: '新規登録' }).click();
  await page.getByRole('link', { name: 'React', exact: true }).click();

  // ! 新規作成
  // 2. 新規作成ページ(モーダル)に遷移
  await page.getByRole('button', { name: '記事' }).click();
  await page.getByRole('link', { name: '記事を追加' }).click();
  // 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByLabel('URL').fill('hoge');
  await page.getByRole('button', { name: '新規登録' }).click();
  await expect.soft(page.getByText('必須項目です')).toBeVisible();
  await expect
    .soft(page.getByText('URLの形式で入力してください'))
    .toBeVisible();
  // 4. 新規作成ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('React');
  await page.getByLabel('URL').fill('https://ja.react.dev/');
  await page.getByRole('button', { name: '新規登録' }).click();
  // 5. 記事の作成が成功したことをトーストで表示
  await expect
    .soft(page.getByText('記事を登録しました', { exact: true }))
    .toBeVisible();

  // ! 一覧表示

  // ! 編集

  // ! 削除
});
