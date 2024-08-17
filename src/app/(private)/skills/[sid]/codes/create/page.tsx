import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { CreateCodeForm } from '@/features/codes';
import { paramsSkillSchema } from '@/features/skills';

type CodeCreatePageProps = {
  params: { sid: string };
};

export default async function CodeCreatePage({ params }: CodeCreatePageProps) {
  const { data, success } = paramsSkillSchema.safeParse(params);
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="コード登録" />
      <PageContent>
        <CreateCodeForm skillId={data.sid} />
      </PageContent>
    </PageLayout>
  );
}
