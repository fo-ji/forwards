import { DesktopNavigation } from './desktop-navigation';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/desktop-navigation',
  component: DesktopNavigation,
  tags: ['autodocs'],
} satisfies Meta<typeof DesktopNavigation>;

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
      <div className="h-[500px]">
        <Story />
      </div>
    ),
  ],
};
