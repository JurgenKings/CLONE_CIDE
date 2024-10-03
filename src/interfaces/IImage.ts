import { IFormats } from "./IFormats"

export interface IImage {
  id?: number;
  documentId?: string;
  name?: string;
  alternativeText?: null | boolean | string | number | undefined | unknown | never | void | object;
  caption?: null | boolean | string | number | undefined | unknown | never | void | object;
  width?: number;
  height?: number;
  formats?: IFormats;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string;
  previewUrl?: null | boolean | string | number | undefined | unknown | never | void | object;
  provider?: string;
  provider_metadata?: null | boolean | string | number | undefined | unknown | never | void | object;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: null | boolean | string | number | undefined | unknown | never | void | object;
}