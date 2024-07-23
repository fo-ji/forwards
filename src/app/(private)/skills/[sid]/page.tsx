import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import {
  paramsSkillSchema,
  SkillMetaContainer,
  SkillMetaSkelton,
} from '@/features/skills';

type SkillPageProps = {
  params: { sid: string };
};

export default async function SkillPage({ params }: SkillPageProps) {
  const { data, success } = paramsSkillSchema.safeParse(params);
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="気になる技術" className="mb-8" />
      <PageContent size="full">
        <Suspense fallback={<SkillMetaSkelton />}>
          <SkillMetaContainer skillId={data.sid} />
        </Suspense>
      </PageContent>
    </PageLayout>
  );
}
