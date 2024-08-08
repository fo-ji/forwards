import { notFound } from 'next/navigation';

import {
  PageContent,
  PageDescription,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { DeleteArticleForm, paramsArticleSchema } from '@/features/articles';

type ArticleDeletePageProps = {
  params: { sid: string };
};

export default async function ArticleDeletePage({
  params,
}: ArticleDeletePageProps) {
  const { data, success } = paramsArticleSchema.safeParse(params);
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="本当に削除しますか？" />
      <PageContent>
        <PageDescription className="mb-8">
          一度削除するとデータは復元できません。
        </PageDescription>
        <DeleteArticleForm defaultValue={{ id: data.aid }} />
      </PageContent>
    </PageLayout>
  );
}
