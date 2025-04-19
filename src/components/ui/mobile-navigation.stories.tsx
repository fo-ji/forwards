import { MobileNavigation } from './mobile-navigation';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/mobile-navigation',
  component: MobileNavigation,
  tags: ['autodocs'],
} satisfies Meta<typeof MobileNavigation>;

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
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};
