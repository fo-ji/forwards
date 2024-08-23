import { notFound } from 'next/navigation';

import { Modal, ModalTitle } from '@/components/ui/modal';
import { EditCodeForm, getCode, paramsCodeSchema } from '@/features/codes';

type CodeEditModalPageProps = {
  params: { cid: string };
};

export default async function CodeEditModalPage({
  params,
}: CodeEditModalPageProps) {
  const { data, success } = paramsCodeSchema.safeParse(params);
  if (!data || !success) notFound();

  const code = await getCode({ id: data.cid });
  if (!code) return notFound();

  return (
    <Modal>
      <ModalTitle title="コード編集" />
      <EditCodeForm
        defaultValue={{ id: code.id, name: code.name, block: code.block }}
      />
    </Modal>
  );
}
