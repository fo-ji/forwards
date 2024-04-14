'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export const LogoutButton = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      <Icon name="LogOut" />
      <span className="sr-only">Logout</span>
    </Button>
  );
};
