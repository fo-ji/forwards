import { SkillProjectNameBadgeLink } from './skill-project-name-badge-link';

import type { Project } from '@prisma/client';

type SkillProjectsLinkGroupProps = {
  projects: Project[];
};

export const SkillProjectsLinkGroup = ({
  projects,
}: SkillProjectsLinkGroupProps) => {
  if (!projects.length) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {projects.map((project) => (
        <SkillProjectNameBadgeLink
          key={project.id}
          projectId={project.id}
          projectName={project.name}
        />
      ))}
    </div>
  );
};
