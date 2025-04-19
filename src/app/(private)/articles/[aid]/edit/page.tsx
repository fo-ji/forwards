import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import {
  EditArticleForm,
  getArticle,
  paramsArticleSchema,
} from '@/features/articles';

type ArticleEditPageProps = {
  params: Promise<{ aid: string }>;
};

export default async function ArticleEditPage({
  params,
}: ArticleEditPageProps) {
  const { aid } = await params;
  const { data, success } = paramsArticleSchema.safeParse({ aid });
  if (!data || !success) notFound();

  const article = await getArticle({ id: data.aid });
  if (!article) return notFound();

  return (
    <PageLayout>
      <PageTitle title="記事編集" />
      <PageContent>
        <EditArticleForm
          defaultValue={{
            id: article.id,
            name: article.name,
            url: article.url,
          }}
        />
      </PageContent>
    </PageLayout>
  );
}
