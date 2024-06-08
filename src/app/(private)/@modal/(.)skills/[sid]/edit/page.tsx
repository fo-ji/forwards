import { notFound } from 'next/navigation';

import { Modal, ModalTitle } from '@/components/ui/modal';
import { EditSkillForm, getSkill, paramsSkillSchema } from '@/features/skills';

type SkillEditModalPageProps = {
  params: { sid: string };
};

export default async function SkillEditModalPage({
  params,
}: SkillEditModalPageProps) {
  const { data, success } = paramsSkillSchema.safeParse(params);
  if (!data || !success) notFound();

  const skill = await getSkill({ id: data.sid });
  if (!skill) return notFound();

  return (
    <Modal>
      <ModalTitle title="気になる技術編集" />
      <EditSkillForm
        defaultValue={{ id: skill.id, name: skill.name, url: skill.url }}
      />
    </Modal>
  );
}
