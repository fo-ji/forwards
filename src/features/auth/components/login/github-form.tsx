'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

import { githubLogin } from '../../actions/login';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      form="github-login"
      disabled={pending}
      className="w-full"
    >
      <Icon name="Github" className="mr-2 size-4" />
      Githubアカウントでログイン
    </Button>
  );
};

export const GithubForm = () => {
  return (
    <form id="github-login" action={githubLogin}>
      <SubmitButton />
    </form>
  );
};
