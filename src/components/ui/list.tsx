import * as React from 'react';

import { cn } from '@/lib/utils';

const List = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('', className)} {...props} />
  ),
);
List.displayName = 'List';

const ListItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        'mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0',
        className,
      )}
      {...props}
    >
      <span className="flex size-2 translate-y-1 rounded-full bg-primary" />
      {children}
    </li>
  ),
);
ListItem.displayName = 'ListItem';

const ListItemTitle = ({ className, ...props }: React.ComponentProps<'p'>) => (
  <p className={cn('text-sm font-medium leading-none', className)} {...props} />
);
ListItemTitle.displayName = 'ListItemTitle';

const ListItemDescription = ({
  className,
  ...props
}: React.ComponentProps<'p'>) => (
  <p
    className={cn(
      'whitespace-pre-wrap text-sm text-muted-foreground [overflow-wrap:anywhere]',
      className,
    )}
    {...props}
  />
);
ListItemDescription.displayName = 'ListItemDescription';

export { List, ListItem, ListItemTitle, ListItemDescription };
