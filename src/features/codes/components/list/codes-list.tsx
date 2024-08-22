import { List, ListItem, ListItemTitle } from '@/components/ui/list';
import { Markdown } from '@/components/ui/markdown';

import { CodeActionMenu } from '../menu/code-action-menu';

import type { Code } from '@prisma/client';

type CodesListProps = {
  codes: Code[];
};

export const CodesList = ({ codes }: CodesListProps) => {
  return (
    <List>
      {codes.map((code) => (
        <ListItem key={code.id}>
          <div className="space-y-1">
            <div className="flex justify-between gap-3">
              <ListItemTitle>{code.name}</ListItemTitle>
              <CodeActionMenu codeId={code.id} />
            </div>
            <Markdown value={code.block} />
          </div>
        </ListItem>
      ))}
    </List>
  );
};
