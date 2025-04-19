import { PageLayout } from '@/components/layout/page-layout';

export default async function HomePage() {
  return (
    <PageLayout>
      <h1 className="text-xl">Home（ダッシュボード）</h1>
      <div className="my-4">アナリティクスはここに表示？</div>
    </PageLayout>
  );
}
