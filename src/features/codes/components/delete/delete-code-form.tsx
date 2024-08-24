'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { getFormProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState, useFormStatus } from 'react-dom';

import { FormInput } from '@/components/form/form-input';
import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

import { deleteCode } from '../../actions/delete';
import { deleteCodeSchema } from '../../schemas/delete';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      form="delete-code"
      disabled={pending}
      className="w-full sm:w-[76px]"
    >
      はい
    </Button>
  );
};

type DeleteCodeFormProps = {
  defaultValue: {
    id: string;
  };
};

export const DeleteCodeForm = ({ defaultValue }: DeleteCodeFormProps) => {
  const [lastResult, action] = useFormState(deleteCode, undefined);
  const [form, fields] = useForm({
    id: 'delete-code',
    lastResult,
    defaultValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: deleteCodeSchema });
    },
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: 'コードを削除しました' });
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
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          いいえ
        </Button>
        <SubmitButton />
      </div>
      <FormSubmittedToast lastResult={lastResult} onSuccess={onSuccess} />
    </form>
  );
};
