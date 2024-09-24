'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Status } from '@prisma/client';
import { useFormState, useFormStatus } from 'react-dom';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { FormMarkdown } from '@/components/form/form-markdown';
import { FormMultiSelect } from '@/components/form/form-multi-select';
import { FormSelect } from '@/components/form/form-select';
import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import type { SelectOptions } from '@/types';

import { editProject } from '../../actions/edit';
import { PROJECT_STATUS_OPTIONS } from '../../consts';
import { editProjectSchema } from '../../schemas/edit';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      form="edit-project"
      disabled={pending}
      className="w-full"
    >
      更新
    </Button>
  );
};

type EditProjectFormProps = {
  defaultValue: {
    id: string;
    name: string;
    status: Status;
    url: string;
    skillIds: string[];
    installation: string;
  };
  skillOptions?: SelectOptions;
};

export const EditProjectForm = ({
  defaultValue,
  skillOptions = [],
}: EditProjectFormProps) => {
  const [lastResult, action] = useFormState(editProject, undefined);
  const [form, fields] = useForm({
    id: 'edit-project',
    lastResult,
    defaultValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editProjectSchema });
    },
    shouldValidate: 'onInput',
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: 'プロジェクトを更新しました' });
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onError = useCallback((errorMessage?: string) => {
    toast({
      variant: 'destructive',
      description: errorMessage || 'プロジェクトを更新できませんでした',
    });
  }, []);

  return (
    <form
      className="grid gap-4 px-1"
      {...getFormProps(form)}
      action={action}
      noValidate
    >
      <FormInput meta={fields.id} type="hidden" />
      <Field>
        <FieldErrors errors={fields.id.errors} />
        <Label htmlFor={fields.name.id}>名称</Label>
        <FormInput meta={fields.name} type="text" />
        <FieldErrors errors={fields.name.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.status.id}>ステータス</Label>
        <FormSelect meta={fields.status} items={PROJECT_STATUS_OPTIONS} />
        <FieldErrors errors={fields.status.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.skillIds.id}>スキル</Label>
        <FormMultiSelect meta={fields.skillIds} options={skillOptions} />
        <FieldErrors errors={fields.skillIds.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.url.id}>URL</Label>
        <FormInput meta={fields.url} type="text" />
        <FieldErrors errors={fields.url.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.installation.id}>インストール手順</Label>
        <FormMarkdown meta={fields.installation} />
        <FieldErrors errors={fields.installation.errors} />
      </Field>
      <SubmitButton />
      <FormSubmittedToast
        lastResult={lastResult}
        onSuccess={onSuccess}
        onError={onError}
      />
    </form>
  );
};
