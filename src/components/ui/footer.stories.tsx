import { Footer } from './footer';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
