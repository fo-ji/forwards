import { Logo } from './logo';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/logo',
  component: Logo,
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: '',
    width: 60,
    height: 60,
  },
};
