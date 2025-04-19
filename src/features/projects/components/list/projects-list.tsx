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

import { SearchParamsProjectsListType } from '../../schemas/get';
import { ProjectSkillsLinkGroup } from '../badge/project-skills-link-group';
import { ProjectStatusBadge } from '../badge/project-status-badge';

import type { ProjectWithRelations } from '../../types';

type ProjectsListProps = {
  projects: ProjectWithRelations[];
} & SearchParamsProjectsListType;

export const ProjectsList = ({
  projects,
  ...searchParams
}: ProjectsListProps) => {
  if (!projects.length) return <NoDataTable />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableSortHead
            className="w-32"
            baseUrl="/projects"
            sortKey="status"
            searchParams={searchParams}
          >
            ステータス
          </TableSortHead>
          <TableSortHead
            className="min-w-24"
            baseUrl="/projects"
            sortKey="name"
            searchParams={searchParams}
          >
            プロジェクト名
          </TableSortHead>
          <TableHead>スキル</TableHead>
          <TableHead>URL</TableHead>
          <TableSortHead
            className="w-24"
            baseUrl="/projects"
            sortKey="updatedAt"
            searchParams={searchParams}
          >
            最終更新日
          </TableSortHead>
          <TableHead className="w-24 min-w-24 max-w-24" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>
              <ProjectStatusBadge status={project.status} />
            </TableCell>
            <TableCell>
              <Link href={`/projects/${project.id}`}>
                <span className="max-w-72 truncate">{project.name}</span>
              </Link>
            </TableCell>
            <TableCell className="min-w-28 max-w-56">
              <ProjectSkillsLinkGroup skills={project.skills} />
            </TableCell>
            <TableCell>
              {project.url && (
                <Link target="_blank" href={project.url} className="p-0">
                  <span className="max-w-96 truncate">{project.url}</span>
                </Link>
              )}
            </TableCell>
            <TableCell>{format(project.updatedAt, 'yyyy/MM/dd')}</TableCell>
            <TableCell className="flex gap-0.5">
              <Link
                href={`/projects/${project.id}/edit`}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Icon name="Pencil" />
                <span className="sr-only">プロジェクトの編集ページへ</span>
              </Link>
              <Link
                href={`/projects/${project.id}/delete`}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Icon name="Trash2" />
                <span className="sr-only">プロジェクトの削除ページへ</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
