import * as React from 'react';

import Link from 'next/link';

import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ParsedPageSearchParams } from '@/types';
import { generatePageNumbers } from '@/utils/generate-page-numbers';
import { generateQueryURL } from '@/utils/generate-query-url';

import { Icon } from './icon';

const PaginationWrapper = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
PaginationWrapper.displayName = 'PaginationWrapper';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  children,
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className,
    )}
    {...props}
  >
    {children}
  </Link>
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <Icon name="ChevronLeft" className="size-4" />
    <span className="sr-only">Previous page</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <Icon name="ChevronRight" className="size-4" />
    <span className="sr-only">Next page</span>
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <Icon name="Ellipsis" className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

type PaginationProps = {
  searchParams: ParsedPageSearchParams;
  totalCount: number;
  baseHref: string;
  maxPagesToShow?: 3 | 5 | 7 | 9;
};

const Pagination = ({
  searchParams,
  totalCount,
  baseHref,
  maxPagesToShow = 3,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / searchParams.pageSize);

  const pages = generatePageNumbers({
    totalPages,
    currentPage: searchParams.page,
    maxPagesToShow,
  });

  return (
    <PaginationWrapper>
      <PaginationContent>
        {searchParams.page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={generateQueryURL(baseHref, {
                ...searchParams,
                page: searchParams.page - 1,
              })}
            />
          </PaginationItem>
        )}
        {searchParams.page > 3 && totalPages > maxPagesToShow && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={generateQueryURL(baseHref, {
                ...searchParams,
                page,
              })}
              isActive={searchParams.page === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {searchParams.page < totalPages - 2 && totalPages > maxPagesToShow && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {searchParams.page < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={generateQueryURL(baseHref, {
                ...searchParams,
                page: searchParams.page + 1,
              })}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationWrapper>
  );
};

export {
  Pagination,
  PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
