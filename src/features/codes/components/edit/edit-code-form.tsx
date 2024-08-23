'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState, useFormStatus } from 'react-dom';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { FormMarkdown } from '@/components/form/form-markdown';
import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

import { editCode } from '../../actions/edit';
import { editCodeSchema } from '../../schemas/edit';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      form="edit-code"
      disabled={pending}
      className="w-full"
    >
      更新
    </Button>
  );
};

type EditCodeFormProps = {
  defaultValue: {
    id: string;
    name: string;
    block: string;
  };
};

export const EditCodeForm = ({ defaultValue }: EditCodeFormProps) => {
  const [lastResult, action] = useFormState(editCode, undefined);
  const [form, fields] = useForm({
    id: 'edit-code',
    lastResult,
    defaultValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editCodeSchema });
    },
    shouldValidate: 'onInput',
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: 'コードを更新しました' });
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
        <Label htmlFor={fields.block.id}>ブロック</Label>
        <FormMarkdown meta={fields.block} />
        <FieldErrors errors={fields.block.errors} />
      </Field>
      <SubmitButton />
      <FieldErrors errors={form.errors} />
      <FormSubmittedToast lastResult={lastResult} onSuccess={onSuccess} />
    </form>
  );
};
