import { Pagination } from '@/components/ui/pagination';

import { getSkills } from '../../api/get-skills';
import { getSkillsCount } from '../../api/get-skills-count';
import { SearchSkillForm } from '../search/search-skill-form';

import { SkillsList } from './skills-list';

import type { SearchParamsSkillsListType } from '../../schemas/get';

export const SkillsListContainer = async ({
  ...searchParams
}: SearchParamsSkillsListType) => {
  const [skills, totalCount] = await Promise.all([
    getSkills(searchParams),
    getSkillsCount({ name: searchParams?.name }),
  ]);

  if (!skills || totalCount === undefined) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-10 justify-center">
        {totalCount !== 0 && (
          <Pagination
            totalCount={totalCount}
            baseHref="/skills"
            searchParams={searchParams}
          />
        )}
      </div>
      <SearchSkillForm searchParams={searchParams} />
      <SkillsList skills={skills} {...searchParams} />
    </div>
  );
};
