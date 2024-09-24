import { ComponentProps } from 'react';

import { type FieldMetadata, getInputProps } from '@conform-to/react';

import { Input } from '../ui/input';

const FormInput = ({
  meta,
  type,
  ...props
}: {
  meta: FieldMetadata<string | null>;
  type: Parameters<typeof getInputProps>[1]['type'];
} & ComponentProps<typeof Input>) => {
  return (
    <Input
      {...getInputProps(meta, { type, ariaAttributes: true })}
      {...props}
      key={meta.key}
    />
  );
};

export { FormInput };
