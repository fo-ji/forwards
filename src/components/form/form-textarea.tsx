import type { ComponentProps } from 'react';

import { type FieldMetadata, getTextareaProps } from '@conform-to/react';

import { Textarea } from '@/components/ui/textarea';

const FormTextarea = ({
  meta,
  ...props
}: {
  meta: FieldMetadata<string>;
} & ComponentProps<typeof Textarea>) => {
  return <Textarea {...getTextareaProps(meta)} {...props} key={meta.key} />;
};

export { FormTextarea };
