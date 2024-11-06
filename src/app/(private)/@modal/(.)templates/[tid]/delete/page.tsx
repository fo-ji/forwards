import { notFound } from 'next/navigation';

import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal';
import { DeleteTemplateForm, paramsTemplateSchema } from '@/features/templates';

type TemplateDeleteModalPageProps = {
  params: Promise<{ tid: string }>;
};

export default async function TemplateDeleteModalPage({
  params,
}: TemplateDeleteModalPageProps) {
  const { tid } = await params;
  const { data, success } = paramsTemplateSchema.safeParse({ tid });
  if (!data || !success) notFound();

  return (
    <Modal>
      <ModalTitle title="本当に削除しますか？" />
      <ModalDescription className="mb-8">
        一度削除するとデータは復元できません。
      </ModalDescription>
      <DeleteTemplateForm defaultValue={{ id: data.tid }} />
    </Modal>
  );
}
