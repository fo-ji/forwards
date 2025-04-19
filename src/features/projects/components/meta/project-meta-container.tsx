import { notFound } from 'next/navigation';

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

  return <ProjectMeta project={project} />;
};
