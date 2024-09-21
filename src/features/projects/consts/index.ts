import { Status } from '@prisma/client';

import type { BadgeProps } from '@/components/ui/badge';

export const PROJECT_STATUS_OPTIONS = [
  { label: '準備中', value: Status.READY },
  { label: '進行中', value: Status.DOING },
  { label: '完了', value: Status.DONE },
];

export const PROJECT_STATUS_LABEL = {
  [Status.READY]: '準備中',
  [Status.DOING]: '進行中',
  [Status.DONE]: '完了',
};

export const PROJECT_STATUS_BADGE_VARIANT: Record<
  Status,
  BadgeProps['variant']
> = {
  [Status.READY]: 'default',
  [Status.DOING]: 'destructive',
  [Status.DONE]: 'secondary',
};
