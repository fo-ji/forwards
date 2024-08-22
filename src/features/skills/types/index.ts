import type { Article, Code, Skill } from '@prisma/client';

export type SkillWithRelations = Skill & {
  articles: Article[];
  codes: Code[];
};
