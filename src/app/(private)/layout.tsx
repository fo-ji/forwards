import type { ReactNode } from 'react';

import { Footer } from '@/components/ui/footer';
import { Sidebar } from '@/components/ui/sidebar';

export default function PrivateRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen max-h-screen flex-col overflow-auto sm:flex-row sm:bg-background-inversion">
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <main className="grow bg-background sm:rounded-l-4xl">{children}</main>
      <div className="block sm:hidden">
        <Footer />
      </div>
    </div>
  );
}
