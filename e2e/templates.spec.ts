import { expect, test } from '@playwright/test';

// ! テストシナリオ
// 事前準備
// 1. スキル(Prisma, SWR)を2件新規で作成する

// 新規作成
// 2. 新規作成ページに遷移
// 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 4. 新規作成ページで正しい値を入力してサブミット
// 5. テンプレートの作成が成功したことをトーストで表示

// 一覧表示
// 6. 新しく作成したテンプレートが表示されることを確認

test('テンプレート一覧/新規作成/編集/削除', async ({ page }) => {
  // ! 事前準備
  // 1. スキル(Prisma, SWR)を2件新規で作成する
  await page.goto('/skills');
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('Prisma');
  await page.getByLabel('URL').fill('https://www.prisma.io/');
  await page.getByRole('button', { name: '新規登録' }).click();
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('SWR');
  await page.getByLabel('URL').fill('https://swr.vercel.app/ja');
  await page.getByRole('button', { name: '新規登録' }).click();

  // ! 新規作成
  // 2. 新規作成ページに遷移
  await page.goto('/templates');
  await page.getByRole('link', { name: '新規作成' }).click();
  // 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByRole('button', { name: '新規登録' }).click();
  await expect.soft(page.getByText('必須項目です')).toHaveCount(1);
  // 4. 新規作成ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('テンプレートA');
  await page
    .locator('div')
    .filter({ hasText: /^スキル$/ })
    .getByRole('button')
    .click();
  await page.getByRole('option', { name: 'Prisma' }).click();
  await page.getByRole('option', { name: 'SWR' }).click();
  await page.getByRole('option', { name: '閉じる' }).click();
  await page.getByLabel('インストール手順').fill('## setup\n- hoge\n- foo');
  await page.getByRole('button', { name: '新規登録' }).click();
  // 5. テンプレートの作成が成功したことをトーストで表示
  await expect
    .soft(page.getByText('テンプレートを登録しました', { exact: true }))
    .toBeVisible();

  // ! 一覧表示
  // 6. 新しく作成したテンプレートが表示されることを確認
  await expect
    .soft(page.getByRole('heading', { name: 'テンプレート' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'テンプレートA', exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'Prisma SWR', exact: true }))
    .toBeVisible();
});
