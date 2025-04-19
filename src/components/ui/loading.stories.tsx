import { Loading } from './loading';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/loading',
  component: Loading,
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
