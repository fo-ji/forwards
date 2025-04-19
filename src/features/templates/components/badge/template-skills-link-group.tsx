import { TemplateSkillNameBadgeLink } from './template-skill-name-badge-link';

import type { Skill } from '@prisma/client';

type TemplateSkillsLinkGroupProps = {
  skills: Skill[];
};

export const TemplateSkillsLinkGroup = ({
  skills,
}: TemplateSkillsLinkGroupProps) => {
  if (!skills.length) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {skills.map((skill) => (
        <TemplateSkillNameBadgeLink
          key={skill.id}
          skillId={skill.id}
          skillName={skill.name}
        />
      ))}
    </div>
  );
};
