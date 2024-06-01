import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Skill } from '@prisma/client';

type SkillsListProps = {
  skills: Skill[];
};

export const SkillsList = ({ skills }: SkillsListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-24">スキル名</TableHead>
          <TableHead>URL</TableHead>
          <TableHead className="w-24 min-w-24 max-w-24" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {skills.map((skill) => (
          <TableRow key={skill.id}>
            <TableCell className="max-w-72 truncate">{skill.name}</TableCell>
            <TableCell>
              <Link target="_blank" href={skill.url} className="p-0">
                <span className="max-w-96 truncate">{skill.url}</span>
              </Link>
            </TableCell>
            <TableCell className="flex gap-3">
              <Link
                href="#"
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Icon name="Pencil" />
              </Link>
              <Link
                href="#"
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Icon name="Trash2" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
