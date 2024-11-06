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

import { createArticle } from '../../actions/create';
import { createArticleSchema } from '../../schemas/create';

type CreateArticleFormProps = {
  skillId: string;
};

export const CreateArticleForm = ({ skillId }: CreateArticleFormProps) => {
  const [lastResult, action, isPending] = useActionState(
    createArticle,
    undefined,
  );
  const [form, fields] = useForm({
    id: 'create-article',
    lastResult,
    defaultValue: {
      skillId,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createArticleSchema });
    },
    shouldValidate: 'onInput',
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: '記事を登録しました' });
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onError = useCallback((errorMessage?: string) => {
    toast({
      variant: 'destructive',
      description: errorMessage || '記事を登録できませんでした',
    });
  }, []);

  return (
    <form
      className="grid gap-4"
      {...getFormProps(form)}
      action={action}
      noValidate
    >
      <FormInput meta={fields.skillId} type="hidden" />
      <FieldErrors errors={fields.skillId.errors} />
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
        form="create-article"
        disabled={isPending}
        className="w-full"
      >
        新規登録
      </Button>
      <FormSubmittedToast
        lastResult={lastResult}
        onSuccess={onSuccess}
        onError={onError}
      />
    </form>
  );
};
