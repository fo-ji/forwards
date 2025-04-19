import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { getProjectOptions } from '@/features/projects';
import { CreateSkillForm } from '@/features/skills';

export default async function SkillCreatePage() {
  const projectOptions = await getProjectOptions();

  return (
    <PageLayout>
      <PageTitle title="気になる技術登録" />
      <PageContent>
        <CreateSkillForm projectOptions={projectOptions} />
      </PageContent>
    </PageLayout>
  );
}
