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

import { SkillProjectsLinkGroup } from '../badge/skill-projects-link-group';

import type { SearchParamsSkillsListType } from '../../schemas/get';
import type { SkillWithProjects } from '../../types';

type SkillsListProps = {
  skills: SkillWithProjects[];
} & SearchParamsSkillsListType;

export const SkillsList = ({ skills, ...searchParams }: SkillsListProps) => {
  if (!skills.length) return <NoDataTable />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableSortHead
            className="min-w-24"
            baseUrl="/skills"
            sortKey="name"
            searchParams={searchParams}
          >
            スキル名
          </TableSortHead>
          <TableHead>プロジェクト</TableHead>
          <TableHead>URL</TableHead>
          <TableSortHead
            className="w-24"
            baseUrl="/skills"
            sortKey="updatedAt"
            searchParams={searchParams}
          >
            最終更新日
          </TableSortHead>
          <TableHead className="w-24 min-w-24 max-w-24" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {skills.map((skill) => (
          <TableRow key={skill.id}>
            <TableCell>
              <Link href={`/skills/${skill.id}`}>
                <span className="max-w-72 truncate">{skill.name}</span>
              </Link>
            </TableCell>
            <TableCell className="min-w-28 max-w-56">
              <SkillProjectsLinkGroup projects={skill.projects} />
            </TableCell>
            <TableCell>
              <Link target="_blank" href={skill.url} className="p-0">
                <span className="max-w-96 truncate">{skill.url}</span>
              </Link>
            </TableCell>
            <TableCell>{format(skill.updatedAt, 'yyyy/MM/dd')}</TableCell>
            <TableCell className="flex gap-0.5">
              <Link
                href={`/skills/${skill.id}/edit`}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Icon name="Pencil" />
                <span className="sr-only">気になる技術の編集ページへ</span>
              </Link>
              <Link
                href={`/skills/${skill.id}/delete`}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Icon name="Trash2" />
                <span className="sr-only">気になる技術の削除ページへ</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
