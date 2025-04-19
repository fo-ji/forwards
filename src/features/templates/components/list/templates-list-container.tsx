import { Pagination } from '@/components/ui/pagination';

import { getTemplates } from '../../api/get-templates';
import { getTemplatesCount } from '../../api/get-templates-count';
import { SearchTemplateForm } from '../search/search-template-form';

import { TemplatesList } from './templates-list';

import type { SearchParamsTemplatesListType } from '../../schemas/get';

export const TemplatesListContainer = async ({
  ...searchParams
}: SearchParamsTemplatesListType) => {
  const [templates, totalCount] = await Promise.all([
    getTemplates(searchParams),
    getTemplatesCount({ name: searchParams?.name }),
  ]);

  if (!templates || totalCount === undefined) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-10 justify-center">
        {totalCount !== 0 && (
          <Pagination
            totalCount={totalCount}
            baseHref="/templates"
            searchParams={searchParams}
          />
        )}
      </div>
      <SearchTemplateForm searchParams={searchParams} />
      <TemplatesList templates={templates} {...searchParams} />
    </div>
  );
};
