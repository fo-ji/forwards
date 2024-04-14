import { Footer } from './footer';
import { Sidebar } from './sidebar';
import { TooltipProvider } from './tooltip';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/sidebar',
  component: Sidebar,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/projects',
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="h-[500px]">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};
