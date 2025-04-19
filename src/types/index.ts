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

export type ParsedPageSearchParams = {
  page: number;
  pageSize: number;
  orderBy: string;
  sortDirection: SortDirection;
  [key: string]: string | number | undefined;
};

export type SelectOptions = {
  label: string;
  value: string;
}[];
