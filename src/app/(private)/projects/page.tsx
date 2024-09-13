import { Suspense } from 'react';

import { PageLayout, PageTitle } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Loading } from '@/components/ui/loading';

export default async function ProjectsListPage() {
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
        {/* <SkillsListContainer {...data} /> */}
      </Suspense>
    </PageLayout>
  );
}
