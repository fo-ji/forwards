import { Modal, ModalTitle } from '@/components/ui/modal';
import { CreateSkillForm } from '@/features/skills';

export default async function SkillCreateModalPage() {
  return (
    <Modal>
      <ModalTitle title="気になる技術登録" />
      <CreateSkillForm />
    </Modal>
  );
}
