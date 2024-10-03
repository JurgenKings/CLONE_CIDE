export interface ICategory {
  id?: number;
  documentId?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: null | boolean | string | number | undefined | unknown | never | void | object;
}