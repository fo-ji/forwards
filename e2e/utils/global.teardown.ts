import { test as teardown } from '@playwright/test';

import { resetDB } from './reset-db';

teardown('cleanup', async ({}) => {
  await resetDB(['User', 'Account', 'Skill', 'Article']);
});
