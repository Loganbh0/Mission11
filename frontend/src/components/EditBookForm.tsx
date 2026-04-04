/**
 * Admin “edit book” form: copies `book` into local state, PUT via `updateBook(bookId, ...)`.
 */
import { useState } from 'react'
import type { Book } from '../types/Book'
import { updateBook } from '../api/BooksAPI'

interface EditBookFormProps {
  book: Book
  onSuccess: () => void
  onCancel: () => void
}

export default function EditBookForm({
  book,
  onSuccess,
  onCancel
}: EditBookFormProps) {
  const [formData, setFormData] = useState<Book>({ ...book })
  const [submitError, setSubmitError] = useState<string | null>(null)

  /** Same mapping rules as NewBookForm: numbers for page count and price. */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'pageCount' || name === 'price') {
      const n = value === '' ? 0 : Number(value)
      setFormData({
        ...formData,
        [name]: Number.isNaN(n) ? 0 : n
      })
      return
    }
    setFormData({ ...formData, [name]: value })
  }

  /** PUTs full `formData` for `formData.bookId`; `onSuccess` closes the form in the parent. */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)
    try {
      await updateBook(formData.bookId, formData)
      onSuccess()
    } catch (err) {
      console.error(err)
      setSubmitError((err as Error).message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 book-card border rounded p-3 text-start"
    >
      <h2 className="h5 mb-3 text-book-accent">Edit Book #{book.bookId}</h2>
      {submitError ? (
        <p className="text-danger small mb-2">{submitError}</p>
      ) : null}
      <div className="row g-2">
        <div className="col-md-6">
          <label className="form-label small">
            Title
            <input
              type="text"
              name="title"
              className="form-control form-control-sm"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label small">
            Author
            <input
              type="text"
              name="author"
              className="form-control form-control-sm"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label small">
            Publisher
            <input
              type="text"
              name="publisher"
              className="form-control form-control-sm"
              value={formData.publisher}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label small">
            ISBN
            <input
              type="text"
              name="isbn"
              className="form-control form-control-sm"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label small">
            Classification
            <input
              type="text"
              name="classification"
              className="form-control form-control-sm"
              value={formData.classification}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label small">
            Category
            <input
              type="text"
              name="category"
              className="form-control form-control-sm"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label small">
            Page count
            <input
              type="number"
              name="pageCount"
              className="form-control form-control-sm"
              value={formData.pageCount}
              onChange={handleChange}
              min={0}
              required
            />
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label small">
            Price
            <input
              type="number"
              name="price"
              className="form-control form-control-sm"
              value={formData.price}
              onChange={handleChange}
              min={0}
              step="0.01"
              required
            />
          </label>
        </div>
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2">
        <button type="submit" className="btn btn-book-accent btn-sm">
          Save Changes
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
