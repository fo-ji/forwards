import { notFound } from 'next/navigation';

import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal';
import { DeleteProjectForm, paramsProjectSchema } from '@/features/projects';

type ProjectDeleteModalPageProps = {
  params: Promise<{ pid: string }>;
};

export default async function ProjectDeleteModalPage({
  params,
}: ProjectDeleteModalPageProps) {
  const { pid } = await params;
  const { data, success } = paramsProjectSchema.safeParse({ pid });
  if (!data || !success) notFound();

  return (
    <Modal>
      <ModalTitle title="本当に削除しますか？" />
      <ModalDescription className="mb-8">
        一度削除するとデータは復元できません。
      </ModalDescription>
      <DeleteProjectForm defaultValue={{ id: data.pid }} />
    </Modal>
  );
}
