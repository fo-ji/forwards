import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';

type CodeActionMenuProps = {
  codeId: string;
};

export const CodeActionMenu = ({ codeId }: CodeActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-1 min-w-10 rounded-full"
        >
          <Icon name="Ellipsis" />
          <span className="sr-only">コードのメニュー</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <Link href={`/codes/${codeId}/edit`}>
          <DropdownMenuItem>
            <Icon name="Pencil" className="mr-2 size-4" />
            <span>編集</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/codes/${codeId}/delete`}>
          <DropdownMenuItem>
            <Icon name="Trash2" className="mr-2 size-4" />
            <span>削除</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
