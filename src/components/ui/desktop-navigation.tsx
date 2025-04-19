'use client';

import { usePathname } from 'next/navigation';

import { LogoutForm } from '@/features/auth';
import { activePathVariant } from '@/utils/active-path-variant';

import { Icon } from './icon';
import { Link } from './link';
import { Logo } from './logo';
import { ModeToggle } from './mode-toggle';
import { Tooltip } from './tooltip';

const DesktopNavigation = () => {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      className="flex h-full flex-col justify-between bg-background-inversion p-4"
    >
      <div>
        <div className="mb-12">
          <Logo alt="" width={40} height={40} priority />
        </div>
        <ul className="space-y-6 text-foreground-inversion">
          <li>
            <Tooltip content="ダッシュボード">
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
            </Tooltip>
          </li>
          <li>
            <Tooltip content="プロジェクト一覧">
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
            </Tooltip>
          </li>
          <li>
            <Tooltip content="スキル一覧">
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
            </Tooltip>
          </li>
          <li>
            <Tooltip content="テンプレート一覧">
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
            </Tooltip>
          </li>
          <li>
            <Tooltip content="マイページ">
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
            </Tooltip>
          </li>
        </ul>
      </div>
      <ul className="space-y-6 text-foreground-inversion">
        <li>
          <Tooltip content="モード変更">
            <div>
              <ModeToggle />
            </div>
          </Tooltip>
        </li>
        <li>
          <Tooltip content="ログアウト">
            <div>
              <LogoutForm />
            </div>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export { DesktopNavigation };
