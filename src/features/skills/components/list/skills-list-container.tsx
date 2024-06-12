import { Pagination } from '@/components/ui/pagination';

import { getSkills } from '../../api/get-skills';
import { getSkillsCount } from '../../api/get-skills-count';

import { SkillsList } from './skills-list';

import type { SearchParamsSkillsListType } from '../../schemas/get';

export const SkillsListContainer = async ({
  ...searchParams
}: SearchParamsSkillsListType) => {
  const [skills, totalCount] = await Promise.all([
    getSkills(searchParams),
    getSkillsCount(),
  ]);

  if (!skills) return null;

  return (
    <>
      {totalCount && (
        <div className="mb-2">
          <Pagination
            totalCount={totalCount}
            baseHref="/skills"
            currentPage={searchParams.page}
            {...searchParams}
          />
        </div>
      )}
      <SkillsList skills={skills} {...searchParams} />
    </>
  );
};
