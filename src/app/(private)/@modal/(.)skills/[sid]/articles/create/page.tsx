import { notFound } from 'next/navigation';

import { Modal, ModalTitle } from '@/components/ui/modal';
import { CreateArticleForm } from '@/features/articles';
import { paramsSkillSchema } from '@/features/skills';

type ArticleCreateModalPageProps = {
  params: { sid: string };
};

export default async function ArticleCreateModalPage({
  params,
}: ArticleCreateModalPageProps) {
  const { data, success } = paramsSkillSchema.safeParse(params);
  if (!data || !success) notFound();

  return (
    <Modal>
      <ModalTitle title="記事登録" />
      <CreateArticleForm skillId={data.sid} />
    </Modal>
  );
}
