import { ProjectSkillNameBadgeLink } from './project-skill-name-badge-link';

import type { Skill } from '@prisma/client';

type ProjectSkillsLinkGroupProps = {
  skills: Skill[];
};

export const ProjectSkillsLinkGroup = ({
  skills,
}: ProjectSkillsLinkGroupProps) => {
  if (!skills.length) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {skills.map((skill) => (
        <ProjectSkillNameBadgeLink
          key={skill.id}
          skillId={skill.id}
          skillName={skill.name}
        />
      ))}
    </div>
  );
};
