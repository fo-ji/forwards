import { Link } from './link';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/',
    children: 'Link',
  },
};
