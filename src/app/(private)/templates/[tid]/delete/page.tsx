import { notFound } from 'next/navigation';

import {
  PageContent,
  PageDescription,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { DeleteTemplateForm, paramsTemplateSchema } from '@/features/templates';

type TemplateDeletePageProps = {
  params: { tid: string };
};

export default async function TemplateDeletePage({
  params,
}: TemplateDeletePageProps) {
  const { data, success } = paramsTemplateSchema.safeParse(params);
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="本当に削除しますか？" />
      <PageContent>
        <PageDescription className="mb-8">
          一度削除するとデータは復元できません。
        </PageDescription>
        <DeleteTemplateForm defaultValue={{ id: data.tid }} />
      </PageContent>
    </PageLayout>
  );
}
