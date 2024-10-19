import { PageLayout, PageTitle } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';

export default async function TemplatesListPage() {
  return (
    <PageLayout>
      <PageTitle title="テンプレート" />
      <div className="text-right">
        <Button asChild>
          <Link href="/templates/create" variant="default" scroll={false}>
            新規作成
          </Link>
        </Button>
      </div>
    </PageLayout>
  );
}
