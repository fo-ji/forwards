export enum SortDirection {
  'DESC' = 'desc',
  'ASC' = 'asc',
}

export type PageSearchParams = {
  page?: string;
  pageSize?: string;
  orderBy?: string;
  sortDirection?: SortDirection;
};
