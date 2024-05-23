import { Header } from './header';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
