import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { EditCodeForm, getCode, paramsCodeSchema } from '@/features/codes';

type CodeEditPageProps = {
  params: Promise<{ aid: string }>;
};

export default async function CodeEditPage({ params }: CodeEditPageProps) {
  const { aid } = await params;
  const { data, success } = paramsCodeSchema.safeParse({ aid });
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
