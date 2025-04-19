import { Input } from './input';
import { Label } from './label';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled',
  },
};

export const File: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>
    );
  },
};
