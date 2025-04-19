import { AxeBuilder } from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

// ! https://azukiazusa.dev/blog/axe-core-playwright/#html-%E3%83%AC%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E5%87%BA%E5%8A%9B%E3%81%99%E3%82%8B
// ! memo: レポートが見にくい場合はHTMLレポートを生成する

test('アクセシビリティテスト - TOPページ', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  expect(results.violations.length).toBe(0);
});

test('アクセシビリティテスト - ログインページ', async ({ page }) => {
  await page.goto('/login');

  const results = await new AxeBuilder({ page })
    .disableRules(['page-has-heading-one'])
    .analyze();

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  expect(results.violations.length).toBe(0);
});

test('アクセシビリティテスト - ユーザー新規登録ページ', async ({ page }) => {
  await page.goto('/register');

  const results = await new AxeBuilder({ page })
    .disableRules(['page-has-heading-one'])
    .analyze();

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  expect(results.violations.length).toBe(0);
});

test('アクセシビリティテスト - プロジェクト一覧ページ', async ({ page }) => {
  await page.goto('/projects');

  const results = await new AxeBuilder({ page }).analyze();

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  expect(results.violations.length).toBe(0);
});

test('アクセシビリティテスト - プロジェクト新規作成ページ', async ({
  page,
}) => {
  await page.goto('/projects/create');

  const results = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .analyze();

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  expect(results.violations.length).toBe(0);
});

test('アクセシビリティテスト - 気になるスキル一覧ページ', async ({ page }) => {
  await page.goto('/skills');

  const results = await new AxeBuilder({ page }).analyze();

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  expect(results.violations.length).toBe(0);
});

test('アクセシビリティテスト - 気になるスキル新規作成ページ', async ({
  page,
}) => {
  await page.goto('/skills/create');

  const results = await new AxeBuilder({ page }).analyze();

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  expect(results.violations.length).toBe(0);
});

test('アクセシビリティテスト - テンプレート一覧ページ', async ({ page }) => {
  await page.goto('/templates');

  const results = await new AxeBuilder({ page }).analyze();

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  expect(results.violations.length).toBe(0);
});

test('アクセシビリティテスト - テンプレート新規作成ページ', async ({
  page,
}) => {
  await page.goto('/templates/create');

  const results = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .analyze();

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  expect(results.violations.length).toBe(0);
});
