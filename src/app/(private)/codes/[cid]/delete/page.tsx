import { notFound } from 'next/navigation';

import {
  PageContent,
  PageDescription,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { DeleteCodeForm, paramsCodeSchema } from '@/features/codes';

type CodeDeletePageProps = {
  params: { sid: string };
};

export default async function CodeDeletePage({ params }: CodeDeletePageProps) {
  const { data, success } = paramsCodeSchema.safeParse(params);
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="本当に削除しますか？" />
      <PageContent>
        <PageDescription className="mb-8">
          一度削除するとデータは復元できません。
        </PageDescription>
        <DeleteCodeForm defaultValue={{ id: data.cid }} />
      </PageContent>
    </PageLayout>
  );
}
