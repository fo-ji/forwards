import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { EditSkillForm, getSkill, paramsSkillSchema } from '@/features/skills';

type SkillEditPageProps = {
  params: { sid: string };
};

export default async function SkillEditPage({ params }: SkillEditPageProps) {
  const { data, success } = paramsSkillSchema.safeParse(params);
  if (!data || !success) notFound();

  const skill = await getSkill({ id: data.sid });
  if (!skill) return notFound();

  return (
    <PageLayout>
      <PageTitle title="気になる技術編集" />
      <PageContent>
        <EditSkillForm
          defaultValue={{ id: skill.id, name: skill.name, url: skill.url }}
        />
      </PageContent>
    </PageLayout>
  );
}
