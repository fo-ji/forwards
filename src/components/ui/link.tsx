import type { ReactNode } from 'react';

import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

import { cn } from '@/lib/utils';

type LinkProps = {
  children: ReactNode;
  className?: string;
} & NextLinkProps;

const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <NextLink
      target="_self"
      rel="noopener noreferrer"
      passHref
      className={cn(
        'text-primary underline-offset-4 hover:underline',
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export { Link };
