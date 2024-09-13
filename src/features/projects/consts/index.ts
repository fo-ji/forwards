import { Status } from '@prisma/client';

export const PROJECT_STATUS_OPTIONS = [
  { label: '準備中', value: Status.READY },
  { label: '進行中', value: Status.DOING },
  { label: '完了', value: Status.DONE },
];
