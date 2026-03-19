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
    <div className="py-2">
      <div className="book-header d-flex justify-content-between align-items-center mb-4 gap-3">
        <div className="text-start">
          <p className="mb-0">
            Page {page} of {totalPages} {totalCount > 0 ? `(Total: ${totalCount})` : ''}
          </p>
        </div>

        <div className="d-flex align-items-center gap-3 flex-wrap justify-content-end">
          <label className="d-flex align-items-center gap-2">
            <span className="text-nowrap">Results per page</span>
            <select
              className="form-select form-select-sm"
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

          <label className="d-flex align-items-center gap-2">
            <span className="text-nowrap">Sort</span>
            <select
              className="form-select form-select-sm"
              value={sortBy}
              onChange={(e) => {
                const next = e.target.value === 'title' ? 'title' : 'id'
                setSortBy(next)
                setPage(1)
              }}
            >
              <option value="id">Default (BookId)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </label>

          <div className="d-flex gap-2">
            <button
              className="btn btn-book-accent btn-sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={loading || page <= 1 || !showPagination}
            >
              Prev
            </button>
            <button
              className="btn btn-book-accent btn-sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={loading || page >= totalPages || !showPagination}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {books.map((book) => (
          <div className="col-12 col-md-6 col-lg-4" key={book.bookId}>
            <div className="card book-card h-100">
              <div className="card-body text-start d-flex flex-column">
                <h3 className="card-title h6 mb-1 text-book-accent">
                  {book.title || '(Untitled)'}
                </h3>
                <p className="text-muted mb-2">
                  <small>{book.author}</small>
                </p>

                <dl className="row mb-0">
                  <dt className="col-5 fw-semibold">
                    <small>Publisher</small>
                  </dt>
                  <dd className="col-7">
                    <small>{book.publisher}</small>
                  </dd>

                  <dt className="col-5 fw-semibold">
                    <small>ISBN</small>
                  </dt>
                  <dd className="col-7">
                    <small>{book.isbn}</small>
                  </dd>

                  <dt className="col-5 fw-semibold">
                    <small>Classification</small>
                  </dt>
                  <dd className="col-7">
                    <small>{book.classification}</small>
                  </dd>

                  <dt className="col-5 fw-semibold">
                    <small>Category</small>
                  </dt>
                  <dd className="col-7">
                    <small>{book.category}</small>
                  </dd>

                  <dt className="col-5 fw-semibold">
                    <small>Pages</small>
                  </dt>
                  <dd className="col-7">
                    <small>{book.pageCount}</small>
                  </dd>
                </dl>

                <div className="mt-auto pt-2">
                  <div className="text-book-accent fw-semibold">${book.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

