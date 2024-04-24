'use client';

import { usePathname, useRouter } from 'next/navigation';

import { LogoutForm } from '@/features/auth';
import { activePathVariant } from '@/utils/active-path-variant';

import { Button } from './button';
import { Icon } from './icon';
import { ModeToggle } from './mode-toggle';
import { Tooltip } from './tooltip';

const DesktopNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col justify-between bg-background-inversion p-4">
      <ul className="space-y-6 text-foreground-inversion">
        <li>
          <Tooltip content="ダッシュボード">
            <Button
              variant={activePathVariant(pathname, '/')}
              size="icon"
              className="rounded-full"
              onClick={() => router.push('/')}
            >
              <Icon />
              <span className="sr-only">Link dashboard page</span>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip content="プロジェクト一覧">
            <Button
              variant={activePathVariant(pathname, '/projects')}
              size="icon"
              className="rounded-full"
              onClick={() => router.push('/projects')}
            >
              <Icon name="FolderKanban" />
              <span className="sr-only">Link projects page</span>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip content="スキル一覧">
            <Button
              variant={activePathVariant(pathname, '/skills')}
              size="icon"
              className="rounded-full"
              onClick={() => router.push('/skills')}
            >
              <Icon name="BookMarked" />
              <span className="sr-only">Link skills page</span>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip content="テンプレート一覧">
            <Button
              variant={activePathVariant(pathname, '/templates')}
              size="icon"
              className="rounded-full"
              onClick={() => router.push('/templates')}
            >
              <Icon name="CodeXml" />
              <span className="sr-only">Link templates page</span>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip content="マイページ">
            <Button
              // todo
              variant={activePathVariant(pathname, '/users/test')}
              size="icon"
              className="rounded-full"
              onClick={() => router.push('/users/test')}
            >
              <Icon name="User" />
              <span className="sr-only">Link user page</span>
            </Button>
          </Tooltip>
        </li>
      </ul>
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
