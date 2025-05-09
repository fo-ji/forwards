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

// 詳細表示
// todo 7 ~ 10

// 編集
// 11. 新しく作成したテンプレートの メニュー > 編集 をクリックすると編集ページに遷移
// 12. 編集ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 13. 編集ページで正しい値を入力してサブミット
// 14. 一覧表示で変更が反映されていることを確認

// 削除
// 15. 編集したテンプレートの削除アイコンをクリックすると削除(モーダル)ページに遷移
// 16. 削除ページで「いいえ」を押下すると削除は実行されずテンプレートページにリダイレクト
// 17. 削除ページで「はい」を押下すると削除が実行されてテンプレートページにリダイレクト
// 18. 一覧表示に削除したデータがないことを確認

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

  // ! 詳細表示
  // todo 7 ~ 10

  // ! 編集
  // 11. 新しく作成したテンプレートの メニュー > 編集 をクリックすると編集ページに遷移
  await page
    .getByRole('link', { name: 'テンプレートの編集ページへ' })
    .first()
    .click();
  await expect
    .soft(page.getByRole('heading', { name: 'テンプレート編集' }))
    .toBeVisible();
  // 12. 編集ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
  await page.getByLabel('名称').fill('');
  await page.getByRole('button', { name: '更新' }).click();
  await expect.soft(page.getByText('必須項目です')).toBeVisible();
  await expect
    .soft(page.getByRole('heading', { name: 'テンプレート編集' }))
    .toBeVisible();
  // 13. 編集ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('テンプレートB');
  await page.getByLabel('skillIds').click();
  await page.getByRole('option', { name: '解除' }).click();
  await page.getByRole('option', { name: '閉じる' }).click();
  await page
    .getByLabel('インストール手順')
    .fill('## setup\n- hoge\n- foo\nupdate');
  await page.getByRole('button', { name: '更新' }).click();
  // 14. 一覧表示で変更が反映されていることを確認
  await expect
    .soft(page.getByRole('heading', { name: 'テンプレート' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'テンプレートB', exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'Prisma SWR', exact: true }))
    .not.toBeVisible();

  // ! 削除
  // 15. 編集したテンプレートの削除アイコンをクリックすると削除(モーダル)ページに遷移
  await page
    .getByRole('link', { name: 'テンプレートの削除ページへ' })
    .first()
    .click();
  // 16. 削除ページで「いいえ」を押下すると削除は実行されずテンプレートページにリダイレクト
  await page.getByRole('button', { name: 'いいえ' }).click();
  await expect.soft(page).toHaveURL('/templates');
  await expect
    .soft(page.getByRole('cell', { name: 'テンプレートB', exact: true }))
    .toBeVisible();
  // 17. 削除ページで「はい」を押下すると削除が実行されてテンプレートページにリダイレクト
  await page
    .getByRole('link', { name: 'テンプレートの削除ページへ' })
    .first()
    .click();
  await page.getByRole('button', { name: 'はい' }).click();
  await expect.soft(page).toHaveURL('/templates');
  // 18. 一覧表示に削除したデータがないことを確認
  await expect
    .soft(page.getByRole('cell', { name: 'テンプレートB', exact: true }))
    .not.toBeVisible();
});
