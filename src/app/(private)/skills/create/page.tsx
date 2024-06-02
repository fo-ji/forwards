import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { CreateSkillForm } from '@/features/skills';

export default async function SkillCreatePage() {
  return (
    <PageLayout>
      <PageTitle title="気になる技術登録" />
      <PageContent>
        <CreateSkillForm />
      </PageContent>
    </PageLayout>
  );
}
