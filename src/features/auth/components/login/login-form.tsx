'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { GithubForm } from '../github-form';

import { CredentialsLoginForm } from './credentials-login-form';

export const LoginForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto grid max-w-sm gap-4">
        <GithubForm type="login" />
        <Separator className="my-4" />
        <CredentialsLoginForm />
      </CardContent>
    </Card>
  );
};
