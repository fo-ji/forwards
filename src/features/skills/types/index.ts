import type { Article, Code, Project, Skill } from '@prisma/client';

export type SkillWithRelations = Skill & {
  articles: Article[];
  codes: Code[];
  projects: Project[];
};

export type SkillWithProjects = Skill & {
  projects: Project[];
};
