import type { ReactNode } from 'react';

import { cn, maxWidthSizes } from '@/lib/utils';

const PageLayout = ({ children }: { children: ReactNode }) => {
  return <div className="size-full p-4 sm:p-8">{children}</div>;
};

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="mb-1 sm:mb-8">
      <h1 className="text-xl">{title}</h1>
    </div>
  );
};

type PageContentProps = {
  children: ReactNode;
  size?: keyof typeof maxWidthSizes;
  className?: string;
};

const PageContent = ({
  children,
  size = 'lg',
  className,
}: PageContentProps) => {
  return <div className={cn(maxWidthSizes[size], className)}>{children}</div>;
};

export { PageLayout, PageTitle, PageContent };
