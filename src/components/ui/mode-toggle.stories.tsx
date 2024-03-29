import { ModeToggle } from './mode-toggle';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/mode-toggle',
  component: ModeToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof ModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
