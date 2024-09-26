import { notFound } from 'next/navigation';

import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';

import { getProject } from '../../api/get-project';

import { ProjectMeta } from './project-meta';

type ProjectMetaContainerProps = {
  projectId: string;
};

export const ProjectMetaContainer = async ({
  projectId,
}: ProjectMetaContainerProps) => {
  const project = await getProject({ id: projectId });
  if (!project) return notFound();

  return (
    <div>
      <div className="flex justify-end gap-2 pb-2">
        <Link
          href={`/projects/${project.id}/edit`}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <Icon name="Pencil" />
          <span className="sr-only">プロジェクトの編集ページへ</span>
        </Link>
        <Link
          href={`/projects/${project.id}/delete`}
          variant="destructive"
          size="icon"
          className="rounded-full"
        >
          <Icon name="Trash2" />
          <span className="sr-only">プロジェクトの削除ページへ</span>
        </Link>
      </div>
      <ProjectMeta project={project} />
    </div>
  );
};
