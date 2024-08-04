import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';

type ArticleActionMenuProps = {
  articleId: string;
};

export const ArticleActionMenu = ({ articleId }: ArticleActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-1 min-w-10 rounded-full"
        >
          <Icon name="Ellipsis" />
          <span className="sr-only">記事のメニュー</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <Link href={`/articles/${articleId}/edit`}>
          <DropdownMenuItem>
            <Icon name="Pencil" className="mr-2 size-4" />
            <span>編集</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/articles/${articleId}/delete`}>
          <DropdownMenuItem>
            <Icon name="Trash2" className="mr-2 size-4" />
            <span>削除</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
