import type { Book } from './Book'

/** One page of books plus paging metadata from GET .../paged. */
export type PagedBooks = {
  items: Book[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

