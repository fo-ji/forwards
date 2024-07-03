import { Icon } from './icon';
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

export const Button: Story = {
  args: {
    href: '/',
    variant: 'default',
    children: 'Link',
  },
};

export const Destructive: Story = {
  args: {
    href: '/',
    variant: 'destructive',
    children: 'Link',
  },
};

export const Outline: Story = {
  args: {
    href: '/',
    variant: 'outline',
    children: 'Link',
  },
};

export const Secondary: Story = {
  args: {
    href: '/',
    variant: 'secondary',
    children: 'Link',
  },
};

export const Ghost: Story = {
  args: {
    href: '/',
    variant: 'ghost',
    children: 'Link',
  },
};

export const OnlyIcon: Story = {
  args: {
    href: '/',
    variant: 'ghost',
    children: <Icon name="Github" />,
    size: 'icon',
    className: 'rounded-full',
  },
};

export const WithIcon: Story = {
  args: {
    href: '/',
    variant: 'link',
    children: '',
  },
  render: () => {
    return (
      <Link href="/">
        <Icon name="House" className="mr-2 size-4" /> Go Home
      </Link>
    );
  },
};
