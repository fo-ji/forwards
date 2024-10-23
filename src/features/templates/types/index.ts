import type { Skill, Template } from '@prisma/client';

export type TemplateWithRelations = Template & {
  skills: Skill[];
};
