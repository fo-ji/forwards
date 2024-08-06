import { notFound } from 'next/navigation';

import { Modal, ModalTitle } from '@/components/ui/modal';
import {
  EditArticleForm,
  getArticle,
  paramsArticleSchema,
} from '@/features/articles';

type ArticleEditModalPageProps = {
  params: { aid: string };
};

export default async function ArticleEditModalPage({
  params,
}: ArticleEditModalPageProps) {
  const { data, success } = paramsArticleSchema.safeParse(params);
  if (!data || !success) notFound();

  const article = await getArticle({ id: data.aid });
  if (!article) return notFound();

  return (
    <Modal>
      <ModalTitle title="記事編集" />
      <EditArticleForm
        defaultValue={{ id: article.id, name: article.name, url: article.url }}
      />
    </Modal>
  );
}
