import { expect, test } from '@playwright/test';

// ! テストシナリオ
// 事前準備
// 1. スキル(React.js, Nest.js)を2件新規で作成する

// 新規作成
// 2. 新規作成ページに遷移
// 3. 新規作成ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 4. 新規作成ページで正しい値を入力してサブミット
// 5. 記事の作成が成功したことをトーストで表示

// 一覧表示
// 6. 新しく作成したプロジェクトが表示されることを確認

// 詳細表示
// 7. 作成したプロジェクト名をクリックして詳細ページに遷移
// 8. 正しくname, status, url, skillsが表示されていることを確認
// 9. 編集、削除ボタンがページ内に存在することを確認
// 10. サイドバーの「プロジェクトアイコン」をクリックしてプロジェクト一覧ページに遷移

// 編集
// 11. 新しく作成したプロジェクトの メニュー > 編集 をクリックすると編集ページに遷移
// 12. 編集ページで不正な値を入力してエラーメッセージ確認とサブミットできないことを確認
// 13. 編集ページで正しい値を入力してサブミット
// 14. 一覧表示で変更が反映されていることを確認

// 削除
// 15. 編集したプロジェクトの削除アイコンをクリックすると削除(モーダル)ページに遷移
// 16. 削除ページで「いいえ」を押下すると削除は実行されずプロジェクトページにリダイレクト
// 17. 削除ページで「はい」を押下すると削除が実行されてプロジェクトページにリダイレクト
// 18. 一覧表示に削除したデータがないことを確認

test('プロジェクト一覧/新規作成/編集/削除', async ({ page }) => {
  // ! 事前準備
  // 1. スキル(React.js, Nest.js)を2件新規で作成する
  await page.goto('/skills');
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('React.js');
  await page.getByLabel('URL').fill('https://ja.react.dev/');
  await page.getByRole('button', { name: '新規登録' }).click();
  await page.getByRole('link', { name: '新規作成' }).click();
  await page.getByLabel('名称').fill('Nest.js');
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
  await page.getByRole('option', { name: 'React.js' }).click();
  await page.getByRole('option', { name: 'Nest.js' }).click();
  await page.getByRole('option', { name: '閉じる' }).click();
  await page.getByLabel('URL').fill('http://localhost:3000');
  await page.getByLabel('インストール手順').fill('## setup\n- hoge\n- foo');
  await page.getByRole('button', { name: '新規登録' }).click();
  // 5. 記事の作成が成功したことをトーストで表示
  await expect
    .soft(page.getByText('プロジェクトを登録しました', { exact: true }))
    .toBeVisible();

  // ! 一覧表示
  // 6. 新しく作成したプロジェクトが表示されることを確認
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
    .soft(page.getByRole('cell', { name: 'React.js Nest.js', exact: true }))
    .toBeVisible();
  await expect
    .soft(
      page.getByRole('cell', { name: 'http://localhost:3000', exact: true }),
    )
    .toBeVisible();

  // ! 詳細表示
  // 7. 作成したプロジェクト名をクリックして詳細ページに遷移
  await page.getByRole('link', { name: 'プロジェクトA', exact: true }).click();
  // 8. 正しくname, status, url, skillsが表示されていることを確認
  await expect
    .soft(page.getByText('プロジェクトA', { exact: true }))
    .toBeVisible();
  await expect.soft(page.getByText('準備中', { exact: true })).toBeVisible();
  await expect
    .soft(page.getByText('http://localhost:3000', { exact: true }))
    .toBeVisible();
  await expect.soft(page.getByText('React.js', { exact: true })).toBeVisible();
  await expect.soft(page.getByText('Nest.js', { exact: true })).toBeVisible();
  await expect
    .soft(page.getByRole('button', { name: '気になるスキル', exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('button', { name: 'インストール手順' }))
    .toBeVisible();
  // 9. 編集、削除ボタンがページ内に存在することを確認
  await expect
    .soft(page.getByRole('link', { name: 'プロジェクトの編集ページへ' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('link', { name: 'プロジェクトの削除ページへ' }))
    .toBeVisible();
  // 10. サイドバーの「プロジェクトアイコン」をクリックしてプロジェクト一覧ページに遷移
  await page.getByRole('link', { name: 'プロジェクト一覧ページへ' }).click();

  // ! 編集
  // 11. 新しく作成したプロジェクトの メニュー > 編集 をクリックすると編集ページに遷移
  await page
    .getByRole('link', { name: 'プロジェクトの編集ページへ' })
    .first()
    .click();
  await expect
    .soft(page.getByRole('heading', { name: 'プロジェクト編集' }))
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
    .soft(page.getByRole('heading', { name: 'プロジェクト編集' }))
    .toBeVisible();
  // 13. 編集ページで正しい値を入力してサブミット
  await page.getByLabel('名称').fill('プロジェクトB');
  await page.getByTestId('status').click();
  await page.getByLabel('進行中').click();
  await page.getByLabel('skillIds').click();
  await page.getByRole('option', { name: '解除' }).click();
  await page.getByRole('option', { name: '閉じる' }).click();
  await page.getByLabel('URL').fill('https://nextjs.org/');
  await page
    .getByLabel('インストール手順')
    .fill('## setup\n- hoge\n- foo\nupdate');
  await page.getByRole('button', { name: '更新' }).click();
  // 14. 一覧表示で変更が反映されていることを確認
  await expect
    .soft(page.getByRole('heading', { name: 'プロジェクト' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: '進行中', exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'プロジェクトB', exact: true }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'React.js Nest.js', exact: true }))
    .not.toBeVisible();
  await expect
    .soft(page.getByRole('cell', { name: 'https://nextjs.org/', exact: true }))
    .toBeVisible();

  // ! 削除
  // 15. 編集したプロジェクトの削除アイコンをクリックすると削除(モーダル)ページに遷移
  await page
    .getByRole('link', { name: 'プロジェクトの削除ページへ' })
    .first()
    .click();
  // 16. 削除ページで「いいえ」を押下すると削除は実行されずプロジェクトページにリダイレクト
  await page.getByRole('button', { name: 'いいえ' }).click();
  await expect.soft(page).toHaveURL('/projects');
  await expect
    .soft(page.getByRole('cell', { name: 'プロジェクトB', exact: true }))
    .toBeVisible();
  // 17. 削除ページで「はい」を押下すると削除が実行されてプロジェクトページにリダイレクト
  await page
    .getByRole('link', { name: 'プロジェクトの削除ページへ' })
    .first()
    .click();
  await page.getByRole('button', { name: 'はい' }).click();
  await expect.soft(page).toHaveURL('/projects');
  // 18. 一覧表示に削除したデータがないことを確認
  await expect
    .soft(page.getByRole('cell', { name: 'プロジェクトB', exact: true }))
    .not.toBeVisible();
  await expect.soft(page.getByText('https://nextjs.org/')).not.toBeVisible();
});
