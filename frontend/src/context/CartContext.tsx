import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'
import type { CartLineItem } from '../types/CartLineItem'

const STORAGE_KEY = 'marginalia_cart_v1'

export type AddToCartInput = {
  bookId: number
  title: string
  unitPrice: number
  quantity?: number
}

interface CartContextType {
  cart: CartLineItem[]
  addToCart: (item: AddToCartInput) => void
  removeFromCart: (bookId: number) => void
  updateQuantity: (bookId: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function parseStoredCart(raw: string | null): CartLineItem[] {
  if (!raw) {
    return []
  }
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }
    const lines: CartLineItem[] = []
    for (const row of parsed) {
      if (row && typeof row === 'object') {
        const r = row as Record<string, unknown>
        const bookId = Number(r.bookId ?? r.BookId)
        const title = String(r.title ?? r.Title ?? '')
        const unitPrice = Number(r.unitPrice ?? r.UnitPrice ?? 0)
        const quantity = Math.max(0, Math.floor(Number(r.quantity ?? r.Quantity ?? 0)))
        if (Number.isFinite(bookId) && quantity > 0 && Number.isFinite(unitPrice)) {
          lines.push({ bookId, title, unitPrice, quantity })
        }
      }
    }
    return lines
  } catch {
    return []
  }
}

function readStoredCart(): CartLineItem[] {
  if (typeof sessionStorage === 'undefined') {
    return []
  }
  return parseStoredCart(sessionStorage.getItem(STORAGE_KEY))
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLineItem[]>(() => readStoredCart())

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') {
      return
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // ignore quota / private mode
    }
  }, [cart])

  const addToCart = (item: AddToCartInput) => {
    const qty = item.quantity ?? 1
    const add = Math.max(1, Math.floor(qty))
    setCart((prev) => {
      const existing = prev.find((line) => line.bookId === item.bookId)
      if (existing) {
        return prev.map((line) =>
          line.bookId === item.bookId
            ? { ...line, quantity: line.quantity + add }
            : line
        )
      }
      return [
        ...prev,
        {
          bookId: item.bookId,
          title: item.title,
          unitPrice: item.unitPrice,
          quantity: add
        }
      ]
    })
  }

  const removeFromCart = (bookId: number) => {
    setCart((prev) => prev.filter((line) => line.bookId !== bookId))
  }

  const updateQuantity = (bookId: number, quantity: number) => {
    const q = Math.floor(quantity)
    if (q <= 0) {
      removeFromCart(bookId)
      return
    }
    setCart((prev) =>
      prev.map((line) =>
        line.bookId === bookId ? { ...line, quantity: q } : line
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
