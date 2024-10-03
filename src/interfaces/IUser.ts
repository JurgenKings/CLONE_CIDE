export interface Iuser {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: null | false | string | number | undefined
  name: string
  birthDate: string
  gender: string
  esDistribuidor: boolean
}