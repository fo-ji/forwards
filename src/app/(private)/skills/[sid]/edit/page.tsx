import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { getProjectOptions } from '@/features/projects';
import { EditSkillForm, getSkill, paramsSkillSchema } from '@/features/skills';

type SkillEditPageProps = {
  params: { sid: string };
};

export default async function SkillEditPage({ params }: SkillEditPageProps) {
  const { data, success } = paramsSkillSchema.safeParse(params);
  if (!data || !success) notFound();

  const [skill, projectOptions] = await Promise.all([
    getSkill({ id: data.sid }),
    getProjectOptions(),
  ]);
  if (!skill) return notFound();

  return (
    <PageLayout>
      <PageTitle title="気になる技術編集" />
      <PageContent>
        <EditSkillForm
          defaultValue={{
            id: skill.id,
            name: skill.name,
            url: skill.url,
            projectIds: skill.projects.map((project) => project.id),
          }}
          projectOptions={projectOptions}
        />
      </PageContent>
    </PageLayout>
  );
}
