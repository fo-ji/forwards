'use client';

import { useActionState } from 'react';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';

import { useCredentialLogin } from '../../api/login/use-credential-login';
import { loginSchema } from '../../schemas/login';

export const CredentialsLoginForm = () => {
  const { trigger } = useCredentialLogin();
  const [lastResult, action, isPending] = useActionState(trigger, {});
  const [form, fields] = useForm({
    id: 'credentials-login',
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
  });

  return (
    <form
      className="grid gap-4"
      {...getFormProps(form)}
      action={action}
      noValidate
    >
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
      <Button
        type="submit"
        form="credentials-login"
        disabled={isPending}
        className="w-full"
      >
        <Icon name="Mail" className="mr-2 size-4" />
        メールアドレスでログイン
      </Button>
      <FieldErrors errors={form.errors} />
    </form>
  );
};
