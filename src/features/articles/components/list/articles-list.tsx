import { Link } from '@/components/ui/link';
import { List, ListItem, ListItemTitle } from '@/components/ui/list';

import { ArticleActionMenu } from '../menu/article-action-menu';

import type { Article } from '@prisma/client';

type ArticlesListProps = {
  articles: Article[];
};

export const ArticlesList = ({ articles }: ArticlesListProps) => {
  return (
    <List>
      {articles.map((article) => (
        <ListItem key={article.id}>
          <div className="space-y-1">
            <div className="flex justify-between gap-3">
              <ListItemTitle>{article.name}</ListItemTitle>
              <ArticleActionMenu articleId={article.id} />
            </div>
            <Link
              target="_blank"
              href={article.url}
              className="h-auto whitespace-pre-wrap p-0 text-sm text-muted-foreground [overflow-wrap:anywhere]"
            >
              {article.url}
            </Link>
          </div>
        </ListItem>
      ))}
    </List>
  );
};
