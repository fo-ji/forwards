import { PageLayout, PageTitle } from '@/components/layout/page-layout';
import { Tour } from '@/components/ui/tour';

export default function DriverSamplePage() {
  return (
    <PageLayout>
      <PageTitle title="Driver.jsの実装サンプル" />
      <Tour />
    </PageLayout>
  );
}
