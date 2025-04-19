import type { ReactNode } from 'react';

import { cn, maxWidthSizes } from '@/lib/utils';

const PageLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex size-full flex-col p-4 sm:p-8">{children}</div>;
};

const PageTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return <h1 className={cn('text-xl mb-1 sm:mb-8', className)}>{title}</h1>;
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
  return (
    <div className={cn('grow overflow-auto', maxWidthSizes[size], className)}>
      {children}
    </div>
  );
};

const PageDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
  );
};

export { PageLayout, PageTitle, PageContent, PageDescription };
