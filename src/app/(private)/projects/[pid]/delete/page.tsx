import { notFound } from 'next/navigation';

import {
  PageContent,
  PageDescription,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { DeleteProjectForm, paramsProjectSchema } from '@/features/projects';

type ProjectDeletePageProps = {
  params: Promise<{ sid: string }>;
};

export default async function ProjectDeletePage({
  params,
}: ProjectDeletePageProps) {
  const { sid } = await params;
  const { data, success } = paramsProjectSchema.safeParse({ sid });
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="本当に削除しますか？" />
      <PageContent>
        <PageDescription className="mb-8">
          一度削除するとデータは復元できません。
        </PageDescription>
        <DeleteProjectForm defaultValue={{ id: data.pid }} />
      </PageContent>
    </PageLayout>
  );
}
