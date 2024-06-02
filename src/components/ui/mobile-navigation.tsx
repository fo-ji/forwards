'use client';

import { usePathname } from 'next/navigation';

import { LogoutForm } from '@/features/auth';
import { activePathVariant } from '@/utils/active-path-variant';

import { Icon } from './icon';
import { Link } from './link';
import { ModeToggle } from './mode-toggle';

const MobileNavigation = () => {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      className="rounded-t-2xl bg-background-inversion p-4"
    >
      <ul className="flex items-center justify-evenly gap-2.5 text-foreground-inversion">
        <li>
          <Link
            href="/"
            variant={activePathVariant(pathname, '/')}
            size="icon"
            className="rounded-full"
            aria-label="ダッシュボードページへ"
            aria-current={
              activePathVariant(pathname, '/') === 'default'
                ? 'page'
                : undefined
            }
          >
            <Icon />
            <span className="sr-only">ダッシュボードページへ</span>
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            variant={activePathVariant(pathname, '/projects')}
            size="icon"
            className="rounded-full"
            aria-label="プロジェクト一覧ページへ"
            aria-current={
              activePathVariant(pathname, '/projects') === 'default'
                ? 'page'
                : undefined
            }
          >
            <Icon name="FolderKanban" />
            <span className="sr-only">プロジェクト一覧ページへ</span>
          </Link>
        </li>
        <li>
          <Link
            href="/skills"
            variant={activePathVariant(pathname, '/skills')}
            size="icon"
            className="rounded-full"
            aria-label="スキル一覧ページへ"
            aria-current={
              activePathVariant(pathname, '/skills') === 'default'
                ? 'page'
                : undefined
            }
          >
            <Icon name="BookMarked" />
            <span className="sr-only">スキル一覧ページへ</span>
          </Link>
        </li>
        <li>
          <Link
            href="/templates"
            variant={activePathVariant(pathname, '/templates')}
            size="icon"
            className="rounded-full"
            aria-label="テンプレート一覧ページへ"
            aria-current={
              activePathVariant(pathname, '/templates') === 'default'
                ? 'page'
                : undefined
            }
          >
            <Icon name="CodeXml" />
            <span className="sr-only">テンプレート一覧ページへ</span>
          </Link>
        </li>
        <li>
          <Link
            href="/users/test"
            variant={activePathVariant(pathname, '/users/test')}
            size="icon"
            className="rounded-full"
            aria-label="マイページへ"
            aria-current={
              activePathVariant(pathname, '/users/test') === 'default'
                ? 'page'
                : undefined
            }
          >
            <Icon name="User" />
            <span className="sr-only">マイページへ</span>
          </Link>
        </li>
        <li>
          <ModeToggle />
        </li>
        <li>
          <LogoutForm />
        </li>
      </ul>
    </nav>
  );
};

export { MobileNavigation };
