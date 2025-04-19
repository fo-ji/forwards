import { notFound } from 'next/navigation';

import {
  PageContent,
  PageLayout,
  PageTitle,
} from '@/components/layout/page-layout';
import { getSkillOptions } from '@/features/skills';
import { getTemplate, paramsTemplateSchema } from '@/features/templates';
import { EditTemplateForm } from '@/features/templates';

type TemplateEditPageProps = {
  params: Promise<{ tid: string }>;
};

export default async function TemplateEditPage({
  params,
}: TemplateEditPageProps) {
  const { tid } = await params;
  const { data, success } = paramsTemplateSchema.safeParse({ tid });
  if (!data || !success) notFound();

  const [template, skillOptions] = await Promise.all([
    getTemplate({ id: data.tid }),
    getSkillOptions(),
  ]);
  if (!template) return notFound();

  return (
    <PageLayout>
      <PageTitle title="テンプレート編集" />
      <PageContent>
        <EditTemplateForm
          defaultValue={{
            id: template.id,
            name: template.name,
            skillIds: template.skills.map((skill) => skill.id),
            installation: template.installation || '',
          }}
          skillOptions={skillOptions}
        />
      </PageContent>
    </PageLayout>
  );
}
