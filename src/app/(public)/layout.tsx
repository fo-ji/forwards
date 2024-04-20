import type { ReactNode } from 'react';

export default function PublicRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <main className="m-auto max-w-lg grow">{children}</main>
    </div>
  );
}
