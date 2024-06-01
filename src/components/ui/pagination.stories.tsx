import { Pagination } from './pagination';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 2,
    pageSize: 10,
    totalCount: 100,
    baseHref: '/',
    maxPagesToShow: 3,
  },
};
