import type { ReactNode } from 'react';

import { DesktopNavigation } from '@/components/ui/desktop-navigation';
import { MobileNavigation } from '@/components/ui/mobile-navigation';

export default function PrivateRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen max-h-screen flex-col overflow-auto sm:flex-row sm:bg-background-inversion">
      <div className="hidden sm:block">
        <DesktopNavigation />
      </div>
      <main className="grow bg-background sm:rounded-l-4xl">{children}</main>
      <div className="block sm:hidden">
        <MobileNavigation />
      </div>
    </div>
  );
}
