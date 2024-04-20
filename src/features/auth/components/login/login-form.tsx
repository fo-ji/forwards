'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { CredentialsForm } from './credentials-form';
import { GithubForm } from './github-form';

export const LoginForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto grid max-w-sm gap-4">
        <GithubForm />
        <Separator className="my-4" />
        <CredentialsForm />
      </CardContent>
    </Card>
  );
};
