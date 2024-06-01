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
    <nav className="rounded-t-2xl bg-background-inversion p-4">
      <ul className="flex items-center justify-evenly gap-2.5 text-foreground-inversion">
        <li>
          <Link
            href="/"
            variant={activePathVariant(pathname, '/')}
            size="icon"
            className="rounded-full"
          >
            <Icon />
            <span className="sr-only">Link dashboard page</span>
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            variant={activePathVariant(pathname, '/projects')}
            size="icon"
            className="rounded-full"
          >
            <Icon name="FolderKanban" />
            <span className="sr-only">Link projects page</span>
          </Link>
        </li>
        <li>
          <Link
            href="/skills"
            variant={activePathVariant(pathname, '/skills')}
            size="icon"
            className="rounded-full"
          >
            <Icon name="BookMarked" />
            <span className="sr-only">Link skills page</span>
          </Link>
        </li>
        <li>
          <Link
            href="/templates"
            variant={activePathVariant(pathname, '/templates')}
            size="icon"
            className="rounded-full"
          >
            <Icon name="CodeXml" />
            <span className="sr-only">Link templates page</span>
          </Link>
        </li>
        <li>
          <Link
            href="/users/test"
            variant={activePathVariant(pathname, '/users/test')}
            size="icon"
            className="rounded-full"
          >
            <Icon name="User" />
            <span className="sr-only">Link user page</span>
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
