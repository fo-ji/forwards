import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import {
  paramsProjectSchema,
  ProjectMetaContainer,
  ProjectMetaSkelton,
} from '@/features/projects';

type ProjectPageProps = {
  params: Promise<{ pid: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { pid } = await params;
  const { data, success } = paramsProjectSchema.safeParse({ pid });
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="プロジェクト" className="mb-8" />
      <div className="flex justify-end gap-2 pb-2">
        <Link
          href={`/projects/${data.pid}/edit`}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <Icon name="Pencil" />
          <span className="sr-only">プロジェクトの編集ページへ</span>
        </Link>
        <Link
          href={`/projects/${data.pid}/delete`}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <Icon name="Trash2" />
          <span className="sr-only">プロジェクトの削除ページへ</span>
        </Link>
      </div>
      <PageContent size="full">
        <Suspense fallback={<ProjectMetaSkelton />}>
          <ProjectMetaContainer projectId={data.pid} />
        </Suspense>
      </PageContent>
    </PageLayout>
  );
}
