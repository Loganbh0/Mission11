/**
 * Cart route (`/cart`): shows session cart line items from `CartContext`.
 *
 * - Table: per-line unit price, quantity stepper (`updateQuantity`), line subtotal, remove.
 * - Grand total uses `cartTotal` (sum of unitPrice × quantity).
 * - Checkout is disabled (demo); “Continue shopping” runs `navigate('/')` so browse state can restore.
 */
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import {
  type CartLineItem,
  cartTotal,
  lineSubtotal
} from '../types/CartLineItem'

export default function CartPage() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity } = useCart()
  const total = cartTotal(cart)

  return (
    <div className="py-2">
      <h2 className="h4 mb-4 text-book-accent d-flex align-items-center gap-2">
        <i className="bi bi-bag-check" aria-hidden="true" />
        Your cart
      </h2>

      {/* Empty state vs. line item table */}
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm align-middle book-card border rounded overflow-hidden">
            <thead className="table-light">
              <tr>
                <th scope="col">Title</th>
                <th scope="col" className="text-end">
                  Price
                </th>
                <th scope="col" className="text-center">
                  Qty
                </th>
                <th scope="col" className="text-end">
                  Subtotal
                </th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {cart.map((line: CartLineItem) => (
                <tr key={line.bookId}>
                  <td>{line.title || '(Untitled)'}</td>
                  <td className="text-end">${line.unitPrice.toFixed(2)}</td>
                  <td className="text-center">
                    <div className="btn-group btn-group-sm" role="group">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          updateQuantity(line.bookId, line.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="btn btn-outline-secondary disabled">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          updateQuantity(line.bookId, line.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-end fw-semibold">
                    ${lineSubtotal(line).toFixed(2)}
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(line.bookId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grand total (only when there is at least one line) */}
      {cart.length > 0 ? (
        <p className="fs-5 fw-semibold text-book-accent mt-3">
          Total: ${total.toFixed(2)}
        </p>
      ) : null}

      {/* Demo actions: no real checkout; return to home for more browsing */}
      <div className="d-flex flex-wrap gap-2 mt-4">
        <button type="button" className="btn btn-book-accent" disabled>
          Checkout
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/')}
        >
          Continue shopping
        </button>
      </div>
    </div>
  )
}
