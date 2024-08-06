import { http } from '@/lib/http';

import type { Article } from '@prisma/client';

type GetArticleParams = {
  id: string;
};

export const getArticle = ({ id }: GetArticleParams) => {
  return http<Article>(`/api/articles/${id}`);
};
