import { PageLayout } from '@/components/layout/page-layout';
import { Link } from '@/components/ui/link';
import { RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  return (
    <PageLayout>
      <RegisterForm />
      <div className="pt-2 text-right">
        <Link href="/login" className="text-sm">
          ログインページへ
        </Link>
      </div>
    </PageLayout>
  );
}
