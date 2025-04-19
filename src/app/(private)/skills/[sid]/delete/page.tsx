import { notFound } from 'next/navigation';

import {
  PageContent,
  PageDescription,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { DeleteSkillForm, paramsSkillSchema } from '@/features/skills';

type SkillDeletePageProps = {
  params: Promise<{ sid: string }>;
};

export default async function SkillDeletePage({
  params,
}: SkillDeletePageProps) {
  const { sid } = await params;
  const { data, success } = paramsSkillSchema.safeParse({ sid });
  if (!data || !success) notFound();

  return (
    <PageLayout>
      <PageTitle title="本当に削除しますか？" />
      <PageContent>
        <PageDescription className="mb-8">
          一度削除するとデータは復元できません。
          <br />
          また、プロジェクトで登録されているこのスキルも削除されます。
        </PageDescription>
        <DeleteSkillForm defaultValue={{ id: data.sid }} />
      </PageContent>
    </PageLayout>
  );
}
