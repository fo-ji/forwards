import * as React from 'react';

import { cn } from '@/lib/utils';
import { SortDirection } from '@/types';
import { generateQueryURL } from '@/utils/generate-query-url';

import { Icon } from './icon';
import { Link } from './link';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-1 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-1 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

type TableSortHeadProps = {
  baseUrl: string;
  sortKey: string;
  page: number;
  pageSize: number;
  orderBy: string;
  sortDirection: SortDirection;
};

const TableSortHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & TableSortHeadProps
>(
  (
    {
      className,
      children,
      baseUrl,
      sortKey,
      page,
      pageSize,
      orderBy,
      sortDirection,
      ...props
    },
    ref,
  ) => {
    const url = generateQueryURL(baseUrl, {
      page,
      pageSize,
      orderBy: sortKey === orderBy ? orderBy : sortKey,
      sortDirection:
        sortKey === orderBy
          ? sortDirection === SortDirection.ASC
            ? SortDirection.DESC
            : SortDirection.ASC
          : SortDirection.DESC,
    });

    return (
      <th
        ref={ref}
        className={cn(
          'h-12 px-1 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
          className,
        )}
        {...props}
      >
        <Link href={url} className="flex justify-start gap-1 p-0">
          {children}
          {sortKey === orderBy && (
            <Icon
              name={
                sortDirection === SortDirection.DESC ? 'ArrowDown' : 'ArrowUp'
              }
              className="size-4"
            />
          )}
        </Link>
      </th>
    );
  },
);
TableSortHead.displayName = 'TableSortHead';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableSortHead,
};
