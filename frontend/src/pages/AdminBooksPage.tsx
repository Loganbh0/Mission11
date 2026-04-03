import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Book } from '../types/Book'
import { deleteBook, fetchAdminBooksPage } from '../api/BooksAPI'
import Pagination from '../components/Pagination'
import NewBookForm from '../components/NewBookForm'
import EditBookForm from '../components/EditBookForm'

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAdminBooksPage(page, pageSize)
        setBooks(data.items)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [page, pageSize])

  const refreshList = () => {
    fetchAdminBooksPage(page, pageSize).then((data) => {
      setBooks(data.items)
      setTotalPages(data.totalPages)
    })
  }

  const handleDeleteBook = async (bookId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    )
    if (!confirmDelete) return
    try {
      await deleteBook(bookId)
      const data = await fetchAdminBooksPage(page, pageSize)
      setBooks(data.items)
      setTotalPages(data.totalPages)
    } catch {
      alert('Failed to delete book')
    }
  }

  if (loading) return <p className="text-muted py-2 text-start">Loading books...</p>
  if (error)
    return (
      <p className="text-danger py-2 text-start">Error: {error}</p>
    )

  return (
    <div className="py-2 text-start">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <h2 className="h4 mb-0 text-book-accent d-flex align-items-center gap-2">
          <i className="bi bi-journal-text" aria-hidden="true" />
          Admin — Books
        </h2>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          Back to store
        </Link>
      </div>

      {!showForm ? (
        <button
          type="button"
          className="btn btn-book-accent btn-sm mb-3"
          onClick={() => setShowForm(true)}
        >
          Add New Book
        </button>
      ) : null}

      {showForm ? (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false)
            fetchAdminBooksPage(page, pageSize).then((data) => {
              setBooks(data.items)
              setTotalPages(data.totalPages)
            })
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : null}

      {editingBook ? (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null)
            refreshList()
          }}
          onCancel={() => setEditingBook(null)}
        />
      ) : null}

      <div className="table-responsive">
        <table className="table table-sm align-middle book-card border rounded overflow-hidden">
          <thead className="table-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Publisher</th>
              <th scope="col">ISBN</th>
              <th scope="col">Classification</th>
              <th scope="col">Category</th>
              <th scope="col">Pages</th>
              <th scope="col" className="text-end">
                Price
              </th>
              <th scope="col" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.bookId}>
                <td>{b.bookId}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.isbn}</td>
                <td>{b.classification}</td>
                <td>{b.category}</td>
                <td>{b.pageCount}</td>
                <td className="text-end fw-semibold text-book-accent">
                  ${b.price.toFixed(2)}
                </td>
                <td className="text-nowrap">
                  <button
                    type="button"
                    className="btn btn-book-accent btn-sm d-block w-100 mb-1"
                    onClick={() => setEditingBook(b)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm d-block w-100"
                    onClick={() => handleDeleteBook(b.bookId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize)
          setPage(1)
        }}
      />
    </div>
  )
}
