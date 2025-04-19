import { notFound } from 'next/navigation';

import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal';
import { DeleteArticleForm, paramsArticleSchema } from '@/features/articles';

type ArticleDeleteModalPageProps = {
  params: Promise<{ aid: string }>;
};

export default async function ArticleDeleteModalPage({
  params,
}: ArticleDeleteModalPageProps) {
  const { aid } = await params;
  const { data, success } = paramsArticleSchema.safeParse({ aid });
  if (!data || !success) notFound();

  return (
    <Modal>
      <ModalTitle title="本当に削除しますか？" />
      <ModalDescription className="mb-8">
        一度削除するとデータは復元できません。
      </ModalDescription>
      <DeleteArticleForm defaultValue={{ id: data.aid }} />
    </Modal>
  );
}
