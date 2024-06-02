'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState, useFormStatus } from 'react-dom';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

import { editSkill } from '../../actions/edit';
import { editSKillSchema } from '../../schemas/edit';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      form="edit-skill"
      disabled={pending}
      className="w-full"
    >
      更新
    </Button>
  );
};

type EditSkillFormProps = {
  defaultValue: {
    id: string;
    name: string;
    url: string;
  };
};

export const EditSkillForm = ({ defaultValue }: EditSkillFormProps) => {
  const [lastResult, action] = useFormState(editSkill, undefined);
  const [form, fields] = useForm({
    id: 'edit-skill',
    lastResult,
    defaultValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editSKillSchema });
    },
    shouldValidate: 'onInput',
  });
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ description: '気になるスキルを更新しました' });
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
      <FormInput
        aria-hidden="true"
        className="hidden"
        meta={fields.id}
        type="text"
      />
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
      <SubmitButton />
      <FieldErrors errors={form.errors} />
      <FormSubmittedToast lastResult={lastResult} onSuccess={onSuccess} />
    </form>
  );
};
