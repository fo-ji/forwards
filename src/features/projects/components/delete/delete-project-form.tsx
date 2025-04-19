'use client';

import { useActionState, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { getFormProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { FormInput } from '@/components/form/form-input';
import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

import { deleteProject } from '../../actions/delete';
import { deleteProjectSchema } from '../../schemas/delete';

type DeleteProjectFormProps = {
  defaultValue: {
    id: string;
  };
};

export const DeleteProjectForm = ({ defaultValue }: DeleteProjectFormProps) => {
  const [lastResult, action, isPending] = useActionState(
    deleteProject,
    undefined,
  );
  const [form, fields] = useForm({
    id: 'delete-project',
    lastResult,
    defaultValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: deleteProjectSchema });
    },
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: 'プロジェクトを削除しました' });
    router.push('/projects');
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
        <Button
          type="submit"
          form="delete-project"
          disabled={isPending}
          className="w-full sm:w-[76px]"
        >
          はい
        </Button>
      </div>
      <FormSubmittedToast lastResult={lastResult} onSuccess={onSuccess} />
    </form>
  );
};
