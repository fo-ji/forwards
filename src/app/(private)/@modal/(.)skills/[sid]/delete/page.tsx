import { notFound } from 'next/navigation';

import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal';
import { DeleteSkillForm, paramsSkillSchema } from '@/features/skills';

type SkillDeleteModalPageProps = {
  params: Promise<{ sid: string }>;
};

export default async function SkillDeleteModalPage({
  params,
}: SkillDeleteModalPageProps) {
  const { sid } = await params;
  const { data, success } = paramsSkillSchema.safeParse({ sid });
  if (!data || !success) notFound();

  return (
    <Modal>
      <ModalTitle title="本当に削除しますか？" />
      <ModalDescription className="mb-8">
        一度削除するとデータは復元できません。
        <br />
        また、プロジェクトで登録されているこのスキルも削除されます。
      </ModalDescription>
      <DeleteSkillForm defaultValue={{ id: data.sid }} />
    </Modal>
  );
}
