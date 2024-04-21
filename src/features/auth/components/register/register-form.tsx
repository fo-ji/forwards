'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { GithubForm } from '../github-form';

import { CredentialsRegisterForm } from './credentials-register-form';

export const RegisterForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>新規登録</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto grid max-w-sm gap-4">
        <GithubForm type="register" />
        <Separator className="my-4" />
        <CredentialsRegisterForm />
      </CardContent>
    </Card>
  );
};
