'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState, useFormStatus } from 'react-dom';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { FormMultiSelect } from '@/components/form/form-multi-select';
import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { SelectOptions } from '@/types';

import { createSkill } from '../../actions/create';
import { createSKillSchema } from '../../schemas/create';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      form="create-skill"
      disabled={pending}
      className="w-full"
    >
      新規登録
    </Button>
  );
};

type CreateSkillFormProps = {
  projectOptions?: SelectOptions;
};

export const CreateSkillForm = ({
  projectOptions = [],
}: CreateSkillFormProps) => {
  const [lastResult, action] = useFormState(createSkill, undefined);
  const [form, fields] = useForm({
    id: 'create-skill',
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createSKillSchema });
    },
    shouldValidate: 'onInput',
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: '気になるスキルを登録しました' });
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onError = useCallback((errorMessage?: string) => {
    toast({
      variant: 'destructive',
      description: errorMessage || '気になるスキルを登録できませんでした',
    });
  }, []);

  return (
    <form
      className="grid gap-4"
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
        <Label htmlFor={fields.url.id}>URL</Label>
        <FormInput meta={fields.url} type="text" />
        <FieldErrors errors={fields.url.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.projectIds.id}>プロジェクト</Label>
        <FormMultiSelect meta={fields.projectIds} options={projectOptions} />
        <FieldErrors errors={fields.projectIds.errors} />
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
