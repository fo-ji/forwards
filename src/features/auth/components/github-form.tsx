'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

import { githubLogin } from '../actions';

type GithubFormProps = {
  type: 'login' | 'register';
};

const SubmitButton = ({ type }: GithubFormProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      form="github-login"
      disabled={pending}
      className="w-full"
    >
      <Icon name="Github" className="mr-2 size-4" />
      {`Githubアカウントで${type === 'login' ? 'ログイン' : '新規登録'}`}
    </Button>
  );
};

export const GithubForm = ({ type }: GithubFormProps) => {
  const [_, action] = useFormState(githubLogin, undefined);

  return (
    <form id="github-login" className="grid gap-4" action={action}>
      <SubmitButton type={type} />
    </form>
  );
};
