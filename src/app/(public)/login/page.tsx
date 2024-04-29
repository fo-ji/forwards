import { PageLayout } from '@/components/layout/page-layout';
import { Link } from '@/components/ui/link';
import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <PageLayout>
      <LoginForm />
      <div className="pt-2 text-right">
        <Link href="/register" className="text-sm font-semibold">
          新規登録ページへ
        </Link>
      </div>
    </PageLayout>
  );
}
