'use client';

import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

import { logout } from '../../actions/logout';

export const LogoutForm = () => {
  const [_, action, isPending] = useActionState(logout, undefined);

  return (
    <form id="logout" action={action}>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        form="logout"
        disabled={isPending}
        className="rounded-full"
      >
        <Icon name="LogOut" />
        <span className="sr-only">Logout</span>
      </Button>
    </form>
  );
};
