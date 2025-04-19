import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { PageLayout, PageTitle } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Loading } from '@/components/ui/loading';
import {
  ProjectsListContainer,
  ProjectsListPageParams,
  searchParamsProjectsListSchema,
} from '@/features/projects';

type ProjectsListPageProps = {
  searchParams: Promise<ProjectsListPageParams>;
};

export default async function ProjectsListPage({
  searchParams,
}: ProjectsListPageProps) {
  const { name, page, pageSize, orderBy, sortDirection } = await searchParams;
  const { data, success } = searchParamsProjectsListSchema.safeParse({
    name,
    page,
    pageSize,
    orderBy,
    sortDirection,
  });

  if (!success) notFound();

  return (
    <PageLayout>
      <PageTitle title="プロジェクト" />
      <div className="text-right">
        <Button asChild>
          <Link href="/projects/create" variant="default" scroll={false}>
            新規作成
          </Link>
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="flex h-[480px] items-center justify-center">
            <Loading />
          </div>
        }
      >
        <ProjectsListContainer {...data} />
      </Suspense>
    </PageLayout>
  );
}
