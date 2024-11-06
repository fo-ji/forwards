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
  paramsSkillSchema,
  SkillMetaContainer,
  SkillMetaSkelton,
} from '@/features/skills';

type SkillPageProps = {
  params: Promise<{ sid: string }>;
};

export default async function SkillPage({ params }: SkillPageProps) {
  const { sid } = await params;
  const { data, success } = paramsSkillSchema.safeParse({ sid });
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="気になる技術" className="mb-8" />
      <div className="flex justify-end gap-2 pb-2">
        <Link
          href={`/skills/${data.sid}/edit`}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <Icon name="Pencil" />
          <span className="sr-only">スキルの編集ページへ</span>
        </Link>
        <Link
          href={`/skills/${data.sid}/delete`}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <Icon name="Trash2" />
          <span className="sr-only">スキルの削除ページへ</span>
        </Link>
      </div>
      <PageContent size="full">
        <Suspense fallback={<SkillMetaSkelton />}>
          <SkillMetaContainer skillId={data.sid} />
        </Suspense>
      </PageContent>
    </PageLayout>
  );
}
