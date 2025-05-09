import type { Metadata } from 'next';

import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { AppProvider } from '@/providers/app';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-dvh bg-background font-sans antialiased text-foreground',
          fontSans.variable,
        )}
      >
        <AppProvider>{children}</AppProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
