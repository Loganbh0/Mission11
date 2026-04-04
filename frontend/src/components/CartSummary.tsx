/**
 * Browse header widget: line count, cart total, and a link to `/cart`.
 */
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { cartTotal } from '../types/CartLineItem'

export default function CartSummary() {
  const { cart } = useCart()
  const itemCount = cart.reduce((n, line) => n + line.quantity, 0)
  const total = cartTotal(cart)

  return (
    <div className="card book-card shadow-sm">
      <Link
        to="/cart"
        className="card-body d-block text-start text-decoration-none text-book-accent py-2 px-3"
      >
        <span className="fw-semibold d-inline-flex align-items-center gap-2">
          <i className="bi bi-cart3" aria-hidden="true" />
          Cart
        </span>
        <span className="text-muted ms-2 small">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
        <div className="fw-semibold">${total.toFixed(2)}</div>
      </Link>
    </div>
  )
}
