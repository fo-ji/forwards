import { PageLayout } from '@/components/layout/page-layout';

export default async function EntryPage() {
  return (
    <PageLayout>
      <h1 className="text-xl">Entry（検索にかかるページ）</h1>
      <div className="mt-4">login and register への誘導が必要</div>
    </PageLayout>
  );
}
