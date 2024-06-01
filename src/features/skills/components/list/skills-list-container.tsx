import { Pagination } from '@/components/ui/pagination';

import { getSkills } from '../../api/get-skills';
import { getSkillsCount } from '../../api/get-skills-count';

import { SkillsList } from './skills-list';

type SkillsListContainerProps = {
  page: number;
  pageSize: number;
};

export const SkillsListContainer = async ({
  page,
  pageSize,
}: SkillsListContainerProps) => {
  const [skills, totalCount] = await Promise.all([
    getSkills({ page, pageSize }),
    getSkillsCount(),
  ]);

  if (!skills) return null;

  return (
    <>
      {totalCount && (
        <div className="mb-2">
          <Pagination
            currentPage={page}
            pageSize={pageSize}
            totalCount={totalCount}
            baseHref="/skills"
          />
        </div>
      )}
      <SkillsList skills={skills} />
    </>
  );
};
