import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { PageLayout, PageTitle } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Loading } from '@/components/ui/loading';
import {
  searchParamsTemplatesListSchema,
  TemplatesListContainer,
  type TemplatesListPageParams,
} from '@/features/templates';

type TemplatesListPageProps = {
  searchParams: TemplatesListPageParams;
};

export default async function TemplatesListPage({
  searchParams,
}: TemplatesListPageProps) {
  const { data, success } =
    searchParamsTemplatesListSchema.safeParse(searchParams);

  if (!success) notFound();

  return (
    <PageLayout>
      <PageTitle title="テンプレート" />
      <div className="text-right">
        <Button asChild>
          <Link href="/templates/create" variant="default" scroll={false}>
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
        <TemplatesListContainer {...data} />
      </Suspense>
    </PageLayout>
  );
}
