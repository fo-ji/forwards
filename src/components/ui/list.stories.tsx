import { List, ListItem, ListItemDescription, ListItemTitle } from './list';

import type { Meta, StoryObj } from '@storybook/react';

const articles = [
  {
    id: '001',
    url: 'http://localhost:3000/home',
  },
  {
    id: '002',
    url: 'http://localhost:3000/xxx',
  },
  {
    id: '003',
    url: 'http://localhost:3000/yyy',
  },
  {
    id: '004',
    url: 'http://localhost:3000/zzz',
  },
  {
    id: '005',
    url: 'http://localhost:3000/hoge',
  },
  {
    id: '006',
    url: 'http://localhost:3000/foo',
  },
  {
    id: '007',
    url: 'http://localhost:3000/bar',
  },
];

const meta = {
  title: 'components/ui/list',
  component: List,
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <List>
        {articles.map((article) => (
          <ListItem key={article.id}>
            <div className="space-y-1">
              <div className="flex justify-between gap-3">
                <ListItemTitle>{article.id}</ListItemTitle>
              </div>
              <ListItemDescription>{article.url}</ListItemDescription>
            </div>
          </ListItem>
        ))}
      </List>
    );
  },
};
