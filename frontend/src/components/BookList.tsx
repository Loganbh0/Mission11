import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import type { Book } from '../types/Book'
import {
  clampPageSize,
  readStoredBrowseView,
  writeStoredBrowseView
} from '../utils/browseStateStorage'
import {
  BOOKS_API_BASE,
  normalizeCategories,
  normalizePagedBooks
} from '../utils/bookPayload'

export default function BookList() {
  const { addToCart } = useCart()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [categories, setCategories] = useState<string[]>([])
  const initialBrowse = readStoredBrowseView()
  const [categoryFilter, setCategoryFilter] = useState(
    initialBrowse.categoryFilter
  )

  const [page, setPage] = useState(initialBrowse.page)
  const [pageSize, setPageSize] = useState(initialBrowse.pageSize)
  const [sortBy, setSortBy] = useState<'id' | 'title'>(initialBrowse.sortBy)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    writeStoredBrowseView({
      page,
      pageSize,
      sortBy,
      categoryFilter
    })
  }, [page, pageSize, sortBy, categoryFilter])

  useEffect(() => {
    let isCancelled = false

    async function loadCategories() {
      try {
        const res = await fetch(`${BOOKS_API_BASE}/categories`)
        if (!res.ok) {
          return
        }
        const data = await res.json()
        if (!isCancelled) {
          setCategories(normalizeCategories(data))
        }
      } catch {
        // Dropdown falls back to "All categories" only
      }
    }

    loadCategories()

    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    async function loadBooks() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          sortBy
        })
        const trimmedCategory = categoryFilter.trim()
        if (trimmedCategory) {
          params.set('category', trimmedCategory)
        }
        const url = `${BOOKS_API_BASE}/paged?${params.toString()}`
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()
        const normalized = normalizePagedBooks(data)

        if (!isCancelled) {
          setBooks(normalized.items)
          setPage(normalized.page)
          setPageSize(clampPageSize(normalized.pageSize))
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
  }, [page, pageSize, sortBy, categoryFilter])

  if (error) {
    return <p style={{ textAlign: 'left', color: 'red' }}>{error}</p>
  }

  const showPagination = totalCount > 0 && totalPages > 1

  return (
    <div className="py-2">
      {loading ? <p className="mb-3">Loading books...</p> : null}

      <div className="book-header d-flex justify-content-between align-items-center mb-4 gap-3">
        <div className="text-start">
          <p className="mb-0">
            Page {page} of {totalPages} {totalCount > 0 ? `(Total: ${totalCount})` : ''}
          </p>
        </div>

        <div className="d-flex align-items-center gap-3 flex-wrap justify-content-end">
          <label className="d-flex align-items-center gap-2">
            <span className="text-nowrap">Category</span>
            <select
              className="form-select form-select-sm"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setPage(1)
              }}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="d-flex align-items-center gap-2">
            <span className="text-nowrap">Results per page</span>
            <select
              className="form-select form-select-sm"
              value={pageSize}
              onChange={(e) => {
                const next = Number(e.target.value) || 5
                setPageSize(clampPageSize(next))
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

      {!loading && books.length === 0 ? (
        <p className="text-muted mb-0">
          {categoryFilter.trim()
            ? 'No books in this category.'
            : 'No books found in the database.'}
        </p>
      ) : null}

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

                <div className="mt-auto pt-2 d-flex flex-column gap-2">
                  <div className="text-book-accent fw-semibold">${book.price}</div>
                  <button
                    type="button"
                    className="btn btn-book-accent btn-sm align-self-start"
                    onClick={() =>
                      addToCart({
                        bookId: book.bookId,
                        title: book.title,
                        unitPrice: book.price
                      })
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

