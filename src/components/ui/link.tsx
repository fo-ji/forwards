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

const Link = ({
  className,
  children,
  target = '_self',
  variant = 'link',
  size = 'default',
  ...props
}: LinkProps) => {
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
      {...props}
    >
      {children}
    </NextLink>
  );
};

export { Link };
