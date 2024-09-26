import { Status } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import {
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_BADGE_VARIANT,
} from '../../consts';

type ProjectStatusBadgeProps = {
  status: Status;
  className?: string;
};

export const ProjectStatusBadge = ({
  status,
  className,
}: ProjectStatusBadgeProps) => {
  return (
    <Badge
      className={cn('w-fit', className)}
      variant={PROJECT_STATUS_BADGE_VARIANT[status]}
    >
      {PROJECT_STATUS_LABEL[status]}
    </Badge>
  );
};
