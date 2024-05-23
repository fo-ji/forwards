import React from 'react';
import type { Preview } from '@storybook/react';
import { Toaster } from '../src/providers/toaster';
import { TooltipProvider } from '../src/components/ui/tooltip';

import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
        <Toaster />
      </TooltipProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
