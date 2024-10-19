import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { getSkillOptions } from '@/features/skills';
import { CreateTemplateForm } from '@/features/templates';

export default async function TemplateCreatePage() {
  const skillOptions = await getSkillOptions();

  return (
    <PageLayout>
      <PageTitle title="テンプレート登録" />
      <PageContent>
        <CreateTemplateForm skillOptions={skillOptions} />
      </PageContent>
    </PageLayout>
  );
}
