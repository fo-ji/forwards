'use client';

import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

import { githubLogin } from '../actions';

type GithubFormProps = {
  type: 'login' | 'register';
};

export const GithubForm = ({ type }: GithubFormProps) => {
  const [_, action, isPending] = useActionState(githubLogin, undefined);

  return (
    <form id="github-login" className="grid gap-4" action={action}>
      <Button
        type="submit"
        form="github-login"
        disabled={isPending}
        className="w-full"
      >
        <Icon name="Github" className="mr-2 size-4" />
        {`Githubアカウントで${type === 'login' ? 'ログイン' : '新規登録'}`}
      </Button>
    </form>
  );
};
