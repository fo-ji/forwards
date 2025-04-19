'use client';

import { useActionState, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { FormMarkdown } from '@/components/form/form-markdown';
import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

import { createCode } from '../../actions/create';
import { createCodeSchema } from '../../schemas/create';

type CreateCodeFormProps = {
  skillId: string;
};

export const CreateCodeForm = ({ skillId }: CreateCodeFormProps) => {
  const [lastResult, action, isPending] = useActionState(createCode, undefined);
  const [form, fields] = useForm({
    id: 'create-code',
    lastResult,
    defaultValue: {
      skillId,
      block: '```bash\n$ docker compose up --build\n```',
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createCodeSchema });
    },
    shouldValidate: 'onInput',
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: 'コードを登録しました' });
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onError = useCallback((errorMessage?: string) => {
    toast({
      variant: 'destructive',
      description: errorMessage || 'コードを登録できませんでした',
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
        <Label htmlFor={fields.block.id}>ブロック</Label>
        <FormMarkdown meta={fields.block} />
        <FieldErrors errors={fields.block.errors} />
      </Field>
      <Button
        type="submit"
        form="create-code"
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
