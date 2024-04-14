import type { ReactNode } from 'react';

export default function PublicRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}
