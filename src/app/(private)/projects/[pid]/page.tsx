import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import {
  paramsProjectSchema,
  ProjectMetaContainer,
  ProjectMetaSkelton,
} from '@/features/projects';

type ProjectPageProps = {
  params: { pid: string };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { data, success } = paramsProjectSchema.safeParse(params);
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="プロジェクト" className="mb-8" />
      <PageContent size="full">
        <Suspense fallback={<ProjectMetaSkelton />}>
          <ProjectMetaContainer projectId={data.pid} />
        </Suspense>
      </PageContent>
    </PageLayout>
  );
}
