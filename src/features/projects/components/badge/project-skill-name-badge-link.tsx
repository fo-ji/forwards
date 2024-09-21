import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

type ProjectSkillNameBadgeLinkProps = {
  skillId: string;
  skillName: string;
};

export const ProjectSkillNameBadgeLink = ({
  skillId,
  skillName,
}: ProjectSkillNameBadgeLinkProps) => {
  return (
    <Link href={`/skills/${skillId}`}>
      <Badge
        variant="outline"
        className="hover:bg-accent hover:text-accent-foreground"
      >
        {skillName}
      </Badge>
    </Link>
  );
};
