import { notFound } from 'next/navigation';

import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal';
import { DeleteCodeForm, paramsCodeSchema } from '@/features/codes';

type CodeDeleteModalPageProps = {
  params: Promise<{ cid: string }>;
};

export default async function CodeDeleteModalPage({
  params,
}: CodeDeleteModalPageProps) {
  const { cid } = await params;
  const { data, success } = paramsCodeSchema.safeParse({ cid });
  if (!data || !success) notFound();

  return (
    <Modal>
      <ModalTitle title="本当に削除しますか？" />
      <ModalDescription className="mb-8">
        一度削除するとデータは復元できません。
      </ModalDescription>
      <DeleteCodeForm defaultValue={{ id: data.cid }} />
    </Modal>
  );
}
