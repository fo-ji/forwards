import { notFound } from 'next/navigation';

import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';

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

  return (
    <div>
      <div className="flex justify-end gap-2 pb-2">
        <Link
          href={`/skills/${skill.id}/edit`}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <Icon name="Pencil" />
          <span className="sr-only">スキルの編集ページへ</span>
        </Link>
        <Link
          href={`/skills/${skill.id}/delete`}
          variant="destructive"
          size="icon"
          className="rounded-full"
        >
          <Icon name="Trash2" />
          <span className="sr-only">スキルの削除ページへ</span>
        </Link>
      </div>
      <SkillMeta skill={skill} />
    </div>
  );
};
