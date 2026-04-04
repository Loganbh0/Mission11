/**
 * Typed `fetch` helpers for the Book API (admin list + create / update / delete).
 * Base URL and JSON shape normalization: `../utils/bookPayload`.
 */
import type { Book } from '../types/Book'
import {
  BOOKS_API_BASE,
  normalizeBook,
  normalizePagedBooks
} from '../utils/bookPayload'
import type { PagedBooks } from '../types/PagedBooks'

/**
 * GET paged books for the admin table (fixed `sortBy=id` in query; matches backend admin listing).
 */
export async function fetchAdminBooksPage(
  page: number,
  pageSize: number
): Promise<PagedBooks> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sortBy: 'id'
  })
  const response = await fetch(`${BOOKS_API_BASE}/paged?${params.toString()}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch books (${response.status})`)
  }
  const data = await response.json()
  return normalizePagedBooks(data)
}

/**
 * POST a new book; server assigns `bookId`. Throws with status + body snippet on failure.
 */
export async function addBook(book: Book): Promise<Book> {
  const response = await fetch(`${BOOKS_API_BASE}/AddBook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(
      `Failed to add book (${response.status}): ${detail.slice(0, 200)}`
    )
  }
  const data = await response.json()
  return normalizeBook(data)
}

/**
 * PUT full book payload for an existing id.
 */
export async function updateBook(bookId: number, book: Book): Promise<Book> {
  const response = await fetch(`${BOOKS_API_BASE}/UpdateBook/${bookId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(
      `Failed to update book (${response.status}): ${detail.slice(0, 200)}`
    )
  }
  const data = await response.json()
  return normalizeBook(data)
}

/**
 * DELETE by id; no response body on success.
 */
export async function deleteBook(bookId: number): Promise<void> {
  const response = await fetch(`${BOOKS_API_BASE}/DeleteBook/${bookId}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(
      `Failed to delete book (${response.status}): ${detail.slice(0, 200)}`
    )
  }
}
