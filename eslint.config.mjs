import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'node_modules',
      'coverage',
      '.next/',
      'out/',
      'build',
      'eslint.config.mjs',
      'playwright-report',
      'test-results',
    ],
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
    },
    settings: {
      tailwindcss: {
        groupByResponsive: true,
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'cmdk',
              importNames: ['Command'],
              message:
                "共通コンポーネントの '@/components/command' を使ってください。",
            },
          ],
          patterns: [
            {
              group: ['@/features/*/*'],
              message: 'index.ts から明示的にエクスポートしてください。',
            },
            {
              group: ['@radix-ui/*'],
              message:
                "共通コンポーネントの '@/components/ui/*' を使ってください。",
            },
          ],
        },
      ],
      'import/no-cycle': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'parent',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next', 'next/**'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/testing/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
