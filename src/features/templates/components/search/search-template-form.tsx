'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { generateQueryURL } from '@/utils/generate-query-url';

import {
  searchParamsTemplatesCountSchema,
  type SearchParamsTemplatesListType,
} from '../../schemas/get';

type SearchTemplateFormProps = {
  searchParams: SearchParamsTemplatesListType;
};

export const SearchTemplateForm = ({
  searchParams,
}: SearchTemplateFormProps) => {
  const router = useRouter();

  return (
    <search>
      <form
        id="search-template"
        className="flex w-56 gap-2"
        action={(formData) => {
          const { data } = searchParamsTemplatesCountSchema.safeParse({
            name: formData.get('name'),
          });
          const url = generateQueryURL('/templates', {
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
          placeholder="テンプレート名で検索"
        />
        <Button
          type="submit"
          variant="ghost"
          form="search-template"
          size="icon"
          className="size-8 px-1"
        >
          <Icon name="Search" />
          <span className="sr-only">テンプレート名で検索</span>
        </Button>
      </form>
    </search>
  );
};
