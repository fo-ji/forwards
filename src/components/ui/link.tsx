import type { ReactNode } from 'react';

import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

import { cn } from '@/lib/utils';

type LinkProps = {
  children: ReactNode;
  className?: string;
  noStyle?: boolean;
} & NextLinkProps;

const Link = ({
  className,
  children,
  noStyle = false,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      target="_self"
      rel="noopener noreferrer"
      passHref
      className={cn(
        !noStyle && 'text-foreground underline-offset-4 hover:underline',
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export { Link };
