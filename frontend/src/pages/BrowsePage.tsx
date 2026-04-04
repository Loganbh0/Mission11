/**
 * Home route (`/`): storefront landing page.
 *
 * Structure:
 * - Top: hero title and taglines; beside them, links to admin CRUD (`/adminbooks`) and the cart summary card.
 * - Middle: `BookList` — fetches paged books, category filter, sort, add-to-cart.
 * - Bottom: `StoreInfoAccordion` — static FAQ / privacy copy in a Bootstrap accordion.
 */
import { Link } from 'react-router-dom'
import BookList from '../components/BookList'
import CartSummary from '../components/CartSummary'
import StoreInfoAccordion from '../components/StoreInfoAccordion'

export default function BrowsePage() {
  return (
    <>
      {/* --- Top bar: branding + quick actions (Manage books + cart) --- */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <header className="text-center text-md-start flex-grow-1 mb-0">
          <h1 className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start gap-2 flex-wrap">
            <i className="bi bi-book text-book-accent" aria-hidden="true" />
            Marginalia Bookstore
          </h1>
          <p className="book-subtitle mb-1">
            “Marginalia” describes the notes readers write in the margins of their books.
          </p>
          <p className="book-subtitle mb-0">
            We know you’ll love these books enough to make your own marginalia.
          </p>
        </header>
        <div
          className="align-self-stretch align-self-md-center d-flex flex-column flex-md-row gap-2"
          style={{ minWidth: '10rem' }}
        >
          <Link
            to="/adminbooks"
            className="btn btn-outline-secondary d-inline-flex align-items-center justify-content-center gap-2 text-nowrap"
          >
            <i className="bi bi-journal-text" aria-hidden="true" />
            Manage books
          </Link>
          <CartSummary />
        </div>
      </div>

      {/* --- Catalog: API-driven list with filters and cards --- */}
      <BookList />

      {/* --- Footer: about / FAQ / privacy (accordion) --- */}
      <div className="row">
        <div className="col-12">
          <StoreInfoAccordion />
        </div>
      </div>
    </>
  )
}
