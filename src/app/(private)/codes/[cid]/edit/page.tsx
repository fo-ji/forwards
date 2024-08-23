import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { EditCodeForm, getCode, paramsCodeSchema } from '@/features/codes';

type CodeEditPageProps = {
  params: { aid: string };
};

export default async function CodeEditPage({ params }: CodeEditPageProps) {
  const { data, success } = paramsCodeSchema.safeParse(params);
  if (!data || !success) notFound();

  const code = await getCode({ id: data.cid });
  if (!code) return notFound();

  return (
    <PageLayout>
      <PageTitle title="コード編集" />
      <PageContent>
        <EditCodeForm
          defaultValue={{
            id: code.id,
            name: code.name,
            block: code.block,
          }}
        />
      </PageContent>
    </PageLayout>
  );
}
