import { notFound } from 'next/navigation';

import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal';
import { DeleteCodeForm, paramsCodeSchema } from '@/features/codes';

type CodeDeleteModalPageProps = {
  params: { cid: string };
};

export default async function CodeDeleteModalPage({
  params,
}: CodeDeleteModalPageProps) {
  const { data, success } = paramsCodeSchema.safeParse(params);
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
