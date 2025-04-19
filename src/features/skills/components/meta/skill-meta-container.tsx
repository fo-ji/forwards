import { notFound } from 'next/navigation';

import { getSkill } from '../../api/get-skill';

import { SkillMeta } from './skill-meta';

type SkillMetaContainerProps = {
  skillId: string;
};

export const SkillMetaContainer = async ({
  skillId,
}: SkillMetaContainerProps) => {
  const skill = await getSkill({ id: skillId });
  if (!skill) return notFound();

  return <SkillMeta skill={skill} />;
};
