import { expect, test } from '@playwright/test';

// ! テストシナリオ
// 事前準備
// 1. スキル(Reactjs, Nestjs)を2件新規で作成する

// 新規作成
// 2. 新規作成ページに遷移
// 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 4. 新規作成ページで正しい値を入力してサブミット
// 5. 記事の作成が成功したことをトーストで表示

// 一覧表示
// 6. 新しく作成したスキルが表示されることを確認

// 編集

// 削除

test('プロジェクト一覧/新規作成/編集/削除', async ({ page }) => {
  // ! 事前準備
  // 1. スキル(Reactjs, Nextjs)を2件新規で作成する
  await page.goto('/skills');
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('Reactjs');
  await page.getByLabel('URL').fill('https://ja.react.dev/');
  await page.getByRole('button', { name: '新規登録' }).click();
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('Nestjs');
  await page.getByLabel('URL').fill('https://nestjs.com/');
  await page.getByRole('button', { name: '新規登録' }).click();

  // ! 新規作成
  // 2. 新規作成ページに遷移
  await page.goto('/projects');
  await page.getByRole('link', { name: '新規作成' }).click();
  // 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByRole('button', { name: '新規登録' }).click();
  await expect.soft(page.getByText('必須項目です')).toHaveCount(2);
  // 4. 新規作成ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('プロジェクトA');
  await page.getByTestId('status').click();
  await page.getByLabel('準備中').click();
  await page
    .locator('div')
    .filter({ hasText: /^スキル$/ })
    .getByRole('button')
    .click();
  await page.getByRole('option', { name: 'Reactjs' }).click();
  await page.getByRole('option', { name: 'Nestjs' }).click();
  await page.getByRole('option', { name: '閉じる' }).click();
  await page.getByLabel('URL').fill('http://localhost:3000');
  await page.getByLabel('インストール手順').fill('## setup\n- hoge\n- foo');
  await page.getByRole('button', { name: '新規登録' }).click();
  // 5. 記事の作成が成功したことをトーストで表示
  await expect
    .soft(page.getByText('プロジェクトを登録しました', { exact: true }))
    .toBeVisible();

  // ! 一覧表示
  // 6. 新しく作成したスキルが表示されることを確認
  await expect
    .soft(page.getByRole('heading', { name: 'プロジェクト' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: '準備中', exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'プロジェクトA', exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'Reactjs Nestjs', exact: true }))
    .toBeVisible();
  await expect
    .soft(
      page.getByRole('cell', { name: 'http://localhost:3000', exact: true }),
    )
    .toBeVisible();

  // ! 編集

  // ! 削除
});
