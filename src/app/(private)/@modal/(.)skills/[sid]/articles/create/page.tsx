import { notFound } from 'next/navigation';

import { Modal, ModalTitle } from '@/components/ui/modal';
import { CreateArticleForm } from '@/features/articles';
import { paramsSkillSchema } from '@/features/skills';

type ArticleCreateModalPageProps = {
  params: Promise<{ sid: string }>;
};

export default async function ArticleCreateModalPage({
  params,
}: ArticleCreateModalPageProps) {
  const { sid } = await params;
  const { data, success } = paramsSkillSchema.safeParse({ sid });
  if (!data || !success) notFound();

  return (
    <Modal>
      <ModalTitle title="記事登録" />
      <CreateArticleForm skillId={data.sid} />
    </Modal>
  );
}
