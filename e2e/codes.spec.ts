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
// 6. 新しく作成したコードが表示されることを確認

// 編集
// 7. 新しく作成したコードの メニュー > 編集 をクリックすると編集ページ(モーダル)に遷移
// 8. 編集ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 9. 編集ページで正しい値を入力してサブミット
// 10. 一覧表示で変更が反映されていることを確認

// 削除
// 11. 編集したコードの削除アイコンをクリックすると削除(モーダル)ページに遷移
// 12. 削除ページで「いいえ」を押下すると削除は実行されずスキル詳細ページにリダイレクト
// 13. 削除ページで「はい」を押下すると削除が実行されてスキル詳細ページにリダイレクト
// 14. 一覧表示に削除したデータがないことを確認

test('コード一覧/新規作成/編集/削除', async ({ page }) => {
  // ! 事前準備
  // 1. スキルを新規で作成する
  await page.goto('/skills');
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('Vercel');
  await page.getByLabel('URL').fill('https://vercel.com/docs');
  await page.getByRole('button', { name: '新規登録' }).click();
  await page.getByRole('link', { name: 'Vercel', exact: true }).click();

  // ! 新規作成
  // 2. 新規作成ページ(モーダル)に遷移
  await page.getByRole('button', { name: 'コード' }).click();
  await page.getByRole('link', { name: 'コードを追加' }).click();
  // 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByRole('button', { name: '新規登録' }).click();
  await expect.soft(page.getByText('必須項目です')).toBeVisible();
  // 4. 新規作成ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('開発環境起動');
  await page.getByLabel('ブロック').fill('```bash\n$ yarn install\n```');
  await page.getByRole('button', { name: '新規登録' }).click();
  // 5. 記事の作成が成功したことをトーストで表示
  await expect
    .soft(page.getByText('コードを登録しました', { exact: true }))
    .toBeVisible();

  // ! 一覧表示
  // 6. 新しく作成したコードが表示されることを確認
  await expect
    .soft(page.getByLabel('コード').getByText('開発環境起動', { exact: true }))
    .toBeVisible();
  await expect
    .soft(
      page.getByLabel('コード').getByText('$ yarn install', { exact: true }),
    )
    .toBeVisible();
  await expect
    .soft(page.getByRole('button', { name: 'コードのメニュー' }))
    .toBeVisible();

  // ! 編集
  // 7. 新しく作成したコードの メニュー > 編集 をクリックすると編集ページ(モーダル)に遷移
  await page.getByRole('button', { name: 'コードのメニュー' }).click();
  await page.getByRole('link', { name: '編集' }).click();
  await expect
    .soft(page.getByRole('heading', { name: 'コード編集' }))
    .toBeVisible();
  // 8. 編集ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByLabel('名称').fill('');
  await page.getByRole('button', { name: '更新' }).click();
  await expect.soft(page.getByText('必須項目です')).toBeVisible();
  await expect
    .soft(page.getByRole('heading', { name: 'コード編集' }))
    .toBeVisible();
  // 9. 編集ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('検証環境起動');
  await page
    .getByLabel('ブロック')
    .fill('```bash\n$ yarn add -D prettier\n```');
  await page.getByRole('button', { name: '更新' }).click();
  // 10. 一覧表示で変更が反映されていることを確認
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術' }))
    .toBeVisible();
  await expect
    .soft(page.getByLabel('コード').getByText('検証環境起動', { exact: true }))
    .toBeVisible();
  await expect
    .soft(
      page
        .getByLabel('コード')
        .getByText('$ yarn add -D prettier', { exact: true }),
    )
    .toBeVisible();

  // ! 削除
  // 11. 編集したコードの削除アイコンをクリックすると削除(モーダル)ページに遷移
  await page.getByRole('button', { name: 'コードのメニュー' }).click();
  await page.getByRole('link', { name: '削除' }).click();
  await expect.soft(page.getByText('本当に削除しますか？')).toBeVisible();
  // 12. 削除ページで「いいえ」を押下すると削除は実行されずスキル詳細ページにリダイレクト
  await page.getByRole('button', { name: 'いいえ' }).click();
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術' }))
    .toBeVisible();
  // 13. 削除ページで「はい」を押下すると削除が実行されてスキル詳細ページにリダイレクト
  await page.getByRole('button', { name: 'コードのメニュー' }).click();
  await page.getByRole('link', { name: '削除' }).click();
  await page.getByRole('button', { name: 'はい' }).click();
  await expect
    .soft(page.getByRole('heading', { name: '気になる技術' }))
    .toBeVisible();
  // 14. 一覧表示に削除したデータがないことを確認
  await expect
    .soft(page.getByLabel('コード').getByText('検証環境起動', { exact: true }))
    .not.toBeVisible();
  await expect
    .soft(
      page
        .getByLabel('コード')
        .getByText('$ yarn add -D prettier', { exact: true }),
    )
    .not.toBeVisible();
});
