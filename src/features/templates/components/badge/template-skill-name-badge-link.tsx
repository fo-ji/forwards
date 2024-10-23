import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

type TemplateSkillNameBadgeLinkProps = {
  skillId: string;
  skillName: string;
};

export const TemplateSkillNameBadgeLink = ({
  skillId,
  skillName,
}: TemplateSkillNameBadgeLinkProps) => {
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
