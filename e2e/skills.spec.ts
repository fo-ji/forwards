import { test, expect } from '@playwright/test';

// ! テストシナリオ
// 新規作成
// 1. スキルページにアクセス
// 2. 新規作成ページ(モーダル)に遷移
// 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 4. 新規作成ページで正しい値を入力してサブミット
// 5. スキルページにリダイレクトされることを確認

// 一覧表示
// 6. 新しく作成したスキルが表示されることを確認

// 詳細表示
// 7. 作成したスキル名をクリックして詳細ページに遷移
// 8. 正しくname, url, プロジェクト, コード, 記事が表示されていることを確認
// 9. サイドバーの「スキルアイコン」をクリックしてスキル一覧ページに遷移

// 編集
// 10. 新しく作成したスキルの編集アイコンをクリックすると編集ページ(モーダル)に遷移
// 11. 編集ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 12. 編集ページで正しい値を入力してサブミット
// 13. スキルページにリダイレクトされることを確認
// 14. 一覧表示で変更が反映されていることを確認

// 削除
// 15. 編集したスキルの削除アイコンをクリックすると削除(モーダル)ページに遷移
// 16. 削除ページで「いいえ」を押下すると削除は実行されずスキルページにリダイレクト
// 17. 削除ページで「はい」を押下すると削除が実行されてスキルページにリダイレクト
// 18. 一覧表示に削除したデータがないことを確認

test('スキル一覧/新規作成/詳細/編集/削除', async ({ page }) => {
  // ! 新規作成
  // 1. スキルページにアクセス
  await page.goto('/skills');
  await expect.soft(page).toHaveURL('/skills');
  // 2. 新規作成ページ(モーダル)に遷移
  await page.getByRole('link', { name: '新規作成' }).click();
  // 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByLabel('URL').fill('hoge');
  await page.getByRole('button', { name: '新規登録' }).click();
  await expect.soft(page.getByText('必須項目です')).toBeVisible();
  await expect
    .soft(page.getByText('URLの形式で入力してください'))
    .toBeVisible();
  await expect.soft(page).toHaveURL('/skills/create');
  // 4. 新規作成ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('Nextjs');
  await page.getByLabel('URL').fill('https://nextjs.org/');
  await page.getByRole('button', { name: '新規登録' }).click();
  // 5. スキルページにリダイレクトされることを確認
  await expect.soft(page).toHaveURL('/skills');

  // ! 一覧表示
  // 6. 新しく作成したスキルが表示されることを確認
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'Nextjs', exact: true }))
    .toBeVisible();
  await expect.soft(page.getByText('https://nextjs.org/')).toBeVisible();

  // ! 詳細表示
  // 7. 作成したスキル名をクリックして詳細ページに遷移
  await page.getByRole('link', { name: 'Nextjs', exact: true }).click();
  // 8. 正しくname, url, プロジェクト, コード, 記事が表示されていることを確認
  await expect.soft(page.getByText('Nextjs', { exact: true })).toBeVisible();
  await expect
    .soft(page.getByText('https://nextjs.org/', { exact: true }))
    .toBeVisible();
  await expect.soft(page.getByRole('button', { name: '記事' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'コード' })).toBeVisible();
  // 9. サイドバーの「スキルアイコン」をクリックしてスキル一覧ページに遷移
  await page.getByRole('link', { name: 'スキル一覧ページへ' }).click();

  // ! 編集
  // 10. 新しく作成したスキルの編集アイコンをクリックすると編集ページに遷移
  await page
    .getByRole('link', { name: '気になる技術の編集ページへ' })
    .first()
    .click();
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術編集' }))
    .toBeVisible();
  // 11. 編集ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByLabel('名称').fill('');
  await page.getByLabel('URL').fill('12345');
  await page.getByRole('button', { name: '更新' }).click();
  await expect.soft(page.getByText('必須項目です')).toBeVisible();
  await expect
    .soft(page.getByText('URLの形式で入力してください'))
    .toBeVisible();
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術編集' }))
    .toBeVisible();
  // 12. 編集ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('Nextjs-update');
  await page.getByLabel('URL').fill('https://nextjs.org/update');
  await page.getByRole('button', { name: '更新' }).click();
  // 13. スキルページにリダイレクトされることを確認
  await expect.soft(page).toHaveURL('/skills');
  // 14. 一覧表示で変更が反映されていることを確認
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'Nextjs-update', exact: true }))
    .toBeVisible();
  await expect.soft(page.getByText('https://nextjs.org/update')).toBeVisible();

  // ! 削除
  // 15. 編集したスキルの削除アイコンをクリックすると削除(モーダル)ページに遷移
  await page
    .getByRole('link', { name: '気になる技術の削除ページへ' })
    .first()
    .click();
  // 16. 削除ページで「いいえ」を押下すると削除は実行されずスキルページにリダイレクト
  await page.getByRole('button', { name: 'いいえ' }).click();
  await expect.soft(page).toHaveURL('/skills');
  await expect
    .soft(page.getByRole('cell', { name: 'Nextjs-update', exact: true }))
    .toBeVisible();
  // 17. 削除ページで「はい」を押下すると削除が実行されてスキルページにリダイレクト
  await page
    .getByRole('link', { name: '気になる技術の削除ページへ' })
    .first()
    .click();
  await page.getByRole('button', { name: 'はい' }).click();
  await expect.soft(page).toHaveURL('/skills');
  // 18. 一覧表示に削除したデータがないことを確認
  await expect
    .soft(page.getByRole('cell', { name: 'Nextjs-update', exact: true }))
    .not.toBeVisible();
  await expect
    .soft(page.getByText('https://nextjs.org/update'))
    .not.toBeVisible();
});
