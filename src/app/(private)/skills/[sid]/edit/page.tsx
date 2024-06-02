import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { EditSkillForm, getSkill } from '@/features/skills';

type SkillEditPageProps = {
  params: { sid: string };
};

export default async function SkillEditPage({ params }: SkillEditPageProps) {
  const skill = await getSkill({ id: params.sid });

  if (!skill) return null;
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
