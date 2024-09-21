import { Pagination } from '@/components/ui/pagination';

import { getProjects } from '../../api/get-projects';
import { getProjectsCount } from '../../api/get-projects-count';
import { SearchProjectForm } from '../search/search-project-form';

import { ProjectsList } from './projects-list';

import type { SearchParamsProjectsListType } from '../../schemas/get';

export const ProjectsListContainer = async ({
  ...searchParams
}: SearchParamsProjectsListType) => {
  const [projects, totalCount] = await Promise.all([
    getProjects(searchParams),
    getProjectsCount({ name: searchParams?.name }),
  ]);

  if (!projects || totalCount === undefined) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-10 justify-center">
        {totalCount !== 0 && (
          <Pagination
            totalCount={totalCount}
            baseHref="/projects"
            searchParams={searchParams}
          />
        )}
      </div>
      <SearchProjectForm searchParams={searchParams} />
      <ProjectsList projects={projects} {...searchParams} />
    </div>
  );
};
