'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

import { logout } from '../../actions/logout';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      form="logout"
      disabled={pending}
      className="rounded-full"
    >
      <Icon name="LogOut" />
      <span className="sr-only">Logout</span>
    </Button>
  );
};

export const LogoutForm = () => {
  const [_, action] = useFormState(logout, undefined);

  return (
    <form id="logout" action={action}>
      <SubmitButton />
    </form>
  );
};
