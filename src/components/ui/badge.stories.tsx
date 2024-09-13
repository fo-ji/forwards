import { Badge } from './badge';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Badge',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Badge',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Badge',
  },
};
