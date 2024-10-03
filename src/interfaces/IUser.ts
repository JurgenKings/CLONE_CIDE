export interface Iuser {
  id: number
  documentId: string
  username: string
  email: string
  provider?: string
  confirmed?: boolean
  blocked?: boolean
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  locale?: null | boolean | string | number | undefined | unknown | never | void | object
  name: string
  birthDate: string
  gender: string
  esDistribuidor?: boolean
}