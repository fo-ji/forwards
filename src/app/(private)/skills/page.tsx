import { PageLayout } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { SkillsList, getSkills } from '@/features/skills';

// todo SkillsListContainer(非同期)を実装して、その中でfetchする
// todo Loading, ErrorのUIもそこでやる

export default async function SkillsListPage() {
  const skills = await getSkills();

  return (
    <PageLayout>
      <h1 className="text-xl">Skills（気になる技術一覧）</h1>
      <Button asChild>
        <Link href="/skills/create" noStyle>
          新規作成
        </Link>
      </Button>
      {skills && <SkillsList skills={skills} />}
    </PageLayout>
  );
}
