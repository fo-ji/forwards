import type { ReactNode } from 'react';

const Field = ({ children }: { children: ReactNode }) => {
  return <div className="grid gap-2">{children}</div>;
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
