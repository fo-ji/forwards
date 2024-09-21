import type { Project, Skill } from '@prisma/client';

export type ProjectWithRelations = Project & {
  skills: Skill[];
};
