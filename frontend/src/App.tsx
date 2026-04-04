/**
 * Application shell: wraps the SPA in `CartProvider` and `BrowserRouter`.
 *
 * Routes:
 * - `/` — BrowsePage (catalog)
 * - `/cart` — CartPage (session cart)
 * - `/adminbooks` — AdminBooksPage (CRUD)
 *
 * Cart state lives in context + sessionStorage (see CartContext); API base URL is in bookPayload.
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { CartProvider } from './context/CartContext'
import BrowsePage from './pages/BrowsePage'
import CartPage from './pages/CartPage'
import AdminBooksPage from './pages/AdminBooksPage'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="container py-5">
          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
