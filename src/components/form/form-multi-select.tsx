import { useRef, type ComponentProps } from 'react';

import {
  unstable_useControl as useControl,
  type FieldMetadata,
} from '@conform-to/react';

import { MultiSelect } from '../ui/multi-select';

const FormMultiSelect = ({
  meta,
  options = [],
  ...props
}: {
  meta: FieldMetadata<string[]>;
} & Omit<
  ComponentProps<typeof MultiSelect>,
  'onValueChange' | 'defaultValue'
>) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const control = useControl(meta);

  return (
    <>
      {(control.value as string[])?.map((v, idx) => (
        <input
          key={v}
          className="sr-only"
          // aria-hidden
          tabIndex={-1}
          value={v}
          name={`${meta.name}[${idx}]`}
          defaultValue={meta.initialValue as string[]}
          onChange={() => null}
          onFocus={() => {
            triggerRef.current?.focus();
          }}
        />
      ))}
      <MultiSelect
        {...props}
        onValueChange={control.change}
        defaultValue={meta.initialValue as string[]}
        options={options}
        key={meta.key}
      />
    </>
  );
};

export { FormMultiSelect };
