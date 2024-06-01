import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { PageLayout, PageTitle } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Loading } from '@/components/ui/loading';
import {
  SkillsListContainer,
  searchParamsSkillsListSchema,
} from '@/features/skills';

type SkillsListPageProps = {
  searchParams: { page?: string; pageSize?: string };
};

export default async function SkillsListPage({
  searchParams,
}: SkillsListPageProps) {
  const { data, success } =
    searchParamsSkillsListSchema.safeParse(searchParams);
  if (!success) notFound();

  return (
    <PageLayout>
      <PageTitle title="気になる技術" />
      <div className="text-right">
        <Button asChild>
          <Link href="/skills/create" variant="default">
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
        <SkillsListContainer {...data} />
      </Suspense>
    </PageLayout>
  );
}
