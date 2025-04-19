'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { generateQueryURL } from '@/utils/generate-query-url';

import {
  SearchParamsSkillsListType,
  searchParamsSkillsCountSchema,
} from '../../schemas/get';

type SearchSkillFormProps = {
  searchParams: SearchParamsSkillsListType;
};

export const SearchSkillForm = ({ searchParams }: SearchSkillFormProps) => {
  const router = useRouter();

  return (
    <search>
      <form
        id="search-skill"
        className="flex w-52 gap-2"
        action={(formData) => {
          const { data } = searchParamsSkillsCountSchema.safeParse({
            name: formData.get('name'),
          });
          const url = generateQueryURL('/skills', {
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
          placeholder="スキル名で検索"
        />
        <Button
          type="submit"
          variant="ghost"
          form="search-skill"
          size="icon"
          className="size-8 px-1"
        >
          <Icon name="Search" />
          <span className="sr-only">スキル名で検索</span>
        </Button>
      </form>
    </search>
  );
};
