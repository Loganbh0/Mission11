import { useEffect, useState } from 'react'
import type { Book } from '../types/Book'
import type { PagedBooks } from '../types/PagedBooks'

const BOOKS_ENDPOINT = 'https://localhost:5000/api/Book'

function normalizeBook(raw: any): Book {
  return {
    bookId: raw.bookId ?? raw.BookId ?? 0,
    title: raw.title ?? raw.Title ?? '',
    author: raw.author ?? raw.Author ?? '',
    publisher: raw.publisher ?? raw.Publisher ?? '',
    isbn: raw.isbn ?? raw.ISBN ?? '',
    classification: raw.classification ?? raw.Classification ?? '',
    category: raw.category ?? raw.Category ?? '',
    pageCount: raw.pageCount ?? raw.PageCount ?? 0,
    price: raw.price ?? raw.Price ?? 0
  }
}

function normalizePagedBooks(raw: any): PagedBooks {
  const itemsRaw = raw?.items ?? raw?.Items ?? []

  const pageRaw = raw?.page ?? raw?.Page ?? 1
  const pageSizeRaw = raw?.pageSize ?? raw?.PageSize ?? 5
  const totalCountRaw = raw?.totalCount ?? raw?.TotalCount ?? 0
  const totalPagesRaw = raw?.totalPages ?? raw?.TotalPages ?? 0

  const items = Array.isArray(itemsRaw) ? itemsRaw.map(normalizeBook) : []

  return {
    items,
    page: Number(pageRaw) || 1,
    pageSize: Number(pageSizeRaw) || 5,
    totalCount: Number(totalCountRaw) || 0,
    totalPages: Number(totalPagesRaw) || 0
  }
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [sortBy, setSortBy] = useState<'id' | 'title'>('id')
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    let isCancelled = false

    async function loadBooks() {
      try {
        setLoading(true)
        setError(null)

        const url = `${BOOKS_ENDPOINT}/paged?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()
        const normalized = normalizePagedBooks(data)

        if (!isCancelled) {
          setBooks(normalized.items)
          setPage(normalized.page)
          setPageSize(normalized.pageSize)
          setTotalCount(normalized.totalCount)
          setTotalPages(normalized.totalPages)
        }
      } catch (e: any) {
        if (!isCancelled) {
          setError(e?.message ?? 'Failed to load books')
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadBooks()

    return () => {
      isCancelled = true
    }
  }, [page, pageSize, sortBy])

  if (loading) {
    return <p>Loading books...</p>
  }

  if (error) {
    return <p style={{ textAlign: 'left', color: 'red' }}>{error}</p>
  }

  if (books.length === 0) {
    return <p>No books found in the database.</p>
  }

  const showPagination = totalCount > 0 && totalPages > 1

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ textAlign: 'left' }}>
          <p style={{ margin: 0 }}>
            Page {page} of {totalPages}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Results per page:
            <select
              value={pageSize}
              onChange={(e) => {
                const next = Number(e.target.value) || 5
                setPageSize(next)
                setPage(1)
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Sort:
            <select
              value={sortBy}
              onChange={(e) => {
                const next = e.target.value === 'title' ? 'title' : 'id'
                setSortBy(next)
                setPage(1)
              }}
            >
              <option value="id">Default</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </label>

          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={loading || page <= 1 || !showPagination}
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={loading || page >= totalPages || !showPagination}
          >
            Next
          </button>
        </div>
      </div>

      {books.map((book) => (
        <article
          key={book.bookId}
          style={{
            textAlign: 'left',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '16px',
            margin: '12px 0'
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>{book.title || '(Untitled)'}</h3>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p>
            <strong>Classification:</strong> {book.classification}
          </p>
          <p>
            <strong>Category:</strong> {book.category}
          </p>
          <p>
            <strong>Page Count:</strong> {book.pageCount}
          </p>
          <p>
            <strong>Price:</strong> ${book.price}
          </p>
        </article>
      ))}
    </div>
  )
}

