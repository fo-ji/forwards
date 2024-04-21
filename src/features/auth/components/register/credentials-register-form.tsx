'use client';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState, useFormStatus } from 'react-dom';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';

import { credentialsRegister } from '../../actions/register';
import { registerSchema } from '../../schemas/register';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      form="credentials-register"
      disabled={pending}
      className="w-full"
    >
      <Icon name="Mail" className="mr-2 size-4" />
      メールアドレスで新規登録
    </Button>
  );
};

export const CredentialsRegisterForm = () => {
  const [lastResult, action] = useFormState(credentialsRegister, undefined);
  const [form, fields] = useForm({
    id: 'credentials-register',
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registerSchema });
    },
    shouldValidate: 'onSubmit',
  });

  return (
    <form className="grid gap-4" {...getFormProps(form)} action={action}>
      <Field>
        <Label htmlFor={fields.email.id}>メールアドレス</Label>
        <FormInput meta={fields.email} type="text" />
        <FieldErrors errors={fields.email.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.password.id}>パスワード</Label>
        <FormInput meta={fields.password} type="password" />
        <FieldErrors errors={fields.password.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.passwordConfirm.id}>パスワード（確認）</Label>
        <FormInput meta={fields.passwordConfirm} type="password" />
        <FieldErrors errors={fields.passwordConfirm.errors} />
      </Field>
      <SubmitButton />
      <FieldErrors errors={form.errors} />
    </form>
  );
};
