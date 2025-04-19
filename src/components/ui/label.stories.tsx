import { Icon } from './icon';
import { Label } from './label';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <div className="flex items-center space-x-2">
          <Icon name="Check" id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </div>
    );
  },
};
