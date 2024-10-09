import { test, expect } from '@playwright/test';

// ! テストシナリオ
// 事前準備
// 1. プロジェクト(プロジェクト１, プロジェクト２)を2件新規で作成する

// 新規作成
// 2. スキルページにアクセス
// 3. 新規作成ページに遷移
// 4. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 5. 新規作成ページで正しい値を入力してサブミット
// 6. スキルページにリダイレクトされることを確認

// 一覧表示
// 7. 新しく作成したスキルが表示されることを確認

// 詳細表示
// 8. 作成したスキル名をクリックして詳細ページに遷移
// 9. 正しくname, url, プロジェクト, コード, 記事が表示されていることを確認
// 10. サイドバーの「スキルアイコン」をクリックしてスキル一覧ページに遷移

// 編集
// 11. 新しく作成したスキルの編集アイコンをクリックすると編集ページに遷移
// 12. 編集ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 13. 編集ページで正しい値を入力してサブミット
// 14. スキルページにリダイレクトされることを確認
// 15. 一覧表示で変更が反映されていることを確認

// 削除
// 16. 編集したスキルの削除アイコンをクリックすると削除(モーダル)ページに遷移
// 17. 削除ページで「いいえ」を押下すると削除は実行されずスキルページにリダイレクト
// 18. 削除ページで「はい」を押下すると削除が実行されてスキルページにリダイレクト
// 19. 一覧表示に削除したデータがないことを確認

test('スキル一覧/新規作成/詳細/編集/削除', async ({ page }) => {
  // ! 事前準備
  // 1. プロジェクト(プロジェクト１, プロジェクト２)を2件新規で作成する
  await page.goto('/projects');
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('プロジェクト１');
  await page.getByTestId('status').click();
  await page.getByLabel('完了').click();
  await page.getByRole('button', { name: '新規登録' }).click();
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('プロジェクト２');
  await page.getByTestId('status').click();
  await page.getByLabel('完了').click();
  await page.getByRole('button', { name: '新規登録' }).click();

  // ! 新規作成
  // 2. スキルページにアクセス
  await page.goto('/skills');
  await expect.soft(page).toHaveURL('/skills');
  // 3. 新規作成ページ(モーダル)に遷移
  await page.getByRole('link', { name: '新規作成' }).click();
  // 4. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByLabel('URL').fill('hoge');
  await page.getByRole('button', { name: '新規登録' }).click();
  await expect.soft(page.getByText('必須項目です')).toBeVisible();
  await expect
    .soft(page.getByText('URLの形式で入力してください'))
    .toBeVisible();
  await expect.soft(page).toHaveURL('/skills/create');
  // 5. 新規作成ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('Nextjs');
  await page.getByLabel('URL').fill('https://nextjs.org/');
  await page
    .locator('div')
    .filter({ hasText: /^プロジェクト$/ })
    .getByRole('button')
    .click();
  await page.getByRole('option', { name: 'プロジェクト１' }).click();
  await page.getByRole('option', { name: 'プロジェクト２' }).click();
  await page.getByRole('option', { name: '閉じる' }).click();
  await page.getByRole('button', { name: '新規登録' }).click();
  // 6. スキルページにリダイレクトされることを確認
  await expect.soft(page).toHaveURL('/skills');

  // ! 一覧表示
  // 7. 新しく作成したスキルが表示されることを確認
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'Nextjs', exact: true }))
    .toBeVisible();
  await expect.soft(page.getByText('https://nextjs.org/')).toBeVisible();
  await expect
    .soft(
      page.getByRole('cell', {
        name: 'プロジェクト２ プロジェクト１',
        exact: true,
      }),
    )
    .toBeVisible();

  // ! 詳細表示
  // 8. 作成したスキル名をクリックして詳細ページに遷移
  await page.getByRole('link', { name: 'Nextjs', exact: true }).click();
  // 9. 正しくname, url, プロジェクト, コード, 記事が表示されていることを確認
  await expect.soft(page.getByText('Nextjs', { exact: true })).toBeVisible();
  await expect
    .soft(page.getByText('https://nextjs.org/', { exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('button', { name: 'プロジェクト', exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByText('プロジェクト１', { exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByText('プロジェクト２', { exact: true }))
    .toBeVisible();
  await expect.soft(page.getByRole('button', { name: '記事' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'コード' })).toBeVisible();
  // 10. サイドバーの「スキルアイコン」をクリックしてスキル一覧ページに遷移
  await page.getByRole('link', { name: 'スキル一覧ページへ' }).click();

  // ! 編集
  // 11. 新しく作成したスキルの編集アイコンをクリックすると編集ページに遷移
  await page
    .getByRole('link', { name: '気になる技術の編集ページへ' })
    .first()
    .click();
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術編集' }))
    .toBeVisible();
  // 12. 編集ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
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
  // 13. 編集ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('Nextjs-update');
  await page.getByLabel('URL').fill('https://nextjs.org/update');
  await page.getByLabel('projectIds').click();
  await page.getByRole('option', { name: '解除' }).click();
  await page.getByRole('option', { name: '閉じる' }).click();
  await page.getByRole('button', { name: '更新' }).click();
  // 14. スキルページにリダイレクトされることを確認
  await expect.soft(page).toHaveURL('/skills');
  // 15. 一覧表示で変更が反映されていることを確認
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'Nextjs-update', exact: true }))
    .toBeVisible();
  await expect
    .soft(
      page.getByRole('cell', {
        name: 'プロジェクト２ プロジェクト１',
        exact: true,
      }),
    )
    .not.toBeVisible();
  await expect.soft(page.getByText('https://nextjs.org/update')).toBeVisible();

  // ! 削除
  // 16. 編集したスキルの削除アイコンをクリックすると削除(モーダル)ページに遷移
  await page
    .getByRole('link', { name: '気になる技術の削除ページへ' })
    .first()
    .click();
  // 17. 削除ページで「いいえ」を押下すると削除は実行されずスキルページにリダイレクト
  await page.getByRole('button', { name: 'いいえ' }).click();
  await expect.soft(page).toHaveURL('/skills');
  await expect
    .soft(page.getByRole('cell', { name: 'Nextjs-update', exact: true }))
    .toBeVisible();
  // 18. 削除ページで「はい」を押下すると削除が実行されてスキルページにリダイレクト
  await page
    .getByRole('link', { name: '気になる技術の削除ページへ' })
    .first()
    .click();
  await page.getByRole('button', { name: 'はい' }).click();
  await expect.soft(page).toHaveURL('/skills');
  // 19. 一覧表示に削除したデータがないことを確認
  await expect
    .soft(page.getByRole('cell', { name: 'Nextjs-update', exact: true }))
    .not.toBeVisible();
  await expect
    .soft(page.getByText('https://nextjs.org/update'))
    .not.toBeVisible();
});
