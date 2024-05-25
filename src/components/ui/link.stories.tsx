import { Button } from './button';
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

export const NoStyle: Story = {
  args: {
    href: '/',
    children: 'No Style Link',
    noStyle: true,
  },
};

export const ButtonLink: Story = {
  args: {
    href: 'dummy',
    children: 'dummy',
  },
  render: () => {
    return (
      <Button asChild>
        <Link href="/" noStyle>
          New
        </Link>
      </Button>
    );
  },
};
