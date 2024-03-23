'use client';

import React, { type ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';
import ReactDOM from 'react-dom';

import { IS_BROWSER, IS_PRODUCTION } from '@/config/constants';

if (IS_BROWSER && !IS_PRODUCTION) {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

type AppProviderProps = {
  children: ReactNode;
};
export const AppProvider = ({ children }: AppProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
