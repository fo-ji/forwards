import { Status } from '@prisma/client';

import { Badge } from '@/components/ui/badge';

import {
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_BADGE_VARIANT,
} from '../../consts';

type ProjectStatusBadgeProps = {
  status: Status;
};

export const ProjectStatusBadge = ({ status }: ProjectStatusBadgeProps) => {
  return (
    <Badge variant={PROJECT_STATUS_BADGE_VARIANT[status]}>
      {PROJECT_STATUS_LABEL[status]}
    </Badge>
  );
};
