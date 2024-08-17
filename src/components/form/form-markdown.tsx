import type { ComponentProps } from 'react';

import { type FieldMetadata, getTextareaProps } from '@conform-to/react';

import { Markdown } from '../ui/markdown';
import { Textarea } from '../ui/textarea';

const FormMarkdown = ({
  meta,
  ...props
}: {
  meta: FieldMetadata<string>;
} & ComponentProps<typeof Textarea>) => {
  return (
    <div className="grid grid-cols-[minmax(0px,_1fr)] gap-4">
      <Textarea {...getTextareaProps(meta)} {...props} key={meta.key} />
      {meta.value ? (
        <Markdown value={meta.value} />
      ) : (
        <div className="flex min-h-[80px] w-full items-center justify-center rounded-md border border-dashed border-input bg-background px-3 py-2 text-sm">
          <p className="text-muted-foreground">
            ここにプレビューが表示されます
          </p>
        </div>
      )}
    </div>
  );
};

export { FormMarkdown };
