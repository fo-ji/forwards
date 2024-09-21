'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { generateQueryURL } from '@/utils/generate-query-url';

import {
  searchParamsProjectsCountSchema,
  type SearchParamsProjectsListType,
} from '../../schemas/get';

type SearchProjectFormProps = {
  searchParams: SearchParamsProjectsListType;
};

export const SearchProjectForm = ({ searchParams }: SearchProjectFormProps) => {
  const router = useRouter();

  return (
    <search>
      <form
        id="search-project"
        className="flex w-56 gap-2"
        action={(formData) => {
          const { data } = searchParamsProjectsCountSchema.safeParse({
            name: formData.get('name'),
          });
          const url = generateQueryURL('/projects', {
            ...searchParams,
            page: 1,
            name: data?.name,
          });
          router.replace(url);
        }}
        noValidate
      >
        <Input
          className="h-8"
          type="search"
          name="name"
          defaultValue={searchParams.name}
          placeholder="プロジェクト名で検索"
        />
        <Button
          type="submit"
          variant="ghost"
          form="search-project"
          size="icon"
          className="size-8 px-1"
        >
          <Icon name="Search" />
          <span className="sr-only">プロジェクト名で検索</span>
        </Button>
      </form>
    </search>
  );
};
