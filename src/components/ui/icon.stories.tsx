import { Icon } from './icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'House',
  },
};
