import type { Article, Skill } from '@prisma/client';

export type SkillWithRelations = Skill & {
  articles: Article[];
};
