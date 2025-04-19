import * as React from 'react';
import type { ReactNode } from 'react';

import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

import { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { buttonVariants } from './button';

type LinkProps = {
  children: ReactNode;
  className?: string;
  target?: '_self' | '_blank';
} & NextLinkProps &
  VariantProps<typeof buttonVariants>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      children,
      target = '_self',
      variant = 'link',
      size = 'default',
      ...props
    },
    ref,
  ) => {
    return (
      <NextLink
        target={target}
        rel="noopener noreferrer"
        passHref
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);
Link.displayName = 'Link';

export { Link };
