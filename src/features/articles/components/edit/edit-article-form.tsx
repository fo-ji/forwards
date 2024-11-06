'use client';

import { useActionState, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

import { editArticle } from '../../actions/edit';
import { editArticleSchema } from '../../schemas/edit';

type EditArticleFormProps = {
  defaultValue: {
    id: string;
    name: string;
    url: string;
  };
};

export const EditArticleForm = ({ defaultValue }: EditArticleFormProps) => {
  const [lastResult, action, isPending] = useActionState(
    editArticle,
    undefined,
  );
  const [form, fields] = useForm({
    id: 'edit-article',
    lastResult,
    defaultValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editArticleSchema });
    },
    shouldValidate: 'onInput',
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: '記事を更新しました' });
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className="grid gap-4"
      {...getFormProps(form)}
      action={action}
      noValidate
    >
      <FormInput meta={fields.id} type="hidden" />
      <FieldErrors errors={fields.id.errors} />
      <Field>
        <Label htmlFor={fields.name.id}>名称</Label>
        <FormInput meta={fields.name} type="text" />
        <FieldErrors errors={fields.name.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.url.id}>URL</Label>
        <FormInput meta={fields.url} type="text" />
        <FieldErrors errors={fields.url.errors} />
      </Field>
      <Button
        type="submit"
        form="edit-article"
        disabled={isPending}
        className="w-full"
      >
        更新
      </Button>
      <FieldErrors errors={form.errors} />
      <FormSubmittedToast lastResult={lastResult} onSuccess={onSuccess} />
    </form>
  );
};
