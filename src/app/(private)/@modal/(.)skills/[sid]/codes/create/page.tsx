import { notFound } from 'next/navigation';

import { Modal, ModalTitle } from '@/components/ui/modal';
import { CreateCodeForm } from '@/features/codes';
import { paramsSkillSchema } from '@/features/skills';

type CodeCreateModalPageProps = {
  params: Promise<{ sid: string }>;
};

export default async function CodeCreateModalPage({
  params,
}: CodeCreateModalPageProps) {
  const { sid } = await params;
  const { data, success } = paramsSkillSchema.safeParse({ sid });
  if (!data || !success) notFound();

  return (
    <Modal>
      <ModalTitle title="コード登録" />
      <CreateCodeForm skillId={data.sid} />
    </Modal>
  );
}
