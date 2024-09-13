import { MultiSelect } from './multi-select';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/multi-select',
  component: MultiSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  {
    label: 'option-1',
    value: '1',
  },
  {
    label: 'option-2',
    value: '2',
  },
  {
    label: 'option-3',
    value: '3',
  },
];

export const Default: Story = {
  args: {
    options,
    onValueChange: () => null,
    defaultValue: ['1'],
  },
};
