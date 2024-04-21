'use client';

import { usePathname, useRouter } from 'next/navigation';

import { LogoutForm } from '@/features/auth';
import { activePathVariant } from '@/utils/active-path-variant';

import { Button } from './button';
import { Icon } from './icon';
import { ModeToggle } from './mode-toggle';

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="rounded-t-2xl bg-background-inversion p-4">
      <ul className="flex items-center justify-evenly gap-2.5 text-foreground-inversion">
        <li>
          <Button
            variant={activePathVariant(pathname, '/')}
            size="icon"
            className="rounded-full"
            onClick={() => router.push('/')}
          >
            <Icon />
            <span className="sr-only">Link dashboard page</span>
          </Button>
        </li>
        <li>
          <Button
            variant={activePathVariant(pathname, '/projects')}
            size="icon"
            className="rounded-full"
            onClick={() => router.push('/projects')}
          >
            <Icon name="FolderKanban" />
            <span className="sr-only">Link projects page</span>
          </Button>
        </li>
        <li>
          <Button
            variant={activePathVariant(pathname, '/skills')}
            size="icon"
            className="rounded-full"
            onClick={() => router.push('/skills')}
          >
            <Icon name="BookMarked" />
            <span className="sr-only">Link skills page</span>
          </Button>
        </li>
        <li>
          <Button
            variant={activePathVariant(pathname, '/templates')}
            size="icon"
            className="rounded-full"
            onClick={() => router.push('/templates')}
          >
            <Icon name="CodeXml" />
            <span className="sr-only">Link templates page</span>
          </Button>
        </li>
        <li>
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

export { Footer };
