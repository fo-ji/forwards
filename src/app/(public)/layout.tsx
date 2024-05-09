import type { ReactNode } from 'react';

import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';

export default function PublicRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="m-auto w-full max-w-lg grow content-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
