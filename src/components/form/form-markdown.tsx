import type { ComponentProps } from 'react';

import { type FieldMetadata, getTextareaProps } from '@conform-to/react';

import { Markdown } from '../ui/markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';

const FormMarkdown = ({
  meta,
  ...props
}: {
  meta: FieldMetadata<string>;
} & ComponentProps<typeof Textarea>) => {
  return (
    <Tabs defaultValue="write">
      <div className="text-right">
        <TabsList>
          <TabsTrigger value="write" className="w-[84px] text-xs">
            編集
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-xs">
            プレビュー
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="write"
        forceMount
        className="data-[state=inactive]:hidden"
      >
        <Textarea
          {...getTextareaProps(meta)}
          {...props}
          key={meta.key}
          rows={7}
        />
      </TabsContent>
      <TabsContent value="preview">
        {meta.value ? (
          <Markdown
            value={meta.value}
            className="rounded-md border border-input px-3 py-2"
          />
        ) : (
          <div className="flex h-[158px] max-h-[158px] w-full items-center justify-center rounded-md border border-dashed border-input bg-background px-3 py-2 text-sm">
            <p className="text-muted-foreground">
              ここにプレビューが表示されます
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export { FormMarkdown };
