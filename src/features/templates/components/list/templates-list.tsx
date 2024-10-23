import { format } from 'date-fns';

import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import {
  NoDataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortHead,
} from '@/components/ui/table';

import { TemplateSkillsLinkGroup } from '../badge/template-skills-link-group';

import type { SearchParamsTemplatesListType } from '../../schemas/get';
import type { TemplateWithRelations } from '../../types';

type TemplatesListProps = {
  templates: TemplateWithRelations[];
} & SearchParamsTemplatesListType;

export const TemplatesList = ({
  templates,
  ...searchParams
}: TemplatesListProps) => {
  if (!templates.length) return <NoDataTable />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableSortHead
            className="min-w-24"
            baseUrl="/templates"
            sortKey="name"
            searchParams={searchParams}
          >
            テンプレート名
          </TableSortHead>
          <TableHead>スキル</TableHead>
          <TableSortHead
            className="w-24"
            baseUrl="/templates"
            sortKey="updatedAt"
            searchParams={searchParams}
          >
            最終更新日
          </TableSortHead>
          <TableHead className="w-24 min-w-24 max-w-24" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((template) => (
          <TableRow key={template.id}>
            <TableCell>
              <Link href={`/templates/${template.id}`}>
                <span className="max-w-72 truncate">{template.name}</span>
              </Link>
            </TableCell>
            <TableCell className="min-w-28 max-w-56">
              <TemplateSkillsLinkGroup skills={template.skills} />
            </TableCell>
            <TableCell>{format(template.updatedAt, 'yyyy/MM/dd')}</TableCell>
            <TableCell className="flex gap-0.5">
              <Link
                href={`/templates/${template.id}/edit`}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Icon name="Pencil" />
                <span className="sr-only">テンプレートの編集ページへ</span>
              </Link>
              <Link
                href={`/templates/${template.id}/delete`}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Icon name="Trash2" />
                <span className="sr-only">テンプレートの削除ページへ</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
