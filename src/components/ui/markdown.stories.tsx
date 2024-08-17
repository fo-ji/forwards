import { Markdown } from './markdown';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/markdown',
  component: Markdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Markdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '```bash\n$ docker compose up --build\n```',
  },
};
