'use client';

import { useActionState, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { FormMarkdown } from '@/components/form/form-markdown';
import { FormMultiSelect } from '@/components/form/form-multi-select';
import { FormSelect } from '@/components/form/form-select';
import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { SelectOptions } from '@/types';

import { createProject } from '../../actions/create';
import { PROJECT_STATUS_OPTIONS } from '../../consts';
import { createProjectSchema } from '../../schemas/create';

type CreateProjectFormProps = {
  skillOptions?: SelectOptions;
};

export const CreateProjectForm = ({
  skillOptions = [],
}: CreateProjectFormProps) => {
  const [lastResult, action, isPending] = useActionState(
    createProject,
    undefined,
  );
  const [form, fields] = useForm({
    id: 'create-project',
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createProjectSchema });
    },
    shouldValidate: 'onInput',
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: 'プロジェクトを登録しました' });
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onError = useCallback((errorMessage?: string) => {
    toast({
      variant: 'destructive',
      description: errorMessage || 'プロジェクトを登録できませんでした',
    });
  }, []);

  return (
    <form
      className="grid gap-4 px-1"
      {...getFormProps(form)}
      action={action}
      noValidate
    >
      <Field>
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
      <Button
        type="submit"
        form="create-project"
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
