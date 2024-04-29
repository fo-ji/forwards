'use client';

import React, { type ReactNode } from 'react';

import ReactDOM from 'react-dom';

import { TooltipProvider } from '@/components/ui/tooltip';
import { IS_BROWSER, IS_PRODUCTION } from '@/config/constants';

import { ThemeProvider } from './theme-provider';
import { Toaster } from './toaster';

if (IS_BROWSER && !IS_PRODUCTION) {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      <Toaster />
    </ThemeProvider>
  );
};
