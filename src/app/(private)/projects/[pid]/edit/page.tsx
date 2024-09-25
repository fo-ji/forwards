import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import {
  EditProjectForm,
  getProject,
  paramsProjectSchema,
} from '@/features/projects';
import { getSkillOptions } from '@/features/skills';

type ProjectEditPageProps = {
  params: { pid: string };
};

export default async function ProjectEditPage({
  params,
}: ProjectEditPageProps) {
  const { data, success } = paramsProjectSchema.safeParse(params);
  if (!data || !success) notFound();

  const [project, skillOptions] = await Promise.all([
    getProject({ id: data.pid }),
    getSkillOptions(),
  ]);

  if (!project) return notFound();

  return (
    <PageLayout>
      <PageTitle title="プロジェクト編集" />
      <PageContent>
        <EditProjectForm
          defaultValue={{
            id: project.id,
            name: project.name,
            status: project.status,
            skillIds: project.skills.map((skill) => skill.id),
            url: project.url || '',
            installation: project.installation || '',
          }}
          skillOptions={skillOptions}
        />
      </PageContent>
    </PageLayout>
  );
}
