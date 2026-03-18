import type { Book } from './Book'

export type PagedBooks = {
  items: Book[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

