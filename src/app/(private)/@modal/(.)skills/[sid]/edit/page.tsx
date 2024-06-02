import { Modal, ModalTitle } from '@/components/ui/modal';
import { EditSkillForm, getSkill } from '@/features/skills';

type SkillEditModalPageProps = {
  params: { sid: string };
};

export default async function SkillEditModalPage({
  params,
}: SkillEditModalPageProps) {
  const skill = await getSkill({ id: params.sid });

  if (!skill) return null;
  return (
    <Modal>
      <ModalTitle title="気になる技術編集" />
      <EditSkillForm
        defaultValue={{ id: skill.id, name: skill.name, url: skill.url }}
      />
    </Modal>
  );
}
