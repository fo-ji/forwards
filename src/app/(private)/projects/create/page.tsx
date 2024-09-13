import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { CreateProjectForm } from '@/features/projects';
import { getSkillOptions } from '@/features/skills';

export default async function ProjectCreatePage() {
  const skillOptions = await getSkillOptions();

  return (
    <PageLayout>
      <PageTitle title="プロジェクト登録" />
      <PageContent>
        <CreateProjectForm skillOptions={skillOptions} />
      </PageContent>
    </PageLayout>
  );
}
