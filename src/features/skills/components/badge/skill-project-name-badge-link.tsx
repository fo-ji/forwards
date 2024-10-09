import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

type SkillProjectNameBadgeLinkProps = {
  projectId: string;
  projectName: string;
};

export const SkillProjectNameBadgeLink = ({
  projectId,
  projectName,
}: SkillProjectNameBadgeLinkProps) => {
  return (
    <Link href={`/projects/${projectId}`}>
      <Badge
        variant="outline"
        className="hover:bg-accent hover:text-accent-foreground"
      >
        {projectName}
      </Badge>
    </Link>
  );
};
