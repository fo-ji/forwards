'server only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { env } from '@/env.mjs';

export const http = async <T>(
  url: RequestInfo,
  options?: RequestInit,
): Promise<T | undefined> => {
  const res = await fetch(`${env.APP_URL}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: (await cookies())
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join(';'),
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) redirect('/login');
  if (!res.ok) throw new Error(res.statusText);

  const { data } = await res.json();
  return data;
};
