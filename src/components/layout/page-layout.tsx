import type { ReactNode } from 'react';

const PageLayout = ({ children }: { children: ReactNode }) => {
  return <div className="size-full p-4 sm:p-8">{children}</div>;
};

export { PageLayout };
