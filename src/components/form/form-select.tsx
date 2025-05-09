import { useRef, type ElementRef, ComponentProps } from 'react';

import {
  unstable_useControl as useControl,
  type FieldMetadata,
} from '@conform-to/react';

import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import type { SelectOptions } from '@/types';

const FormSelect = ({
  meta,
  items,
  placeholder,
  ...props
}: {
  meta: FieldMetadata<string>;
  items: SelectOptions;
  placeholder?: string;
} & ComponentProps<typeof Select>) => {
  const selectRef = useRef<ElementRef<typeof SelectTrigger>>(null);
  const control = useControl(meta);

  return (
    <>
      <select
        name={meta.name}
        aria-label={meta.name}
        defaultValue={meta.initialValue ?? ''}
        className="sr-only"
        ref={control.register}
        // aria-hidden
        tabIndex={-1}
        onFocus={() => {
          selectRef.current?.focus();
        }}
      >
        <option value="" />
        {items.map((option) => (
          <option key={option.value} value={option.value} />
        ))}
      </select>

      <Select
        {...props}
        value={control.value ?? ''}
        onValueChange={control.change}
        onOpenChange={(open) => {
          if (!open) {
            control.blur();
          }
        }}
      >
        <SelectTrigger name={meta.name}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => {
            return (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export { FormSelect };
