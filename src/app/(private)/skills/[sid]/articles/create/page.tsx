import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { CreateArticleForm } from '@/features/articles';
import { paramsSkillSchema } from '@/features/skills';

type ArticleCreatePageProps = {
  params: { sid: string };
};

export default async function ArticleCreatePage({
  params,
}: ArticleCreatePageProps) {
  const { data, success } = paramsSkillSchema.safeParse(params);
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="記事登録" />
      <PageContent>
        <CreateArticleForm skillId={data.sid} />
      </PageContent>
    </PageLayout>
  );
}
