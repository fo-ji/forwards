import * as React from 'react';

import { cn } from '@/lib/utils';
import { type ParsedPageSearchParams, SortDirection } from '@/types';
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
  searchParams: ParsedPageSearchParams;
};

const TableSortHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & TableSortHeadProps
>(({ className, children, baseUrl, sortKey, searchParams, ...props }, ref) => {
  const url = generateQueryURL(baseUrl, {
    ...searchParams,
    page: searchParams.page,
    pageSize: searchParams.pageSize,
    orderBy: sortKey === searchParams.orderBy ? searchParams.orderBy : sortKey,
    sortDirection:
      sortKey === searchParams.orderBy
        ? searchParams.sortDirection === SortDirection.ASC
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
      <Link href={url} className="flex justify-start gap-1 p-0 text-current">
        {children}
        {sortKey === searchParams.orderBy && (
          <Icon
            name={
              searchParams.sortDirection === SortDirection.DESC
                ? 'ArrowDown'
                : 'ArrowUp'
            }
            className="size-4"
          />
        )}
      </Link>
    </th>
  );
});
TableSortHead.displayName = 'TableSortHead';

const NoDataTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-full flex flex-col gap-2 items-center justify-center text-sm min-h-80',
      className,
    )}
    {...props}
  >
    <Icon name="TriangleAlert" className="size-10" />
    <p>該当するデータが見つかりませんでした</p>
  </div>
));
NoDataTable.displayName = 'NoDataTable';

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
  NoDataTable,
};
