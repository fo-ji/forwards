'use client';

// import { useCallback } from 'react';

// import { redirect } from 'next/navigation';

import { useActionState } from 'react';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
// import { FormSubmittedToast } from '@/components/form/form-submitted-toast';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
// import { toast } from '@/hooks/use-toast';

import { credentialsLogin } from '../../actions/login';
import { loginSchema } from '../../schemas/login';

export const CredentialsLoginForm = () => {
  const [lastResult, action, isPending] = useActionState(
    credentialsLogin,
    undefined,
  );
  const [form, fields] = useForm({
    id: 'credentials-login',
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
  });

  // const onSuccess = useCallback(() => {
  //   // toast({ description: 'ログインしました' });
  //   redirect('/');
  // }, []);

  // const onError = useCallback((errorMessage?: string) => {
  //   toast({
  //     variant: 'destructive',
  //     description: errorMessage || 'ログインできませんでした',
  //   });
  // }, []);

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
      {/* <FormSubmittedToast
        lastResult={lastResult}
        onSuccess={onSuccess}
        onError={onError}
      /> */}
    </form>
  );
};
