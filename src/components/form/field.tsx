import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const Field = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn('grid gap-2', className)}>{children}</div>;
};

type FieldErrorsProps = {
  errors?: string[];
};

const FieldErrors = ({ errors }: FieldErrorsProps) => {
  if (!errors || !errors.length) return null;
  return (
    <ul className="space-y-1">
      {errors.map((error) => (
        <li
          key={error}
          className="text-right text-xs text-destructive sm:text-sm"
        >
          {error}
        </li>
      ))}
    </ul>
  );
};

export { Field, FieldErrors };
