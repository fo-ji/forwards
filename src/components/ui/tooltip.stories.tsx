import { Tooltip } from './tooltip';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Tooltip content="Tooltip content">
        <button>Tooltip trigger</button>
      </Tooltip>
    );
  },
};
